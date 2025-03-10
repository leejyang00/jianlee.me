import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Context } from "hono";

export type Bindings = {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
}

export function getSupabaseClient(c: Context<{ Bindings: Bindings }>): SupabaseClient {
  const supabaseUrl = c.env.SUPABASE_URL;
  const supabaseKey = c.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not found');
  }

  return createClient(supabaseUrl, supabaseKey);
}
