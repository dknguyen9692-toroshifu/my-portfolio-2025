
export interface WatchPhoto {
  src: string;
  caption: string;
}

export interface WatchStory {
  model: string;
  brand: string;
  purchaseLocation: string;
  story: string; // Context & Occasion
  reason: string; // Why drawn to it
  mainImage: string;
  galleryImage: WatchPhoto;
}

// --- Content Block Types for Flexible Case Studies ---

export type BlockType = 'text' | 'image' | 'list';

export interface BaseBlock {
  type: BlockType;
  id: string; // Unique ID for rendering keys
  title?: string; // Optional Section Header (e.g. "The Challenge")
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  paragraphs: string[];
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
}

export interface ListBlock extends BaseBlock {
  type: 'list';
  items: (string | { label: string; subItems?: string[]; description?: string })[];
  style?: 'bullet' | 'numbered';
  intro?: string; // Optional intro text before the list
  conclusion?: string; // Optional closing text for the list section
}

export type ContentBlock = TextBlock | ImageBlock | ListBlock;

export interface CaseStudyData {
  role: string;
  product: string;
  team: string;
  content: ContentBlock[]; // Dynamic content sections
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  watchYear?: string;
  description: string;
  watches?: WatchStory[];
  caseStudyData?: CaseStudyData;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}