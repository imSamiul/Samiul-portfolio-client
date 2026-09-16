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
  (site)/                   # public pages; its layout owns Navbar, Footer, ScrollProgress
  dashboard/, login/        # outside (site): they bring their own full-screen chrome
src/components/
  pages/<domain>/           # feature UI (home, projects, about, resume, auth, dashboard)
  shared/                   # cross-domain pieces (JsonLd, SectionHeading, Timeline, TechBadge, ContactCta, motion/)
  layout/                   # Navbar, Footer, Providers, DashboardShell, ThemeController
  ui/                       # shadcn primitives only
src/shared/                 # zod schemas + constants (this repo's own copy)
src/services/
  apis/                     # axios instances, domain *Apis objects, queryKeys
  queryHooks/               # use*Manager hooks
src/lib/                    # env, seo, site config, static content
src/types/                  # shared TS types
src/proxy.ts                # dashboard auth gate (Next 16 renamed middleware.ts)
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
- `src/proxy.ts`
- `src/services/projectServerApis.ts` (RSC fetching, tagged and cached indefinitely)
- `src/app/api/revalidate/route.ts` (the API's cache-invalidation webhook)

**Pre-migration — do NOT copy these shapes:**

| Current                    | Target               |
| -------------------------- | -------------------- |
| `components/ui/Loader.tsx` | `components/shared/` |

### Theming

Tailwind 4 is CSS-first: there is no `tailwind.config.js`, and `src/app/globals.css` is the whole configuration.

- `:root` and `.dark` hold the token values as `oklch()`. `@theme inline` maps them to utility names (`--color-primary: var(--primary)`), which is what makes `bg-primary` work. Both halves are needed: some shadcn components (`ui/sonner.tsx`) read `var(--popover)` directly rather than through a class.
- The palette is "Indigo / Amber" (September 2026): `primary` electric indigo, `secondary` amber, `glow` magenta-violet for gradients only, and `accent` is a **neutral hover surface** as shadcn intends — do not put a brand colour back on it, every ghost/outline button hovers with it. The neutrals are tinted towards the indigo hue rather than flat grey.
- Dark mode is `next-themes` with `attribute="class"`, so `.dark` is toggled on `<html>`. `layout.tsx` needs `suppressHydrationWarning` for that, and there is no hand-written pre-paint script — the provider brings its own.

DaisyUI is gone. Do not reintroduce `bg-base-100`, `btn`, `card-body`, `form-control` or `data-theme`; the shadcn equivalents are `bg-background`, `Button`, `CardContent` and `Field`.

Three `next/font` families come from `src/lib/fonts.ts`, each with one role: **Plus Jakarta Sans** for headings (`font-display`, applied to `h1–h4` globally), **Inter** for body (`font-sans`) and **JetBrains Mono** for the small uppercase labels (`font-mono`, the `eyebrow` utility). `fontVariables` is applied to `<html>` in `layout.tsx` **and** `global-error.tsx` — that boundary renders its own `<html>`, so it needs the classes separately. Do not put a Google Fonts `@import` back in the CSS; it is a render-blocking third-party request with no `font-display` control.

Colour roles, in one line: indigo is structure (buttons, links, icon tint), amber is the highlighter (the `.marker` stroke under one word, an active tab, the "open to work" dot — one per screen), magenta (`glow`) is warmth (gradients and `.blob` backgrounds only, never text). The comment above `:root` in `globals.css` says the same.

Page primitives live in `globals.css` as `@utility`: `container-page` (max-w-6xl + gutters — every public section uses it, which is what keeps the pages aligned), `section-y`, `eyebrow`, `bg-dots`. Sections open with `<SectionHeading eyebrow title description>`.

`html` has `overflow-x: clip` and **body has no overflow rule**. An overflow value on `<body>` makes it a scroll container of its own, and every `position: sticky` on the site (navbar, dashboard sidebar, resume tabs, About rail) silently stops sticking. Smooth scrolling is declared with `data-scroll-behavior="smooth"` on `<html>` as well as in CSS, which is what lets Next 16 disable it during route transitions.

### Animation

The library is `motion` (`motion/react`) — not GSAP. It is what the React/Next ecosystem standardises on, it is declarative, and `whileInView`, `layoutId` and `useScroll` cover everything this site does; a second animation library would be ~70 KB for nothing.

`Reveal` takes a **variant name**, not a variant object: `<Reveal variant="up" index={i}>` (variants: `up`, `down`, `left`, `right`, `fade`, `scale`; `index` staggers a list). Every `visible` is a function of the index, and a function cannot be serialised across the server/client boundary — passing the object is what once forced four otherwise-static components to declare `'use client'`. `revealVariants` in `motion/variants.ts` is the only export; the objects themselves are module-private. Reveals play **once** (`viewport.once`) and move 16–24px; do not bring back replay-on-scroll or 100px slides.

Other motion pieces in `components/shared/motion/`: `ScrollProgress` (top line), `SpotlightCard` (cursor-follow glow; client), `Marquee` (pure CSS, `--animate-marquee` in the theme).

`JsonLd` is rendered **after** the page component in every route. Next.js scrolls a new route to its first DOM node; a zero-size `<script>` first in line made it keep the previous page's scroll position.

`Reveal` declares `'use client'` itself, so a server component can render it and the boundary forms one level down.

### Data layer

`services/apis/` holds the transport, `services/queryHooks/` holds the React side. Nothing else talks to the API.

- `axiosInstance.ts` — one instance at `/api/v1` with the Bearer interceptor. There is no second client; per-domain base URLs were what made the token interceptor exist in three copies.
- `projectApis`, `contactApis`, `resumeApis`, `userApis` — plain objects of named calls, each wrapped in `request(schema, call)`.
- `projectServerApis.ts`, `resumeServerApis.ts` — the RSC `fetch` path. Separate because it is tagged and cached, uses `serverApiUrl` (server-only `API_BASE_URL`), and degrades a failure to `[]`/`null` so public pages still render.
- `queryHooks/use*Manager.ts` — one hook per domain, returning `// Data`, `// Loading states`, `// Errors`, `// Actions`, `// Invalidation`. Pass `{ shouldFetch: false }` where a component only needs the mutations.
- `apis/queryKeys.ts` — every cache key. Never write a key literal at a call site.

`src/lib/env.ts` is the only place that reads `process.env`; `apiUrl()` is for the browser and `serverApiUrl()` for RSC.

Signing in calls `queryClient.clear()`: whatever the previous session cached must not leak into the new one.

### Contract safety

Nothing from the API is trusted on shape. `src/services/utils/apiHelper.ts` owns both halves:

- `request(schema, call)` unwraps the `{ success, message, data }` envelope and **parses `data`** against a zod schema. A backend change surfaces here as `RESPONSE_SHAPE_MISMATCH` naming the field, not as `undefined.map` inside a component. `projectServerApis.ts` does the same for the RSC `fetch` path.
- `ApiRequestError` carries `code`, `status` and `details`, so a 401 `ACCESS_TOKEN_INVALID` can be told apart from a 500. Branch on `code`, never on `message` — the wording is not part of the contract.
- `error.fieldIssues` returns the `{ field, message }[]` behind a 422. `ContactForm` maps them with `setError`; `ProjectForm` takes them as a `fieldIssues` prop and renders them against the field they name.

The API's DTOs are two shapes, and so are the client's: **`ProjectSummary`** (list payloads, no `projectDetails`) and **`ProjectDetail`** (single-project endpoints). Using one loose type for both is what let list code read a field the list never sends.

Form schemas are _not_ copies of the server's. The server parses multipart text (JSON-encoded tech lists, `"true"` booleans); `projectFormSchema` describes what the inputs actually produce. Only the **limits** are mirrored, so a form that validates never comes back as a 422.

**Known gaps:**

- `pnpm build` fails while prerendering `/_global-error` with `Cannot read properties of null (reading 'useContext')`. **This is an upstream Next 16.3.5 bug, not this repo's code** — the Bari-vara frontend reproduces it identically on the same version. Ruled out: the local `global-error.tsx` (it predates that file), the React version (19.3.0 and 19.2.8 both fail), and the bundler (Turbopack and webpack both fail). It does _not_ happen with minification off, so `next build --debug-prerender` completes all 15 pages. The webpack frame lands in Next's own `OuterLayoutRouter`, which calls `useContext` on a null React namespace — `react/react.react-server.js` exports no `useContext`, so Next's client router is reaching the server graph. Nothing to fix here; re-test on the next Next release. `dev` and `typecheck` are unaffected.
- `src/utils/projectImage.ts` now holds only the two image dimensions that `next/image` needs. The base64 workarounds it used to carry, along with `src/app/api/project-image/`, have been deleted.
- `next-themes` logs `Encountered a script tag while rendering React component` in dev. It is the provider's own pre-paint script, which React 19 warns about on the client render path; it still runs from the SSR HTML, and Bari-vara shows the same line. Not fixable from here — next-themes 0.4 offers no way to place that script itself.

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

`/projects` is the one page that keeps fetching after hydration: `page.tsx` renders page one on the server, hands it to `useInfiniteProjects` as `initialData`, and the client fetches page two onwards as the visitor scrolls. Seeding that first page is the point — refetching it on mount would make the server render a wasted round trip. Its JSON-LD only describes page one; the sitemap walks every page so crawlers still reach the rest.

### Caching

Project fetches are **cached indefinitely** (`next: { revalidate: false, tags: [...] }`), not on an interval. Invalidation is on demand: the API POSTs to `src/app/api/revalidate/route.ts` after every write, and that route calls `revalidateTag`. Do not reintroduce a `revalidate: <seconds>` — it only adds a window where the dashboard looks broken.

Tags: every project fetch carries `projects`; the by-slug fetch also carries `project:<slug>`; the resume metadata fetch carries `resume`. These names are a hand-maintained contract with the API's `utils/revalidateWeb.ts`.

Two Next 16 details worth keeping:

- `revalidateTag(tag, profile)` takes **two** arguments; the single-argument form is deprecated.
- The route passes `{ expire: 0 }`, not `'max'`. `'max'` serves stale content while revalidating, which would defeat the point — the admin would still see the old page. `updateTag` is not an option here because the caller is a webhook, not a Server Action.

The dashboard's edit page fetches with `{ fresh: true }` (`cache: 'no-store'`) and stays untagged: it must never show a stale form.

---

## Auth

- **Current:** JWT in a readable `token` cookie (`js-cookie`), sent as `Authorization: Bearer <token>`; `src/proxy.ts` redirects `/dashboard*` to `/login?next=<path>` when the cookie is missing. The login route only honours same-site `next` paths, so the callback cannot be turned into an open redirect
- **Planned (last migration step):** httpOnly cookies set by the API, browser talking to a same-origin `/api` rewrite. Do not start this unless the task explicitly asks — it changes both repos and production cookie settings at once.

---

## Env

See `.env.example`:

- `API_BASE_URL` — server-to-server calls from Server Components and the sitemap
- `NEXT_PUBLIC_BASE_URL` — browser calls (dashboard mutations, resume download)
- `REVALIDATE_SECRET` — shared with the API, guards `POST /api/revalidate`. Without it the route answers 503 and project data stays cached indefinitely

Both point at the API, which is its own Vercel project (separate deployment from this site). Neither includes the `/api/v1` prefix — the service files add it.

---

## API contract

Base: `<API_BASE_URL>/api/v1`.

**Every response is enveloped.** Success is `{ success: true, message, data }` and errors are `{ success: false, message, code, details? }`. `src/types/apiType.ts` holds `ApiResponse<T>`; each service function types the call with it and returns `response.data.data`, so components and hooks never see the envelope. `src/utils/errorHandler.ts` reads `error.response.data.message`.

Projects carry **`id`**, not `_id`, and `image` is a plain Cloudinary URL string.

| Method | Path                                         | Auth   | `data`                                                                                                          |
| ------ | -------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v1/project/getAllProjects`             | –      | **paginated**: `?page=&limit=` (defaults 1 / 9, max 50) → `{ items, meta }`, published only, `order` ascending then newest first |
| GET    | `/api/v1/project/getAllProjectsForDashboard` | Bearer | every project, drafts included. The dashboard list uses this one                                                |
| GET    | `/api/v1/project/getProjectBySlug/:slug`     | –      | one project; what `/projects/[slug]` uses. 404 when missing, **422** when the param is not slug-shaped          |
| GET    | `/api/v1/project/getProjectById/:id`         | –      | one project; kept for the dashboard's edit page. 404 when missing                                               |
| GET    | `/api/v1/project/getProjectsForHomepage`     | –      | `showOnHomepage: true` only                                                                                     |
| POST   | `/api/v1/project/create`                     | Bearer | the created project. Multipart, file field `image`, `frontEndTech`/`backEndTech` as JSON strings, max 2 MB      |
| PATCH  | `/api/v1/project/updateStatus/:id`           | Bearer | the project with `status` flipped between `draft` and `published`. This is the publish gate                     |
| PATCH  | `/api/v1/project/updateShowOnHomePage/:id`   | Bearer | the project with the flag flipped. Only a display flag — a draft stays off the site either way                  |
| PATCH  | `/api/v1/project/updateProject/:id`          | Bearer | the updated project; partial, only whitelisted fields                                                           |
| DELETE | `/api/v1/project/deleteProject/:id`          | Bearer | `null`                                                                                                          |
| POST   | `/api/v1/auth/login`                         | –      | `{ user: { id, email }, token }`; 401 on bad credentials                                                        |
| POST   | `/api/v1/auth/signUp`                        | –      | same, 201; 409 duplicate email, 422 validation                                                                  |
| POST   | `/api/v1/contact`                            | –      | `null`. `{ name, email, message }` plus a hidden `website` honeypot; 429 when rate limited                      |
| GET    | `/api/v1/resume`                             | –      | `{ updatedAt }`, or 404 `RESUME_NOT_CONFIGURED` when none is stored. Checked before rendering any download link |
| GET    | `/api/v1/resume/download`                    | –      | not an envelope: a 302 to the Cloudinary PDF. **Link to it with a plain anchor** — never fetch it as a blob     |
| POST   | `/api/v1/resume`                             | Bearer | `{ updatedAt }`. Multipart, file field `resume`, PDF only, max 5 MB                                             |

---

## Run / deploy

```bash
pnpm install
cp .env.example .env.development
pnpm dev          # http://localhost:3002
```

Quality gate — all three must pass before calling anything done:

```bash
pnpm lint         # eslint flat config + eslint-config-next
pnpm typecheck    # next typegen && tsc --noEmit
pnpm test         # vitest, jsdom + Testing Library
```

`pnpm format` runs Prettier (single quotes, 80 cols, `prettier-plugin-tailwindcss`).

`typecheck` reads both `.next/types/` and `.next/dev/types/`, but `next typegen` only writes the first. If a dev server was mid-compile, the dev copy can be left half-written and `tsc` reports a syntax error inside `.next/dev/types/validator.ts`. Delete `.next/dev/types` and re-run; it is never your source that is broken.

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
