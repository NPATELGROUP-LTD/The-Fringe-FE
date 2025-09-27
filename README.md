# The Fringe Salon — Public Website

This repository contains the public-facing Next.js application for The Fringe Salon. It serves marketing pages, course listings, services, team information, and authentication entry points for users (admin and students).

This README captures how the app is organized, how to run it locally, deployment notes, and where shared/common resources live.

## Table of contents

- Project overview
- Architecture & folder layout
- Key components
- Local development
- Scripts
- Environment variables
- Common tasks & troubleshooting
- Contributing

## Project overview

- Framework: Next.js (App Router)
- Language: TypeScript (with some JS files for utilities)
- Styling: Tailwind CSS + module CSS for component-scoped styles
- Purpose: public marketing site and unified login that redirects users to admin or student flows

## Architecture & folder layout

Top-level (relevant paths inside this package):

- `src/app/` — Next.js app routes and pages (App Router). Each page (home, about, services, courses, admin pages) lives here.
- `src/components/` — UI components organized by domain (layout, navigation, sections, ui primitives).
- `src/lib/` — small helpers (prisma client wrappers, email helpers, auth helpers used by server code).
- `src/hooks/` — custom React hooks.
- `src/styles/` — global styles and Tailwind entry points.
- `public/` — static assets (images, logos, videos).
- `common/` — shared/types/utilities used by the frontend-public app (previously `shared`). Keep shared helpers used across pages here.
- `prisma/` — Prisma schema for DB models used by backend services (if bundled here).

Example important paths

- `src/app/login/page.tsx` — unified login page that stores token and redirects based on role.
- `src/components/layout/Layout.tsx` — global layout wrapper used across pages.

## Key components

- Authentication helpers: `common/auth.js` — local helpers storing auth token and role in localStorage.
- Shared types: `common/types.ts` — TypeScript interfaces and enums for User, Course, Service, etc.

## Local development

Prerequisites

- Node.js >= 16.x (match project's engines if specified)
- npm (or pnpm/yarn — this repo uses npm in package.json)

Install dependencies

```powershell
cd c:\path\to\the-fringe\frontend-public
npm install
```

Run dev server

```powershell
npm run dev
```

Open http://localhost:3000 in your browser. The dev server supports hot reload.

Build for production

```powershell
npm run build
npm run start
```

Lint

```powershell
npm run lint
```

## Scripts (from package.json)

- `dev` — start Next.js dev server
- `build` — build production assets
- `start` — run production server after build
- `lint` — run next/ESLint

## Environment variables

This application expects certain environment variables when calling backend APIs or services. Common variables (example):

- `NEXT_PUBLIC_API_URL` — base URL of backend API (used by client to call endpoints)
- `DATABASE_URL` — (used by Prisma during build or server-side scripts)
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` — for sending emails (newsletter/contact)

Create a `.env.local` from the example file (if provided) and set values for local development.

## Common tasks & troubleshooting

- Missing module / type errors: run `npm install` and re-run `npm run build`. Ensure `@types/*` packages exist for third-party libs where you use TypeScript types.
- Stale build cache: remove `.next` then re-run `npm run build`.
- If imports break after renaming `shared` → `common`: update relative import paths in files under `src/` (I already converted known imports).

### Where to look when something fails

- Page render errors: check server console logs and browser console. Next.js stack traces point to the failing component file.
- API errors: check `NEXT_PUBLIC_API_URL` and backend server logs.

## Contributing

- Follow existing file structure and naming conventions for components and modules.
- When adding shared utilities used only by the public site, put them under `common/`. If utilities are truly cross-app, consider creating a top-level `packages/shared` or a mono-repo shared package.

## Deployment notes

- This project is a standard Next.js app and can be deployed to Vercel, Netlify (with serverless functions), or a Node server. For Vercel, push the repository and ensure env vars are set in the project settings.
- If you use a separate backend, ensure CORS is configured to allow requests from your frontend domain.

---

If you'd like, I can:

- Add a small `common/index.ts` that re-exports `auth` and `types` for simpler imports.
- Run a local build here and fix any broken imports (if you allow running the build).
- Expand any section with more specific environment variable names and examples based on your backend setup.

If you want changes, tell me which sections to expand or any company/project-specific wording to add.
