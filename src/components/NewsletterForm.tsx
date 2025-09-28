"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");
      setStatus("success");
      setMessage(data.message || "You're subscribed!");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={subscribe} className="rounded-lg border p-4">
      <h2 className="text-base font-semibold">Subscribe to the newsletter</h2>
      <p className="mt-1 text-sm text-gray-500">Occasional updates. No spam.</p>
      <div className="mt-3 flex gap-2">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full max-w-md flex-1 rounded border bg-white px-3 py-2 text-sm outline-none ring-0 dark:bg-zinc-900"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded bg-black px-3 py-2 text-sm text-white disabled:opacity-60 dark:bg-white dark:text-black"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
      {message && (
        <p className={`mt-2 text-sm ${status === "error" ? "text-red-600" : "text-green-600"}`}>{message}</p>
      )}
    </form>
  );
}
