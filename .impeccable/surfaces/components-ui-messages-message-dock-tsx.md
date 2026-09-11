---
version: 1
slug: "components-ui-messages-message-dock-tsx"
primary_target: "components/ui/messages/message-dock.tsx"
related_targets: ["components/ui/messages/chat-window.tsx","components/ui/messages/conversation-list.tsx"]
---

---
version: 1
slug: "components-ui-messages-message-dock-tsx"
primary_target: "components/ui/messages/message-dock.tsx"
related_targets: ["components/ui/messages/chat-window.tsx","components/ui/messages/conversation-list.tsx"]
---

Scope: the site-wide messaging dock. Visitor mode: Operate.

Audience: a signed-in builder who just found someone worth talking to and does
not want to leave the page they found them on. Task: open a conversation from
anywhere, say one thing, get back to browsing. Constraint: no messaging backend
exists; the dock runs on a fixture behind the gateway-first action pattern.

Messaging is authoring, so the whole surface is gated: a guest sees no dock at
all, and Follow or Message on a member card sends them to sign in. This replaced
an earlier read-only guest state on the user's instruction.

## Direction contract

THESIS: messaging is a persistent instrument on the desk, not a destination. It
refuses the category default of routing to a full-page inbox, and it refuses the
opposite default of a decorative bubble that only says "chat with us".

OWN-WORLD: the application's world unchanged - bone-white page, `bg-card` panels
on a `ring-1 ring-foreground/10` hairline, Panel-lift shadow, Lexend Deca
throughout, Geist Mono only for timestamps and the unread count. The accent
appears exactly twice: the unread count on the bar and the send control. Avatar
fallbacks are greige, never accent. Never on `/design`; that world stays sealed.

STORY: the visitor understands that anyone on Fiurozz is one click from a reply,
believes a conversation will still be there when they navigate on, and opens one
without losing their place in the grid.

FIRST VIEWPORT: bottom-right, flush to the bottom edge with squared bottom
corners so it reads as docked rather than floating. A 296px bar titled
"Messaging" carries the unread count; clicking it expands a conversation list
upward at the same 296px width - a panel that widened on expand would shove the
open windows sideways. Chat windows open to its left, 320px wide and 400px tall
on desktop, newest nearest the bar, each with a header that collapses it to a
title-only strip. The dock is desktop-only: below `lg` it does not render
at all, because a 320px window beside a 296px bar needs room a phone or tablet
does not have. That is a count in JS rather than a CSS `hidden`, so nothing
mounts and no conversation request is made on a narrow screen. The composer sits at the window's foot with the accent
send control at its right.

FORM: an extension of an established surface, so no direction roll - the playbook
routes a local addition straight to shaping. Ordered first of three considered
shapes (LinkedIn dock, Facebook heads-only, full hybrid); the user locked it.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish
review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
