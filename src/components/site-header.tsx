"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, TrendingUp } from "lucide-react";
import { navItems, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-midnight/95 backdrop-blur border-b border-ink-700/60">
      {/* Top strip — live pulse teaser */}
      <div className="bg-ink-900 border-b border-ink-800/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center gap-3 text-[11px] font-mono text-ink-300">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald pulse-emerald" />
            <span className="text-emerald font-semibold">LIVE</span>
          </span>
          <span className="text-ink-400">·</span>
          <span>NGX All-Share <span className="text-signal-up">+0.42%</span></span>
          <span className="text-ink-400">·</span>
          <span>USD/NGN ₦1,485 <span className="text-signal-down">-0.18%</span></span>
          <span className="text-ink-400">·</span>
          <span>BTC $108,420 <span className="text-signal-up">+1.4%</span></span>
          <span className="text-ink-400 hidden md:inline">·</span>
          <span className="hidden md:inline text-gold">Q2 African VC: $2.85B deployed</span>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-sm bg-gold flex items-center justify-center group-hover:bg-gold/90 transition-colors">
              <TrendingUp className="w-5 h-5 text-midnight" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-ivory text-lg tracking-tight">
                {site.name}
              </span>
              <span className="text-[10px] font-mono text-ink-300 tracking-wider uppercase mt-0.5">
                Pulse · Stories · Data
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium text-ink-200 hover:text-gold transition-colors rounded-sm",
                  "hover:bg-ink-800/40"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="#newsletter"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold bg-gold text-midnight hover:bg-gold/90 transition-colors rounded-sm"
            >
              Subscribe
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-ivory hover:text-gold"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-ink-700/60 bg-midnight">
          <nav className="max-w-7xl mx-auto px-4 py-2 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-ink-200 hover:text-gold hover:bg-ink-800/40 rounded-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
