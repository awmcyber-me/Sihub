/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Dedicated Entrepreneurship & Startups Public Page Designs (4 Pages)
 * 14. Startup Incubation (/startups/incubation)
 * 15. Featured Somali Entrepreneurs (/startups/entrepreneurs)
 * 16. Youth Mentorship Network (/startups/youth-mentorship)
 * 17. Startup Support Services (/startups/startup-support)
 */

import React from 'react';
import {
  Rocket,
  Users,
  Briefcase,
  HelpCircle,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Target,
  ExternalLink,
  Building,
  Calendar,
  Layers,
  FileCheck,
  Zap
} from 'lucide-react';
import type { DynamicPageContent } from '../DynamicCmsPage';

interface PageProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

// ---------------------------------------------------------------------------
// 14. Startup Incubation (/startups/incubation)
// ---------------------------------------------------------------------------
export const StartupIncubationPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const incubationRoadmap = [
    {
      phase: 'Phase 01: Ideation & Validation',
      weeks: 'Weeks 1 – 4',
      focus: 'Customer discovery, problem-solution fit, Lean Canvas modeling, and Somali market feasibility.'
    },
    {
      phase: 'Phase 02: MVP Development & Prototyping',
      weeks: 'Weeks 5 – 10',
      focus: 'Hardware lab access, cloud architecture credits, wireframing, and alpha pilot deployment.'
    },
    {
      phase: 'Phase 03: Growth & Traction',
      weeks: 'Weeks 11 – 16',
      focus: 'Go-to-market execution, regulatory compliance, customer acquisition, and unit economics.'
    },
    {
      phase: 'Phase 04: Demo Day & Investor Access',
      weeks: 'Week 17 – 20',
      focus: 'Pitch deck clinic, institutional investor roadshow, and up to $25,000 equity-free seed grants.'
    }
  ];

  const packagePerks = [
    { title: 'Seed Grant Access', desc: 'Direct pathway to non-dilutive catalytic funding from verified donor pools.' },
    { title: 'Mogadishu & Regional Co-working', desc: 'High-speed fiber connectivity, meeting boardrooms, and maker prototyping labs.' },
    { title: 'Tech Stack Credits', desc: '$100K+ combined cloud credits across AWS, Google Cloud, and GitHub Enterprise.' },
    { title: 'Legal & IP Incorporation', desc: 'Company registration support with the Ministry of Commerce & Industry.' }
  ];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Rocket className="w-3.5 h-3.5 text-amber-400" />
            <span>{page.heroBadge || 'SiHub Accelerator'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Startup Incubation Programme'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Transforming early-stage Somali tech innovations into investment-ready, sustainable ventures through rigorous mentorship, technical capital, and global investor connections.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate(page.cta?.url || '/startups/incubation/apply')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all"
            >
              <span>{page.cta?.label || 'Apply for Cohort 2026'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/startups/entrepreneurs')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all"
            >
              <span>Browse Incubated Startups</span>
            </button>
          </div>
        </div>
      </section>

      {/* Incubation Roadmap */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Structured Growth Track</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">20-Week Incubation Milestones</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {incubationRoadmap.map((step, idx) => (
            <div key={idx} className="relative rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-amber-600 font-mono">{step.weeks}</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-2">{step.phase}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Program Perks Grid */}
      <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Venture Capital & Infrastructure</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">What Selected Startups Receive</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {packagePerks.map((perk, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">{perk.title}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 15. Featured Somali Entrepreneurs (/startups/entrepreneurs)
// ---------------------------------------------------------------------------
export const FeaturedEntrepreneursPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const ventures = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>{page.heroBadge || 'Somali Founder Spotlight'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Featured Somali Entrepreneurs'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Spotlighting resilient founders who are solving critical national challenges across logistics, finance, healthcare, and green energy through indigenous Somali tech enterprises.'}
          </p>
        </div>
      </section>

      {/* Venture Directory Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Portfolio Showcase</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">High-Impact SiHub Startups</h2>
          </div>
        </div>

        {ventures.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ventures.map((venture, index) => (
            <article key={`${venture.title}-${index}`} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-lg font-bold text-slate-900">{venture.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">{venture.description}</p>
            </article>
          ))}
        </div> : <p className="text-sm text-slate-600" role="status">No entrepreneur profiles have been published yet.</p>}
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 16. Youth Mentorship Network (/startups/youth-mentorship)
// ---------------------------------------------------------------------------
export const YouthMentorshipPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const mentors = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>{page.heroBadge || 'Global Diaspora & Local Mentors'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Youth Mentorship Network'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Connecting aspiring Somali startup creators with established executive mentors, technologists, and investors across Europe, North America, the Gulf, and East Africa.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('/mentorship')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all"
            >
              <span>Request a Mentor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/partnerships/become-partner')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all"
            >
              <span>Join as a Diaspora Mentor</span>
            </button>
          </div>
        </div>
      </section>

      {/* Mentor Roster */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Active Mentorship Pool</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Featured Industry Advisors</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.length > 0 ? mentors.map((mentor, index) => (
            <article key={`${mentor.title}-${index}`} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-sm font-bold text-slate-900">{mentor.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">{mentor.description}</p>
            </article>
          )) : <p className="text-sm text-slate-600" role="status">No mentor profiles have been published yet.</p>}
        </div>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 17. Startup Support Services (/startups/startup-support)
// ---------------------------------------------------------------------------
export const StartupSupportPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const servicePillars = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>{page.heroBadge || 'Venture Advisory & Support'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Startup Support Services'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Institutional infrastructure, legal advisory, and technical consulting to help Somali enterprises de-risk execution, build solid governance, and scale sustainably.'}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      {servicePillars.length > 0 ? <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicePillars.map((service, index) => (
          <article key={`${service.title}-${index}`} className="rounded-2xl bg-white p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-2">{service.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{service.description}</p>
          </article>
        ))}
      </section> : <p className="text-sm text-slate-600" role="status">No startup support services have been published yet.</p>}
    </div>
  );
};
