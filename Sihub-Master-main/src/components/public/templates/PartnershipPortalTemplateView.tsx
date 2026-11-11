/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed Strategic Alliance & Donor Portal Template View
 */

import React, { useState } from 'react';
import { Handshake, Globe2, Building2, Landmark, CheckCircle2, ArrowRight, Mail, Sparkles, Send, FileCheck } from 'lucide-react';
import { DynamicPageContent } from '../DynamicCmsPage';

interface TemplateProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

interface PartnerTrack {
  id: string;
  title: string;
  category: string;
  description: string;
  benefits: string[];
  icon: string;
}

interface ActiveCall {
  id: string;
  title: string;
  sponsor: string;
  deadline: string;
  grantOrScope: string;
  description: string;
  status: 'Open' | 'Rolling' | 'Reviewing';
}

export const PartnershipPortalTemplateView: React.FC<TemplateProps> = ({ page, onNavigate }) => {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    contactName: '',
    email: '',
    partnerType: 'Corporate / Industry Partner',
    message: '',
  });

  const partnerTracks: PartnerTrack[] = (page as any).partnerTracks || [
    {
      id: 'track-1',
      title: 'Bilateral & Multilateral Donors',
      category: 'Development Alliances',
      description: 'Co-design large-scale digital skills, women empowerment, and youth employment interventions with audited governance standards.',
      benefits: ['Transparent quarterly monitoring and evaluation', 'Audited financial reconciliation', 'Field operational footprint across 4 Somali regions'],
      icon: 'landmark',
    },
    {
      id: 'track-2',
      title: 'Venture Capital & Diaspora Angels',
      category: 'Venture Financing',
      description: 'Access proprietary deal-flow from our venture acceleration cohorts, co-invest alongside the SiHub Seed Facility, and mentor high-potential Somali founders.',
      benefits: ['Curated Demo Day pitch sessions', 'Pre-diligenced legal and compliance dossiers', 'Local ecosystem syndicate networks'],
      icon: 'building',
    },
    {
      id: 'track-3',
      title: 'Technology & Cloud Providers',
      category: 'Infrastructure & Tooling',
      description: 'Equip Somali startups and university scholars with enterprise software credits, cloud infrastructure, AI sandboxes, and developer certifications.',
      benefits: ['Direct brand visibility to 5,000+ engineers', 'Hackathon co-branding and hardware lab naming', 'Integration into national training curriculum'],
      icon: 'globe',
    },
  ];

  const activeCalls: ActiveCall[] = (page as any).activeCalls || [
    {
      id: 'call-1',
      title: 'Horn of Africa Agritech Resilience Facility',
      sponsor: 'In Partnership with Global Climate Alliance',
      deadline: 'June 30, 2026',
      grantOrScope: 'Up to $40,000 per project',
      description: 'Seeking technical consortium partners and agritech ventures providing smart irrigation and weather index telemetry for smallholder farmers.',
      status: 'Open',
    },
    {
      id: 'call-2',
      title: 'Women in Fintech & Micro-Commerce Accelerator',
      sponsor: 'SiHub Gender Digital Inclusion Desk',
      deadline: 'Rolling Intake',
      grantOrScope: 'Catalytic grants + Mentorship',
      description: 'Co-designed with regional microfinance banks to pilot digital ledger credit scoring for Somali female micro-retailers.',
      status: 'Rolling',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="space-y-16">
      {/* 1. Pre-Designed Institutional Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Handshake className="w-4 h-4" />
            <span>{page.heroBadge || 'Institutional Alliances & Donor Network'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            {page.heading || 'Partner With Somalia’s Leading Innovation Engine'}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.subheading || 'We collaborate with multilateral institutions, venture capital syndicates, global technology providers, and academic foundations to build a prosperous, technology-empowered Somalia.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <a
              href="#partnership-form"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <span>Submit Partnership Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#active-calls"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              <span>View Active Calls & RFPs</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Strategic Partnership Modalities */}
      <section className="space-y-8">
        <div className="pb-2 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Collaboration Modalities</h2>
          <p className="text-sm text-slate-500">Flexible engagement structures for international and local institutional partners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerTracks.map((track) => (
            <div
              key={track.id}
              className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between space-y-6 shadow-xs hover:border-cyan-300 transition-all"
            >
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">{track.category}</span>
                <h3 className="text-xl font-bold text-slate-900">{track.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{track.description}</p>
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Key Commitments:</span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {track.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href="#partnership-form"
                  onClick={() => setFormData({ ...formData, partnerType: track.title })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-800"
                >
                  <span>Initiate Discussion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Active Calls & Open RFPs */}
      <section id="active-calls" className="space-y-8">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Active Calls for Collaboration</h2>
            <p className="text-sm text-slate-500">Current open requests for consortium proposals and pilot sponsorships</p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            Open Submissions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeCalls.map((call) => (
            <div
              key={call.id}
              className="rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {call.status}
                  </span>
                  <span className="text-xs font-medium text-slate-500">Deadline: {call.deadline}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{call.title}</h3>
                <p className="text-xs font-semibold text-cyan-700">{call.sponsor}</p>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800">
                  Target Envelope: {call.grantOrScope}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{call.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <a
                  href="#partnership-form"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-800"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Request Full RFP Brief</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Official Partnership Inquiry Form */}
      <section id="partnership-form" className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-xl">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Direct Secretariat Channel</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Start a Partnership Conversation</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Our Strategic Partnerships Secretariat responds within two business days to institutional inquiries.
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="p-8 rounded-2xl bg-cyan-950/60 border border-cyan-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-cyan-600/20 text-cyan-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Partnership Inquiry Received</h3>
              <p className="text-sm text-slate-300">
                Thank you. The SiHub Partnerships team has logged your submission and will contact you at <span className="text-cyan-300 font-mono">{formData.email}</span> with a collaboration brief.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Organization / Entity</label>
                  <input
                    type="text"
                    required
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    placeholder="e.g. World Bank / Tech Firm"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-hidden focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Contact Name</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-hidden focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Institutional Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.org"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-hidden focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Partnership Category</label>
                  <select
                    value={formData.partnerType}
                    onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-hidden focus:border-cyan-500"
                  >
                    <option>Bilateral & Multilateral Donors</option>
                    <option>Venture Capital & Diaspora Angels</option>
                    <option>Technology & Cloud Providers</option>
                    <option>Academic & Research Institute</option>
                    <option>Government Ministry / Public Agency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Collaboration Proposal or Inquiry</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline the scope, intended regional focus, or programmatic goals of your collaboration..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-hidden focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Partnership Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
