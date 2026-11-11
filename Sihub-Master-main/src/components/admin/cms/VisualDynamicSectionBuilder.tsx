/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Visual Dynamic Section Builder
 * Enables non-technical administrators to compose, visually configure,
 * reorder, toggle, and manage 15 ready-made visual section types on any page.
 * No JSON or HTML code required.
 */

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  Type,
  Image as ImageIcon,
  Video,
  Grid,
  Users,
  Award,
  Calendar,
  MessageSquare,
  Building,
  Rocket,
  FileText,
  Phone,
  Layout,
  Upload,
  Link,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Palette,
  Columns
} from 'lucide-react';
import type {
  CmsPageSection,
  CmsContentBlock,
  CmsBlockType,
  CmsSectionLayout
} from '../../../types/cmsBlocks';
import { apiGet, apiPost } from '../../../services/apiClient';

export interface VisualDynamicSectionBuilderProps {
  sections: CmsPageSection[];
  onChange: (sections: CmsPageSection[]) => void;
  pageTitle?: string;
}

const createId = () =>
  globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `sec-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const defaultLayout: CmsSectionLayout = {
  desktopColumns: 3,
  tabletColumns: 2,
  mobileColumns: 1,
  backgroundColor: '#ffffff',
  textColor: '#0f172a',
  spacing: 'normal'
};

export type VisualSectionType =
  | 'hero'
  | 'richText'
  | 'textImage'
  | 'gallery'
  | 'video'
  | 'statistics'
  | 'cards'
  | 'team'
  | 'programmes'
  | 'events'
  | 'testimonials'
  | 'partners'
  | 'cta'
  | 'documents'
  | 'contact';

interface SectionTypeDescriptor {
  type: VisualSectionType;
  label: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  defaultColumns: 1 | 2 | 3 | 4;
}

export const VISUAL_SECTION_TYPES: SectionTypeDescriptor[] = [
  {
    type: 'hero',
    label: '1. Hero Section',
    description: 'Prominent headline, narrative summary, background media, and primary action buttons.',
    icon: Sparkles,
    badge: 'Flagship',
    defaultColumns: 1
  },
  {
    type: 'richText',
    label: '2. Rich Text / Content Block',
    description: 'Structured formatted prose, subtitles, lists, and editorial paragraphs.',
    icon: Type,
    badge: 'Content',
    defaultColumns: 1
  },
  {
    type: 'textImage',
    label: '3. Image & Text Combination',
    description: 'Side-by-side narrative with high-resolution photography on either the left or right.',
    icon: ImageIcon,
    badge: 'Storytelling',
    defaultColumns: 2
  },
  {
    type: 'gallery',
    label: '4. Image Gallery',
    description: 'Grid of ecosystem photography, field activities, workshops, and facilities.',
    icon: Grid,
    badge: 'Visual Media',
    defaultColumns: 3
  },
  {
    type: 'video',
    label: '5. Video Section',
    description: 'Embedded keynote, ecosystem documentary, YouTube/Vimeo embed, or direct MP4.',
    icon: Video,
    badge: 'Media',
    defaultColumns: 1
  },
  {
    type: 'statistics',
    label: '6. Statistics / Impact Counters',
    description: 'Audited impact metrics, graduation numbers, jobs created, and funding raised.',
    icon: Award,
    badge: 'Impact',
    defaultColumns: 4
  },
  {
    type: 'cards',
    label: '7. Feature / Service Cards',
    description: 'Interactive cards highlighting ecosystem offerings, pillars, or technical capabilities.',
    icon: Layout,
    badge: 'Features',
    defaultColumns: 3
  },
  {
    type: 'team',
    label: '8. Team Member List',
    description: 'Profiles of directors, lab managers, engineers, and innovation fellows.',
    icon: Users,
    badge: 'Leadership',
    defaultColumns: 3
  },
  {
    type: 'programmes',
    label: '9. Programme / Course Cards',
    description: 'Course catalog entries, technical bootcamps, and accelerator cohort tracks.',
    icon: Rocket,
    badge: 'Academy',
    defaultColumns: 3
  },
  {
    type: 'events',
    label: '10. Event Listings',
    description: 'Upcoming summits, demo days, hackathons, and regional speaker panels.',
    icon: Calendar,
    badge: 'Calendar',
    defaultColumns: 3
  },
  {
    type: 'testimonials',
    label: '11. Testimonials / Success Stories',
    description: 'Founder quotes, student journeys, and partner endorsements.',
    icon: MessageSquare,
    badge: 'Social Proof',
    defaultColumns: 3
  },
  {
    type: 'partners',
    label: '12. Partner / Supporter Logos',
    description: 'Grid of international development donors, tech vendors, and institutional allies.',
    icon: Building,
    badge: 'Alliances',
    defaultColumns: 4
  },
  {
    type: 'cta',
    label: '13. Call-to-Action (CTA) Banner',
    description: 'High-contrast conversion strip inviting visitor applications, pitches, or contact.',
    icon: Plus,
    badge: 'Conversion',
    defaultColumns: 1
  },
  {
    type: 'documents',
    label: '14. Document / Download Links',
    description: 'Annual reports, strategic whitepapers, pitch guidelines, and policy briefs.',
    icon: FileText,
    badge: 'Downloads',
    defaultColumns: 2
  },
  {
    type: 'contact',
    label: '15. Contact / Inquiry Info',
    description: 'Physical campus location, direct emails, phone numbers, and visitor hours.',
    icon: Phone,
    badge: 'Directory',
    defaultColumns: 2
  }
];

export const VisualDynamicSectionBuilder: React.FC<VisualDynamicSectionBuilderProps> = ({
  sections = [],
  onChange,
  pageTitle = 'Current Page'
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(sections[0]?.id || '');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [storageStatus, setStorageStatus] = useState<{ configured: boolean; message: string }>({
    configured: false,
    message: 'Checking storage mode…'
  });
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);

  // Check backend storage configuration status once on mount
  useEffect(() => {
    let active = true;
    apiGet<{ media?: unknown[]; storageConfigured?: boolean }>('/api/media/admin')
      .then((res) => {
        if (!active) return;
        if (res.storageConfigured) {
          setStorageStatus({
            configured: true,
            message: 'Private S3 Cloud Storage is active and verified.'
          });
        } else {
          setStorageStatus({
            configured: false,
            message: 'External S3 bucket not connected. Direct image/video URLs are used for media presentation.'
          });
        }
      })
      .catch(() => {
        if (!active) return;
        setStorageStatus({
          configured: false,
          message: 'Direct media URL mode active (standard HTTP/HTTPS links supported).'
        });
      });
    return () => {
      active = false;
    };
  }, []);

  const handleAddSection = (descriptor: SectionTypeDescriptor) => {
    const id = createId();
    let initialBlocks: CmsContentBlock[] = [];

    switch (descriptor.type) {
      case 'hero':
        initialBlocks = [
          { id: createId(), type: 'subheading', text: 'Institutional Initiative' },
          { id: createId(), type: 'heading', text: `${descriptor.label.replace(/^\d+\.\s*/, '')} Headline`, level: 2 },
          { id: createId(), type: 'paragraph', text: 'Provide clear, compelling narrative copy introducing this milestone or strategic priority.' },
          { id: createId(), type: 'button', label: 'Explore Initiative', url: '/programs', variant: 'primary' }
        ];
        break;

      case 'richText':
        initialBlocks = [
          { id: createId(), type: 'heading', text: 'Strategic Framework & Principles', level: 2 },
          { id: createId(), type: 'richText', text: 'Somali Innovation Hub operates with transparent accountability, grassroots community inclusion, and high-impact digital standards across all member regions.' }
        ];
        break;

      case 'textImage':
        initialBlocks = [
          {
            id: createId(),
            type: 'textImage',
            heading: 'Community-Driven Technology Advancement',
            text: 'Our technical teams work in direct collaboration with local stakeholders, youth creators, and educational institutions to co-design scalable interventions.',
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
            imageAlt: 'Somali Innovation Hub team in technology workshop',
            layout: 'imageRight'
          }
        ];
        break;

      case 'gallery':
        initialBlocks = [
          { id: createId(), type: 'heading', text: 'Ecosystem Visual Gallery', level: 2 },
          {
            id: createId(),
            type: 'gallery',
            items: [
              { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80', alt: 'Somali Innovation Summit Main Hall', caption: 'Flagship keynote in Mogadishu' },
              { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', alt: 'SWITI Technology Laboratory', caption: 'Women in technology prototyping' },
              { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', alt: 'Developer Workshop Session', caption: 'Hands-on coding cohort' }
            ]
          }
        ];
        break;

      case 'video':
        initialBlocks = [
          { id: createId(), type: 'heading', text: 'Featured Ecosystem Video', level: 2 },
          {
            id: createId(),
            type: 'embed',
            src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            title: 'SiHub Ecosystem Documentary',
            aspectRatio: '16/9'
          }
        ];
        break;

      case 'statistics':
        initialBlocks = [
          { id: createId(), type: 'heading', text: 'Measurable Outcomes & Growth', level: 2 },
          { id: createId(), type: 'stat', value: '5,000+', label: 'Trained Learners', description: 'Certified across tech tracks' },
          { id: createId(), type: 'stat', value: '140+', label: 'Startups Supported', description: 'Early-stage & growth ventures' },
          { id: createId(), type: 'stat', value: '$850k', label: 'Catalytic Funding', description: 'Disbursed to youth founders' },
          { id: createId(), type: 'stat', value: '62%', label: 'Female Scholars', description: 'Active gender inclusion' }
        ];
        break;

      case 'cards':
        initialBlocks = [
          { id: createId(), type: 'heading', text: 'Core Innovation Pillars', level: 2 },
          { id: createId(), type: 'card', title: 'Incubation & Acceleration', description: 'Mentorship, legal sandboxes, and investor demo days for scalable Horn of Africa startups.', badge: 'Pillar 1', buttonLabel: 'Learn More', url: '/startups/incubation' },
          { id: createId(), type: 'card', title: 'Talent & Workforce Development', description: 'Full-stack engineering, cloud fundamentals, and practical software apprenticeships.', badge: 'Pillar 2', buttonLabel: 'Learn More', url: '/programs/digital-skills' },
          { id: createId(), type: 'card', title: 'Civic & Social Innovation', description: 'Co-creating civic-tech and climate resilience tools with rural and regional communities.', badge: 'Pillar 3', buttonLabel: 'Learn More', url: '/programs/social-innovation' }
        ];
        break;

      case 'team':
        initialBlocks = [
          { id: createId(), type: 'heading', text: 'Programme Leadership & Mentors', level: 2 },
          { id: createId(), type: 'teamMember', name: 'Eng. Liban Jama', role: 'Head of Technology Innovation', bio: 'Senior software architect with over a decade of scalable systems expertise across East Africa.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', location: 'Mogadishu' },
          { id: createId(), type: 'teamMember', name: 'Fatima Dahir', role: 'Director of Talent Academy', bio: 'Agricultural systems specialist and champion for inclusive digital upskilling.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', location: 'Hargeisa' },
          { id: createId(), type: 'teamMember', name: 'Warsame Abdi', role: 'Ventures & Seed Capital Lead', bio: 'Former fintech founder and angel syndicate coordinator advising seed cohorts.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', location: 'Kismayo' }
        ];
        break;

      case 'programmes':
        initialBlocks = [
          { id: createId(), type: 'heading', text: 'Featured Cohort Tracks', level: 2 },
          { id: createId(), type: 'programCard', title: 'Software Engineering Flagship', category: 'Coding Bootcamp', description: '12-week comprehensive bootcamp covering TypeScript, React, Node.js, and Cloud Infrastructure.', duration: '12 Weeks', targetAudience: 'University graduates & junior developers', actionUrl: '/institute/digital-skills-academy' },
          { id: createId(), type: 'programCard', title: 'Founder Incubation Fellowship', category: 'Venture Builder', description: 'Intensive 16-week cohort offering co-working space, legal structuring, and investor readiness.', duration: '16 Weeks', targetAudience: 'Early-stage tech & social entrepreneurs', actionUrl: '/startups/incubation' }
        ];
        break;

      case 'events':
        initialBlocks = [
          { id: createId(), type: 'heading', text: 'Upcoming Summits & Demo Days', level: 2 },
          { id: createId(), type: 'card', title: 'Somali Innovation Summit 2026', description: 'Annual gathering of over 1,500 entrepreneurs, donors, policy makers, and international technologists.', badge: 'Flagship Event', buttonLabel: 'Register Now', url: '/events/summit' },
          { id: createId(), type: 'card', title: 'SWITI Demo Day & Pitch Clinic', description: 'Showcase of 24 female-led startups pitching before venture angel syndicates and development partners.', badge: 'Investor Showcase', buttonLabel: 'Reserve Seat', url: '/events/expo' }
        ];
        break;

      case 'testimonials':
        initialBlocks = [
          { id: createId(), type: 'heading', text: 'Voice of the Ecosystem', level: 2 },
          { id: createId(), type: 'testimonial', quote: 'SiHub provided our clean-tech startup with prototyping facilities, angel introductions, and legal mentorship that transformed our concept into a viable business.', author: 'Aisha Mohamed', role: 'Founder & CEO', organization: 'Daryeel Mobile Health' },
          { id: createId(), type: 'testimonial', quote: 'The digital skills bootcamp was the bridge I needed. Within three months of graduating, I secured a remote software engineering contract with a global firm.', author: 'Hassan Nur', role: 'Graduate Engineer', organization: 'Class of 2025' }
        ];
        break;

      case 'partners':
        initialBlocks = [
          { id: createId(), type: 'heading', text: 'Strategic Alliances & Supporters', level: 2 },
          { id: createId(), type: 'partnerLogo', name: 'Ministry of Communications & Technology', logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80', tier: 'Government Partner' },
          { id: createId(), type: 'partnerLogo', name: 'United Nations Development Programme (UNDP)', logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80', tier: 'Development Partner' },
          { id: createId(), type: 'partnerLogo', name: 'Somali Chamber of Commerce & Industry', logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80', tier: 'Private Sector' }
        ];
        break;

      case 'cta':
        initialBlocks = [
          { id: createId(), type: 'heading', text: 'Ready to Accelerate Your Impact in Somalia?', level: 2 },
          { id: createId(), type: 'paragraph', text: 'Whether you are a founder looking for seed incubation, a scholar seeking technical skills, or an organization eager to partner, SiHub welcomes you.' },
          { id: createId(), type: 'button', label: 'Submit Your Application', url: '/programs', variant: 'primary' }
        ];
        break;

      case 'documents':
        initialBlocks = [
          { id: createId(), type: 'heading', text: 'Downloadable Resources & Policy Briefs', level: 2 },
          { id: createId(), type: 'document', title: 'SiHub Annual Ecosystem Impact Report 2025', description: 'Comprehensive audited data on job creation, startup survival rates, and regional hub expansion.', fileUrl: '#', format: 'PDF', fileSize: '4.2 MB' },
          { id: createId(), type: 'document', title: 'National Startup Act Policy Recommendations', description: 'Briefing paper presented to parliamentary committee for tech innovation incentives.', fileUrl: '#', format: 'PDF', fileSize: '1.8 MB' }
        ];
        break;

      case 'contact':
        initialBlocks = [
          { id: createId(), type: 'heading', text: 'Visit Our Regional Innovation Campuses', level: 2 },
          { id: createId(), type: 'contactInfo', title: 'Mogadishu Headquarters', email: 'info@sihub.so', phone: '+252 61 500 0000', address: 'KM4 Airport Road, Wadajir District, Mogadishu, Somalia', hours: 'Saturday – Thursday: 8:00 AM – 5:00 PM' }
        ];
        break;

      default:
        initialBlocks = [
          { id: createId(), type: 'heading', text: descriptor.label, level: 2 },
          { id: createId(), type: 'paragraph', text: 'Content block description.' }
        ];
    }

    const newSection: CmsPageSection = {
      id,
      name: descriptor.label.replace(/^\d+\.\s*/, ''),
      description: descriptor.description,
      placement: 'bottom',
      order: sections.length,
      visible: true,
      archived: false,
      layout: {
        ...defaultLayout,
        desktopColumns: descriptor.defaultColumns
      },
      blocks: initialBlocks
    };

    const updated = [...sections, newSection];
    onChange(updated);
    setActiveSectionId(id);
    setIsAddModalOpen(false);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const reordered = [...sections];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    const updated = reordered.map((s, idx) => ({ ...s, order: idx }));
    onChange(updated);
  };

  const handleToggleVisible = (id: string) => {
    const updated = sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s));
    onChange(updated);
  };

  const handleDeleteSection = (id: string) => {
    const target = sections.find((s) => s.id === id);
    if (!target) return;
    if (window.confirm(`Remove the section "${target.name}" from this page?`)) {
      const updated = sections.filter((s) => s.id !== id).map((s, idx) => ({ ...s, order: idx }));
      onChange(updated);
      if (activeSectionId === id) {
        setActiveSectionId(updated[0]?.id || '');
      }
    }
  };

  const handleUpdateSectionName = (id: string, name: string) => {
    const updated = sections.map((s) => (s.id === id ? { ...s, name } : s));
    onChange(updated);
  };

  const handleUpdateSectionLayout = (id: string, partial: Partial<CmsSectionLayout>) => {
    const updated = sections.map((s) =>
      s.id === id ? { ...s, layout: { ...s.layout, ...partial } } : s
    );
    onChange(updated);
  };

  const handleUpdateBlock = (sectionId: string, blockId: string, partial: Partial<CmsContentBlock>) => {
    const updated = sections.map((sec) => {
      if (sec.id !== sectionId) return sec;
      return {
        ...sec,
        blocks: sec.blocks.map((blk) => (blk.id === blockId ? ({ ...blk, ...partial } as CmsContentBlock) : blk))
      };
    });
    onChange(updated);
  };

  const handleRemoveBlock = (sectionId: string, blockId: string) => {
    const updated = sections.map((sec) => {
      if (sec.id !== sectionId) return sec;
      return {
        ...sec,
        blocks: sec.blocks.filter((blk) => blk.id !== blockId)
      };
    });
    onChange(updated);
  };

  const activeSection = sections.find((s) => s.id === activeSectionId);

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
      {/* Header & Storage Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-100 text-cyan-800">
              <Layers className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900">
              4. Dynamic Page Section Builder (Visual Components)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compose and arrange content sections on this page. All 15 official component types supported.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Section / Component</span>
          </button>
        </div>
      </div>

      {/* Storage Mode Status Indicator */}
      <div
        className={`px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between gap-3 ${
          storageStatus.configured
            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
            : 'bg-slate-50 text-slate-700 border border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2">
          {storageStatus.configured ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
          )}
          <span className="font-medium">Media Storage: {storageStatus.message}</span>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/70">
          {storageStatus.configured ? 'S3 Bucket' : 'Standard URL Mode'}
        </span>
      </div>

      {/* Main Section Manager: Left list, Right visual form editor */}
      {sections.length === 0 ? (
        <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-700 mx-auto flex items-center justify-center mb-2">
            <Plus className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No Custom Dynamic Sections Added Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
            The pre-designed template for {pageTitle} is active. You can add extra feature cards, impact stats, video embeds, or CTA banners to this page without writing any code.
          </p>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold shadow-xs hover:bg-cyan-500"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Choose from 15 Ready-Made Components</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Section List / Ordering / Visibility */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
              <span>Current Sections ({sections.length})</span>
              <span>Reorder & Visibility</span>
            </div>

            <div className="space-y-2">
              {sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    activeSectionId === sec.id
                      ? 'border-cyan-600 bg-cyan-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                        #{idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 truncate">{sec.name}</h4>
                      {!sec.visible && (
                        <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {sec.blocks.length} component block{sec.blocks.length === 1 ? '' : 's'} • {sec.layout.desktopColumns} cols
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveSection(idx, 'up')}
                      title="Move Up"
                      className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === sections.length - 1}
                      onClick={() => handleMoveSection(idx, 'down')}
                      title="Move Down"
                      className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleVisible(sec.id)}
                      title={sec.visible ? 'Hide section on public page' : 'Make section visible'}
                      className={`p-1 rounded ${sec.visible ? 'text-slate-400 hover:text-slate-700' : 'text-amber-600'}`}
                    >
                      {sec.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSection(sec.id)}
                      title="Delete section"
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-xs font-semibold text-slate-600 hover:border-cyan-600 hover:text-cyan-700 hover:bg-cyan-50/30 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Section</span>
            </button>
          </div>

          {/* Right: Section Content & Visual Blocks Editor */}
          <div className="lg:col-span-7 bg-slate-50/60 p-4 rounded-xl border border-slate-200 space-y-5">
            {activeSection ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div className="min-w-0 flex-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Section Title / Label
                    </label>
                    <input
                      type="text"
                      value={activeSection.name}
                      onChange={(e) => handleUpdateSectionName(activeSection.id, e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Columns
                      </label>
                      <select
                        value={activeSection.layout.desktopColumns}
                        onChange={(e) =>
                          handleUpdateSectionLayout(activeSection.id, {
                            desktopColumns: Number(e.target.value) as 1 | 2 | 3 | 4
                          })
                        }
                        className="px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                      >
                        <option value={1}>1 Col (Full)</option>
                        <option value={2}>2 Columns</option>
                        <option value={3}>3 Columns</option>
                        <option value={4}>4 Columns</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Spacing
                      </label>
                      <select
                        value={activeSection.layout.spacing}
                        onChange={(e) =>
                          handleUpdateSectionLayout(activeSection.id, {
                            spacing: e.target.value as 'compact' | 'normal' | 'spacious'
                          })
                        }
                        className="px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                      >
                        <option value="compact">Compact</option>
                        <option value="normal">Normal</option>
                        <option value="spacious">Spacious</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Blocks inside active section */}
                <div className="space-y-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                    Component Content Blocks ({activeSection.blocks.length})
                  </span>

                  {activeSection.blocks.map((block, bIdx) => (
                    <div
                      key={block.id}
                      className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-3 shadow-2xs"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          Block #{bIdx + 1}: {block.type}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBlock(activeSection.id, block.id)}
                          className="text-slate-400 hover:text-rose-600 text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>

                      {/* Heading Block */}
                      {block.type === 'heading' && (
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-700">Heading Text</label>
                          <input
                            type="text"
                            value={block.text}
                            onChange={(e) =>
                              handleUpdateBlock(activeSection.id, block.id, { text: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
                          />
                        </div>
                      )}

                      {/* Subheading Block */}
                      {block.type === 'subheading' && (
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-700">Subheading / Eyebrow</label>
                          <input
                            type="text"
                            value={block.text}
                            onChange={(e) =>
                              handleUpdateBlock(activeSection.id, block.id, { text: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-cyan-800"
                          />
                        </div>
                      )}

                      {/* Paragraph Block */}
                      {block.type === 'paragraph' && (
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-700">Paragraph Content</label>
                          <textarea
                            rows={3}
                            value={block.text}
                            onChange={(e) =>
                              handleUpdateBlock(activeSection.id, block.id, { text: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                          />
                        </div>
                      )}

                      {/* RichText Block */}
                      {block.type === 'richText' && (
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-700">
                            Formatted Rich Text (Supports markdown **bold** and *italic*)
                          </label>
                          <textarea
                            rows={4}
                            value={block.text}
                            onChange={(e) =>
                              handleUpdateBlock(activeSection.id, block.id, { text: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono text-slate-900"
                          />
                        </div>
                      )}

                      {/* Button / CTA Block */}
                      {block.type === 'button' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Button Label</label>
                            <input
                              type="text"
                              value={block.label}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { label: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Destination URL</label>
                            <input
                              type="text"
                              value={block.url}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { url: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 font-mono"
                            />
                          </div>
                        </div>
                      )}

                      {/* Stat Block */}
                      {block.type === 'stat' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Metric Value</label>
                            <input
                              type="text"
                              value={block.value}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { value: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-black text-cyan-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Label</label>
                            <input
                              type="text"
                              value={block.label}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { label: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                            <input
                              type="text"
                              value={block.description || ''}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { description: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-600"
                            />
                          </div>
                        </div>
                      )}

                      {/* Card Block */}
                      {block.type === 'card' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Card Title</label>
                              <input
                                type="text"
                                value={block.title}
                                onChange={(e) =>
                                  handleUpdateBlock(activeSection.id, block.id, { title: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Tag</label>
                              <input
                                type="text"
                                value={block.badge || ''}
                                onChange={(e) =>
                                  handleUpdateBlock(activeSection.id, block.id, { badge: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-700"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Card Description</label>
                            <textarea
                              rows={2}
                              value={block.description}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { description: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Button Label</label>
                              <input
                                type="text"
                                value={block.buttonLabel || ''}
                                onChange={(e) =>
                                  handleUpdateBlock(activeSection.id, block.id, { buttonLabel: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Button Link URL</label>
                              <input
                                type="text"
                                value={block.url || ''}
                                onChange={(e) =>
                                  handleUpdateBlock(activeSection.id, block.id, { url: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Team Member Block */}
                      {block.type === 'teamMember' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Member Name</label>
                            <input
                              type="text"
                              value={block.name}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { name: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Position</label>
                            <input
                              type="text"
                              value={block.role}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { role: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-cyan-800"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Profile Image URL</label>
                            <input
                              type="text"
                              value={block.image || ''}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { image: e.target.value })
                              }
                              placeholder="https://images.unsplash.com/..."
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Biography</label>
                            <textarea
                              rows={2}
                              value={block.bio || ''}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { bio: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-700"
                            />
                          </div>
                        </div>
                      )}

                      {/* Video Embed Block */}
                      {block.type === 'embed' && (
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-700">
                            Video URL (YouTube Embed / Vimeo / MP4)
                          </label>
                          <input
                            type="text"
                            value={block.src}
                            onChange={(e) =>
                              handleUpdateBlock(activeSection.id, block.id, { src: e.target.value })
                            }
                            placeholder="https://www.youtube.com/embed/..."
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                          />
                          <p className="text-[10px] text-slate-400">
                            Tip: For YouTube, use the embed URL format (e.g. https://www.youtube.com/embed/VIDEO_ID).
                          </p>
                        </div>
                      )}

                      {/* Testimonial Block */}
                      {block.type === 'testimonial' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Quote Statement</label>
                            <textarea
                              rows={2}
                              value={block.quote}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { quote: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs italic text-slate-800"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Author</label>
                              <input
                                type="text"
                                value={block.author}
                                onChange={(e) =>
                                  handleUpdateBlock(activeSection.id, block.id, { author: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                              <input
                                type="text"
                                value={block.role || ''}
                                onChange={(e) =>
                                  handleUpdateBlock(activeSection.id, block.id, { role: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Organization</label>
                              <input
                                type="text"
                                value={block.organization || ''}
                                onChange={(e) =>
                                  handleUpdateBlock(activeSection.id, block.id, { organization: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Partner Logo Block */}
                      {block.type === 'partnerLogo' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Partner Name</label>
                            <input
                              type="text"
                              value={block.name}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { name: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Tier / Category</label>
                            <input
                              type="text"
                              value={block.tier || ''}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { tier: e.target.value })
                              }
                              placeholder="e.g. Government Partner"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Logo Image URL</label>
                            <input
                              type="text"
                              value={block.logoUrl}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { logoUrl: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                            />
                          </div>
                        </div>
                      )}

                      {/* Document Block */}
                      {block.type === 'document' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Document Title</label>
                              <input
                                type="text"
                                value={block.title}
                                onChange={(e) =>
                                  handleUpdateBlock(activeSection.id, block.id, { title: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Format & Size</label>
                              <input
                                type="text"
                                value={block.fileSize || ''}
                                onChange={(e) =>
                                  handleUpdateBlock(activeSection.id, block.id, { fileSize: e.target.value })
                                }
                                placeholder="e.g. 4.2 MB (PDF)"
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">File URL or Path</label>
                            <input
                              type="text"
                              value={block.fileUrl}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { fileUrl: e.target.value })
                              }
                              placeholder="e.g. /documents/report.pdf or https://..."
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                            />
                          </div>
                        </div>
                      )}

                      {/* Contact Info Block */}
                      {block.type === 'contactInfo' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Campus / Location Title</label>
                            <input
                              type="text"
                              value={block.title}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { title: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                              <input
                                type="email"
                                value={block.email || ''}
                                onChange={(e) =>
                                  handleUpdateBlock(activeSection.id, block.id, { email: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                              <input
                                type="text"
                                value={block.phone || ''}
                                onChange={(e) =>
                                  handleUpdateBlock(activeSection.id, block.id, { phone: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Physical Address</label>
                            <input
                              type="text"
                              value={block.address || ''}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { address: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                            />
                          </div>
                        </div>
                      )}

                      {/* Text & Image Block */}
                      {block.type === 'textImage' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Section Heading</label>
                            <input
                              type="text"
                              value={block.heading || ''}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { heading: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Story Narrative</label>
                            <textarea
                              rows={3}
                              value={block.text}
                              onChange={(e) =>
                                handleUpdateBlock(activeSection.id, block.id, { text: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL</label>
                              <input
                                type="text"
                                value={block.image}
                                onChange={(e) =>
                                  handleUpdateBlock(activeSection.id, block.id, { image: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">Image Position</label>
                              <select
                                value={block.layout || 'imageRight'}
                                onChange={(e) =>
                                  handleUpdateBlock(activeSection.id, block.id, {
                                    layout: e.target.value as 'imageLeft' | 'imageRight'
                                  })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold"
                              >
                                <option value="imageRight">Image on Right (Text Left)</option>
                                <option value="imageLeft">Image on Left (Text Right)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-10 text-xs text-slate-400">
                Select a section from the left column to configure its content and layout.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Select from 15 Ready-Made Components */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add Pre-Designed Section Component</h3>
                <p className="text-xs text-slate-500">
                  Select one of the 15 supported visual components to add to {pageTitle}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {VISUAL_SECTION_TYPES.map((descriptor) => {
                const Icon = descriptor.icon;
                return (
                  <button
                    key={descriptor.type}
                    type="button"
                    onClick={() => handleAddSection(descriptor)}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-cyan-600 hover:bg-cyan-50/40 text-left transition-all group space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {descriptor.badge}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-cyan-800">
                      {descriptor.label}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                      {descriptor.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
