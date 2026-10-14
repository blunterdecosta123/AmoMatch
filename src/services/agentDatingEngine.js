import { PRECOMPUTED_DATES } from '../data/precomputedDates';

// Venue generator based on profiles
export const VENUES = [
  {
    name: "Velvet Underground Vinyl & Wine Speakeasy",
    vibe: "Dim candlelight, rare vinyl records, velvet booths, vintage cocktails",
    type: "romantic"
  },
  {
    name: "Third-Wave Roastery & Botanical Greenhouse",
    vibe: "Natural sunlit glasshouse, Ethiopian single-origins, fiddle leaf figs",
    type: "creative"
  },
  {
    name: "High-Altitude Cliffside Lookout & Starry Skies",
    vibe: "Crisp mountain air, Pacific sunset, telescope station, campfire warmth",
    type: "adventurous"
  },
  {
    name: "Artisan Kitchen & Omakase Counter",
    vibe: "Handcrafted ceramics, chef counter, intimate culinary storytelling",
    type: "culinary"
  },
  {
    name: "Mid-Century Design Gallery & Tea Salon",
    vibe: "Bauhaus furniture, Japanese matcha whisking, architectural sketches",
    type: "intellectual"
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
  const traitsA = personA.traits || { ambition: 80, intellect: 80, spontaneity: 70, banter: 80, empathy: 80, creativity: 80 };
  const traitsB = personB.traits || { ambition: 80, intellect: 80, spontaneity: 70, banter: 80, empathy: 80, creativity: 80 };

  // Calculate similarity and complementarity
  const ambitionDiff = Math.abs(traitsA.ambition - traitsB.ambition);
  const intellectDiff = Math.abs(traitsA.intellect - traitsB.intellect);
  const banterDiff = Math.abs(traitsA.banter - traitsB.banter);
  const empathyAvg = (traitsA.empathy + traitsB.empathy) / 2;
  const creativityAvg = (traitsA.creativity + traitsB.creativity) / 2;

  // Base score from trait harmony
  let traitScore = 100 - (ambitionDiff * 0.4 + intellectDiff * 0.3 + banterDiff * 0.3);
  traitScore = Math.max(50, Math.min(99, traitScore));

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
  let overallScore = Math.round(traitScore * 0.75 + synergyBoost + (empathyAvg / 100) * 10);
  overallScore = Math.max(68, Math.min(98, overallScore));

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

  // Check precomputed dates first
  const existing = PRECOMPUTED_DATES.find(
    d => (d.agentAId === personA.id && d.agentBId === personB.id) ||
         (d.agentAId === personB.id && d.agentBId === personA.id)
  );

  if (existing) {
    return existing;
  }

  // Otherwise generate dynamic high-fidelity date simulation
  const compatibility = calculateCompatibility(personA, personB);
  const venue = customVenue || VENUES[Math.floor(Math.random() * VENUES.length)];

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
      text: `Hello ${personB.name.split(' ')[0]}! When our agents matched us for a date at ${venue.name}, I checked out your public profile. The way you approach ${hobbyB} is honestly refreshing.`,
      subtext: "Warm smile, leaning forward with engaging eye contact",
      innerThought: `Their profile really stood out to me. Strong focus on ${interestB}, but grounded. Let's see how they converse in person.`,
      timestamp: "00:05"
    },
    {
      speakerId: personB.id,
      speakerName: personB.name,
      role: `Agent representing ${personB.name}`,
      text: `Thanks ${personA.name.split(' ')[0]}! That means a lot. Most people just glance at the headlines, but the real heart of what I do is about curiosity. I noticed on your feed that you're deeply into ${hobbyA}—how did that become such a staple in your life?`,
      subtext: "Genuinely engaged, warm vocal cadence",
      innerThought: `High emotional intelligence right off the bat. No small-talk fluff; they dive straight into real passions.`,
      timestamp: "00:28"
    },
    {
      speakerId: personA.id,
      speakerName: personA.name,
      role: `Agent representing ${personA.name}`,
      text: `It really started because life gets so chaotic in our careers that you need an anchor. For me, ${hobbyA} gives me that flow state where you can't be distracted by notifications or expectations. It connects to why I value ${interestA} so much.`,
      subtext: "Reflective, speaking with authentic vulnerability",
      innerThought: `They listen attentively without interrupting. That directly satisfies my need for ${needA}.`,
      timestamp: "00:54"
    },
    {
      speakerId: personB.id,
      speakerName: personB.name,
      role: `Agent representing ${personB.name}`,
      text: `I completely relate to that flow state. In relationships too, the magic happens when you don't feel like you have to perform. You can just be yourself, share a laugh, and talk about ${interestB} or whatever weird idea is keeping you up at night.`,
      subtext: "Hearty laugh, making an easy, inviting gesture",
      innerThought: `The conversational ping-pong is natural and effortless. Mutual spark is definitely there.`,
      timestamp: "01:22"
    },
    {
      speakerId: personA.id,
      speakerName: personA.name,
      role: `Agent representing ${personA.name}`,
      text: `Exactly! Life is too short for performative relationships. Tell me—what's an adventure or project you're secretly longing to tackle next that few people know about?`,
      subtext: "Eyes lighting up with playful curiosity",
      innerThought: `They check off the big boxes: intellect, humor, emotional security. This date is flying by.`,
      timestamp: "01:46"
    },
    {
      speakerId: personB.id,
      speakerName: personB.name,
      role: `Agent representing ${personB.name}`,
      text: `Honestly? Doing something completely unplugged—maybe exploring quiet coastal trails or working side-by-side on something with zero client deadlines. How about we continue this conversation over a second date next week?`,
      subtext: "Confident, tender smile, looking directly at them",
      innerThought: `Definitely a yes for date two. Chemistry is genuine, no doubt about it.`,
      timestamp: "02:10"
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
