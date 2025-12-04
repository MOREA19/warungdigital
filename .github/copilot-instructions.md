<!-- Copied patterns and facts are discoverable from the repo; keep this short and concrete -->
# Copilot / AI Agent Instructions — WebAppRpl

Purpose: help an AI coding assistant be immediately productive in this repository. Keep changes minimal, prefer small focused edits, and ask before large refactors.

- **Big picture**: This is a single-repo React+TypeScript frontend with an embedded set of Supabase edge functions used as the lightweight backend. UI primitives live under `src/components/ui` and page-like components live in `src/components`. The app uses local React state and a simple string-based page router in `src/App.tsx` (no React Router).

- **Key files / locations**:
  - `package.json` — dev scripts: `npm run dev` (vite), `npm run build`.
  - `vite.config.ts` — SWC React plugin, alias `@` => `./src`, many package aliases, and `server.port` (authoritative dev port).
  - `src/App.tsx` — top-level state, routing, and prop-drilling examples (cart, currentPage, currentUser).
  - `src/supabase/functions/server/index.tsx` — all Edge Function endpoints and initialization logic (endpoints start with `/make-server-d6ea81e6/`).
  - `src/supabase/functions/server/kv_store.tsx` — key-value persistence (used by edge functions).
  - `src/utils/supabase/info.tsx` — reads `import.meta.env.VITE_SUPABASE_*` defaults and example anon key.
  - `src/components/ui/` — design system primitives (Radix-based). Use these components when adding UI.

- **Architecture / data flow notes**:
  - Client-side routing is implemented manually in `App.tsx`. Changing pages = setting `currentPage` string.
  - State is lifted into `App.tsx`; components receive callbacks (e.g., `onAddToCart`, `onLogin`) — follow this prop-driven pattern for new features.
  - The backend is implemented as a Supabase edge function (Deno/Hono) under `src/supabase/functions/server` and persists to a KV-like store via `kv_store`.
  - Endpoints are exposed relative to the Supabase project host and often used by client components (`/make-server-d6ea81e6/users/login`, `/make-server-d6ea81e6/products`, etc.). Use those exact paths in client code unless you change the function name.

- **Run / build / deploy (concrete commands)**
  - Install: `npm install`
  - Dev server (use port from `vite.config.ts`): `npm run dev` (Vite). `vite.config.ts` sets `server.port = 3000` — prefer that over stale docs.
  - Build: `npm run build` (outputs to `build/` per vite config).
  - Supabase edge functions (from QUICK_START):
    - `npm install -g supabase`
    - `supabase login`
    - `supabase link --project-ref YOUR_PROJECT_ID`
    - `supabase functions deploy server`

- **Environment & secrets**
  - Uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` accessed via `import.meta.env`. In development create `.env.local` (see `src/QUICK_START.md`) and never commit secrets.

- **Project conventions / gotchas**
  - Imports: project defines `@` => `./src` in `vite.config.ts`. Use relative imports when appropriate, but `@/` is allowed for cross-folder imports.
  - Vite alias map contains versioned keys (e.g., `'@jsr/supabase__supabase-js@2.49.8': '@jsr/supabase__supabase-js'`). Be careful when editing imports — prefer the plain package name used in source files.
  - No test runner included. Do not add tests that require a framework without confirming with maintainers.
  - CSS: compiled Tailwind-like CSS lives in `src/index.css` and theme tokens in `src/styles/globals.css`.

- **Where to make changes**
  - UI and pages: `src/components/*` and `src/components/ui/*`.
  - Edge function API changes: edit `src/supabase/functions/server/index.tsx` and update deployment via Supabase CLI.
  - Shared utilities: `src/utils/*`.

- **Examples to reference when making edits**
  - Add a new page: follow `src/components/CustomerDashboard.tsx` pattern — export a component that takes callbacks and props, then add a `case 'your-page'` in `App.tsx` routing.
  - Call backend: client login uses POST to `/make-server-d6ea81e6/users/login` (see `src/supabase/functions/server/index.tsx` for expected request/response shapes).

- **Behavioral rules for the AI**
  - Make minimal, single-concern commits/patches. Ask before changing the repo-wide architecture.
  - Preserve existing import styles and file extension types (`.tsx` for React components).
  - When modifying API shapes, update the corresponding edge function and client consumer together in the same PR.
  - If unsure which port or env var to use, prefer values in `vite.config.ts` and `src/utils/supabase/info.tsx` over README text.

If anything here is unclear or you want more detail about a specific area (edge functions, KV store, or UI primitives), tell me which area to expand. 
