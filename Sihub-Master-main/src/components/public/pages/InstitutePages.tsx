/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Dedicated SiHub Institute Public Page Designs (5 Pages)
 * 18. Digital Skills Academy (/institute/digital-skills-academy)
 * 19. Professional & Executive Training (/institute/professional-training)
 * 20. AI & Emerging Technologies (/institute/ai-emerging)
 * 21. Research & Policy Innovation (/institute/research-innovation)
 * 22. Certification & Verification (/institute/certification)
 */

import React, { useState } from 'react';
import { apiGet, ApiError } from '../../../services/apiClient';
import { useCourseCatalog } from '../../../hooks/useCourseCatalog';
import {
  GraduationCap,
  Award,
  Cpu,
  BookOpen,
  CheckCircle2,
  Search,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Download,
  Calendar,
  Layers,
  FileText,
  Binary,
  Compass,
  AlertCircle
} from 'lucide-react';
import type { DynamicPageContent } from '../DynamicCmsPage';

interface PageProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

// ---------------------------------------------------------------------------
// 18. Digital Skills Academy (/institute/digital-skills-academy)
// ---------------------------------------------------------------------------
export const DigitalSkillsAcademyPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const { courses, loading, error } = useCourseCatalog();

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/60 border border-sky-700/60 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
            <span>{page.heroBadge || 'SiHub Technical Academy'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Digital Skills Academy'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Empowering the next generation of Somali software engineers, product designers, and cyber defense specialists with hands-on immersive lab training.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate(page.cta?.url || '/courses')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold shadow-md transition-all"
            >
              <span>{page.cta?.label || 'Explore Syllabus & Enroll'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Academy Courses */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Active Curriculum</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Bootcamp Tracks & Courses</h2>
        </div>

        {courses.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => (
            <article key={course.id} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full">{course.durationWeeks} weeks</span>
                <span className="text-[11px] font-medium text-slate-500">{course.level}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{course.title}</h3>
              <p className="text-xs text-slate-600 mt-2">{course.description}</p>
              <button onClick={() => onNavigate('/courses')} className="mt-4 text-xs font-semibold text-sky-700 hover:text-sky-900">View course details <ArrowRight className="inline h-3.5 w-3.5" /></button>
            </article>
          ))}
        </div> : <p className="text-sm text-slate-600" role="status">
          {loading ? 'Loading published courses…' : error ? 'Course information is currently unavailable.' : 'No courses have been published yet.'}
        </p>}
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 19. Professional & Executive Training (/institute/professional-training)
// ---------------------------------------------------------------------------
export const ProfessionalTrainingPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const modules = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/60 border border-violet-700/60 text-violet-300 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-violet-400" />
            <span>{page.heroBadge || 'Executive Education'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Professional & Executive Training'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Upskilling senior Somali leaders, enterprise decision-makers, and ministry executives with strategic digital competencies to lead institutional transformation.'}
          </p>
        </div>
      </section>

      {/* Modules */}
      {modules.length > 0 ? <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module, index) => (
          <article key={`${module.title}-${index}`} className="rounded-2xl bg-white p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-base font-bold text-slate-900 mb-2">{module.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{module.description}</p>
          </article>
        ))}
      </section> : <p className="text-sm text-slate-600" role="status">No training modules have been published yet.</p>}
    </div>
  );
};

