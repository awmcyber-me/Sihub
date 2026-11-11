/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed Institute Academy Template View
 */

import React from 'react';
import {
  GraduationCap,
  CheckCircle2,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Award,
  Download
} from 'lucide-react';
import { DynamicPageContent } from '../DynamicCmsPage';

interface TemplateProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

export const InstituteAcademyTemplateView: React.FC<TemplateProps> = ({ page, onNavigate }) => {
  const modules = [
    { num: '01', title: 'Modern Software Engineering & Clean Architecture', hours: '120 Hours', topics: 'TypeScript, React 19, Node.js microservices, relational PostgreSQL design, and production Git workflows.' },
    { num: '02', title: 'Cloud Infrastructure & DevOps CI/CD', hours: '80 Hours', topics: 'Docker containerization, Google Cloud Platform, automated testing pipelines, and serverless architectures.' },
    { num: '03', title: 'Data Pipelines & Applied Artificial Intelligence', hours: '100 Hours', topics: 'Python data science, embeddings, LLM orchestration, local vector stores, and automated data pipelines.' },
    { num: '04', title: 'Capstone Project & Industry Apprenticeship', hours: '140 Hours', topics: 'Building and shipping production solutions for local Somali enterprise clients with code audit reviews.' }
  ];

  return (
    <div className="space-y-16">
      {/* 1. Header Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>{page.heroBadge || 'SiHub Technical Institute'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Industry-Accredited Technical Education'}
          </h1>

          {page.subheading && (
            <p className="text-base sm:text-lg font-medium text-indigo-200 leading-relaxed">
              {page.subheading}
            </p>
          )}

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Practical, intensive technology education engineered for employment in the global digital economy. Students graduate with real production codebases and cryptographically verified certifications.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate(page.cta?.url || '/institute/digital-skills-academy')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <span>{page.cta?.label || 'Enroll in Current Cohort'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-indigo-300 font-semibold flex items-center gap-1.5 bg-indigo-950/60 px-3 py-1.5 rounded-lg border border-indigo-800/80">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Accredited Certification
            </span>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics */}
      {page.stats && page.stats.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {page.stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <p className="text-3xl font-extrabold text-indigo-700 tracking-tight font-mono tabular-nums">{stat.value}</p>
              <p className="text-xs font-bold text-slate-900">{stat.label}</p>
              {stat.description && <p className="text-[11px] text-slate-500">{stat.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* 3. Curriculum Modules */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Comprehensive Syllabus</h2>
            <p className="text-xl font-extrabold text-slate-900">Curriculum Modules & Technical Tracks</p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">440 Total Hours</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">Module {mod.num}</span>
                  <span className="text-xs text-slate-400 font-medium">{mod.hours}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{mod.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">{mod.topics}</p>
              </div>
              <div className="pt-2 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Hands-on Lab Included
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Lab Infrastructure & Admission Criteria */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <Code2 className="w-8 h-8 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">Workstation Labs</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Dedicated multi-monitor developer workstations, high-speed uninterrupted fiber connectivity, and backup generator power at our Mogadishu campus.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <ShieldCheck className="w-8 h-8 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">Scholarships & Inclusion</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Over 60% of students receive full tuition sponsorship through our donor and government partner funds, prioritizing women and regional youth.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <Award className="w-8 h-8 text-amber-600" />
          <h3 className="text-base font-bold text-slate-900">Global Employment Desk</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Direct job placement support with international remote employers, local financial institutions, and telecommunication companies across Somalia.</p>
        </div>
      </section>
    </div>
  );
};
