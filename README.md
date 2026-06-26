# PDF24X

All-in-One PDF Tools Suite — homepage UI.

```
pdf24x/
├── frontend/          # React + Vite + Tailwind (the homepage lives here)
│   ├── public/
│   │   ├── favicon.svg
│   │   └── images/    # ← drop hero.png, what-is.png, cta-bg.png here
│   ├── src/
│   │   ├── components/      # one file per section (Navbar, Hero, Footer …)
│   │   │   └── ui/          # reusable bits (ToolCard, ImagePlaceholder, Logo …)
│   │   ├── data/tools.jsx   # all text + icon registry (edit content here)
│   │   ├── App.jsx          # assembles the page
│   │   ├── main.jsx
│   │   └── index.css        # Tailwind + light/dark theme tokens
│   ├── index.html           # Google Fonts link (Plus Jakarta Sans)
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── backend/           # reserved for the .NET Web API (added later)
```

## Run the frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

Build for production:

```bash
npm run build        # outputs to frontend/dist
```

## Customising

- **Content** — edit `src/data/tools.jsx` (titles, descriptions, nav links, footer).
- **Images** — add files to `public/images/` and pass `src` to the matching
  `<ImagePlaceholder>` (see `public/images/README.md`).
- **Icons** — every icon is a `lucide-react` placeholder; swap any `icon:` value
  in `data/tools.jsx` for your own component.
- **Colors / dark mode** — all tokens live in `src/index.css` (`:root` and `.dark`).
- **Font** — change the family in `index.html` AND `tailwind.config.js`
  (`fontFamily.sans`) to restyle everything.

## Responsive

Built mobile-first. Card grids flow 1 → 2 → 4 columns, the hero stacks on small
screens, and the navbar collapses to a hamburger below the `lg` breakpoint.
Keyboard focus rings and reduced-motion preferences are respected.
