# CLAUDE.md — Ahmed Badway

> Work on main branch only. No new branches. Ever.

---

## 👤 Developer Profile
- **Name:** Ahmed Badway
- **Role:** Frontend Developer & Freelancer
- **Location:** Mansoura, Egypt
- **GitHub:** ahmedbadway
- **Higgsfield:** ahmedbadway93
- **Expertise:** React, Vite, Tailwind CSS, Motion Design, Logo Design, Framer Motion, GSAP
- **Languages:** Arabic (native) + English

---

## 🌍 Project Types
- **All types:** Clinic websites, portfolios, SaaS, e-commerce, dashboards
- **Primary interface language:** English (Arabic navigation supported)
- **Design philosophy:** No generic AI templates — premium, intentional, high-end work

---

## 🌿 Git Rules
- `main` branch ONLY — never create new branches
- Every session: confirm you are on `main` before any work
- Commit messages in English, descriptive
- Never push to any branch except `main`

---

## 💻 Coding Rules
- No wireframes — start directly on code
- **PascalCase** file naming: `HeroSection.jsx`, `Navbar.jsx`, `Button.jsx`
- SVG placeholders for any missing images
- Images: always use `import.meta.env.BASE_URL`
- After every edit: flag unused or redundant code for deletion
- Main branch only in Claude Code — include `"Work on main branch only. No new branches."` in every prompt

---

## 🛠️ Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS + Custom CSS (when needed)
- **Animation:** Motion (motion/react) / Framer Motion / GSAP
- **Fonts:** Cairo (Arabic) + Nunito (English)
- **Build:** Vite (production-ready builds)
- **Color system:** CSS variables (OKLCH preferred) — never hardcode colors
- **Icons:** Phosphor Icons (preferred) or custom SVG

---

## 🎨 Design Skills — Load Before Starting
Apply these skills as relevant to the project:

### Core Design Skills (Always Available)
1. **Emil Kowalski** (`skills/emil-design-eng.md`)
   - Advanced animation choreography, micro-interactions, spring physics
   - Use for: Any project with motion, interactive components, GSAP sequencing
   
2. **GPT-Taste** (`skills/gpt-taste.md`)
   - Awwwards-level premium design, creative randomization, typography variance
   - Use for: Creative, high-end, editorial projects
   
3. **Taste Skill v2** (`skills/taste-skill-v2.md`)
   - Landing pages, portfolios, redesigns without template feel
   - Inline image typography, asymmetric layouts, high variance
   - Default for most projects
   
4. **Minimalist UI** (`skills/minimalist-ui.md`)
   - Clean editorial style, warm monochrome, Notion/Linear aesthetic
   - Use for: Dashboard-style, clean professional projects
   
5. **Industrial Brutalist UI** (`skills/industrial-brutalist-ui.md`)
   - Swiss typography, tactical telemetry, CRT terminal aesthetics
   - Use for: Dark dashboards, data-heavy interfaces, portfolio edge cases

### Enhancement & Refinement Skills
6. **Redesign Existing Projects** (`skills/redesign-existing-projects.md`)
   - Audit + upgrade existing codebases, remove AI slop patterns
   - Use for: Client redesigns, legacy code modernization
   
7. **High-End Visual Design** (`skills/high-end-visual-design.md`)
   - Agency-level ($150k+), double-bezel architecture, spatial rhythm
   - Use for: Premium projects, brand/identity work
   
8. **Stitch Design Taste** (`skills/stitch-design-taste.md`)
   - Semantic design systems, DESIGN.md generation, Google Stitch integration
   - Use for: Generating structured design systems

### Code Quality & Output Skills
9. **Full-Output Enforcement** (`skills/full-output-enforcement.md`)
   - Complete code generation, no truncation, no placeholder patterns
   - Automatic — applies to all artifacts
   
