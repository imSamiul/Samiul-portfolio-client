# Agent instructions

The conventions for this repository live in [`skills.md`](./skills.md). **Read it before writing or reviewing code here**, and follow it over generic Next.js advice.

Short version:

- Next.js 16 App Router + Tailwind 4 + shadcn/ui + TanStack Query + zod. **No DaisyUI**, no Vite / TanStack Router leftovers.
- `src/app/` holds thin routes; real UI lives in `src/components/pages/<domain>/`.
- Domain HTTP goes through `src/services/` only — never raw `axios`/`fetch` inside a component.
- `skills.md` has a **Migration status** section. Some folders (`components/UI/`, flat `services/*.ts`, `src/config/`) are pre-migration — do not copy their shape.
- The API repo (`samiuls-portfolio-server`) keeps its own zod schemas; there is no shared package. Update both sides by hand after a contract change.
- Chat in Bangla + English; code and comments stay English.
