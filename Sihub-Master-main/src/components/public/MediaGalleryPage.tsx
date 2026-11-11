/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Public Media Gallery & Visual Archives (/media)
 * High-resolution ecosystem photography, keynotes, summit archives, and press kits.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Image as ImageIcon,
  Video,
  FileText,
  Search,
  Download,
  ExternalLink,
  Maximize2,
  X,
  Play,
  Calendar,
  Layers,
  Sparkles,
  Camera,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { apiGet } from '../../services/apiClient';
import { DynamicCmsSections } from './DynamicCmsSections';

export interface PublicMediaItem {
  id: string;
  title: string;
  category: 'photography' | 'video' | 'summit' | 'press';
  type: 'image' | 'video' | 'document';
  url: string;
  thumbnailUrl?: string;
  description: string;
  date: string;
  format?: string;
  size?: string;
}

const defaultEcosystemMedia: PublicMediaItem[] = [
  {
    id: 'media-summit-2025',
    title: 'Somali Innovation Summit 2025 - Keynote Hall',
    category: 'summit',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
    description: 'Over 1,200 founders, civic leaders, and international partners gathering at Mogadishu for the flagship innovation summit.',
    date: 'December 2025',
    format: 'JPEG',
    size: '4.8 MB'
  },
  {
    id: 'media-youth-hackathon',
    title: 'SWITI: Women In Tech Hackathon Cohort',
    category: 'photography',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80',
    description: 'Somali women engineers building decentralized climate tracking and mobile fintech solutions in our main laboratory.',
    date: 'November 2025',
    format: 'JPEG',
    size: '3.6 MB'
  },
  {
    id: 'media-keynote-video',
    title: 'SiHub Ecosystem Vision & Horn of Africa Impact',
    category: 'video',
    type: 'video',
    url: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    description: 'Official documentary covering SiHub incubation hubs across Mogadishu, Garowe, and Kismayo.',
    date: 'October 2025',
    format: 'MP4 1080p',
    size: '142 MB'
  },
  {
    id: 'media-lab-prototyping',
    title: 'Hardware & IoT Prototyping Laboratory',
    category: 'photography',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    description: 'Founders testing solar-powered drip irrigation sensors and telemetry chips in the SiHub hardware fabrication bay.',
    date: 'September 2025',
    format: 'JPEG',
    size: '5.1 MB'
  },
  {
    id: 'media-brand-kit',
    title: 'Official SiHub Brand Guidelines & Press Assets',
    category: 'press',
    type: 'image',
    url: '/assets/aistudio/FB_IMG_1793630993622_edit_183670017242279_811cbd58.jpg',
    description: 'High-resolution official emblems, logos, color codes, and authorized media usage handbook.',
    date: 'January 2026',
    format: 'Vector & PNG',
    size: '12.4 MB'
  },
  {
    id: 'media-startup-pitch',
    title: 'AgriTech Demo Day Seed Stage Presentations',
    category: 'summit',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80',
    description: 'Seven accelerated startups pitching live to regional angel networks and diaspora venture syndicates.',
    date: 'August 2025',
    format: 'JPEG',
    size: '4.2 MB'
  },
  {
    id: 'media-sitalks-panel',
    title: 'SiTalks: The Future of AI & Somali Language Models',
    category: 'video',
    type: 'video',
    url: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    description: 'Roundtable dialogue on open-source Somali NLP, digital sovereignty, and ethical AI in East Africa.',
    date: 'July 2025',
    format: 'MP4 1080p',
    size: '95 MB'
  },
  {
    id: 'media-code-camp',
    title: 'NextGen Coding & Cloud Engineering Bootcamp',
    category: 'photography',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    description: 'Graduation ceremony for 140 youth certified in full-stack web and cloud systems administration.',
    date: 'June 2025',
    format: 'JPEG',
    size: '3.9 MB'
  }
];

