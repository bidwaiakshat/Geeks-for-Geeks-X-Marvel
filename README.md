# ASSEMBLE — The Infinity Protocol

A cinematic, Marvel-inspired **unofficial student fan event concept** for GeeksForGeeks Student Chapter, Bennett University. This is a front-end concept, not an official event announcement or registration system. It is not affiliated with Marvel.

## Run locally

Requires Bun or a modern Node.js installation.

```bash
bun install
bun run dev
```

Open the local address printed by Vite. To produce a production bundle, run `bun run build`; for code style checks, run `bun run lint`.

## Experience

- Anchored single-page journey: Mission, Heroes, Timeline, FAQ and Join the Initiative.
- Four selectable hero archetypes; your choice carries into the local pass creator.
- Accessible FAQ and phase details, mobile navigation, and a motion switch that respects system reduced-motion preferences.
- A local **preview-only** pass creator. Name is required, team name is optional. It downloads a watermarked SVG to your device; no personal information is sent or saved to a server. This is **not official registration**.

## Assets and libraries

- Abstract reactor lighting, geometric hero panels, and typography are CSS-only. No generated character illustrations or movie imagery are included.
- Artwork slots are configured in `src/lib/artwork.ts`: `hero` (wide opening background), `ironMan`, `captainAmerica`, `thor`, and `blackWidow` (individual panels in the hero selection). They remain empty until the organizer supplies authorized official artwork. Add image URLs for approved assets to those fields; the existing abstract presentation stays visible where a slot is empty. Use artwork with permission and record its source/license when supplied.
- Original vector favicon in `public/favicon.svg`.
- Barlow Condensed and DM Sans via Google Fonts (Google Fonts open-source typefaces).
- React 19, TanStack Start/Router, Tailwind CSS 4 and lucide-react. The site has no event data service.
- MARVEL is used as an illustrative typographic fan-event badge. Marvel and its character names are trademarks of their respective owners; no official affiliation is implied.

## Official information still needed

Authorized official artwork for the five slots above; event date and timing; exact campus venue; official registration link and opening; team format and size; final activities/program; eligibility and organizer-approved branding. The site intentionally marks these as to be announced rather than inventing them. Replace preview-only wording and links only after the chapter confirms the details.

## GitHub export

In Lovable, open Project Settings → GitHub and connect a repository to sync this project, or download/export the source and push it to a repository you own. No repository URL is assumed here. Do not commit `node_modules` or generated build output.
