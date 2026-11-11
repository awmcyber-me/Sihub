/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Navigation Manager Area
 * Comprehensive management of primary navigation categories, nested subsections,
 * reordering, custom routing, and direct live publishing to the public Header.
 */

import React, { useState } from 'react';
import {
  Compass,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Layers,
  Globe,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { apiPut, ApiError } from '../../../services/apiClient';

export interface NavSubItem {
  key: string;
  label: string;
  view?: string;
  url?: string;
  anchor?: string;
  desc?: string;
  query?: Record<string, string>;
  subItems?: NavSubItem[];
}

export interface NavCategory {
  key: string;
  label: string;
  view?: string;
  url?: string;
  subItems?: NavSubItem[];
}

interface NavigationManagerAreaProps {
  navItems: NavCategory[];
  setNavItems: React.Dispatch<React.SetStateAction<NavCategory[]>>;
  availablePageSlugs: string[];
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const NavigationManagerArea: React.FC<NavigationManagerAreaProps> = ({
  navItems,
  setNavItems,
  availablePageSlugs,
  addToast
}) => {
  const [newTopLabel, setNewTopLabel] = useState('');
  const [newTopUrl, setNewTopUrl] = useState('');
  const [selectedParentKey, setSelectedParentKey] = useState<string>(navItems[0]?.key || 'programmes');
  const [selectedSubParentKey, setSelectedSubParentKey] = useState<string>('none');
  const [newSubLabel, setNewSubLabel] = useState('');
  const [newSubDesc, setNewSubDesc] = useState('');
  const [newSubRouteType, setNewSubRouteType] = useState<'standard' | 'page' | 'external'>('standard');
  const [newSubView, setNewSubView] = useState('programs');
  const [newSubPageSlug, setNewSubPageSlug] = useState(availablePageSlugs[0] || 'about');
  const [newSubExternalUrl, setNewSubExternalUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({
    about: true,
    programmes: true,
    startups: true,
    institute: true,
    'events-media': true,
    impact: true,
    partnerships: true
  });

  const toggleExpand = (catKey: string) => {
    setExpandedCats(prev => ({ ...prev, [catKey]: !prev[catKey] }));
  };

  const handleAddTopCategory = () => {
    if (!newTopLabel.trim()) {
      addToast('error', 'Validation Error', 'Please enter a category title.');
      return;
    }
    const key = newTopLabel.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (navItems.some(c => c.key === key)) {
      addToast('error', 'Duplicate Key', `A category with key "${key}" already exists.`);
      return;
    }
    const newCat: NavCategory = {
      key,
      label: newTopLabel.trim(),
      url: newTopUrl.trim() || undefined,
      view: newTopUrl.trim() ? undefined : 'home',
      subItems: []
    };
    setNavItems(prev => [...prev, newCat]);
    setNewTopLabel('');
    setNewTopUrl('');
    addToast('success', 'Category Added', `Added "${newCat.label}" to navigation tree.`);
  };

  const handleAddSubsection = () => {
    if (!newSubLabel.trim()) {
      addToast('error', 'Validation Error', 'Please enter a title.');
      return;
    }
    const subKey = newSubLabel.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let targetView: string | undefined = undefined;
    let targetUrl: string | undefined = undefined;

    if (newSubRouteType === 'standard') {
      targetView = newSubView;
      targetUrl = `/${newSubView}`;
    } else if (newSubRouteType === 'page') {
      targetView = 'cms_page';
      targetUrl = `/pages/${newSubPageSlug}`;
    } else {
      targetUrl = newSubExternalUrl.trim() || '#';
    }

    const newSub: NavSubItem = {
      key: subKey,
      label: newSubLabel.trim(),
      desc: newSubDesc.trim() || undefined,
      view: targetView,
      url: targetUrl
    };

    if (selectedSubParentKey !== 'none') {
      setNavItems(prev => prev.map(c => {
        if (c.key !== selectedParentKey || !c.subItems) return c;
        return {
          ...c,
          subItems: c.subItems.map(s => {
            if (s.key !== selectedSubParentKey) return s;
            return {
              ...s,
              subItems: [...(s.subItems || []), newSub]
            };
          })
        };
      }));
      addToast('success', 'Child Link Added', `Added "${newSub.label}" under "${selectedSubParentKey}".`);
    } else {
      setNavItems(prev => prev.map(c => {
        if (c.key === selectedParentKey) {
          return {
            ...c,
            subItems: [...(c.subItems || []), newSub]
          };
        }
        return c;
      }));
      addToast('success', 'Subsection Added', `Added "${newSub.label}" under "${selectedParentKey}".`);
    }

    setNewSubLabel('');
    setNewSubDesc('');
    setNewSubExternalUrl('');
  };

  const handleMoveCategory = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= navItems.length) return;
    setNavItems(prev => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.splice(targetIndex, 0, item);
      return copy;
    });
  };

  const handleDeleteCategory = (catKey: string) => {
    if (!window.confirm(`Are you sure you want to delete category "${catKey}" and all its sub-items?`)) return;
    setNavItems(prev => prev.filter(c => c.key !== catKey));
    addToast('info', 'Category Removed', `Category "${catKey}" was deleted.`);
  };

  const handleMoveSubItem = (catKey: string, subIndex: number, direction: -1 | 1) => {
    setNavItems(prev => prev.map(c => {
      if (c.key !== catKey || !c.subItems) return c;
      const targetIndex = subIndex + direction;
      if (targetIndex < 0 || targetIndex >= c.subItems.length) return c;
      const copy = [...c.subItems];
      const [sub] = copy.splice(subIndex, 1);
      copy.splice(targetIndex, 0, sub);
      return { ...c, subItems: copy };
    }));
  };

  const handleDeleteSubItem = (catKey: string, subKey: string) => {
    setNavItems(prev => prev.map(c => {
      if (c.key !== catKey || !c.subItems) return c;
      return {
        ...c,
        subItems: c.subItems.filter(s => s.key !== subKey)
      };
    }));
    addToast('info', 'Subsection Removed', `Deleted subsection "${subKey}".`);
  };

  const handleMoveChildItem = (catKey: string, subKey: string, childIndex: number, direction: -1 | 1) => {
    setNavItems(prev => prev.map(c => {
      if (c.key !== catKey || !c.subItems) return c;
      return {
        ...c,
        subItems: c.subItems.map(s => {
          if (s.key !== subKey || !s.subItems) return s;
          const targetIndex = childIndex + direction;
          if (targetIndex < 0 || targetIndex >= s.subItems.length) return s;
          const copy = [...s.subItems];
          const [child] = copy.splice(childIndex, 1);
          copy.splice(targetIndex, 0, child);
          return { ...s, subItems: copy };
        })
      };
    }));
  };

  const handleDeleteChildItem = (catKey: string, subKey: string, childKey: string) => {
    setNavItems(prev => prev.map(c => {
      if (c.key !== catKey || !c.subItems) return c;
      return {
        ...c,
        subItems: c.subItems.map(s => {
          if (s.key !== subKey || !s.subItems) return s;
          return {
            ...s,
            subItems: s.subItems.filter(ch => ch.key !== childKey)
          };
        })
      };
    }));
    addToast('info', 'Child Link Removed', `Deleted child link "${childKey}".`);
  };

  const handleSaveNavigationToLive = async () => {
    setSaving(true);
    try {
      await apiPut('/api/cms/navigation', { categories: navItems });
      window.dispatchEvent(new CustomEvent('sihub-cms-update'));
      addToast('success', 'Navigation Published Live', 'The public website header has been updated with the new navigation hierarchy.');
    } catch (reason) {
      addToast('error', 'Publish Failed', reason instanceof ApiError ? reason.message : 'Unable to persist navigation changes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Save Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 rounded-2xl bg-slate-950 border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            Website Navigation & Taxonomy Manager
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Build and reorder main categories and nested subsections. When ready, click "Save Navigation to Live Site" to immediately update the public header.
          </p>
        </div>

        <button
          onClick={() => void handleSaveNavigationToLive()}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg transition-all hover:scale-102"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Publishing Navigation…' : 'Save Navigation to Live Site'}</span>
        </button>
      </div>

      {/* Add Controls in 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Box 1: Add New Top-Level Category */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
            + Add New Top-Level Category
          </span>
          <div className="space-y-2">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Category Title</label>
              <input
                placeholder="e.g. Climate & Energy Lab"
                value={newTopLabel}
                onChange={e => setNewTopLabel(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Direct URL / Path (Optional if using dropdown)</label>
              <input
                placeholder="e.g. /climate or /pages/climate-action"
                value={newTopUrl}
                onChange={e => setNewTopUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
              />
            </div>
            <button
              onClick={handleAddTopCategory}
              className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
            >
              Add Top Category
            </button>
          </div>
        </div>

        {/* Box 2: Add Nested Subsection */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            + Add Nested Subsection to Category
          </span>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Parent Category (Level 1)</label>
                <select
                  value={selectedParentKey}
                  onChange={e => {
                    setSelectedParentKey(e.target.value);
                    setSelectedSubParentKey('none');
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                >
                  {navItems.map(cat => (
                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Hierarchy Placement</label>
                <select
                  value={selectedSubParentKey}
                  onChange={e => setSelectedSubParentKey(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                >
                  <option value="none">Direct Subsection (Level 2)</option>
                  {navItems.find(c => c.key === selectedParentKey)?.subItems?.map(s => (
                    <option key={s.key} value={s.key}>↳ Inside "{s.label}" (Level 3)</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">
                {selectedSubParentKey === 'none' ? 'Subsection Title (Level 2)' : 'Child Link Title (Level 3)'}
              </label>
              <input
                placeholder={selectedSubParentKey === 'none' ? "e.g. Agri-Food Accelerator" : "e.g. Incubation Cohort 2026"}
                value={newSubLabel}
                onChange={e => setNewSubLabel(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Destination Target</label>
                <select
                  value={newSubRouteType}
                  onChange={e => setNewSubRouteType(e.target.value as never)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                >
                  <option value="standard">Standard Public Section</option>
                  <option value="page">Custom CMS Page (/pages/*)</option>
                  <option value="external">External / Custom URL</option>
                </select>
              </div>

              <div>
                {newSubRouteType === 'standard' && (
                  <>
                    <label className="text-[10px] text-slate-400 block mb-1">Standard Section</label>
                    <select
                      value={newSubView}
                      onChange={e => setNewSubView(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                    >
                      <option value="programs">Our Programmes (/programs)</option>
                      <option value="courses">SiHub Institute (/institute)</option>
                      <option value="startups">Entrepreneurship & Startups (/entrepreneurship)</option>
                      <option value="innovation">Innovation Lab (/innovation)</option>
                      <option value="events">Events & Media (/events)</option>
                      <option value="impact">Our Impact (/impact)</option>
                      <option value="partnerships">Partnerships (/partnerships)</option>
                      <option value="opportunities">Grants & Jobs (/opportunities)</option>
                      <option value="mentorship">Mentorship (/mentorship)</option>
                      <option value="about">About SiHub (/about)</option>
                      <option value="news">News & Stories (/news)</option>
                      <option value="contact">Contact (/contact)</option>
                    </select>
                  </>
                )}

                {newSubRouteType === 'page' && (
                  <>
                    <label className="text-[10px] text-slate-400 block mb-1">Select CMS Page</label>
                    <select
                      value={newSubPageSlug}
                      onChange={e => setNewSubPageSlug(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                    >
                      {availablePageSlugs.map(slug => (
                        <option key={slug} value={slug}>/pages/{slug}</option>
                      ))}
                    </select>
                  </>
                )}

                {newSubRouteType === 'external' && (
                  <>
                    <label className="text-[10px] text-slate-400 block mb-1">Full URL</label>
                    <input
                      placeholder="https://..."
                      value={newSubExternalUrl}
                      onChange={e => setNewSubExternalUrl(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Description / Subtitle (Shown in mega-menu)</label>
              <input
                placeholder="Brief 1-sentence description"
                value={newSubDesc}
                onChange={e => setNewSubDesc(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
              />
            </div>

            <button
              onClick={handleAddSubsection}
              className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
            >
              Add Subsection
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Hierarchy Tree */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Navigation Tree ({navItems.length} Categories)
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Click arrows to reorder • Changes apply live upon saving
          </span>
        </div>

        <div className="space-y-3">
          {navItems.map((cat, catIdx) => {
            const isExpanded = expandedCats[cat.key] ?? true;
            return (
              <div key={cat.key} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      onClick={() => toggleExpand(cat.key)}
                      className="p-1 rounded text-slate-400 hover:text-white"
                    >
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                    <span className="text-xs font-mono text-cyan-400 font-bold">{catIdx + 1}.</span>
                    <h4 className="text-sm font-bold text-white truncate">{cat.label}</h4>
                    <span className="text-[10px] text-slate-500 font-mono bg-slate-900 px-2 py-0.5 rounded">
                      {cat.subItems?.length || 0} sub-items
                    </span>
                    {cat.url && (
                      <span className="text-[10px] text-cyan-400/80 font-mono hidden sm:inline">
                        target: {cat.url}
                      </span>
                    )}
                  </div>

                  {/* Category Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleMoveCategory(catIdx, -1)}
                      disabled={catIdx === 0}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-20"
                      title="Move Category Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveCategory(catIdx, 1)}
                      disabled={catIdx === navItems.length - 1}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-20"
                      title="Move Category Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.key)}
                      className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subsections under Category */}
                {isExpanded && (
                  <div className="space-y-1.5 pl-6 border-l-2 border-slate-800">
                    {cat.subItems && cat.subItems.length > 0 ? (
                      cat.subItems.map((sub, subIdx) => (
                        <div key={sub.key} className="space-y-1.5">
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                            <div className="space-y-0.5 min-w-0 pr-3">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
                                  L2
                                </span>
                                <span className="font-bold text-slate-200 truncate">{sub.label}</span>
                                {sub.url && <span className="text-[10px] text-cyan-400 font-mono truncate">{sub.url}</span>}
                              </div>
                              {sub.desc && <p className="text-[11px] text-slate-400 truncate">{sub.desc}</p>}
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => handleMoveSubItem(cat.key, subIdx, -1)}
                                disabled={subIdx === 0}
                                className="p-1 text-slate-500 hover:text-white disabled:opacity-20"
                                title="Move Subsection Up"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleMoveSubItem(cat.key, subIdx, 1)}
                                disabled={subIdx === (cat.subItems?.length || 0) - 1}
                                className="p-1 text-slate-500 hover:text-white disabled:opacity-20"
                                title="Move Subsection Down"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteSubItem(cat.key, sub.key)}
                                className="p-1 text-slate-500 hover:text-rose-400"
                                title="Delete Subsection"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Level 3 Children under Subsection */}
                          {sub.subItems && sub.subItems.length > 0 && (
                            <div className="pl-6 space-y-1 border-l-2 border-emerald-500/30 ml-4">
                              {sub.subItems.map((child, chIdx) => (
                                <div
                                  key={child.key}
                                  className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px]"
                                >
                                  <div className="space-y-0.5 min-w-0 pr-2">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-1 py-0.2 rounded border border-cyan-800/60">
                                        L3
                                      </span>
                                      <span className="font-semibold text-slate-300 truncate">{child.label}</span>
                                      {child.url && <span className="text-[9px] text-cyan-400/80 font-mono truncate">{child.url}</span>}
                                    </div>
                                    {child.desc && <p className="text-[10px] text-slate-500 truncate">{child.desc}</p>}
                                  </div>

                                  <div className="flex items-center gap-1 shrink-0">
                                    <button
                                      onClick={() => handleMoveChildItem(cat.key, sub.key, chIdx, -1)}
                                      disabled={chIdx === 0}
                                      className="p-1 text-slate-600 hover:text-white disabled:opacity-20"
                                      title="Move Child Link Up"
                                    >
                                      <ArrowUp className="w-2.5 h-2.5" />
                                    </button>
                                    <button
                                      onClick={() => handleMoveChildItem(cat.key, sub.key, chIdx, 1)}
                                      disabled={chIdx === (sub.subItems?.length || 0) - 1}
                                      className="p-1 text-slate-600 hover:text-white disabled:opacity-20"
                                      title="Move Child Link Down"
                                    >
                                      <ArrowDown className="w-2.5 h-2.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteChildItem(cat.key, sub.key, child.key)}
                                      className="p-1 text-slate-600 hover:text-rose-400"
                                      title="Delete Child Link"
                                    >
                                      <Trash2 className="w-2.5 h-2.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-500 italic block py-1">
                        Direct destination route with no nested dropdown items.
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
