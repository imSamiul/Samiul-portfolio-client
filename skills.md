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
- `src/services/projectServerApis.ts` (RSC fetching, tagged and cached indefinitely)
- `src/app/api/revalidate/route.ts` (the API's cache-invalidation webhook)

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

- `src/components/UI/` is the tracked folder name but several files import `../ui/Loader` and `../ui/Toast`. Windows resolves that; **Linux does not, so the Vercel build breaks.** Fix the casing as part of moving those files to `components/shared/`.
- `pnpm build` currently fails while prerendering `/_global-error` with `Cannot read properties of null (reading 'useContext')`. It predates the API contract change and is unrelated to it — a Next 16 / React 19 problem in this repo's setup.
- `src/utils/projectImage.ts` now holds only the two image dimensions that `next/image` needs. The base64 workarounds it used to carry, along with `src/app/api/project-image/`, have been deleted.
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

### Caching

Project fetches are **cached indefinitely** (`next: { revalidate: false, tags: [...] }`), not on an interval. Invalidation is on demand: the API POSTs to `src/app/api/revalidate/route.ts` after every write, and that route calls `revalidateTag`. Do not reintroduce a `revalidate: <seconds>` — it only adds a window where the dashboard looks broken.

Tags: every project fetch carries `projects`; the by-slug fetch also carries `project:<slug>`. These names are a hand-maintained contract with the API's `utils/revalidateWeb.ts`.

Two Next 16 details worth keeping:

- `revalidateTag(tag, profile)` takes **two** arguments; the single-argument form is deprecated.
- The route passes `{ expire: 0 }`, not `'max'`. `'max'` serves stale content while revalidating, which would defeat the point — the admin would still see the old page. `updateTag` is not an option here because the caller is a webhook, not a Server Action.

The dashboard's edit page fetches with `{ fresh: true }` (`cache: 'no-store'`) and stays untagged: it must never show a stale form.

---

## Auth

- **Current:** JWT in a readable `token` cookie (`js-cookie`), sent as `Authorization: Bearer <token>`; `src/middleware.ts` redirects `/dashboard*` when the cookie is missing
- **Planned (last migration step):** httpOnly cookies set by the API, browser talking to a same-origin `/api` rewrite. Do not start this unless the task explicitly asks — it changes both repos and production cookie settings at once.

---

## Env

See `.env.example`:

- `API_BASE_URL` — server-to-server calls from Server Components and the sitemap
- `NEXT_PUBLIC_BASE_URL` — browser calls (dashboard mutations, resume download)
- `REVALIDATE_SECRET` — shared with the API, guards `POST /api/revalidate`. Without it the route answers 503 and project data stays cached indefinitely

Both currently point at the Vercel-hosted API. **The API is moving to Koyeb**, so these values change together with that deploy. Neither includes the `/api/v1` prefix — the service files add it.

---

## API contract

Base: `<API_BASE_URL>/api/v1`.

**Every response is enveloped.** Success is `{ success: true, message, data }` and errors are `{ success: false, message, code, details? }`. `src/types/apiType.ts` holds `ApiResponse<T>`; each service function types the call with it and returns `response.data.data`, so components and hooks never see the envelope. `src/utils/errorHandler.ts` reads `error.response.data.message`.

Projects carry **`id`**, not `_id`, and `image` is a plain Cloudinary URL string.

| Method | Path | Auth | `data` |
| --- | --- | --- | --- |
| GET | `/api/v1/project/getAllProjects` | – | **published** projects only, `order` ascending then newest first |
| GET | `/api/v1/project/getAllProjectsForDashboard` | Bearer | every project, drafts included. The dashboard list uses this one |
| GET | `/api/v1/project/getProjectBySlug/:slug` | – | one project; what `/projects/[slug]` uses. 404 when missing, **422** when the param is not slug-shaped |
| GET | `/api/v1/project/getProjectById/:id` | – | one project; kept for the dashboard's edit page. 404 when missing |
| GET | `/api/v1/project/getProjectsForHomepage` | – | `showOnHomepage: true` only |
| POST | `/api/v1/project/create` | Bearer | the created project. Multipart, file field `image`, `frontEndTech`/`backEndTech` as JSON strings, max 2 MB |
| PATCH | `/api/v1/project/updateStatus/:id` | Bearer | the project with `status` flipped between `draft` and `published`. This is the publish gate |
| PATCH | `/api/v1/project/updateShowOnHomePage/:id` | Bearer | the project with the flag flipped. Only a display flag — a draft stays off the site either way |
| PATCH | `/api/v1/project/updateProject/:id` | Bearer | the updated project; partial, only whitelisted fields |
| DELETE | `/api/v1/project/deleteProject/:id` | Bearer | `null` |
| POST | `/api/v1/auth/login` | – | `{ user: { id, email }, token }`; 401 on bad credentials |
| POST | `/api/v1/auth/signUp` | – | same, 201; 409 duplicate email, 422 validation |
| POST | `/api/v1/contact` | – | `null`. `{ name, email, message }` plus a hidden `website` honeypot; 429 when rate limited |
| GET | `/api/v1/resume/download` | – | not an envelope: a 302 to the Cloudinary PDF. **Link to it with a plain anchor** — never fetch it as a blob |
| POST | `/api/v1/resume` | Bearer | `{ updatedAt }`. Multipart, file field `resume`, PDF only, max 5 MB |

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
