// Local hardcoded articles data
export interface LocalArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  category_id: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export const categories: LocalCategory[] = [
  {
    id: '1',
    name: 'Personality Types',
    slug: 'personality-types',
    description: 'Articles about the nine personality types'
  },
  {
    id: '2',
    name: 'Self-Development',
    slug: 'self-development',
    description: 'Personal growth and development articles'
  },
  {
    id: '3',
    name: 'Relationships',
    slug: 'relationships',
    description: 'Understanding relationships through the Enneagram'
  },
  {
    id: '4',
    name: 'Workplace',
    slug: 'workplace',
    description: 'Applying Enneagram in professional settings'
  }
];

export const articles: LocalArticle[] = [
  {
    id: '1',
    title: 'Understanding Type 1: The Perfectionist',
    slug: 'understanding-type-1-perfectionist',
    content: `# Understanding Type 1: The Perfectionist

Type 1 personalities are driven by a desire to be good, right, and perfect. They are principled, purposeful, self-controlled, and perfectionistic individuals who strive to improve everything around them.

## Core Characteristics

Type 1s are motivated by their inner critic - an internal voice that constantly points out what's wrong and needs to be fixed. This drives them to:

- Maintain high standards for themselves and others
- Focus on details and accuracy
- Work systematically and methodically
- Feel responsible for making things better

## Strengths

- **Integrity**: They have strong moral principles and stick to them
- **Quality Focus**: They produce excellent work and pay attention to details
- **Improvement Oriented**: They naturally see how things can be better
- **Reliable**: Others can count on them to do the right thing

## Growth Areas

- **Perfectionism**: Can become paralyzed by the need to get everything perfect
- **Criticism**: May be overly critical of themselves and others
- **Rigidity**: Can struggle with flexibility and spontaneity
- **Resentment**: May build up anger when others don't meet their standards

## Path to Growth

For Type 1s to grow, they need to:

1. **Practice Self-Compassion**: Learn to be gentler with themselves
2. **Embrace "Good Enough"**: Recognize when something is adequate rather than perfect
3. **Express Emotions**: Allow themselves to feel and express anger appropriately
4. **Find Joy**: Make time for fun and spontaneous activities

## In Relationships

Type 1s bring dedication and reliability to relationships, but may struggle with:
- Being overly critical of partners
- Having difficulty relaxing and being spontaneous
- Expecting others to share their high standards

Understanding these patterns can help Type 1s build healthier, more fulfilling relationships.`,
    excerpt: 'Learn about the core motivations and characteristics of Type 1 personalities.',
    category_id: '1',
    published: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'How to Grow as a Type 2',
    slug: 'how-to-grow-type-2',
    content: `# How to Grow as a Type 2: The Helper

Type 2 personalities can grow by learning to recognize their own needs and developing healthy boundaries while maintaining their natural gift for caring about others.

## Understanding Your Patterns

As a Type 2, you likely:
- Focus intensely on others' needs while ignoring your own
- Feel valued when you're helping or needed by others
- Struggle to ask for help directly
- May become resentful when your efforts aren't appreciated

## Growth Strategies

### 1. Practice Self-Awareness
- Notice when you're automatically focusing on others' needs
- Check in with yourself: "What do I need right now?"
- Keep a journal of your own feelings and needs

### 2. Set Healthy Boundaries
- Learn to say "no" without feeling guilty
- Recognize that helping others isn't always helpful
- Allow others to solve their own problems

### 3. Ask for Help Directly
- Practice stating your needs clearly
- Resist the urge to hint or manipulate to get needs met
- Accept that it's okay to have needs

### 4. Develop Self-Care Practices
- Schedule regular time for activities you enjoy
- Practice saying "I need..." without justification
- Celebrate your own accomplishments

## Common Challenges

- **People-Pleasing**: Saying yes when you want to say no
- **Martyrdom**: Sacrificing yourself and then feeling resentful
- **Indirect Communication**: Hinting instead of asking directly

## The Path Forward

Growth for Type 2s involves learning that you are valuable for who you are, not just for what you do for others. This journey requires patience and self-compassion as you develop new patterns of relating to yourself and others.`,
    excerpt: 'Growth strategies specifically designed for Type 2 personalities.',
    category_id: '2',
    published: true,
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    title: 'Enneagram in Relationships',
    slug: 'enneagram-relationships',
    content: `# Enneagram in Relationships

Understanding your partner's Enneagram type can transform your relationship by providing insights into their core motivations, fears, and communication styles.

## Why Enneagram Matters in Relationships

Each Enneagram type has:
- **Core Motivations**: What drives them at the deepest level
- **Basic Fears**: What they're trying to avoid
- **Communication Styles**: How they express themselves and receive information
- **Stress Patterns**: How they behave under pressure

## Type Combinations

### Complementary Pairs
Some type combinations naturally complement each other:
- **Type 1 & Type 7**: Structure meets spontaneity
- **Type 2 & Type 5**: Emotional warmth meets intellectual depth
- **Type 3 & Type 9**: Drive meets acceptance

### Challenging Combinations
Other combinations may face more challenges:
- **Type 1 & Type 4**: Perfectionism meets emotional intensity
- **Type 6 & Type 8**: Anxiety meets intensity
- **Type 2 & Type 3**: People-pleasing meets achievement focus

## Communication Tips by Type

### For Type 1 Partners
- Be direct and honest
- Acknowledge their efforts to improve things
- Avoid criticism; they're already self-critical

### For Type 2 Partners
- Express appreciation regularly
- Ask about their needs directly
- Set clear boundaries

### For Type 3 Partners
- Recognize their achievements
- Be efficient in communication
- Support their goals

### For Type 4 Partners
- Validate their emotions
- Give them space to process feelings
- Appreciate their uniqueness

### For Type 5 Partners
- Respect their need for privacy
- Give them time to think before responding
- Share information rather than emotions initially

### For Type 6 Partners
- Be consistent and reliable
- Address their concerns seriously
- Provide reassurance

### For Type 7 Partners
- Keep things positive and engaging
- Allow for spontaneity
- Avoid being overly serious or heavy

### For Type 8 Partners
- Be direct and honest
- Stand your ground respectfully
- Appreciate their protective nature

### For Type 9 Partners
- Be patient with their decision-making
- Create a peaceful environment
- Gently encourage them to share their opinions

## Building Stronger Relationships

1. **Learn Each Other's Types**: Take the Enneagram test together
2. **Discuss Core Motivations**: Share what drives you at the deepest level
3. **Identify Stress Patterns**: Recognize how each of you behaves under stress
4. **Practice Compassion**: Remember that everyone is doing their best from their perspective
5. **Grow Together**: Support each other's growth journey

Understanding the Enneagram doesn't excuse behavior, but it provides a framework for compassion and growth in relationships.`,
    excerpt: 'Discover how the Enneagram can improve your relationships.',
    category_id: '3',
    published: true,
    created_at: '2024-01-17T10:00:00Z',
    updated_at: '2024-01-17T10:00:00Z'
  },
  {
    id: '4',
    title: 'Personal Growth and Development',
    slug: 'growth-development',
    content: `# Personal Growth and Development Through the Enneagram

The Enneagram is not just a personality typing system—it's a powerful tool for personal transformation and spiritual growth. Understanding your type is just the beginning of a lifelong journey of self-discovery and development.

## The Growth Process

### 1. Self-Awareness
The first step in growth is becoming aware of your automatic patterns:
- **Observe Without Judgment**: Notice your thoughts, feelings, and behaviors
- **Identify Triggers**: What situations activate your type's patterns?
- **Recognize Your Inner Critic**: How does your type's "inner voice" sound?

### 2. Understanding Your Motivations
Each type is driven by core motivations that often operate unconsciously:
- **Core Desire**: What you're seeking at the deepest level
- **Core Fear**: What you're trying to avoid
- **Core Belief**: The fundamental assumption about life that drives your behavior

### 3. Recognizing Patterns
Every type has predictable patterns that emerge under different conditions:
- **Security Patterns**: How you behave when feeling safe and relaxed
- **Stress Patterns**: How you react under pressure or threat
- **Growth Patterns**: The direction of your development and integration

## The Levels of Development

Each Enneagram type exists on a spectrum from healthy to unhealthy:

### Healthy Levels (1-3)
- **Level 1**: Liberation and transcendence of type
- **Level 2**: Psychological capacity and self-actualization
- **Level 3**: Social value and meaningful contribution

### Average Levels (4-6)
- **Level 4**: Imbalance and fixation on type patterns
- **Level 5**: Interpersonal control and manipulation
- **Level 6**: Overcompensation and self-justification

### Unhealthy Levels (7-9)
- **Level 7**: Violation of self and others
- **Level 8**: Obsession and compulsion
- **Level 9**: Pathological destructiveness

## Growth Practices by Type

### Type 1: The Perfectionist
- **Practice**: Self-compassion and accepting "good enough"
- **Growth Direction**: Move toward Type 7's spontaneity and joy
- **Integration**: Learn to relax and find pleasure in imperfection

### Type 2: The Helper
- **Practice**: Self-care and direct communication of needs
- **Growth Direction**: Move toward Type 4's self-awareness and authenticity
- **Integration**: Develop emotional honesty and self-nurturing

### Type 3: The Achiever
- **Practice**: Slowing down and connecting with authentic feelings
- **Growth Direction**: Move toward Type 6's loyalty and commitment
- **Integration**: Value being over doing

### Type 4: The Individualist
- **Practice**: Focusing on others and taking practical action
- **Growth Direction**: Move toward Type 1's objectivity and principled action
- **Integration**: Channel emotions into meaningful work

### Type 5: The Investigator
- **Practice**: Engaging with others and sharing knowledge
- **Growth Direction**: Move toward Type 8's confidence and action
- **Integration**: Apply knowledge in the real world

### Type 6: The Loyalist
- **Practice**: Trusting inner guidance and taking independent action
- **Growth Direction**: Move toward Type 9's calm and acceptance
- **Integration**: Develop inner authority and self-confidence

### Type 7: The Enthusiast
- **Practice**: Staying present and going deeper into experiences
- **Growth Direction**: Move toward Type 5's focus and depth
- **Integration**: Develop patience and sustained attention

### Type 8: The Challenger
- **Practice**: Showing vulnerability and considering others' needs
- **Growth Direction**: Move toward Type 2's care and compassion
- **Integration**: Use power to serve and protect others

### Type 9: The Peacemaker
- **Practice**: Taking action and expressing opinions
- **Growth Direction**: Move toward Type 3's focus and achievement
- **Integration**: Develop self-motivation and personal agency

## Creating a Growth Plan

1. **Identify Your Current Level**: Where are you operating most of the time?
2. **Set Growth Intentions**: What specific patterns do you want to change?
3. **Choose Practices**: Select 1-2 practices that challenge your type's patterns
4. **Find Support**: Work with others who can support your growth
5. **Be Patient**: Growth is a lifelong process, not a destination

## The Fruits of Growth

As you grow through the Enneagram, you'll experience:
- **Greater Freedom**: Less compulsive behavior and more conscious choice
- **Improved Relationships**: Better understanding and compassion for others
- **Authentic Self-Expression**: Living from your true self rather than your type's patterns
- **Inner Peace**: Reduced internal conflict and greater self-acceptance
- **Service to Others**: Using your gifts to contribute meaningfully to the world

Remember, the goal isn't to eliminate your type—it's to become a healthy, integrated version of who you are. The Enneagram shows us that our greatest strengths and our deepest challenges are often two sides of the same coin.`,
    excerpt: 'A comprehensive guide to using the Enneagram for personal transformation and spiritual growth.',
    category_id: '2',
    published: true,
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T10:00:00Z'
  }
];

export function getArticleBySlug(slug: string): LocalArticle | undefined {
  return articles.find(article => article.slug === slug && article.published);
}

export function getArticlesByCategory(categoryId: string): LocalArticle[] {
  return articles.filter(article => article.category_id === categoryId && article.published);
}

export function getCategoryBySlug(slug: string): LocalCategory | undefined {
  return categories.find(category => category.slug === slug);
}

export function getCategoryById(id: string): LocalCategory | undefined {
  return categories.find(category => category.id === id);
}

export function getAllPublishedArticles(): LocalArticle[] {
  return articles.filter(article => article.published);
}