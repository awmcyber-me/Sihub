import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Eye, Plus, Save, Send, Trash2 } from 'lucide-react';
import { ApiError, apiGet, apiPatch, apiPost } from '../../../services/apiClient';
import { useApp } from '../../../context/AppContext';
import {
  formatCopyright,
  isSafeMapEmbedUrl,
  isSafePublicUrl,
  normalizeFooterContent,
  type FooterContent,
  type FooterContactEntry,
  type FooterLinkGroup,
  type FooterSocialLink
} from '../../../utils/footerContent';

interface CmsPageEntry {
  id: string;
  type: string;
  slug: string;
  title: string;
  summary: string | null;
  content: Record<string, unknown>;
  status: string;
  deletedAt: string | null;
}

type ContactListKey = 'emails' | 'phones' | 'addresses' | 'workingHours' | 'additionalInfo';
type ContactField = 'label' | 'value' | 'mapUrl' | 'mapEmbedUrl';

const emptyContact = (): FooterContactEntry => ({ label: '', value: '' });
const emptySocialLink = (): FooterSocialLink => ({ platform: '', url: '' });
const emptyLinkGroup = (): FooterLinkGroup => ({ title: '', items: [] });
const newFooterContent = () => normalizeFooterContent({});

const asObject = (value: unknown): Record<string, unknown> =>
  value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};

const moveItem = <T,>(items: T[], index: number, direction: -1 | 1): T[] => {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= items.length) return items;
  const updated = [...items];
  [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
  return updated;
};

