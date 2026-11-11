import React from 'react';
import { useCmsPage } from '../../hooks/useCmsPage';
import { CmsSectionRenderer } from '../common/CmsSectionRenderer';
import type { CmsPageSection } from '../../types/cmsBlocks';

type DynamicPage = { sections?: CmsPageSection[] };

export const DynamicCmsSections: React.FC<{ pageSlug: string; placement: 'top' | 'bottom' }> = ({ pageSlug, placement }) => {
  const { page } = useCmsPage<DynamicPage>(pageSlug);
  const sections = (page?.sections ?? []).filter(section => section.placement === placement && section.visible && !section.archived).sort((left, right) => left.order - right.order);
  return <>{sections.map(section => <CmsSectionRenderer key={section.id} section={section} />)}</>;
};
