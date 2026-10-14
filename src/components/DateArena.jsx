import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Flame, Play, RotateCcw, Eye, EyeOff, Sparkles, Heart, Brain, Coffee, Trophy, ArrowRight, FastForward, CheckCircle2 } from 'lucide-react';
import { VENUES, getOrSimulateDate } from '../services/agentDatingEngine';

export default function DateArena({
  allProfiles,
  selectedAgentA,
  selectedAgentB,
  setSelectedAgentA,
  setSelectedAgentB,
  onViewProfile,
  onViewRankings
}) {
  const [venue, setVenue] = useState(VENUES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [showInnerThoughts, setShowInnerThoughts] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(2500); // ms per turn
  const [activeDate, setActiveDate] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const transcriptEndRef = useRef(null);

  // Initialize or update simulated date when agents or venue change
  useEffect(() => {
    if (selectedAgentA && selectedAgentB && selectedAgentA.id !== selectedAgentB.id) {
      const dateSim = getOrSimulateDate(selectedAgentA, selectedAgentB, venue);
      setActiveDate(dateSim);
      setCurrentTurnIndex(0);
      setIsPlaying(false);
      setIsFinished(false);
    }
  }, [selectedAgentA, selectedAgentB, venue]);

  // Turn timer playback loop
  useEffect(() => {
    let timer;
    if (isPlaying && activeDate && !isFinished) {
      if (currentTurnIndex < activeDate.transcript.length - 1) {
        timer = setTimeout(() => {
          setCurrentTurnIndex(prev => prev + 1);
        }, playbackSpeed);
      } else {
        setIsPlaying(false);
        setIsFinished(true);
        if (activeDate.metrics?.overallChemistry >= 85) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentTurnIndex, activeDate, playbackSpeed, isFinished]);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentTurnIndex, isPlaying]);

  const handleStartOrPause = () => {
    if (isFinished) {
      setCurrentTurnIndex(0);
      setIsFinished(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTurnIndex(0);
    setIsFinished(false);
  };

  const handleInstantComplete = () => {
    if (activeDate) {
      setCurrentTurnIndex(activeDate.transcript.length - 1);
      setIsPlaying(false);
      setIsFinished(true);
      if (activeDate.metrics?.overallChemistry >= 85) {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleQuickMatch = (agentAId, agentBId) => {
    const a = allProfiles.find(p => p.id === agentAId);
    const b = allProfiles.find(p => p.id === agentBId);
    if (a && b) {
      setSelectedAgentA(a);
      setSelectedAgentB(b);
      handleReset();
    }
  };

  if (!selectedAgentA || !selectedAgentB) {
    return (
      <div className="p-12 text-center text-slate-400">
        Please select two agents to begin the date.
      </div>
    );
  }

  const currentTurns = activeDate ? activeDate.transcript.slice(0, currentTurnIndex + 1) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header & Quick Scenarios */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Autonomous Date Arena</span>
            </span>
            <span className="text-xs text-slate-400">Live Turn-by-Turn Multi-Agent Harness</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Watch Agents Date on Their Behalf
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Agents converse in character, probe core needs and hobbies, and generate chemistry scores in real time.
          </p>
        </div>

        {/* Quick Recommended Pairs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1">Hot Dates:</span>
          <button
            onClick={() => handleQuickMatch("sara-dietschy", "marques-brownlee")}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-rose-500/20 text-slate-200 hover:text-rose-300 border border-white/10 transition-colors"
          >
            Sara & Marques
          </button>
          <button
            onClick={() => handleQuickMatch("cleo-abram", "sam-altman")}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-rose-500/20 text-slate-200 hover:text-rose-300 border border-white/10 transition-colors"
          >
            Cleo & Sam
          </button>
          <button
            onClick={() => handleQuickMatch("julie-zhuo", "brian-chesky")}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-rose-500/20 text-slate-200 hover:text-rose-300 border border-white/10 transition-colors"
          >
            Julie & Brian
          </button>
          <button
            onClick={() => handleQuickMatch("ali-abdaal", "amanda-rach-lee")}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-rose-500/20 text-slate-200 hover:text-rose-300 border border-white/10 transition-colors"
          >
            Ali & Amanda
          </button>
        </div>
      </div>

      {/* Agent Selector Bar & Venue Setting */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#111320] p-4 rounded-3xl border border-white/10">
        {/* Agent A Selector */}
        <div className="md:col-span-4 flex items-center space-x-3 bg-white/[0.03] p-3 rounded-2xl border border-white/5">
          <img
            src={selectedAgentA.avatar}
            alt={selectedAgentA.name}
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-rose-500/40"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">Agent A</span>
            <select
              value={selectedAgentA.id}
              onChange={(e) => {
                const found = allProfiles.find(p => p.id === e.target.value);
                if (found) setSelectedAgentA(found);
              }}
              className="w-full bg-transparent text-sm font-bold text-white border-none focus:outline-none focus:ring-0 truncate cursor-pointer"
            >
              {allProfiles.map(p => (
                <option key={p.id} value={p.id} disabled={p.id === selectedAgentB.id} className="bg-[#121422] text-white">
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => onViewProfile(selectedAgentA)}
            className="text-xs text-slate-400 hover:text-white underline"
          >
            Bio
          </button>
        </div>

        {/* Center Venue Selector & Sparks */}
        <div className="md:col-span-4 text-center px-2">
          <div className="flex items-center justify-center space-x-2 text-xs font-bold text-purple-400 mb-1">
            <Coffee className="w-3.5 h-3.5" />
            <span>Date Venue</span>
          </div>
          <select
            value={venue.name}
            onChange={(e) => {
              const v = VENUES.find(item => item.name === e.target.value);
              if (v) setVenue(v);
            }}
            className="w-full bg-white/5 text-xs font-semibold text-slate-200 rounded-xl px-3 py-2 border border-white/10 focus:outline-none focus:border-rose-500 cursor-pointer truncate"
          >
            {VENUES.map((v, i) => (
              <option key={i} value={v.name} className="bg-[#121422] text-white">
                {v.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 italic mt-1 truncate">
            "{venue.vibe}"
          </p>
        </div>

        {/* Agent B Selector */}
        <div className="md:col-span-4 flex items-center space-x-3 bg-white/[0.03] p-3 rounded-2xl border border-white/5">
          <div className="flex-1 min-w-0 text-right">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">Agent B</span>
            <select
              value={selectedAgentB.id}
              onChange={(e) => {
                const found = allProfiles.find(p => p.id === e.target.value);
                if (found) setSelectedAgentB(found);
              }}
              className="w-full bg-transparent text-sm font-bold text-white border-none focus:outline-none focus:ring-0 truncate cursor-pointer text-right"
            >
              {allProfiles.map(p => (
                <option key={p.id} value={p.id} disabled={p.id === selectedAgentA.id} className="bg-[#121422] text-white">
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <img
            src={selectedAgentB.avatar}
            alt={selectedAgentB.name}
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-500/40"
          />
          <button
            onClick={() => onViewProfile(selectedAgentB)}
            className="text-xs text-slate-400 hover:text-white underline"
          >
            Bio
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport: Left = Live Chat, Right = Live Chemistry Metrics */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 cols: Date Transcript Theater */}
        <div className="lg:col-span-8 bg-[#10121d] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[640px]">
          {/* Top Controls Bar */}
          <div className="p-4 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleStartOrPause}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-md shadow-rose-500/25 transition-all"
              >
                <Play className={`w-3.5 h-3.5 fill-current ${isPlaying ? 'animate-spin' : ''}`} />
                <span>{isPlaying ? 'Pause Date' : isFinished ? 'Replay Date' : 'Start Date'}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleInstantComplete}
                className="hidden sm:flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
                title="Skip to conclusion"
              >
                <FastForward className="w-3.5 h-3.5 text-cyan-400" />
                <span>Skip to End</span>
              </button>
            </div>

            {/* Inner Thoughts Toggle & Speed */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowInnerThoughts(!showInnerThoughts)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  showInnerThoughts
                    ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
                }`}
                title="Toggle internal monologue thought stream"
              >
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Inner Thoughts</span>
                {showInnerThoughts ? <Eye className="w-3 h-3 ml-0.5" /> : <EyeOff className="w-3 h-3 ml-0.5" />}
              </button>

              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="bg-white/5 text-slate-300 text-xs font-semibold rounded-xl px-2 py-1.5 border border-white/10 focus:outline-none"
              >
                <option value={3500} className="bg-[#121422]">0.75x Speed</option>
                <option value={2500} className="bg-[#121422]">1x Normal</option>
                <option value={1400} className="bg-[#121422]">2x Fast</option>
              </select>
            </div>
          </div>

          {/* Transcript Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {currentTurns.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <div className="w-16 h-16 rounded-3xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 mb-3 animate-bounce">
                  <Flame className="w-8 h-8 text-rose-500" />
                </div>
                <h4 className="text-lg font-bold text-white">Date Ready to Begin</h4>
                <p className="text-xs text-slate-400 max-w-sm mt-1">
                  Click <strong className="text-rose-400">"Start Date"</strong> to watch both agents initiate their first conversation at {venue.name}.
                </p>
              </div>
            ) : (
              currentTurns.map((turn, idx) => {
                const isAgentA = turn.speakerId === selectedAgentA.id;
                const speakerProfile = isAgentA ? selectedAgentA : selectedAgentB;

                return (
                  <div
                    key={idx}
                    className={`flex items-start space-x-3 animate-fadeIn ${
                      isAgentA ? '' : 'flex-row-reverse space-x-reverse'
                    }`}
                  >
                    <img
                      src={speakerProfile.avatar}
                      alt={speakerProfile.name}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/10 flex-shrink-0 mt-1"
                    />

                    <div className={`max-w-[80%] ${isAgentA ? 'text-left' : 'text-right'}`}>
                      {/* Speaker Name & Subtext Badge */}
                      <div className={`flex items-center space-x-2 text-[11px] mb-1 ${isAgentA ? '' : 'justify-end'}`}>
                        <span className="font-bold text-slate-200">{speakerProfile.name}</span>
                        <span className="text-slate-500 text-[10px]">{turn.timestamp}</span>
                        {turn.subtext && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-slate-300 border border-white/10 italic">
                            {turn.subtext}
                          </span>
                        )}
                      </div>

                      {/* Dialogue Bubble */}
                      <div
                        className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-lg ${
                          isAgentA
                            ? 'bg-rose-500/15 border border-rose-500/30 text-rose-50 rounded-tl-sm'
                            : 'bg-purple-600/20 border border-purple-500/30 text-purple-50 rounded-tr-sm'
                        }`}
                      >
                        {turn.text}
                      </div>

                      {/* Internal Monologue / Thought Stream */}
                      {showInnerThoughts && turn.innerThought && (
                        <div
                          className={`mt-1.5 p-2.5 rounded-xl text-xs bg-amber-500/[0.07] border border-amber-500/20 text-amber-200/90 italic flex items-start space-x-2 ${
                            isAgentA ? 'rounded-tl-none' : 'rounded-tr-none text-left'
                          }`}
                        >
                          <Brain className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-amber-400 not-italic text-[10px] uppercase tracking-wider block">
                              Agent Internal Monologue:
                            </span>
                            "{turn.innerThought}"
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {/* Typing Indicator while playing */}
            {isPlaying && !isFinished && (
              <div className="flex items-center space-x-2 text-xs text-slate-400 italic p-2 bg-white/[0.02] rounded-xl w-max">
                <span className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
                <span>Agents are actively conversing...</span>
              </div>
            )}

            <div ref={transcriptEndRef} />
          </div>

          {/* Date Finished Banner */}
          {isFinished && (
            <div className="p-3 bg-gradient-to-r from-emerald-950/40 via-teal-950/40 to-slate-900 border-t border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">Date Completed! Both agents have filed their post-date debrief.</span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Replay from start
              </button>
            </div>
          )}
        </div>

        {/* Right 4 cols: Live Chemistry & Post-Date Verdicts */}
        <div className="lg:col-span-4 space-y-4">
          {/* Real-time Chemistry Gauges */}
          <div className="bg-[#10121d] rounded-3xl border border-white/10 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Live Date Chemistry</span>
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                {activeDate?.metrics?.overallChemistry || 0}% Match
              </span>
            </div>

            {/* Chemistry Gauges Breakdown */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                  <span>Intellectual Spark</span>
                  <span className="text-cyan-400 font-bold">{activeDate?.metrics?.intellectualSpark || 0}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-cyan-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${activeDate?.metrics?.intellectualSpark || 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                  <span>Banter & Humor Rapport</span>
                  <span className="text-rose-400 font-bold">{activeDate?.metrics?.banterRapport || 0}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-rose-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${activeDate?.metrics?.banterRapport || 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                  <span>Emotional Depth & Safety</span>
                  <span className="text-purple-400 font-bold">{activeDate?.metrics?.emotionalDepth || 0}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${activeDate?.metrics?.emotionalDepth || 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                  <span>Values & Lifestyle Harmony</span>
                  <span className="text-emerald-400 font-bold">{activeDate?.metrics?.valuesAlignment || 0}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${activeDate?.metrics?.valuesAlignment || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 text-[11px] text-slate-400">
              💡 Metrics are evaluated continuously across conversational turns based on needs resonance, hobby overlap, and psychological safety.
            </div>
          </div>

          {/* Post-Date Verdicts Card */}
          {activeDate?.debrief && (
            <div className="bg-[#10121d] rounded-3xl border border-white/10 p-5 shadow-xl space-y-4">
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Agent Debrief & Verdict</span>
              </div>

              {/* Agent A Verdict */}
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <div className="flex items-center justify-between text-xs font-bold text-rose-300 mb-1">
                  <span>{selectedAgentA.name}'s Agent</span>
                  <span className="text-amber-300">⭐ {activeDate.debrief.agentAVerdict.score}/10</span>
                </div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-200 mb-1.5">
                  {activeDate.debrief.agentAVerdict.decision}
                </span>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{activeDate.debrief.agentAVerdict.reflection}"
                </p>
              </div>

              {/* Agent B Verdict */}
              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center justify-between text-xs font-bold text-purple-300 mb-1">
                  <span>{selectedAgentB.name}'s Agent</span>
                  <span className="text-amber-300">⭐ {activeDate.debrief.agentBVerdict.score}/10</span>
                </div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-200 mb-1.5">
                  {activeDate.debrief.agentBVerdict.decision}
                </span>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{activeDate.debrief.agentBVerdict.reflection}"
                </p>
              </div>

              {/* Match Summary */}
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-slate-300">
                <span className="font-bold text-slate-200 block mb-1">Overall Match Assessment:</span>
                <p className="leading-relaxed">{activeDate.debrief.matchSummary}</p>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={() => onViewRankings(selectedAgentA.id)}
                  className="flex-1 py-2 text-center text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl transition-colors"
                >
                  {selectedAgentA.name}'s Full Rankings
                </button>
                <button
                  onClick={() => onViewRankings(selectedAgentB.id)}
                  className="flex-1 py-2 text-center text-xs font-semibold text-purple-400 hover:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 rounded-xl transition-colors"
                >
                  {selectedAgentB.name}'s Full Rankings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
