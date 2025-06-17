export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: Mood;
  type?: 'text' | 'tip' | 'exercise' | 'quote' | 'activity';
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export type Mood = 'happy' | 'sad' | 'anxious' | 'stressed' | 'calm' | 'excited' | 'angry' | 'neutral';

export interface MentalHealthContent {
  tips: string[];
  quotes: string[];
  exercises: BreathingExercise[];
  activities: string[];
}

export interface BreathingExercise {
  name: string;
  description: string;
  steps: string[];
  duration: number; // in seconds
  pattern: number[]; // [inhale, hold, exhale, hold]
}