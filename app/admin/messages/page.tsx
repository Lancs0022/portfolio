"use client";

import { useEffect, useState } from "react";
import type { ContactMessage } from "@/lib/types";
import { Mail, MailOpen, Check } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMessages() {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function markAsRead(id: string) {
    await fetch("/api/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: true }),
    });
    loadMessages();
  }

  if (loading) {
    return <div className="font-mono text-sm text-muted">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="font-mono text-xs text-muted">
          Contact form submissions ({messages.filter((m) => !m.read).length}{" "}
          unread)
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <Mail size={32} className="mx-auto mb-3 text-muted" />
          <p className="text-sm text-muted">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-lg border bg-card p-4 ${
                msg.read ? "border-border" : "border-accent/40"
              }`}
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {msg.read ? (
                      <MailOpen size={14} className="text-muted" />
                    ) : (
                      <Mail size={14} className="text-accent" />
                    )}
                    <span className="text-sm font-semibold text-foreground">
                      {msg.name}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {msg.email}
                    </span>
                  </div>
                  {msg.subject && (
                    <p className="mt-1 font-mono text-xs text-accent">
                      {msg.subject}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                  {!msg.read && (
                    <button
                      onClick={() => markAsRead(msg.id)}
                      className="rounded-md border border-border p-1.5 text-muted transition-colors hover:text-green-400 cursor-pointer"
                      title="Mark as read"
                    >
                      <Check size={12} />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
