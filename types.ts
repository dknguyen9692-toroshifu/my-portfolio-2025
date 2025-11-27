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

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  watchYear?: string;
  description: string;
  watches?: WatchStory[];
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