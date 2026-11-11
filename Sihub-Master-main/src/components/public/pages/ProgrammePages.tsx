/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Dedicated Programme Public Page Designs (8 Pages)
 * 6. Digital Skills Development (/programs/digital-skills)
 * 7. Youth Empowerment (/programs/youth-empowerment)
 * 8. Social Innovation (/programs/social-innovation)
 * 9. Women in Innovation (/programs/women-innovation)
 * 10. Inclusive Digital Inclusion (/programs/inclusive-digital)
 * 11. Green Innovation & Sustainability (/programs/green-sustainability)
 * 12. Youth Peace Innovation (/programs/youth-peace)
 * 13. Community Development (/programs/community-dev)
 */

import React from 'react';
import {
  Code2,
  Users2,
  Lightbulb,
  HeartHandshake,
  Globe,
  Leaf,
  ShieldCheck,
  Building,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  Download,
  FileText
} from 'lucide-react';
import type { DynamicPageContent } from '../DynamicCmsPage';

interface PageProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

// ---------------------------------------------------------------------------
// 6. Digital Skills Development (/programs/digital-skills)
// ---------------------------------------------------------------------------
export const DigitalSkillsPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const tracks = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>{page.heroBadge || 'Flagship Technical Track'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Digital Skills Development: Software, Cloud & Data'}
          </h1>
          <p className="text-base sm:text-lg font-medium text-indigo-200 leading-relaxed">
            {page.subheading || 'Equipping Somali scholars with market-ready engineering skills for local and international tech careers.'}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {page.description || 'Explore digital skills courses and learning pathways published by SiHub.'}
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate(page.cta?.url || '/institute')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              {page.cta?.label || 'Apply for Software Bootcamp'} &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Curriculum Tracks */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Curriculum Streams</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Modern Software Tracks</h2>
        </div>
        {tracks.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <article key={`${track.title}-${index}`} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-slate-900">{track.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{track.description}</p>
            </article>
          ))}
        </div> : <p className="text-sm text-slate-600" role="status">No digital skills tracks have been published yet.</p>}
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 7. Youth Empowerment (/programs/youth-empowerment)
// ---------------------------------------------------------------------------
export const YouthEmpowermentPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const pillars = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Users2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{page.heroBadge || 'Youth Leadership & Economic Pathways'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Youth Empowerment: Catalyzing the Next Generation'}
          </h1>
          <p className="text-base sm:text-lg font-medium text-amber-200 leading-relaxed">
            {page.subheading || 'Transforming youth demography into an engine of self-reliance, innovation, and leadership.'}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {page.description || 'Somalia has one of the youngest populations globally. Our Youth Empowerment Programme combines digital literacy with leadership fellowships, civic action, and micro-grant seed capital.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate(page.cta?.url || '/contact')}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              {page.cta?.label || 'Join Youth Fellowship'} &rarr;
            </button>
          </div>
        </div>
      </section>

      {pillars.length > 0 ? <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar, index) => (
          <article key={`${pillar.title}-${index}`} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 font-bold flex items-center justify-center text-sm">{String(index + 1).padStart(2, '0')}</div>
            <h2 className="text-base font-bold text-slate-900">{pillar.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
          </article>
        ))}
      </section> : <p className="text-sm text-slate-600" role="status">No youth empowerment initiatives have been published yet.</p>}
    </div>
  );
};

// ---------------------------------------------------------------------------
// 8. Social Innovation (/programs/social-innovation)
// ---------------------------------------------------------------------------
export const SocialInnovationPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-700/60 text-rose-300 text-xs font-semibold uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5 text-rose-400" />
            <span>{page.heroBadge || 'Civic Problem-Solving'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Social Innovation: Technology for Public Impact'}
          </h1>
          <p className="text-base sm:text-lg font-medium text-rose-200 leading-relaxed">
            {page.subheading || 'Supporting civic innovators solving water logistics, healthcare access, and public service challenges.'}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {page.description || 'We pair community activists with software engineers and designers to build civic technology prototypes that improve public transparency, humanitarian delivery, and municipal services.'}
          </p>
          <div className="pt-2">
            <button onClick={() => onNavigate('/programs')} className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition-all">
              {page.cta?.label || 'Submit Civic Solution'} &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 9. Women in Innovation (/programs/women-innovation)
// ---------------------------------------------------------------------------
export const WomenInnovationPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-700/60 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{page.heroBadge || 'Gender Equity in Technology'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Women in Innovation: Elevating Somali Female Founders'}
          </h1>
          <p className="text-base sm:text-lg font-medium text-purple-200 leading-relaxed">
            {page.subheading || 'Dedicated incubation tracks, tech leadership fellowships, and seed funding for women entrepreneurs.'}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {page.description || 'Explore women-led innovation programs and opportunities published by SiHub.'}
          </p>
          <div className="pt-2">
            <button onClick={() => onNavigate('/startups')} className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-all">
              {page.cta?.label || 'Explore Female Founder Track'} &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 10. Inclusive Digital Inclusion (/programs/inclusive-digital)
// ---------------------------------------------------------------------------
export const InclusiveDigitalPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <span>{page.heroBadge || 'Decentralized Tech Access'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Inclusive Digital Inclusion: Leaving No Community Behind'}
          </h1>
          <p className="text-base sm:text-lg font-medium text-teal-200 leading-relaxed">
            {page.subheading || 'Outreach vans, satellite clinics, and nomadic smartphone digital literacy across all Somali regions.'}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {page.description || 'Ensuring that internally displaced youths, rural farmers, and nomadic pastoralists access secure mobile banking, agricultural market data, and digital services.'}
          </p>
        </div>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 11. Green Innovation & Sustainability (/programs/green-sustainability)
// ---------------------------------------------------------------------------
export const GreenSustainabilityPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>{page.heroBadge || 'Climate Adaptation & CleanTech'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Green Innovation: Prototyping Renewable & AgriTech Futures'}
          </h1>
          <p className="text-base sm:text-lg font-medium text-emerald-200 leading-relaxed">
            {page.subheading || 'Solar cold-chains, automated drip irrigation sensors, and climate-resilient venture pilots.'}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {page.description || 'Our Garowe station hosts a dedicated green hardware lab testing solar IoT sensors and water salinity tech tailored to Horn of Africa drought resilience.'}
          </p>
        </div>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 12. Youth Peace Innovation (/programs/youth-peace)
// ---------------------------------------------------------------------------
export const YouthPeacePageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/60 border border-sky-700/60 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>{page.heroBadge || 'Peacebuilding & Digital Cohesion'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Youth Peace Innovation: Digital Cohesion Platforms'}
          </h1>
          <p className="text-base sm:text-lg font-medium text-sky-200 leading-relaxed">
            {page.subheading || 'Using technology for inter-community dialogue, hate-speech monitoring, and civic peace alliances.'}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {page.description || 'Empowering youth peace ambassadors to design media campaigns, conflict-mitigation hotlines, and civic debate platforms.'}
          </p>
        </div>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 13. Community Development (/programs/community-dev)
// ---------------------------------------------------------------------------
export const CommunityDevPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span>{page.heroBadge || 'Grassroots Capacity Building'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page.heading || page.title || 'Community Development: Empowering Local Ecosystems'}
          </h1>
          <p className="text-base sm:text-lg font-medium text-cyan-200 leading-relaxed">
            {page.subheading || 'Building community technology spaces, neighborhood makerspaces, and municipal digitization.'}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {page.description || 'Connecting local municipal councils, vocational colleges, and community organizers with tools, mentorship, and micro-grants.'}
          </p>
        </div>
      </section>
    </div>
  );
};
