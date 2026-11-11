/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed Startup Showcase & Mentorship Template View
 */

import React, { useState } from 'react';
import { Rocket, Users, MapPin, ExternalLink, ArrowRight, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';
import { DynamicPageContent } from '../DynamicCmsPage';

interface TemplateProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

export const StartupShowcaseTemplateView: React.FC<TemplateProps> = ({ page, onNavigate }) => {
  const isMentors = (page.slug || '').includes('mentor');
  const [sectorFilter, setSectorFilter] = useState('All');

  const items = [
    { name: 'SolarTech Somalia', founder: 'Farhan Jimale', sector: 'CleanTech', desc: 'Solar-powered irrigation and pay-as-you-go microgrids for rural Somali farming communities.', metrics: '18 Local Jobs • 450kW Installed', location: 'Mogadishu' },
    { name: 'GeelPay Financial', founder: 'Fadumo Warsame', sector: 'FinTech', desc: 'Cross-border remittances and merchant POS terminals tailored for nomadic livestock traders.', metrics: '$1.2M Transacted Monthly', location: 'Hargeisa' },
    { name: 'Somali Dairy ColdChain', founder: 'Abdirashid Ali', sector: 'AgriTech', desc: 'Solar-chilled milk collection hubs reducing spoilage for pastoralist women producers.', metrics: '12 Collection Hubs • 4,000L Daily', location: 'Garowe' },
    { name: 'Caafi MedTech', founder: 'Dr. Shukri Hassan', sector: 'HealthTech', desc: 'Telemedicine consultations and drone logistics delivery for maternal health centers in remote districts.', metrics: '8,500 Consultations', location: 'Kismayo' }
  ];

  const sectors = ['All', 'AgriTech', 'FinTech', 'CleanTech', 'HealthTech'];

  const filtered = sectorFilter === 'All'
    ? items
    : items.filter(it => it.sector === sectorFilter);

  return (
    <div className="space-y-16">
      {/* 1. Header Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          {isMentors ? 'Global Somali Mentor Network' : 'Venture Ecosystem Portfolio'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {page.heading || page.title || (isMentors ? '1-on-1 Strategic Mentorship Network' : 'Featured Somali Entrepreneurs')}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          {page.description || page.summary || 'Spotlighting the founders and seasoned diaspora advisors driving East Africa\'s emerging digital frontier.'}
        </p>

        {/* Sector Tabs */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          {sectors.map(sec => (
            <button
              key={sec}
              onClick={() => setSectorFilter(sec)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                sectorFilter === sec
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Key Metrics */}
      {page.stats && page.stats.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {page.stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <p className="text-3xl font-extrabold text-emerald-700 tracking-tight font-mono tabular-nums">{stat.value}</p>
              <p className="text-xs font-bold text-slate-900">{stat.label}</p>
              {stat.description && <p className="text-[11px] text-slate-500">{stat.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* 3. Showcase Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item, idx) => (
          <div key={idx} className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {item.sector}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <MapPin className="w-3 h-3" /> {item.location}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
              <p className="text-xs font-medium text-slate-500">Founder: {item.founder}</p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">{item.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 font-mono">{item.metrics}</span>
              <button
                onClick={() => onNavigate('/startups/incubation')}
                className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
              >
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* 4. Mentorship / Application Banner */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Join the Community</span>
          <h2 className="text-2xl font-black text-white">
            {isMentors ? 'Are You an Industry Veteran Willing to Coach Founders?' : 'Want to Showcase Your Venture in Our Portfolio?'}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Connect with Somalia\'s most ambitious innovators and receive access to demo days, seed grants, and regional markets.
          </p>
        </div>
        <button
          onClick={() => onNavigate(isMentors ? '/startups/youth-mentorship' : '/startups/incubation')}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shrink-0 transition-colors"
        >
          {isMentors ? 'Register as a Mentor' : 'Submit Startup Profile'} &rarr;
        </button>
      </section>
    </div>
  );
};
