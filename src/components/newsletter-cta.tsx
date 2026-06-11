"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="newsletter" className="bg-ink-900 border border-ink-700 rounded-sm overflow-hidden">
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
            One email. Five minutes. The five stories, three numbers, and one chart shaping Africa today.
            Delivered every weekday at 7 AM ET.
          </p>
          <div className="mt-6 flex items-center gap-4 text-xs font-mono text-ink-300">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
              <span>12,400+ readers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>4.9★ rating</span>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10 flex flex-col justify-center bg-midnight">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald/10 border border-emerald/40 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="font-display font-bold text-xl text-ivory">You're in.</h3>
              <p className="text-sm text-ink-300 mt-1.5">
                Check your inbox tomorrow at 7 AM ET.
              </p>
            </div>
          ) : (
            <>
              <label className="text-xs font-mono uppercase tracking-widest text-ink-300 mb-2 block">
                Your email
              </label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-3 bg-ink-800 border border-ink-700 rounded-sm text-ivory placeholder-ink-400 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <button
                  onClick={() => email && setSubmitted(true)}
                  className="px-5 py-3 bg-gold text-midnight font-semibold rounded-sm hover:bg-gold/90 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-[10px] font-mono text-ink-400 mt-3">
                No spam. Unsubscribe anytime. We respect your inbox.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
