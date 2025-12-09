export enum Track {
  Science = 'Science',
  Education = 'Education',
  Accessibility = 'Accessibility',
  Health = 'Health',
  Business = 'Business',
  Technology = 'Technology'
}

export interface Idea {
  title: string;
  description: string;
  keyFeatures: string[];
  geminiUsage: string;
}

export interface TechPlan {
  frontend: string;
  backend: string;
  aiIntegration: string;
  architectureNotes: string;
}

export type ViewState = 'description' | 'ideator' | 'architect';