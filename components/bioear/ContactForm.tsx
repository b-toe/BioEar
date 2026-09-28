"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

const CATEGORIES = ["General", "Engineering", "Research", "Collaboration"] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", category: "General", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("contact_messages").insert({
        name: form.name,
        email: form.email,
        category: form.category.toLowerCase(),
        message: form.message,
      });
      if (error) throw error;
      setStatus("sent");
      setForm({ name: "", email: "", category: "General", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="text-base text-ink">Thanks — your message has been received.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray">Name</label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none focus:border-ink/40"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray">Email</label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none focus:border-ink/40"
        />
      </div>
      <div>
        <label htmlFor="category" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray">Category</label>
        <select
          id="category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none focus:border-ink/40"
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray">Message</label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none focus:border-ink/40"
        />
      </div>
      <Button type="submit" variant="primary">
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
      {status === "error" && (
        <p className="text-sm text-gray">Something went wrong. Please try again later.</p>
      )}
    </form>
  );
}
