import { useCmsCollection } from './useCmsCollection';

export type CmsPageFields = {
  slug?: string;
  title?: string | null;
  summary?: string | null;
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  [key: string]: unknown;
};

export function useCmsPage<T extends CmsPageFields = CmsPageFields>(slugOrPath: string) {
  const { items, loading, error } = useCmsCollection<T>('page');
  const normalized = (slugOrPath || '').replace(/^\/+|\/+$/g, '');
  const leaf = normalized.split('/').pop() || normalized;
  const page = items.find(item => {
    if (!item) return false;
    const itemPublic = (item as Record<string, unknown>).publicPath;
    return (
      item.slug === normalized ||
      item.slug === leaf ||
      (typeof itemPublic === 'string' && (itemPublic === `/${normalized}` || itemPublic === slugOrPath || itemPublic.replace(/^\/+/, '') === normalized))
    );
  });
  return { page, loading, error };
}
