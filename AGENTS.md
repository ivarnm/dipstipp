<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Database

- Database is managed via **Supabase CLI** with SQL migration files.
- All database code lives in `database/supabase/` (migrations, seed, config).
- We do NOT use a local database. All work is done against the remote (prod) Supabase instance.
- Migrations are plain SQL files in `database/supabase/migrations/`.
- To create a new migration: `pnpm db:migration:new <name>` then write SQL in the generated file.
- To apply migrations to the remote DB: `pnpm db:push`.
- To generate TypeScript types from the remote schema: `pnpm db:types` (outputs to `src/lib/database.types.ts`).
- Always enable Row Level Security (RLS) on new tables and add appropriate policies.
- The project must be linked first with `pnpm db:link` before any remote commands work.

## Imports

- Prefer alias instead of path traversal for imports ecept when in same folder
- Import alias is src/\* and not @/\*

## Workflow

- Always check for TypeScript/lint errors (`get_errors`) before declaring work done.