10. **Impeccable** (`skills/impeccable.md`)
    - UX/UI design review, critique, polish, animation, typography, layout
    - Commands: `craft`, `shape`, `audit`, `polish`, `bolder`, `quieter`, etc.
    - Use for: Design iteration, final quality pass, production-ready polish

---

## 🤖 Claude Code Workflow
1. **Before starting:** Load relevant design skills from list above
2. **File creation:** Always PascalCase, main branch only
3. **Code generation:** Complete, production-ready — no sketches or placeholders
4. **After editing:** Flag unused code, review bundle size
5. **Deployment:** Ask approval before any GitHub Pages or Vercel push

---

## 🚀 Deployment Options
You work with:
- **GitHub Pages** — auto-deploy via GitHub Actions
- **Vercel** — instant preview + production deployments
- **Netlify** — alternative hosting with instant builds

**Rule:** Never create `gh-pages` branch or trigger deployment without explicit approval. Always ask: **"Deploy to [platform] now?"**

---

## 🧪 Playwright E2E Testing

### Setup
Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

### Run Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run tests with visual UI (recommended)
npm run test:e2e:ui

# Debug mode (step-by-step)
npm run test:e2e:debug

# Run specific test file
npx playwright test tests/e2e/example.e2e.spec.js
```

### Test Features
✅ Test all links and navigation  
✅ Test button clicks and interactions  
✅ Test form submissions  
✅ Test responsive design (375px, 768px, 1440px)  
✅ Test multiple browsers (Chrome, Firefox, Safari)  

---

## 💰 Higgsfield Workflow (AI Image/Video Generation)

### Credit Management (CRITICAL)
**You MUST control every credit spend.** Follow this flow strictly:

1. **UNLIMITED Models (Must be activated in prompt):**
   - **Image:** Kling O1, FLUX.2 Pro, FLUX.2 Max, GPT Image, Multi Reference, Nano Banana Pro
   - **Video:** Cinema Studio (requires activation), Seedance 2.0, Kling 3.0
   - **Audio:** Mirelo, Sonilo
   - **⚠️ REQUIREMENT:** To use unlimited models, you MUST say in the prompt: **"Use unlimited"** or **"Activate unlimited"**
   - Without activation in prompt → models revert to credit-based pricing

2. **Before ANY generation (paid or unlimited):**
   - Run `get_cost: true` to preflight the exact credit cost
   - Claude will respond with the credit amount BEFORE spending
   - Only proceed if you explicitly approve the cost
   - **You must say "yes, do it"** — never silent auto-spend

3. **Never generate without cost disclosure:**
   - Every paid generation shows cost → you approve → execution happens
   - This applies to all upscales, advanced models, premium features
   - Even unlimited models need approval — they still consume resources

### Available Models (By Type)

**Image (Unlimited available):**
- Kling O1 (UNLIMITED with activation)
- FLUX.2 Pro (UNLIMITED with activation)
- FLUX.2 Max (UNLIMITED with activation)
- GPT Image (UNLIMITED with activation)
- Multi Reference (UNLIMITED with activation)
- Nano Banana Pro (quick, UNLIMITED)
- Nano Banana 2 (Flash speed)

**Video (Limited options):**
- Cinema Studio (UNLIMITED with activation) — best for character/product
- Seedance 2.0 — cinematic, motion-driven
- Kling 3.0 — photorealistic, advanced motion
- ⚠️ No other video models have unlimited tier

**Audio:**
- Mirelo (text-to-audio, UNLIMITED)
- Sonilo (music generation, UNLIMITED)

### Paid Premium (Use Sparingly)
- Upscaling (2K/4K via ByteDance or Topaz)
- Advanced motion control (Kling with complex scenes)
- High-res video generation (1080p+)

### How to Activate Unlimited (Critical)
In your generation prompt, include one of these:
- **"Use unlimited models"**
- **"Activate unlimited"**
- **"Use UNLIMITED tier"**

Without this phrase, even unlimited-capable models charge credits.

---

## 📝 Communication Style

### Response Format (ALWAYS)
Every response you provide follows this pattern:

1. **English only** — all code comments, responses, explanations in English
2. **Three-sentence summary** — what was done, what changed, what to expect next
3. **Concise output** — avoid long preambles or excessive explanation
4. **Production mindset** — code is ready to ship, not exploratory

### Design Advisor Mode
When you see a potential design issue or risk:
- **You act as a design expert**, not just a coder
- **Flag problems immediately** — "This layout won't work on mobile because…"
- **Suggest alternatives** — "Instead, try this approach…"
- **Enforce best practices** — even if I didn't ask
- **Be direct** — no vague warnings, concrete advice only
- **Default recommendation:** You recommend what's best for the website, not what I said

Example: If I ask for a centered hero on a SaaS dashboard, you say: "That won't work. Here's why. Use asymmetric split instead with [specific layout]."

---

## ✅ Session Checklist
Before you start work on any project:
- [ ] On `main` branch (confirmed with you)
- [ ] Design skills loaded (which ones?)
- [ ] PascalCase file naming standard applied
- [ ] SVG placeholders in place for missing assets
- [ ] `import.meta.env.BASE_URL` for all images
- [ ] CSS variables defined for colors (OKLCH, no hardcoding)
- [ ] Main branch commitment confirmed
- [ ] Higgsfield: understand credit control flow (ask before spending)

---

## 🔧 Verification Commands

```bash
# Build
npm run build

