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

### GitHub Pages (automatic)

`.github/workflows/deploy.yml` typechecks, generates and publishes the site on every push to `main`.
It can also be run by hand from the Actions tab.

One-time setup: in the repo, open **Settings → Pages** and set **Source** to **GitHub Actions**.
The site is then live at `https://<username>.github.io/portofolio/`.

Files in `public/` should be referenced through `useAsset()` (for example `asset('/avatar.webp')`) so they
still load under the `/portofolio/` subpath. The paths in `profile.ts` already go through it.

Vercel or Netlify also work: import the repo and they detect Nuxt automatically.
