/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed Credential Verification Template View (Certification)
 */

import React, { useState } from 'react';
import { Award, Search, ShieldCheck, CheckCircle2, Lock, FileCheck, ArrowRight } from 'lucide-react';
import { DynamicPageContent } from '../DynamicCmsPage';

interface TemplateProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

export const CredentialVerificationTemplateView: React.FC<TemplateProps> = ({ page, onNavigate }) => {
  const [certCode, setCertCode] = useState('SIHUB-2026-CS-8921');
  const [verifiedResult, setVerifiedResult] = useState<any>({
    status: 'VALID',
    studentName: 'Hodan Abdirahman Omar',
    course: 'Full-Stack Software Engineering Bootcamp (Batch 07)',
    issuedDate: 'January 15, 2026',
    grade: 'Excellence with Honors (94.5%)',
    verifier: 'SiHub Academic Accreditation Board',
    certId: 'SIHUB-2026-CS-8921'
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certCode.trim()) return;
    setVerifiedResult({
      status: 'VALID',
      studentName: 'Mohamed Farah Ali',
      course: 'AI & Data Science Professional Certificate',
      issuedDate: 'February 28, 2026',
      grade: 'Distinction (91.0%)',
      verifier: 'SiHub Institute Academic Senate',
      certId: certCode.trim().toUpperCase()
    });
  };

  return (
    <div className="space-y-16">
      {/* 1. Header Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Online Credential Verification</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {page.heading || page.title || 'Cryptographically Verified Digital Credentials'}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          {page.description || page.summary || 'Instantly verify SiHub Institute student diplomas, course completion certificates, and technical grades. Trusted by employers, universities, and international organizations.'}
        </p>

        {/* Search Bar */}
        <form onSubmit={handleVerify} className="pt-2 max-w-xl mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={certCode}
              onChange={e => setCertCode(e.target.value)}
              placeholder="Enter Certificate ID (e.g. SIHUB-2026-CS-8921)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 bg-white font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-colors shrink-0"
          >
            Verify Credential
          </button>
        </form>
      </section>

      {/* 2. Live Verification Result Preview Card */}
      {verifiedResult && (
        <section className="max-w-2xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-emerald-500/40 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Valid
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-700">
                <Award className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Somali Innovation Hub • Institute Credentials</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">{verifiedResult.studentName}</h2>
              <p className="text-sm font-semibold text-slate-600">{verifiedResult.course}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Credential ID</span>
                <strong className="text-slate-800 font-mono">{verifiedResult.certId}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Date Issued</span>
                <strong className="text-slate-800">{verifiedResult.issuedDate}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Grade & Honors</span>
                <strong className="text-emerald-700 font-semibold">{verifiedResult.grade}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Authorized Signatory</span>
                <strong className="text-slate-800">{verifiedResult.verifier}</strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Immutable cryptographic hash recorded on SiHub central credential ledger. Tamper-evident.</span>
            </div>
          </div>
        </section>
      )}

      {/* 3. Accreditation & Standards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <FileCheck className="w-7 h-7 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">Ministry Curriculum Alignment</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Frameworks audited in coordination with national telecommunication standards and regional higher education guidelines.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <ShieldCheck className="w-7 h-7 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">QR Code Instant Scan</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Every physical certificate has an encrypted QR code resolving directly to this tamper-proof verification endpoint.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <Award className="w-7 h-7 text-amber-600" />
          <h3 className="text-base font-bold text-slate-900">Employer Verification Desk</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Human resources teams can request batch verification or official academic transcripts for candidate hiring.</p>
        </div>
      </section>
    </div>
  );
};
