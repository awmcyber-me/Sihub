export interface FooterContactEntry {
  label: string;
  value: string;
  mapUrl?: string;
  mapEmbedUrl?: string;
}

export interface FooterLinkItem {
  label: string;
  url: string;
}

export interface FooterLinkGroup {
  title: string;
  items: FooterLinkItem[];
}

export interface FooterSocialLink {
  platform: string;
  url: string;
}

export interface FooterContent {
  organizationName: string;
  organizationDescription: string;
  topEyebrow: string;
  topTitle: string;
  topDescription: string;
  topPartnerAction: string;
  emails: FooterContactEntry[];
  phones: FooterContactEntry[];
  addresses: FooterContactEntry[];
  workingHours: FooterContactEntry[];
  additionalInfo: FooterContactEntry[];
  socialLinks: FooterSocialLink[];
  footerLinks: FooterLinkGroup[];
  customFooterText: string;
  certification: string;
  closingLine: string;
  copyrightText: string;
  copyrightSymbol: string;
  copyrightOrganizationName: string;
  copyrightStartYear: string;
  copyrightEndYear: string;
  copyrightAutoYear: boolean;
}

const defaultFooterLinks: FooterLinkGroup[] = [
  {
    title: 'Ecosystem Portals',
    items: [
      { label: 'Learner Portal', url: '/learner' },
      { label: 'Startup Portal', url: '/founder' },
      { label: 'Partner Portal', url: '/partner' },
      { label: 'Visitor Portal & Tours', url: '/visitor' },
      { label: 'SiHub Institute (Academy)', url: '/institute' }
    ]
  },
  {
    title: 'Community & Impact',
    items: [
      { label: 'Somali Innovation Summit', url: '/events/summit' },
      { label: 'Grants & Scholarships', url: '/opportunities' },
      { label: 'Regional Youth Hubs', url: '/impact/community-impact' },
      { label: 'Research & Publications', url: '/institute/research-innovation' },
      { label: 'Institutional Partners', url: '/partnerships' }
    ]
  }
];

const readString = (value: unknown, fallback = '') => typeof value === 'string' ? value : fallback;

const readEntries = (value: unknown): FooterContactEntry[] => Array.isArray(value)
  ? value.flatMap(item => {
      if (!item || typeof item !== 'object') return [];
      const entry = item as Record<string, unknown>;
      const label = readString(entry.label);
      const entryValue = readString(entry.value);
      if (!label && !entryValue) return [];
      return [{
        label,
        value: entryValue,
        ...(typeof entry.mapUrl === 'string' ? { mapUrl: entry.mapUrl } : {}),
        ...(typeof entry.mapEmbedUrl === 'string' ? { mapEmbedUrl: entry.mapEmbedUrl } : {})
      }];
    })
  : [];

const readFooterLinks = (value: unknown): FooterLinkGroup[] | null => {
  if (!Array.isArray(value)) return null;
  return value.flatMap(group => {
    if (!group || typeof group !== 'object') return [];
    const record = group as Record<string, unknown>;
    const items = Array.isArray(record.items) ? record.items.flatMap(item => {
      if (!item || typeof item !== 'object') return [];
      const link = item as Record<string, unknown>;
      return [{ label: readString(link.label), url: readString(link.url) }];
    }) : [];
    return [{ title: readString(record.title), items }];
  });
};

const readSocialLinks = (value: unknown): FooterSocialLink[] => {
  if (Array.isArray(value)) {
    return value.flatMap(item => {
      if (!item || typeof item !== 'object') return [];
      const link = item as Record<string, unknown>;
      return [{ platform: readString(link.platform), url: readString(link.url) }];
    });
  }
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value as Record<string, unknown>)
    .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
    .map(([platform, url]) => ({ platform, url }));
};

