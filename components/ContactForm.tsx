"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
        setMessage("Message sent successfully. I'll get back to you soon.");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setMessage("Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            // get in touch
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="mt-2 text-muted">
            Have a project in mind or need infrastructure expertise? Drop a
            message and I&apos;ll get back to you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-xl space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block font-mono text-xs text-muted"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-md border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder-muted outline-none transition-colors focus:border-accent"
                placeholder="Your name"
              />
            </div>
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
                name="email"
                required
                className="w-full rounded-md border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder-muted outline-none transition-colors focus:border-accent"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-1 block font-mono text-xs text-muted"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full rounded-md border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder-muted outline-none transition-colors focus:border-accent"
              placeholder="Project inquiry"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1 block font-mono text-xs text-muted"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full resize-none rounded-md border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder-muted outline-none transition-colors focus:border-accent"
              placeholder="Tell me about your project..."
            />
          </div>

          {/* Status message */}
          {status === "success" && (
            <div className="flex items-center gap-2 text-sm text-green-400">
              <CheckCircle size={16} />
              <span>{message}</span>
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 text-sm text-accent-red">
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent/90 disabled:opacity-50 cursor-pointer sm:w-auto"
          >
            {status === "loading" ? (
              "Sending..."
            ) : (
              <>
                Send Message
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
