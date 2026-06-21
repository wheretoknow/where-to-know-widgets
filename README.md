# WTK Review Widget

Embed your hotel's review score on any website with a single `<script>` tag — no frameworks, no dependencies, no build step required.

## Quick Start

1. Go to **WTK Dashboard → Settings → Review Widget** and generate a token for your hotel.
2. Paste the embed code anywhere in your HTML:

```html
<script
  src="https://widgets.wheretoknow.com/v1/embed.js"
  data-token="tk_your_token_here"
  data-style="card"
  data-color="#6366f1"
  async
></script>
```

The widget inserts itself immediately after the `<script>` tag. No container div needed.

---

## How It Works

```
Your page loads embed.js
  → reads data-* attributes from the <script> tag
  → fetches live score data from api.wheretoknow.com
  → renders an iframe (fully isolated CSS — never conflicts with your site)
  → auto-sizes its height via postMessage
```

The iframe renders from `https://widgets.wheretoknow.com/v1/render` — a lightweight static page. Your page's CSS and JS are completely unaffected.

---

## Configuration Reference

All options are set as `data-*` attributes on the `<script>` tag.

| Attribute | Required | Default | Description |
|---|---|---|---|
| `data-token` | ✅ | — | Token generated in the WTK Dashboard |
| `data-style` | | `card` | Widget layout: `compact` / `horizontal` / `card` / `dark` |
| `data-period` | | `all` | Review period: `all` / `year` / `quarter` |
| `data-color` | | `#6366f1` | Brand color (any valid CSS hex, e.g. `#0ea5e9`) |
| `data-lang` | | `auto` | Display language: `auto` / `en` / `zh` / `de` |
| `data-ota-sources` | | — | Comma-separated OTA keys to show platform scores (see below) |
| `data-categories` | | — | Comma-separated category names to display (shows all if omitted) |

---

## Widget Styles

### `compact` — 200 × ~210 px

Minimal vertical badge. Ideal for page footers, sidebars, or any tight space.

```html
<script
  src="https://widgets.wheretoknow.com/v1/embed.js"
  data-token="tk_your_token_here"
  data-style="compact"
  async
></script>
```

Shows: WTK logo · Overall score · Stars · Review count · Period label · (optional) OTA badges

### `horizontal` — 420 × ~90 px (grows with categories)

Wide strip layout. Good for hero sections or site headers.

```html
<script
  src="https://widgets.wheretoknow.com/v1/embed.js"
  data-token="tk_your_token_here"
  data-style="horizontal"
  async
></script>
```

Shows: Score + stars in a coloured left panel · Up to 4 category bars in the centre · Review count + period on the right

### `card` — 280 × ~340 px (grows with categories/OTAs)

Full card with coloured header and category breakdown. The most feature-rich layout.

```html
<script
  src="https://widgets.wheretoknow.com/v1/embed.js"
  data-token="tk_your_token_here"
  data-style="card"
  async
></script>
```

Shows: Coloured header (logo, score, stars) · Category icons + bars · OTA platform rows · Review count + "wheretoknow.com →" link

### `dark` — 220 × ~260 px (grows with categories/OTAs)

Dark overlay card with gold score. Works well on dark or image backgrounds.

```html
<script
  src="https://widgets.wheretoknow.com/v1/embed.js"
  data-token="tk_your_token_here"
  data-style="dark"
  async
></script>
```

Shows: Logo · Gold score · Stars · Category bars (purple gradient) · OTA rows

---

## Review Period

Controls which reviews are included in the score:

| Value | Label shown |
|---|---|
| `all` | All time / 全部时间 / Gesamtzeitraum |
| `year` | Past 12 months / 过去 12 个月 / Letzte 12 Monate |
| `quarter` | Past 3 months / 过去 3 个月 / Letzte 3 Monate |

```html
data-period="year"
```

The score and category data shown by the widget automatically reflect this period.

---

## Brand Color

Set `data-color` to any 6-digit hex. This colors the header/panel background, progress bars, and period badges:

```html
data-color="#0ea5e9"   <!-- sky blue -->
data-color="#10b981"   <!-- emerald green -->
data-color="#f59e0b"   <!-- amber -->
data-color="#111827"   <!-- near-black -->
```

---

## Language

| Value | Language | Notes |
|---|---|---|
| `auto` | Detected from visitor's browser | Default; recommended for international sites |
| `en` | English | Force English regardless of browser locale |
| `zh` | Chinese (Simplified) | 中文 |
| `de` | German | Deutsch |

