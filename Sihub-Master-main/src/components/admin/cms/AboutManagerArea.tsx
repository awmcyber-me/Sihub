/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Dedicated About SiHub Visual Manager
 * Non-technical visual manager for Who We Are, Vision & Mission, Core Values, and Leadership Team.
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Eye,
  Target,
  Users,
  Lightbulb,
  Plus,
  Trash2,
  Save,
  Globe,
  Upload,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Video,
  Award,
  Layers,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { apiGet, apiPatch, apiPost, ApiError } from '../../../services/apiClient';
import { useApp } from '../../../context/AppContext';

export interface CoreValueItem {
  num?: string;
  title: string;
  desc: string;
}

export interface TeamMemberItem {
  name: string;
  role: string;
  location: string;
  bio: string;
  image?: string;
}

export interface AboutContentState {
  title?: string;
  summary?: string;
  whoWeAre: {
    eyebrow: string;
    heading: string;
    tagline: string;
    description: string;
    body: string;
    image: string;
    video: string;
  };
  principlesEyebrow: string;
  principlesHeading: string;
  vision: {
    label: string;
    heading: string;
    description: string;
    footer: string;
  };
  mission: {
    label: string;
    heading: string;
    description: string;
    footer: string;
  };
  coreValuesTitle: string;
  coreValuesDescription: string;
  coreValues: CoreValueItem[];
  teamEyebrow: string;
  teamTitle: string;
  teamDescription: string;
  team: TeamMemberItem[];
  banner: {
    title: string;
    description: string;
    image: string;
    exploreAction: string;
    partnerAction: string;
  };
}

