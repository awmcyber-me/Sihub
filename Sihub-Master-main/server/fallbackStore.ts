/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Persistent Fallback Store
 * Provides robust in-memory and local disk persistence for Users, Sessions, and CMS Pages
 * when local PostgreSQL is unreachable, ensuring admin authentication and content management
 * operate reliably without 500 errors.
 */

import fs from 'node:fs';
import path from 'node:path';
import { Role, PublicationStatus } from '@prisma/client';
import { OFFICIAL_WEBSITE_SUBSECTIONS } from './defaultWebsiteStructure';

export interface StoredUser {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoredSession {
  id: string; // Token hash
  userId: string;
  csrfHash: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface StoredCmsEntry {
  id: string;
  type: string;
  slug: string;
  title: string;
  summary: string | null;
  content: Record<string, unknown>;
  status: PublicationStatus;
  authorId: string | null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  deletedAt: Date | null;
}

export interface StoredCmsRevision {
  id: string;
  entryId: string;
  revisionNumber: number;
  type: string;
  slug: string;
  title: string;
  summary: string | null;
  content: Record<string, unknown>;
  status: PublicationStatus;
  authorId: string | null;
  createdAt: Date;
}

export interface StoredAuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
}

export interface StoredMediaAsset {
  id: string;
  objectKey: string;
  originalName: string;
  title: string | null;
  description: string | null;
  contentType: string;
  byteSize: number;
  checksum: string | null;
  verified: boolean;
  uploadedById: string;
  createdAt: Date;
}

export interface StoredPasswordResetToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  usedAt: Date | null;
  createdAt: Date;
}

const DATA_DIR = process.env.SIHUB_FALLBACK_DATA_DIR
  ? path.resolve(process.env.SIHUB_FALLBACK_DATA_DIR)
  : path.resolve(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'fallback-db.json');

class FallbackStore {
  public users: Map<string, StoredUser> = new Map();
  public sessions: Map<string, StoredSession> = new Map();
  public cmsEntries: Map<string, StoredCmsEntry> = new Map();
  public cmsRevisions: StoredCmsRevision[] = [];
  public auditLogs: StoredAuditLog[] = [];
  public mediaAssets: Map<string, StoredMediaAsset> = new Map();
  public resetTokens: Map<string, StoredPasswordResetToken> = new Map();

  constructor() {
    this.initDefaultCmsEntries();
    this.loadFromDisk();
  }

  private initDefaultCmsEntries() {
    for (const def of OFFICIAL_WEBSITE_SUBSECTIONS) {
      const entryId = `entry-${def.slug}`;
      const contentPayload = {
        categoryKey: def.categoryKey,
        categoryTitle: def.categoryTitle,
        title: def.title,
        heading: def.heading,
        subheading: def.subheading,
        summary: def.summary,
        description: def.description,
        heroBadge: def.heroBadge,
        publicPath: def.publicPath,
        cta: def.cta,
        stats: def.stats ?? [],
        features: def.features ?? [],
        team: def.team ?? [],
        faqs: def.faqs ?? [],
        documents: def.documents ?? [],
        sections: []
      };

      this.cmsEntries.set(entryId, {
        id: entryId,
        type: 'page',
        slug: def.slug,
        title: def.title,
        summary: def.summary,
        content: contentPayload,
        status: PublicationStatus.PUBLISHED,
        authorId: 'usr-owner-001',
        createdAt: new Date('2026-01-01T00:00:00Z'),
        updatedAt: new Date('2026-01-01T00:00:00Z'),
        publishedAt: new Date('2026-01-01T00:00:00Z'),
        deletedAt: null
      });
    }
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        const parsed = JSON.parse(raw);
        if (parsed.users && Array.isArray(parsed.users)) {
          for (const u of parsed.users) {
            this.users.set(u.id, {
              ...u,
              createdAt: new Date(u.createdAt),
              updatedAt: new Date(u.updatedAt)
            });
          }
        }
        if (parsed.sessions && Array.isArray(parsed.sessions)) {
          for (const s of parsed.sessions) {
            this.sessions.set(s.id, {
              ...s,
              expiresAt: new Date(s.expiresAt),
              createdAt: new Date(s.createdAt)
            });
          }
        }
        if (parsed.cmsEntries && Array.isArray(parsed.cmsEntries)) {
          for (const e of parsed.cmsEntries) {
            this.cmsEntries.set(e.id, {
              ...e,
              createdAt: new Date(e.createdAt),
              updatedAt: new Date(e.updatedAt),
              publishedAt: e.publishedAt ? new Date(e.publishedAt) : null,
              deletedAt: e.deletedAt ? new Date(e.deletedAt) : null
            });
          }
        }
      }
    } catch {
      // Ignore disk load errors and use defaults
    }
  }

  public saveToDisk() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const serialized = {
        users: Array.from(this.users.values()),
        sessions: Array.from(this.sessions.values()),
        cmsEntries: Array.from(this.cmsEntries.values()),
        cmsRevisions: this.cmsRevisions.slice(-50),
        auditLogs: this.auditLogs.slice(-100)
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(serialized, null, 2), 'utf8');
    } catch {
      // Non-critical if filesystem is read-only
    }
  }
}

export const fallbackStore = new FallbackStore();