export function normalizeFooterContent(source: Record<string, unknown>, legacySettings: Record<string, unknown> = {}): FooterContent {
  const legacyGroups = Array.isArray(source.groups) ? source.groups : [];
  const footerLinks = readFooterLinks(source.footerLinks) ?? (legacyGroups.length > 0
    ? legacyGroups.map((group, groupIndex) => {
        const record = group && typeof group === 'object' ? group as Record<string, unknown> : {};
        const defaultGroup = defaultFooterLinks[groupIndex];
        const legacyItems = Array.isArray(record.items) ? record.items : [];
        return {
          title: readString(record.title, defaultGroup?.title ?? ''),
          items: legacyItems.map((item, index) => ({
            label: readString(item),
            url: defaultGroup?.items[index]?.url ?? '/'
          }))
        };
      })
    : defaultFooterLinks);
  const legacyEmail = readString(source.email, readString(legacySettings.contactEmail));
  const legacyPhone = readString(source.phone, readString(legacySettings.contactPhone));
  const legacyAddress = readString(source.address, readString(legacySettings.contactAddress));
  const legacyHubs = Array.isArray(source.hubs) ? source.hubs.flatMap(item => {
    if (!item || typeof item !== 'object') return [];
    const hub = item as Record<string, unknown>;
    return [{ label: readString(hub.name), value: readString(hub.description) }];
  }) : [];
  const copyrightOrganizationName = readString(source.copyrightOrganizationName, readString(source.organizationName, readString(legacySettings.siteTitle, 'Somali Innovation Hub (SiHub)')));

  return {
    organizationName: readString(source.organizationName, readString(legacySettings.siteTitle, 'Somali Innovation Hub (SiHub)')),
    organizationDescription: readString(source.organizationDescription),
    topEyebrow: readString(source.topEyebrow),
    topTitle: readString(source.topTitle),
    topDescription: readString(source.topDescription),
    topPartnerAction: readString(source.topPartnerAction),
    emails: readEntries(source.emails).length ? readEntries(source.emails) : legacyEmail ? [{ label: 'Email', value: legacyEmail }] : [],
    phones: readEntries(source.phones).length ? readEntries(source.phones) : legacyPhone ? [{ label: 'Telephone', value: legacyPhone }] : [],
    addresses: readEntries(source.addresses).length ? readEntries(source.addresses) : legacyAddress ? [{ label: 'Address', value: legacyAddress }] : [],
    workingHours: readEntries(source.workingHours),
    additionalInfo: readEntries(source.additionalInfo).length ? readEntries(source.additionalInfo) : legacyHubs,
    socialLinks: readSocialLinks(source.socialLinks),
    footerLinks,
    customFooterText: readString(source.customFooterText),
    certification: readString(source.certification),
    closingLine: readString(source.closingLine),
    copyrightText: readString(source.copyrightText, '{symbol} {year} {organizationName}. All Rights Reserved.'),
    copyrightSymbol: readString(source.copyrightSymbol, '©'),
    copyrightOrganizationName,
    copyrightStartYear: readString(source.copyrightStartYear),
    copyrightEndYear: readString(source.copyrightEndYear),
    copyrightAutoYear: typeof source.copyrightAutoYear === 'boolean' ? source.copyrightAutoYear : true
  };
}

export function formatCopyright(content: FooterContent, currentYear = new Date().getFullYear()): string {
  const year = content.copyrightAutoYear
    ? String(currentYear)
    : content.copyrightStartYear && content.copyrightEndYear && content.copyrightEndYear !== content.copyrightStartYear
      ? `${content.copyrightStartYear}-${content.copyrightEndYear}`
      : content.copyrightStartYear || content.copyrightEndYear;
  return content.copyrightText
    .replaceAll('{symbol}', content.copyrightSymbol)
    .replaceAll('{year}', year)
    .replaceAll('{organizationName}', content.copyrightOrganizationName);
}

export function isSafePublicUrl(value: string): boolean {
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

export function isSafeMapEmbedUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    return url.protocol === 'https:' && (
      hostname === 'google.com' || hostname.endsWith('.google.com') ||
      hostname === 'openstreetmap.org' || hostname.endsWith('.openstreetmap.org')
    );
  } catch {
    return false;
  }
}