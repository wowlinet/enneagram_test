// Local hardcoded personality types data
export interface LocalPersonalityType {
  type_number: number;
  title: string;
  description: string;
  strengths: string[];
  growth_areas: string[];
  characteristics: {
    core_motivation: string;
    basic_fear: string;
  };
}

export interface LocalTestResult {
  id: string;
  user_id?: string;
  answers: number[];
  personality_type: number;
  scores: number[];
  confidence_score: number;
  created_at: string;
}

export const personalityTypes: LocalPersonalityType[] = [
  {
    type_number: 1,
    title: "The Perfectionist",
    description: "Principled, purposeful, self-controlled, and perfectionistic. They strive to improve everything around them and have a strong sense of right and wrong.",
    strengths: [
      "High standards and attention to detail",
      "Strong moral compass and integrity",
      "Organized and systematic approach",
      "Reliable and responsible",
      "Natural ability to improve systems"
    ],
    growth_areas: [
      "Tendency toward perfectionism and criticism",
      "Difficulty accepting 'good enough'",
      "Can be rigid and inflexible",
      "May suppress anger and resentment",
      "Overly critical of self and others"
    ],
    characteristics: {
      core_motivation: "To be good, right, perfect, and to improve everything; to be consistent with their ideals, to justify themselves, to be beyond criticism so as not to be condemned by anyone.",
      basic_fear: "Of being corrupt/evil, defective, or wrong; of being criticized, condemned, or punished."
    }
  },
  {
    type_number: 2,
    title: "The Helper",
    description: "Caring, interpersonal, demonstrative, generous, and people-pleasing. They focus on the needs of others and want to be loved and needed.",
    strengths: [
      "Empathetic and caring nature",
      "Excellent at reading others' needs",
      "Generous and giving",
      "Strong interpersonal skills",
      "Natural ability to support others"
    ],
    growth_areas: [
      "Difficulty recognizing own needs",
      "Tendency to manipulate through helping",
      "Can become resentful when unappreciated",
      "May neglect self-care",
      "Struggles with direct communication of needs"
    ],
    characteristics: {
      core_motivation: "To feel loved and wanted and to express their feelings for others; to be needed and appreciated, to get others to respond to them, to vindicate their claims about themselves.",
      basic_fear: "Of being unwanted, unworthy of being loved, of being thought worthless, needy, inconsequential, dispensable, or unworthy of love."
    }
  },
  {
    type_number: 3,
    title: "The Achiever",
    description: "Success-oriented, pragmatic, adaptive, driven, and image-conscious. They are motivated by the need to be valued and worthwhile.",
    strengths: [
      "Goal-oriented and productive",
      "Adaptable and flexible",
      "Confident and charismatic",
      "Excellent at motivating others",
      "Efficient and results-focused"
    ],
    growth_areas: [
      "May sacrifice authenticity for image",
      "Tendency to overwork and burn out",
      "Difficulty connecting with emotions",
      "Can be competitive and impatient",
      "May neglect relationships for success"
    ],
    characteristics: {
      core_motivation: "To feel valuable and worthwhile, to be affirmed, to distinguish themselves from others, to have attention (to be seen and admired), to be remembered, to ward off feelings of worthlessness.",
      basic_fear: "Of being worthless, without value apart from their achievements, of being ignored or insignificant, of being rejected for who they truly are."
    }
  },
  {
    type_number: 4,
    title: "The Individualist",
    description: "Expressive, dramatic, self-absorbed, and temperamental. They are motivated by the need to find themselves and their significance.",
    strengths: [
      "Deep emotional awareness",
      "Creative and artistic abilities",
      "Authentic and genuine",
      "Empathetic to others' pain",
      "Ability to find beauty in life"
    ],
    growth_areas: [
      "Tendency toward melancholy and moodiness",
      "May become self-absorbed",
      "Difficulty with routine and mundane tasks",
      "Can be envious of others",
      "May withdraw when hurt"
    ],
    characteristics: {
      core_motivation: "To find themselves and their significance (to create an identity); to express themselves and their individuality, to be beautiful, to attract a rescuer.",
      basic_fear: "That they have no identity or personal significance, of being flawed, defective, or insignificant."
    }
  },
  {
    type_number: 5,
    title: "The Investigator",
    description: "Intense, cerebral, perceptive, innovative, secretive, and isolated. They are motivated by the need to understand the world around them.",
    strengths: [
      "Deep thinking and analytical skills",
      "Independent and self-reliant",
      "Innovative and creative problem-solving",
      "Objective and unbiased perspective",
      "Ability to see patterns and connections"
    ],
    growth_areas: [
      "Tendency to withdraw and isolate",
      "May hoard time, energy, and resources",
      "Difficulty with emotional expression",
      "Can be detached from others",
      "May avoid action and commitment"
    ],
    characteristics: {
      core_motivation: "To be capable and competent, to understand the environment, to have everything figured out as a way of defending the self from threats from the environment.",
      basic_fear: "Of being useless, helpless, incapable, or invaded by others; of being overwhelmed by the needs of others."
    }
  },
  {
    type_number: 6,
    title: "The Loyalist",
    description: "Engaging, responsible, anxious, and suspicious. They are motivated by the need for security and support.",
    strengths: [
      "Loyal and committed",
      "Responsible and reliable",
      "Good at troubleshooting problems",
      "Strong team player",
      "Ability to anticipate potential issues"
    ],
    growth_areas: [
      "Tendency toward anxiety and worry",
      "May be overly suspicious or paranoid",
      "Difficulty trusting own judgment",
      "Can be reactive and defensive",
      "May seek excessive reassurance"
    ],
    characteristics: {
      core_motivation: "To have security, to feel supported by others, to have certitude and reassurance, to test the attitudes of others toward them, to fight against anxiety and insecurity.",
      basic_fear: "Of being without support or guidance, of being unable to survive on their own, of being targeted by aggression."
    }
  },
  {
    type_number: 7,
    title: "The Enthusiast",
    description: "Spontaneous, versatile, acquisitive, and scattered. They are motivated by the need to maintain happiness and avoid pain.",
    strengths: [
      "Optimistic and enthusiastic",
      "Versatile and adaptable",
      "Quick thinking and innovative",
      "Ability to see possibilities",
      "Energetic and inspiring to others"
    ],
    growth_areas: [
      "Tendency to avoid negative emotions",
      "May be scattered and unfocused",
      "Difficulty with commitment and follow-through",
      "Can be impulsive and impatient",
      "May escape into fantasy or planning"
    ],
    characteristics: {
      core_motivation: "To maintain their happiness and satisfaction, to preserve their freedom and happiness, to avoid missing out on worthwhile experiences.",
      basic_fear: "Of being trapped, deprived, or in pain; of missing out on something better."
    }
  },
  {
    type_number: 8,
    title: "The Challenger",
    description: "Self-confident, decisive, willful, and confrontational. They are motivated by the need to be self-reliant and in control.",
    strengths: [
      "Natural leadership abilities",
      "Direct and honest communication",
      "Protective of others",
      "Decisive and action-oriented",
      "Ability to handle conflict"
    ],
    growth_areas: [
      "Tendency to be controlling and dominating",
      "May be insensitive to others' feelings",
      "Difficulty showing vulnerability",
      "Can be impatient and aggressive",
      "May ignore own emotional needs"
    ],
    characteristics: {
      core_motivation: "To be self-reliant, to prove their strength and resist weakness, to be important in their world, to dominate the environment, and to stay in control of their situation.",
      basic_fear: "Of being controlled or vulnerable to others, of being harmed or controlled by others."
    }
  },
  {
    type_number: 9,
    title: "The Peacemaker",
    description: "Receptive, reassuring, agreeable, and complacent. They are motivated by the need to maintain inner and outer peace.",
    strengths: [
      "Natural mediator and peacemaker",
      "Accepting and supportive of others",
      "Stable and reassuring presence",
      "Ability to see multiple perspectives",
      "Creates harmony in relationships"
    ],
    growth_areas: [
      "Tendency toward procrastination and inaction",
      "May avoid conflict and difficult decisions",
      "Difficulty expressing own opinions",
      "Can be stubborn when pushed",
      "May neglect own needs and priorities"
    ],
    characteristics: {
      core_motivation: "To create harmony in their environment, to avoid conflicts and tension, to preserve things as they are, to resist whatever would upset or disturb them.",
      basic_fear: "Of loss and fragmentation, of annihilation, of being separated from the world."
    }
  }
];

// Store for test results (in a real app, this would be a database)
const testResults: LocalTestResult[] = [];

export function getPersonalityTypeByNumber(typeNumber: number): LocalPersonalityType | undefined {
  return personalityTypes.find(type => type.type_number === typeNumber);
}

export function saveTestResult(result: Omit<LocalTestResult, 'id' | 'created_at'>): LocalTestResult {
  const newResult: LocalTestResult = {
    ...result,
    id: generateUUID(),
    created_at: new Date().toISOString()
  };
  
  testResults.push(newResult);
  return newResult;
}

export function getTestResultById(id: string): LocalTestResult | undefined {
  return testResults.find(result => result.id === id);
}

// Simple UUID generator for demo purposes
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}