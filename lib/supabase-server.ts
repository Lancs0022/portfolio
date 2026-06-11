import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || url === "your_supabase_project_url" || !key || key === "your_supabase_anon_key") {
    throw new Error("Supabase not configured");
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing sessions.
        }
      },
    },
  });
}

export async function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || url === "your_supabase_project_url" || !key || key === "your_supabase_service_role_key") {
    throw new Error("Supabase service role not configured");
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {
        // no-op for service role
      },
    },
  });
}
