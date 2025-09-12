export interface Question {
  id: number;
  text: string;
  category: string;
}

export const questions: Question[] = [
  // Type 1 - The Perfectionist
  { id: 1, text: "I have high standards and expect things to be done correctly.", category: "perfectionist" },
  { id: 2, text: "I often notice what's wrong or could be improved in situations.", category: "perfectionist" },
  { id: 3, text: "I feel frustrated when things are disorganized or inefficient.", category: "perfectionist" },
  { id: 4, text: "I believe there's usually one right way to do things.", category: "perfectionist" },
  { id: 5, text: "I'm often critical of myself and others.", category: "perfectionist" },
  
  // Type 2 - The Helper
  { id: 6, text: "I enjoy helping others and making them feel good.", category: "helper" },
  { id: 7, text: "I often put others' needs before my own.", category: "helper" },
  { id: 8, text: "I like to be needed and appreciated by others.", category: "helper" },
  { id: 9, text: "I have difficulty saying no when people ask for help.", category: "helper" },
  { id: 10, text: "I'm good at reading people's emotions and needs.", category: "helper" },
  
  // Type 3 - The Achiever
  { id: 11, text: "I'm very goal-oriented and driven to succeed.", category: "achiever" },
  { id: 12, text: "I care about how others perceive me and my accomplishments.", category: "achiever" },
  { id: 13, text: "I'm competitive and like to be the best at what I do.", category: "achiever" },
  { id: 14, text: "I'm efficient and good at getting things done quickly.", category: "achiever" },
  { id: 15, text: "I sometimes sacrifice personal relationships for success.", category: "achiever" },
  
  // Type 4 - The Individualist
  { id: 16, text: "I often feel different or unique compared to others.", category: "individualist" },
  { id: 17, text: "I'm drawn to beauty, art, and authentic experiences.", category: "individualist" },
  { id: 18, text: "My emotions tend to be intense and changeable.", category: "individualist" },
  { id: 19, text: "I sometimes feel like something important is missing in my life.", category: "individualist" },
  { id: 20, text: "I value being authentic and true to myself.", category: "individualist" },
  
  // Type 5 - The Investigator
  { id: 21, text: "I prefer to observe and understand before taking action.", category: "investigator" },
  { id: 22, text: "I need plenty of alone time to recharge and think.", category: "investigator" },
  { id: 23, text: "I'm curious and enjoy learning about complex topics.", category: "investigator" },
  { id: 24, text: "I tend to be private and don't share personal information easily.", category: "investigator" },
  { id: 25, text: "I sometimes feel overwhelmed by others' emotional demands.", category: "investigator" },
  
  // Type 6 - The Loyalist
  { id: 26, text: "I tend to worry about potential problems and risks.", category: "loyalist" },
  { id: 27, text: "I value security, loyalty, and reliable relationships.", category: "loyalist" },
  { id: 28, text: "I often seek guidance and support from trusted authorities.", category: "loyalist" },
  { id: 29, text: "I can be suspicious of others' motives sometimes.", category: "loyalist" },
  { id: 30, text: "I'm committed and responsible in my relationships and work.", category: "loyalist" },
  
  // Type 7 - The Enthusiast
  { id: 31, text: "I love exploring new ideas, experiences, and possibilities.", category: "enthusiast" },
  { id: 32, text: "I tend to be optimistic and focus on positive outcomes.", category: "enthusiast" },
  { id: 33, text: "I get bored easily and like to keep my options open.", category: "enthusiast" },
  { id: 34, text: "I have many interests and projects going at once.", category: "enthusiast" },
  { id: 35, text: "I sometimes avoid dealing with negative emotions or situations.", category: "enthusiast" },
  
  // Type 8 - The Challenger
  { id: 36, text: "I'm direct and assertive in my communication style.", category: "challenger" },
  { id: 37, text: "I like to be in control and make decisions.", category: "challenger" },
  { id: 38, text: "I stand up for myself and others who are being treated unfairly.", category: "challenger" },
  { id: 39, text: "I'm comfortable with conflict and confrontation.", category: "challenger" },
  { id: 40, text: "I have strong opinions and am not afraid to express them.", category: "challenger" },
  
  // Type 9 - The Peacemaker
  { id: 41, text: "I prefer harmony and try to avoid conflict.", category: "peacemaker" },
  { id: 42, text: "I'm easygoing and can see multiple perspectives on issues.", category: "peacemaker" },
  { id: 43, text: "I sometimes have difficulty making decisions or taking action.", category: "peacemaker" },
  { id: 44, text: "I tend to go along with others to keep the peace.", category: "peacemaker" },
  { id: 45, text: "I'm a good mediator and can help others resolve conflicts.", category: "peacemaker" }
];

export const calculateEnneagramType = (answers: number[]): { type: number; scores: Record<string, number> } => {
  const typeScores: Record<string, number> = {
    perfectionist: 0,
    helper: 0,
    achiever: 0,
    individualist: 0,
    investigator: 0,
    loyalist: 0,
    enthusiast: 0,
    challenger: 0,
    peacemaker: 0
  };

  // Calculate scores for each type based on answers
  questions.forEach((question, index) => {
    const answer = answers[index] || 1;
    typeScores[question.category] += answer;
  });

  // Find the type with the highest score
  const typeMapping: Record<string, number> = {
    perfectionist: 1,
    helper: 2,
    achiever: 3,
    individualist: 4,
    investigator: 5,
    loyalist: 6,
    enthusiast: 7,
    challenger: 8,
    peacemaker: 9
  };

  const highestType = Object.entries(typeScores).reduce((a, b) => 
    typeScores[a[0]] > typeScores[b[0]] ? a : b
  )[0];

  return {
    type: typeMapping[highestType],
    scores: typeScores
  };
};