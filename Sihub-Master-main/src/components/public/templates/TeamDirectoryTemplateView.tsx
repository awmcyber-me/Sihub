/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Pre-Designed Team & Leadership Directory Template View
 */

import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { DynamicPageContent } from '../DynamicCmsPage';

interface TemplateProps {
  page: DynamicPageContent;
  onNavigate: (url: string) => void;
}

export const TeamDirectoryTemplateView: React.FC<TemplateProps> = ({ page, onNavigate }) => {
  const [filterStation, setFilterStation] = useState<string>('All');

  const teamList = page.team && page.team.length > 0 ? page.team : [
    { name: 'Dr. Amina Farah', role: 'Executive Director & Co-Founder', bio: 'Championing digital economy policy, civic innovation, and technological sovereignty for Somalia.', location: 'Mogadishu HQ' },
    { name: 'Mohamed Abdullahi', role: 'Director of Venture Incubation', bio: 'Over 12 years scaling grassroots ventures and venture finance across East Africa and the Horn.', location: 'SiHub HQ' },
    { name: 'Safia Nur', role: 'Dean of SiHub Institute', bio: 'Directing curriculum engineering, software engineering bootcamps, and technical scholarships.', location: 'Mogadishu' },
    { name: 'Khadar Hassan', role: 'Lead of Grassroots Social Labs', bio: 'Directing PeaceTech and community development initiatives in regional member states.', location: 'Regional Stations' }
  ];

  const stations = ['All', ...Array.from(new Set(teamList.map(t => (t as any).location || 'Mogadishu HQ')))];

  const filtered = filterStation === 'All'
    ? teamList
    : teamList.filter(t => ((t as any).location || 'Mogadishu HQ') === filterStation);

  return (
    <div className="space-y-14">
      {/* 1. Header Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Institutional Governance</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {page.heading || page.title || 'Leadership & Ecosystem Stewards'}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          {page.description || page.summary || 'Meet the passionate educators, entrepreneurs, and civic catalysts guiding Somalia\'s national technology ecosystem.'}
        </p>

        {/* Filter Buttons */}
        {stations.length > 2 && (
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {stations.map(station => (
              <button
                key={station}
                onClick={() => setFilterStation(station)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterStation === station
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {station}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 2. Team Directory Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((member, idx) => {
          const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
          const location = (member as any).location || 'Mogadishu HQ';
          const memberImage = 'image' in member && typeof member.image === 'string' ? member.image : null;

          return (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-center">
              <div className="space-y-3">
                {memberImage ? (
                  <img
                    src={memberImage}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover ring-2 ring-cyan-600/20"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-tr from-cyan-700 to-slate-900 text-white flex items-center justify-center text-xl font-bold shadow-inner">
                    {initials}
                  </div>
                )}

                <div>
                  <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs font-semibold text-cyan-700">{member.role}</p>
                  <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{location}</span>
                  </p>
                </div>

                {member.bio && (
                  <p className="text-xs text-slate-600 leading-relaxed text-left line-clamp-4 pt-1 border-t border-slate-100">
                    {member.bio}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-3 text-slate-400">
                <a href="mailto:info@sihub.so" className="p-1.5 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors" title="Contact via email">
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors" title="LinkedIn Profile">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Join the SiHub Movement Banner */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Join Our Mission</span>
          </div>
          <h2 className="text-2xl font-black text-white">Want to Build Somalia's Tech Future with Us?</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            We are always looking for passionate educators, curriculum developers, startup coaches, and regional hub coordinators.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/partnerships/become-partner')}
          className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shrink-0 transition-colors"
        >
          View Open Opportunities &rarr;
        </button>
      </section>
    </div>
  );
};
