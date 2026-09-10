# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: developers who build things and have nowhere good to put them.** Students, junior and self-taught developers, and indie builders who finish a side project and end up with a GitHub repo nobody reads and a screenshot in a Discord channel. They want the work seen, credited and reachable — by peers, by other builders, and by whoever might hire them.

**Secondary: the people who come to look.** Other developers browsing for inspiration or collaborators, and anyone evaluating a builder's work. They arrive without an account and must be able to browse projects and profiles before signing up.

The interface language is English. The team is Vietnamese; source comments are written in both Vietnamese and English.

## Product Purpose

Fiurozz is a place where developers publish their projects, discover what other people are building, and connect with the builders behind the work.

Its own words, from the site metadata and home page: *"Showcase your work, your way."* — *"Fiurozz is where developers showcase their projects, connect with other builders, and ship faster with AI agents."*

Success is a project page worth sending to someone: good enough to be a portfolio link, public enough to be found, and social enough that the author gets a reply rather than a view count.

## Positioning

Two commitments separate it from a portfolio template or a link aggregator:

1. **The project is the unit, not the person.** A profile exists to hold projects; the project page is the destination that gets shared. Discovery, ranking (Top 3, featured) and browsing are all project-first.
2. **A design agent is planned as a first-class part of the product, not a bolt-on.** Catronaut is intended to take a described idea and return a real, shippable interface — see the honesty note in Capabilities.

The product is simultaneously a real product aimed at real users, the founders' personal portfolio, and a technical playground. All three are legitimate goals; when they conflict, decide explicitly rather than silently optimizing for one.

## Operating Context

- **Desktop-first, browser-based.** The realistic scene is a developer at a desk between coding sessions, on a laptop, often at night. Mobile is a real but secondary context (browsing, not authoring).
- **Both themes ship.** Light and dark are selectable and follow the system by default (`next-themes`, `defaultTheme="system"`). Neither is the "real" one; every surface must hold up in both.
- **Guest-first browsing.** Projects and listings are readable without an account. Auth gates authoring, not looking.
- **Split frontend/backend.** This repository is the frontend only. It talks to a separate backend over REST at `NEXT_PUBLIC_BE_URL`, through the `services/` layer, and every response is wrapped in an `ApiEnvelope` (`success`, `message`, `data`).

## Capabilities and Constraints

**Shipped and working**
- Project listing and project detail pages; featured projects and a Top 3 ranking on the home page.
- User profiles.
- Email/password registration and login with Zod validation, plus OAuth sign-in through Google, Facebook and GitHub (popup flow, `components/oauth-login-listener`).
- Session hydration on the server (`userService.getMe()` in the root layout, `AuthHydrator`, `useUserStore`).
- Light/dark theming, global search field, animated route progress.
- The `/design` landing page for Catronaut, including its scroll choreography.

**Planned, and not to be described as working**
- **Catronaut, the AI design agent, does not exist yet.** `/design` is a landing page for it and nothing more; there is no agent backend, no prompt endpoint, no generation. The code sample and the "AI Agent is thinking…" chip on the home page are illustrative UI, not a live feature. Never write copy, docs, or a PR description that claims Fiurozz can generate interfaces today.
- Members, Posts and Contact Us appear in the primary navigation; treat any of these as unbuilt until the route is verified in the codebase.

**Technical constraints**
- **Next.js 16 (`next@16.2.10`) with React 19.** This is not the Next.js most training data describes. Middleware is now `proxy.ts` at the repository root. Read `node_modules/next/dist/docs/` before writing framework code, and heed deprecation notices — this is also the standing instruction in `AGENTS.md`.
- Tailwind CSS v4, configured entirely in `app/globals.css` via `@theme inline`. There is no `tailwind.config.js`; adding one would split the source of truth.
- One dev server only. Never start a second `next dev` and never delete `.next/dev/lock` — it corrupts the Turbopack cache.
- Component stock is mixed on purpose: shadcn-style primitives in `components/ui/global/`, an `animate-ui` family in `components/animate-ui/`, plus Base UI and Radix underneath. Two `Button` implementations exist; see DESIGN.md for which one belongs where.

## Brand Commitments

- **Name:** Fiurozz. **Tagline:** "Showcase your work, your way."
- **Mascot: Catronaut**, an astronaut cat. It is the product's face and its agent's name, and it appears as pixel-art components (`components/ui/catronaut/` — `idle`, `happy`, `coding`), as the site logo, and as the painter in the `/design` hero plate. It is not decoration to be swapped for a generic icon.
- **Two visual worlds, deliberately separate.** The SaaS application and the `/design` landing page do not share an aesthetic, and this is a decision, not drift. DESIGN.md owns the boundary.
- **Real photography of the team's own desk** (`public/auth/Fizz.png`) is authentic brand material, not stock.

## Evidence on Hand

- **Real assets:** the Catronaut pixel components; `public/design/hero.png` (the commissioned Dutch-polder watercolour plate); `public/home/planet.png` and `fish.png`; `public/auth/Fizz.png` (a genuine photograph of a team member's desk); the Fiurozz logo mark.
- **Real content:** the home page copy, the four tenets on `/design`, and the site metadata are the team's own writing.
- **Credited authors** in `app/layout.tsx` metadata: Nguyen Le Tuan Phi (creator) and Phan Dinh Phuc.
- **Absent, and never to be fabricated:** user counts, project counts, testimonials, customer names, funding, pricing, benchmarks, uptime claims, and any Catronaut capability. `mock-data/` is development fixture data and must never be presented as real activity.

## Product Principles

1. **The project page is the product.** Every feature is judged by whether it makes a project worth sharing and worth arriving at.
2. **Looking comes before signing up.** Never gate browsing behind auth to inflate registrations.
3. **Claim only what runs.** Illustrative UI is welcome; a claim that the product does something it cannot is not. This binds copy, metadata, and Catronaut above all.
4. **Craft is a feature here.** This codebase is also a portfolio piece; a surface that works but looks unconsidered has failed half its job.
5. **Warmth over enterprise polish.** The audience is individual builders, not procurement committees. The product should feel like a well-kept desk, never like an admin console.

## Accessibility & Inclusion

No formal standard has been adopted. The floor the codebase already assumes: both themes readable, real `<form>` semantics with labelled inputs, keyboard-reachable controls with visible focus rings, and `prefers-reduced-motion` respected — `/design` already branches its scroll choreography on it, and new motion work is expected to do the same.
