/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed Startup Accelerator Template View (Startup Incubation & Support)
 * Single coherent visual hierarchy with 4-stage venture roadmap, perks, seed grant, and pitch application.
 */

import React from 'react';
import {
  Rocket,
  DollarSign,
  Clock,
  CheckCircle2,
  Building,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Award
} from 'lucide-react';
import { DynamicPageContent } from '../DynamicCmsPage';

interface TemplateProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

export const StartupAcceleratorTemplateView: React.FC<TemplateProps> = ({ page, onNavigate }) => {
  const roadmapStages = [
    { stage: 'Stage 1', title: 'Ideation & Problem-Market Fit', duration: 'Weeks 1–4', desc: 'Customer discovery interviews, competitive mapping, and business model prototyping.' },
    { stage: 'Stage 2', title: 'MVP Technical Build', duration: 'Weeks 5–10', desc: 'Hardware lab access, cloud credits, software architecture review, and prototype pilot.' },
    { stage: 'Stage 3', title: 'Market Validation & Traction', duration: 'Weeks 11–18', desc: 'Initial commercial contracts, local payment integrations, and compliance sandbox testing.' },
    { stage: 'Stage 4', title: 'Investor Pitch & Demo Day', duration: 'Weeks 19–24', desc: 'Pitch rehearsal, legal incorporation, term sheet preparation, and live angel syndicate demo.' }
  ];

  const perks = [
    { title: '$25,000 Seed Grants', desc: 'Milestone-based non-dilutive grant funding disbursed directly to approved venture milestones.' },
    { title: '24/7 Fiber Co-Working Space', desc: 'Dedicated air-conditioned desk space at SiHub Mogadishu HQ with high-speed fiber internet.' },
    { title: '$100k+ Cloud & Software Credits', desc: 'AWS, Google Cloud, Stripe Atlas, and software partner perks to eliminate early founder costs.' },
    { title: 'Legal & Accounting Sandbox', desc: 'Corporate registration, tax compliance, and intellectual property structuring with top legal advisors.' },
    { title: 'Diaspora Angel Network', desc: 'Direct introductions to verified Somali angel syndicates and East African early-stage venture funds.' },
    { title: 'Technical Prototyping Labs', desc: 'Access to 3D printers, IoT sensor benches, solar testing kits, and hardware workstations.' }
  ];

  return (
    <div className="space-y-16">
      {/* 1. Pre-Designed Accelerator Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Rocket className="w-3.5 h-3.5 text-emerald-400" />
            <span>{page.heroBadge || 'Flagship Venture Accelerator'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'From Seed Idea to Scalable Enterprise'}
          </h1>

          {page.subheading && (
            <p className="text-base sm:text-lg font-medium text-emerald-200 leading-relaxed">
              {page.subheading}
            </p>
          )}

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'A rigorous 6-month venture acceleration program designed to equip high-potential Somali founders with prototyping capital, legal structuring, executive mentorship, and direct investor connections.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate(page.cta?.url || '/startups/incubation')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <span>{page.cta?.label || 'Pitch Your Startup & Apply'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800/80">
              <CheckCircle2 className="w-3.5 h-3.5" /> Next Cohort Applications Open
            </span>
          </div>
        </div>
      </section>

      {/* 2. Key Accelerator Metrics */}
      {page.stats && page.stats.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {page.stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight font-mono tabular-nums">{stat.value}</p>
              <p className="text-sm font-bold text-slate-900">{stat.label}</p>
              {stat.description && <p className="text-xs text-slate-500 leading-relaxed">{stat.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* 3. 4-Stage Venture Acceleration Roadmap */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Structured Venture Methodology</h2>
            <p className="text-xl font-extrabold text-slate-900">4-Stage Incubation Roadmap</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">6 Months Duration</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapStages.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-mono">{item.stage}</span>
                  <span className="text-[11px] text-slate-400 font-medium">{item.duration}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">{item.desc}</p>
              </div>
              <div className="pt-2 text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Milestone Verified
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Founder Perks & Support Sandbox */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Venture Resources & Tooling</h2>
          <p className="text-xl font-extrabold text-slate-900">What Every Selected Founder Receives</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {perks.map((perk, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{perk.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Pitch Call to Action Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Applications Open</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Have a Venture Ready for Incubation?</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Submit your pitch deck or executive summary. Selected teams receive workspace, mentoring, and direct access to seed capital.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/startups/incubation')}
          className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shrink-0 transition-colors"
        >
          Submit Founder Pitch &rarr;
        </button>
      </section>
    </div>
  );
};