// ---------------------------------------------------------------------------
// 20. AI & Emerging Technologies (/institute/ai-emerging)
// ---------------------------------------------------------------------------
export const AiEmergingTechPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const researchPillars = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <span>{page.heroBadge || 'Applied AI Lab'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'AI & Emerging Technologies'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Pioneering frontier research in artificial intelligence, computer vision, satellite sensing, and IoT sensors engineered specifically for the Somali socioeconomic context.'}
          </p>
        </div>
      </section>

      {/* Lab Pillars */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {researchPillars.length > 0 ? researchPillars.map((pillar, index) => (
          <article key={`${pillar.title}-${index}`} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
              <Binary className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-2">{pillar.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
          </article>
        )) : <p className="text-sm text-slate-600" role="status">No research areas have been published yet.</p>}
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 21. Research & Policy Innovation (/institute/research-innovation)
// ---------------------------------------------------------------------------
export const ResearchInnovationPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const publications = page.documents ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>{page.heroBadge || 'SiHub Think Tank'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Research & Policy Innovation'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Authoritative data, policy whitepapers, and rigorous analysis informing ministries, international agencies, and civil society on the evolution of Somalia’s digital landscape.'}
          </p>
        </div>
      </section>

      {/* Publications */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Open Knowledge Repository</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Published Policy Studies & Whitepapers</h2>
        </div>

        {publications.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((publication, index) => (
            <article key={`${publication.title}-${index}`} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">{publication.title}</h2>
                <p className="text-xs text-slate-500 mt-2">{publication.description}{publication.fileSize ? ` • ${publication.fileSize}` : ''}{publication.format ? ` • ${publication.format}` : ''}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <a href={publication.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 text-xs">
                  <Download className="w-3.5 h-3.5" />
                  <span>Open publication</span>
                </a>
              </div>
            </article>
          ))}
        </div> : <p className="text-sm text-slate-600" role="status">No research publications have been published yet.</p>}
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 22. Certification & Verification (/institute/certification)
// ---------------------------------------------------------------------------
export const CertificationVerificationPageView: React.FC<PageProps> = ({ page }) => {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState<{
    status: 'idle' | 'loading' | 'valid' | 'invalid' | 'error';
    data?: { certificateNumber: string; issueDate: string; grade: string; course: { title: string }; student: { fullName: string } };
  }>({ status: 'idle' });

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const certificateNumber = certId.trim();
    if (!certificateNumber) return;
    setResult({ status: 'loading' });
    try {
      const response = await apiGet<{ certificate: NonNullable<typeof result.data> }>(
        `/api/education/certificates/verify/${encodeURIComponent(certificateNumber)}`
      );
      setResult({ status: 'valid', data: response.certificate });
    } catch (reason) {
      setResult({ status: reason instanceof ApiError && reason.status === 404 ? 'invalid' : 'error' });
    }
  };

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>{page.heroBadge || 'Tamper-Proof Credential Registry'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Certification & Credential Verification'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Verify the cryptographic authenticity of any diploma, fellowship certificate, or micro-credential issued by the Somali Innovation Hub Institute.'}
          </p>
        </div>
      </section>

      {/* Verification Portal */}
      <section className="max-w-3xl mx-auto rounded-3xl bg-white p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Enter Certificate Serial Number</h2>
          <p className="text-xs text-slate-500 mt-1">Enter the certificate number printed on the credential.</p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            placeholder="SIHUB-2026-0123456789ABCDEF"
            required
            aria-label="Certificate serial number"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-mono uppercase"
          />
          <button
            type="submit"
            disabled={result.status === 'loading'}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            {result.status === 'loading' ? 'Checking…' : 'Verify Credential'}
          </button>
        </form>

        {result.status === 'valid' && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Official Credential Verified</span>
            </div>
            <div className="text-xs space-y-1 pt-2">
              <p><strong>Credential ID:</strong> {result.data?.certificateNumber}</p>
              <p><strong>Recipient:</strong> {result.data?.student.fullName}</p>
              <p><strong>Programme:</strong> {result.data?.course.title}</p>
              <p><strong>Issuance Date:</strong> {result.data?.issueDate ? new Date(result.data.issueDate).toLocaleDateString() : ''}</p>
              <p><strong>Grade:</strong> {result.data?.grade}</p>
            </div>
          </div>
        )}

        {result.status === 'invalid' && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>No matching credential found. Please verify the serial number format and re-enter.</span>
          </div>
        )}
        {result.status === 'error' && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs" role="alert">
            Credential verification is temporarily unavailable. Please try again later.
          </div>
        )}
      </section>
    </div>
  );
};
