import React from 'react';
import { X, ExternalLink, Heart, Sparkles, Flame, Trophy, Compass, UserCheck, ShieldCheck, Zap } from 'lucide-react';

export default function ProfileModal({ profile, onClose, onDateThisAgent, onViewRankings }) {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#10121d] rounded-3xl border border-white/15 shadow-2xl overflow-hidden my-8">
        {/* Header Background Gradient */}
        <div className="h-32 bg-gradient-to-r from-rose-600/30 via-purple-600/30 to-blue-600/30 border-b border-white/10 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/75 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Header Info */}
        <div className="px-6 sm:px-8 pb-6 -mt-16 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end space-x-4">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-[#10121d] shadow-2xl"
                />
                <span className="absolute bottom-1 right-1 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-[#10121d]"></span>
                </span>
              </div>
              <div className="mb-2">
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {profile.name}
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    Agent Active
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-300 mt-0.5">
                  {profile.headline}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  📍 {profile.location} · {profile.company}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center space-x-2 pb-2">
              <button
                onClick={() => {
                  onClose();
                  onDateThisAgent(profile);
                }}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-lg shadow-rose-500/30 transition-all transform hover:-translate-y-0.5"
              >
                <Flame className="w-4 h-4 text-amber-300" />
                <span>Date This Agent</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onViewRankings(profile.id);
                }}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/30 transition-colors"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Best Matches</span>
              </button>
            </div>
          </div>

          {/* The Two Official Sources Display */}
          <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs text-slate-300 font-medium">
              <span className="text-rose-400 font-bold uppercase tracking-wider text-[11px]">The 2 Official Sources Analyzed:</span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="text-slate-400">Scraped & synthesized into agent dating persona</span>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#0077b5]/20 text-[#38bdf8] hover:bg-[#0077b5]/30 border border-[#0077b5]/40 transition-colors"
              >
                <span className="font-black text-sm">in</span>
                <span>Verified LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-75" />
              </a>
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-amber-500/20 text-pink-300 hover:opacity-90 border border-pink-500/40 transition-opacity"
              >
                <span className="font-black text-sm">IG</span>
                <span>Public Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-75" />
              </a>
            </div>
          </div>

          {/* Agent Persona Philosophy */}
          {profile.agentPersona && (
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-rose-950/30 to-purple-950/30 border border-rose-500/20">
              <div className="flex items-center space-x-2 text-xs font-bold text-rose-300 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>Agent Dating Persona & Voice</span>
              </div>
              <p className="text-sm text-slate-200 italic leading-relaxed">
                "{profile.agentPersona.firstPersonBio}"
              </p>
              <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-4 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 font-medium">Voice Cadence: </span>
                  <span className="text-slate-200 font-semibold">{profile.agentPersona.voiceTone}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Ideal Date: </span>
                  <span className="text-slate-200 font-semibold">{profile.agentPersona.idealDate}</span>
                </div>
              </div>
            </div>
          )}

          {/* Deep Analysis Breakdown Grid: Needs, Hobbies, Interests, Qualities */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Needs */}
            <div className="p-4 rounded-2xl bg-[#141724] border border-rose-500/20">
              <div className="flex items-center space-x-2 text-sm font-bold text-rose-400 mb-3">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500/30" />
                <span>Core Needs in a Partner</span>
              </div>
              <ul className="space-y-2">
                {profile.analysis?.needs?.map((need, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <span className="text-rose-500 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{need}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hobbies */}
            <div className="p-4 rounded-2xl bg-[#141724] border border-purple-500/20">
              <div className="flex items-center space-x-2 text-sm font-bold text-purple-400 mb-3">
                <Compass className="w-4 h-4 text-purple-400" />
                <span>Hobbies & Downtime Habits</span>
              </div>
              <ul className="space-y-2">
                {profile.analysis?.hobbies?.map((hobby, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <span className="text-purple-400 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{hobby}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interests */}
            <div className="p-4 rounded-2xl bg-[#141724] border border-cyan-500/20">
              <div className="flex items-center space-x-2 text-sm font-bold text-cyan-400 mb-3">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Interests & Curiosities</span>
              </div>
              <ul className="space-y-2">
                {profile.analysis?.interests?.map((interest, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <span className="text-cyan-400 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{interest}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Qualities */}
            <div className="p-4 rounded-2xl bg-[#141724] border border-amber-500/20">
              <div className="flex items-center space-x-2 text-sm font-bold text-amber-400 mb-3">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Behavioral & Conversational Qualities</span>
              </div>
              <ul className="space-y-2">
                {profile.analysis?.otherQualities?.map((quality, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{quality}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trait Gauges */}
          {profile.traits && (
            <div className="mt-6 p-4 rounded-2xl bg-[#141724] border border-white/10">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Agent Personality & Trait Distribution
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(profile.traits).map(([trait, score]) => (
                  <div key={trait}>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300 capitalize mb-1">
                      <span>{trait}</span>
                      <span className="text-rose-400">{score}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-rose-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
