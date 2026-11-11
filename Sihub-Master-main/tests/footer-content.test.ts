import test from 'node:test';
import assert from 'node:assert/strict';
import { formatCopyright, isSafeMapEmbedUrl, isSafePublicUrl, normalizeFooterContent } from '../src/utils/footerContent';

test('footer normalization preserves legacy contact and navigation information', () => {
  const footer = normalizeFooterContent({
    email: 'contact@example.test',
    phone: '+252 600 000 000',
    address: 'Existing street address',
    hubs: [{ name: 'Existing hub', description: 'Existing hub detail' }],
    groups: [{ title: 'Portals', items: ['Student access'] }]
  });

  assert.deepEqual(footer.emails, [{ label: 'Email', value: 'contact@example.test' }]);
  assert.deepEqual(footer.phones, [{ label: 'Telephone', value: '+252 600 000 000' }]);
  assert.deepEqual(footer.addresses, [{ label: 'Address', value: 'Existing street address' }]);
  assert.deepEqual(footer.additionalInfo, [{ label: 'Existing hub', value: 'Existing hub detail' }]);
  assert.equal(footer.footerLinks[0].items[0].label, 'Student access');
  assert.equal(footer.footerLinks[0].items[0].url, '/learner');
});

test('copyright supports automatic, manual, and ranged years with editable text', () => {
  const footer = normalizeFooterContent({
    copyrightText: '{symbol} {year} {organizationName} - Thank you',
    copyrightSymbol: '(c)',
    copyrightOrganizationName: 'Example Organization',
    copyrightAutoYear: false,
    copyrightStartYear: '2024',
    copyrightEndYear: '2026'
  });
  assert.equal(formatCopyright(footer, 2030), '(c) 2024-2026 Example Organization - Thank you');

  footer.copyrightAutoYear = true;
  assert.equal(formatCopyright(footer, 2030), '(c) 2030 Example Organization - Thank you');
});

test('footer links and map embeds reject unsafe protocols and hosts', () => {
  assert.equal(isSafePublicUrl('/about/who-we-are'), true);
  assert.equal(isSafePublicUrl('https://example.test/contact'), true);
  assert.equal(isSafePublicUrl('javascript:alert(1)'), false);
  assert.equal(isSafePublicUrl('//example.test/path'), false);
  assert.equal(isSafeMapEmbedUrl('https://www.google.com/maps/embed?pb=test'), true);
  assert.equal(isSafeMapEmbedUrl('https://www.openstreetmap.org/export/embed.html'), true);
  assert.equal(isSafeMapEmbedUrl('https://evil.example.test/maps'), false);
});