/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed Page Templates & Content-Only CMS Editor
 * Empowers non-technical administrators to manage content across all 33 official pages
 * using ready-made visual forms tailored to each page's specific subject matter.
 * No coding, block designing, or JSON editing required.
 */

import React, { useState, useEffect } from 'react';
import {
  Globe,
  Save,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowRight,
  Monitor,
  Tablet,
  Smartphone,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Video,
  Users,
  Compass,
  Rocket,
  GraduationCap,
  Calendar,
  Award,
  Handshake,
  Archive,
  RotateCcw,
  ShieldCheck,
  Building,
  Target,
  BookOpen
} from 'lucide-react';
import { officialWebsiteHierarchy, HierarchyCategory, HierarchyPage } from './WebsiteHierarchyNavigator';
import { getTemplateTypeForSlug, getTemplateMetadata, PageTemplateType } from '../../../types/pageTemplates';
import { apiGet, apiPut, apiPost, ApiError } from '../../../services/apiClient';
import type { DynamicPageContent } from '../../public/DynamicCmsPage';
import { VisualDynamicSectionBuilder } from './VisualDynamicSectionBuilder';

// Dedicated Page Views for All 34 Official Website Subsections
import { HomePageView } from '../../public/pages/HomePage';
import { WhoWeArePageView, VisionPageView, MissionPageView, TeamPageView } from '../../public/pages/AboutPages';
import {
  DigitalSkillsPageView,
  YouthEmpowermentPageView,
  SocialInnovationPageView,
  WomenInnovationPageView,
  InclusiveDigitalPageView,
  GreenSustainabilityPageView,
  YouthPeacePageView,
  CommunityDevPageView
} from '../../public/pages/ProgrammePages';
import {
  StartupIncubationPageView,
  FeaturedEntrepreneursPageView,
  YouthMentorshipPageView,
  StartupSupportPageView
} from '../../public/pages/StartupPages';
import {
  DigitalSkillsAcademyPageView,
  ProfessionalTrainingPageView,
  AiEmergingTechPageView,
  ResearchInnovationPageView,
  CertificationVerificationPageView
} from '../../public/pages/InstitutePages';
import {
  SiTalksPageView,
  SummitPageView,
  ExpoPageView,
  NewsStoriesPageView,
  MediaGalleryPageView
} from '../../public/pages/EventsMediaPages';
import {
  SuccessStoriesPageView,
  ProjectsAchievementsPageView,
  AnnualReportsPageView,
  CommunityImpactPageView
} from '../../public/pages/ImpactPages';
import {
  BecomePartnerPageView,
  DonorsSupportersPageView,
  CollaborationOpportunitiesPageView
} from '../../public/pages/PartnershipPages';

// Fallback generic templates for custom administrator-created pages
import { HomeFlagshipTemplateView } from '../../public/templates/HomeFlagshipTemplateView';
import { InstitutionalStoryTemplateView } from '../../public/templates/InstitutionalStoryTemplateView';
import { VisionMissionTemplateView } from '../../public/templates/VisionMissionTemplateView';
import { TeamDirectoryTemplateView } from '../../public/templates/TeamDirectoryTemplateView';
import { ProgrammeTrackTemplateView } from '../../public/templates/ProgrammeTrackTemplateView';
import { StartupAcceleratorTemplateView } from '../../public/templates/StartupAcceleratorTemplateView';
import { StartupShowcaseTemplateView } from '../../public/templates/StartupShowcaseTemplateView';
import { InstituteAcademyTemplateView } from '../../public/templates/InstituteAcademyTemplateView';
import { CredentialVerificationTemplateView } from '../../public/templates/CredentialVerificationTemplateView';
import { EventConferenceTemplateView } from '../../public/templates/EventConferenceTemplateView';
import { NewsMediaTemplateView } from '../../public/templates/NewsMediaTemplateView';
import { ImpactReportTemplateView } from '../../public/templates/ImpactReportTemplateView';
import { PartnershipPortalTemplateView } from '../../public/templates/PartnershipPortalTemplateView';

interface PreDesignedPageEditorProps {
  initialSlug?: string;
  onPageSaved?: (page: DynamicPageContent) => void;
}

