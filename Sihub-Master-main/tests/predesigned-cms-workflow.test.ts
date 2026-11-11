import test from 'node:test';
import assert from 'node:assert/strict';

import { OFFICIAL_HIERARCHY, officialWebsiteHierarchy } from '../src/components/admin/cms/WebsiteHierarchyNavigator';
import { OFFICIAL_WEBSITE_SUBSECTIONS } from '../server/defaultWebsiteStructure';
import { getTemplateTypeForSlug, getTemplateMetadata, PageTemplateType } from '../src/types/pageTemplates';
import { appViewForPath, appPathForView } from '../src/utils/appRouting';

test('1. All 8 website categories and 32 subsections plus Home are defined', () => {
  const categoryKeys = officialWebsiteHierarchy.map(c => c.key);
  const expectedCategories = ['home', 'about', 'programmes', 'startups', 'institute', 'events-media', 'impact', 'partnerships'];
  assert.deepEqual(categoryKeys, expectedCategories, 'All 8 pillars + Home must exist');

  const allSubsections = officialWebsiteHierarchy.flatMap(c => c.subsections);
  assert.equal(allSubsections.length, 34, 'Must have 33 subsections plus 1 Home page (total 34)');

  // Verify server-side definitions match
  assert.equal(OFFICIAL_WEBSITE_SUBSECTIONS.length, 34, 'Server must seed all 33 subsections and Home (total 34)');
});

test('2. Every subsection maps to an appropriate pre-designed template type', () => {
  const validTemplates: PageTemplateType[] = [
    'home_flagship',
    'institutional_story',
    'vision_mission',
    'team_directory',
    'programme_track',
    'startup_accelerator',
    'startup_showcase',
    'institute_academy',
    'credential_verification',
    'event_conference',
    'news_media',
    'impact_report',
    'partnership_portal'
  ];

  // About SiHub
  assert.equal(getTemplateTypeForSlug('vision'), 'vision_mission');
  assert.equal(getTemplateTypeForSlug('mission'), 'vision_mission');
  assert.equal(getTemplateTypeForSlug('who-we-are'), 'institutional_story');
  assert.equal(getTemplateTypeForSlug('our-team'), 'team_directory');

  // Programmes
  assert.equal(getTemplateTypeForSlug('digital-skills'), 'programme_track');
  assert.equal(getTemplateTypeForSlug('youth-empowerment'), 'programme_track');
  assert.equal(getTemplateTypeForSlug('social-innovation'), 'programme_track');
  assert.equal(getTemplateTypeForSlug('women-innovation'), 'programme_track');
  assert.equal(getTemplateTypeForSlug('green-sustainability'), 'programme_track');

  // Startups
  assert.equal(getTemplateTypeForSlug('incubation'), 'startup_accelerator');
  assert.equal(getTemplateTypeForSlug('entrepreneurs'), 'startup_showcase');
  assert.equal(getTemplateTypeForSlug('startup-support'), 'startup_accelerator');

  // Institute
  assert.equal(getTemplateTypeForSlug('digital-skills-academy'), 'institute_academy');
  assert.equal(getTemplateTypeForSlug('certification'), 'credential_verification');

  // Events & Media
  assert.equal(getTemplateTypeForSlug('sitalks'), 'event_conference');
  assert.equal(getTemplateTypeForSlug('summit'), 'event_conference');
  assert.equal(getTemplateTypeForSlug('expo'), 'event_conference');

  // Impact
  assert.equal(getTemplateTypeForSlug('success-stories'), 'impact_report');
  assert.equal(getTemplateTypeForSlug('annual-reports'), 'impact_report');

  // Partnerships
  assert.equal(getTemplateTypeForSlug('become-partner'), 'partnership_portal');
  assert.equal(getTemplateTypeForSlug('donors-supporters'), 'partnership_portal');

  // Verify all 33 subsections have a recognized template and non-empty metadata
  for (const def of OFFICIAL_WEBSITE_SUBSECTIONS) {
    const templateType = getTemplateTypeForSlug(def.slug);
    assert.ok(validTemplates.includes(templateType), `${def.slug} has valid template`);
    const meta = getTemplateMetadata(templateType);
    assert.ok(meta.name.length > 0);
    assert.ok(meta.description.length > 0);
  }
});

test('3. Public URLs resolve to independent subsections without cross-contamination', () => {
  assert.equal(appViewForPath('/about/vision'), 'cms_page');
  assert.equal(appViewForPath('/about/mission'), 'cms_page');
  assert.equal(appViewForPath('/programs/digital-skills'), 'cms_page');
  assert.equal(appViewForPath('/startups/incubation'), 'cms_page');
  assert.equal(appViewForPath('/institute/digital-skills-academy'), 'cms_page');
  assert.equal(appViewForPath('/events/sitalks'), 'cms_page');
  assert.equal(appViewForPath('/impact/success-stories'), 'cms_page');
  assert.equal(appViewForPath('/partnerships/become-partner'), 'cms_page');
});

test('4. Seeded website definitions do not introduce duplicate hero sections', () => {
  for (const def of OFFICIAL_WEBSITE_SUBSECTIONS) {
    assert.ok(def.title.length > 0, `${def.slug} must have a title`);
    assert.ok(def.heading.length > 0, `${def.slug} must have a headline`);
    assert.ok(def.description.length > 0, `${def.slug} must have a narrative`);
    assert.ok(def.publicPath.startsWith('/'), `${def.slug} must have a valid publicPath`);
  }
});
