# LESA-USA Website — Phase 1 Build

## Project
- **Repo:** `MathiasFobi/LESA-USA-INC` (GitHub)
- **Live site:** https://lesa-usa.vercel.app (Vercel, auto-deploys from GitHub push)
- **Local path:** `~/.openclaw/workspace/lesa-usa` (React/Vite/TypeScript SPA)
- **Design doc:** `lesa-usa/docs/LESA-USA-website-design-draft.docx`
- **Style reference image:** `lesa-usa/docs/style-reference-page-layout.jpg`

## Data Sources
- **Google Drive (all LESA content/photos):** https://drive.google.com/drive/folders/1DDaG1Xz1KDKsNs_S-G0garay8ozC3AjE

## Key Decisions (confirmed by King)
- **Image hosting:** GitHub repo folders (`public/images/{banners,events/YYYY,chapters,presidents}`)
- **Live domain:** lesa-usa.vercel.app (for now)
- **Approach:** Phased build; Phase 1 = public site foundation first
- **Brand:** Sisterhood • Faith • Justice; colors = burgundy `#8C1D24`, gold `#D4AF37`, cream `#FEFBF3`

## Phase 1 Scope (in progress)
1. Updated hero/banner with mission + recent photos
2. President's Corner (welcome msg, goals, vision, video placeholder)
3. Upcoming Events + Latest News sections
4. Quick action buttons (Join, Donate, Scholarship, Mentorship, Find a Chapter, Member Login)
5. Donations Center with progress bars (Scholarship, Emergency, Cameroon Projects, Convention, Community Outreach)
6. 501(c)(3) tax-deductible messaging throughout

## Components created (Phase 1)
- `QuickActions.tsx`
- `PresidentCorner.tsx`
- `NewsEvents.tsx`
- `DonationsCenterPublic.tsx`
- Updated `LandingPage.tsx` to wire them in

## Later Phases (from design doc, not started)
- Phase 2: Find-a-Chapter clickable US map + full membership portal expansion
- Phase 3: Scholarship Center + community impact galleries
- Phase 4: Online store + history timeline

## Image Assets (from King)
- **Banner/hero:** earlier 1100×500 group photo → `public/images/banners/lesa-hero-banner.jpg`
- **Gallery:** 14 PNGs (IMG_3771–IMG_3784) in Google Drive "LESA Gallery" folder:
  https://drive.google.com/drive/folders/1U9VHziwdbh1mWsLd-xi5lrlrP-ixirN-
- **Chapter images:** to be pulled from Drive per chapter (later)
- Local staged copies in `~/.openclaw/workspace/media/inbound/openclaw-staged-*`

## Firebase / Auth / Signup (2026-08-13)
- **Firebase project:** `qrme-ea7b6` (Auth + Firestore + Storage enabled)
- **Firestore database:** app uses the `(default)` database (NOT `lesausainc` — that one was created but unused; app targets `(default)` via `getFirestore(app)`)
- **Auth strategy (Option A):** email/password login only succeeds if the auth email matches an existing `members` doc in Firestore
- **Signup flow:** `signUp()` creates the Firebase Auth credential, then `createMemberProfile()` writes the matching `UserProfile` into the `members` collection so the new user can log in
- **Storage:** `getStorageInstance()` wired in `src/lib/firebase.ts` (photo uploads ready)
- **Env vars:** all 6 `VITE_FIREBASE_*` set on Vercel (production + preview)

### Bugs found & fixed (2026-08-13)
- **Missing `LogOut` import** in `Navbar.tsx` (lucide-react) — fixed, build verified
- **API key wrapped in literal quotes:** `.env` stored `VITE_FIREBASE_API_KEY="AIza..."` (with quotes); Vite injected the quotes into the bundle, so Firebase Auth got `"AIza..."` as the key → `auth/api-key-not-valid`. Fixed by stripping quotes from all 6 `VITE_FIREBASE_*` values in `.env`, re-pushing to Vercel, redeploying.
- **Firestore `(default)` database not found** — created per Option A; signup now works

### Verified end-to-end (2026-08-13)
- ✅ Signup → member profile created in Firestore → login → portal loads
- Test account: `test1786646228207@lesa-usa.org` (password `TestPass123!`) — **delete from Auth + `members` collection when done testing**

## Commits (2026-08-13)
- `2188d1e` — Fix missing LogOut import in Navbar; add Firestore auth layer (signIn/signUp/signOutUser), wire auth into App, Login & SignUp modals
- `ed53949` — Wire Firebase Storage; create member profile in Firestore on signup so new users can log in

## Open Items
- [x] Commit Phase 1 + push (commit `4c6745b` — Vercel auto-redeployed, site HTTP 200)
- [x] Set `GEMINI_API_KEY` as Vercel env var (verified live: AI newsletter endpoint works, HTTP 200)
- [x] Firebase Auth + Firestore + Storage wired; signup → member-profile → login verified live
- [ ] Delete test account `test1786646228207@lesa-usa.org` from Firebase Auth + `members` collection
- [ ] Copy photos into `public/images/` + wire hero banner + gallery, commit & push
- [ ] Swap Unsplash placeholders with real photos
- [ ] Later: full President's Corner page with monthly updates archive + video library
