/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed Flagship Home Template View
 */

import React from 'react';
import { ArrowRight, Sparkles, Rocket, GraduationCap, Video, Users, Building2, TrendingUp, Compass, Award, ExternalLink } from 'lucide-react';
import { DynamicPageContent } from '../DynamicCmsPage';

interface TemplateProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

export const HomeFlagshipTemplateView: React.FC<TemplateProps> = ({ page, onNavigate }) => {
  const headline = page.heading || 'Accelerating Somalia’s Digital Economy & Youth Innovation';
  const subheadline = page.subheading || 'Somali Innovation Hub (SiHub) is the national nexus empowering the next generation of technologists, social innovators, and high-growth ventures across the Horn of Africa.';
  const somaliTagline = 'Xarunta Hal-abuurka iyo Teknoolojiyadda Soomaaliya';

  const stats = [
    { label: 'Graduates & Practitioners', value: '5,400+', delta: '+42% YoY' },
    { label: 'Ventures Incubated', value: '148', delta: '$1.85M seed unlocked' },
    { label: 'Regional Innovation Hubs', value: '4', delta: 'Mogadishu • Hargeisa • Garowe • Kismayo' },
    { label: 'Women in Innovation', value: '64%', delta: 'Active gender inclusion' },
  ];

  const flagshipTracks = [
    {
      title: 'SiHub Institute & AI Academy',
      desc: 'Industry-standard curriculums in full-stack engineering, cloud architecture, cybersecurity, and practical artificial intelligence.',
      icon: GraduationCap,
      link: '/institute/digital-skills-academy',
      badge: 'Cohort Intake Open',
    },
    {
      title: 'Startup Incubation & Seed Lab',
      desc: 'Four-stage venture incubation offering up to $25,000 non-dilutive catalytic grants, dedicated mentorship, and investor demo days.',
      icon: Rocket,
      link: '/startups/incubation',
      badge: '$25,000 Grants',
    },
    {
      title: 'SiHub Talks & Innovation Summit',
      desc: 'National thought-leadership broadcasts and the annual flagship summit convening 600+ founders, policymakers, and global investors.',
      icon: Video,
      link: '/events/sitalks',
      badge: 'Bi-Weekly Broadcast',
    },
    {
      title: 'Strategic Alliances & Donors',
      desc: 'Collaborative development frameworks with multilateral organizations, bilateral donors, telecom providers, and diaspora syndicates.',
      icon: Building2,
      link: '/partnerships/become-partner',
      badge: 'Institutional RFPs',
    },
  ];

  return (
    <div className="space-y-16">
      {/* 1. Flagship Pre-Designed Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-16 border border-slate-800 shadow-2xl">
        <div className="max-w-4xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{somaliTagline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            {headline}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl">
            {subheadline}
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => onNavigate('/programs/digital-skills')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-950/50"
            >
              <span>Explore Programmes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/startups/incubation')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              <Rocket className="w-4 h-4 text-cyan-400" />
              <span>Apply for Incubation</span>
            </button>
          </div>
        </div>

        {/* Subtle decorative grid overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-cyan-600/10 via-transparent to-transparent pointer-events-none" />
      </section>

      {/* 2. Key Audited Ecosystem Metrics Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
          >
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {stat.value}
            </div>
            <p className="text-sm font-semibold text-slate-700 mt-1">{stat.label}</p>
            <p className="text-xs font-medium text-cyan-700 mt-2">{stat.delta}</p>
          </div>
        ))}
      </section>

      {/* 3. Core Ecosystem Pillars */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Core Strategic Pillars</h2>
            <p className="text-sm text-slate-500">The four engines accelerating technology adoption and entrepreneurship in Somalia</p>
          </div>
          <button
            onClick={() => onNavigate('/about/who-we-are')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-800"
          >
            <span>Learn About SiHub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flagshipTracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl bg-white border border-slate-200 p-8 flex flex-col justify-between space-y-6 shadow-xs hover:border-cyan-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onNavigate(track.link)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {track.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {track.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-cyan-700 group-hover:text-cyan-800">
                  <span>Enter Section</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Regional Hub Presence */}
      <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>National Infrastructure</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Decentralized Innovation Across Somalia
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            SiHub operates physical innovation centers equipped with enterprise fiber connectivity, solar-backed power, prototyping hardware laboratories, and podcast broadcast facilities across four major regional hubs.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs font-bold text-cyan-400">HQ • Flagship</span>
              <p className="text-base font-bold text-white mt-1">Mogadishu</p>
              <p className="text-xs text-slate-400 mt-1">Wadajir Innovation Campus</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs font-bold text-cyan-400">Somaliland Hub</span>
              <p className="text-base font-bold text-white mt-1">Hargeisa</p>
              <p className="text-xs text-slate-400 mt-1">Downtown Tech Lab</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs font-bold text-cyan-400">Puntland Hub</span>
              <p className="text-base font-bold text-white mt-1">Garowe</p>
              <p className="text-xs text-slate-400 mt-1">Civic Tech Center</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs font-bold text-cyan-400">Jubaland Hub</span>
              <p className="text-base font-bold text-white mt-1">Kismayo</p>
              <p className="text-xs text-slate-400 mt-1">Port City Innovation Desk</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
