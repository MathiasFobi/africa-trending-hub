"use client";

import { useState } from "react";
import { Mail, Check, AlertCircle, Loader2 } from "lucide-react";

type Variant = "default" | "compact" | "inline";

type Props = {
  source?: string;
  variant?: Variant;
  className?: string;
};

export function NewsletterCta({ source = "home", variant = "default", className }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage(data.message);
      if (typeof data.subscriberCount === "number") setSubscriberCount(data.subscriberCount);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 ${className ?? ""}`}>
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            placeholder="you@example.com"
            className="w-full pl-10 pr-3 py-3 bg-ink-800 border border-ink-700 rounded-sm text-ivory placeholder-ink-400 focus:border-gold focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-3 bg-gold text-midnight font-semibold rounded-sm hover:bg-gold/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
          Subscribe
        </button>
        {status === "error" && (
          <div className="sm:basis-full text-xs text-signal-down flex items-center gap-1.5 mt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {message}
          </div>
        )}
        {status === "success" && (
          <div className="sm:basis-full text-xs text-emerald flex items-center gap-1.5 mt-1">
            <Check className="w-3.5 h-3.5" />
            {message}
          </div>
        )}
      </form>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`bg-ink-800/50 border border-ink-700/60 rounded-sm p-5 ${className ?? ""}`}>
        <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-2">Subscribe</div>
        <h3 className="font-display font-bold text-lg text-ivory leading-tight mb-3">
          Get the Daily Pulse in your inbox.
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              placeholder="you@example.com"
              className="flex-1 px-3 py-2.5 bg-ink-900 border border-ink-700 rounded-sm text-sm text-ivory placeholder-ink-400 focus:border-gold focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-4 py-2.5 bg-gold text-midnight font-semibold rounded-sm hover:bg-gold/90 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Join"}
            </button>
          </div>
          {status === "success" && (
            <div className="mt-2 text-xs text-emerald flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              {message}
            </div>
          )}
          {status === "error" && (
            <div className="mt-2 text-xs text-signal-down flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              {message}
            </div>
          )}
        </form>
      </div>
    );
  }

  // default
  return (
    <section id="newsletter" className={`bg-ink-900 border border-ink-700 rounded-sm overflow-hidden ${className ?? ""}`}>
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-8 sm:p-10 bg-gradient-to-br from-ink-800 to-ink-900">
          <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-gold" />
            The Daily Pulse
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory leading-tight">
            Africa's intelligence,
            <br />
            <span className="text-gold">in your inbox.</span>
          </h2>
          <p className="mt-4 text-ink-200 leading-relaxed">
            One email. Five minutes. The five stories, three numbers, and one chart shaping
            Africa today. Delivered every weekday at 7 AM ET.
          </p>
          <div className="mt-6 flex items-center gap-4 text-xs font-mono text-ink-300">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
              <span>
                {subscriberCount !== null
                  ? `${subscriberCount.toLocaleString()} reader${subscriberCount === 1 ? "" : "s"}`
                  : "12,400+ readers"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>4.9★ rating</span>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10 flex flex-col justify-center bg-midnight">
          {status === "success" ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald/10 border border-emerald/40 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="font-display font-bold text-xl text-ivory">You're in.</h3>
              <p className="text-sm text-ink-300 mt-1.5">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label className="text-xs font-mono uppercase tracking-widest text-ink-300 mb-2 block">
                Your email
              </label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-3 bg-ink-800 border border-ink-700 rounded-sm text-ivory placeholder-ink-400 focus:border-gold focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-5 py-3 bg-gold text-midnight font-semibold rounded-sm hover:bg-gold/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                  Subscribe
                </button>
              </div>
              {status === "error" && (
                <div className="mt-3 text-xs text-signal-down flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {message}
                </div>
              )}
              <p className="text-[10px] font-mono text-ink-400 mt-3">
                No spam. Unsubscribe anytime. We respect your inbox.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
