/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Website Hierarchy Navigator
 * Visual, no-code browser for the official 8 pillars and 32 website subsections.
 */

import React, { useState } from 'react';
import {
  Home,
  Building2,
  Rocket,
  Lightbulb,
  GraduationCap,
  Calendar,
  TrendingUp,
  Handshake,
  FileText,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Eye,
  Plus,
  Search,
  Layers,
  Sparkles
} from 'lucide-react';

export interface HierarchySubsection {
  slug: string;
  title: string;
  publicPath: string;
  description: string;
}

export type HierarchyPage = HierarchySubsection;

export interface HierarchyPillar {
  key: string;
  title: string;
  icon: React.ReactNode;
  badge?: string;
  subsections: HierarchySubsection[];
}

export type HierarchyCategory = HierarchyPillar;

export const OFFICIAL_HIERARCHY: HierarchyPillar[] = [
  {
    key: 'home',
    title: 'A. Home',
    icon: <Home className="w-4 h-4 text-cyan-400" />,
    badge: 'Flagship',
    subsections: [
      { slug: 'home', title: 'Home Page', publicPath: '/', description: 'Flagship landing page, hero banner, featured programs, and ecosystem impact statistics.' }
    ]
  },
  {
    key: 'about',
    title: 'B. About SiHub',
    icon: <Building2 className="w-4 h-4 text-blue-400" />,
    badge: '4 Subsections',
    subsections: [
      { slug: 'who-we-are', title: 'Who We Are', publicPath: '/about/who-we-are', description: 'Institutional mandate, ecosystem stewardship, and strategic vision for Horn of Africa development.' },
      { slug: 'vision', title: 'Our Vision', publicPath: '/about/vision', description: 'Strategic 2030 horizon for a dynamic knowledge economy driven by homegrown technology.' },
      { slug: 'mission', title: 'Our Mission', publicPath: '/about/mission', description: 'Bridging Somali youth potential with capital, mentorship, and digital innovation infrastructure.' },
      { slug: 'our-team', title: 'Our Team', publicPath: '/about/our-team', description: 'Executive leadership, advisory council, and regional ecosystem station stewards.' }
    ]
  },
  {
    key: 'programmes',
    title: 'C. Our Programmes',
    icon: <Rocket className="w-4 h-4 text-emerald-400" />,
    badge: '8 Subsections',
    subsections: [
      { slug: 'digital-skills', title: 'Digital Skills Development', publicPath: '/programs/digital-skills', description: 'High-impact technology tracks in full-stack web, cloud fundamentals, and mobile engineering.' },
      { slug: 'youth-empowerment', title: 'Youth Empowerment', publicPath: '/programs/youth-empowerment', description: 'Grassroots leadership academies, digital literacy, and youth-led economic pathways.' },
      { slug: 'social-innovation', title: 'Social Innovation', publicPath: '/programs/social-innovation', description: 'Civic labs and collaborative problem-solving addressing critical community challenges.' },
      { slug: 'women-innovation', title: 'Women in Innovation', publicPath: '/programs/women-innovation', description: 'Dedicated incubators, female founder fellowships, and inclusive tech leadership tracks.' },
      { slug: 'inclusive-digital', title: 'Inclusive Digital Inclusion', publicPath: '/programs/inclusive-digital', description: 'Decentralized outreach ensuring rural, displaced, and marginalized communities access technology.' },
      { slug: 'green-sustainability', title: 'Green Innovation & Sustainability', publicPath: '/programs/green-sustainability', description: 'Climate resilience, renewable energy prototyping, and smart AgriTech innovations.' },
      { slug: 'youth-peace', title: 'Youth Peace Innovation', publicPath: '/programs/youth-peace', description: 'Civic cohesion, dialogue platforms, and peacebuilding technology initiatives.' },
      { slug: 'community-dev', title: 'Community Development', publicPath: '/programs/community-dev', description: 'Grassroots community development, digital governance, and local capacity building.' }
    ]
  },
  {
    key: 'startups',
    title: 'D. Entrepreneurship & Startups',
    icon: <Lightbulb className="w-4 h-4 text-amber-400" />,
    badge: '4 Subsections',
    subsections: [
      { slug: 'incubation', title: 'Startup Incubation', publicPath: '/startups/incubation', description: '6-month venture cohorts, legal prototyping sandboxes, prototyping labs, and seed funding.' },
      { slug: 'entrepreneurs', title: 'Featured Somali Entrepreneurs', publicPath: '/startups/entrepreneurs', description: 'Portfolio showcase highlighting active founders and transformative ventures across Somalia.' },
      { slug: 'youth-mentorship', title: 'Youth Mentorship Network', publicPath: '/startups/youth-mentorship', description: '1-on-1 strategic pairing with diaspora executives and regional technology leaders.' },
      { slug: 'startup-support', title: 'Startup Support Services', publicPath: '/startups/startup-support', description: 'Investor readiness, patent and trademark guidance, accounting, and compliance assistance.' }
    ]
  },
  {
    key: 'institute',
    title: 'E. SiHub Institute',
    icon: <GraduationCap className="w-4 h-4 text-purple-400" />,
    badge: '5 Subsections',
    subsections: [
      { slug: 'digital-skills-academy', title: 'Digital Skills Academy', publicPath: '/institute/digital-skills-academy', description: 'Immersive coding bootcamps, cybersecurity clinics, and modern software apprenticeships.' },
      { slug: 'professional-training', title: 'Professional & Executive Training', publicPath: '/institute/professional-training', description: 'Executive diplomas, digital project management, and corporate technology upskilling.' },
      { slug: 'ai-emerging', title: 'AI & Emerging Technologies', publicPath: '/institute/ai-emerging', description: 'Applied machine learning, generative AI, IoT sensor design, and drone computing.' },
      { slug: 'research-innovation', title: 'Research & Innovation', publicPath: '/institute/research-innovation', description: 'Academic consortiums, policy briefs, and open data research on the Somali digital economy.' },
      { slug: 'certification', title: 'Certification & Verification', publicPath: '/institute/certification', description: 'Cryptographically verifiable certificates and accredited skill credentials.' }
    ]
  },
  {
    key: 'events-media',
    title: 'F. Events & Media',
    icon: <Calendar className="w-4 h-4 text-rose-400" />,
    badge: '5 Subsections',
    subsections: [
      { slug: 'sitalks', title: 'SiHub Talks (SiTalks)', publicPath: '/events/sitalks', description: 'Monthly thought leadership panels, founder fireside chats, and civic tech discussions.' },
      { slug: 'summit', title: 'Somali Innovation Summit', publicPath: '/events/summit', description: 'Flagship annual summit uniting regional ministers, investors, academics, and startups.' },
      { slug: 'expo', title: 'SiHub Expo', publicPath: '/events/expo', description: 'Public demo day, interactive prototype pavilions, and venture investor pitch sessions.' },
      { slug: 'news-stories', title: 'News & Stories', publicPath: '/events/news-stories', description: 'Press releases, impact milestones, partner announcements, and ecosystem dispatches.' },
      { slug: 'media-gallery', title: 'Media Gallery', publicPath: '/media', description: 'Photo galleries, keynote video recordings, and institutional media assets.' }
    ]
  },
  {
    key: 'impact',
    title: 'G. Our Impact',
    icon: <TrendingUp className="w-4 h-4 text-teal-400" />,
    badge: '4 Subsections',
    subsections: [
      { slug: 'success-stories', title: 'Success Stories', publicPath: '/impact/success-stories', description: 'In-depth case studies of Somali founders creating jobs and scalable civic impact.' },
      { slug: 'projects-achievements', title: 'Projects & Achievements', publicPath: '/impact/projects-achievements', description: 'Verified development outcomes across Mogadishu, Hargeisa, Garowe, and Kismayo.' },
      { slug: 'annual-reports', title: 'Annual Reports', publicPath: '/impact/annual-reports', description: 'Audited annual reports, financial disclosures, and open ecosystem governance documents.' },
      { slug: 'community-impact', title: 'Community Impact', publicPath: '/impact/community-impact', description: 'Metrics on grassroots digital inclusion, jobs created, and women in technology.' }
    ]
  },
  {
    key: 'partnerships',
    title: 'H. Partnerships',
    icon: <Handshake className="w-4 h-4 text-indigo-400" />,
    badge: '3 Subsections',
    subsections: [
      { slug: 'become-partner', title: 'Become a Partner', publicPath: '/partnerships/become-partner', description: 'Join as an academic co-sponsor, corporate technology ally, or grant maker.' },
      { slug: 'donors-supporters', title: 'Donors & Supporters', publicPath: '/partnerships/donors-supporters', description: 'Stewardship recognition for bilateral donors, multilateral funds, and diaspora investors.' },
      { slug: 'collaboration-opportunities', title: 'Collaboration Opportunities', publicPath: '/partnerships/collaboration-opportunities', description: 'Active RFPs, joint research consortia, challenge prize calls, and civic hackathons.' }
    ]
  }
];

