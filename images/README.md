Hero background photos of Palazzo Parisio:

- `venue-hero-desktop.webp` — the garden panorama (wide, ~2.15:1), shown on screens 800px and wider
- `venue-hero-mobile.webp` — the gold ballroom (portrait, ~0.8:1), shown on narrower screens (phones/small tablets)

The breakpoint is set in `css/style.css` under `.hero` and `@media (min-width: 800px) { .hero { ... } }`.

To swap either photo later: replace the file (same name), or point the CSS at a new filename. Keep the desktop shot noticeably wider than tall (landscape/panorama) and the mobile shot taller than wide (portrait) so neither gets over-cropped by `background-size: cover`.