# Development
npm run dev

# Lint
npm run lint

# Type check
npm run typecheck

# E2E Tests (Playwright)
npm run test:e2e

# E2E Tests with UI
npm run test:e2e:ui
```

---

## 📂 Project Structure (When Creating New)

```
my-project/
├── CLAUDE.md           ← This file
├── src/
│   ├── components/     ← Reusable components (PascalCase)
│   ├── pages/          ← Page components
│   ├── assets/         ← Images, fonts, SVGs
│   ├── styles/         ← Global CSS, variables
│   ├── utils/          ← Utilities, helpers
│   └── App.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🎯 Key Principles

1. **No templates** — every site is custom, intentional, high-end
2. **Motion-first** — animations are considered from the start
3. **Responsive always** — tested at 375px, 768px, 1440px
4. **Performance matters** — no bloat, optimize for speed
5. **Production ready** — code ships as-is, no "polish later"
6. **Accessibility** — contrast, keyboard nav, semantic HTML mandatory
7. **Design authority** — I catch design issues before they happen

---

## 🚫 Anti-Patterns (Never Do These)

- Generic AI design templates (three-equal-cards, centered hero, etc.)
- Pure black (#000000) — use Off-Black or Zinc-950
- `Inter` font in premium projects
- Gradient text on large headings
- Neon outer glows or generic shadows
- Emojis in code or UI
- Hardcoded colors — always use CSS variables
- Overlapping text and images (clean spatial separation)
- Placeholder copy ("Lorem ipsum", "John Doe", "Acme Corp")
- Disabled buttons without clear visual state
- No alt text on meaningful images

---

## 💬 Questions During Development

If you're unsure:
- **Design direction?** → I recommend the best approach, not just what you asked for
- **Motion complexity?** → Use Emil Kowalski skill to guide spring physics
- **Color/typography?** → Leverage taste-skill or impeccable skill
- **Performance?** → Check bundle size, optimize aggressively
- **Mobile issue?** → Always test at 375px width — never assume it works

---

## 🔐 Important Rules
- **Work on `main` only** — this cannot be overstated
- **No breaking changes without discussion** — major refactors need approval
- **Commit often** — one logical change per commit
- **Test before saying done** — build, lint, typecheck, visual review
- **Higgsfield costs** — you approve every paid generation explicitly

---

**Last updated:** June 13, 2026  
**Committed to:** main branch only
