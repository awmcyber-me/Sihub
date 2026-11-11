/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Dedicated Our Impact Public Page Designs (4 Pages)
 * 28. Success Stories (/impact/success-stories)
 * 29. Projects & Achievements (/impact/projects-achievements)
 * 30. Annual Reports (/impact/annual-reports)
 * 31. Community Impact (/impact/community-impact)
 */

import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  FileText,
  Users,
  Award,
  Download,
  ArrowRight,
  ShieldCheck,
  Building2,
  Globe2,
  Heart,
  BarChart3,
  Layers,
  Sparkles
} from 'lucide-react';
import type { DynamicPageContent } from '../DynamicCmsPage';

interface PageProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

// ---------------------------------------------------------------------------
// 28. Success Stories (/impact/success-stories)
// ---------------------------------------------------------------------------
export const SuccessStoriesPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const stories = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{page.heroBadge || 'Human Impact Stories'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Somali Tech Success Stories'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Real journeys of young Somali engineers, women founders, and community champions whose lives and communities have been transformed through SiHub programs.'}
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      {stories.length > 0 ? <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <article key={`${story.title}-${index}`} className="rounded-2xl bg-white p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-base font-bold text-slate-900 leading-snug">{story.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed mt-3">{story.description}</p>
          </article>
        ))}
      </section> : <p className="text-sm text-slate-600" role="status">No success stories have been published yet.</p>}
    </div>
  );
};

// ---------------------------------------------------------------------------
// 29. Projects & Achievements (/impact/projects-achievements)
// ---------------------------------------------------------------------------
export const ProjectsAchievementsPageView: React.FC<PageProps> = ({ page }) => {
  const achievements = page.stats ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{page.heroBadge || 'Verified Milestones'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Projects & Ecosystem Achievements'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'A transparent, data-driven account of national development deliverables, digital infrastructure milestones, and measurable community outcomes.'}
          </p>
        </div>
      </section>

      {/* KPI Cards */}
      {achievements.length > 0 ? <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => (
          <article key={`${achievement.label}-${index}`} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-800 tracking-tight">{achievement.value}</div>
            <h2 className="text-sm font-bold text-slate-900 mt-2 mb-1">{achievement.label}</h2>
            {achievement.description && <p className="text-xs text-slate-500 leading-relaxed">{achievement.description}</p>}
          </article>
        ))}
      </section> : <p className="text-sm text-slate-600" role="status">No verified project metrics have been published yet.</p>}
    </div>
  );
};

// ---------------------------------------------------------------------------
// 30. Annual Reports (/impact/annual-reports)
// ---------------------------------------------------------------------------
export const AnnualReportsPageView: React.FC<PageProps> = ({ page }) => {
  const reports = page.documents ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>{page.heroBadge || 'Governance & Accountability'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Annual Reports & Audited Filings'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Full institutional transparency, governance disclosures, and audited financial statements published annually for our partners, donors, and the Somali public.'}
          </p>
        </div>
      </section>

      {/* Reports */}
      {reports.length > 0 ? <section className="space-y-4 max-w-3xl mx-auto">
        {reports.map((report, index) => (
          <div key={`${report.title}-${index}`} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm flex items-center justify-between gap-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">{report.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{report.description}{report.fileSize ? ` • ${report.fileSize}` : ''}{report.format ? ` • ${report.format}` : ''}</p>
              </div>
            </div>
            <a href={report.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold transition-colors">
              <Download className="w-3.5 h-3.5" />
              <span>Open report</span>
            </a>
          </div>
        ))}
      </section> : <p className="text-sm text-slate-600" role="status">No annual reports have been published yet.</p>}
    </div>
  );
};

// ---------------------------------------------------------------------------
// 31. Community Impact (/impact/community-impact)
// ---------------------------------------------------------------------------
export const CommunityImpactPageView: React.FC<PageProps> = ({ page }) => {
  const impacts = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-indigo-400" />
            <span>{page.heroBadge || 'Grassroots Transformation'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Community Impact & Social Inclusion'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Ensuring technological progress is deeply inclusive, rooted in community benefit, and accessible to vulnerable and rural Somali populations.'}
          </p>
        </div>
      </section>

      {/* Community Grid */}
      {impacts.length > 0 ? <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {impacts.map((impact, index) => (
          <article key={`${impact.title}-${index}`} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-2">{impact.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{impact.description}</p>
          </article>
        ))}
      </section> : <p className="text-sm text-slate-600" role="status">No community impact initiatives have been published yet.</p>}
    </div>
  );
};
