/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Dedicated Events & Media Public Page Designs (5 Pages)
 * 23. SiTalks (/events/sitalks)
 * 24. Annual Somali Innovation Summit (/events/summit)
 * 25. Innovation Expo & Demo Day (/events/expo)
 * 26. Ecosystem News & Stories (/events/news-stories)
 * 27. Media Gallery & Brand Assets (/events/media)
 */

import React from 'react';
import {
  Mic,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  Play,
  Download,
  Image as ImageIcon,
  Video,
  FileText,
  Radio,
  Share2,
  Tv,
  Layers,
  CheckCircle2,
  Users
} from 'lucide-react';
import type { DynamicPageContent } from '../DynamicCmsPage';

interface PageProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

// ---------------------------------------------------------------------------
// 23. SiTalks (/events/sitalks)
// ---------------------------------------------------------------------------
export const SiTalksPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const episodes = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-700/60 text-rose-300 text-xs font-semibold uppercase tracking-wider">
            <Mic className="w-3.5 h-3.5 text-rose-400" />
            <span>{page.heroBadge || 'Flagship Thought-Leadership Forum'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'SiTalks: Voices of Innovation'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Monthly fireside conversations, recorded keynotes, and provocative debates with the thinkers, founders, and policy-makers defining the Somali digital renaissance.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate(page.cta?.url || '/events')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md transition-all"
            >
              <span>Attend Next Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Recent Episodes */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Media Archive</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Recorded SiTalks Sessions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {episodes.length > 0 ? episodes.map((episode, index) => (
            <article key={`${episode.title}-${index}`} className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">{episode.title}</h3>
              <p className="text-xs text-slate-600">{episode.description}</p>
            </article>
          )) : <p className="text-sm text-slate-600" role="status">No recorded SiTalks sessions have been published yet.</p>}
        </div>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 24. Annual Somali Innovation Summit (/events/summit)
// ---------------------------------------------------------------------------
export const SummitPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const tracks = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{page.heroBadge || 'National Flagship Summit'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Somali Innovation Summit 2026'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Somalia’s preeminent annual tech gathering convening 2,000+ founders, ministers, diaspora investors, multilateral partners, and youth innovators under one roof.'}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              {page.stats?.map((stat, index) => <span key={`${stat.label}-${index}`}>{stat.label}: {stat.value}</span>)}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate(page.cta?.url || '/events')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all"
            >
              <span>{page.cta?.label || 'Register for Delegate Pass'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Summit Tracks */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Summit Agenda</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Summit Tracks</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.length > 0 ? tracks.map((track, index) => (
            <article key={`${track.title}-${index}`} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-base font-bold text-slate-900 mb-2">{track.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{track.description}</p>
            </article>
          )) : <p className="text-sm text-slate-600" role="status">No summit tracks have been published yet.</p>}
        </div>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 25. Innovation Expo & Demo Day (/events/expo)
// ---------------------------------------------------------------------------
export const ExpoPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const pavilions = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-fuchsia-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-900/60 border border-fuchsia-700/60 text-fuchsia-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>{page.heroBadge || 'Exhibition & Pitch Arena'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Innovation Expo & Demo Day'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Live hardware prototypes, interactive software demos, and high-stakes startup pitch battles before regional venture funds and corporate procurement leads.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate(page.cta?.url || '/events')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold shadow-md transition-all"
            >
              <span>Reserve Startup Booth</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Expo Pavilions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pavilions.length > 0 ? pavilions.map((pavilion, index) => (
          <article key={`${pavilion.title}-${index}`} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-base font-bold text-slate-900 mb-1">{pavilion.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{pavilion.description}</p>
          </article>
        )) : <p className="text-sm text-slate-600" role="status">No expo pavilions have been published yet.</p>}
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 26. Ecosystem News & Stories (/events/news-stories)
// ---------------------------------------------------------------------------
export const NewsStoriesPageView: React.FC<PageProps> = ({ page, onNavigate }) => {
  const articles = page.features ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>{page.heroBadge || 'Official Newsroom'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Ecosystem News & Impact Stories'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Authoritative dispatches, press releases, program graduations, and deep-dive journalistic reporting from across the SiHub nationwide network.'}
          </p>
        </div>
      </section>

      {/* Articles */}
      {articles.length > 0 ? <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <article key={`${article.title}-${index}`} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-base font-bold text-slate-900">{article.title}</h2>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">{article.description}</p>
          </article>
        ))}
      </section> : <p className="text-sm text-slate-600" role="status">No news stories have been published yet.</p>}
    </div>
  );
};

// ---------------------------------------------------------------------------
// 27. Media Gallery & Brand Assets (/events/media)
// ---------------------------------------------------------------------------
export const MediaGalleryPageView: React.FC<PageProps> = ({ page }) => {
  const assets = page.documents ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>{page.heroBadge || 'Media Kit & Brand Center'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {page.heading || page.title || 'Media Gallery & Brand Assets'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {page.description || page.summary || 'Official brand identities, high-resolution photography, institutional color palettes, and press-ready media kits for journalists and partners.'}
          </p>
        </div>
      </section>

      {/* Asset Downloads */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Digital Brand Assets</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Downloadable Press Kits</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assets.length > 0 ? assets.map((asset, index) => (
            <div key={`${asset.title}-${index}`} className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{asset.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{asset.description}{asset.fileSize ? ` • ${asset.fileSize}` : ''}{asset.format ? ` • ${asset.format}` : ''}</p>
              </div>
              <a href={asset.fileUrl} target="_blank" rel="noreferrer" aria-label={`Open ${asset.title}`} className="p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 transition-colors">
                <Download className="w-4 h-4" />
              </a>
            </div>
          )) : <p className="text-sm text-slate-600" role="status">No media assets have been published yet.</p>}
        </div>
      </section>
    </div>
  );
};
