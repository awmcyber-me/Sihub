/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Dedicated About SiHub Public Page Designs (4 Pages)
 * 1. Who We Are (/about/who-we-are)
 * 2. Our Vision (/about/vision)
 * 3. Our Mission (/about/mission)
 * 4. Our Team (/about/our-team)
 */

import React from 'react';
import {
  Building2,
  Target,
  Compass,
  Users,
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe2,
  Mail,
  Linkedin,
  Clock,
  Heart
} from 'lucide-react';
import type { DynamicPageContent } from '../DynamicCmsPage';

interface PageProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

// ---------------------------------------------------------------------------
// 1. Who We Are (/about/who-we-are)
// ---------------------------------------------------------------------------
export const WhoWeArePageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const stations = page.features ?? [];
  const milestones = page.stats ?? [];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>{page.heroBadge || 'Somalia\'s National Innovation Ecosystem'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Who We Are: Catalyzing Somali Innovation'}
          </h1>

          <p className="text-base sm:text-lg font-medium text-slate-300 leading-relaxed">
            {page.subheading || 'Bridging grassroots talent with venture capital, digital skills, and institutional partnerships.'}
          </p>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-3xl">
            {page.description || 'Somali Innovation Hub (SiHub) is the premier nationwide platform fostering youth-led technology, entrepreneurial ecosystems, and sustainable economic transformation across the Horn of Africa.'}
          </p>

          {page.cta?.label && (
            <div className="pt-2">
              <button
                onClick={() => onNavigate(page.cta?.url || '/about/vision')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all"
              >
                <span>{page.cta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Published locations */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Nationwide Presence</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">SiHub Locations</h2>
          <p className="text-xs sm:text-sm text-slate-600">Locations published by the organization.</p>
        </div>

        {stations.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stations.map((station, index) => (
            <article key={`${station.title}-${index}`} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{station.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{station.description}</p>
            </article>
          ))}
        </div> : <p className="text-center text-sm text-slate-600" role="status">No SiHub locations have been published yet.</p>}
      </section>

      {/* Strategic Milestones */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Our Journey</span>
          <h2 className="text-2xl sm:text-3xl font-bold">From Grassroots Initiative to National Ecosystem</h2>
        </div>

        {milestones.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((milestone, index) => (
            <article key={`${milestone.label}-${index}`} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="text-2xl font-black text-blue-400">{milestone.value}</span>
              <h3 className="text-sm font-bold text-white">{milestone.label}</h3>
              {milestone.description && <p className="text-xs text-slate-400 leading-relaxed">{milestone.description}</p>}
            </article>
          ))}
        </div> : <p className="text-center text-sm text-slate-300" role="status">No milestones have been published yet.</p>}
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 2. Our Vision (/about/vision)
// ---------------------------------------------------------------------------
export const VisionPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const visionPillars = [
    { title: 'Knowledge Economy Sovereignty', desc: 'Transitioning Somalia from aid-dependency to a vibrant producer of digital talent, technology exports, and software intellectual property.' },
    { title: 'Grassroots Inclusion & Equity', desc: 'Ensuring that female innovators, rural pastoral communities, and displaced youth have equal access to 21st-century digital tools.' },
    { title: 'Homegrown Solutions for Real Challenges', desc: 'Deploying technology in agriculture, water logistics, mobile payments, and public health tailored to Somalia’s context.' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero with Vision Declaration Quote */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            <span>{page.heroBadge || 'Our Strategic 2030 Horizon'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Our Vision: A Digitally Empowered Somalia'}
          </h1>

          {/* High-Emphasis Statement Quote Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-800/80 border-l-4 border-cyan-400 text-slate-100 shadow-inner space-y-2">
            <span className="text-xs uppercase font-bold text-cyan-300 tracking-wider">Official Vision Statement</span>
            <p className="text-base sm:text-xl font-medium leading-relaxed italic">
              "{((page as any)?.visionStatement) || page.description || 'We envision Somalia as a vibrant, resilient, and self-reliant knowledge economy powered by grassroots digital skills, innovative entrepreneurs, and ethical technology solutions.'}"
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {((page as any)?.supportingDescription) || page.subheading || 'By 2030, our goal is to empower 50,000 certified Somali youths, incubate 500 scalable enterprises, and establish Somalia as East Africa\'s most dynamic startup frontier.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('/about/mission')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <span>Explore Our Mission &rarr;</span>
            </button>
            <button
              onClick={() => onNavigate('/programs')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
            >
              <span>View Programmes</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Core Vision Pillars */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">The Roadmap</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">3 Pillars of the 2030 Vision</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visionPillars.map((p, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 3. Our Mission (/about/mission)
// ---------------------------------------------------------------------------
export const MissionPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const missionValues = [
    { title: 'Inclusion & Accessibility', desc: 'No Somali youth is left behind regardless of region, gender, or background.', icon: <Heart className="w-5 h-5 text-rose-500" /> },
    { title: 'Integrity & Ethics', desc: 'Transparent governance, accountability to beneficiaries, and data privacy.', icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> },
    { title: 'Homegrown Innovation', desc: 'Valuing local context and indigenous Somali problem-solving over imported frameworks.', icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
    { title: 'Collaborative Impact', desc: 'Partnering across government, universities, diaspora, and global allies.', icon: <Globe2 className="w-5 h-5 text-blue-500" /> }
  ];

  return (
    <div className="space-y-16">
      {/* Mission Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>{page.heroBadge || 'Our Driving Mandate'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Our Mission: Empowering Ideas, Creating Opportunities'}
          </h1>

          <div className="p-6 sm:p-8 rounded-2xl bg-slate-800/80 border-l-4 border-indigo-400 text-slate-100 shadow-inner space-y-2">
            <span className="text-xs uppercase font-bold text-indigo-300 tracking-wider">Mission Statement</span>
            <p className="text-base sm:text-xl font-medium leading-relaxed italic">
              "{((page as any)?.missionStatement) || page.description || 'To catalyze economic opportunity and human potential across Somalia by providing accessible digital education, seed incubation, venture funding, and strategic mentorship.'}"
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {page.subheading || 'Through cutting-edge software training, startup acceleration, and civic tech labs, we transform ambitious Somali youths into global creators and innovators.'}
          </p>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('/about/our-team')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <span>Meet Our Team &rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Core Values */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Guiding Principles</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {missionValues.map((v, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                {v.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900">{v.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 4. Our Team (/about/our-team)
// ---------------------------------------------------------------------------
export const TeamPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const teamMembers = Array.isArray(page.team) ? page.team : [];

  return (
    <div className="space-y-16">
      {/* Team Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-teal-400" />
            <span>{page.heroBadge || 'Our Leadership & Stewards'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Meet the Minds Behind Somali Innovation Hub'}
          </h1>

          <p className="text-base sm:text-lg font-medium text-slate-300 leading-relaxed max-w-3xl">
            {page.subheading || 'Leadership and team profiles published by SiHub.'}
          </p>

          <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
            {page.description || 'Review the roles and biographies currently published by the organization.'}
          </p>
        </div>
      </section>

      {/* Team Roster Grid */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Team and Leadership</h2>
            <p className="text-xs text-slate-500">Profiles published by the organization.</p>
          </div>
        </div>

        {teamMembers.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => {
            const initials = (member.name || 'Member').split(' ').map(name => name[0]).join('').slice(0, 2).toUpperCase();
            return (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-center">
                <div className="space-y-3">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover ring-2 ring-teal-600/20"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-tr from-teal-700 to-slate-900 text-white flex items-center justify-center text-xl font-bold shadow-inner">
                      {initials}
                    </div>
                  )}

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                    <p className="text-xs font-semibold text-teal-700">{member.role}</p>
                    <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{member.station || 'SiHub'}</span>
                    </p>
                  </div>

                  {member.bio && (
                    <p className="text-xs text-slate-600 leading-relaxed text-left line-clamp-4 pt-1 border-t border-slate-100">
                      {member.bio}
                    </p>
                  )}
                </div>

                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-teal-700 pt-2 border-t border-slate-100 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{member.email}</span>
                  </a>
                )}
              </div>
            );
          })}
        </div>
        : <p className="text-sm text-slate-600" role="status">No team profiles have been published yet.</p>}
      </section>
    </div>
  );
};
