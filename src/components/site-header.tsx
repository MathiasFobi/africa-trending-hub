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
import { categories, site } from "@/data/site";
import { cn } from "@/lib/utils";

const mainNav = [
  { href: "/", label: "Home" },
  { href: "/pulse", label: "Pulse" },
  { href: "/startups", label: "Startups" },
  { href: "/events", label: "Events" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/watch", label: "Watch" },
];

const navLinkCls =
  "flex items-center gap-1 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-coal/75 hover:text-gold-deep transition-colors whitespace-nowrap";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
      {/* Logo row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 sm:h-20">
          {/* Left actions */}
          <div className="flex items-center gap-1 justify-start">
            <button
              className="p-2 sm:p-2.5 text-coal/70 hover:text-gold-deep transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="hidden sm:block p-2.5 text-coal/70 hover:text-gold-deep transition-colors"
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
            <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-coal whitespace-nowrap">
              {site.name}
            </span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-1 justify-end">
            <button
              className="p-2 sm:p-2.5 text-coal/70 hover:text-gold-deep transition-colors"
              aria-label="Trending now"
            >
              <Zap className="w-5 h-5" />
            </button>
            <button
              className="relative p-2 sm:p-2.5 text-coal/70 hover:text-gold-deep transition-colors"
              aria-label="Saved stories"
            >
              <Bookmark className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold text-midnight text-[9px] font-bold flex items-center justify-center">
                3
              </span>
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 sm:p-2.5 text-coal hover:text-gold-deep"
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
          <ul className="flex items-center justify-center gap-8 h-12">
            {mainNav.slice(0, 3).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={navLinkCls}>
                  {item.label}
                </Link>
              </li>
            ))}
            {/* Topics dropdown */}
            <li className="relative group">
              <button className={cn(navLinkCls, "cursor-pointer")}>
                Topics
                <ChevronDown className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-150">
                <div className="bg-card border border-line rounded-xl shadow-xl py-2 w-60">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="block px-4 py-2.5 text-sm font-medium text-coal/80 hover:text-gold-deep hover:bg-cream transition-colors"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            {mainNav.slice(3).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={navLinkCls}>
                  {item.label}
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
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-semibold text-coal/80 hover:text-gold-deep hover:bg-cream rounded-lg"
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 pt-3 pb-1 text-[10px] font-mono uppercase tracking-widest text-faint">
              Topics
            </div>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-coal/70 hover:text-gold-deep hover:bg-cream rounded-lg"
              >
                {c.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
