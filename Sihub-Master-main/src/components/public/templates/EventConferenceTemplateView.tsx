/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed Event & Conference Template View (SiHub Talks, Summit, Expo)
 * Single coherent visual hierarchy with keynote video showcase, speakers lineup, agenda, and registration.
 */

import React from 'react';
import { Calendar, Clock, MapPin, Users, Video, ArrowRight, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { DynamicPageContent } from '../DynamicCmsPage';

interface TemplateProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

export const EventConferenceTemplateView: React.FC<TemplateProps> = ({ page, onNavigate }) => {
  const isTalks = (page.slug || '').includes('talks') || (page.slug || '').includes('sitalks');
  const isSummit = (page.slug || '').includes('summit');
  const isExpo = (page.slug || '').includes('expo');

  const speakers = [
    { name: 'Dr. Amina Farah', role: 'Executive Director, SiHub', topic: 'Somalia\'s Digital Leap: Telecommunications, Youth, and Innovation Sovereignty', org: 'Somali Innovation Hub' },
    { name: 'Abdirahman Kahin', role: 'Managing Partner, Horn Capital', topic: 'Diaspora Angel Syndicates: Financing East Africa\'s Next Unicorns', org: 'Nairobi & Mogadishu' },
    { name: 'Fadumo Warsame', role: 'Founder, GeelPay Financial', topic: 'Building Resilient FinTech Infrastructure for Nomadic Economies', org: 'Somali FinTech Coalition' },
    { name: 'Khadar Hassan', role: 'Civic Tech Lead, SiHub Labs', topic: 'Decentralized Civic Tech & Digital Peacebuilding in Fragile States', org: 'SiHub Mogadishu' }
  ];

  const agenda = [
    { time: '09:00 AM', title: 'Opening Institutional Keynote & Welcome Address', speaker: 'SiHub Executive Leadership' },
    { time: '10:30 AM', title: 'Panel: Venture Capital & Cross-Border Investment in Somalia', speaker: 'Diaspora Angels & Regional Fund Managers' },
    { time: '01:00 PM', title: 'Founders Showcase & Prototype Live Demo Battle', speaker: 'Top 8 Cohort Accelerator Startups' },
    { time: '03:30 PM', title: 'Closing Networking Reception & Bilateral Deal Announcements', speaker: 'Government Ministers & Global Tech Allies' }
  ];

  return (
    <div className="space-y-16">
      {/* 1. Pre-Designed Event Hero (Single unified hero - zero duplication!) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              {page.heroBadge || (isTalks ? 'Monthly Keynote Gathering' : isSummit ? 'Annual Flagship Summit' : 'Interactive Public Expo')}
            </span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Next Session: May 2026</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Somali Innovation Gathering'}
          </h1>

          {page.subheading && (
            <p className="text-base sm:text-lg font-medium text-cyan-200 leading-relaxed">
              {page.subheading}
            </p>
          )}

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Convening founders, policymakers, researchers, and young technologists to shape the trajectory of East Africa\'s emerging digital frontier.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate(page.cta?.url || '/events')}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-950/40 transition-colors flex items-center gap-2"
            >
              <span>{page.cta?.label || 'Register Free Attendance'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>SiHub Mogadishu Campus • Livestreamed Globally</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Event Metrics */}
      {page.stats && page.stats.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {page.stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <p className="text-3xl font-extrabold text-cyan-700 tracking-tight font-mono tabular-nums">{stat.value}</p>
              <p className="text-xs font-bold text-slate-900">{stat.label}</p>
              {stat.description && <p className="text-[11px] text-slate-500">{stat.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* 3. Featured Video Showcase Player */}
      <section className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between text-white border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Featured Keynote & Livestream Archive</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">Recorded at SiHub HQ</span>
        </div>
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800">
          <iframe
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
            title="SiHub Keynote Stream"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* 4. Featured Keynote Speakers Lineup */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Thought Leaders & Panelists</h2>
            <p className="text-xl font-extrabold text-slate-900">Featured Keynote Speakers</p>
          </div>
          <span className="text-xs text-cyan-700 font-semibold bg-cyan-50 px-2.5 py-1 rounded-full">Global Lineup</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((spk, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-cyan-900 text-white flex items-center justify-center font-bold text-sm">
                  {spk.name.slice(0, 2).toUpperCase()}
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{spk.name}</h3>
                <p className="text-xs font-semibold text-cyan-700">{spk.role}</p>
                <p className="text-[11px] text-slate-400">{spk.org}</p>
                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100 italic">
                  "{spk.topic}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Event Schedule & Agenda */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Program Schedule</h2>
          <p className="text-xl font-extrabold text-slate-900">Session Timeline & Run of Show</p>
        </div>

        <div className="space-y-3">
          {agenda.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md">{item.time}</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500">Speakers: {item.speaker}</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 shrink-0 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> Main Stage
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Registration Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Seats Reserved on First-Come Basis</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Join Hundreds of Innovators in Mogadishu</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Attendance is free for verified students, startup founders, and academic researchers. RSVP your pass to receive venue security credentials and livestream links.
          </p>
        </div>
        <button
          onClick={() => onNavigate(page.cta?.url || '/events')}
          className="px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shrink-0 transition-colors"
        >
          Claim Your Free Ticket &rarr;
        </button>
      </section>
    </div>
  );
};
