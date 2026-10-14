import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import ProfileModal from './components/ProfileModal';
import DateArena from './components/DateArena';
import RankingsView from './components/RankingsView';
import AddPersonModal from './components/AddPersonModal';
import { INITIAL_PROFILES } from './data/initialProfiles';
import { Heart, Sparkles, Flame, Trophy, Search, PlusCircle, ExternalLink, RotateCcw } from 'lucide-react';

export default function App() {
  // Load initial profiles + any saved custom profiles from localStorage
  const [profiles, setProfiles] = useState(() => {
    try {
      const saved = localStorage.getItem('amomatch_custom_profiles');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...INITIAL_PROFILES];
        }
      }
    } catch (e) {
      console.warn("Could not read custom profiles from localStorage:", e);
    }
    return INITIAL_PROFILES;
  });

  const [activeTab, setActiveTab] = useState('profiles'); // 'profiles' | 'arena' | 'rankings'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Selections
  const [inspectedProfile, setInspectedProfile] = useState(null);
  const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);

  // Date Arena State
  const [selectedAgentA, setSelectedAgentA] = useState(INITIAL_PROFILES[2]); // Sara Dietschy
  const [selectedAgentB, setSelectedAgentB] = useState(INITIAL_PROFILES[1]); // Marques Brownlee

  // Rankings View State
  const [rankingsPersonId, setRankingsPersonId] = useState(INITIAL_PROFILES[0].id); // Sam Altman

  // Search filter
  const filteredProfiles = profiles.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.headline.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.analysis?.hobbies?.some(h => h.toLowerCase().includes(q)) ||
      p.analysis?.interests?.some(i => i.toLowerCase().includes(q))
    );
  });

  // Handlers
  const handleDateAgent = (profile) => {
    setSelectedAgentA(profile);
    const other = profiles.find(p => p.id !== profile.id) || profiles[0];
    setSelectedAgentB(other);
    setActiveTab('arena');
  };

  const handleViewRankings = (personId) => {
    setRankingsPersonId(personId);
    setActiveTab('rankings');
  };

  const handleWatchDateFromRankings = (personA, personB) => {
    setSelectedAgentA(personA);
    setSelectedAgentB(personB);
    setActiveTab('arena');
  };

  const handlePersonAdded = (newProfile) => {
    setProfiles(prev => {
      const updated = [newProfile, ...prev];
      try {
        const customOnly = updated.filter(p => p.id.startsWith('custom-'));
        localStorage.setItem('amomatch_custom_profiles', JSON.stringify(customOnly));
      } catch (e) {
        console.warn("Could not save to localStorage:", e);
      }
      return updated;
    });

    // Automatically set up Date Arena and Rankings for the new agent
    setSelectedAgentA(newProfile);
    setSelectedAgentB(INITIAL_PROFILES[0]);
    setRankingsPersonId(newProfile.id);

    setIsAddPersonModalOpen(false);
    setInspectedProfile(newProfile); // Open their profile page immediately!
  };

  const handleResetCustomProfiles = () => {
    if (window.confirm("Reset dating pool back to the 26 verified initial people?")) {
      localStorage.removeItem('amomatch_custom_profiles');
      setProfiles(INITIAL_PROFILES);
      setSelectedAgentA(INITIAL_PROFILES[2]);
      setSelectedAgentB(INITIAL_PROFILES[1]);
      setRankingsPersonId(INITIAL_PROFILES[0].id);
    }
  };

  const hasCustomProfiles = profiles.some(p => p.id.startsWith('custom-'));

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalProfiles={profiles.length}
        onAddPersonClick={() => setIsAddPersonModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* TAB 1: PROFILES & EXPLORE */}
        {activeTab === 'profiles' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-950/40 via-[#101220] to-purple-950/40 border border-white/10 p-6 sm:p-10 mb-8 shadow-2xl">
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The 25+ Real People Dating Network</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Each Person Is Represented by an Agent. <br />
                  <span className="gradient-text">The Agents Date Each Other.</span>
                </h1>
                <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed font-normal">
                  Every agent reads exactly two sources: their person's <strong className="text-white">public LinkedIn</strong> and <strong className="text-white">public Instagram</strong>. The agent analyzes needs, hobbies, interests, and other qualities—then goes out and dates on their behalf.
                </p>

                {/* Metric counters */}
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-white block">
                      {profiles.length}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Real People in Pool</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-rose-400 block">
                      {profiles.length * 2}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Official Links (LI + IG)</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-purple-400 block">
                      {Math.round((profiles.length * (profiles.length - 1)) / 2)}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Pairwise Date Matrices</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">
                      100%
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Autonomous Dating</span>
                  </div>
                </div>

                {/* Hero CTAs */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('arena')}
                    className="flex items-center space-x-2 px-5 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-lg shadow-rose-500/25 transition-all transform hover:-translate-y-0.5"
                  >
                    <Flame className="w-4 h-4 text-amber-300" />
                    <span>Watch Agents Date Live</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('rankings')}
                    className="flex items-center space-x-2 px-5 py-3 rounded-2xl font-bold text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                  >
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>View Rankings</span>
                  </button>
                  <button
                    onClick={() => setIsAddPersonModalOpen(true)}
                    className="flex items-center space-x-1.5 px-4 py-3 rounded-2xl font-semibold text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                  >
                    <PlusCircle className="w-4 h-4 text-rose-400" />
                    <span>Paste New Official Links</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, company, hobby, or interest..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#111320] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              <div className="flex items-center space-x-3 text-xs text-slate-400">
                {hasCustomProfiles && (
                  <button
                    onClick={handleResetCustomProfiles}
                    className="flex items-center space-x-1 text-slate-400 hover:text-rose-400 text-xs underline"
                    title="Clear added custom profiles"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to 26</span>
                  </button>
                )}
                <span>
                  Showing <strong className="text-white font-bold">{filteredProfiles.length}</strong> active agents
                </span>
              </div>
            </div>

            {/* Profile Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onInspect={(p) => setInspectedProfile(p)}
                  onDateThisAgent={handleDateAgent}
                  onViewRankings={handleViewRankings}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: AGENT DATE ARENA */}
        {activeTab === 'arena' && (
          <DateArena
            allProfiles={profiles}
            selectedAgentA={selectedAgentA}
            selectedAgentB={selectedAgentB}
            setSelectedAgentA={setSelectedAgentA}
            setSelectedAgentB={setSelectedAgentB}
            onViewProfile={(p) => setInspectedProfile(p)}
            onViewRankings={handleViewRankings}
          />
        )}

        {/* TAB 3: RANKINGS VIEW */}
        {activeTab === 'rankings' && (
          <RankingsView
            allProfiles={profiles}
            selectedPersonId={rankingsPersonId}
            onSelectPerson={setRankingsPersonId}
            onWatchDate={handleWatchDateFromRankings}
            onViewProfile={(p) => setInspectedProfile(p)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0c0e17] py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="font-semibold text-slate-300">AmoMatch · Autonomous Agentic Dating Platform</span>
          </div>
          <div>
            Built with Apify Actors for LinkedIn & Instagram Scraping + Multi-Agent Dialogue Harness
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {inspectedProfile && (
        <ProfileModal
          profile={inspectedProfile}
          onClose={() => setInspectedProfile(null)}
          onDateThisAgent={handleDateAgent}
          onViewRankings={handleViewRankings}
        />
      )}

      {isAddPersonModalOpen && (
        <AddPersonModal
          onClose={() => setIsAddPersonModalOpen(false)}
          onPersonAdded={handlePersonAdded}
        />
      )}
    </div>
  );
}
