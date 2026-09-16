# Agent instructions

The conventions for this repository live in [`skills.md`](./skills.md). **Read it before writing or reviewing code here**, and follow it over generic Next.js advice.

Short version:

- Next.js 16 App Router + Tailwind 4 + shadcn/ui + TanStack Query + zod. **No DaisyUI**, no Vite / TanStack Router leftovers.
- `src/app/` holds thin routes; real UI lives in `src/components/pages/<domain>/`.
- Domain HTTP goes through `src/services/` only — never raw `axios`/`fetch` inside a component.
- `skills.md` has a **Migration status** section. Some folders (`components/UI/`, flat `services/*.ts`, `src/config/`) are pre-migration — do not copy their shape.
- The API repo (`samiuls-portfolio-server`) keeps its own zod schemas; there is no shared package. Update both sides by hand after a contract change.
- Chat in Bangla + English; code and comments stay English.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
