import { createClient } from "@supabase/supabase-js";
import { env } from "../lib/env";

let instance: ReturnType<typeof createClient>;

export function getDb() {
  if (!instance) {
    instance = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return instance;
}
