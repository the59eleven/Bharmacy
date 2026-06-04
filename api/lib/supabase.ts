// Supabase on Node.js 20 needs a WebSocket polyfill for realtime
// Since we only use REST queries (no realtime), we stub it out
if (!globalThis.WebSocket) {
  // @ts-expect-error Minimal WebSocket stub for Supabase client init
  globalThis.WebSocket = class {
    constructor() {}
    close() {}
  };
}

import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

export const supabase = createClient(
  env.supabaseUrl,
  env.supabaseServiceRoleKey,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  }
);

export type SupabaseClient = typeof supabase;
