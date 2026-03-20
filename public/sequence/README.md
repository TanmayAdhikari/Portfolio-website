# Scroll animation frames

Drop WebP frames here to drive the hero scroll animation. When no frames are present, the site uses a built-in programmatic sequence (dark teal, network lines).

**Supported filenames** (checked in order):
- `1.webp`, `2.webp`, … (numeric)
- `0001.webp`, `0002.webp`, … (zero-padded 4 digits)
- `frame_0001.webp`, `frame_0002.webp`, …

Set `frameCount` in `HomeClient.tsx` to match how many frames you add (e.g. 24 or 89).
