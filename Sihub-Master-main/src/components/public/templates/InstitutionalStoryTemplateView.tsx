/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed Institutional Story Template View (Who We Are)
 */

import React from 'react';
import { Building2, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Award, Globe, Users } from 'lucide-react';
import { DynamicPageContent } from '../DynamicCmsPage';

interface TemplateProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

export const InstitutionalStoryTemplateView: React.FC<TemplateProps> = ({ page, onNavigate }) => {
  const hubs = [
    { city: 'Mogadishu HQ', address: 'KM4 Airport Road, Wadajir District', focus: 'National Innovation Labs, Venture Incubator & Executive Offices' },
    { city: 'Hargeisa Station', address: 'Independence Avenue, City Center', focus: 'Software Engineering Academy & Diaspora Angel Syndicate Hub' },
    { city: 'Garowe Hub', address: 'Puntland Innovation Quarter', focus: 'AgriTech Testing Ground, IoT Labs & Water Innovation Prototyping' },
    { city: 'Kismayo Lab', address: 'Jubaland Maritime Road', focus: 'Youth Digital Literacy, Solar Tech & Coastal Community Civic Labs' }
  ];

  return (
    <div className="space-y-16">
      {/* 1. Pre-Designed Institutional Story Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>{page.heroBadge || 'Somalia\'s National Innovation Ecosystem'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Somalia\'s Premier Center for Grassroots Innovation'}
          </h1>

          {page.subheading && (
            <p className="text-base sm:text-lg font-medium text-cyan-200 leading-relaxed">
              {page.subheading}
            </p>
          )}

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {page.description || page.summary || 'SiHub was established to unlock the transformative potential of Somali youth through technology, enterprise, and civic innovation. Operating from Mogadishu with regional outreach, we bridge talent with capital and global networks.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('/about/our-team')}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <span>Meet Our Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/about/vision')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
            >
              Explore 2030 Vision
            </button>
          </div>
        </div>
      </section>

      {/* 2. Key Statistics */}
      {page.stats && page.stats.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {page.stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <p className="text-3xl sm:text-4xl font-extrabold text-cyan-800 tracking-tight font-mono tabular-nums">{stat.value}</p>
              <p className="text-sm font-bold text-slate-900">{stat.label}</p>
              {stat.description && <p className="text-xs text-slate-500 leading-relaxed">{stat.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* 3. Four Regional Hub Stations */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Decentralized Footprint</h2>
            <p className="text-lg font-extrabold text-slate-900">4 Regional Hub Stations</p>
          </div>
          <span className="text-xs font-medium text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full">National Coverage</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((hub, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{hub.city}</h3>
                <p className="text-xs font-medium text-slate-500">{hub.address}</p>
                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">{hub.focus}</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Fully Operational
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Strategic Institutional Pillars */}
      {page.features && page.features.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Core Guiding Principles</h2>
            <p className="text-lg font-extrabold text-slate-900">How We Operate</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {page.features.map((feat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-100/60 text-cyan-800 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
