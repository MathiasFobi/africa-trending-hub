import Link from "next/link";
import { site, categories } from "@/data/site";
import { XIcon, CodeXml, Mail, Rss } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-ink-900 border-t border-ink-700/60 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-sm bg-gold flex items-center justify-center">
                <span className="text-midnight font-display font-bold text-sm">A</span>
              </div>
              <span className="font-display font-bold text-ivory">{site.name}</span>
            </div>
            <p className="text-sm text-ink-300 max-w-sm leading-relaxed mb-4">
              {site.tagline}. The intelligence network of modern Africa.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`https://twitter.com/${site.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-ink-800 hover:bg-gold hover:text-midnight text-ink-200 flex items-center justify-center transition-colors"
                aria-label="X (Twitter)"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-sm bg-ink-800 hover:bg-gold hover:text-midnight text-ink-200 flex items-center justify-center transition-colors"
                aria-label="RSS"
              >
                <Rss className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="w-9 h-9 rounded-sm bg-ink-800 hover:bg-gold hover:text-midnight text-ink-200 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/MathiasFobi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-ink-800 hover:bg-gold hover:text-midnight text-ink-200 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <CodeXml className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold mb-3">
              Coverage
            </h4>
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-ink-200 hover:text-ivory transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold mb-3">
              Intelligence
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/startups" className="text-ink-200 hover:text-ivory">Startup Tracker</Link></li>
              <li><Link href="/pulse" className="text-ink-200 hover:text-ivory">Pulse Dashboard</Link></li>
              <li><Link href="/events" className="text-ink-200 hover:text-ivory">Events Map</Link></li>
              <li><Link href="/opportunities" className="text-ink-200 hover:text-ivory">Opportunities</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-ink-200 hover:text-ivory">About</Link></li>
              <li><Link href="#" className="text-ink-200 hover:text-ivory">Editorial Standards</Link></li>
              <li><Link href="#" className="text-ink-200 hover:text-ivory">Contact</Link></li>
              <li><Link href="#" className="text-ink-200 hover:text-ivory">Careers</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-ink-400">
            © 2026 {site.name}. All rights reserved. Made with intention in Atlanta.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-ink-400">
            <Link href="#" className="hover:text-gold">Privacy</Link>
            <Link href="#" className="hover:text-gold">Terms</Link>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald pulse-emerald" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
