/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Dedicated Institutional Home Page (Page 1)
 * Route: / (slug: home)
 */

import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Rocket,
  GraduationCap,
  Calendar,
  Handshake,
  TrendingUp,
  CheckCircle2,
  Users2,
  Globe2,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import type { DynamicPageContent } from '../DynamicCmsPage';

interface PageProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

export const HomePageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const pillars = [
    { title: 'Digital Skills & Talent', desc: 'Industry-standard bootcamps in full-stack engineering, cloud, cybersecurity and UX.', link: '/programs/digital-skills', icon: Code2, color: 'text-indigo-600' },
    { title: 'Startup Incubation', desc: 'Equity-free catalytic funding, mentorship, and cloud credits for high-impact founders.', link: '/startups/incubation', icon: Rocket, color: 'text-amber-600' },
    { title: 'Applied AI & Research', desc: 'National think-tank publishing policy papers and building open Somali LLM models.', link: '/institute/ai-emerging', icon: GraduationCap, color: 'text-teal-600' },
    { title: 'National Summit & Media', desc: 'Annual 2,000+ delegate innovation summits, demo day expos, and fireside SiTalks.', link: '/events/summit', icon: Calendar, color: 'text-rose-600' }
  ];

  const metrics = [
    { value: '14,000+', label: 'Youths Certified', desc: 'Across full-stack software, mobile and data tracks' },
    { value: '180+', label: 'Startups Supported', desc: 'Prototyped and prepared for seed investment' },
    { value: '$2.8M+', label: 'Capital Mobilized', desc: 'Grants and venture funding directly into Somali teams' },
    { value: '4 Regional Hubs', label: 'Nationwide Footprint', desc: 'Mogadishu HQ, Hargeisa, Garowe & Kismayo' }
  ];

  const featuredStartups = [
    { name: 'GeelPay', sector: 'FinTech', note: 'Orchestrating mobile money across Somali telecom networks' },
    { name: 'Bari AgriLogistics', sector: 'AgriTech', note: 'Cold storage tracking saving coastal fishery catches' },
    { name: 'KaabHealth', sector: 'HealthTech', note: 'Telemedicine bridging rural clinics with specialist doctors' }
  ];

  return (
    <div className="space-y-16">
      {/* 1. Flagship Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white p-8 sm:p-16 border border-slate-800 shadow-2xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{page.heroBadge || 'Somalia’s Premier Innovation Ecosystem'}</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Catalyzing Somalia’s Digital Economy'}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Empowering youth through world-class technical education, accelerating scalable startups, and uniting government, diaspora, and global capital into a thriving knowledge economy.'}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate(page.cta?.url || '/programs/digital-skills')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md transition-all"
            >
              <span>{page.cta?.label || 'Explore Digital Academy'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/startups/incubation')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all"
            >
              <span>Apply for Incubation</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Institutional Introduction & Pillars */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Ecosystem Pillars</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Four Engines Powering National Transformation</h2>
          <p className="text-xs text-slate-500 mt-2">Structured interventions designed to take Somali youth from digital literacy to market-ready technology leadership.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pil, idx) => {
            const Icon = pil.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(pil.link)}
                className="group rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform ${pil.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">{pil.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{pil.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-cyan-700">
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Verified Impact Metrics */}
      <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Measurable Results</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">Verified Impact Across Somalia</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">{m.value}</div>
              <h4 className="text-sm font-bold text-white mt-1">{m.label}</h4>
              <p className="text-xs text-slate-400 mt-1">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Startups & Innovations */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Somali Founder Spotlight</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Innovations Born at SiHub</h2>
          </div>
          <button
            onClick={() => onNavigate('/startups/entrepreneurs')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-800"
          >
            <span>View All Startups</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStartups.map((st, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">{st.sector}</span>
              <h3 className="text-base font-bold text-slate-900 mt-3 mb-1">{st.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{st.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