```html
data-lang="zh"
```

---

## OTA Platform Scores

Display individual scores from each booking platform inside the widget. Add `data-ota-sources` with a comma-separated list of platform keys:

```html
<script
  src="https://widgets.wheretoknow.com/v1/embed.js"
  data-token="tk_your_token_here"
  data-style="card"
  data-ota-sources="booking,google,tripadvisor"
  async
></script>
```

Available platform keys:

| Key | Platform |
|---|---|
| `booking` | Booking.com |
| `google` | Google |
| `tripadvisor` | TripAdvisor |
| `expedia` | Expedia |
| `agoda` | Agoda |
| `ctrip` | Ctrip |
| `trip` | Trip.com |
| `holidaycheck` | HolidayCheck |
| `hrs` | HRS |
| `traveloka` | Traveloka |
| `trivago` | Trivago |

Only platforms that actually have data for your hotel will appear — platforms with no score are silently omitted.

**How they render:**
- `compact` and `horizontal` → compact inline badges with score
- `card` and `dark` → a "Platform Scores" section with platform name, score, and review count

You can also control which OTAs appear from the WTK Dashboard when generating your token; `data-ota-sources` on the embed tag overrides nothing — the token's saved config is used when no override is passed.

---

## Category Filtering

By default the widget shows all available review categories for your hotel (e.g. Cleanliness, Service, Location, Comfort, Staff, Value, Facilities, Food). Restrict to a subset with `data-categories`:

```html
data-categories="Cleanliness,Service,Location"
```

Category names are case-sensitive and must match exactly. Leave the attribute out (or omit it entirely) to show all categories.

---

## Multiple Widgets on One Page

Each `<script>` tag is independent. Embed as many as you like — use different styles and options for each:

```html
<!-- Footer badge -->
<script
  src="https://widgets.wheretoknow.com/v1/embed.js"
  data-token="tk_your_token_here"
  data-style="compact"
  data-color="#111827"
  async
></script>

<!-- Sidebar full card -->
<script
  src="https://widgets.wheretoknow.com/v1/embed.js"
  data-token="tk_your_token_here"
  data-style="card"
  data-ota-sources="booking,google"
  async
></script>
```

---

## Domain Security

In the WTK Dashboard you can restrict which domains are allowed to use your token. Any request from an unlisted domain will be blocked.

Leave the allowed domains list empty to permit all domains (useful during development).

Examples of what to enter:

```
yourhotesite.com
app.yourhotelsite.com
```

Do not include `https://` or trailing paths — just the hostname.

---

## Sizing & Layout

- The widget inserts an `inline-block` container immediately after the `<script>` tag. You can place it inside any block or inline element.
- The iframe's **width is fixed** per style (200 / 420 / 280 / 220 px). Wrap it in a container if you need to control placement.
- The iframe's **height auto-adjusts** after render via `postMessage` — you will not see a scrollbar or cut-off content.
- The widget is **not responsive** by design (fixed pixel widths); however `horizontal` has `max-width:100%` so it shrinks on mobile.

To centre the widget:

```html
<div style="text-align:center">
  <script src="https://widgets.wheretoknow.com/v1/embed.js"
    data-token="tk_your_token_here" data-style="compact" async></script>
</div>
```

---

## Score Colour Coding

Scores are colour-coded consistently across all styles:

| Score | Colour |
|---|---|
| ≥ 9.0 | Green `#10b981` |
| 7.0 – 8.9 | Amber `#f59e0b` |
| < 7.0 | Red `#ef4444` |

---

## Troubleshooting

**Widget doesn't appear**
- Check the browser console for `[WTK Widget]` errors.
- Make sure `data-token` is set and the token is active (not revoked).
- If you set allowed domains in the Dashboard, make sure the current domain is listed.

**Score looks wrong**
- The score reflects the configured review period (`data-period`). Change it in the Dashboard or via the attribute.
- Scores update nightly as new reviews are imported.

**Wrong language**
- Use `data-lang="en"` (or `zh` / `de`) to force a specific language instead of relying on browser detection.

**Platform score not showing**
- The platform must have at least one review imported for your hotel. Platforms with no data are silently hidden.

---

## Development

```bash
npm install
npm run dev      # watch mode — rebuilds on change, unminified
npm run build    # production build → dist/embed.js (minified, ~2 KB)
```

The built `dist/embed.js` is what's served at `https://widgets.wheretoknow.com/v1/embed.js`. Deploy by syncing `dist/` and `src/render.html` to the S3 bucket.
