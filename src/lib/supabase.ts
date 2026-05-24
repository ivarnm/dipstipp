import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export function createSupabaseServer() {
  return createClient<Database, "next_auth">(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: "next_auth" } },
  );
}
