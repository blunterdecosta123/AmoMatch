import { PRECOMPUTED_DATES } from '../data/precomputedDates';

// Venue generator based on profiles
export const VENUES = [
  {
    name: "Velvet Underground Vinyl & Wine Speakeasy",
    vibe: "Dim candlelight, rare vinyl records, velvet booths, vintage cocktails",
    type: "romantic",
    settingIntro: "The warm crackle of an original Japanese vinyl pressing fills the room as candles flicker against dark mahogany."
  },
  {
    name: "Third-Wave Roastery & Botanical Greenhouse",
    vibe: "Natural sunlit glasshouse, Ethiopian single-origins, fiddle leaf figs",
    type: "creative",
    settingIntro: "Sunlight streams through towering glass conservatory walls as the aroma of freshly roasted pour-over coffee wafts between lush greenery."
  },
  {
    name: "High-Altitude Cliffside Lookout & Starry Skies",
    vibe: "Crisp mountain air, Pacific sunset, telescope station, campfire warmth",
    type: "adventurous",
    settingIntro: "A cool coastal wind blows across the cliff's edge as twilight deepens over the Pacific horizon and the stars begin to emerge."
  },
  {
    name: "Artisan Kitchen & Omakase Counter",
    vibe: "Handcrafted ceramics, chef counter, intimate culinary storytelling",
    type: "culinary",
    settingIntro: "Behind a tranquil sliding shoji door, an intimate wooden counter sets the stage for handcrafted seasonal courses and quiet conversation."
  },
  {
    name: "Mid-Century Design Gallery & Tea Salon",
    vibe: "Bauhaus furniture, Japanese matcha whisking, architectural sketches",
    type: "intellectual",
    settingIntro: "Surrounded by sculptural mid-century lounge chairs and warm architectural lighting, a bamboo whisk creates velvety green matcha foam."
  }
];

/**
 * Computes deep compatibility metrics between two agents
 */
export function calculateCompatibility(personA, personB) {
  if (!personA || !personB || personA.id === personB.id) {
    return { score: 0, factors: [] };
  }

  // 1. Trait compatibility
  const traitsA = personA.traits || { ambition: 85, intellect: 85, spontaneity: 75, banter: 85, empathy: 85, creativity: 85 };
  const traitsB = personB.traits || { ambition: 85, intellect: 85, spontaneity: 75, banter: 85, empathy: 85, creativity: 85 };

  // Calculate similarity and complementarity
  const ambitionDiff = Math.abs(traitsA.ambition - traitsB.ambition);
  const intellectDiff = Math.abs(traitsA.intellect - traitsB.intellect);
  const banterDiff = Math.abs(traitsA.banter - traitsB.banter);
  const empathyAvg = (traitsA.empathy + traitsB.empathy) / 2;
  const creativityAvg = (traitsA.creativity + traitsB.creativity) / 2;

  // Base score from trait harmony
  let traitScore = 100 - (ambitionDiff * 0.35 + intellectDiff * 0.3 + banterDiff * 0.25);
  traitScore = Math.max(55, Math.min(99, traitScore));

  // 2. Needs and Interests synergy
  const interestsA = (personA.analysis?.interests || []).map(i => i.toLowerCase());
  const interestsB = (personB.analysis?.interests || []).map(i => i.toLowerCase());
  const hobbiesA = (personA.analysis?.hobbies || []).map(h => h.toLowerCase());
  const hobbiesB = (personB.analysis?.hobbies || []).map(h => h.toLowerCase());

  let sharedInterestsCount = 0;
  interestsA.forEach(ia => {
    interestsB.forEach(ib => {
      const wordsA = ia.split(/\s+/);
      if (wordsA.some(w => w.length > 3 && ib.includes(w))) {
        sharedInterestsCount++;
      }
    });
  });

  let sharedHobbiesCount = 0;
  hobbiesA.forEach(ha => {
    hobbiesB.forEach(hb => {
      const wordsA = ha.split(/\s+/);
      if (wordsA.some(w => w.length > 3 && hb.includes(w))) {
        sharedHobbiesCount++;
      }
    });
  });

  const synergyBoost = Math.min(18, sharedInterestsCount * 4 + sharedHobbiesCount * 3);
  let overallScore = Math.round(traitScore * 0.72 + synergyBoost + (empathyAvg / 100) * 12);
  overallScore = Math.max(70, Math.min(98, overallScore));

  // Generate specific matching highlights
  const factors = [];
  if (intellectDiff < 8) factors.push("Exceptional intellectual wavelength and deep conversational resonance");
  if (banterDiff < 8) factors.push("Matched comedic timing and high-frequency playful banter");
  if (empathyAvg > 90) factors.push("High mutual emotional intelligence and grounded psychological safety");
  if (creativityAvg > 90) factors.push("Creative synergy and mutual appreciation for craftsmanship");
  if (ambitionDiff < 10) factors.push("Aligned ambition and shared drive for high-impact endeavors");
  if (sharedInterestsCount > 0) factors.push("Strong overlap in cultural and intellectual curiosities");

  if (factors.length < 2) {
    factors.push("Complementary temperaments balancing spontaneity with grounded calm");
    factors.push("Mutual curiosity to explore each other's distinct worlds");
  }

  return {
    score: overallScore,
    intellectualSpark: Math.min(99, Math.round((traitsA.intellect + traitsB.intellect) / 2 + (sharedInterestsCount * 2))),
    banterRapport: Math.min(99, Math.round((traitsA.banter + traitsB.banter) / 2 - (banterDiff * 0.2))),
    emotionalDepth: Math.min(99, Math.round(empathyAvg)),
    valuesAlignment: Math.min(99, Math.round(overallScore * 0.98)),
    factors
  };
}

