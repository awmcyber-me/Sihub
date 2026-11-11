/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed Programme Track Template View
 * Covers all 8 official programmes with cohort dates, curriculum tracks, eligibility, and FAQs.
 */

import React, { useState } from 'react';
import {
  Rocket,
  CheckCircle2,
  Calendar,
  Users,
  Clock,
  ArrowRight,
  Download,
  HelpCircle,
  ChevronDown,
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { DynamicPageContent } from '../DynamicCmsPage';

interface TemplateProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

export const ProgrammeTrackTemplateView: React.FC<TemplateProps> = ({ page, onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const mainHeading = page.heading || page.title || 'Specialized Innovation Programme';
  const ctaLabel = page.cta?.label || 'Apply for Current Cohort';
  const ctaUrl = page.cta?.url || '#';

  return (
    <div className="space-y-16">
      {/* 1. Pre-Designed Programme Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{page.heroBadge || page.categoryTitle || 'SiHub Flagship Programme'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {mainHeading}
          </h1>

          {page.subheading && (
            <p className="text-base sm:text-lg font-medium text-cyan-200 leading-relaxed">
              {page.subheading}
            </p>
          )}

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Empowering the next generation of Somali innovators through technical bootcamps, executive mentorship, prototyping grants, and community-driven deployment.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate(ctaUrl)}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-950/40 transition-colors flex items-center gap-2"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-800/60">
              <CheckCircle2 className="w-3.5 h-3.5" /> Applications Open
            </span>
          </div>
        </div>
      </section>

      {/* 2. Key Performance Indicators Strip */}
      {page.stats && page.stats.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {page.stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
              <p className="text-3xl sm:text-4xl font-extrabold text-cyan-800 tracking-tight font-mono tabular-nums">{stat.value}</p>
              <p className="text-sm font-bold text-slate-900">{stat.label}</p>
              {stat.description && <p className="text-xs text-slate-500 leading-relaxed">{stat.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* 3. 2-Column Split: Curriculum & Deliverables vs Cohort Quick-Facts Box */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Core Curriculum Tracks & Objectives */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Curriculum & Focus Areas</h2>
            <p className="text-xl font-extrabold text-slate-900">What You Will Learn & Build</p>
          </div>

          <div className="space-y-4">
            {(page.features && page.features.length > 0 ? page.features : [
              { title: 'Foundational Theory & Toolsets', description: 'Mastering modern technology frameworks, methodologies, and collaborative git/code workflows.' },
              { title: 'Live Prototyping & Fieldwork', description: 'Deploying real-world solutions directly with community partners and local enterprises in Somalia.' },
              { title: 'Mentorship & Investor Pitch Prep', description: 'Weekly 1-on-1 coaching with diaspora pioneers and industry leaders leading up to graduation demo day.' }
            ]).map((feat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-9">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Cohort Quick-Facts Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 block">Cohort Overview</span>
            <h3 className="text-base font-bold text-slate-900">Participation Snapshot</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-cyan-600" /> Duration:</span>
              <strong className="text-slate-900">16 Weeks Full-Time</strong>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-cyan-600" /> Cohort Size:</span>
              <strong className="text-slate-900">25 Selected Innovators</strong>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-cyan-600" /> Location:</span>
              <strong className="text-slate-900">SiHub Campus & Online</strong>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Tuition:</span>
              <strong className="text-emerald-700">100% Scholarship Funded</strong>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => onNavigate(ctaUrl)}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors text-center"
            >
              Submit Application &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 4. Downloadable Syllabus / Overview Documents */}
      {page.documents && page.documents.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Documentation</h2>
            <p className="text-lg font-extrabold text-slate-900">Download Curriculum & Guides</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {page.documents.map((doc, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{doc.title}</h4>
                  <p className="text-xs text-slate-500">{doc.description || 'Official SiHub programmatic overview document.'}</p>
                  <span className="text-[10px] font-mono text-cyan-700 font-semibold">{doc.format || 'PDF'} • {doc.fileSize || '2.4 MB'}</span>
                </div>
                <a
                  href={doc.fileUrl}
                  download
                  className="p-2.5 rounded-xl bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors shrink-0"
                  title="Download document"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Frequently Asked Questions Accordion */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Visitor Assistance</h2>
            <p className="text-lg font-extrabold text-slate-900">Frequently Asked Questions</p>
          </div>
          <div className="space-y-2">
            {page.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-900">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
