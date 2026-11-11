/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Visual Section & Content Placement Modal
 * No-code visual tool to choose placement and content type.
 */

import React, { useState } from 'react';
import {
  X,
  Heading,
  AlignLeft,
  Image as ImageIcon,
  Video,
  Grid,
  Square,
  FileText,
  BarChart2,
  Users,
  Calendar,
  Award,
  MessageSquare,
  HelpCircle,
  Clock,
  Handshake,
  ArrowUp,
  ArrowDown,
  ChevronsUp,
  ChevronsDown,
  Layers,
  Sparkles,
  Columns
} from 'lucide-react';
import type { CmsBlockType, CmsContentBlock, CmsPageSection } from '../../../types/cmsBlocks';

export type VisualPlacement =
  | 'start'
  | 'after_hero'
  | 'before_selected'
  | 'after_selected'
  | 'between'
  | 'end';

interface VisualSectionPlacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingSections: CmsPageSection[];
  selectedSectionId?: string;
  onConfirm: (placement: VisualPlacement, targetIndex: number, templateType: string) => void;
}

interface ContentTemplateOption {
  key: string;
  title: string;
  category: 'Text' | 'Media' | 'Components' | 'Interactive';
  icon: React.ReactNode;
  description: string;
}

const TEMPLATE_OPTIONS: ContentTemplateOption[] = [
  { key: 'heading_text', title: 'Heading & Paragraph', category: 'Text', icon: <Heading className="w-5 h-5 text-cyan-400" />, description: 'Standard bold heading with responsive supporting paragraphs.' },
  { key: 'feature_cards', title: 'Feature Cards Grid (3-Col)', category: 'Components', icon: <Grid className="w-5 h-5 text-emerald-400" />, description: 'Three responsive cards with icons, badges, and action buttons.' },
  { key: 'stats_highlight', title: 'Key Statistics Strip (4-Col)', category: 'Components', icon: <BarChart2 className="w-5 h-5 text-amber-400" />, description: 'Four large metric indicators with descriptions and change tags.' },
  { key: 'text_image_side', title: 'Text & Image Side-by-Side', category: 'Media', icon: <Columns className="w-5 h-5 text-indigo-400" />, description: 'Rich paragraph narrative flanked by a high-resolution photograph.' },
  { key: 'image_gallery', title: 'Media Gallery (3-Col)', category: 'Media', icon: <ImageIcon className="w-5 h-5 text-blue-400" />, description: 'Multi-image responsive grid with lightbox-ready captions.' },
  { key: 'video_showcase', title: 'Video Showcase (16:9)', category: 'Media', icon: <Video className="w-5 h-5 text-rose-400" />, description: 'Full-width or centered video player for MP4, WebM, YouTube, or Vimeo.' },
  { key: 'team_profiles', title: 'Team Member Profiles', category: 'Components', icon: <Users className="w-5 h-5 text-purple-400" />, description: 'Portraits, titles, regional stations, and biographies.' },
  { key: 'documents_download', title: 'Documents & Reports', category: 'Components', icon: <FileText className="w-5 h-5 text-teal-400" />, description: 'Download cards with file format badges, sizes, and direct links.' },
  { key: 'program_cards', title: 'Programme & Activity Cards', category: 'Components', icon: <Award className="w-5 h-5 text-orange-400" />, description: 'Curriculum cards with duration, audience, and registration button.' },
  { key: 'event_showcase', title: 'Event Card with QR Ticket', category: 'Interactive', icon: <Calendar className="w-5 h-5 text-cyan-400" />, description: 'Event date, venue, details, and registration link.' },
  { key: 'testimonials_quote', title: 'Testimonials & Quote', category: 'Components', icon: <MessageSquare className="w-5 h-5 text-pink-400" />, description: 'Executive quotes with founder portraits and organizations.' },
  { key: 'faqs_accordion', title: 'FAQ Accordion', category: 'Interactive', icon: <HelpCircle className="w-5 h-5 text-amber-400" />, description: 'Expandable question and answer pairs for visitor guidance.' },
  { key: 'timeline_milestones', title: 'Timeline & Milestones', category: 'Text', icon: <Clock className="w-5 h-5 text-emerald-400" />, description: 'Chronological roadmap of achievements and future targets.' },
  { key: 'partner_logos', title: 'Partner & Donor Logos', category: 'Components', icon: <Handshake className="w-5 h-5 text-indigo-400" />, description: 'Logos grid linking to institutional ally and donor websites.' },
  { key: 'cta_banner', title: 'Call to Action Banner', category: 'Interactive', icon: <Sparkles className="w-5 h-5 text-yellow-400" />, description: 'Prominent highlight banner with primary and secondary action buttons.' },
  { key: 'blank_section', title: 'Blank Custom Section', category: 'Text', icon: <Square className="w-5 h-5 text-slate-400" />, description: 'Empty canvas to build custom layouts with any combination of blocks.' }
];