export const MediaGalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'photography' | 'video' | 'summit' | 'press'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxItem, setLightboxItem] = useState<PublicMediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [items, setItems] = useState<PublicMediaItem[]>(defaultEcosystemMedia);

  useEffect(() => {
    // Attempt to load dynamic media from CMS / media API
    apiGet<{ media: Array<{ id: string; title: string | null; description: string | null; contentType: string; byteSize: number; createdAt: string; previewUrl: string }> }>('/api/media/admin')
      .then(res => {
        if (res.media && res.media.length > 0) {
          const dynamicItems: PublicMediaItem[] = res.media.map(m => {
            const isVideo = m.contentType.startsWith('video/');
            return {
              id: m.id,
              title: m.title || m.id,
              category: isVideo ? 'video' : 'photography',
              type: isVideo ? 'video' : 'image',
              url: m.previewUrl,
              description: m.description || 'Verified SiHub institutional media asset.',
              date: new Date(m.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
              format: m.contentType.split('/')[1]?.toUpperCase() || 'FILE',
              size: `${(m.byteSize / (1024 * 1024)).toFixed(1)} MB`
            };
          });
          setItems([...dynamicItems, ...defaultEcosystemMedia]);
        }
      })
      .catch(() => {
        // Fallback already pre-populated with official high-res ecosystem assets
      });
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  const handleShare = (item: PublicMediaItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.url);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DynamicCmsSections pageSlug="media" placement="top" />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>Institutional Visual Archives</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading max-w-3xl mx-auto">
            SiHub Media Gallery & Documented Milestones
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explore authentic high-resolution photography, keynote discussions, startup showcases, and official press resources from the Somali Innovation Hub.
          </p>

          {/* Quick Search & Stats */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search photo archives, keynotes, or summits…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 transition-all shadow-xl backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Navigation */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            {[
              { id: 'all', label: 'All Assets', icon: Layers },
              { id: 'photography', label: 'Photography & Labs', icon: ImageIcon },
              { id: 'video', label: 'Keynote & Video', icon: Video },
              { id: 'summit', label: 'Innovation Summit', icon: Sparkles },
              { id: 'press', label: 'Brand & Press Kit', icon: FileText }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as never)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-slate-500 whitespace-nowrap hidden md:inline">
            Showing {filteredItems.length} curated asset{filteredItems.length === 1 ? '' : 's'}
          </span>
        </div>
      </section>

      {/* Media Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
            <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No media assets match your query</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or selecting another category filter above.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold mt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-cyan-300 transition-all flex flex-col justify-between"
              >
                {/* Media Preview Box */}
                <div
                  className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
                  onClick={() => setLightboxItem(item)}
                >
                  {item.type === 'video' ? (
                    <>
                      <img
                        src={item.thumbnailUrl || item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/20 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxItem(item);
                      }}
                      className="p-1.5 rounded-lg bg-slate-950/80 text-white hover:bg-cyan-600"
                      title="Enlarge preview"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Metadata and Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleShare(item)}
                        className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-cyan-600 transition-colors"
                        title="Copy direct asset link"
                      >
                        {copiedId === item.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-cyan-600 transition-colors"
                        title="Open in new window"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl space-y-4"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header Strip */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="min-w-0 pr-4">
                <h3 className="text-base font-bold text-white truncate">{lightboxItem.title}</h3>
                <span className="text-xs text-cyan-400 font-mono">
                  {lightboxItem.category.toUpperCase()} • {lightboxItem.format} • {lightboxItem.size}
                </span>
              </div>
              <button
                onClick={() => setLightboxItem(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Media Box */}
            <div className="px-4 max-h-[65vh] flex items-center justify-center overflow-hidden">
              {lightboxItem.type === 'video' ? (
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black">
                  <iframe
                    src={lightboxItem.url}
                    title={lightboxItem.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={lightboxItem.url}
                  alt={lightboxItem.title}
                  className="max-h-[60vh] w-auto max-w-full rounded-2xl object-contain mx-auto shadow-2xl"
                />
              )}
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {lightboxItem.description}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxItem.url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition-transform hover:scale-102"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Open Full Resolution</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <DynamicCmsSections pageSlug="media" placement="bottom" />
    </div>
  );
};
