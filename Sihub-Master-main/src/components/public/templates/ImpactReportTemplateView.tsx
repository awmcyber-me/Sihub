/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed Ecosystem Impact & Annual Reports Template View
 */

import React from 'react';
import { Award, FileText, Download, TrendingUp, Users, DollarSign, Building2, Globe2, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { DynamicPageContent } from '../DynamicCmsPage';

interface TemplateProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

interface AnnualReport {
  id: string;
  year: string;
  title: string;
  pages: number;
  fileSize: string;
  downloadUrl: string;
  highlights: string[];
}

interface CaseStudy {
  id: string;
  startupOrBeneficiary: string;
  founderOrLead: string;
  sector: string;
  location: string;
  metricHighlight: string;
  quote: string;
  story: string;
  imageUrl?: string;
}

export const ImpactReportTemplateView: React.FC<TemplateProps> = ({ page, onNavigate }) => {
  const isAnnualReport = (page.slug || '').includes('annual');
  const isSuccessStory = (page.slug || '').includes('success');

  const impactMetrics = (page as any).impactMetrics || [
    { label: 'Youth & Women Upskilled', value: '5,420+', delta: '+42% YoY', icon: Users },
    { label: 'Startups Incubated & Supported', value: '148', delta: '82% survival rate', icon: Building2 },
    { label: 'Seed Capital & Grants Catalyzed', value: '$1.85M', delta: 'Across 4 hubs', icon: DollarSign },
    { label: 'Direct High-Skilled Jobs Created', value: '2,150+', delta: 'Tech & services', icon: TrendingUp },
  ];

  const annualReports: AnnualReport[] = (page as any).annualReports || [
    {
      id: 'rep-2025',
      year: '2025',
      title: 'Annual Ecosystem Impact & Financial Transparency Report',
      pages: 48,
      fileSize: '6.4 MB',
      downloadUrl: '#',
      highlights: [
        'National expansion into Garowe and Kismayo regional hub offices',
        'Launch of AI & Emerging Tech Academy with international curriculum accreditation',
        'Facilitated $820k in direct co-investments for Somali tech ventures',
      ],
    },
    {
      id: 'rep-2024',
      year: '2024',
      title: 'Digital Leap Somalia: 2024 Strategic Milestone Report',
      pages: 42,
      fileSize: '5.1 MB',
      downloadUrl: '#',
      highlights: [
        'Over 2,200 women trained in foundational digital literacy and front-end coding',
        'First annual Somali Innovation Summit hosting 500+ ecosystem delegates',
        'Inaugural SiHub Talks broadcast series reaching 85,000 online viewers',
      ],
    },
    {
      id: 'rep-2023',
      year: '2023',
      title: 'Foundational Baseline Report: Building Somalia’s Digital Bridge',
      pages: 36,
      fileSize: '4.2 MB',
      downloadUrl: '#',
      highlights: [
        'Establishment of flagship Mogadishu Innovation Center',
        'First 4 venture incubation cohorts with 90% completion',
      ],
    },
  ];

  const caseStudies: CaseStudy[] = (page as any).caseStudies || [
    {
      id: 'cs-1',
      startupOrBeneficiary: 'Kaabe Pay',
      founderOrLead: 'Amina Warsame & Liban Farah',
      sector: 'Fintech & Offline Payments',
      location: 'Mogadishu Hub',
      metricHighlight: '$240k Seed Round Closed',
      quote: 'SiHub provided us not just the technical cloud architecture, but the legal structure and investor introductions to scale our merchant payment terminals across three regions.',
      story: 'Started as a student capstone idea in the 2024 Incubation Track, Kaabe Pay now powers contactless digital transactions for over 380 retail vendors in central Mogadishu.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'cs-2',
      startupOrBeneficiary: 'Deegaan Solar Agritech',
      founderOrLead: 'Hassan Nur',
      sector: 'Renewable Clean Energy',
      location: 'Hargeisa Hub',
      metricHighlight: '85 Smallholder Farms Powered',
      quote: 'The hardware prototyping lab at SiHub allowed us to test IoT solar telemetry controllers locally without waiting months for overseas lab turnaround.',
      story: 'Deegaan Solar installs pay-as-you-go solar submersible pumps that have reduced farm irrigation fuel costs by 72% in surrounding agricultural valleys.',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="space-y-16">
      {/* 1. Pre-Designed High-Impact Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            {isAnnualReport ? <FileText className="w-4 h-4" /> : <Award className="w-4 h-4" />}
            <span>{page.heroBadge || (isAnnualReport ? 'Audited Governance & Reporting' : 'Transforming Somali Communities')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            {page.heading || (isAnnualReport ? 'Annual Impact & Governance Reports' : 'Our Measured Impact Across Somalia')}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.subheading || (isAnnualReport
              ? 'Complete institutional accountability, audited financial stewardship, and data-driven milestones published annually for our community, government, and donor partners.'
              : 'Empowering Somali youth, entrepreneurs, and women with practical digital capabilities, catalytic seed capital, and sustainable local enterprise creation.')}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => onNavigate('/partnerships/become-partner')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <span>Partner With SiHub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#reports-archive"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Browse All PDF Reports</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Key Audited Metrics Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Verified Cumulative Milestones</h2>
            <p className="text-sm text-slate-500">Audited across Mogadishu, Hargeisa, Garowe, and Kismayo hub programs</p>
          </div>
          <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-lg border border-cyan-200">
            2021 – Present
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactMetrics.map((metric: any, idx: number) => {
            const Icon = metric.icon || TrendingUp;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                  {metric.value}
                </div>
                <p className="text-sm font-semibold text-slate-700 mt-1">{metric.label}</p>
                {metric.delta && (
                  <p className="text-xs font-medium text-emerald-600 mt-2">{metric.delta}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Annual Reports Archive Cards */}
      <section id="reports-archive" className="space-y-8">
        <div className="pb-2 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Official Annual Publications</h2>
          <p className="text-sm text-slate-500">Full PDF downloads with complete programmatic audits and case dossiers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {annualReports.map((report) => (
            <div
              key={report.id}
              className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold font-mono">
                    {report.year}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {report.pages} pages • {report.fileSize}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {report.title}
                </h3>
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Report Highlights:</span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {report.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={report.downloadUrl}
                download
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-200"
              >
                <Download className="w-4 h-4 text-cyan-700" />
                <span>Download Report (PDF)</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Beneficiary & Startup Transformation Stories */}
      <section className="space-y-8">
        <div className="pb-2 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Beneficiary Stories from the Ground</h2>
          <p className="text-sm text-slate-500">Real innovators scaling sustainable enterprises in Somalia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="rounded-3xl bg-slate-50 border border-slate-200 p-8 flex flex-col justify-between space-y-6 shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">{study.sector}</span>
                  <span className="text-xs font-semibold text-slate-500">{study.location}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{study.startupOrBeneficiary}</h3>
                  <p className="text-xs text-slate-500 font-medium">Led by {study.founderOrLead}</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold inline-block">
                  Key Metric: {study.metricHighlight}
                </div>
                <blockquote className="text-sm italic text-slate-700 bg-white p-4 rounded-xl border border-slate-200">
                  "{study.quote}"
                </blockquote>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {study.story}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => onNavigate('/startups/entrepreneurs')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-800"
                >
                  <span>Explore More Entrepreneur Profiles</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
