# Fabluxe Group Corporate Site (Landingpage) — Design System

This is the corporate/landing website for the Fabluxe Group. It shares **the
same design system** as the Fabluxe B2C storefront — same palette, same two
fonts, same editorial treatment, same motion language — but uses a **different
layout** (page hero, storytelling sections, blog, projects, sustainability, CSR,
group companies, team, awards, contact).

The canonical design-system source of truth is documented in
`design.md` at the root of the B2C storefront repo; this file restates that
system for this codebase and describes this site's layout-specific primitives.

## 1. Brand context

The group website tells the corporate story: who the group is, the companies
that sit under it, its projects, showrooms, sustainability and CSR work,
leadership, awards, contact. It is the landing expression of the brand —
quieter and more editorial than the storefront, with no product commerce.

## 2. Colour palette — identical to the B2C storefront

Source of truth: `:root` in `src/styles.css`. These hex values match the
storefront exactly.

| Token  | Hex                     | Usage                                          |
| ------ | ----------------------- | ---------------------------------------------- |
| `navy` | `#10223d`               | Primary colour, dark bands, nav sidebar, h1–h3 |
| `teal` | `#567c8d`               | Eyebrows, table labels, body heading text      |
| `sky`  | `#c8d9e6`               | Soft fills, muted surface tints                |
| `beige`| `#f8f7f2`               | Page background, button hover fill             |
| `gold` | `#c8a45c`               | Hairline accents, focus ring, hover accents    |
| `white`| `#ffffff`               | Card/surface colour                            |

Semantic tokens (layout-specific mappings on nary the same hexes):

- `background` = beige, `foreground` = navy
- `surface` = white (cards/sections), `surface-foreground` = navy
  (the storefront calls this `card`)
- `muted` = sky, `muted-foreground` = teal
- `primary` = navy, `secondary` = teal, `accent` = gold
- `border` = navy at 14% mix, `border-strong` = navy at 30% mix
- `on-dark` = white, `on-dark-muted` = sky (text on navy bands)
- `ring` = gold, `overlay-navy` = navy at 68% mix (image scrims)
- `shadow-soft` = large, very soft navy shadow for floating cards

Rule: **no hardcoded hex values in components** — use tokens.

## 3. Typography — identical family set

| Role    | Family                                                       |
| ------- | ------------------------------------------------------------ |
| Display | `Fraunces` → `Bodoni Moda` → Georgia, serif (`font-display`) |
| Body    | `Inter` → `Karla` → system, sans (`font-sans` default, Inter-first) |

Difference in arrangement (layout choice): here **h1, h2 and h3 all use
Fraunces** (`font-display`) — the corporate editorial voice — whereas the
storefront reserves Fraunces for major display headings. Headings are
`font-weight: 400`, `letter-spacing: -0.01em`.

Type scale (local):

| Size          | Value                              | Use                              |
| ------------- | ---------------------------------- | -------------------------------- |
| `eyebrow`     | `0.6875rem`, `0.22em`, uppercase   | Section labels, table labels     |
| body          | `1rem`, line-height `1.65`         | Copy                             |
| `display-sm`  | `clamp(1.75, 1.3+1.8vw, 2.5rem)`   | Section headings, card numerals  |
| `display-md`  | `clamp(2.25, 1.6+2.6vw, 3.5rem)`   | Page hero titles                 |
| `display-lg`  | `clamp(2.75, 1.6+4.6vw, 5rem)`     | Home hero title (≈ B2C `hero`)   |

### Eyebrow labels — `EyebrowLabel` + `text-eyebrow`

Same signature device as the storefront's `label-eyebrow`: wide-tracked
uppercase micro label, `text-teal` on light / `text-on-dark-muted` on navy,
optionally prefixed by the thin gold hairline (`gold-rule`, width `2.5rem`).

## 4. Shape & radius — identical scale

`--radius: 0.25rem`. Matches the storefront exactly:

- `xs` = calc(−2px) → 2px, `sm` = 2px, `md` = 4px, `lg` = 6px, `xl` = 10px,
  `2xl` = 16px.

Cards and buttons keep smooth low corners; `rounded-xs`/`rounded-sm` dominate.

## 5. Spacing & rhythm — same section rhythm, different expression

| Token                | Value    |
| -------------------- | -------- |
| `--spacing-section`  | `4.5rem` |
| `--spacing-section-lg` | `5.5rem` (larger hero-adjacent bands) |
| `--spacing-gutter`   | `1.25rem`|

- Page shell: `max-w-[80rem]` (`--spacing-shell`), `margin-inline: auto`,
  `padding-inline: 1.25rem` mobile → `2rem` at `sm+` — the same gutter widths as
  the storefront container (`px-5 sm:px-8`).
