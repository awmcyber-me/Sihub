import test from 'node:test';
import assert from 'node:assert/strict';
import { validateDynamicPageSections } from '../server/cmsSections.ts';

const validSection = {
  sections: [{
    id: 'hero-extra',
    name: 'Research highlights',
    description: 'Current projects',
    placement: 'bottom',
    order: 0,
    visible: true,
    archived: false,
    layout: { desktopColumns: 3, tabletColumns: 2, mobileColumns: 1, backgroundColor: '#ffffff', textColor: '#172033', spacing: 'normal' },
    blocks: [
      { id: 'title', type: 'heading', text: 'New work', level: 2 },
      { id: 'rich', type: 'richText', text: 'Read **verified** information.' },
      { id: 'media', type: 'image', src: '/api/media/asset_123/public', alt: 'Lab team', aspectRatio: '16/9' },
      { id: 'link', type: 'button', label: 'Programs', url: '/programs' }
    ]
  }]
};

test('valid CMS page sections accept structured blocks, responsive layouts and uploaded media paths', () => {
  assert.equal(validateDynamicPageSections(validSection), null);
});

test('CMS page sections reject unsafe URLs, unsupported colors, and malformed block data', () => {
  assert.ok(validateDynamicPageSections({ sections: [{ ...validSection.sections[0], blocks: [{ id: 'x', type: 'image', src: 'javascript:alert(1)', alt: '' }] }] }));
  assert.ok(validateDynamicPageSections({ sections: [{ ...validSection.sections[0], layout: { ...validSection.sections[0].layout, backgroundColor: 'red' } }] }));
});