const defaultAboutState: AboutContentState = {
  title: 'About SiHub',
  summary: 'Pioneering center for grassroots social innovation, entrepreneurship acceleration, and workforce skilling in Somalia.',
  whoWeAre: {
    eyebrow: 'Who We Are',
    heading: 'Somali Innovation Hub (SiHub)',
    tagline: 'Leading center for grassroots social innovation, entrepreneurship and technology in Somalia.',
    description: 'We believe innovation is the key to unlocking sustainable economic development, social cohesion, and prosperity across the Somali peninsula.',
    body: 'Established as an independent ecosystem catalyst, SiHub unites grassroots founders, academia, civic agencies, and international partners to co-create sustainable technology solutions for East Africa.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80',
    video: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
  },
  principlesEyebrow: 'Guiding Principles',
  principlesHeading: 'Our Vision & Strategic Mission',
  vision: {
    label: 'Vision',
    heading: 'A Resilient, Prosperous Somali Knowledge Economy',
    description: 'To inspire and nurture the next generation of Somali innovators, entrepreneurs, and problem-solvers transforming local challenges into scalable, regional opportunities.',
    footer: 'Horizon 2030 Ecosystem Framework'
  },
  mission: {
    label: 'Mission',
    heading: 'Empowering Innovators Through Skills & Capital',
    description: 'To provide world-class training, mentorship, incubation, and laboratory resources that enable Somali youth and entrepreneurs to launch high-impact ventures.',
    footer: 'Inclusive Community Acceleration'
  },
  coreValuesTitle: 'Our Core Values',
  coreValuesDescription: 'The foundational convictions that guide our team, programs, and partnerships.',
  coreValues: [
    { num: '01', title: 'Grassroots Innovation', desc: 'Championing solutions originating directly from community realities and indigenous knowledge.' },
    { num: '02', title: 'Radical Inclusivity', desc: 'Ensuring women, marginalized groups, and rural communities participate equally in the digital economy.' },
    { num: '03', title: 'Excellence & Integrity', desc: 'Upholding strict institutional governance, audited impact transparency, and technical rigor.' },
    { num: '04', title: 'Collaborative Ecosystem', desc: 'Connecting public institutions, private enterprise, and multilateral allies in enduring coalitions.' }
  ],
  teamEyebrow: 'Executive Leadership & Stewards',
  teamTitle: 'Meet the SiHub Leadership Team',
  teamDescription: 'Passionate innovators, researchers, and ecosystem builders driving SiHub across Somalia.',
  team: [
    { name: 'Dr. Hassan Abdullahi', role: 'Executive Director', location: 'Mogadishu HQ', bio: '20+ years leading regional technology, higher education reform, and venture development across the Horn of Africa.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
    { name: 'Amina Jama', role: 'Head of Innovation & SWITI Lead', location: 'Mogadishu HQ', bio: 'Pioneering gender inclusion programs and micro-venture seed funding for women software developers.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Eng. Omar Farah', role: 'Director of Education & Labs', location: 'Garowe Regional Station', bio: 'Former senior systems architect managing cloud infrastructure tracks and IoT laboratory research.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
    { name: 'Fadumo Warsame', role: 'Partnerships & Investor Relations', location: 'Mogadishu HQ', bio: 'Stewarding donor relationships, multilateral grants, and diaspora investment syndicates.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80' }
  ],
  banner: {
    title: 'Ready to Pioneer Somalia’s Future with Us?',
    description: 'Whether you are a founder looking for seed incubation or an international organization seeking institutional partnership, we welcome you.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    exploreAction: '/programs',
    partnerAction: '/partnerships'
  }
};

interface AboutManagerAreaProps {
  onNavigateToPreview?: () => void;
}

export const AboutManagerArea: React.FC<AboutManagerAreaProps> = ({ onNavigateToPreview }) => {
  const { addToast } = useApp();
  const [activeSection, setActiveSection] = useState<'whoweare' | 'visionmission' | 'values' | 'team' | 'banner'>('whoweare');
  const [aboutState, setAboutState] = useState<AboutContentState>(defaultAboutState);
  const [entryId, setEntryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // Load current About entry from CMS
  useEffect(() => {
    const fetchAboutData = async () => {
      setLoading(true);
      try {
        // Try published page first
        try {
          const res = await apiGet<{ page: { id: string; title: string; content: Record<string, unknown>; status: string } }>('/api/cms/page/about');
          if (res.page && res.page.content) {
            setEntryId(res.page.id);
            const c = res.page.content;
            setAboutState(prev => ({
              ...prev,
              title: (c.title as string) || prev.title,
              summary: (c.summary as string) || prev.summary,
              whoWeAre: { ...prev.whoWeAre, ...((c.whoWeAre as typeof prev.whoWeAre) || {}) },
              principlesEyebrow: (c.principlesEyebrow as string) || prev.principlesEyebrow,
              principlesHeading: (c.principlesHeading as string) || prev.principlesHeading,
              vision: { ...prev.vision, ...((c.vision as typeof prev.vision) || {}) },
              mission: { ...prev.mission, ...((c.mission as typeof prev.mission) || {}) },
              coreValuesTitle: (c.coreValuesTitle as string) || prev.coreValuesTitle,
              coreValuesDescription: (c.coreValuesDescription as string) || prev.coreValuesDescription,
              coreValues: Array.isArray(c.coreValues) && c.coreValues.length > 0 ? (c.coreValues as CoreValueItem[]) : prev.coreValues,
              teamEyebrow: (c.teamEyebrow as string) || prev.teamEyebrow,
              teamTitle: (c.teamTitle as string) || prev.teamTitle,
              teamDescription: (c.teamDescription as string) || prev.teamDescription,
              team: Array.isArray(c.team) && c.team.length > 0 ? (c.team as TeamMemberItem[]) : prev.team,
              banner: { ...prev.banner, ...((c.banner as typeof prev.banner) || {}) }
            }));
            return;
          }
        } catch {}

        // Fallback: check admin entries list
        const adminRes = await apiGet<{ entries: Array<{ id: string; slug: string; title: string; content: Record<string, unknown> }> }>('/api/cms/admin');
        const found = adminRes.entries?.find(e => e.slug === 'about');
        if (found) {
          setEntryId(found.id);
          if (found.content && Object.keys(found.content).length > 0) {
            const c = found.content;
            setAboutState(prev => ({
              ...prev,
              title: found.title || prev.title,
              whoWeAre: { ...prev.whoWeAre, ...((c.whoWeAre as typeof prev.whoWeAre) || {}) },
              principlesEyebrow: (c.principlesEyebrow as string) || prev.principlesEyebrow,
              principlesHeading: (c.principlesHeading as string) || prev.principlesHeading,
              vision: { ...prev.vision, ...((c.vision as typeof prev.vision) || {}) },
              mission: { ...prev.mission, ...((c.mission as typeof prev.mission) || {}) },
              coreValuesTitle: (c.coreValuesTitle as string) || prev.coreValuesTitle,
              coreValuesDescription: (c.coreValuesDescription as string) || prev.coreValuesDescription,
              coreValues: Array.isArray(c.coreValues) && c.coreValues.length > 0 ? (c.coreValues as CoreValueItem[]) : prev.coreValues,
              teamEyebrow: (c.teamEyebrow as string) || prev.teamEyebrow,
              teamTitle: (c.teamTitle as string) || prev.teamTitle,
              teamDescription: (c.teamDescription as string) || prev.teamDescription,
              team: Array.isArray(c.team) && c.team.length > 0 ? (c.team as TeamMemberItem[]) : prev.team,
              banner: { ...prev.banner, ...((c.banner as typeof prev.banner) || {}) }
            }));
          }
        }
      } catch (err) {
        console.warn('Using default about structure', err);
      } finally {
        setLoading(false);
      }
    };
    void fetchAboutData();
  }, []);

  const ensureEntryId = async (): Promise<string> => {
    if (entryId) return entryId;
    try {
      const adminRes = await apiGet<{ entries: Array<{ id: string; slug: string }> }>('/api/cms/admin');
      const found = adminRes.entries?.find(e => e.slug === 'about');
      if (found) {
        setEntryId(found.id);
        return found.id;
      }
    } catch {}

    const createRes = await apiPost<{ entry: { id: string } }>('/api/cms/admin', {
      type: 'page',
      slug: 'about',
      title: aboutState.title || 'About SiHub',
      summary: aboutState.summary || 'Pioneering center for grassroots social innovation in Somalia.',
      content: aboutState,
      status: 'DRAFT'
    });
    setEntryId(createRes.entry.id);
    return createRes.entry.id;
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      const id = await ensureEntryId();
      await apiPatch(`/api/cms/admin/${encodeURIComponent(id)}`, {
        title: aboutState.title || 'About SiHub',
        content: aboutState
      });
      addToast('success', 'Draft Saved', 'About page draft saved successfully.');
    } catch (reason) {
      addToast('error', 'Save Failed', reason instanceof ApiError ? reason.message : 'Unable to save draft.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublishLive = async () => {
    setPublishing(true);
    try {
      const id = await ensureEntryId();
      await apiPatch(`/api/cms/admin/${encodeURIComponent(id)}`, {
        title: aboutState.title || 'About SiHub',
        content: aboutState
      });
      await apiPatch(`/api/cms/admin/${encodeURIComponent(id)}/status`, {
        status: 'PUBLISHED'
      });
      window.dispatchEvent(new CustomEvent('sihub-cms-update'));
      addToast('success', 'About Page Published', 'The public About page has been published with all updated content!');
    } catch (reason) {
      addToast('error', 'Publish Failed', reason instanceof ApiError ? reason.message : 'Unable to publish live.');
    } finally {
      setPublishing(false);
    }
  };

  // Helper methods for Core Values
  const handleAddCoreValue = () => {
    const nextNum = String(aboutState.coreValues.length + 1).padStart(2, '0');
    setAboutState(prev => ({
      ...prev,
      coreValues: [
        ...prev.coreValues,
        { num: nextNum, title: 'New Organizational Value', desc: 'Describe how this pillar drives our ecosystem.' }
      ]
    }));
  };

  const handleRemoveCoreValue = (index: number) => {
    setAboutState(prev => ({
      ...prev,
      coreValues: prev.coreValues.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateCoreValue = (index: number, key: keyof CoreValueItem, value: string) => {
    setAboutState(prev => {
      const copy = [...prev.coreValues];
      copy[index] = { ...copy[index], [key]: value };
      return { ...prev, coreValues: copy };
    });
  };

  // Helper methods for Team
  const handleAddTeamMember = () => {
    setAboutState(prev => ({
      ...prev,
      team: [
        ...prev.team,
        {
          name: 'Leadership Steward',
          role: 'Program Director',
          location: 'Mogadishu HQ',
          bio: 'Passionate ecosystem champion directing regional acceleration.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
        }
      ]
    }));
  };

  const handleRemoveTeamMember = (index: number) => {
    setAboutState(prev => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateTeamMember = (index: number, key: keyof TeamMemberItem, value: string) => {
    setAboutState(prev => {
      const copy = [...prev.team];
      copy[index] = { ...copy[index], [key]: value };
      return { ...prev, team: copy };
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-widest border border-cyan-400/30">
              Dedicated Visual Manager
            </span>
            <span className="text-xs text-slate-400 font-mono">/about</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1 flex items-center gap-2 font-heading">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            Institutional About SiHub Visual Editor
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Manage Who We Are, Vision & Mission, Core Values, and Leadership Team with intuitive visual forms. No coding or JSON required.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateToPreview && (
            <button
              onClick={onNavigateToPreview}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Live Page</span>
            </button>
          )}

          <button
            onClick={() => void handleSaveDraft()}
            disabled={saving || publishing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold text-xs border border-slate-700 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving…' : 'Save Draft'}</span>
          </button>

          <button
            onClick={() => void handlePublishLive()}
            disabled={saving || publishing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg transition-transform hover:scale-102"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{publishing ? 'Publishing Live…' : 'Publish to Live Site'}</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation for About Sub-Sections */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto no-scrollbar">
        {[
          { id: 'whoweare', label: '1. Who We Are', icon: Users, desc: 'Mandate & Story' },
          { id: 'visionmission', label: '2. Vision & Mission', icon: Target, desc: 'Guiding Principles' },
          { id: 'values', label: '3. Core Values', icon: Lightbulb, desc: `${aboutState.coreValues.length} Pillars` },
          { id: 'team', label: '4. Leadership Team', icon: Award, desc: `${aboutState.team.length} Stewards` },
          { id: 'banner', label: '5. Action Banner', icon: Sparkles, desc: 'Explore / Partner CTA' }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as never)}
              className={`flex-1 min-w-[140px] text-left p-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-slate-900 text-white border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="text-xs font-bold">{tab.label}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">{tab.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Form Area Based on Active Section */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
        {/* SECTION 1: WHO WE ARE */}
        {activeSection === 'whoweare' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                Who We Are & Institutional Mandate
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Displayed at the very top of the public /about page as the primary strategic identity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Eyebrow Badge</label>
                <input
                  value={aboutState.whoWeAre.eyebrow}
                  onChange={e => setAboutState(prev => ({ ...prev, whoWeAre: { ...prev.whoWeAre, eyebrow: e.target.value } }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  placeholder="e.g. Who We Are"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Primary Heading</label>
                <input
                  value={aboutState.whoWeAre.heading}
                  onChange={e => setAboutState(prev => ({ ...prev, whoWeAre: { ...prev.whoWeAre, heading: e.target.value } }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                  placeholder="e.g. Somali Innovation Hub (SiHub)"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Strategic Tagline</label>
              <input
                value={aboutState.whoWeAre.tagline}
                onChange={e => setAboutState(prev => ({ ...prev, whoWeAre: { ...prev.whoWeAre, tagline: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-cyan-300 font-semibold"
                placeholder="High-level conviction statement"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Executive Summary Description</label>
              <textarea
                rows={3}
                value={aboutState.whoWeAre.description}
                onChange={e => setAboutState(prev => ({ ...prev, whoWeAre: { ...prev.whoWeAre, description: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white leading-relaxed"
                placeholder="Core institutional mandate paragraph…"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Extended Narrative / Background Body</label>
              <textarea
                rows={4}
                value={aboutState.whoWeAre.body}
                onChange={e => setAboutState(prev => ({ ...prev, whoWeAre: { ...prev.whoWeAre, body: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white leading-relaxed"
                placeholder="Detailed backstory and institutional purpose…"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                  Hero Image URL
                </label>
                <input
                  value={aboutState.whoWeAre.image}
                  onChange={e => setAboutState(prev => ({ ...prev, whoWeAre: { ...prev.whoWeAre, image: e.target.value } }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  placeholder="https://images.unsplash.com/..."
                />
                {aboutState.whoWeAre.image && (
                  <div className="h-28 rounded-xl overflow-hidden border border-slate-800">
                    <img src={aboutState.whoWeAre.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-emerald-400" />
                  Documentary Video URL (YouTube / MP4)
                </label>
                <input
                  value={aboutState.whoWeAre.video}
                  onChange={e => setAboutState(prev => ({ ...prev, whoWeAre: { ...prev.whoWeAre, video: e.target.value } }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  placeholder="https://www.youtube-nocookie.com/embed/..."
                />
                <span className="text-[10px] text-slate-500 block">
                  Leave empty if you only want to display the Hero Image.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: VISION & MISSION */}
        {activeSection === 'visionmission' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                Guiding Principles: Vision & Mission Cards
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Presented as the dual-pillar strategic cards on the public /about page.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Principles Eyebrow</label>
                <input
                  value={aboutState.principlesEyebrow}
                  onChange={e => setAboutState(prev => ({ ...prev, principlesEyebrow: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Principles Section Title</label>
                <input
                  value={aboutState.principlesHeading}
                  onChange={e => setAboutState(prev => ({ ...prev, principlesHeading: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vision Box */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-900/40 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                  <Eye className="w-4 h-4" />
                  <span>Vision Card</span>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Card Label</label>
                  <input
                    value={aboutState.vision.label}
                    onChange={e => setAboutState(prev => ({ ...prev, vision: { ...prev.vision, label: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Vision Statement Heading</label>
                  <input
                    value={aboutState.vision.heading}
                    onChange={e => setAboutState(prev => ({ ...prev, vision: { ...prev.vision, heading: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Vision Narrative Description</label>
                  <textarea
                    rows={4}
                    value={aboutState.vision.description}
                    onChange={e => setAboutState(prev => ({ ...prev, vision: { ...prev.vision, description: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white leading-relaxed"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Footer Tag / Horizon</label>
                  <input
                    value={aboutState.vision.footer}
                    onChange={e => setAboutState(prev => ({ ...prev, vision: { ...prev.vision, footer: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono"
                  />
                </div>
              </div>

              {/* Mission Box */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-900/40 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Target className="w-4 h-4" />
                  <span>Mission Card</span>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Card Label</label>
                  <input
                    value={aboutState.mission.label}
                    onChange={e => setAboutState(prev => ({ ...prev, mission: { ...prev.mission, label: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Mission Statement Heading</label>
                  <input
                    value={aboutState.mission.heading}
                    onChange={e => setAboutState(prev => ({ ...prev, mission: { ...prev.mission, heading: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Mission Narrative Description</label>
                  <textarea
                    rows={4}
                    value={aboutState.mission.description}
                    onChange={e => setAboutState(prev => ({ ...prev, mission: { ...prev.mission, description: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white leading-relaxed"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Footer Tag / Strategic Scope</label>
                  <input
                    value={aboutState.mission.footer}
                    onChange={e => setAboutState(prev => ({ ...prev, mission: { ...prev.mission, footer: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: CORE VALUES */}
        {activeSection === 'values' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Core Values & Cultural Foundations ({aboutState.coreValues.length} Values)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  The foundational values rendered in responsive cards with distinct iconography.
                </p>
              </div>

              <button
                onClick={handleAddCoreValue}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Value</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Section Title</label>
                <input
                  value={aboutState.coreValuesTitle}
                  onChange={e => setAboutState(prev => ({ ...prev, coreValuesTitle: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Section Subtitle / Description</label>
                <input
                  value={aboutState.coreValuesDescription}
                  onChange={e => setAboutState(prev => ({ ...prev, coreValuesDescription: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {aboutState.coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start justify-between gap-3"
                >
                  <div className="w-10 shrink-0 text-center">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-1 rounded border border-slate-800 block">
                      {val.num || String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      value={val.title}
                      onChange={e => handleUpdateCoreValue(idx, 'title', e.target.value)}
                      placeholder="Value Title (e.g. Radical Inclusivity)"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-white"
                    />
                    <textarea
                      rows={2}
                      value={val.desc}
                      onChange={e => handleUpdateCoreValue(idx, 'desc', e.target.value)}
                      placeholder="Short description of this value in action…"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300"
                    />
                  </div>

                  <button
                    onClick={() => handleRemoveCoreValue(idx)}
                    className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 shrink-0"
                    title="Remove Value"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: LEADERSHIP TEAM */}
        {activeSection === 'team' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  Executive Leadership & Team Stewards ({aboutState.team.length} Members)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Displayed as profile cards with photo, name, title, hub location, and bio.
                </p>
              </div>

              <button
                onClick={handleAddTeamMember}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Leader</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Eyebrow</label>
                <input
                  value={aboutState.teamEyebrow}
                  onChange={e => setAboutState(prev => ({ ...prev, teamEyebrow: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Section Title</label>
                <input
                  value={aboutState.teamTitle}
                  onChange={e => setAboutState(prev => ({ ...prev, teamTitle: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Description</label>
                <input
                  value={aboutState.teamDescription}
                  onChange={e => setAboutState(prev => ({ ...prev, teamDescription: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {aboutState.team.map((member, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 relative group"
                >
                  <button
                    onClick={() => handleRemoveTeamMember(idx)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 opacity-80 group-hover:opacity-100"
                    title="Remove Team Member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <img
                      src={member.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'}
                      alt={member.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-700"
                    />
                    <div className="flex-1 pr-8">
                      <input
                        value={member.name}
                        onChange={e => handleUpdateTeamMember(idx, 'name', e.target.value)}
                        placeholder="Full Name"
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-bold text-white mb-1"
                      />
                      <input
                        value={member.role}
                        onChange={e => handleUpdateTeamMember(idx, 'role', e.target.value)}
                        placeholder="Institutional Role / Title"
                        className="w-full px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-cyan-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Hub Station</label>
                      <input
                        value={member.location}
                        onChange={e => handleUpdateTeamMember(idx, 'location', e.target.value)}
                        placeholder="e.g. Mogadishu HQ"
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-[11px] text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Photo URL</label>
                      <input
                        value={member.image || ''}
                        onChange={e => handleUpdateTeamMember(idx, 'image', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-[11px] text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Short Bio</label>
                    <textarea
                      rows={2}
                      value={member.bio}
                      onChange={e => handleUpdateTeamMember(idx, 'bio', e.target.value)}
                      placeholder="1-2 sentences on their leadership background…"
                      className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-[11px] text-slate-300 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: ACTION BANNER */}
        {activeSection === 'banner' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Call to Action Banner Strip
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Bottom banner on the About page inviting visitors to explore programs or establish partnerships.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Banner Headline</label>
              <input
                value={aboutState.banner.title}
                onChange={e => setAboutState(prev => ({ ...prev, banner: { ...prev.banner, title: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Banner Description</label>
              <textarea
                rows={3}
                value={aboutState.banner.description}
                onChange={e => setAboutState(prev => ({ ...prev, banner: { ...prev.banner, description: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Background Image URL</label>
                <input
                  value={aboutState.banner.image}
                  onChange={e => setAboutState(prev => ({ ...prev, banner: { ...prev.banner, image: e.target.value } }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Primary Button Destination</label>
                <input
                  value={aboutState.banner.exploreAction}
                  onChange={e => setAboutState(prev => ({ ...prev, banner: { ...prev.banner, exploreAction: e.target.value } }))}
                  placeholder="/programs"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-cyan-300"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Secondary Button Destination</label>
                <input
                  value={aboutState.banner.partnerAction}
                  onChange={e => setAboutState(prev => ({ ...prev, banner: { ...prev.banner, partnerAction: e.target.value } }))}
                  placeholder="/partnerships"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-emerald-300"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
