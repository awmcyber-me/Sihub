/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Master Database Client & Fallback Proxy
 * Guarantees zero downtime: runs against live PostgreSQL when available,
 * and transparently routes to the robust local fallback store when offline.
 */

import 'dotenv/config';
import { PrismaClient, Role, PublicationStatus } from '@prisma/client';
import { fallbackStore, StoredUser, StoredSession, StoredCmsEntry } from './fallbackStore';

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL is not configured; the app will stay in local fallback mode only.');
}
if (!process.env.DIRECT_URL && process.env.DATABASE_URL) {
  process.env.DIRECT_URL = process.env.DATABASE_URL;
}

const rawPrisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
});

const isConnectionError = (err: unknown): boolean => {
  if (!err) return false;
  const msg = String((err as { message?: string })?.message || err);
  const code = String((err as { code?: string })?.code || '');
  return (
    code === 'P1001' ||
    code === 'P1002' ||
    msg.includes("Can't reach database server") ||
    msg.includes('ECONNREFUSED') ||
    msg.includes('connect ECONNREFUSED') ||
    msg.includes('ETIMEDOUT')
  );
};

// Fallback handlers for each Prisma model
const fallbackUser = {
  findUnique: async (args: { where: { email?: string; id?: string } }) => {
    if (args.where.email) {
      const email = args.where.email.toLowerCase().trim();
      for (const u of fallbackStore.users.values()) {
        if (u.email.toLowerCase() === email) return { ...u };
      }
    }
    if (args.where.id) {
      const u = fallbackStore.users.get(args.where.id);
      if (u) return { ...u };
    }
    return null;
  },

  findFirst: async (args?: { where?: { role?: Role; email?: string } }) => {
    for (const u of fallbackStore.users.values()) {
      if (args?.where?.role && u.role !== args.where.role) continue;
      if (args?.where?.email && u.email.toLowerCase() !== args.where.email.toLowerCase()) continue;
      return { ...u };
    }
    return null;
  },

  findMany: async (args?: { where?: { role?: Role; isActive?: boolean }; select?: Record<string, boolean> }) => {
    const list: StoredUser[] = [];
    for (const u of fallbackStore.users.values()) {
      if (args?.where?.role && u.role !== args.where.role) continue;
      if (args?.where?.isActive !== undefined && u.isActive !== args.where.isActive) continue;
      list.push({ ...u });
    }
    return list;
  },

  create: async (args: { data: { email: string; fullName: string; passwordHash: string; role?: Role } }) => {
    const id = `usr-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const user: StoredUser = {
      id,
      email: args.data.email.toLowerCase().trim(),
      fullName: args.data.fullName,
      passwordHash: args.data.passwordHash,
      role: args.data.role || Role.STUDENT,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    fallbackStore.users.set(id, user);
    fallbackStore.saveToDisk();
    return { ...user };
  },

  update: async (args: { where: { id?: string; email?: string }; data: Partial<StoredUser> }) => {
    let target: StoredUser | undefined;
    if (args.where.id) target = fallbackStore.users.get(args.where.id);
    else if (args.where.email) {
      const em = args.where.email.toLowerCase();
      for (const u of fallbackStore.users.values()) {
        if (u.email.toLowerCase() === em) {
          target = u;
          break;
        }
      }
    }
    if (!target) throw new Error('User not found');
    const updated = { ...target, ...args.data, updatedAt: new Date() };
    fallbackStore.users.set(target.id, updated);
    fallbackStore.saveToDisk();
    return { ...updated };
  },

  count: async () => fallbackStore.users.size
};

const fallbackSession = {
  create: async (args: { data: { id: string; userId: string; csrfHash: string; expiresAt: Date } }) => {
    const session: StoredSession = {
      id: args.data.id,
      userId: args.data.userId,
      csrfHash: args.data.csrfHash,
      expiresAt: new Date(args.data.expiresAt),
      createdAt: new Date()
    };
    fallbackStore.sessions.set(session.id, session);
    fallbackStore.saveToDisk();
    return { ...session };
  },

  findUnique: async (args: { where: { id: string }; include?: { user?: boolean }; select?: Record<string, boolean> }) => {
    const s = fallbackStore.sessions.get(args.where.id);
    if (!s) return null;
    if (args.include?.user) {
      const user = fallbackStore.users.get(s.userId);
      return { ...s, user: user ? { ...user } : null };
    }
    return { ...s };
  },

  delete: async (args: { where: { id: string } }) => {
    const s = fallbackStore.sessions.get(args.where.id);
    fallbackStore.sessions.delete(args.where.id);
    fallbackStore.saveToDisk();
    return s ? { ...s } : { id: args.where.id };
  },

  deleteMany: async (args?: { where?: { userId?: string; id?: { not?: string } } }) => {
    let count = 0;
    for (const [id, s] of fallbackStore.sessions.entries()) {
      if (args?.where?.userId && s.userId !== args.where.userId) continue;
      if (args?.where?.id?.not && s.id === args.where.id.not) continue;
      fallbackStore.sessions.delete(id);
      count++;
    }
    fallbackStore.saveToDisk();
    return { count };
  },

  updateMany: async (args: { where: { id?: string; expiresAt?: { gt?: Date } }; data: Partial<StoredSession> }) => {
    let count = 0;
    for (const s of fallbackStore.sessions.values()) {
      if (args.where.id && s.id !== args.where.id) continue;
      if (args.where.expiresAt?.gt && s.expiresAt <= args.where.expiresAt.gt) continue;
      Object.assign(s, args.data);
      count++;
    }
    fallbackStore.saveToDisk();
    return { count };
  }
};

const fallbackPasswordReset = {
  create: async (args: { data: { userId: string; tokenHash: string; expiresAt: Date } }) => {
    const id = `rst-${Date.now()}`;
    const token = {
      id,
      userId: args.data.userId,
      tokenHash: args.data.tokenHash,
      expiresAt: new Date(args.data.expiresAt),
      usedAt: null,
      createdAt: new Date()
    };
    fallbackStore.resetTokens.set(token.tokenHash, token);
    return { ...token };
  },

  findUnique: async (args: { where: { tokenHash: string }; include?: { user?: boolean } }) => {
    const token = fallbackStore.resetTokens.get(args.where.tokenHash);
    if (!token) return null;
    if (args.include?.user) {
      const user = fallbackStore.users.get(token.userId);
      return { ...token, user: user ? { ...user } : null };
    }
    return { ...token };
  },

  updateMany: async (args: { where: { id?: string; tokenHash?: string; userId?: string }; data: { usedAt?: Date } }) => {
    let count = 0;
    for (const token of fallbackStore.resetTokens.values()) {
      if (args.where.id && token.id !== args.where.id) continue;
      if (args.where.tokenHash && token.tokenHash !== args.where.tokenHash) continue;
      if (args.where.userId && token.userId !== args.where.userId) continue;
      if (args.data.usedAt) token.usedAt = args.data.usedAt;
      count++;
    }
    return { count };
  }
};

const fallbackCmsEntry = {
  findUnique: async (args: { where: { id?: string; slug?: string } }) => {
    if (args.where.id) {
      const e = fallbackStore.cmsEntries.get(args.where.id);
      if (e) return { ...e };
    }
    if (args.where.slug) {
      for (const e of fallbackStore.cmsEntries.values()) {
        if (e.slug === args.where.slug && !e.deletedAt) return { ...e };
      }
    }
    return null;
  },

  findFirst: async (args?: { where?: { type?: string; slug?: string; deletedAt?: null; OR?: Array<{ slug?: string }> } }) => {
    for (const e of fallbackStore.cmsEntries.values()) {
      if (args?.where?.type && e.type !== args.where.type) continue;
      if (args?.where?.deletedAt === null && e.deletedAt !== null) continue;
      if (args?.where?.OR && Array.isArray(args.where.OR)) {
        const matchesOr = args.where.OR.some(cond => cond.slug && cond.slug === e.slug);
        if (!matchesOr) continue;
      } else if (args?.where?.slug && e.slug !== args.where.slug) {
        continue;
      }
      return { ...e };
    }
    return null;
  },

  findMany: async (args?: { where?: { type?: string; status?: PublicationStatus; deletedAt?: null }; orderBy?: unknown }) => {
    const list: StoredCmsEntry[] = [];
    for (const e of fallbackStore.cmsEntries.values()) {
      if (args?.where?.type && e.type !== args.where.type) continue;
      if (args?.where?.status && e.status !== args.where.status) continue;
      if (args?.where?.deletedAt === null && e.deletedAt !== null) continue;
      list.push({ ...e });
    }
    return list;
  },

  create: async (args: { data: Partial<StoredCmsEntry> }) => {
    const id = args.data.id || `entry-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const entry: StoredCmsEntry = {
      id,
      type: args.data.type || 'page',
      slug: args.data.slug || 'untitled',
      title: args.data.title || 'Untitled',
      summary: args.data.summary || null,
      content: (args.data.content as Record<string, unknown>) || {},
      status: args.data.status || PublicationStatus.DRAFT,
      authorId: args.data.authorId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: args.data.publishedAt || null,
      deletedAt: null
    };
    fallbackStore.cmsEntries.set(id, entry);
    fallbackStore.saveToDisk();
    return { ...entry };
  },

  update: async (args: { where: { id?: string; slug?: string }; data: Partial<StoredCmsEntry> }) => {
    let target: StoredCmsEntry | undefined;
    if (args.where.id) target = fallbackStore.cmsEntries.get(args.where.id);
    else if (args.where.slug) {
      for (const e of fallbackStore.cmsEntries.values()) {
        if (e.slug === args.where.slug && !e.deletedAt) {
          target = e;
          break;
        }
      }
    }
    if (!target) throw new Error('CmsEntry not found');
    const updated = { ...target, ...args.data, updatedAt: new Date() };
    fallbackStore.cmsEntries.set(target.id, updated);
    fallbackStore.saveToDisk();
    return { ...updated };
  },

  updateMany: async (args: { where: { slug?: string }; data: Partial<StoredCmsEntry> }) => {
    let count = 0;
    for (const e of fallbackStore.cmsEntries.values()) {
      if (args.where.slug && e.slug !== args.where.slug) continue;
      Object.assign(e, args.data, { updatedAt: new Date() });
      count++;
    }
    fallbackStore.saveToDisk();
    return { count };
  },

  delete: async (args: { where: { id?: string; slug?: string } }) => {
    let target: StoredCmsEntry | undefined;
    if (args.where.id) target = fallbackStore.cmsEntries.get(args.where.id);
    else if (args.where.slug) {
      for (const e of fallbackStore.cmsEntries.values()) {
        if (e.slug === args.where.slug) target = e;
      }
    }
    if (target) {
      fallbackStore.cmsEntries.delete(target.id);
      fallbackStore.saveToDisk();
      return { ...target };
    }
    return null;
  }
};

