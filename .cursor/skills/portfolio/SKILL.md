---
name: portfolio-web
description: >-
  Samiul portfolio frontend conventions (Next.js App Router + shadcn + TanStack
  Query). Use when coding, scaffolding, refactoring, or reviewing anything in
  this client repository, or when the user mentions the portfolio homepage,
  projects, dashboard, resume page, SEO metadata, or the Next.js migration.
---

# Samiul Portfolio Frontend

**Before writing code**, read the project guide:

→ [skills.md](../../../skills.md)

Then match existing files under `src/app/` and `src/components/`. Do not invent new folder layouts. Zod schemas live in `src/shared` (`@/shared`) and are independent from the API repo's copy — update both sides by hand after a contract change.

The guide's **Migration status** section lists which folders are canonical and which are still pre-migration; read it before copying any existing shape.
