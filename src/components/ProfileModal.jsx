import React, { useEffect } from 'react';
import { X, ExternalLink, Heart, Sparkles, Flame, Trophy, Compass, ShieldCheck, Zap } from 'lucide-react';

export default function ProfileModal({ profile, onClose, onDateThisAgent, onViewRankings }) {
  if (!profile) return null;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Dialog Container: Constrained to 90vh max height */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#111320] rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="p-5 sm:p-6 bg-[#141726] border-b border-white/10 flex-shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-rose-500/50 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#141726]"></span>
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {profile.name}
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Agent Live
                  </span>
                </div>
                <p className="text-xs text-slate-300 truncate max-w-md mt-0.5">
                  {profile.headline}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  📍 {profile.location} · {profile.company}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Row & Official Links */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
            {/* The 2 Official Links */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">Official Sources:</span>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#0077b5]/15 text-[#38bdf8] hover:bg-[#0077b5]/30 border border-[#0077b5]/30 transition-colors"
              >
                <span className="font-bold text-[11px]">in</span>
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-pink-500/15 via-rose-500/15 to-amber-500/15 text-pink-300 hover:opacity-90 border border-pink-500/30 transition-opacity"
              >
                <span className="font-bold text-[11px]">IG</span>
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  onClose();
                  onDateThisAgent(profile);
                }}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-md shadow-rose-500/25 transition-all"
              >
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                <span>Date Agent</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onViewRankings(profile.id);
                }}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl font-semibold text-xs bg-purple-500/15 hover:bg-purple-500/25 text-purple-200 border border-purple-500/30 transition-colors"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Best Matches</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Agent Persona Philosophy Banner */}
          {profile.agentPersona && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/30 to-purple-950/30 border border-rose-500/20">
              <div className="flex items-center space-x-2 text-xs font-bold text-rose-300 uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Agent Dating Persona & Voice</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                "{profile.agentPersona.firstPersonBio}"
              </p>
              <div className="mt-2.5 pt-2.5 border-t border-white/5 flex flex-wrap gap-4 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 font-medium">Cadence: </span>
                  <span className="text-slate-200 font-semibold">{profile.agentPersona.voiceTone}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Ideal Date: </span>
                  <span className="text-slate-200 font-semibold">{profile.agentPersona.idealDate}</span>
                </div>
              </div>
            </div>
          )}

          {/* Deep Analysis Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Needs */}
            <div className="p-4 rounded-2xl bg-[#141724] border border-rose-500/20">
              <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-2.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/30" />
                <span>Core Needs in a Partner</span>
              </div>
              <ul className="space-y-1.5">
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
              <div className="flex items-center space-x-2 text-xs font-bold text-purple-400 uppercase tracking-wider mb-2.5">
                <Compass className="w-3.5 h-3.5 text-purple-400" />
                <span>Hobbies & Downtime Habits</span>
              </div>
              <ul className="space-y-1.5">
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
              <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interests & Curiosities</span>
              </div>
              <ul className="space-y-1.5">
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
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Behavioral & Conversational Qualities</span>
              </div>
              <ul className="space-y-1.5">
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
            <div className="p-4 rounded-2xl bg-[#141724] border border-white/10">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Agent Personality & Trait Distribution
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(profile.traits).map(([trait, score]) => (
                  <div key={trait}>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300 capitalize mb-1">
                      <span>{trait}</span>
                      <span className="text-rose-400">{score}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-rose-500 to-purple-500 h-1.5 rounded-full"
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
