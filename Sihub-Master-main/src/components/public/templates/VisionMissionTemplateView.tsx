/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed Vision & Mission Template View
 */

import React from 'react';
import { ArrowRight, CheckCircle2, Quote, Sparkles, Target, Compass, Video } from 'lucide-react';
import { DynamicPageContent } from '../DynamicCmsPage';

interface TemplateProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

export const VisionMissionTemplateView: React.FC<TemplateProps> = ({ page, onNavigate }) => {
  const isVision = (page.slug || '').includes('vision');
  const mainTitle = page.heading || page.title || (isVision ? 'Our Vision for Somalia' : 'Our Institutional Mission');
  const leadStatement = page.summary || page.description || '';

  return (
    <div className="space-y-16">
      {/* 1. Pre-Designed High-Impact Statement Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            {isVision ? <Compass className="w-4 h-4" /> : <Target className="w-4 h-4" />}
            <span>{page.heroBadge || (isVision ? 'Strategic 2030 Horizon' : 'Institutional Mandate')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            {mainTitle}
          </h1>

          {page.subheading && (
            <p className="text-lg sm:text-xl font-medium text-cyan-200 leading-relaxed">
              {page.subheading}
            </p>
          )}

          {leadStatement && (
            <div className="pt-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs text-base sm:text-lg text-slate-200 leading-relaxed font-serif italic">
              "{leadStatement}"
            </div>
          )}

          {page.cta && (
            <div className="pt-4">
              <button
                onClick={() => onNavigate(page.cta!.url)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-950/40"
              >
                <span>{page.cta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Key Measurable Targets (if defined) */}
      {page.stats && page.stats.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {isVision ? 'Strategic Impact Benchmarks' : 'Operational Delivery Metrics'}
            </h2>
            <span className="text-xs text-slate-400">Somalia National Footprint</span>
          </div>
          <div className={`grid grid-cols-1 gap-4 ${
            page.stats.length === 2 ? 'sm:grid-cols-2' :
            page.stats.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'
          }`}>
            {page.stats.map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <p className="text-3xl sm:text-4xl font-extrabold text-cyan-800 tracking-tight font-mono tabular-nums">{stat.value}</p>
                <p className="text-sm font-bold text-slate-900">{stat.label}</p>
                {stat.description && <p className="text-xs text-slate-500 leading-relaxed">{stat.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Strategic Pillars / Guiding Principles */}
      {page.features && page.features.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {isVision ? 'Core Strategic Pillars' : 'Guiding Commitments'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {page.features.map((feat, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold text-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                </div>
                <div className="pt-2 text-xs font-semibold text-cyan-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>National Priority</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Leadership Quote & Endorsement */}
      <section className="rounded-3xl bg-cyan-50/70 border border-cyan-100 p-8 sm:p-12 relative">
        <Quote className="w-12 h-12 text-cyan-200 absolute top-6 right-6 pointer-events-none" />
        <div className="max-w-3xl space-y-4 relative z-10">
          <p className="text-base sm:text-xl font-medium text-slate-800 leading-relaxed">
            "Somalia's greatest untapped wealth is not buried underground; it is the boundless ingenuity, courage, and technological hunger of its young women and men."
          </p>
          <div className="pt-2">
            <p className="text-sm font-bold text-slate-900">SiHub Executive Leadership</p>
            <p className="text-xs text-slate-600">Somali Innovation Hub • Mogadishu HQ</p>
          </div>
        </div>
      </section>
    </div>
  );
};
