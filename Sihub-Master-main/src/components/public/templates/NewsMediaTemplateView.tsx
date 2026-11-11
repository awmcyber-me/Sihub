/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed News & Media Archive Template View
 */

import React, { useState } from 'react';
import { Newspaper, Calendar, ArrowRight, Download, Image as ImageIcon, Video, ExternalLink, Share2, Search, Filter } from 'lucide-react';
import { DynamicPageContent } from '../DynamicCmsPage';

interface TemplateProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author?: string;
  readTime?: string;
  imageUrl?: string;
  link?: string;
}

interface GalleryItem {
  id: string;
  title: string;
  location: string;
  date: string;
  type: 'photo' | 'video';
  imageUrl: string;
  caption?: string;
}

export const NewsMediaTemplateView: React.FC<TemplateProps> = ({ page, onNavigate }) => {
  const isGallery = (page.slug || '').includes('gallery');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeMediaItem, setActiveMediaItem] = useState<GalleryItem | null>(null);

  // Dynamic content or curated defaults
  const newsItems: NewsItem[] = (page as any).articles || [
    {
      id: 'news-1',
      title: 'SiHub Announces 2026 National Innovation Summit Dates in Mogadishu',
      excerpt: 'Bringing together 500+ ecosystem leaders, high-growth startups, and international development partners to accelerate Somalia’s digital economy transformation.',
      category: 'Press Release',
      date: 'May 14, 2026',
      author: 'SiHub Communications',
      readTime: '4 min read',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'news-2',
      title: 'Cohort 8 Graduates 120 AI & Cloud Architecture Practitioners',
      excerpt: 'In partnership with regional universities and international tech employers, 74% of graduates secured verified placement within 30 days of capstone demo day.',
      category: 'Institute Updates',
      date: 'April 28, 2026',
      author: 'Academy Editorial',
      readTime: '3 min read',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'news-3',
      title: 'Somali Diaspora Angel Network Partners with SiHub Seed Fund',
      excerpt: 'A catalytic co-investment facility targeting early-stage fintech, agritech, and renewable infrastructure ventures founded by Somali youth innovators.',
      category: 'Investments',
      date: 'April 10, 2026',
      author: 'Venture Desk',
      readTime: '5 min read',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const galleryItems: GalleryItem[] = (page as any).gallery || [
    {
      id: 'gal-1',
      title: 'SiHub Talks Episode 12: Future of Mobile Money in East Africa',
      location: 'SiHub Studio 1, Mogadishu',
      date: 'May 2026',
      type: 'video',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
      caption: 'Roundtable discussion with telecommunications and central bank regulatory experts.',
    },
    {
      id: 'gal-2',
      title: 'Women in Tech Mentorship Circle & Coding Sprint',
      location: 'Garowe Innovation Hub',
      date: 'April 2026',
      type: 'photo',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
      caption: 'Female software engineers building open-source civic tools.',
    },
    {
      id: 'gal-3',
      title: 'Green Innovation Lab Demo Day & Agritech Prototypes',
      location: 'Hargeisa Hub',
      date: 'March 2026',
      type: 'photo',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      caption: 'Solar-powered smart irrigation hardware demonstrations.',
    },
    {
      id: 'gal-4',
      title: 'Somali Innovation Summit 2025 Keynote Hall',
      location: 'Decale Hotel Conference Center, Mogadishu',
      date: 'December 2025',
      type: 'photo',
      imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
      caption: 'Over 600 delegates gathered for the flagship ecosystem keynote.',
    },
  ];

  return (
    <div className="space-y-16">
      {/* 1. Pre-Designed Editorial Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            {isGallery ? <ImageIcon className="w-4 h-4" /> : <Newspaper className="w-4 h-4" />}
            <span>{page.heroBadge || (isGallery ? 'Official Media & Visual Archive' : 'Pressroom & Ecosystem News')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            {page.heading || (isGallery ? 'SiHub Media Gallery & Broadcasts' : 'News & Stories from the Ecosystem')}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.subheading || (isGallery
              ? 'High-resolution press photography, broadcast recordings of SiHub Talks, and official visual assets from ecosystem summits across Somalia.'
              : 'Official dispatches, program announcements, policy commentary, and impact field stories shaping the Horn of Africa’s innovation landscape.')}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => onNavigate('/events/sitalks')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <span>Watch SiHub Talks</span>
              <Video className="w-4 h-4" />
            </button>
            <a
              href="#media-kit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Media Kit (Zip)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Main Content Display: Articles or Gallery */}
      {!isGallery ? (
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Latest Dispatches</h2>
              <p className="text-sm text-slate-500">Verified announcements from the SiHub Executive Secretariat</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="w-4 h-4 text-cyan-600" />
              <span>Updated weekly</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {item.imageUrl && (
                  <div className="relative aspect-16/9 bg-slate-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-cyan-300 text-xs font-semibold">
                      {item.category}
                    </span>
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.readTime || '3 min'}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">{item.author}</span>
                    <button
                      onClick={() => onNavigate(item.link || `/events/news-stories`)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-800"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Verified Media Archive</h2>
              <p className="text-sm text-slate-500">Curated photographic and broadcast assets from SiHub events</p>
            </div>
            <div className="text-xs font-medium text-slate-500">
              Showing {galleryItems.length} curated assets
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveMediaItem(item)}
                className="group cursor-pointer rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <span className="absolute top-3 right-3 p-2 rounded-lg bg-slate-900/70 backdrop-blur-xs text-white">
                    {item.type === 'video' ? <Video className="w-4 h-4 text-cyan-400" /> : <ImageIcon className="w-4 h-4 text-cyan-400" />}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-medium text-cyan-300">{item.location}</p>
                    <p className="text-sm font-bold truncate">{item.title}</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-xs text-slate-500 line-clamp-2">{item.caption || item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Media Kit & Press Contact Section */}
      <section id="media-kit" className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Official Assets</span>
            <h3 className="text-2xl font-bold text-slate-900">SiHub Press & Brand Guidelines Kit</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Official vector logos, leadership headshots, organizational fact sheet, and brand color palette for journalists, conference hosts, and international partners.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium">
                Format: SVG, PNG, PDF (42 MB)
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium">
                License: Editorial Use Only
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <a
              href="mailto:press@sihub.so"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 shadow-xs"
            >
              <span>Contact Press Office</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => onNavigate('/contact')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Media Kit</span>
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeMediaItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveMediaItem(null)}
        >
          <div
            className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/9 bg-black">
              <img
                src={activeMediaItem.imageUrl}
                alt={activeMediaItem.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between text-xs text-cyan-400">
                <span>{activeMediaItem.location} • {activeMediaItem.date}</span>
                <button
                  onClick={() => setActiveMediaItem(null)}
                  className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white"
                >
                  Close
                </button>
              </div>
              <h3 className="text-lg font-bold">{activeMediaItem.title}</h3>
              {activeMediaItem.caption && (
                <p className="text-sm text-slate-300">{activeMediaItem.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
