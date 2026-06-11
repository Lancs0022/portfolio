"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8">
        <h1 className="mb-6 text-center font-mono text-sm font-bold uppercase tracking-wider text-accent">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block font-mono text-xs text-muted"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block font-mono text-xs text-muted"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-sm text-accent-red">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent/90 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                <LogIn size={16} />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
