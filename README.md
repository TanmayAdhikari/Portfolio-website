# Tanmay Adhikari Portfolio

Modern personal portfolio built with Next.js. The UI is data-driven (projects, experience, skills, and education) and includes animated visuals.

## Tech Stack
- Next.js 16 (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Three.js (shader background effect)

## What’s Included
- Hero overlay animations (`src/components/Overlay.tsx`)
- Background visuals (`src/components/ui/background-boxes.tsx`, `src/components/ui/aether-flow.tsx`)
- Portfolio content from a single source of truth (`src/data/profile.ts`)
- Projects + Experience + Skills + Education + Contact (`src/components/Projects.tsx`)
- Optional scroll-scrubbed image sequence component (`src/components/ScrollyCanvas.tsx`) that reads WebP frames from `public/sequence/`

## Getting Started

### Prerequisites
- Node.js and `npm`

### Install and Run
1. Open this repo’s `website` folder
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
4. Open `http://localhost:3000`

## Scripts
- `npm run dev` - start dev server
- `npm run build` - build for production
- `npm start` - run the production server
- `npm run lint` - lint code

## Customize Your Content
- Update your name, summary, skills, projects, and experience: `src/data/profile.ts`
- Update hero overlay copy and CTA text: `src/app/HomeClient.tsx`
- If you want to use the scroll image sequence: add your WebP frames under `public/sequence/` (see `public/sequence/README.md` for supported filenames), then wire `ScrollyCanvas` into `HomeClient` (it’s present in the codebase as an optional component).

## Deployment
Any Next.js hosting provider works. Typical flow:
1. `npm run build`
2. `npm start`

## Contributing
Contributions are welcome—open a PR if you want to improve animations, add projects, or refine the UI.