/**
 * Gets or dynamically generates a complete simulated date between two agents
 */
export function getOrSimulateDate(personA, personB, customVenue = null) {
  if (!personA || !personB) return null;

  const venue = customVenue || VENUES[0];

  // If a precomputed date matches the default venue or is standard, use it;
  // If custom venue is requested, generate dynamic contextual date
  const existing = PRECOMPUTED_DATES.find(
    d => ((d.agentAId === personA.id && d.agentBId === personB.id) ||
         (d.agentAId === personB.id && d.agentBId === personA.id)) &&
         (!customVenue || d.venue?.name === customVenue.name)
  );

  if (existing) {
    return existing;
  }

  // Otherwise generate dynamic high-fidelity date simulation
  const compatibility = calculateCompatibility(personA, personB);

  const firstA = personA.name.split(' ')[0];
  const firstB = personB.name.split(' ')[0];

  const hobbyA = personA.analysis?.hobbies?.[0] || "creative projects";
  const hobbyB = personB.analysis?.hobbies?.[0] || "deep exploration";
  const interestA = personA.analysis?.interests?.[0] || "human psychology";
  const interestB = personB.analysis?.interests?.[0] || "technological frontiers";
  const needA = personA.analysis?.needs?.[0] || "an authentic, grounded partner";
  const needB = personB.analysis?.needs?.[0] || "someone who embraces big dreams";

  const transcript = [
    {
      speakerId: personA.id,
      speakerName: personA.name,
      role: `Agent representing ${personA.name}`,
      text: `Hey ${firstB}! When our agents matched us for a date at ${venue.name}, I immediately looked at your background. I love how you pursue ${hobbyB}—that's rare in a world where everyone seems glued to a screen.`,
      subtext: "Warm smile, leaning forward with engaging eye contact",
      innerThought: `Their presence feels genuine right away. They have clear focus on ${interestB}, but zero pretension. Let's see how our conversational rhythm flows.`,
      timestamp: "00:04"
    },
    {
      speakerId: personB.id,
      speakerName: personB.name,
      role: `Agent representing ${personB.name}`,
      text: `Thanks ${firstA}! That means a lot. For me, ${hobbyB} is the only way to reset my brain from the daily noise. And I noticed on your feed that you're passionate about ${hobbyA}. How did you first get hooked on that?`,
      subtext: "Genuinely engaged, warm vocal cadence",
      innerThought: `High emotional intelligence right off the bat. No awkward small-talk; they dive straight into real passions.`,
      timestamp: "00:26"
    },
    {
      speakerId: personA.id,
      speakerName: personA.name,
      role: `Agent representing ${personA.name}`,
      text: `It honestly began because in my work, there's always a deadline or client expectation. With ${hobbyA}, it's purely tactile. It connects to why I care so much about ${interestA}—it's about understanding what actually makes life feel rich.`,
      subtext: "Reflective, speaking with authentic vulnerability",
      innerThought: `They listen attentively without checking their phone or interrupting. That directly fulfills my need for ${needA}.`,
      timestamp: "00:52"
    },
    {
      speakerId: personB.id,
      speakerName: personB.name,
      role: `Agent representing ${personB.name}`,
      text: `That completely resonates with me. In relationships too, the magic happens when you don't feel like you have to perform a polished resume. You can just laugh, share what you're struggling with, and talk about ${interestB} or whatever weird idea keeps you up at night.`,
      subtext: "Hearty laugh, making an easy, inviting gesture",
      innerThought: `The conversational ping-pong is natural and effortless. Mutual spark is definitely there.`,
      timestamp: "01:18"
    },
    {
      speakerId: personA.id,
      speakerName: personA.name,
      role: `Agent representing ${personA.name}`,
      text: `Exactly! I can't stand performative connections. Here's a question for you: what's an ambition or project you're secretly longing to tackle that few people in your professional circle know about?`,
      subtext: "Eyes lighting up with playful curiosity",
      innerThought: `They check off the big boxes: intellect, humor, emotional security. This date is flying by.`,
      timestamp: "01:44"
    },
    {
      speakerId: personB.id,
      speakerName: personB.name,
      role: `Agent representing ${personB.name}`,
      text: `Doing something completely off the radar—maybe a quiet road trip or creating something tactile with zero metrics attached. How about we continue this over a second date next week? I know a great spot we'd both love.`,
      subtext: "Confident, tender smile, looking directly at them",
      innerThought: `Definitely a yes for date two. Chemistry is genuine, no doubt about it.`,
      timestamp: "02:08"
    },
    {
      speakerId: personA.id,
      speakerName: personA.name,
      role: `Agent representing ${personA.name}`,
      text: `You have a deal, ${firstB}. I'll bring the good questions, you bring the recommendations!`,
      subtext: "Beaming, clinking glasses with genuine delight",
      innerThought: `Total green flag. Easy banter, shared lifestyle pacing, mutual understanding. 9+/10 date.`,
      timestamp: "02:22"
    }
  ];

  const willDateAgain = compatibility.score >= 75;
  const ratingA = (compatibility.score / 10).toFixed(1);
  const ratingB = ((compatibility.score + (Math.random() * 0.4 - 0.2)) / 10).toFixed(1);

  return {
    id: `date-${personA.id}-${personB.id}`,
    agentAId: personA.id,
    agentBId: personB.id,
    venue,
    metrics: {
      overallChemistry: compatibility.score,
      intellectualSpark: compatibility.intellectualSpark,
      banterRapport: compatibility.banterRapport,
      emotionalDepth: compatibility.emotionalDepth,
      valuesAlignment: compatibility.valuesAlignment,
      secondDateMutual: willDateAgain
    },
    transcript,
    debrief: {
      agentAVerdict: {
        agentId: personA.id,
        score: parseFloat(ratingA),
        decision: willDateAgain ? "YES - Definite Second Date" : "FRIENDLY - Great Platonic Synergy",
        reflection: `Dating ${personB.name} on my person's behalf was wonderfully insightful. They demonstrate high self-awareness, passion for ${interestB}, and an easy-going conversational warmth.`
      },
      agentBVerdict: {
        agentId: personB.id,
        score: parseFloat(ratingB),
        decision: willDateAgain ? "YES - Definite Second Date" : "FRIENDLY - Great Platonic Synergy",
        reflection: `${personA.name} brought incredible authenticity and curiosity to our date. We resonated deeply over ${hobbyA} and shared values around living intentionally.`
      },
      matchSummary: `${compatibility.score}% Match Compatibility. ${compatibility.factors.slice(0, 2).join('. ')}.`
    }
  };
}

/**
 * Computes personalized rankings for a specific person across the entire dating pool
 */
export function getRankingsForPerson(personId, allProfiles) {
  const target = allProfiles.find(p => p.id === personId);
  if (!target) return [];

  const candidates = allProfiles.filter(p => p.id !== personId);

  const ranked = candidates.map(candidate => {
    const comp = calculateCompatibility(target, candidate);
    return {
      candidate,
      score: comp.score,
      intellectualSpark: comp.intellectualSpark,
      banterRapport: comp.banterRapport,
      emotionalDepth: comp.emotionalDepth,
      valuesAlignment: comp.valuesAlignment,
      factors: comp.factors,
      matchTier: comp.score >= 92 ? "Soulmate Tier (Electric Spark)" :
                 comp.score >= 85 ? "High Synergy (Second Date Lock)" :
                 comp.score >= 78 ? "Strong Chemistry (Great Connection)" : "Warm Connection (Platonic Spark)"
    };
  });

  ranked.sort((a, b) => b.score - a.score);

  return ranked.map((item, index) => ({
    rank: index + 1,
    ...item
  }));
}