const fallbackCmsRevision = {
  create: async (args: { data: any }) => {
    const rev = { id: `rev-${Date.now()}`, ...args.data, createdAt: new Date() };
    fallbackStore.cmsRevisions.push(rev);
    fallbackStore.saveToDisk();
    return rev;
  },
  findMany: async (args?: { where?: { entryId?: string } }) => {
    if (args?.where?.entryId) {
      return fallbackStore.cmsRevisions.filter(r => r.entryId === args.where!.entryId);
    }
    return [...fallbackStore.cmsRevisions];
  },
  findUnique: async (args: { where: { id: string } }) => {
    return fallbackStore.cmsRevisions.find(r => r.id === args.where.id) || null;
  }
};

const fallbackAuditLog = {
  create: async (args: { data: any }) => {
    const log = { id: `log-${Date.now()}`, ...args.data, createdAt: new Date() };
    fallbackStore.auditLogs.push(log);
    fallbackStore.saveToDisk();
    return log;
  },
  findMany: async () => [...fallbackStore.auditLogs]
};

const fallbackMediaAsset = {
  create: async (args: { data: any }) => {
    const id = args.data.id || `med-${Date.now()}`;
    const asset = { id, ...args.data, createdAt: new Date() };
    fallbackStore.mediaAssets.set(id, asset);
    return asset;
  },
  findMany: async () => Array.from(fallbackStore.mediaAssets.values()),
  findUnique: async (args: { where: { id?: string; objectKey?: string } }) => {
    if (args.where.id) return fallbackStore.mediaAssets.get(args.where.id) || null;
    for (const a of fallbackStore.mediaAssets.values()) {
      if (a.objectKey === args.where.objectKey) return a;
    }
    return null;
  },
  delete: async (args: { where: { id: string } }) => {
    const a = fallbackStore.mediaAssets.get(args.where.id);
    fallbackStore.mediaAssets.delete(args.where.id);
    return a || { id: args.where.id };
  },
  update: async (args: { where: { id: string }; data: any }) => {
    const a = fallbackStore.mediaAssets.get(args.where.id);
    if (!a) throw new Error('Asset not found');
    Object.assign(a, args.data);
    return a;
  }
};

