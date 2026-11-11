/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Page Hero & Structured Content Editor
 * Visual forms for editing page titles, hero headers, stats, features, team, and FAQs.
 */

import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  BarChart2,
  CheckCircle2,
  Users,
  FileDown,
  HelpCircle,
  Plus,
  Trash2,
  Save,
  Link,
  Tag,
  AlignLeft,
  ChevronDown
} from 'lucide-react';

interface PageHeroMetadataEditorProps {
  title: string;
  setTitle: (val: string) => void;
  slug: string;
  summary: string;
  setSummary: (val: string) => void;
  heading: string;
  setHeading: (val: string) => void;
  subheading: string;
  setSubheading: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  heroBadge: string;
  setHeroBadge: (val: string) => void;
  ctaLabel: string;
  setCtaLabel: (val: string) => void;
  ctaUrl: string;
  setCtaUrl: (val: string) => void;
  ctaVariant: 'primary' | 'secondary' | 'outline';
  setCtaVariant: (val: 'primary' | 'secondary' | 'outline') => void;
  stats: Array<{ value: string; label: string; description?: string }>;
  setStats: React.Dispatch<React.SetStateAction<Array<{ value: string; label: string; description?: string }>>>;
  features: Array<{ title: string; description: string }>;
  setFeatures: React.Dispatch<React.SetStateAction<Array<{ title: string; description: string }>>>;
  team: Array<{ name: string; role: string; bio?: string; image?: string }>;
  setTeam: React.Dispatch<React.SetStateAction<Array<{ name: string; role: string; bio?: string; image?: string }>>>;
  faqs: Array<{ question: string; answer: string }>;
  setFaqs: React.Dispatch<React.SetStateAction<Array<{ question: string; answer: string }>>>;
  documents: Array<{ title: string; description: string; fileUrl: string; fileSize?: string; format?: string }>;
  setDocuments: React.Dispatch<React.SetStateAction<Array<{ title: string; description: string; fileUrl: string; fileSize?: string; format?: string }>>>;
  onSaveDraft: () => Promise<boolean>;
  onPublishLive: () => Promise<void>;
}

