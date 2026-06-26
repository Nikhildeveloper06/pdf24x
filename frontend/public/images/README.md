# Image assets

Drop your real images here, then enable them in the components by passing `src`.

| File                | Used in            | Component / line to edit                          |
|---------------------|--------------------|---------------------------------------------------|
| `hero.png`          | Hero card (img 1)  | `src/components/Hero.jsx` → uncomment `src=`       |
| `what-is.png`       | "What is PDF24X"   | `src/components/WhatIs.jsx` → uncomment `src=`     |
| `cta-bg.png`        | Yellow CTA bg      | `src/components/CtaBanner.jsx` → uncomment `style` |

Each `<ImagePlaceholder>` automatically swaps to a real `<img>` the moment you
pass it a `src`, so no layout changes are needed.
