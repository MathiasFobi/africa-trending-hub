import Link from "next/link";
import { site, categories } from "@/data/site";
import { XIcon, CodeXml, Mail, Rss } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-cream border-t border-line mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gold flex items-center justify-center">
                <span className="text-midnight font-extrabold text-sm">A</span>
              </div>
              <span className="font-extrabold tracking-tight text-coal">{site.name}</span>
            </div>
            <p className="text-sm text-smoke max-w-sm leading-relaxed mb-4">
              {site.tagline}. The intelligence network of modern Africa.
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href={`https://twitter.com/${site.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-line hover:bg-gold hover:border-gold hover:text-midnight text-smoke flex items-center justify-center transition-colors"
                aria-label="X (Twitter)"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white border border-line hover:bg-gold hover:border-gold hover:text-midnight text-smoke flex items-center justify-center transition-colors"
                aria-label="RSS"
              >
                <Rss className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="w-9 h-9 rounded-lg bg-white border border-line hover:bg-gold hover:border-gold hover:text-midnight text-smoke flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/MathiasFobi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-line hover:bg-gold hover:border-gold hover:text-midnight text-smoke flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <CodeXml className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-deep mb-3">
              Coverage
            </h4>
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-smoke hover:text-coal transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-deep mb-3">
              Intelligence
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/startups" className="text-smoke hover:text-coal">Startup Tracker</Link></li>
              <li><Link href="/pulse" className="text-smoke hover:text-coal">Pulse Dashboard</Link></li>
              <li><Link href="/events" className="text-smoke hover:text-coal">Events Map</Link></li>
              <li><Link href="/opportunities" className="text-smoke hover:text-coal">Opportunities</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-deep mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-smoke hover:text-coal">About</Link></li>
              <li><Link href="#" className="text-smoke hover:text-coal">Editorial Standards</Link></li>
              <li><Link href="#" className="text-smoke hover:text-coal">Contact</Link></li>
              <li><Link href="#" className="text-smoke hover:text-coal">Careers</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-faint">
            © 2026 {site.name}. All rights reserved. Made with intention in Atlanta.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-faint">
            <Link href="#" className="hover:text-gold-deep">Privacy</Link>
            <Link href="#" className="hover:text-gold-deep">Terms</Link>
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