export const FooterManagementArea: React.FC = () => {
  const { addToast } = useApp();
  const [content, setContent] = useState<FooterContent>(newFooterContent);
  const [baseContent, setBaseContent] = useState<Record<string, unknown>>({});
  const [entry, setEntry] = useState<CmsPageEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const loadFooter = async () => {
      setLoading(true);
      try {
        const result = await apiGet<{ entries: CmsPageEntry[] }>('/api/cms/admin');
        if (!active) return;
        const footerEntry = result.entries.find(item => item.type === 'page' && item.slug === 'footer') ?? null;
        const settingsEntry = result.entries.find(item => item.type === 'page' && item.slug === 'settings' && !item.deletedAt);
        const storedContent = asObject(footerEntry?.content);
        const draft = asObject(storedContent._draft);
        const published = asObject(storedContent._published);
        const editableContent = Object.keys(asObject(draft.content)).length
          ? asObject(draft.content)
          : Object.keys(published).length ? published : storedContent;
        const normalized = normalizeFooterContent(editableContent, asObject(settingsEntry?.content));
        setEntry(footerEntry);
        setContent(normalized);
        setBaseContent(editableContent);
        setError('');
      } catch (reason) {
        if (active) setError(reason instanceof ApiError ? reason.message : 'Unable to load footer settings.');
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadFooter();
    return () => { active = false; };
  }, []);

  const updateContact = (key: ContactListKey, index: number, field: ContactField, value: string) => {
    setContent(previous => ({
      ...previous,
      [key]: previous[key].map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item)
    }));
  };

  const updateSocialLink = (index: number, field: keyof FooterSocialLink, value: string) => {
    setContent(previous => ({
      ...previous,
      socialLinks: previous.socialLinks.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item)
    }));
  };

  const updateGroup = (groupIndex: number, update: (group: FooterLinkGroup) => FooterLinkGroup) => {
    setContent(previous => ({
      ...previous,
      footerLinks: previous.footerLinks.map((group, index) => index === groupIndex ? update(group) : group)
    }));
  };

  const updateFooterLink = (groupIndex: number, itemIndex: number, field: 'label' | 'url', value: string) => {
    updateGroup(groupIndex, group => ({
      ...group,
      items: group.items.map((item, index) => index === itemIndex ? { ...item, [field]: value } : item)
    }));
  };

  const buildContent = (): Record<string, unknown> => {
    const payload: Record<string, unknown> = {
      ...baseContent,
      ...content,
      email: content.emails[0]?.value ?? '',
      phone: content.phones[0]?.value ?? '',
      address: content.addresses[0]?.value ?? '',
      hubs: content.additionalInfo.map(item => ({ name: item.label, description: item.value })),
      groups: content.footerLinks.map(group => ({ title: group.title, items: group.items.map(item => item.label) }))
    };
    delete payload._draft;
    delete payload._published;
    return payload;
  };

  const save = async (publish: boolean) => {
    setSaving(true);
    setError('');
    try {
      for (const link of content.socialLinks) {
        if (link.url && !isSafePublicUrl(link.url)) throw new Error(`Use an HTTPS URL for ${link.platform || 'social links'}.`);
      }
      for (const group of content.footerLinks) {
        for (const item of group.items) {
          if (item.url && !isSafePublicUrl(item.url)) throw new Error(`Use an HTTPS or site-relative URL for ${item.label || 'footer links'}.`);
        }
      }
      for (const address of content.addresses) {
        if (address.mapUrl && !isSafePublicUrl(address.mapUrl)) throw new Error('Map links must use HTTPS or a site-relative URL.');
        if (address.mapEmbedUrl && !isSafeMapEmbedUrl(address.mapEmbedUrl)) throw new Error('Map embeds must use Google Maps or OpenStreetMap HTTPS URLs.');
      }

      const payload = buildContent();
      let target = entry;
      if (target?.deletedAt || target?.status === 'ARCHIVED') {
        const restored = await apiPost<{ entry: CmsPageEntry }>(`/api/cms/admin/${encodeURIComponent(target.id)}/restore`);
        target = restored.entry;
        setEntry(target);
      }
      if (!target) {
        const created = await apiPost<{ entry: CmsPageEntry }>('/api/cms/admin', {
          type: 'page',
          slug: 'footer',
          title: content.organizationName || 'Global Footer',
          summary: content.organizationDescription,
          content: payload
        });
        target = created.entry;
      }
      if (publish) {
        const result = await apiPatch<{ entry: CmsPageEntry }>(`/api/cms/admin/${encodeURIComponent(target.id)}`, {
          type: 'page',
          title: content.organizationName || 'Global Footer',
          slug: 'footer',
          summary: content.organizationDescription,
          content: payload,
          publishNow: true
        });
        setEntry(result.entry);
        setBaseContent(payload);
        addToast('success', 'Footer Published', 'Published footer and organization information is now live.');
      } else if (target.id !== entry?.id) {
        setEntry(target);
        setBaseContent(payload);
        addToast('success', 'Footer Draft Saved', 'The footer draft is saved and is not public.');
      } else {
        const result = await apiPatch<{ entry: CmsPageEntry }>(`/api/cms/admin/${encodeURIComponent(target.id)}`, {
          type: 'page',
          title: content.organizationName || 'Global Footer',
          slug: 'footer',
          summary: content.organizationDescription,
          content: payload
        });
        setEntry(result.entry);
        setBaseContent(payload);
        addToast('success', 'Footer Draft Saved', 'The footer draft is saved. Published visitors still see the current version.');
      }
      window.dispatchEvent(new CustomEvent('sihub-cms-update'));
    } catch (reason) {
      const message = reason instanceof ApiError ? reason.message : reason instanceof Error ? reason.message : 'Unable to save footer content.';
      setError(message);
      addToast('error', 'Footer Not Saved', message);
    } finally {
      setSaving(false);
    }
  };

  const unpublish = async () => {
    if (!entry || entry.status !== 'PUBLISHED') return;
    if (!window.confirm('Unpublish the global footer? The content will remain saved as a draft.')) return;
    setSaving(true);
    try {
      const result = await apiPatch<{ entry: CmsPageEntry }>(`/api/cms/admin/${encodeURIComponent(entry.id)}/status`, { status: 'DRAFT' });
      setEntry(result.entry);
      addToast('info', 'Footer Unpublished', 'The saved footer is no longer visible to public visitors.');
      window.dispatchEvent(new CustomEvent('sihub-cms-update'));
    } catch (reason) {
      const message = reason instanceof ApiError ? reason.message : 'Unable to unpublish footer content.';
      setError(message);
      addToast('error', 'Footer Not Unpublished', message);
    } finally {
      setSaving(false);
    }
  };

  const renderContactList = (title: string, key: ContactListKey, fields: ContactField[]) => (
    <section className="space-y-3 border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        <button type="button" onClick={() => setContent(previous => ({ ...previous, [key]: [...previous[key], emptyContact()] }))} className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700"><Plus className="h-4 w-4" /> Add entry</button>
      </div>
      {content[key].map((item, index) => (
        <div key={`${key}-${index}`} className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-slate-100 pt-3">
          {fields.map(field => <label key={field} className="text-[11px] font-medium text-slate-600">
            {field === 'value' ? 'Information' : field === 'mapUrl' ? 'Map link' : field === 'mapEmbedUrl' ? 'Secure map embed URL' : 'Label'}
            <input value={item[field] ?? ''} onChange={event => updateContact(key, index, field, event.target.value)} className="mt-1 w-full border border-slate-300 px-2.5 py-2 text-xs text-slate-900" />
          </label>)}
          <div className="flex items-center gap-2 sm:col-span-2">
            <button type="button" title="Move up" aria-label={`Move ${title} entry up`} disabled={index === 0} onClick={() => setContent(previous => ({ ...previous, [key]: moveItem(previous[key], index, -1) }))} className="border border-slate-300 p-2 disabled:opacity-40"><ArrowUp className="h-3.5 w-3.5" /></button>
            <button type="button" title="Move down" aria-label={`Move ${title} entry down`} disabled={index === content[key].length - 1} onClick={() => setContent(previous => ({ ...previous, [key]: moveItem(previous[key], index, 1) }))} className="border border-slate-300 p-2 disabled:opacity-40"><ArrowDown className="h-3.5 w-3.5" /></button>
            <button type="button" onClick={() => setContent(previous => ({ ...previous, [key]: previous[key].filter((_, itemIndex) => itemIndex !== index) }))} className="ml-auto inline-flex items-center gap-1 border border-rose-200 px-2.5 py-2 text-xs text-rose-700"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
          </div>
        </div>
      ))}
      {content[key].length === 0 && <p className="text-xs text-slate-500">No entries.</p>}
    </section>
  );

  const copyrightPreview = formatCopyright(content);

  return (
    <div className="space-y-6 text-slate-900">
      <header className="flex flex-col gap-4 border-b border-slate-700 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700">BUILD / GLOBAL FOOTER</span>
          <h2 className="mt-1 text-xl font-bold text-white">Footer & Organization Information</h2>
          <p className="mt-1 text-xs text-slate-400">Manage public contact details, links, location information, and copyright.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" disabled={saving || loading} onClick={() => void save(false)} className="inline-flex items-center gap-2 border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-100 disabled:opacity-50"><Save className="h-4 w-4" /> Save draft</button>
          <button type="button" disabled={saving || loading} onClick={() => void save(true)} className="inline-flex items-center gap-2 bg-cyan-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"><Send className="h-4 w-4" /> Publish</button>
          {entry?.status === 'PUBLISHED' && <button type="button" disabled={saving} onClick={() => void unpublish()} className="border border-amber-500 px-3 py-2 text-xs font-semibold text-amber-200 disabled:opacity-50">Unpublish</button>}
        </div>
      </header>

      {entry && <p className="text-xs text-slate-400">Status: <strong className={entry.status === 'PUBLISHED' ? 'text-emerald-400' : 'text-amber-300'}>{entry.status}</strong>{entry.status === 'PUBLISHED' && asObject(entry.content)._draft ? ' · a working draft exists' : ''}</p>}
      {error && <p role="alert" className="border border-rose-500/40 bg-rose-950/40 p-3 text-xs text-rose-200">{error}</p>}
      {loading ? <p className="py-10 text-center text-sm text-slate-400">Loading footer content…</p> : <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-5">
          <section className="space-y-3 border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-bold">Organization</h3>
            <label className="block text-xs font-medium text-slate-600">Organization name<input value={content.organizationName} onChange={event => setContent(previous => ({ ...previous, organizationName: event.target.value, copyrightOrganizationName: previous.copyrightOrganizationName || event.target.value }))} className="mt-1 w-full border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="block text-xs font-medium text-slate-600">Description<textarea value={content.organizationDescription} onChange={event => setContent(previous => ({ ...previous, organizationDescription: event.target.value }))} rows={3} className="mt-1 w-full border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="block text-xs font-medium text-slate-600">Banner eyebrow<input value={content.topEyebrow} onChange={event => setContent(previous => ({ ...previous, topEyebrow: event.target.value }))} className="mt-1 w-full border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="block text-xs font-medium text-slate-600">Footer banner title<input value={content.topTitle} onChange={event => setContent(previous => ({ ...previous, topTitle: event.target.value }))} className="mt-1 w-full border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="block text-xs font-medium text-slate-600">Footer banner text<textarea value={content.topDescription} onChange={event => setContent(previous => ({ ...previous, topDescription: event.target.value }))} rows={2} className="mt-1 w-full border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="block text-xs font-medium text-slate-600">Partner action label<input value={content.topPartnerAction} onChange={event => setContent(previous => ({ ...previous, topPartnerAction: event.target.value }))} className="mt-1 w-full border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="block text-xs font-medium text-slate-600">Certification statement<input value={content.certification} onChange={event => setContent(previous => ({ ...previous, certification: event.target.value }))} className="mt-1 w-full border border-slate-300 px-3 py-2 text-sm" /></label>
            <label className="block text-xs font-medium text-slate-600">Closing line<input value={content.closingLine} onChange={event => setContent(previous => ({ ...previous, closingLine: event.target.value }))} className="mt-1 w-full border border-slate-300 px-3 py-2 text-sm" /></label>
          </section>

          {renderContactList('Email addresses', 'emails', ['label', 'value'])}
          {renderContactList('Telephone numbers', 'phones', ['label', 'value'])}
          {renderContactList('Physical addresses', 'addresses', ['label', 'value', 'mapUrl', 'mapEmbedUrl'])}
          {renderContactList('Working hours', 'workingHours', ['label', 'value'])}
          {renderContactList('Additional information', 'additionalInfo', ['label', 'value', 'mapUrl'])}

          <section className="space-y-3 border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-bold">Social media</h3><button type="button" onClick={() => setContent(previous => ({ ...previous, socialLinks: [...previous.socialLinks, emptySocialLink()] }))} className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700"><Plus className="h-4 w-4" /> Add link</button></div>
            {content.socialLinks.map((link, index) => <div key={`social-${index}`} className="grid grid-cols-1 gap-2 border-t border-slate-100 pt-3 sm:grid-cols-2">
              <input aria-label="Social platform" placeholder="Platform (e.g. LinkedIn)" value={link.platform} onChange={event => updateSocialLink(index, 'platform', event.target.value)} className="border border-slate-300 px-2.5 py-2 text-xs" />
              <input aria-label="Social URL" placeholder="https://…" value={link.url} onChange={event => updateSocialLink(index, 'url', event.target.value)} className="border border-slate-300 px-2.5 py-2 text-xs" />
              <div className="flex gap-2 sm:col-span-2"><button type="button" title="Move up" disabled={index === 0} onClick={() => setContent(previous => ({ ...previous, socialLinks: moveItem(previous.socialLinks, index, -1) }))} className="border border-slate-300 p-2 disabled:opacity-40"><ArrowUp className="h-3.5 w-3.5" /></button><button type="button" title="Move down" disabled={index === content.socialLinks.length - 1} onClick={() => setContent(previous => ({ ...previous, socialLinks: moveItem(previous.socialLinks, index, 1) }))} className="border border-slate-300 p-2 disabled:opacity-40"><ArrowDown className="h-3.5 w-3.5" /></button><button type="button" onClick={() => setContent(previous => ({ ...previous, socialLinks: previous.socialLinks.filter((_, itemIndex) => itemIndex !== index) }))} className="ml-auto border border-rose-200 px-2.5 py-2 text-xs text-rose-700">Remove</button></div>
            </div>)}
          </section>

          <section className="space-y-3 border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-bold">Footer link groups</h3><button type="button" onClick={() => setContent(previous => ({ ...previous, footerLinks: [...previous.footerLinks, emptyLinkGroup()] }))} className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700"><Plus className="h-4 w-4" /> Add group</button></div>
            {content.footerLinks.map((group, groupIndex) => <div key={`group-${groupIndex}`} className="space-y-2 border-t border-slate-100 pt-3">
              <div className="flex gap-2"><input aria-label="Footer group title" placeholder="Group title" value={group.title} onChange={event => updateGroup(groupIndex, current => ({ ...current, title: event.target.value }))} className="min-w-0 flex-1 border border-slate-300 px-2.5 py-2 text-xs" /><button type="button" title="Move group up" disabled={groupIndex === 0} onClick={() => setContent(previous => ({ ...previous, footerLinks: moveItem(previous.footerLinks, groupIndex, -1) }))} className="border border-slate-300 p-2 disabled:opacity-40"><ArrowUp className="h-3.5 w-3.5" /></button><button type="button" title="Move group down" disabled={groupIndex === content.footerLinks.length - 1} onClick={() => setContent(previous => ({ ...previous, footerLinks: moveItem(previous.footerLinks, groupIndex, 1) }))} className="border border-slate-300 p-2 disabled:opacity-40"><ArrowDown className="h-3.5 w-3.5" /></button><button type="button" onClick={() => setContent(previous => ({ ...previous, footerLinks: previous.footerLinks.filter((_, index) => index !== groupIndex) }))} className="border border-rose-200 p-2 text-rose-700"><Trash2 className="h-3.5 w-3.5" /></button></div>
              {group.items.map((item, itemIndex) => <div key={`link-${groupIndex}-${itemIndex}`} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <input aria-label="Footer link label" placeholder="Link label" value={item.label} onChange={event => updateFooterLink(groupIndex, itemIndex, 'label', event.target.value)} className="border border-slate-300 px-2.5 py-2 text-xs" />
                <input aria-label="Footer link URL" placeholder="/path or https://…" value={item.url} onChange={event => updateFooterLink(groupIndex, itemIndex, 'url', event.target.value)} className="border border-slate-300 px-2.5 py-2 text-xs" />
                <div className="flex gap-2 sm:col-span-2"><button type="button" title="Move link up" disabled={itemIndex === 0} onClick={() => updateGroup(groupIndex, current => ({ ...current, items: moveItem(current.items, itemIndex, -1) }))} className="border border-slate-300 p-2 disabled:opacity-40"><ArrowUp className="h-3.5 w-3.5" /></button><button type="button" title="Move link down" disabled={itemIndex === group.items.length - 1} onClick={() => updateGroup(groupIndex, current => ({ ...current, items: moveItem(current.items, itemIndex, 1) }))} className="border border-slate-300 p-2 disabled:opacity-40"><ArrowDown className="h-3.5 w-3.5" /></button><button type="button" onClick={() => updateGroup(groupIndex, current => ({ ...current, items: current.items.filter((_, index) => index !== itemIndex) }))} className="ml-auto border border-rose-200 px-2.5 py-2 text-xs text-rose-700">Remove link</button></div>
              </div>)}
              <button type="button" onClick={() => updateGroup(groupIndex, current => ({ ...current, items: [...current.items, { label: '', url: '/' }] }))} className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700"><Plus className="h-4 w-4" /> Add link</button>
            </div>)}
          </section>

          <section className="space-y-3 border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-bold">Copyright</h3>
            <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={content.copyrightAutoYear} onChange={event => setContent(previous => ({ ...previous, copyrightAutoYear: event.target.checked }))} /> Automatically update current year</label>
            {!content.copyrightAutoYear && <div className="grid grid-cols-2 gap-2"><label className="text-xs">Start year<input value={content.copyrightStartYear} onChange={event => setContent(previous => ({ ...previous, copyrightStartYear: event.target.value }))} className="mt-1 w-full border border-slate-300 px-2.5 py-2" /></label><label className="text-xs">End year (optional)<input value={content.copyrightEndYear} onChange={event => setContent(previous => ({ ...previous, copyrightEndYear: event.target.value }))} className="mt-1 w-full border border-slate-300 px-2.5 py-2" /></label></div>}
            <div className="grid grid-cols-2 gap-2"><label className="text-xs">Copyright symbol<input value={content.copyrightSymbol} onChange={event => setContent(previous => ({ ...previous, copyrightSymbol: event.target.value }))} className="mt-1 w-full border border-slate-300 px-2.5 py-2" /></label><label className="text-xs">Organization name<input value={content.copyrightOrganizationName} onChange={event => setContent(previous => ({ ...previous, copyrightOrganizationName: event.target.value }))} className="mt-1 w-full border border-slate-300 px-2.5 py-2" /></label></div>
            <label className="block text-xs">Full copyright statement<input value={content.copyrightText} onChange={event => setContent(previous => ({ ...previous, copyrightText: event.target.value }))} className="mt-1 w-full border border-slate-300 px-2.5 py-2" /></label>
            <label className="block text-xs">Custom footer text<textarea value={content.customFooterText} onChange={event => setContent(previous => ({ ...previous, customFooterText: event.target.value }))} rows={3} className="mt-1 w-full border border-slate-300 px-2.5 py-2" /></label>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="border border-slate-700 bg-slate-950 p-5 text-slate-200">
            <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300"><Eye className="h-4 w-4" /> Preview</div>
            <h3 className="text-base font-bold text-white">{content.organizationName || 'Organization name'}</h3>
            {content.organizationDescription && <p className="mt-2 text-xs text-slate-400">{content.organizationDescription}</p>}
            <div className="mt-4 space-y-3 text-xs">
              {[...content.addresses, ...content.emails, ...content.phones, ...content.workingHours, ...content.additionalInfo].map((item, index) => <div key={`preview-contact-${index}`}>
                {item.label && <strong className="mr-2 text-slate-200">{item.label}</strong>}{item.value}
                {item.mapUrl && isSafePublicUrl(item.mapUrl) && <a className="ml-2 text-cyan-300 underline" href={item.mapUrl} target="_blank" rel="noreferrer">Map</a>}
                {item.mapEmbedUrl && isSafeMapEmbedUrl(item.mapEmbedUrl) && <iframe title={item.label || 'Map preview'} src={item.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer" className="mt-2 h-36 w-full border border-slate-700" />}
              </div>)}
            </div>
            {content.socialLinks.length > 0 && <div className="mt-4 flex flex-wrap gap-3">{content.socialLinks.filter(link => isSafePublicUrl(link.url)).map((link, index) => <a key={`${link.platform}-${index}`} href={link.url} target="_blank" rel="noreferrer" className="text-xs text-cyan-300 underline">{link.platform || link.url}</a>)}</div>}
            {content.footerLinks.map((group, index) => <div key={`preview-group-${index}`} className="mt-4"><h4 className="text-xs font-bold text-white">{group.title}</h4><div className="mt-2 flex flex-wrap gap-2">{group.items.filter(item => item.label && isSafePublicUrl(item.url)).map((item, itemIndex) => <span key={itemIndex} className="border border-slate-700 px-2 py-1 text-[11px]">{item.label}</span>)}</div></div>)}
            {content.customFooterText && <p className="mt-4 border-t border-slate-700 pt-3 text-xs text-slate-400">{content.customFooterText}</p>}
            <p className="mt-5 border-t border-slate-700 pt-3 text-xs text-slate-400">{copyrightPreview}</p>
          </div>
        </aside>
      </div>}
    </div>
  );
};