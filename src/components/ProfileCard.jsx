import React from 'react';
import { ExternalLink, Sparkles, Heart, Flame, Compass, Coffee, UserCheck } from 'lucide-react';

export default function ProfileCard({ profile, onInspect, onDateThisAgent, onViewRankings }) {
  const needsCount = profile.analysis?.needs?.length || 0;
  const hobbiesCount = profile.analysis?.hobbies?.length || 0;
  const interestsCount = profile.analysis?.interests?.length || 0;

  return (
    <div className="group relative bg-[#121420] rounded-2xl border border-white/10 hover:border-rose-500/40 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/10 flex flex-col justify-between">
      {/* Top Banner & Status */}
      <div>
        <div className="flex items-start justify-between space-x-3">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-rose-500/30 group-hover:ring-rose-500 transition-all"
            />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#121420]"></span>
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-white truncate group-hover:text-rose-400 transition-colors">
                {profile.name}
              </h3>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Agent Live
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate mt-0.5">
              {profile.headline}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              📍 {profile.location}
            </p>
          </div>
        </div>

        {/* The Two Official Links */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-2">
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0077b5]/15 text-[#38bdf8] hover:bg-[#0077b5]/30 border border-[#0077b5]/30 transition-colors"
          >
            <span className="font-bold text-[11px]">in</span>
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
          </a>

          <a
            href={profile.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-pink-500/15 via-rose-500/15 to-amber-500/15 text-pink-300 hover:opacity-80 border border-pink-500/30 transition-opacity"
          >
            <span className="font-bold text-[11px]">IG</span>
            <span>Instagram</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
          </a>
        </div>

        {/* Agent's Persona Quote */}
        {profile.agentPersona?.firstPersonBio && (
          <div className="mt-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 italic line-clamp-2">
            "{profile.agentPersona.firstPersonBio}"
          </div>
        )}

        {/* Agent Analysis Breakdown Badges */}
        <div className="mt-4 space-y-2">
          {/* Needs */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-rose-300 mb-1">
              <span className="flex items-center space-x-1">
                <Heart className="w-3 h-3 text-rose-400" />
                <span>Primary Need</span>
              </span>
              <span className="text-slate-500 text-[10px]">{needsCount} analyzed</span>
            </div>
            <p className="text-xs text-slate-300 bg-rose-500/10 rounded-lg p-2 border border-rose-500/20 line-clamp-1">
              {profile.analysis?.needs?.[0]}
            </p>
          </div>

          {/* Hobbies & Interests Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {profile.analysis?.hobbies?.slice(0, 2).map((hobby, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 truncate max-w-[190px]"
              >
                🎯 {hobby}
              </span>
            ))}
            {profile.analysis?.interests?.slice(0, 1).map((interest, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 truncate max-w-[190px]"
              >
                💡 {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3 border-t border-white/10 flex items-center space-x-2">
        <button
          onClick={() => onInspect(profile)}
          className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors flex items-center justify-center space-x-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Full Analysis</span>
        </button>

        <button
          onClick={() => onDateThisAgent(profile)}
          className="py-2 px-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-md shadow-rose-500/20 transition-all flex items-center justify-center space-x-1"
          title="Send agent on a live date"
        >
          <Flame className="w-3.5 h-3.5 text-amber-300" />
          <span>Date</span>
        </button>

        <button
          onClick={() => onViewRankings(profile.id)}
          className="py-2 px-2.5 rounded-xl text-xs font-semibold bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-colors"
          title="See who fits this person best"
        >
          Top Fit
        </button>
      </div>
    </div>
  );
}
