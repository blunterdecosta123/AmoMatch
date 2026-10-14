import React, { useState, useMemo } from 'react';
import { Trophy, Flame, Heart, Sparkles, ExternalLink, Filter, ArrowRight, ShieldCheck } from 'lucide-react';
import { getRankingsForPerson } from '../services/agentDatingEngine';

export default function RankingsView({
  allProfiles,
  selectedPersonId,
  onSelectPerson,
  onWatchDate,
  onViewProfile
}) {
  const [filterTier, setFilterTier] = useState('all');

  const targetPerson = useMemo(() => {
    return allProfiles.find(p => p.id === selectedPersonId) || allProfiles[0];
  }, [allProfiles, selectedPersonId]);

  const rankings = useMemo(() => {
    if (!targetPerson) return [];
    return getRankingsForPerson(targetPerson.id, allProfiles);
  }, [targetPerson, allProfiles]);

  const filteredRankings = useMemo(() => {
    if (filterTier === 'soulmate') return rankings.filter(r => r.score >= 90);
    if (filterTier === 'high') return rankings.filter(r => r.score >= 84);
    return rankings;
  }, [rankings, filterTier]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header & Target Person Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center space-x-1">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Personalized Match Rankings</span>
            </span>
            <span className="text-xs text-slate-400">Autonomous Compatibility Index</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Who Fits Each Person Best?
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            For every single person, their agent evaluated simulated dates, analyzed core needs, and generated a ranked affinity list.
          </p>
        </div>

        {/* Person Selector Dropdown */}
        <div className="flex items-center space-x-3 bg-[#111320] p-2.5 rounded-2xl border border-white/10">
          <span className="text-xs font-bold text-slate-300 ml-2">Viewing for:</span>
          <select
            value={targetPerson?.id}
            onChange={(e) => onSelectPerson(e.target.value)}
            className="bg-white/5 text-sm font-bold text-rose-400 rounded-xl px-3 py-2 border border-white/10 focus:outline-none focus:border-rose-500 cursor-pointer"
          >
            {allProfiles.map(p => (
              <option key={p.id} value={p.id} className="bg-[#121422] text-white">
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Person Overview Banner */}
      {targetPerson && (
        <div className="mt-6 p-5 rounded-3xl bg-gradient-to-r from-rose-950/40 via-[#121422] to-purple-950/40 border border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={targetPerson.avatar}
              alt={targetPerson.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-rose-500/50"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black text-white">{targetPerson.name}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">
                  {targetPerson.company}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{targetPerson.headline}</p>
              <div className="flex items-center space-x-2 mt-2">
                <a
                  href={targetPerson.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#38bdf8] hover:underline flex items-center space-x-1"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href={targetPerson.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-pink-400 hover:underline flex items-center space-x-1"
                >
                  <span>Public Instagram</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onViewProfile(targetPerson)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
            >
              View Full Analysis
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Filter Compatibility:</span>
          <button
            onClick={() => setFilterTier('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filterTier === 'all'
                ? 'bg-rose-500 text-white'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            All Candidates ({rankings.length})
          </button>
          <button
            onClick={() => setFilterTier('soulmate')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filterTier === 'soulmate'
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Top Tier (90%+)
          </button>
          <button
            onClick={() => setFilterTier('high')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filterTier === 'high'
                ? 'bg-cyan-600 text-white'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            High Synergy (84%+)
          </button>
        </div>

        <span className="text-xs text-slate-400 hidden sm:inline">
          Showing ranked candidates from best to worst fit
        </span>
      </div>

      {/* Ranked Candidates List */}
      <div className="mt-4 space-y-3">
        {filteredRankings.map((item) => {
          const isTopMatch = item.rank === 1;

          return (
            <div
              key={item.candidate.id}
              className={`p-4 sm:p-5 rounded-2xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isTopMatch
                  ? 'bg-gradient-to-r from-rose-950/40 via-[#151726] to-purple-950/40 border-2 border-rose-500/50 shadow-xl shadow-rose-500/10'
                  : 'bg-[#111320] border border-white/10 hover:border-white/20'
              }`}
            >
              {/* Left: Rank badge & Candidate Profile */}
              <div className="flex items-start sm:items-center space-x-4">
                {/* Rank Number Badge */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-black text-base sm:text-lg flex-shrink-0 ${
                    item.rank === 1
                      ? 'bg-gradient-to-tr from-amber-400 to-rose-500 text-slate-950 shadow-lg shadow-amber-500/30'
                      : item.rank === 2
                      ? 'bg-slate-200 text-slate-950'
                      : item.rank === 3
                      ? 'bg-amber-700/60 text-amber-100'
                      : 'bg-white/5 text-slate-400 border border-white/10'
                  }`}
                >
                  {item.rank === 1 ? '👑 #1' : `#${item.rank}`}
                </div>

                {/* Avatar */}
                <img
                  src={item.candidate.avatar}
                  alt={item.candidate.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/10 flex-shrink-0"
                />

                {/* Candidate Info */}
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-base font-bold text-white truncate">
                      {item.candidate.name}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.score >= 92
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : item.score >= 85
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {item.matchTier}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {item.candidate.headline}
                  </p>

                  {/* Matching Rationale Pill */}
                  <div className="mt-2 text-xs text-slate-300 flex items-center space-x-1.5 flex-wrap">
                    <span className="text-rose-400 font-semibold">Why they fit:</span>
                    <span>{item.factors?.[0] || 'Complementary temperaments and shared life values.'}</span>
                  </div>
                </div>
              </div>

              {/* Right: Compatibility Breakdown & Action Button */}
              <div className="flex items-center justify-between md:justify-end space-x-4 border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
                {/* Metric Gauges Preview */}
                <div className="hidden lg:flex items-center space-x-4 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Intellect</span>
                    <span className="text-xs font-bold text-cyan-400">{item.intellectualSpark}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Banter</span>
                    <span className="text-xs font-bold text-rose-400">{item.banterRapport}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Depth</span>
                    <span className="text-xs font-bold text-purple-400">{item.emotionalDepth}%</span>
                  </div>
                </div>

                {/* Score Pill */}
                <div className="text-right">
                  <div className="text-2xl font-black text-white">
                    {item.score}<span className="text-sm font-semibold text-rose-400">%</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Fit Score
                  </span>
                </div>

                {/* Watch Date Action */}
                <button
                  onClick={() => onWatchDate(targetPerson, item.candidate)}
                  className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-md shadow-rose-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-300" />
                  <span>Watch Date</span>
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