// Generic proxy factory that falls back to in-memory store on connection failures
function createModelProxy<T extends object>(rawModel: T, fallbackModel: any) {
  return new Proxy(rawModel, {
    get(target, prop, receiver) {
      const orig = Reflect.get(target, prop, receiver);
      const fallbackFn = fallbackModel[prop];

      if (typeof orig === 'function') {
        return async (...args: any[]) => {
          try {
            return await (orig as any).apply(target, args);
          } catch (err: unknown) {
            if (isConnectionError(err) && fallbackFn) {
              return await fallbackFn.apply(fallbackModel, args);
            }
            throw err;
          }
        };
      }
      return orig ?? fallbackFn;
    }
  });
}

export const prisma = new Proxy(rawPrisma, {
  get(target, prop, receiver) {
    if (prop === 'user') return createModelProxy((target as any).user, fallbackUser);
    if (prop === 'session') return createModelProxy((target as any).session, fallbackSession);
    if (prop === 'passwordResetToken') return createModelProxy((target as any).passwordResetToken, fallbackPasswordReset);
    if (prop === 'cmsEntry') return createModelProxy((target as any).cmsEntry, fallbackCmsEntry);
    if (prop === 'cmsRevision') return createModelProxy((target as any).cmsRevision, fallbackCmsRevision);
    if (prop === 'auditLog') return createModelProxy((target as any).auditLog, fallbackAuditLog);
    if (prop === 'mediaAsset') return createModelProxy((target as any).mediaAsset, fallbackMediaAsset);

    if (prop === '$transaction') {
      return async (actions: any) => {
        try {
          return await (target as any).$transaction(actions);
        } catch (err: unknown) {
          if (isConnectionError(err)) {
            if (typeof actions === 'function') {
              return await actions(prisma);
            }
            if (Array.isArray(actions)) {
              return await Promise.all(actions);
            }
          }
          throw err;
        }
      };
    }

    if (prop === '$disconnect') {
      return async () => {
        try {
          await (target as any).$disconnect();
        } catch {
          // ignore disconnect error
        }
      };
    }

    return Reflect.get(target, prop, receiver);
  }
}) as PrismaClient;
