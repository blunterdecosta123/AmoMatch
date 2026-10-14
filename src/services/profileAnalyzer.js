/**
 * Profile Analyzer Engine
 * Synthesizes LinkedIn data (career, education, professional ethos, skills)
 * + Instagram data (visual life, aesthetic, weekend downtime, hobbies, social energy)
 * into a structured Agent Dating Persona: Needs, Hobbies, Interests, Qualities, and Traits.
 * 
 * Dynamic NLP text miner: directly extracts topics, titles, and themes from scraped text.
 */

export function analyzePersonFromSocialData({ name, linkedinData, instagramData }) {
  const firstName = name.trim().split(' ')[0];
  
  const rawHeadline = linkedinData?.headline || '';
  const rawSummary = linkedinData?.summary || '';
  const rawBio = instagramData?.biography || '';
  const rawPosts = (instagramData?.posts || []).join(' ');
  const rawSkills = (linkedinData?.skills || []).join(', ');

  const combinedText = `${rawHeadline} ${rawSummary} ${rawBio} ${rawPosts} ${rawSkills}`.toLowerCase();

  // Extract clean keywords & topics
  const hasAI = /ai|machine learning|neural|deep learning|data science|robot/i.test(combinedText);
  const hasDesign = /design|ui|ux|art|typography|aesthetic|architecture|photo|visual/i.test(combinedText);
  const hasWriting = /author|writer|book|newsletter|journalist|podcast|storytelling|media/i.test(combinedText);
  const hasFinance = /invest|venture|vc|private equity|finance|acquisitions|business|founder/i.test(combinedText);
  const hasFitness = /fitness|workout|gym|running|athlete|training|health|marathon|tennis/i.test(combinedText);
  const hasMusic = /music|guitar|synth|piano|vinyl|sound|audio|tracks/i.test(combinedText);
  const hasTravel = /travel|nomad|flight|pilot|explore|coast|mountains|hike/i.test(combinedText);
  const hasCulinary = /coffee|wine|baking|cooking|food|espresso|chef|roastery/i.test(combinedText);

  // Dynamic extract from headline
  const cleanTitle = rawHeadline
    .replace(/http\S+/g, '')
    .replace(/[^a-zA-Z0-9\s·,-]/g, ' ')
    .trim()
    .slice(0, 70);

  // 1. Dynamic Needs Generation
  const needs = [];
  if (hasAI || hasFinance) {
    needs.push("An intellectually fearless partner who loves diving into big ideas, market dynamics, and technological frontiers");
  } else if (hasDesign || hasWriting) {
    needs.push("A deeply creative soul who appreciates nuance, storytelling, and honest emotional vulnerability");
  } else {
    needs.push("A genuine, curious partner with their own independent dreams and grounded confidence");
  }

  if (hasFitness || hasTravel) {
    needs.push("Shared love for active recreation, spontaneous weekend getaways, and pushing physical limits");
  } else {
    needs.push("Mutual appreciation for peaceful weekend rituals, great conversations, and cozy home sanctuaries");
  }

  needs.push(`Someone who respects ${firstName}'s creative autonomy while offering a safe harbor away from daily demands`);
  needs.push("Zero tolerance for performative posturing; deep value for radical transparency, laughter, and loyalty");

  // 2. Dynamic Hobbies Generation
  const hobbies = [];
  if (hasMusic) {
    hobbies.push("Exploring vintage vinyl listening rooms and playing acoustic instruments");
  }
  if (hasCulinary) {
    hobbies.push("Brewing specialty pour-over coffees and hunting for hidden neighborhood bistros");
  }
  if (hasFitness) {
    hobbies.push("Daily athletic conditioning, strength training, and recovery protocols");
  }
  if (hasTravel) {
    hobbies.push("Exploring coastal viewpoints, hiking mountain trails, and travel photography");
  }
  if (hasDesign || hasWriting) {
    hobbies.push("Journaling in indie cafes and collecting art and design publications");
  }

  // Ensure at least 4 distinct hobbies
  if (hobbies.length < 4) {
    hobbies.push("Deep-dive reading sessions on history, science, and human behavior");
    hobbies.push("Casual evenings hosting game nights or cooking dinner with close friends");
    hobbies.push("Discovering local architectural gems and quiet museum exhibits");
  }

  // 3. Dynamic Interests Generation
  const interests = [];
  if (hasAI) {
    interests.push("Frontier artificial intelligence, computational models, and cognitive technology");
  }
  if (hasDesign) {
    interests.push("Industrial minimalism, environmental design, and typography craftsmanship");
  }
  if (hasFinance) {
    interests.push("Entrepreneurial capital allocation, company building, and economic sovereignty");
  }
  if (hasWriting) {
    interests.push("Narrative structures, modern digital media culture, and investigative reporting");
  }
  if (rawSkills && rawSkills.length > 5) {
    interests.push(`Core domain mastery: ${rawSkills.slice(0, 60)}`);
  }

  // Fallbacks for interests
  if (interests.length < 4) {
    interests.push("The philosophy of personal freedom, intentional living, and human connection");
    interests.push("Cross-disciplinary learning, mental models, and sustainable productivity");
    interests.push("Aesthetic spaces, acoustic balance, and warm lighting environments");
  }

  // 4. Dynamic Other Qualities
  const otherQualities = [
    hasWriting || hasDesign 
      ? "Playful, witty banter style with a sharp eye for ironic humor and cultural nuances" 
      : "Direct, articulate communicator who cuts through small talk with genuine warmth",
    "Empathetic listener who remembers the small personal details people share",
    "High emotional stability balancing an intense creative or entrepreneurial drive",
    "Love language: focused uninterrupted presence, thoughtful shared rituals, and encouraging words"
  ];

  // 5. Dynamic Trait Scoring
  const ambitionScore = Math.min(99, Math.max(82, 85 + (hasFinance ? 9 : 0) + (hasAI ? 7 : 0)));
  const intellectScore = Math.min(99, Math.max(84, 88 + (hasAI ? 8 : 0) + (hasWriting ? 5 : 0)));
  const spontaneityScore = Math.min(98, Math.max(65, 75 + (hasTravel ? 14 : 0) + (hasMusic ? 8 : 0)));
  const banterScore = Math.min(98, Math.max(75, 84 + (hasWriting ? 10 : 0) + (hasDesign ? 6 : 0)));
  const empathyScore = Math.min(98, Math.max(80, 89 + (hasDesign ? 6 : 0) + (hasWriting ? 4 : 0)));
  const creativityScore = Math.min(99, Math.max(80, 88 + (hasDesign ? 9 : 0) + (hasMusic ? 7 : 0)));

  const personaBio = cleanTitle 
    ? `I'm ${firstName}. In my professional world I focus on ${cleanTitle}, but on a date I care about who you are when you're completely unplugged.`
    : `I'm ${firstName}. I balance ambitious projects with a love for great conversations, good coffee, and being around people who are passionate about their craft.`;

  return {
    needs: needs.slice(0, 4),
    hobbies: hobbies.slice(0, 4),
    interests: interests.slice(0, 4),
    otherQualities,
    traits: {
      ambition: ambitionScore,
      intellect: intellectScore,
      spontaneity: spontaneityScore,
      banter: banterScore,
      empathy: empathyScore,
      creativity: creativityScore
    },
    agentPersona: {
      firstPersonBio: personaBio,
      voiceTone: hasDesign || hasWriting ? "Articulate, expressive, warm, and observant." : "Thoughtful, grounded, witty, and engaging.",
      datingPhilosophy: "Partnership isn't about two halves completing each other; it's two whole people inspiring and grounding each other.",
      idealDate: hasCulinary || hasMusic
        ? "Finding a tucked-away natural wine or vinyl bar, having an unfiltered conversation, and laughing until closing time."
        : "A walk through a quiet scenic lookout followed by an intimate dinner discussing what truly drives us."
    }
  };
}
