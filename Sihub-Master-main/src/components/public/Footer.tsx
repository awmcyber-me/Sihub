/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Institutional Website Footer
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { useCmsPage } from '../../hooks/useCmsPage';
import { formatCopyright, isSafeMapEmbedUrl, isSafePublicUrl, normalizeFooterContent } from '../../utils/footerContent';
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  ArrowUpRight,
  ShieldCheck,
  Heart
} from 'lucide-react';

type FooterCmsPage = Record<string, unknown>;

export const Footer: React.FC = () => {
  const { navigateTo, language, t } = useApp();
  const { page: cmsFooter } = useCmsPage<FooterCmsPage>('footer');
  const footer = normalizeFooterContent(cmsFooter ?? {});

  const openFooterLink = (url: string) => {
    if (!isSafePublicUrl(url)) return;
    if (url.startsWith('https://')) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-emerald-950 py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-cyan-400 font-semibold uppercase text-xs tracking-wider">
              {footer.topEyebrow || (language === 'so' ? 'Hal-abuurka Qaranka' : 'National Innovation Ecosystem')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {footer.topTitle || t.tagline}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {footer.topDescription || t.taglineSub}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => navigateTo('programs')}
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-transform hover:scale-102"
            >
              {t.actions.explorePrograms}
            </button>
            <button
              onClick={() => navigateTo('partnerships')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
            >
              {footer.topPartnerAction || 'Partner With Us'} &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Organization & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" showSubtitle={true} lightText={true} />
            {footer.organizationName && <p className="text-sm font-bold text-white">{footer.organizationName}</p>}
            {footer.organizationDescription && <p className="text-xs text-slate-400 leading-relaxed max-w-sm">{footer.organizationDescription}</p>}

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              {footer.addresses.map((address, index) => <div key={`address-${index}`} className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{address.label && <strong className="mr-1">{address.label}:</strong>}{address.value}
                  {address.mapUrl && isSafePublicUrl(address.mapUrl) && <a className="ml-2 text-cyan-300 underline" href={address.mapUrl} target="_blank" rel="noreferrer">Map</a>}
                  {address.mapEmbedUrl && isSafeMapEmbedUrl(address.mapEmbedUrl) && <iframe title={address.label || 'SiHub map'} src={address.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer" className="mt-2 h-36 w-full border border-slate-700" />}
                </span>
              </div>)}
              {footer.emails.map((email, index) => <div key={`email-${index}`} className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${email.value}`} className="hover:text-cyan-300">{email.label && <strong className="mr-1">{email.label}:</strong>}{email.value}</a>
              </div>)}
              {footer.phones.map((phone, index) => <div key={`phone-${index}`} className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${phone.value}`} className="hover:text-cyan-300">{phone.label && <strong className="mr-1">{phone.label}:</strong>}{phone.value}</a>
              </div>)}
              {footer.workingHours.map((hours, index) => <div key={`hours-${index}`} className="text-slate-400">{hours.label && <strong className="mr-1 text-slate-300">{hours.label}:</strong>}{hours.value}</div>)}
              {footer.additionalInfo.map((item, index) => <div key={`info-${index}`} className="text-slate-400">{item.label && <strong className="mr-1 text-slate-300">{item.label}:</strong>}{item.value}</div>)}
            </div>
            {footer.socialLinks.length > 0 && <div className="flex flex-wrap gap-3 pt-2">{footer.socialLinks.filter(link => isSafePublicUrl(link.url)).map((link, index) => <a key={`${link.platform}-${index}`} href={link.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:text-white"><Globe className="h-3.5 w-3.5" />{link.platform || link.url}</a>)}</div>}
          </div>

          {footer.footerLinks.map((group, groupIndex) => <div key={`footer-group-${groupIndex}`} className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">{group.title}</h4>
            <ul className="space-y-2 text-xs">{group.items.filter(item => item.label && isSafePublicUrl(item.url)).map((item, itemIndex) => <li key={`${item.label}-${itemIndex}`}>
              <button onClick={() => openFooterLink(item.url)} className="inline-flex items-center gap-1 text-left hover:text-cyan-400 transition-colors">{item.label}{item.url.startsWith('https://') && <ArrowUpRight className="h-3 w-3 text-slate-500" />}</button>
            </li>)}</ul>
          </div>)}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>{formatCopyright(footer)}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => navigateTo('contact')} className="hover:text-cyan-400 transition-colors text-slate-300">
              Contact Us
            </button>
            <span>•</span>
            {footer.certification && <span className="flex items-center gap-1 text-emerald-400 font-semibold"><ShieldCheck className="w-3.5 h-3.5" />{footer.certification}</span>}
            {footer.closingLine && <span className="text-slate-400">{footer.closingLine}</span>}
            {footer.customFooterText && <span className="text-slate-400">{footer.customFooterText}</span>}
          </div>
        </div>
      </div>
    </footer>
  );
};
