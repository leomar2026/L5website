# L5 Innovative IT Solutions Website

Premium responsive React/Vite website for **L5 Innovative IT Solutions** with a futuristic IT-solutions theme, exact uploaded logo/banner assets, lightweight 3D visuals, smooth scrolling, scroll storytelling, animated counters, horizontal project gallery, and an interactive `Hero3DBanner`.

## Setup

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. Create a production build with:

```bash
npm run build
```

## Project structure

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
├── public
│   └── assets
│       ├── l5-banner.png
│       └── l5-logo.png
└── src
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```

## Where to customize

- Company text, navigation, services, projects, testimonials, and stats: edit the arrays near the top of `src/App.jsx`.
- Hero banner: replace `public/assets/l5-banner.png` with another image using the same filename, or update the `banner` constant in `src/App.jsx`.
- Logo, favicon, footer logo, mobile menu logo, and loading logo: replace `public/assets/l5-logo.png`, or update the `logo` constant in `src/App.jsx` and icon links in `index.html`.
- Colors: edit CSS variables at the top of `src/styles.css`, especially `--cyan`, `--blue`, `--violet`, `--bg`, and `--panel`.
- 3D scroll scene: update `InfrastructureCore`, `ThreeScene`, and `Solutions` in `src/App.jsx`.
- Contact form: the current form prevents submission. Connect `onSubmit` to your API, CRM, email service, or form provider.

## Hero3DBanner

`Hero3DBanner` is defined in `src/App.jsx` and accepts:

```jsx
<Hero3DBanner
  image="/assets/l5-banner.png"
  title="Innovative IT Solutions"
  subtitle="Build • Deploy • Support"
  description="Reliable technology solutions for modern businesses."
  primaryButtonText="Get a Consultation"
  secondaryButtonText="Explore Services"
/>
```

The uploaded banner image is not edited or redesigned. The 3D movement, cursor glow, dark readability overlay, parallax depth, and scroll zoom/fade are applied through wrappers and CSS overlay layers. Mouse tilt is disabled on touch/tablet layouts and all motion is reduced when `prefers-reduced-motion` is enabled.