export const officialWebsiteHierarchy = OFFICIAL_HIERARCHY;

interface WebsiteHierarchyNavigatorProps {
  selectedSlug: string;
  onSelectSlug: (slug: string) => void;
  entries: Array<{ id: string; slug: string; title: string; status: string }>;
  onCreateNewPage?: () => void;
}

export const WebsiteHierarchyNavigator: React.FC<WebsiteHierarchyNavigatorProps> = ({
  selectedSlug,
  onSelectSlug,
  entries,
  onCreateNewPage
}) => {
  const [selectedPillarKey, setSelectedPillarKey] = useState<string>(() => {
    const found = OFFICIAL_HIERARCHY.find(p => p.subsections.some(s => s.slug === selectedSlug));
    return found?.key || 'about';
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Status map for quick lookup
  const statusMap = new Map<string, string>();
  entries.forEach(e => statusMap.set(e.slug, e.status));

  // Custom pages that are not in the official 32
  const officialSlugs = new Set(OFFICIAL_HIERARCHY.flatMap(p => p.subsections.map(s => s.slug)));
  const customPages = entries.filter(e => !officialSlugs.has(e.slug));

  const activePillar = OFFICIAL_HIERARCHY.find(p => p.key === selectedPillarKey);

  // Filtered subsections if search is active
  const filteredSubsections = searchQuery.trim()
    ? OFFICIAL_HIERARCHY.flatMap(p => p.subsections).filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-4">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Official SiHub Website Structure</span>
          </div>
          <h3 className="text-sm font-extrabold text-white mt-0.5">8 Official Pillars & 32 Independent Subsections</h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter subsections…"
              className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500 w-48"
            />
          </div>
          {onCreateNewPage && (
            <button
              onClick={onCreateNewPage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold transition-all shrink-0 shadow-sm"
              title="Create a new custom independent page"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Custom Page</span>
            </button>
          )}
        </div>
      </div>

      {/* Pillar Tabs Strip (when not searching) */}
      {!filteredSubsections && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {OFFICIAL_HIERARCHY.map(pillar => {
            const isSelected = selectedPillarKey === pillar.key;
            const hasActiveChild = pillar.subsections.some(s => s.slug === selectedSlug);

            return (
              <button
                key={pillar.key}
                onClick={() => setSelectedPillarKey(pillar.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-600 shadow-sm'
                    : hasActiveChild
                    ? 'bg-slate-900 text-cyan-400 border-slate-700'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900'
                }`}
              >
                {pillar.icon}
                <span>{pillar.title}</span>
                {pillar.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400">
                    {pillar.subsections.length}
                  </span>
                )}
              </button>
            );
          })}

          {customPages.length > 0 && (
            <button
              onClick={() => setSelectedPillarKey('custom')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedPillarKey === 'custom'
                  ? 'bg-purple-950/80 text-purple-300 border-purple-600 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Custom Pages ({customPages.length})</span>
            </button>
          )}
        </div>
      )}

      {/* Subsection Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredSubsections ? (
          filteredSubsections.map(sub => {
            const isSelected = sub.slug === selectedSlug;
            const status = statusMap.get(sub.slug) || 'PUBLISHED';

            return (
              <div
                key={sub.slug}
                onClick={() => onSelectSlug(sub.slug)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500 shadow-md'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white truncate block">{sub.title}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                      status === 'PUBLISHED'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      {status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{sub.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px]">
                  <span className="text-cyan-400 font-mono truncate">{sub.publicPath}</span>
                  <a
                    href={sub.publicPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-slate-400 hover:text-cyan-300 p-1 shrink-0"
                    title={`Open live destination: ${sub.publicPath}`}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })
        ) : selectedPillarKey === 'custom' ? (
          customPages.map(page => {
            const isSelected = page.slug === selectedSlug;
            return (
              <div
                key={page.id}
                onClick={() => onSelectSlug(page.slug)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-slate-900 border-purple-500 ring-1 ring-purple-500 shadow-md'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white truncate block">{page.title}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 uppercase">
                      {page.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">/pages/{page.slug}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px]">
                  <span className="text-purple-400 font-bold">Custom Page</span>
                  <a
                    href={`/pages/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-slate-400 hover:text-purple-300 p-1 shrink-0"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })
        ) : activePillar ? (
          activePillar.subsections.map(sub => {
            const isSelected = sub.slug === selectedSlug;
            const status = statusMap.get(sub.slug) || 'PUBLISHED';

            return (
              <div
                key={sub.slug}
                onClick={() => onSelectSlug(sub.slug)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500 shadow-md'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white truncate block">{sub.title}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                      status === 'PUBLISHED'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      {status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{sub.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px]">
                  <span className="text-cyan-400 font-mono truncate">{sub.publicPath}</span>
                  <a
                    href={sub.publicPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-slate-400 hover:text-cyan-300 p-1 shrink-0"
                    title={`Open live destination: ${sub.publicPath}`}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })
        ) : null}
      </div>
    </div>
  );
};
