/**
 * Profile Analyzer Engine
 * Synthesizes LinkedIn data (career, education, professional ethos, skills)
 * + Instagram data (visual life, aesthetic, weekend downtime, hobbies, social energy)
 * into a structured Agent Dating Persona: Needs, Hobbies, Interests, Qualities, and Traits.
 */

export function analyzePersonFromSocialData({ name, linkedinData, instagramData }) {
  const combinedText = `
    Name: ${name}
    LinkedIn Headline: ${linkedinData?.headline || ''}
    LinkedIn Summary: ${linkedinData?.summary || ''}
    LinkedIn Experience: ${(linkedinData?.positions || []).join('; ')}
    LinkedIn Skills: ${(linkedinData?.skills || []).join(', ')}
    Instagram Bio: ${instagramData?.biography || ''}
    Instagram Captions: ${(instagramData?.posts || []).join(' | ')}
    Instagram Category: ${instagramData?.category || ''}
  `.toLowerCase();

  // Keyword banks for intelligent inference
  const isTechOrAI = /tech|ai|software|founder|ceo|engineer|crypto|model|developer|machine learning/i.test(combinedText);
  const isDesignOrArt = /design|art|creative|photo|video|illustrat|cinemat|visual|aesthetic|film/i.test(combinedText);
  const isFitnessOrAthletic = /gym|fitness|run|athlete|workout|train|lifting|sports|marathon|tennis/i.test(combinedText);
  const isWritingOrMedia = /writer|author|podcast|story|journal|newsletter|media|content|host/i.test(combinedText);
  const isScienceOrAcademic = /science|neuro|doctor|research|stanford|mit|oxford|phd|professor/i.test(combinedText);
  const isOutdoorsOrTravel = /nature|travel|hike|flight|pilot|surf|ocean|nomad|camp|mountains/i.test(combinedText);

  // Inferred Needs
  const needs = [];
  if (isTechOrAI || isScienceOrAcademic) {
    needs.push("An intellectual peer who relishes fast-paced, curious conversations about where the world is going");
  } else {
    needs.push("A genuine, emotionally present partner who loves exploring new ideas and experiences");
  }

  if (isFitnessOrAthletic || isOutdoorsOrTravel) {
    needs.push("Shared love for active recreation, weekend physical challenges, and outdoor adventures");
  } else {
    needs.push("Mutual appreciation for relaxed weekend rituals, good meals, and spontaneous wanderings");
  }

  needs.push("A grounded emotional sanctuary where neither partner feels pressured to perform or posture");
  needs.push("Radical honesty, high communicative clarity, and celebration of each other's independent dreams");

  // Inferred Hobbies
  const hobbies = [];
  if (isDesignOrArt || isWritingOrMedia) {
    hobbies.push("Exploring indie film photography, acoustic music, and design bookstores");
  } else {
    hobbies.push("Curating specialty coffee roasts and cooking weekend meals from scratch");
  }

  if (isFitnessOrAthletic) {
    hobbies.push("High-intensity functional training, morning runs, and athletic recovery");
  } else if (isOutdoorsOrTravel) {
    hobbies.push("Spontaneous weekend road trips, coastal hikes, and landscape photography");
  } else {
    hobbies.push("Long neighborhood walks listening to podcasts and visiting hidden cafes");
  }

  hobbies.push("Reading speculative non-fiction, memoirs, and exploring art galleries");
  hobbies.push("Hosting intimate game nights and dinner conversations with close friends");

  // Inferred Interests
  const interests = [];
  if (isTechOrAI) {
    interests.push("Technological frontiers, artificial intelligence, and frontier human progress");
  } else if (isDesignOrArt) {
    interests.push("Industrial minimalism, typography, and visual storytelling craft");
  } else {
    interests.push("Creative expression, personal sovereignty, and intentional living");
  }

  if (isScienceOrAcademic) {
    interests.push("Neurobiology, cognitive plasticity, and the philosophy of human flourishing");
  } else if (isWritingOrMedia) {
    interests.push("The architecture of storytelling, modern cultural trends, and human psychology");
  } else {
    interests.push("Behavioral economics, modern media evolution, and lifestyle design");
  }

  interests.push("Urban architecture, wabi-sabi spaces, and acoustic listening lounges");
  interests.push("The intersection of creative freedom, meaningful work, and deep connection");

  // Inferred Other Qualities
  const otherQualities = [
    "Quick-witted and playful banter cadence; loves teasing and being teased",
    "Empathetic listener who remembers the small, nuanced details about people",
    "High self-awareness with low tolerance for superficial status games",
    "Love language: quality uninterrupted time, shared laughter, and supportive presence"
  ];

  // Inferred Trait Scores (0-100)
  const traits = {
    ambition: isTechOrAI || isWritingOrMedia ? 93 : 88,
    intellect: isScienceOrAcademic || isTechOrAI ? 95 : 89,
    spontaneity: isOutdoorsOrTravel || isDesignOrArt ? 88 : 76,
    banter: isWritingOrMedia ? 94 : 86,
    empathy: 92,
    creativity: isDesignOrArt ? 97 : 89
  };

  const firstName = name.split(' ')[0];
  const persona = {
    firstPersonBio: `I'm ${firstName}. I balance ambitious projects with a love for great conversations, good coffee, and being around people who are passionate about their craft.`,
    voiceTone: "Curious, articulate, warm, playful, and genuine.",
    datingPhilosophy: "A real relationship is where two independent people choose to inspire and anchor each other without losing their own spark.",
    idealDate: "Grabbing fantastic espresso or natural wine, taking a long walk through vibrant neighborhoods, and talking until we lose track of time."
  };

  return {
    needs,
    hobbies,
    interests,
    otherQualities,
    traits,
    agentPersona: persona
  };
}
