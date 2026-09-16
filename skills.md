# Samiul Portfolio Frontend — Skill Guide

Use this file whenever you change code in the **client** repo. Match existing patterns; do not invent new architecture.

Cursor loads `.cursor/skills/portfolio/` automatically when relevant. This file is the canonical overview (easy to `@skills.md`).

---

## Project

```
samiuls-portfolio-client   Next.js 16 App Router + shadcn + TanStack Query → Vercel
```

- Package manager: **pnpm**
- Zod schemas/types: `src/shared` → import `@/shared`
- The API repo (`samiuls-portfolio-server`) keeps its **own** zod schemas. The two are deliberately independent — there is no shared package and no sync obligation. After any contract change, update both sides by hand and re-check the contract table below.
- **No** DaisyUI, no Vite / TanStack Router leftovers
- Reply to the user in **Bangla + English** when chatting (code and comments stay English)

---

## Hard rules (always)

1. **Read before write** — open 1–2 similar existing features under `src/components/pages/` and copy naming and nesting.
2. **Check migration status** below before treating a folder as a template. Some folders are pre-migration and must not be copied.
3. **Surgical diffs** — only touch what the task needs; no drive-by refactors.
4. **No secrets** in commits. Env names live in `.env.example`; values live on Vercel.
5. Every changed line should trace back to the request.

---

## Structure

```
src/app/                    # routes only (thin pages) + metadata/SEO
src/components/
  pages/<domain>/           # feature UI (home, projects, about, resume, auth, dashboard)
  shared/                   # cross-domain pieces (JsonLd, motion, loaders)
  layout/                   # Navbar, Footer, Providers, DashboardShell, ThemeController
  ui/                       # shadcn primitives only
src/shared/                 # zod schemas + constants (this repo's own copy)
src/services/
  apis/                     # axios instances, domain *Apis objects, queryKeys
  queryHooks/               # use*Manager hooks
src/lib/                    # env, seo, site config, static content
src/types/                  # shared TS types
src/middleware.ts           # dashboard auth gate
```

### Must follow

- Thin `page.tsx` → feature component under `components/pages/<domain>/`
- Domain HTTP only through `services/apis` + `services/queryHooks` — never raw `axios`/`fetch` in a component
- Server-side fetching for public pages so SEO/metadata still render (see `projectServerApis.ts`)
- shadcn primitives in `components/ui/` only; business UI never goes there
- Forms: `react-hook-form` + zod resolver from `@/shared`
- `"use client"` only when state / effects / browser APIs are genuinely needed; push the boundary low
- Destructive actions (project delete) need a confirm dialog

---

## Migration status (September 2026)

This repo just moved from Vite + TanStack Router to Next.js App Router (commit `09d1184`). Structure is mostly in place, styling and the data layer are not.

**Canonical — mirror these:**

- `src/app/**` (routes, layouts, metadata)
- `src/components/layout/`, `src/components/pages/`, `src/components/shared/`
- `src/middleware.ts`
- `src/services/projectServerApis.ts` (RSC fetching with `revalidate`)

**Pre-migration — do NOT copy these shapes:**

| Current | Target |
| --- | --- |
| `components/UI/Toast.tsx` | `sonner` toasts |
| `components/UI/Loader.tsx`, `CardLoader.tsx` | `components/shared/` |
| flat `services/*.ts` + `services/mutations/` + `services/queries/` | `services/apis/` + `services/queryHooks/` |
| `src/config/site.ts`, `src/config/structuredData.ts` | `src/lib/` |
| `src/db/resumeData.ts` | `src/lib/` |
| Tailwind 3 + DaisyUI classes | Tailwind 4 + shadcn |
| no zod anywhere | `src/shared/schemas/` |
| no eslint config | `eslint` + `eslint-config-next` |

**Known gaps:**

