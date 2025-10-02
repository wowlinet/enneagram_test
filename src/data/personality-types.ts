// Local hardcoded personality types data
export interface LocalPersonalityType {
  type_number: number;
  title: string;
  description: string;
  strengths: string[];
  growth_areas: string[];
  characteristics: string[];
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
    characteristics: [
      "Driven by inner critic",
      "Focus on what's wrong or needs fixing",
      "Strong sense of responsibility",
      "Methodical and thorough",
      "Values excellence and quality"
    ]
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
    characteristics: [
      "Focus on others' emotions and needs",
      "Want to be needed and appreciated",
      "Difficulty saying no",
      "Pride in being helpful",
      "May ignore own feelings"
    ]
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
    characteristics: [
      "Driven by need for success and recognition",
      "Image-conscious and adaptable",
      "Focus on goals and achievements",
      "Competitive nature",
      "May struggle with authentic self-expression"
    ]
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
    characteristics: [
      "Focus on what's missing or lacking",
      "Rich inner emotional life",
      "Desire to be unique and special",
      "Sensitive to beauty and aesthetics",
      "May idealize the past or future"
    ]
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
    characteristics: [
      "Need for privacy and independence",
      "Focus on understanding and knowledge",
      "Minimal emotional expression",
      "Preference for observation over participation",
      "May feel drained by social interaction"
    ]
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
    characteristics: [
      "Focus on potential problems and threats",
      "Need for security and certainty",
      "Loyalty to groups and authorities",
      "May alternate between compliance and rebellion",
      "Tendency to seek guidance from others"
    ]
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
    characteristics: [
      "Focus on future possibilities and options",
      "Avoidance of pain and limitation",
      "High energy and enthusiasm",
      "Multiple interests and projects",
      "May struggle with depth and commitment"
    ]
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
    characteristics: [
      "Focus on power and control",
      "Direct and confrontational style",
      "Protective of the underdog",
      "High energy and intensity",
      "May struggle with showing weakness"
    ]
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
    characteristics: [
      "Focus on maintaining peace and harmony",
      "Avoidance of conflict and tension",
      "Tendency to merge with others",
      "Difficulty with self-assertion",
      "May struggle with prioritization"
    ]
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