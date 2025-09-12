// Enneagram Test Types
export interface EnneagramQuestion {
  id: number
  text: string
  category: string
}

export interface TestAnswer {
  questionId: number
  score: number // 1-5 scale
}

export interface EnneagramResult {
  personalityType: number // 1-9
  scores: {
    type1: number
    type2: number
    type3: number
    type4: number
    type5: number
    type6: number
    type7: number
    type8: number
    type9: number
  }
  dominantType: {
    number: number
    title: string
    description: string
    strengths: string[]
    growthAreas: string[]
    coreMotivation: string
    basicFear: string
  }
}

// Radar Chart Data
export interface RadarChartData {
  type: string
  score: number
  fullMark: number
}

// User Authentication
export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Article Types
export interface ArticlePreview {
  id: string
  title: string
  slug: string
  excerpt: string
  featuredImage?: string
  category: string
  publishedAt: string
  readTime: number
}

export interface ArticleDetail extends ArticlePreview {
  content: string
  author: string
  tags: string[]
  relatedArticles: ArticlePreview[]
}

// Navigation Types
export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType
  children?: NavItem[]
}

// Form Types
export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface NewsletterForm {
  email: string
}