- Dashboard routes are incomplete. `components/pages/dashboard/project/AddProject.tsx` and `ProjectForm.tsx` exist but no route mounts them; `app/dashboard/page.tsx`, the project list and the edit route are missing.
- `src/app/api/project-image/[projectId]/route.ts` and `src/utils/projectImage.ts` only exist to serve base64 images out of MongoDB. **Delete both** once the API serves Cloudinary URLs.
- DaisyUI classes are spread across 14 component files (heaviest: `Navbar`, `DashboardShell`, `ProjectGrid`, `LoginForm`, `ProjectForm`, `ThemeController`). Restyle domain by domain, not in one sweep.

---

## Target stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind **4** (`@tailwindcss/postcss`, CSS-first theme in `src/app/globals.css`) + shadcn/ui + `radix-ui`
- `next-themes` for dark mode, `sonner` for toasts
- TanStack Query 5 + axios
- `react-hook-form` + `zod` + `@hookform/resolvers`
- `motion` for animation, `react-icons` stays where already used (shadcn pulls in `lucide-react`; do not mass-swap icons)

---

## Data layer

```
services/apis/          # axios instances, *Apis objects, queryKeys
services/queryHooks/    # useProjectManager, useAuthManager, …
services/projectServerApis.ts   # RSC-only fetch helpers
```

- Public pages fetch server-side in `page.tsx` and pass data down as props
- Browser mutations go through `services/apis` with the axios instance that attaches auth
- A failed public list request degrades to an empty list so the page still renders (SEO)

---

## Auth

- **Current:** JWT in a readable `token` cookie (`js-cookie`), sent as `Authorization: Bearer <token>`; `src/middleware.ts` redirects `/dashboard*` when the cookie is missing
- **Planned (last migration step):** httpOnly cookies set by the API, browser talking to a same-origin `/api` rewrite. Do not start this unless the task explicitly asks — it changes both repos and production cookie settings at once.

---

## Env

See `.env.example`:

- `API_BASE_URL` — server-to-server calls from Server Components and the sitemap
- `NEXT_PUBLIC_BASE_URL` — browser calls (dashboard mutations, resume download)

Both currently point at the Vercel-hosted API. **The API is moving to Koyeb**, so these values change together with that deploy.

---

## API contract

Base: `<API_BASE_URL>`. The API still serves everything under `/api/...`; a move to `/api/v1` is planned and must land in both repos at once.

| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| GET | `/api/project/getAllProjects` | – | image returned as base64 data URL |
| GET | `/api/project/getProjectById/:id` | – | 404 when missing |
| GET | `/api/project/getProjectsForHomepage` | – | `showOnHomepage: true` only |
| POST | `/api/project/create` | Bearer | multipart, file field `image`, `frontEndTech`/`backEndTech` as JSON strings, max 2MB |
| PATCH | `/api/project/updateShowOnHomePage/:id` | Bearer | toggles the flag |
| PATCH | `/api/project/updateProject/:id` | Bearer | partial; only whitelisted fields |
| DELETE | `/api/project/deleteProject/:id` | Bearer | |
| POST | `/api/auth/login` | – | 200 + `{ token }`; 401 on bad credentials |
| POST | `/api/auth/signup` | – | 409 duplicate email, 400 validation |
| GET | `/api/resume/download` | – | PDF download |

Errors arrive as `{ message: string }` — `src/utils/errorHandler.ts` reads `error.response.data.message`.

---

## Run / deploy

```bash
pnpm install
cp .env.example .env.development
pnpm dev          # http://localhost:3002
```

- `pnpm typecheck` before calling anything done
- Vercel hosts this repo at the project root

---

## What not to do

- Do not add DaisyUI back, and do not restore Vite / TanStack Router files
- Do not put feature UI inside `src/app/**/page.tsx`
- Do not call `axios`/`fetch` for domain APIs from a React component
- Do not put business components in `components/ui/`
- Do not invent `containers/`, `views/`, or a second API client layer
- Do not assume a monorepo or a shared package — zod schemas are this repo's own `@/shared`
- Do not switch auth to httpOnly cookies as a side effect of another task
