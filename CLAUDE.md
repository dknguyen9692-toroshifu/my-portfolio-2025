# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/claude-code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React 19, TypeScript, Vite, and Tailwind CSS. It features animated backgrounds, case studies for projects, and a custom cursor effect.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3.4
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── App.tsx              # Main app component with view routing
├── index.tsx            # React entry point
├── types.ts             # TypeScript interfaces (Project, CaseStudyData, etc.)
├── components/
│   ├── Navbar.tsx       # Navigation bar
│   ├── Hero.tsx         # Landing hero section
│   ├── Projects.tsx     # Project grid/listing
│   ├── CaseStudy.tsx    # Individual case study view
│   ├── About.tsx        # About section
│   ├── LifeSnapshots.tsx # Personal gallery section
│   ├── Contact.tsx      # Contact section
│   ├── BackgroundAnimation.tsx # Animated background
│   ├── BackgroundMusic.tsx     # Audio player
│   └── SoundWave.tsx    # Sound wave visualization
├── public/              # Static assets
└── tailwind.config.js   # Tailwind configuration
```

## Key Architecture Patterns

- **View State Management**: App.tsx manages `home` vs `case-study` views via React state
- **Content Blocks**: Case studies use a flexible block-based content system (types: `text`, `image`, `list`, `testimonial`, `stats`)
- **Path Aliases**: `@/*` maps to project root (configured in tsconfig.json)

## Type System

Key interfaces defined in `types.ts`:
- `Project`: Main project data structure with optional `caseStudyData` and `watches`
- `CaseStudyData`: Contains role, product, team, and dynamic `ContentBlock[]` array
- `ContentBlock`: Union type for flexible case study sections

## Environment

- Requires `GEMINI_API_KEY` in `.env.local` (if using AI features)
- No test framework currently configured