export const VisualSectionPlacementModal: React.FC<VisualSectionPlacementModalProps> = ({
  isOpen,
  onClose,
  existingSections,
  selectedSectionId,
  onConfirm
}) => {
  const [placement, setPlacement] = useState<VisualPlacement>('end');
  const [targetIndex, setTargetIndex] = useState<number>(existingSections.length);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('heading_text');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Text' | 'Media' | 'Components' | 'Interactive'>('All');

  if (!isOpen) return null;

  const selectedSecIndex = existingSections.findIndex(s => s.id === selectedSectionId);
  const selectedSecName = selectedSecIndex >= 0 ? existingSections[selectedSecIndex].name : 'Selected Section';

  const handleConfirm = () => {
    let finalIndex = targetIndex;
    if (placement === 'start') finalIndex = 0;
    else if (placement === 'after_hero') finalIndex = 0;
    else if (placement === 'before_selected') finalIndex = Math.max(0, selectedSecIndex);
    else if (placement === 'after_selected') finalIndex = selectedSecIndex + 1;
    else if (placement === 'end') finalIndex = existingSections.length;

    onConfirm(placement, finalIndex, selectedTemplate);
    onClose();
  };

  const filteredTemplates = categoryFilter === 'All'
    ? TEMPLATE_OPTIONS
    : TEMPLATE_OPTIONS.filter(t => t.category === categoryFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Add New Content Section</h2>
              <p className="text-xs text-slate-400">Choose where the section appears and select the content type.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* STEP 1: Visual Placement */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <span>Step 1:</span> Choose Position on Page
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPlacement('start')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  placement === 'start'
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <ChevronsUp className="w-4 h-4 text-cyan-400" />
                  <span>Beginning of Page</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Place at very top before all other sections</p>
              </button>

              <button
                type="button"
                onClick={() => setPlacement('after_hero')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  placement === 'after_hero'
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <ArrowUp className="w-4 h-4 text-emerald-400" />
                  <span>After Page Intro</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Immediately below the hero introduction</p>
              </button>

              {selectedSecIndex >= 0 && (
                <button
                  type="button"
                  onClick={() => setPlacement('before_selected')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    placement === 'before_selected'
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <ArrowUp className="w-4 h-4 text-indigo-400" />
                    <span>Before Selected</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 truncate">Before "{selectedSecName}"</p>
                </button>
              )}

              {selectedSecIndex >= 0 && (
                <button
                  type="button"
                  onClick={() => setPlacement('after_selected')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    placement === 'after_selected'
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <ArrowDown className="w-4 h-4 text-purple-400" />
                    <span>After Selected</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 truncate">After "{selectedSecName}"</p>
                </button>
              )}

              {existingSections.length > 1 && (
                <button
                  type="button"
                  onClick={() => setPlacement('between')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    placement === 'between'
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>Between Sections</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Insert between specific sections</p>
                </button>
              )}

              <button
                type="button"
                onClick={() => setPlacement('end')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  placement === 'end'
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <ChevronsDown className="w-4 h-4 text-rose-400" />
                  <span>End of Page</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Place at the bottom of the page</p>
              </button>
            </div>

            {/* If between is selected, let admin pick which section */}
            {placement === 'between' && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">Insert after section:</span>
                <select
                  value={targetIndex}
                  onChange={e => setTargetIndex(Number(e.target.value))}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-white"
                >
                  {existingSections.map((s, idx) => (
                    <option key={s.id} value={idx + 1}>
                      {idx + 1}. {s.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* STEP 2: Content Type Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <span>Step 2:</span> Select Content Type / Template
              </span>

              {/* Category filters */}
              <div className="flex items-center gap-1">
                {(['All', 'Text', 'Media', 'Components', 'Interactive'] as const).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      categoryFilter === cat
                        ? 'bg-cyan-700 text-white'
                        : 'text-slate-400 hover:text-white bg-slate-950'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {filteredTemplates.map(tmpl => {
                const isSelected = selectedTemplate === tmpl.key;

                return (
                  <div
                    key={tmpl.key}
                    onClick={() => setSelectedTemplate(tmpl.key)}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-slate-950 border-cyan-500 ring-1 ring-cyan-500 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                      {tmpl.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-white block truncate">{tmpl.title}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 shrink-0">
                          {tmpl.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{tmpl.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Selected: <strong className="text-white">{TEMPLATE_OPTIONS.find(t => t.key === selectedTemplate)?.title}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-5 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Add to Page</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
