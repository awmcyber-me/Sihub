/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Page Templates & Schema Definitions
 * Maps the 34 official website pages to dedicated,
 * professionally designed page templates with tailored content schemas.
 */

export type PageTemplateType =
  | 'home_flagship'
  | 'vision_mission'
  | 'team_directory'
  | 'institutional_story'
  | 'programme_track'
  | 'startup_accelerator'
  | 'startup_showcase'
  | 'institute_academy'
  | 'credential_verification'
  | 'event_conference'
  | 'news_media'
  | 'impact_report'
  | 'partnership_portal';

export interface PageTemplateMeta {
  type: PageTemplateType;
  name: string;
  category: string;
  description: string;
}

/**
 * Maps any page slug to its dedicated, pre-designed page template
 */
export function getTemplateTypeForSlug(slug: string): PageTemplateType {
  switch (slug) {
    case 'home':
      return 'home_flagship';

    case 'who-we-are':
      return 'institutional_story';
    case 'vision':
    case 'mission':
      return 'vision_mission';
    case 'our-team':
      return 'team_directory';

    case 'digital-skills':
    case 'youth-empowerment':
    case 'social-innovation':
    case 'women-innovation':
    case 'inclusive-digital':
    case 'green-sustainability':
    case 'youth-peace':
    case 'community-dev':
      return 'programme_track';

    case 'incubation':
    case 'startup-support':
      return 'startup_accelerator';
    case 'entrepreneurs':
    case 'youth-mentorship':
      return 'startup_showcase';

    case 'digital-skills-academy':
    case 'professional-training':
    case 'ai-emerging':
    case 'research-innovation':
      return 'institute_academy';
    case 'certification':
      return 'credential_verification';

    case 'sitalks':
    case 'summit':
    case 'expo':
      return 'event_conference';
    case 'news-stories':
    case 'media-gallery':
      return 'news_media';

    case 'success-stories':
    case 'projects-achievements':
    case 'annual-reports':
    case 'community-impact':
      return 'impact_report';

    case 'become-partner':
    case 'donors-supporters':
    case 'collaboration-opportunities':
      return 'partnership_portal';

    default:
      return 'programme_track';
  }
}

export function getTemplateMetadata(type: PageTemplateType): PageTemplateMeta {
  switch (type) {
    case 'home_flagship':
      return {
        type,
        name: 'Flagship Home Template',
        category: 'A. Home',
        description: 'Bilingual hero, ecosystem impact counters, featured innovation tracks, and alliance ticker.'
      };
    case 'institutional_story':
      return {
        type,
        name: 'Institutional Story & Mandate',
        category: 'B. About SiHub',
        description: 'Founding history, 4 regional hub stations, governance values, and ecosystem timeline.'
      };
    case 'vision_mission':
      return {
        type,
        name: 'Vision & Mission Statement',
        category: 'B. About SiHub',
        description: 'High-emphasis statement card, executive quote, 2030 strategic horizons, and measurable targets.'
      };
    case 'team_directory':
      return {
        type,
        name: 'Leadership & Team Directory',
        category: 'B. About SiHub',
        description: 'Executive portraits, departmental station tags, career biographies, and contact channels.'
      };
    case 'programme_track':
      return {
        type,
        name: 'Programme Track & Cohort',
        category: 'C. Our Programmes',
        description: 'Curriculum tracks, cohort duration, target beneficiaries, eligibility, and direct application CTA.'
      };
    case 'startup_accelerator':
      return {
        type,
        name: 'Startup Accelerator & Incubation',
        category: 'D. Entrepreneurship & Startups',
        description: '4-stage venture roadmap, $25k seed grant terms, founder perks sandbox, and pitch application.'
      };
    case 'startup_showcase':
      return {
        type,
        name: 'Entrepreneur & Mentor Network',
        category: 'D. Entrepreneurship & Startups',
        description: 'Alumni startup profiles, sector filter tabs, mentor coaching directory, and jobs created.'
      };
    case 'institute_academy':
      return {
        type,
        name: 'Technical Academy & Curriculum',
        category: 'E. SiHub Institute',
        description: 'Syllabus modules breakdown, tech stack badges, tuition/scholarships info, and enrollment CTA.'
      };
    case 'credential_verification':
      return {
        type,
        name: 'Credential & Certificate Verification',
        category: 'E. SiHub Institute',
        description: 'Interactive certificate ID search, live digital badge preview, and accreditation standards.'
      };
    case 'event_conference':
      return {
        type,
        name: 'Summit, Keynote & Conference',
        category: 'F. Events & Media',
        description: 'Date/venue badge, keynote speakers lineup, interactive session agenda, and video broadcast player.'
      };
    case 'news_media':
      return {
        type,
        name: 'Newsroom & Media Archive',
        category: 'F. Events & Media',
        description: 'Press release articles feed, photo gallery lightbox, and downloadable official media kit.'
      };
    case 'impact_report':
      return {
        type,
        name: 'Ecosystem Impact & Annual Reports',
        category: 'G. Our Impact',
        description: 'Audited quantitative metrics, annual reports PDF download cards, and beneficiary case studies.'
      };
    case 'partnership_portal':
      return {
        type,
        name: 'Strategic Alliance & Donor Portal',
        category: 'H. Partnerships',
        description: 'Partnership modalities, active RFPs & challenge calls, donor recognition logos, and inquiry CTA.'
      };
  }
}