export const PageHeroMetadataEditor: React.FC<PageHeroMetadataEditorProps> = ({
  title,
  setTitle,
  slug,
  summary,
  setSummary,
  heading,
  setHeading,
  subheading,
  setSubheading,
  description,
  setDescription,
  heroBadge,
  setHeroBadge,
  ctaLabel,
  setCtaLabel,
  ctaUrl,
  setCtaUrl,
  ctaVariant,
  setCtaVariant,
  stats,
  setStats,
  features,
  setFeatures,
  team,
  setTeam,
  faqs,
  setFaqs,
  documents,
  setDocuments,
  onSaveDraft,
  onPublishLive
}) => {
  const [activeTab, setActiveTab] = useState<'hero' | 'stats' | 'features' | 'team' | 'documents' | 'faqs'>('hero');

  const addStat = () => {
    setStats(prev => [...prev, { value: '1,000+', label: 'New Metric', description: 'Brief explanation of this achievement' }]);
  };

  const updateStat = (index: number, patch: Partial<{ value: string; label: string; description?: string }>) => {
    setStats(prev => prev.map((s, idx) => idx === index ? { ...s, ...patch } : s));
  };

  const removeStat = (index: number) => {
    setStats(prev => prev.filter((_, idx) => idx !== index));
  };

  const addFeature = () => {
    setFeatures(prev => [...prev, { title: 'New Strategic Pillar', description: 'Description of key milestone or curriculum deliverable.' }]);
  };

  const updateFeature = (index: number, patch: Partial<{ title: string; description: string }>) => {
    setFeatures(prev => prev.map((f, idx) => idx === index ? { ...f, ...patch } : f));
  };

  const removeFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, idx) => idx !== index));
  };

  const addTeamMember = () => {
    setTeam(prev => [...prev, { name: 'Leadership Name', role: 'Executive Title', bio: 'Professional background and ecosystem leadership biography.' }]);
  };

  const updateTeamMember = (index: number, patch: Partial<{ name: string; role: string; bio?: string; image?: string }>) => {
    setTeam(prev => prev.map((m, idx) => idx === index ? { ...m, ...patch } : m));
  };

  const removeTeamMember = (index: number) => {
    setTeam(prev => prev.filter((_, idx) => idx !== index));
  };

  const addDocument = () => {
    setDocuments(prev => [...prev, { title: 'Official Report / Publication', description: 'Executive summary or annual publication details.', fileUrl: '#', format: 'PDF', fileSize: '2.4 MB' }]);
  };

  const updateDocument = (index: number, patch: Partial<{ title: string; description: string; fileUrl: string; fileSize?: string; format?: string }>) => {
    setDocuments(prev => prev.map((d, idx) => idx === index ? { ...d, ...patch } : d));
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, idx) => idx !== index));
  };

  const addFaq = () => {
    setFaqs(prev => [...prev, { question: 'Frequently asked question title?', answer: 'Detailed response explaining criteria, dates, or contact steps.' }]);
  };

  const updateFaq = (index: number, patch: Partial<{ question: string; answer: string }>) => {
    setFaqs(prev => prev.map((f, idx) => idx === index ? { ...f, ...patch } : f));
  };

  const removeFaq = (index: number) => {
    setFaqs(prev => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-6">
      {/* Sub-tabs strip */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('hero')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'hero' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hero & Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'stats' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Key Statistics ({stats.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('features')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'features' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Pillars & Features ({features.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'team' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Team ({team.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'documents' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Reports & Documents ({documents.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faqs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'faqs' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQs ({faqs.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void onSaveDraft()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-cyan-400" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            onClick={() => void onPublishLive()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>
        </div>
      </div>

      {/* TAB 1: HERO & OVERVIEW */}
      {activeTab === 'hero' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Page Title
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white focus:outline-hidden focus:border-cyan-500"
                placeholder="e.g. Youth Empowerment"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Hero Badge / Category Pill
              </label>
              <input
                type="text"
                value={heroBadge}
                onChange={e => setHeroBadge(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white focus:outline-hidden focus:border-cyan-500"
                placeholder="e.g. Grassroots Leadership & Civic Impact"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Main Page Heading (H1)
            </label>
            <input
              type="text"
              value={heading}
              onChange={e => setHeading(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white focus:outline-hidden focus:border-cyan-500"
              placeholder="e.g. Inspiring the Next Generation of Somali Changemakers"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Subheading
            </label>
            <input
              type="text"
              value={subheading}
              onChange={e => setSubheading(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white focus:outline-hidden focus:border-cyan-500"
              placeholder="e.g. Unlocking leadership, digital literacy, and civic participation across every region."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Executive Summary (Brief Overview)
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-normal text-white focus:outline-hidden focus:border-cyan-500"
              placeholder="Short 1-2 sentence executive summary shown in search and preview cards."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Detailed Description & Mission Narrative
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-normal text-white focus:outline-hidden focus:border-cyan-500"
              placeholder="Detailed paragraphs explaining the institutional background, methodology, and regional outcomes."
            />
          </div>

          {/* Call to Action Button */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
              Primary Call-to-Action Button
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Button Label</label>
                <input
                  type="text"
                  value={ctaLabel}
                  onChange={e => setCtaLabel(e.target.value)}
                  placeholder="e.g. Apply to Programme"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Destination URL / Route</label>
                <input
                  type="text"
                  value={ctaUrl}
                  onChange={e => setCtaUrl(e.target.value)}
                  placeholder="e.g. /contact or /track"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Button Style</label>
                <select
                  value={ctaVariant}
                  onChange={e => setCtaVariant(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                >
                  <option value="primary">Primary (Cyan Solid)</option>
                  <option value="secondary">Secondary (Dark Slate)</option>
                  <option value="outline">Outline (Cyan Border)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KEY STATISTICS */}
      {activeTab === 'stats' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Highlight key institutional achievements with large metrics and clear labels.
            </p>
            <button
              type="button"
              onClick={addStat}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Metric</span>
            </button>
          </div>

          {stats.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-slate-500 text-xs">
              No statistics configured for this page yet. Click "+ Add Metric" to create one.
            </div>
          ) : (
            <div className="space-y-3">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-4">
                  <span className="text-xs font-mono font-bold text-cyan-400 pt-2">{idx + 1}.</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Number / Value</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={e => updateStat(idx, { value: e.target.value })}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-black text-cyan-400"
                        placeholder="e.g. 14,000+"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Title / Metric Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={e => updateStat(idx, { label: e.target.value })}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white font-bold"
                        placeholder="e.g. Somali Youth Trained"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Description (Optional)</label>
                      <input
                        type="text"
                        value={stat.description || ''}
                        onChange={e => updateStat(idx, { description: e.target.value })}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300"
                        placeholder="e.g. Across 4 regional stations"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeStat(idx)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 shrink-0"
                    title="Remove metric"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FEATURES & PILLARS */}
      {activeTab === 'features' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Define the core deliverables, pillars, or methodology of this programme.
            </p>
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Pillar</span>
            </button>
          </div>

          {features.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-slate-500 text-xs">
              No features configured for this page yet.
            </div>
          ) : (
            <div className="space-y-3">
              {features.map((feat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-4">
                  <span className="text-xs font-mono font-bold text-cyan-400 pt-2">{idx + 1}.</span>
                  <div className="space-y-2 flex-1">
                    <input
                      type="text"
                      value={feat.title}
                      onChange={e => updateFeature(idx, { title: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white font-bold"
                      placeholder="Pillar title (e.g. Full-Stack Web & Mobile)"
                    />
                    <textarea
                      rows={2}
                      value={feat.description}
                      onChange={e => updateFeature(idx, { description: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300"
                      placeholder="Detailed explanation of this pillar or deliverable."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFeature(idx)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: TEAM MEMBERS */}
      {activeTab === 'team' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Manage team member profiles, positions, and executive biographies for this section.
            </p>
            <button
              type="button"
              onClick={addTeamMember}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Team Member</span>
            </button>
          </div>

          {team.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-slate-500 text-xs">
              No team members assigned to this page. Suitable for "Our Team" or specialized program stewards.
            </div>
          ) : (
            <div className="space-y-3">
              {team.map((member, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-4">
                  <span className="text-xs font-mono font-bold text-cyan-400 pt-2">{idx + 1}.</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                    <input
                      type="text"
                      value={member.name}
                      onChange={e => updateTeamMember(idx, { name: e.target.value })}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-bold text-white"
                      placeholder="Full Name"
                    />
                    <input
                      type="text"
                      value={member.role}
                      onChange={e => updateTeamMember(idx, { role: e.target.value })}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-cyan-300"
                      placeholder="Position / Title"
                    />
                    <input
                      type="text"
                      value={member.bio || ''}
                      onChange={e => updateTeamMember(idx, { bio: e.target.value })}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300"
                      placeholder="Short Bio / Background"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTeamMember(idx)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: DOCUMENTS & PUBLICATIONS */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Upload or link annual reports, policy papers, and official publication downloads.
            </p>
            <button
              type="button"
              onClick={addDocument}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Report / Document</span>
            </button>
          </div>

          {documents.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-slate-500 text-xs">
              No downloadable reports attached. Highly recommended for Annual Reports & Governance briefs.
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-4">
                  <span className="text-xs font-mono font-bold text-cyan-400 pt-2">{idx + 1}.</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1">
                    <input
                      type="text"
                      value={doc.title}
                      onChange={e => updateDocument(idx, { title: e.target.value })}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-bold text-white"
                      placeholder="Document Title"
                    />
                    <input
                      type="text"
                      value={doc.description}
                      onChange={e => updateDocument(idx, { description: e.target.value })}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300"
                      placeholder="Short Description"
                    />
                    <input
                      type="text"
                      value={doc.fileUrl}
                      onChange={e => updateDocument(idx, { fileUrl: e.target.value })}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-cyan-300 font-mono"
                      placeholder="File URL / Media Path"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={doc.format || 'PDF'}
                        onChange={e => updateDocument(idx, { format: e.target.value })}
                        className="w-16 rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-300 font-mono uppercase text-center"
                        placeholder="Format"
                      />
                      <input
                        type="text"
                        value={doc.fileSize || '2.4 MB'}
                        onChange={e => updateDocument(idx, { fileSize: e.target.value })}
                        className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-300 font-mono text-center"
                        placeholder="Size"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDocument(idx)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: FAQS */}
      {activeTab === 'faqs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Provide answers to common visitor questions regarding this programme or service.
            </p>
            <button
              type="button"
              onClick={addFaq}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add FAQ Item</span>
            </button>
          </div>

          {faqs.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-slate-500 text-xs">
              No frequently asked questions added yet.
            </div>
          ) : (
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-4">
                  <span className="text-xs font-mono font-bold text-cyan-400 pt-2">{idx + 1}.</span>
                  <div className="space-y-2 flex-1">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={e => updateFaq(idx, { question: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-bold text-white"
                      placeholder="Question: Who is eligible for this programme?"
                    />
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={e => updateFaq(idx, { answer: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300"
                      placeholder="Answer: Any Somali youth aged 18-35 with an innovative concept or digital focus."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFaq(idx)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