- Section rhythm is the SAME as the storefront: `py-14` (56px) mobile →
  `sm:py-[var(--spacing-section)]` (72px) desktop. The `Section` primitive
  encodes this (`default`), with `compact` = `py-14` and `large` =
  `sm:py-[var(--spacing-section-lg)]`.
- Layout differences: the page `PageHero` uses `pt-40 pb-section` for a tall
  dramatic header; the home hero uses `pt-40 pb-24`. These are intentional
  layout choices, not new spacing tokens.
- Sections alternate tones to create rhythm: beige (default) → white
  (`tone="white"` / `bg-surface`) → sky → navy (`tone="navy"`, inverse). Tones
  are a primitive prop (`Section tone={...}`), not hand-rolled per page.

## 6. Components & patterns

### Primitives (`src/components/primitives`)
- `Section` — `tone: beige | white | sky | navy`, `size: compact | default |
  large`. THE building block of every page.
- `EyebrowLabel` — the gold-hairline + uppercase label device.
- `SectionHeading` — `EyebrowLabel` + `font-display` Fraunces title +
  optional `intro` (rendered in teal/sky). Centered or start-aligned.
- `ActionLink` — the button/link system. Rectangular (`rounded-xs`), uppercase
  `text-eyebrow`, uppercase. Variants:
  - `solid` (primary): navy fill, white text; hover → beige fill / navy text —
    **identical** to the storefront primary button.
  - `outline`: hairline border; hover → fill navy.
  - `gold`: gold border; hover → gold fill (navy text).
  - `quiet`: bare text link with teal → gold hover.
  - `dark` tone = for light sections; `light` tone = for navy sections.
- `StatFigure` — display figure + eyebrow label + note, for home metrics.
- `Reveal` — scroll-reveal wrapper (fade + 1.25rem rise, `IntersectionObserver`),
  renders instantly when `prefers-reduced-motion` is set.

### Page hero (`PageHero`, home `HeroSection`)
Tall header (`pt-40`), eyebrow + Fraunces `display-md/lg` title + intro, on an
image or full-bleed navy band. Home hero is the tallest expression.

### Cards
- `ProjectCard`, `BlogCard`, `ReviewCard`, `InitiativeCard`, `AwardCard/`Tile`,
  `CompanyCard` — all follow one recipe: image (optional `media-zoom` hover),
  eyebrow/category chip, Fraunces title, muted copy, gold-hairline or teal meta
  row, `mt-auto` footer pinning. Names/links hover to gold (`hover:text-gold`
  or a gold underline).
- `TestimonialSlider` and gallery sliders use Embla with `hide-scrollbar`.
- Filter bars (`BlogFilterBar`, `ProjectFilterBar`) — bordered row, uppercase
  label pills, scrollable with `hide-scrollbar`.

### Gold treatments
- `gold-rule` hairline beside/below eyebrows and above section statistics.
- Image captions/meta labels use teal; hover accents roll to gold.
- Focus ring is gold.

## 7. Motion — same easing as the storefront

- `--ease-calm: cubic-bezier(0.22, 0.61, 0.36, 1)` — numerically identical to
  the storefront's `--ease-editorial`.
- Durations are laid-back by design: `--duration-calm: 700ms`,
  `--duration-hover: 900ms` (slower than the storefront's 250–500ms; this is a
  layout feel, not a different easing).
- `reveal`/`reveal-in`: opacity 0 → 1 with a 1.25rem rise, driven by the
  `Reveal` primitive.
- `media-zoom`: slow image scale to `1.04` on hover (`@media (hover: hover)`).
- No native page scrollbar hiding and no Lenis here — the corporate site uses
  native `scroll-behavior: smooth` (layout simplification, not a design change).
- `prefers-reduced-motion`: all animation/transition durations collapse to ~0
  and `Reveal` shows content immediately.

## 8. Focus & usability

- `:focus-visible` → 2px gold outline, 3px offset.
- Nav links, cards and buttons all have hover states; card titles link.
- `html { scroll-behavior: smooth }`.

## 9. Layout & navigation

- Shell everywhere through the `shell` utility.
- Public nav: header with group divisions; footer in navy with divisions,
  policies and contact.
- Admin: `AdminShell` (navy sidebar, `on-dark` text, uppercase label groups,
  `surface` content area) — same tokens, different chrome.
- This site has **no commerce**: no product rail, no add-to-cart, no cart/checkout.
  Never force storefront layout elements here; express the same design through
  the primitives (Section tones, EyebrowLabel, ActionLink, Reveal).