export const PreDesignedPageEditor: React.FC<PreDesignedPageEditorProps> = ({
  initialSlug = 'vision',
  onPageSaved
}) => {
  // Navigation & Selection state
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('about');
  const [selectedSlug, setSelectedSlug] = useState<string>(initialSlug);
  const [activeTab, setActiveTab] = useState<'content' | 'preview'>('content');
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Page Content state
  const [pageData, setPageData] = useState<DynamicPageContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Find currently selected hierarchy items
  const currentCategory = officialWebsiteHierarchy.find((c) => c.key === selectedCategoryKey) || officialWebsiteHierarchy[1];
  const allPages = officialWebsiteHierarchy.flatMap((c) => c.subsections);
  const currentPageHierarchy = allPages.find((p) => p.slug === selectedSlug) || allPages[1];
  const templateType: PageTemplateType = getTemplateTypeForSlug(selectedSlug);
  const templateMeta = getTemplateMetadata(templateType);

  // Fetch page content when selectedSlug changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setErrorMessage(null);
    setSaveSuccess(null);

    apiGet<DynamicPageContent>(`/api/cms/pages/${selectedSlug}`)
      .then((data) => {
        if (isMounted) {
          setPageData({
            ...data,
            title: data.title || currentPageHierarchy?.title || 'Page',
            heading: data.heading || data.title || currentPageHierarchy?.title || 'Page Heading',
            categoryKey: selectedCategoryKey,
            categoryTitle: currentCategory?.title || 'Category',
            published: data.status === 'PUBLISHED' || data.published === true
          });
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          // Provide an intelligent default structure seeded from official definition
          setPageData({
            slug: selectedSlug,
            title: currentPageHierarchy?.title || 'New Page',
            categoryKey: selectedCategoryKey,
            categoryTitle: currentCategory?.title || 'Category',
            heading: currentPageHierarchy?.title || 'Page Title',
            subheading: currentPageHierarchy?.description || '',
            summary: currentPageHierarchy?.description || '',
            description: currentPageHierarchy?.description || '',
            publicPath: currentPageHierarchy?.publicPath || `/${selectedCategoryKey}/${selectedSlug}`,
            published: true,
            status: 'PUBLISHED',
            heroBadge: currentCategory?.title,
            cta: { label: 'Learn More', url: '/contact', variant: 'primary' },
            stats: [
              { value: '100+', label: 'Active Participants', description: 'Ecosystem benchmark' },
              { value: '100%', label: 'Commitment', description: 'Impact-driven' }
            ],
            features: [
              { title: 'Flagship Deliverable', description: 'Comprehensive outcomes tailored to Somali youth and founders.' }
            ]
          });
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedSlug]);

  // Handle Save (Draft, Live Publish, or Action)
  const handleSave = async (publishState?: boolean, actionType?: 'draft' | 'publish' | 'unpublish' | 'restore') => {
    if (!pageData) return;
    setSaving(true);
    setErrorMessage(null);
    setSaveSuccess(null);

    const isPublishing = actionType === 'publish' || (actionType === undefined && publishState === true);
    const isUnpublishing = actionType === 'unpublish';

    const payloadToSave: Record<string, unknown> = {
      ...pageData,
      action: actionType || (isPublishing ? 'publish' : 'draft'),
      published: isUnpublishing ? false : isPublishing,
      updatedAt: new Date().toISOString()
    };

    try {
      const updated = await apiPut<DynamicPageContent>(`/api/cms/pages/${selectedSlug}`, payloadToSave);
      setPageData(updated);
      
      const successNotice = isPublishing
        ? 'Content published live! Your changes are now visible on the public website.'
        : isUnpublishing
        ? 'Page has been unpublished and taken offline. Content is safely preserved.'
        : 'Draft saved successfully. Changes are saved as a working draft without affecting the live page.';
      
      setSaveSuccess(successNotice);
      if (onPageSaved) onPageSaved(updated);
      setTimeout(() => setSaveSuccess(null), 4500);
    } catch (err: unknown) {
      setErrorMessage(err instanceof ApiError ? err.message : 'Could not save page content.');
    } finally {
      setSaving(false);
    }
  };

  // Image Upload or URL Selector Handler
  const handleFileUpload = (file: File, onDone: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onDone(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Render the appropriate template preview
  const renderPreview = () => {
    if (!pageData) return null;
    const dummyNavigate = (url: string) => {
      console.log('Preview navigation triggered:', url);
    };

    let innerContent: React.ReactNode = null;
    switch (selectedSlug) {
      // 1. Home
      case 'home':
        innerContent = <HomePageView page={pageData} onNavigate={dummyNavigate} />;
        break;

      // 2-5. About SiHub (4 Pages)
      case 'who-we-are':
        innerContent = <WhoWeArePageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'vision':
        innerContent = <VisionPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'mission':
        innerContent = <MissionPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'our-team':
        innerContent = <TeamPageView page={pageData} onNavigate={dummyNavigate} />;
        break;

      // 6-13. Our Programmes (8 Pages)
      case 'digital-skills':
        innerContent = <DigitalSkillsPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'youth-empowerment':
        innerContent = <YouthEmpowermentPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'social-innovation':
        innerContent = <SocialInnovationPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'women-innovation':
        innerContent = <WomenInnovationPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'inclusive-digital':
        innerContent = <InclusiveDigitalPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'green-sustainability':
        innerContent = <GreenSustainabilityPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'youth-peace':
        innerContent = <YouthPeacePageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'community-dev':
        innerContent = <CommunityDevPageView page={pageData} onNavigate={dummyNavigate} />;
        break;

      // 14-17. Entrepreneurship & Startups (4 Pages)
      case 'incubation':
        innerContent = <StartupIncubationPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'entrepreneurs':
        innerContent = <FeaturedEntrepreneursPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'youth-mentorship':
        innerContent = <YouthMentorshipPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'startup-support':
        innerContent = <StartupSupportPageView page={pageData} onNavigate={dummyNavigate} />;
        break;

      // 18-22. SiHub Institute (5 Pages)
      case 'digital-skills-academy':
        innerContent = <DigitalSkillsAcademyPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'professional-training':
        innerContent = <ProfessionalTrainingPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'ai-emerging':
        innerContent = <AiEmergingTechPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'research-innovation':
        innerContent = <ResearchInnovationPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'certification':
        innerContent = <CertificationVerificationPageView page={pageData} onNavigate={dummyNavigate} />;
        break;

      // 23-27. Events & Media (5 Pages)
      case 'sitalks':
        innerContent = <SiTalksPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'summit':
        innerContent = <SummitPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'expo':
        innerContent = <ExpoPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'news-stories':
        innerContent = <NewsStoriesPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'media':
      case 'media-gallery':
        innerContent = <MediaGalleryPageView page={pageData} onNavigate={dummyNavigate} />;
        break;

      // 28-31. Our Impact (4 Pages)
      case 'success-stories':
        innerContent = <SuccessStoriesPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'projects-achievements':
        innerContent = <ProjectsAchievementsPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'annual-reports':
        innerContent = <AnnualReportsPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'community-impact':
        innerContent = <CommunityImpactPageView page={pageData} onNavigate={dummyNavigate} />;
        break;

      // 32-34. Partnerships (3 Pages)
      case 'become-partner':
        innerContent = <BecomePartnerPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'donors-supporters':
        innerContent = <DonorsSupportersPageView page={pageData} onNavigate={dummyNavigate} />;
        break;
      case 'collaboration-opportunities':
        innerContent = <CollaborationOpportunitiesPageView page={pageData} onNavigate={dummyNavigate} />;
        break;

      // Fallback to template type for custom dynamic pages
      default: {
        switch (templateType) {
          case 'home_flagship':
            innerContent = <HomeFlagshipTemplateView page={pageData} onNavigate={dummyNavigate} />;
            break;
          case 'institutional_story':
            innerContent = <InstitutionalStoryTemplateView page={pageData} onNavigate={dummyNavigate} />;
            break;
          case 'vision_mission':
            innerContent = <VisionMissionTemplateView page={pageData} onNavigate={dummyNavigate} />;
            break;
          case 'team_directory':
            innerContent = <TeamDirectoryTemplateView page={pageData} onNavigate={dummyNavigate} />;
            break;
          case 'programme_track':
            innerContent = <ProgrammeTrackTemplateView page={pageData} onNavigate={dummyNavigate} />;
            break;
          case 'startup_accelerator':
            innerContent = <StartupAcceleratorTemplateView page={pageData} onNavigate={dummyNavigate} />;
            break;
          case 'startup_showcase':
            innerContent = <StartupShowcaseTemplateView page={pageData} onNavigate={dummyNavigate} />;
            break;
          case 'institute_academy':
            innerContent = <InstituteAcademyTemplateView page={pageData} onNavigate={dummyNavigate} />;
            break;
          case 'credential_verification':
            innerContent = <CredentialVerificationTemplateView page={pageData} onNavigate={dummyNavigate} />;
            break;
          case 'event_conference':
            innerContent = <EventConferenceTemplateView page={pageData} onNavigate={dummyNavigate} />;
            break;
          case 'news_media':
            innerContent = <NewsMediaTemplateView page={pageData} onNavigate={dummyNavigate} />;
            break;
          case 'impact_report':
            innerContent = <ImpactReportTemplateView page={pageData} onNavigate={dummyNavigate} />;
            break;
          case 'partnership_portal':
            innerContent = <PartnershipPortalTemplateView page={pageData} onNavigate={dummyNavigate} />;
            break;
          default:
            innerContent = <ProgrammeTrackTemplateView page={pageData} onNavigate={dummyNavigate} />;
        }
      }
    }

    const viewportWidthClass =
      previewViewport === 'mobile'
        ? 'max-w-[390px] border-x border-slate-300'
        : previewViewport === 'tablet'
        ? 'max-w-[768px] border-x border-slate-300'
        : 'max-w-full';

    return (
      <div className="bg-slate-100 p-4 sm:p-8 rounded-2xl min-h-[600px] flex justify-center">
        <div className={`w-full bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 ${viewportWidthClass}`}>
          <div className="p-6 sm:p-10">{innerContent}</div>
        </div>
      </div>
    );
  };

  const isPublished = pageData?.status === 'PUBLISHED' || pageData?.published === true;
  const isArchived = pageData?.status === 'ARCHIVED';
  const hasDraft = Boolean(pageData?.hasDraft);

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar with Status, Preview & Save Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-100 text-cyan-800 text-[11px] font-bold uppercase tracking-wider">
              Ready-Made Template
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {templateMeta.name}
            </span>
            {isArchived ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-300">
                <Archive className="w-3 h-3 text-slate-500" /> Unpublished
              </span>
            ) : isPublished ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Live on Public Site
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                <EyeOff className="w-3 h-3 text-amber-600" /> Working Draft
              </span>
            )}

            {hasDraft && isPublished && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                Unpublished edits in draft
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>{currentPageHierarchy.title}</span>
            <span className="text-sm font-normal text-slate-400 font-mono">({currentPageHierarchy.publicPath})</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Tab Switcher: Form Editor vs Live Preview */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'content' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Content Form
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 ${
                activeTab === 'preview' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-cyan-600" />
              <span>Preview</span>
            </button>
          </div>

          {/* View Live Public Page */}
          <a
            href={currentPageHierarchy.publicPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
          >
            <span>View Live</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>

          {/* Save Draft Button */}
          <button
            onClick={() => handleSave(false, 'draft')}
            disabled={saving || loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-300 shadow-2xs transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5 text-slate-500" />
            <span>Save Draft</span>
          </button>

          {/* Unpublish Button */}
          {isPublished && (
            <button
              onClick={() => handleSave(false, 'unpublish')}
              disabled={saving || loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 text-xs font-semibold border border-slate-200 transition-all disabled:opacity-50"
              title="Take page offline without deleting content"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Unpublish</span>
            </button>
          )}

          {/* Publish Live Button */}
          <button
            onClick={() => handleSave(true, 'publish')}
            disabled={saving || loading}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>Publish Live</span>
          </button>
        </div>
      </div>

      {/* Save Success / Error Notifications */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveSuccess}</span>
          </div>
          <a
            href={currentPageHierarchy.publicPath}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-900"
          >
            Open public page &rarr;
          </a>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-slate-400 hover:text-slate-600">
            &times;
          </button>
        </div>
      )}

      {/* 2. Visual Hierarchy Selector (Categories & Subsections) */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Category Selector Tabs */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            1. Select Website Category (8 Main Categories)
          </span>
          <div className="flex flex-wrap gap-2">
            {officialWebsiteHierarchy.map((cat) => {
              const isSelected = selectedCategoryKey === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setSelectedCategoryKey(cat.key);
                    if (cat.subsections.length > 0) {
                      setSelectedSlug(cat.subsections[0].slug);
                    }
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subsection Selector Pills */}
        <div className="pt-2 border-t border-slate-100">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            2. Select Subsection to Edit ({currentCategory.subsections.length} Subsections Available)
          </span>
          <div className="flex flex-wrap gap-2">
            {currentCategory.subsections.map((p) => {
              const isSelected = selectedSlug === p.slug;
              return (
                <button
                  key={p.slug}
                  onClick={() => setSelectedSlug(p.slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-cyan-50 border-cyan-600 text-cyan-900 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {p.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Main Workspace Area: Content Form or Live Preview */}
      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
          <div className="flex items-center gap-3 text-slate-500 text-sm font-semibold">
            <RefreshCw className="w-5 h-5 animate-spin text-cyan-600" />
            <span>Loading pre-designed form fields for {currentPageHierarchy.title}…</span>
          </div>
        </div>
      ) : activeTab === 'preview' ? (
        <div className="space-y-4">
          {/* Responsive Viewport Controls */}
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span>Preview Mode:</span>
              <span className="text-cyan-700 font-bold">{templateMeta.name}</span>
            </div>
            <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200 text-xs">
              <button
                onClick={() => setPreviewViewport('desktop')}
                className={`p-1.5 rounded flex items-center gap-1 ${
                  previewViewport === 'desktop' ? 'bg-white text-cyan-700 font-bold shadow-2xs' : 'text-slate-600'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setPreviewViewport('tablet')}
                className={`p-1.5 rounded flex items-center gap-1 ${
                  previewViewport === 'tablet' ? 'bg-white text-cyan-700 font-bold shadow-2xs' : 'text-slate-600'
                }`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
                <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                onClick={() => setPreviewViewport('mobile')}
                className={`p-1.5 rounded flex items-center gap-1 ${
                  previewViewport === 'mobile' ? 'bg-white text-cyan-700 font-bold shadow-2xs' : 'text-slate-600'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          </div>
          {renderPreview()}
        </div>
      ) : (
        /* Form Content Editor */
        <div className="space-y-8">
          {/* Section A: Hero & Primary Information Form */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">1. Hero & Core Information</h2>
                <p className="text-xs text-slate-500">The headline, badge, and introductory narrative displayed at the top of the page</p>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">
                Template: {templateType}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Page Title / Main Headline <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={pageData?.heading || pageData?.title || ''}
                  onChange={(e) =>
                    setPageData((prev) => (prev ? { ...prev, heading: e.target.value, title: e.target.value } : null))
                  }
                  placeholder="e.g. Our Institutional Mission"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-cyan-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Badge Label / Category Tag
                </label>
                <input
                  type="text"
                  value={pageData?.heroBadge || ''}
                  onChange={(e) =>
                    setPageData((prev) => (prev ? { ...prev, heroBadge: e.target.value } : null))
                  }
                  placeholder="e.g. Strategic 2030 Horizon"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-cyan-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Subheading / Statement Summary
              </label>
              <input
                type="text"
                value={pageData?.subheading || ''}
                onChange={(e) =>
                  setPageData((prev) => (prev ? { ...prev, subheading: e.target.value } : null))
                }
                placeholder="Brief sentence that introduces the main topic..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-cyan-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Official Narrative / Statement Body
              </label>
              <textarea
                rows={4}
                value={pageData?.description || pageData?.summary || ''}
                onChange={(e) =>
                  setPageData((prev) => (prev ? { ...prev, description: e.target.value, summary: e.target.value } : null))
                }
                placeholder="Enter the official text for this section. No code, HTML, or JSON required."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 leading-relaxed focus:outline-hidden focus:border-cyan-600"
              />
            </div>

            {/* Optional Hero Image / Video Embed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Hero Image URL (Optional)</span>
                  <span className="text-[11px] text-slate-400">Direct link or upload</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={String(pageData?.imageUrl || '')}
                    onChange={(e) =>
                      setPageData((prev) => (prev ? { ...prev, imageUrl: e.target.value } : null))
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file, (url) => {
                            setPageData((prev) => (prev ? { ...prev, imageUrl: url } : null));
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Featured Video Embed URL (Optional)
                </label>
                <input
                  type="text"
                  value={String(pageData?.videoUrl || '')}
                  onChange={(e) =>
                    setPageData((prev) => (prev ? { ...prev, videoUrl: e.target.value } : null))
                  }
                  placeholder="https://www.youtube-nocookie.com/embed/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                />
              </div>
            </div>

            {/* Primary Action Button (CTA) */}
            <div className="pt-4 border-t border-slate-100">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Call to Action Button (Optional)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Button Label</label>
                  <input
                    type="text"
                    value={pageData?.cta?.label || ''}
                    onChange={(e) =>
                      setPageData((prev) =>
                        prev
                          ? {
                              ...prev,
                              cta: {
                                label: e.target.value,
                                url: prev.cta?.url || '/contact',
                                variant: prev.cta?.variant || 'primary'
                              }
                            }
                          : null
                      )
                    }
                    placeholder="e.g. Apply Now / Join Programme"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Destination URL / Route</label>
                  <input
                    type="text"
                    value={pageData?.cta?.url || ''}
                    onChange={(e) =>
                      setPageData((prev) =>
                        prev
                          ? {
                              ...prev,
                              cta: {
                                label: prev.cta?.label || 'Action',
                                url: e.target.value,
                                variant: prev.cta?.variant || 'primary'
                              }
                            }
                          : null
                      )
                    }
                    placeholder="e.g. /programs/digital-skills"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Tailored Specialized Fields Based on Pre-Designed Template */}

          {/* B1: Vision & Mission Specialized Statements */}
          {templateType === 'vision_mission' && (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-cyan-600" />
                  <span>2. Strategic Statement & Supporting Pillars</span>
                </h2>
                <p className="text-xs text-slate-500">Provide the central institutional declaration and strategic commitments</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Core Statement Declaration
                </label>
                <textarea
                  rows={3}
                  value={(pageData as any)?.visionStatement || pageData?.description || ''}
                  onChange={(e) =>
                    setPageData((prev) => (prev ? { ...prev, visionStatement: e.target.value } : null))
                  }
                  placeholder="e.g. By 2030, Somalia will stand as a resilient, self-reliant knowledge economy..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-cyan-900 leading-relaxed bg-cyan-50/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Supporting Context & Long-Term Objectives
                </label>
                <textarea
                  rows={3}
                  value={(pageData as any)?.supportingDescription || ''}
                  onChange={(e) =>
                    setPageData((prev) => (prev ? { ...prev, supportingDescription: e.target.value } : null))
                  }
                  placeholder="Describe the regional, economic, and institutional context underpinning this commitment..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-700 leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* B2: Team Directory Template Fields */}
          {templateType === 'team_directory' && (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-600" />
                    <span>2. Team & Leadership Roster</span>
                  </h2>
                  <p className="text-xs text-slate-500">Manage leadership profiles, station assignments, bios, and portrait photos</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const currentTeam = pageData?.team || [];
                    const newMember = {
                      name: 'New Team Member',
                      role: 'Innovation Specialist',
                      station: 'Mogadishu HQ',
                      bio: 'Contributing to youth digital empowerment and incubation cohorts.',
                      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
                      email: 'team@sihub.so'
                    };
                    setPageData((prev) => (prev ? { ...prev, team: [...currentTeam, newMember] } : null));
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 text-cyan-800 text-xs font-bold border border-cyan-200 hover:bg-cyan-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              </div>

              <div className="space-y-4">
                {((pageData?.team as any[]) || []).map((member, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Member #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(pageData?.team || [])];
                          updated.splice(idx, 1);
                          setPageData((prev) => (prev ? { ...prev, team: updated } : null));
                        }}
                        className="text-xs text-rose-600 hover:text-rose-800 inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={member.name || ''}
                          onChange={(e) => {
                            const updated = [...(pageData?.team || [])];
                            updated[idx] = { ...updated[idx], name: e.target.value };
                            setPageData((prev) => (prev ? { ...prev, team: updated } : null));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Role / Position</label>
                        <input
                          type="text"
                          value={member.role || ''}
                          onChange={(e) => {
                            const updated = [...(pageData?.team || [])];
                            updated[idx] = { ...updated[idx], role: e.target.value };
                            setPageData((prev) => (prev ? { ...prev, team: updated } : null));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Regional Station</label>
                        <select
                          value={member.station || 'Mogadishu HQ'}
                          onChange={(e) => {
                            const updated = [...(pageData?.team || [])];
                            updated[idx] = { ...updated[idx], station: e.target.value };
                            setPageData((prev) => (prev ? { ...prev, team: updated } : null));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        >
                          <option>Mogadishu HQ</option>
                          <option>Hargeisa Hub</option>
                          <option>Garowe Hub</option>
                          <option>Kismayo Hub</option>
                          <option>Diaspora Advisory</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Career Biography</label>
                      <input
                        type="text"
                        value={member.bio || ''}
                        onChange={(e) => {
                          const updated = [...(pageData?.team || [])];
                          updated[idx] = { ...updated[idx], bio: e.target.value };
                          setPageData((prev) => (prev ? { ...prev, team: updated } : null));
                        }}
                        placeholder="Brief summary of experience..."
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Photo Image URL</label>
                        <input
                          type="text"
                          value={member.image || ''}
                          onChange={(e) => {
                            const updated = [...(pageData?.team || [])];
                            updated[idx] = { ...updated[idx], image: e.target.value };
                            setPageData((prev) => (prev ? { ...prev, team: updated } : null));
                          }}
                          placeholder="https://... or upload below"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono bg-white"
                        />
                      </div>
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold self-end">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (url) => {
                                const updated = [...(pageData?.team || [])];
                                updated[idx] = { ...updated[idx], image: url };
                                setPageData((prev) => (prev ? { ...prev, team: updated } : null));
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* B3: Programme Track Template Fields */}
          {templateType === 'programme_track' && (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                  <span>2. Programme Cohort & Track Details</span>
                </h2>
                <p className="text-xs text-slate-500">Configure curriculum streams, duration, target beneficiaries, and deliverables</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cohort Duration</label>
                  <input
                    type="text"
                    value={(pageData as any)?.cohortDuration || '12 Weeks (Intensive)'}
                    onChange={(e) =>
                      setPageData((prev) => (prev ? { ...prev, cohortDuration: e.target.value } : null))
                    }
                    placeholder="e.g. 12 Weeks"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cohort Capacity</label>
                  <input
                    type="text"
                    value={(pageData as any)?.classSize || '35 Scholars / Hub'}
                    onChange={(e) =>
                      setPageData((prev) => (prev ? { ...prev, classSize: e.target.value } : null))
                    }
                    placeholder="e.g. 40 Seats"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Application Deadline</label>
                  <input
                    type="text"
                    value={(pageData as any)?.deadline || 'Rolling Admissions'}
                    onChange={(e) =>
                      setPageData((prev) => (prev ? { ...prev, deadline: e.target.value } : null))
                    }
                    placeholder="e.g. June 15, 2026"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Beneficiaries & Eligibility</label>
                <textarea
                  rows={2}
                  value={(pageData as any)?.beneficiaryScope || 'Open to Somali university scholars, emerging tech founders, and female innovators aged 18-35 across all regions.'}
                  onChange={(e) =>
                    setPageData((prev) => (prev ? { ...prev, beneficiaryScope: e.target.value } : null))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Key Curriculum Modules & Deliverables</label>
                <textarea
                  rows={3}
                  value={(pageData as any)?.curriculumOverview || 'Hands-on lab training, project prototyping, cloud architecture, and capstone presentation day.'}
                  onChange={(e) =>
                    setPageData((prev) => (prev ? { ...prev, curriculumOverview: e.target.value } : null))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* B4: Startup Accelerator & Seed Funding Fields */}
          {templateType === 'startup_accelerator' && (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-emerald-600" />
                  <span>2. Accelerator Terms & Seed Grant Structure</span>
                </h2>
                <p className="text-xs text-slate-500">Define grant allocation amounts, equity structure, and cohort timeline</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Seed Grant Amount</label>
                  <input
                    type="text"
                    value={(pageData as any)?.seedGrantAmount || '$25,000'}
                    onChange={(e) =>
                      setPageData((prev) => (prev ? { ...prev, seedGrantAmount: e.target.value } : null))
                    }
                    placeholder="e.g. $25,000"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-emerald-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Grant Terms / Equity</label>
                  <input
                    type="text"
                    value={(pageData as any)?.grantTerms || 'Non-Dilutive / 0% Equity'}
                    onChange={(e) =>
                      setPageData((prev) => (prev ? { ...prev, grantTerms: e.target.value } : null))
                    }
                    placeholder="e.g. Non-dilutive"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Incubation Duration</label>
                  <input
                    type="text"
                    value={(pageData as any)?.incubationDuration || '6 Months (Milestone-based)'}
                    onChange={(e) =>
                      setPageData((prev) => (prev ? { ...prev, incubationDuration: e.target.value } : null))
                    }
                    placeholder="e.g. 6 Months"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* B5: Event & Conference / Summit Fields */}
          {templateType === 'event_conference' && (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-600" />
                  <span>2. Event Broadcast, Date & Location</span>
                </h2>
                <p className="text-xs text-slate-500">Configure summit dates, venue location, keynote broadcast video, and delegate passes</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Event Date & Time</label>
                  <input
                    type="text"
                    value={(pageData as any)?.eventDate || 'October 24–26, 2026'}
                    onChange={(e) =>
                      setPageData((prev) => (prev ? { ...prev, eventDate: e.target.value } : null))
                    }
                    placeholder="e.g. October 24-26, 2026"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Venue & City</label>
                  <input
                    type="text"
                    value={(pageData as any)?.venue || 'Decale Hotel & Mogadishu Hub Hall'}
                    onChange={(e) =>
                      setPageData((prev) => (prev ? { ...prev, venue: e.target.value } : null))
                    }
                    placeholder="e.g. Decale Hotel, Mogadishu"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Keynote / Broadcast Video Embed URL</label>
                <input
                  type="text"
                  value={(pageData as any)?.videoUrl || pageData?.videoUrl || 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'}
                  onChange={(e) =>
                    setPageData((prev) => (prev ? { ...prev, videoUrl: e.target.value } : null))
                  }
                  placeholder="https://www.youtube-nocookie.com/embed/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                />
              </div>
            </div>
          )}

          {/* Section C: Measurable Key Performance Indicators (KPIs) Strip */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">3. Measurable Statistics Strip (Optional)</h2>
                <p className="text-xs text-slate-500">Key metrics shown in high-emphasis cards across the page</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const currentStats = pageData?.stats || [];
                  const newStat = { value: '100+', label: 'New Metric', description: 'Audited benchmark' };
                  setPageData((prev) => (prev ? { ...prev, stats: [...currentStats, newStat] } : null));
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Metric</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(pageData?.stats || [
                { value: '5,400+', label: 'Total Upskilled', description: 'Across all cohorts' },
                { value: '148', label: 'Active Startups', description: 'Seed-funded ventures' },
                { value: '4', label: 'Regional Hubs', description: 'Nationwide network' },
                { value: '64%', label: 'Female Scholars', description: 'Gender inclusion' },
              ]).map((stat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Card #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...(pageData?.stats || [])];
                        updated.splice(idx, 1);
                        setPageData((prev) => (prev ? { ...prev, stats: updated } : null));
                      }}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...(pageData?.stats || [])];
                        updated[idx] = { ...updated[idx], value: e.target.value };
                        setPageData((prev) => (prev ? { ...prev, stats: updated } : null));
                      }}
                      placeholder="e.g. 5,400+"
                      className="w-full px-2 py-1 rounded border border-slate-300 text-sm font-black text-cyan-800 bg-white"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...(pageData?.stats || [])];
                        updated[idx] = { ...updated[idx], label: e.target.value };
                        setPageData((prev) => (prev ? { ...prev, stats: updated } : null));
                      }}
                      placeholder="Label e.g. Graduates"
                      className="w-full px-2 py-1 rounded border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section D: Dynamic Page Sections & Component Builder (15 Visual Types) */}
          <VisualDynamicSectionBuilder
            sections={pageData?.sections || []}
            onChange={(updatedSections) =>
              setPageData((prev) => (prev ? { ...prev, sections: updatedSections } : null))
            }
            pageTitle={currentPageHierarchy.title}
          />

          {/* Section E: Direct Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-900 text-white rounded-2xl shadow-xl">
            <div>
              <h3 className="text-base font-bold text-white">Save Changes for {currentPageHierarchy.title}</h3>
              <p className="text-xs text-slate-400">Edits are applied directly to the ready-made visual template for this page.</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => handleSave(false, 'draft')}
                disabled={saving || loading}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700"
              >
                Save as Draft
              </button>
              <button
                onClick={() => handleSave(true, 'publish')}
                disabled={saving || loading}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md inline-flex items-center gap-2"
              >
                {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>Publish to Public Website</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
