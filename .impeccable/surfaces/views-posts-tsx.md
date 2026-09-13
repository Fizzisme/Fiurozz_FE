---
version: 1
slug: "views-posts-tsx"
primary_target: "views/Posts.tsx"
related_targets: ["views/PostThread.tsx","components/ui/post/post-item.tsx","components/ui/post/post-composer.tsx"]
---

# Posts — surface brief

**Scope:** `/posts` feed and `/posts/[postId]` thread, inside the `(sidebar)` layout. Mode: **Operate** (a builder reads, posts, replies).

**Audience & job:** developers on Fiurozz sharing what they are building, asking, or showing — text, a code snippet, screenshots, or a Fiurozz project — and replying to each other. Guests can read; posting, liking, reposting and bookmarking require sign-in.

**Pinned by the user:** Threads-like minimalism. Content: text, code block, images (≤4), attached Fiurozz project, quote. Interactions: like, reply thread, repost/quote, bookmark, share. Feed tabs: For you + Following. Data: server actions try the gateway, fall back to `mock-data/posts.ts` (same pattern as Members).

**Constraints:** no Posts backend yet — mock data is fixture, never presented as real activity. No invented counts beyond the fixture. Image uploads are local previews until the backend accepts files.

## Direction contract

THESIS: A single quiet column where the post is the only object — the Threads reading rhythm of avatar rail, name, words and four icons — refusing the dashboard feed of cards, sidebars of trends and coloured badges.

OWN-WORLD: Fiurozz application world unchanged: bone-white ground, Lexend Deca, hairline dividers between posts (no cards), 10px radius only on embeds (code, images, project, quote). Accent appears only as a liked heart, the primary Post button, and the unread-free active tab marker stays foreground ink.

STORY: The visitor scans what builders are shipping, opens a thread to read replies, and posts back — a snippet, a screenshot, or their own project — without leaving the column.

FIRST VIEWPORT: 640px column centred in the sidebar inset. Top: "Posts" title, then a full-width two-tab switch (For you / Following) with an ink underline. Directly beneath, the composer row: avatar, "What are you building?" auto-growing field, attachment icons, primary Post on the right. Then posts, hairline-separated, avatar left rail.

FORM: Threads-style single column (brief-pinned; no roll run). Seed key: none — user-pinned composition. Signature interaction: like heart pops and fills with the accent; a new post slides into the top of the feed.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
