# BioEar

BioEar is a student engineering project developing a low-cost, non-surgical bone-conduction hearing-device prototype. This repository holds the project's website: an educational, interactive exploration of the technology, the research, and the story behind it.

## What it is

BioEar turns sound into vibration to create another pathway to hearing: sound is captured by a microphone, shaped by digital signal processing, amplified, and converted into vibration by a bone-conduction actuator worn against the skull.

BioEar is an engineering research prototype, not a clinically approved medical device.

## Features

- Interactive "Follow the Signal" walkthrough of the BioEar signal chain
- Air conduction vs. bone conduction comparison diagram
- BioEar Sound Lab — a real-time audio processing playground built on the Web Audio API
- Exploded prototype view, research timeline, and experiment tracking
- A transparent sources page documenting every external asset and its license

## Tech stack

- Next.js (App Router) + TypeScript + React
- Tailwind CSS
- Supabase (Postgres, auth, storage) — optional, for the contact form and research data
- Lucide icons
- Web Audio API + HTML Canvas for the Sound Lab

## Local setup

```
npm install
npm run dev
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase project's URL and publishable key if you want the contact form and research dashboard to work against a real database.

## Supabase setup

Run the migration in `supabase/migrations/001_initial.sql` against your Supabase project, then optionally load `supabase/seed.sql` for demo data.

## Art licensing

See [`/sources`](./app/sources/page.tsx) and `content/art-sources.ts`. All illustrations in this project are original SVG artwork.

## Project structure

See `app/`, `components/`, `lib/`, and `content/` for the site's routes, UI, business logic, and copy respectively.

## Medical disclaimer

BioEar is an engineering research prototype, not a clinically approved medical device. Hearing technology should be selected with guidance from a qualified hearing professional.
