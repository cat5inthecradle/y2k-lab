# Y2K Bug Lab

An interactive web lab where students fix real Y2K bugs by editing code in the browser. Eight lessons, eight characters, eight countries' worth of software that broke at midnight.

**Live site:** [cat5inthecradle.github.io/y2k-lab](https://cat5inthecradle.github.io/y2k-lab/)

## Vision

The Y2K bug is one of the most important events in software history, and it's almost never taught. Students hear "computers couldn't handle the year 2000" and that's where the lesson ends. But the real story is richer than that: thousands of different systems broke in thousands of different ways, and the reason it wasn't a catastrophe is because regular people — sysadmins, junior developers, the assistant manager who "knew computers" — stayed late, read the code, and fixed it.

This lab puts students in those people's shoes. Each lesson is a real Y2K incident (or closely based on one), with real code that has a real bug. Students read the briefing, understand the scenario, edit the code in a split-pane editor, and see live output until all tests pass.

## Tone

The voice is a blend of two things:

**The framing is Carmen Sandiego.** Each lesson stars a named character with a punny name (Nils Overflow, Al Gorithm, Connie Cattenate) dispatched to a specific location in the world. The briefings set a scene — 2 AM at a hospital, a panicking track manager, a pager going off at midnight. The characters are warm and human and slightly funny. But critically, they are not elite agents or superheroes. They're the night shift IT admin, the compliance officer who is not a programmer, the junior dev whose senior is on vacation in Cancun. The message is: regular people doing hard work saved the world from Y2K.

**The code is late-90s technical culture.** Code comments read like real source code from the era — terse, matter-of-fact, occasionally sardonic. Test output says "FAIL: incorrect ages. See toFullYear()." not "Oh no! Something went wrong!" The visual style is subtle late-90s nostalgia: Verdana, Georgia, Courier New; beveled borders; amber-on-dark-navy; no fake CRT scanlines or "best viewed in Netscape" jokes.

The contrast between the two layers is intentional. The world around the code is colorful and adventurous; the code itself is cold and terse and real. That's what it actually felt like to debug production systems at 2 AM.

## Pedagogy

**Audience:** Grades 9-12 CS students. The code is JavaScript, uses `var` and `for` loops (not modern ES6+), and avoids framework concepts. Students need basic programming literacy — variables, functions, conditionals, loops — but nothing beyond that.

**Difficulty curve:** Lessons are ordered Easy through Hard. Early lessons have a single function to fix with a clear bug. Later lessons require understanding multiple interacting functions, writing new logic from scratch, or debugging someone else's buggy fix.

| # | Title | Pattern | Difficulty |
|---|-------|---------|------------|
| 1 | Baby Born 100 Years Old | 2-digit year windowing | Easy |
| 2 | "Twenty O'Clock" | Shared format-parsing logic | Easy-Medium |
| 3 | The $91,000 Video Rental | Date math with 2-digit years | Easy-Medium |
| 4 | "January 1, 19100" | String concatenation vs. addition | Easy |
| 5 | The Leap Day That Didn't Exist | Incomplete leap year rule | Medium |
| 6 | Slot Machines Go Dark | Look-ahead date failure | Medium |
| 7 | Transactions from 1899 | Database cleanup / date correction | Medium-Hard |
| 8 | The Fix That Broke the Satellites | Patch-induced regression | Hard |

**Progressive hints:** Each lesson has three hints that move from observation ("what do you see?") to understanding ("why is it happening?") to solution ("here's the approach"). Students can use zero, one, two, or all three.

**Live feedback:** The split-pane editor re-runs code on every change. Students see test results immediately — green checks and red X's, with expected vs. actual values. There's no "submit" step; the code either passes or it doesn't.

**Real incidents:** Every lesson is based on a real Y2K event. The Danish hospital, the New York video store, the US Naval Observatory, the Japanese seismographs, the Delaware slot machines, the German bank, the Fort Belvoir satellite station — these all actually happened. The specific code is simplified and modernized for the browser, but the bugs are faithful to the originals.

## The Cast

| Lesson | Character | Role | Name pun |
|--------|-----------|------|----------|
| 1 | Nils Overflow | Night shift IT admin, Copenhagen | nil + overflow |
| 2 | Polly Parsons | Building systems tech, Grand Rapids | poly + parse |
| 3 | Al Gorithm | Video store assistant manager, Utica | algorithm |
| 4 | Connie Cattenate | Junior web developer, Washington DC | concatenate |
| 5 | Sora Validata | Field instrument tech, Japan | validate |
| 6 | Bo Lean | Gaming commission compliance officer, Dover | boolean |
| 7 | Klaus Nullwert | Database administrator, Germany | null value (German) |
| 8 | Reggie Session | Ground systems analyst, Fort Belvoir | regression |

## Running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/y2k-lab/`.

## Building for production

```bash
npm run build
```

Output goes to `dist/`. The site is configured with `base: '/y2k-lab/'` in `vite.config.js` for GitHub Pages deployment under that path. Uses `HashRouter` so deep links work without server-side routing.

## Deploying

Pushes to `main` trigger a GitHub Actions workflow that builds and deploys to GitHub Pages automatically. See `.github/workflows/deploy.yml`.

## Tech stack

- **Vite + React** — minimal scaffolding, fast dev server
- **react-router-dom** — HashRouter for GitHub Pages compatibility
- **Sandboxed iframes** — student code runs in `<iframe srcdoc>` with `allow-scripts allow-same-origin`
- **Web Speech API** — lesson 2 uses `speechSynthesis` for audio playback
- **Zero dependencies beyond React** — no syntax highlighting library, no state management, no CSS framework

## License

MIT
