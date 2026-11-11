/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Dedicated Partnerships Public Page Designs (3 Pages)
 * 32. Become a Partner (/partnerships/become-partner)
 * 33. Donors & Supporters (/partnerships/donors-supporters)
 * 34. Collaboration Opportunities (/partnerships/collaboration-opportunities)
 */

import React, { useState } from 'react';
import {
  Handshake,
  HeartHandshake,
  Briefcase,
  Building2,
  Globe2,
  ArrowRight,
  CheckCircle2,
  Send,
  ShieldCheck,
  Award,
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';
import type { DynamicPageContent } from '../DynamicCmsPage';

interface PageProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

// ---------------------------------------------------------------------------
// 32. Become a Partner (/partnerships/become-partner)
// ---------------------------------------------------------------------------
export const BecomePartnerPageView: React.FC<PageProps> = ({ page }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ org: '', email: '', type: 'corporate', message: '' });

  const tiers = [
    { title: 'Strategic Ecosystem Alliance', audience: 'Telcos, Banks & Tech Conglomerates', focus: 'National scale programs, infrastructure sponsorship, co-branded acceleration cohorts.' },
    { title: 'Academic & Research Consortium', audience: 'Universities & Polytechs', focus: 'Joint degree curricula, faculty exchange, student internships, research publications.' },
    { title: 'Venture & Investor Syndicates', audience: 'Angel Networks & VC Funds', focus: 'Deal flow access, co-investment rights, pitch judging, investor demo day passes.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Handshake className="w-3.5 h-3.5 text-cyan-400" />
            <span>{page.heroBadge || 'Institutional Collaboration'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Partner with Somali Innovation Hub'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Join our national alliance of governments, global tech giants, diaspora foundations, and academic institutions co-investing in Somalia’s digital transformation.'}
          </p>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, i) => (
          <div key={i} className="rounded-2xl bg-white p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full">{tier.audience}</span>
              <h3 className="text-base font-bold text-slate-900 pt-1">{tier.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{tier.focus}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-cyan-800 font-semibold flex items-center gap-1">
              <span>Standard MoU Framework</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </section>

      {/* Inquiry Form */}
      <section className="max-w-3xl mx-auto rounded-3xl bg-white p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Initiate Partnership Discussions</h2>
          <p className="text-xs text-slate-500 mt-1">Our strategic partnerships desk will schedule an executive discovery call within 48 business hours.</p>
        </div>

        {submitted ? (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <p className="font-bold">Thank you for reaching out!</p>
              <p className="text-emerald-700">Your partnership inquiry has been logged. Our Directorate of Strategic Partnerships will contact you promptly.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Organization Name</label>
                <input
                  type="text"
                  required
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  placeholder="e.g. Acme Tech Global / University"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@organization.org"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Partnership Track</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-600"
              >
                <option value="corporate">Corporate / Industry Sponsor</option>
                <option value="academic">Academic / Research Institution</option>
                <option value="donor">Multilateral / Bilateral Development Donor</option>
                <option value="investor">Venture Capital / Angel Syndicate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Collaboration Objectives</label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Briefly outline your proposed collaboration areas or program interests…"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold shadow-sm transition-all"
            >
              <span>Submit Partnership Brief</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 33. Donors & Supporters (/partnerships/donors-supporters)
// ---------------------------------------------------------------------------
export const DonorsSupportersPageView: React.FC<PageProps> = ({ page }) => {
  const donors = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5 text-blue-400" />
            <span>{page.heroBadge || 'Funders & Development Partners'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Donors & Strategic Supporters'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Recognizing the visionary international donors, foundations, and government partners whose catalytic financial support powers SiHub’s country-wide mission.'}
          </p>
        </div>
      </section>

      {/* Donors Grid */}
      {donors.length > 0 ? <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {donors.map((donor, index) => (
          <div key={`${donor.title}-${index}`} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-base font-bold text-slate-900 mb-1">{donor.title}</h2>
            <p className="text-xs text-slate-500 leading-relaxed">{donor.description}</p>
          </div>
        ))}
      </section> : <p className="text-sm text-slate-600" role="status">No donors or supporters have been published yet.</p>}
    </div>
  );
};

// ---------------------------------------------------------------------------
// 34. Collaboration Opportunities (/partnerships/collaboration-opportunities)
// ---------------------------------------------------------------------------
export const CollaborationOpportunitiesPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const opportunities = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>{page.heroBadge || 'Open RFPs & Calls for Proposals'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Collaboration Opportunities & Open Calls'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Active requests for proposals (RFPs), innovation challenge prizes, research fellowships, and vendor opportunities open to institutions and creative teams.'}
          </p>
        </div>
      </section>

      {/* Opportunities List */}
      {opportunities.length > 0 ? <section className="space-y-4 max-w-4xl mx-auto">
        {opportunities.map((opportunity, index) => (
          <div key={`${opportunity.title}-${index}`} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <h2 className="text-base font-bold text-slate-900">{opportunity.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{opportunity.description}</p>
            </div>
            <button
              onClick={() => onNavigate('/partnerships/become-partner')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0 transition-colors"
            >
              <span>Discuss a Collaboration</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </section> : <p className="mx-auto max-w-4xl text-sm text-slate-600" role="status">No collaboration opportunities have been published yet.</p>}
    </div>
  );
};
