# portofolio

Personal portfolio website built with Nuxt 4.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Edit content

All text, links, projects, and experience live in [`app/data/profile.ts`](app/data/profile.ts).

- Project screenshots: put images in `public/projects/` and set `image: '/projects/name.webp'`
- Profile photo: put it in `public/` and set `avatar`
- Resume: put the PDF in `public/` and set `resumeUrl: '/resume.pdf'`

Colors and fonts are defined as CSS variables at the top of [`app/assets/css/main.css`](app/assets/css/main.css).

## Deploy

```bash
npm run generate   # static site in .output/public
```

Deploy for free on Vercel or Netlify by importing the repo. Both detect Nuxt automatically.
