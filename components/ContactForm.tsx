"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useSite } from "./site-context";
import { TextReveal, FadeIn } from "./animations";

export default function ContactForm() {
  const { t } = useSite();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setMsg(t.contact.success);
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setMsg(t.contact.error);
      }
    } catch {
      setStatus("error");
      setMsg(t.contact.error);
    }
  }

  const inputClass =
    "w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted neon-input";

  return (
    <section id="contact" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-5">
        <TextReveal>
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block h-px w-8 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {t.contact.title}
            </span>
          </div>
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            {t.contact.subtitle}
          </h2>
        </TextReveal>

        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                type="text"
                required
                placeholder={t.contact.name}
                className={inputClass}
              />
              <input
                name="email"
                type="email"
                required
                placeholder={t.contact.email}
                className={inputClass}
              />
            </div>
            <input
              name="subject"
              type="text"
              placeholder={t.contact.subject}
              className={inputClass}
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder={t.contact.message}
              className={`${inputClass} resize-none`}
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50"
            >
              {status === "loading" ? (
                <>{t.contact.sending}</>
              ) : (
                <>
                  {t.contact.send}
                  <Send size={15} />
                </>
              )}
            </button>

            {msg && (
              <div
                className={`flex items-center gap-2 rounded-md border p-3 text-sm ${
                  status === "success"
                    ? "border-green-500/30 bg-green-500/5 text-green-400"
                    : "border-accent-red/30 bg-accent-red/5 text-accent-red"
                }`}
              >
                {status === "success" ? <CheckCircle size={16} /> : null}
                {msg}
              </div>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
