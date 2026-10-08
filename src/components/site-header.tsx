"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  TrendingUp,
  Search,
  Share2,
  Zap,
  Bookmark,
  ChevronDown,
} from "lucide-react";
import { navItems, site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Short labels for the nav row so all sections fit on one line. */
function shortLabel(label: string): string {
  const amp = label.indexOf(" &");
  return amp > 0 ? label.slice(0, amp) : label;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Live strip — dark ticker teaser above the chrome */}
      <div className="bg-midnight text-ink-300 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center gap-3 text-[11px] font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald pulse-emerald" />
            <span className="text-emerald font-semibold">LIVE</span>
          </span>
          <span className="text-ink-500">·</span>
          <span>NGX All-Share <span className="text-signal-up">+0.42%</span></span>
          <span className="text-ink-500">·</span>
          <span>USD/NGN ₦1,485 <span className="text-signal-down">-0.18%</span></span>
          <span className="text-ink-500">·</span>
          <span>BTC $108,420 <span className="text-signal-up">+1.4%</span></span>
          <span className="text-ink-500 hidden md:inline">·</span>
          <span className="hidden md:inline text-gold">Q2 African VC: $2.85B deployed</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
        {/* Logo row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-20">
            {/* Left actions */}
            <div className="flex items-center gap-1 justify-start">
              <button
                className="p-2.5 text-coal/70 hover:text-gold-deep transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                className="p-2.5 text-coal/70 hover:text-gold-deep transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Centered logo */}
            <Link href="/" className="flex items-center gap-2.5 group justify-center">
              <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center group-hover:bg-gold-deep transition-colors shadow-sm">
                <TrendingUp className="w-5 h-5 text-midnight" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-[22px] sm:text-2xl tracking-tight text-coal">
                {site.name}
              </span>
            </Link>

            {/* Right actions */}
            <div className="flex items-center gap-1 justify-end">
              <button
                className="p-2.5 text-coal/70 hover:text-gold-deep transition-colors"
                aria-label="Trending now"
              >
                <Zap className="w-5 h-5" />
              </button>
              <button
                className="relative p-2.5 text-coal/70 hover:text-gold-deep transition-colors"
                aria-label="Saved stories"
              >
                <Bookmark className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold text-midnight text-[9px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2.5 text-coal hover:text-gold-deep"
                aria-label="Toggle menu"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Nav row — centered, magazine style */}
        <nav className="hidden lg:block border-t border-line/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <ul className="flex items-center justify-center gap-7 h-12">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 text-[12.5px] font-semibold uppercase tracking-[0.08em]",
                      "text-coal/75 hover:text-gold-deep transition-colors whitespace-nowrap"
                    )}
                  >
                    {shortLabel(item.label)}
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-line bg-paper">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm font-semibold text-coal/80 hover:text-gold-deep hover:bg-cream rounded-lg"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
