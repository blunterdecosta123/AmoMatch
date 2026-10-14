import React, { useState } from 'react';
import { X, Sparkles, Link2, ExternalLink, CheckCircle2, Loader2, ShieldCheck, Heart, AlertCircle } from 'lucide-react';
import { scrapeAndAnalyzePerson } from '../services/scraperService';

export default function AddPersonModal({ onClose, onPersonAdded }) {
  const [name, setName] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [apifyToken, setApifyToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const steps = [
    "Validating official public links...",
    "Scraping public LinkedIn profile (career, industry, achievements)...",
    "Scraping public Instagram profile (visual life, downtime, captions)...",
    "Agent reading person: analyzing needs, hobbies, interests & qualities...",
    "Synthesizing dating persona & deploying agent into dating pool..."
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage("Please enter the person's name.");
      return;
    }

    if (!linkedinUrl.includes('linkedin.com')) {
      setErrorMessage("Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/username).");
      return;
    }

    if (!instagramUrl.includes('instagram.com')) {
      setErrorMessage("Please enter a valid public Instagram profile URL (e.g., https://www.instagram.com/username).");
      return;
    }

    setLoading(true);
    setCurrentStep(0);

    try {
      // Step interval simulation for clear visual feedback
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < steps.length - 1) return prev + 1;
          return prev;
        });
      }, 700);

      const newProfile = await scrapeAndAnalyzePerson({
        name: name.trim(),
        linkedinUrl: linkedinUrl.trim(),
        instagramUrl: instagramUrl.trim(),
        apifyToken: apifyToken.trim() || null
      });

      clearInterval(stepInterval);
      setCurrentStep(steps.length - 1);

      setTimeout(() => {
        setLoading(false);
        onPersonAdded(newProfile);
      }, 600);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || "Failed to scrape and analyze profile. Please verify the links.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#111320] rounded-3xl border border-white/15 shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>Add Real Person & Deploy Agent</span>
        </div>
        <h2 className="text-2xl font-black text-white">
          Input The Two Official Links
        </h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Provide a real person's public LinkedIn profile and public Instagram profile. The agent will read both, analyze needs, hobbies, interests, and other qualities, and deploy an agent to date on their behalf.
        </p>

        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {loading ? (
          <div className="my-8 space-y-5">
            <div className="flex items-center justify-center py-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-rose-500/20 border-t-rose-500 animate-spin"></div>
                <Heart className="w-6 h-6 text-rose-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
            </div>

            <div className="space-y-2.5">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 text-xs p-2.5 rounded-xl transition-all ${
                    idx === currentStep
                      ? 'bg-rose-500/15 border border-rose-500/30 text-rose-200 font-semibold'
                      : idx < currentStep
                      ? 'bg-white/[0.02] text-emerald-400'
                      : 'text-slate-600'
                  }`}
                >
                  {idx < currentStep ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : idx === currentStep ? (
                    <Loader2 className="w-4 h-4 text-rose-400 animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0"></div>
                  )}
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Person's Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Katherine Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Official Public LinkedIn URL</span>
                <span className="text-[10px] text-cyan-400 font-medium">Source 1 of 2</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://www.linkedin.com/in/username"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Official Public Instagram URL</span>
                <span className="text-[10px] text-pink-400 font-medium">Source 2 of 2</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://www.instagram.com/username"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            {/* Optional Apify Token toggle */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowTokenInput(!showTokenInput)}
                className="text-[11px] text-slate-400 hover:text-slate-200 underline"
              >
                {showTokenInput ? '- Hide advanced Apify settings' : '+ Optional: Use custom Apify API token'}
              </button>

              {showTokenInput && (
                <div className="mt-2 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Apify API Token (Optional)
                  </label>
                  <input
                    type="password"
                    placeholder="apify_api_..."
                    value={apifyToken}
                    onChange={(e) => setApifyToken(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    If omitted, the built-in resilient scraper engine extracts public social metadata automatically.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-lg shadow-rose-500/25 transition-all"
              >
                Scrape, Analyze & Deploy Agent
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
