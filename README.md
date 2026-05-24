# DipsTipp

## Getting Started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)
- A Supabase project (remote — no local DB)

### Install

```bash
pnpm install
```

### Link to Supabase

Link the project to your remote Supabase instance (only needed once):

```bash
pnpm db:link
```

You'll be prompted for your project ref (found in Supabase dashboard URL) and database password.

### Run Development Server

```bash
pnpm dev
```

## Database

The database is managed with the Supabase CLI using plain SQL migrations. All database files live in `database/supabase/`.

### Commands

| Command                        | Description                                                                |
| ------------------------------ | -------------------------------------------------------------------------- |
| `pnpm db:link`                 | Link to your remote Supabase project (one-time setup)                      |
| `pnpm db:push`                 | Apply pending migrations to the remote database                            |
| `pnpm db:migration:new <name>` | Create a new empty migration file                                          |
| `pnpm db:migration:list`       | List migration status (local vs remote)                                    |
| `pnpm db:diff`                 | Show diff between local migrations and remote schema                       |
| `pnpm db:reset`                | Reset the remote database (re-run all migrations + seed)                   |
| `pnpm db:types`                | Generate TypeScript types from remote schema → `src/lib/database.types.ts` |

### Creating a New Migration

```bash
pnpm db:migration:new add_comments_table
```

This creates a timestamped SQL file in `database/supabase/migrations/`. Edit it with your DDL:

```sql
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  tip_id uuid references public.tips(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now() not null
);

alter table public.comments enable row level security;
```

Then push to your remote database:

```bash
pnpm db:push
```

### Generating Types

After pushing schema changes, regenerate the TypeScript types:

```bash
pnpm db:types
```

This updates `src/lib/database.types.ts` which you can import in your app code.
