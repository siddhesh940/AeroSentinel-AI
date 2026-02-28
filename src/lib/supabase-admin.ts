import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Server-side only admin client with service_role key
// NEVER expose this on the client side
let _adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (_adminClient) return _adminClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey || serviceKey === "your_service_role_key_here") {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
  }

  _adminClient = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _adminClient;
}
