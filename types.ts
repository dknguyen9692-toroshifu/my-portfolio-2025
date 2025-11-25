export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  description: string;
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