# Technical Development Log

## Overview
This log documents the architecture, key modifications, and deployment considerations for the "Build with Bala" learning and playbook application.

## Core Features & Iterative Changes

### 1. "Build with Bala" Playbook Landing & Series Navigation
- **Architecture**: Implemented a multi-view Single Page Application (SPA) structure.
  - **View 1 (Series Selection)**: Lists active book Series (e.g., *How Bala Thinks*, *Production AI*, *Engineering Mindset*).
  - **View 2 (Series Chapters & Titles)**: Filters specific chapters under the selected series, showing active blogs and "Coming Soon" milestones.
  - **View 3 (Blog Reader)**: Full article body with customizable reading options (Paper, White, Dark themes; Serif or Sans-serif fonts; custom scaling sizes).
- **Navigation Flow**: Clean URL routing utilizing location hashes (e.g., `#lessons`, `#lessons/series/:id`, `#lessons/post/:slug`). Supports clean state resets when transitioning across tabs.

### 2. Engineering Mindset Blog Series
- Added a new series: **💡 Engineering Mindset**
  - *Description*: Personal reflections, career milestones, and the mental shifts required to build software that creates real impact.
- Active Article: **"I Stopped Chasing Technologies. I Started Chasing Problems."**
  - Explores the professional paradigm shift from measuring value via tool familiarity (Java, Python, specific libraries) to focusing strictly on user outcomes and business impact.
  - Formatted dynamically in custom React components styled to match the selected Medium-style reader theme (Paper/White/Dark) and font configuration.

### 3. Google Analytics Integration (Optional / Free)
- Built an offline-safe background tracking plugin (`/src/components/Analytics.tsx`) that dynamically reads the `VITE_GA_MEASUREMENT_ID` from system variables.
- Supports hash-change listening so page transitions within the virtual SPA are logged with accuracy.

---

## Technical Details (July 2026)
- **Framework**: React 18, Vite, Tailwind CSS.
- **Animations**: `motion/react` for smooth transitions.
- **Routing**: Client-side window `hashchange` listeners.
