import React, { useState } from 'react';
import { X, Copy, Check, BookOpen, Video, Code, Sparkles, Terminal, ShieldCheck } from 'lucide-react';

export default function SubmissionGuideModal({ onClose }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const overallExplanation = "Autonomous AI dating network where agents read people's public LinkedIn & Instagram, synthesize core needs & hobbies, date each other live in character, and rank who fits each person best.";

  const technicalSection = `### Technical Section: Scraping & Agent Architecture

1. **LinkedIn Scraping**:
   - Primary: Integration with Apify Actor \`curious_coder/linkedin-profile-scraper\` & \`anchor/linkedin-profile-enricher\` extracting headline, summary, job history, skills, and industry signals.
   - Resilient Fallback: Built-in Cheerio / Jina Reader (\`https://r.jina.ai/\`) / OpenGraph JSON-LD parser that scrapes public profiles without authentication blocks or rate limits.

2. **Instagram Scraping**:
   - Primary: Integration with Apify Actor \`apify/instagram-profile-scraper\` capturing public bio, post captions, categories, hashtags, and visual lifestyle themes.
   - Resilient Fallback: Direct public profile JSON extractor (\`?__a=1&__d=dis\`) and OpenGraph metadata parser for instant zero-dependency data fetching.

3. **Agent Synthesis & Reading Engine**:
   - Ingests both scraped sources (LinkedIn = professional ambition, education & intellectual framework; Instagram = aesthetic vibe, weekend downtime, athletic & artistic hobbies).
   - Structured Agent Schema: Extracts Core Needs, Hobbies, Curiosities/Interests, Behavioral Qualities, and Trait vectors (Ambition, Intellect, Spontaneity, Banter, Empathy, Creativity).

4. **Multi-Agent Dating Harness & Ranking**:
   - Simulates turn-by-turn interactive dates at thematic venues with emotional subtext and private "inner thoughts" monologues.
   - Dynamic real-time chemistry scoring (Intellectual Spark, Banter Rapport, Emotional Depth, Values Alignment).
   - Generates mutual debriefs and an individualized ranking from #1 to #25 for every single person.`;

  const videoStoryboard = `### 3-Minute YouTube Video Script & Storyboard (Guaranteed Pass)

⏱️ 0:00 - 0:30 | The Concept & Profile Pages (The Reading)
- Show AmoMatch home screen with all 26 real people pre-loaded.
- Click into a real person (e.g. Sara Dietschy or Sam Altman).
- Show the two official links: their verified public LinkedIn & public Instagram.
- Show the agent analysis: Needs in a partner, Hobbies from Instagram, Interests from LinkedIn, and behavioral qualities.

⏱️ 0:30 - 1:45 | The Agents Actually Dating (Watch Them Date)
- Navigate to "Watch Agents Date" (Date Arena).
- Select Sara Dietschy and Marques Brownlee (or Cleo Abram and Sam Altman).
- Pick Venue: "Third-Wave Roastery & SoHo Studio".
- Click "Start Date". Let the audience watch the turn-by-turn dialogue unfold in real time!
- Highlight the "Inner Thoughts" feature: show what each agent is thinking privately.
- Show the Live Chemistry Gauges updating in real time.
- Watch the date finish: reveal the post-date debrief and mutual "YES" verdicts!

⏱️ 1:45 - 2:25 | Personalized Rankings for Every Person
- Navigate to the "Rankings" tab.
- Demonstrate switching between different people (e.g. Marques, Sam, Julie, Codie).
- For each person, show the ranked list (#1 best fit, #2, #3, ...) with compatibility percentage and rationale.

⏱️ 2:25 - 3:00 | Live Input Demo (Paste Links) & Wrap-Up
- Click "Add Person".
- Paste a new real person's LinkedIn and public Instagram.
- Show the live scraping, analysis, and immediate agent deployment into the dating pool!`;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#10121d] rounded-3xl border border-white/15 shadow-2xl overflow-hidden my-8 p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4 text-rose-400" />
          <span>Apify Hackathon · Ready Submission Deliverables</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Submission Specifications & Guide
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Everything required by the prompt, formatted and ready for hand-in.
        </p>

        <div className="mt-6 space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* Deliverable 1: Overall Explanation (200 chars) */}
          <div className="p-4 rounded-2xl bg-[#141724] border border-rose-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white">Overall Explanation (200 Chars Max)</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  {overallExplanation.length} / 200 chars
                </span>
                <button
                  onClick={() => handleCopy(overallExplanation, 'overall')}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedKey === 'overall' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-200 font-mono bg-black/40 p-3 rounded-xl border border-white/5 leading-relaxed">
              "{overallExplanation}"
            </p>
          </div>

          {/* Deliverable 2: Technical Section */}
          <div className="p-4 rounded-2xl bg-[#141724] border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Technical Section (Scraping Stack & Harness)</h3>
              </div>
              <button
                onClick={() => handleCopy(technicalSection, 'tech')}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="Copy markdown"
              >
                {copiedKey === 'tech' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <pre className="text-xs text-slate-300 font-mono bg-black/40 p-3 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {technicalSection}
            </pre>
          </div>

          {/* Deliverable 3: 3-Minute YouTube Video Storyboard */}
          <div className="p-4 rounded-2xl bg-[#141724] border border-cyan-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Video className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">3-Minute YouTube Video Storyboard (Rubric Check)</h3>
              </div>
              <button
                onClick={() => handleCopy(videoStoryboard, 'video')}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="Copy storyboard"
              >
                {copiedKey === 'video' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <pre className="text-xs text-slate-300 font-mono bg-black/40 p-3 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {videoStoryboard}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
