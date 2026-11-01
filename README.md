# etherea. 💗

_A little world, made with a lot of love._

Etherea is a small interactive website: a mysterious pink landing page that leads into an envelope you can open, with a handwritten-style love letter inside.

Built with React 19, TypeScript, Vite, Tailwind CSS v4, Motion and Lucide icons. There's no backend. It's a static site deployed to GitHub Pages.

---

## Running it locally

You'll need [Node.js](https://nodejs.org/) 20 or newer.

```bash
npm install      # once, to install dependencies
npm run dev      # start the dev server → http://localhost:5173
```

The dev server reloads instantly as you edit files.

## Building

```bash
npm run build    # type-checks, then builds the optimised site into dist/
npm run preview  # serves dist/ → http://localhost:4173/etherea/
```

## Deploying to GitHub Pages

Deployment is automatic: every push to `main` builds the site and publishes it with GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

**One-time setup:**

1. Push this repository to GitHub.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.

After that, each push to `main` deploys the site to:

```
https://<your-github-username>.github.io/etherea/
```

You can follow a deploy's progress in the **Actions** tab. To redeploy without a code change, open the "Deploy to GitHub Pages" workflow there and click **Run workflow**.

### About the base path

GitHub Pages serves project sites from `/<repo-name>/`. The workflow passes the repository name to Vite as `BASE_PATH`, so renaming the repo just works. If you later use a custom domain served from the root, build with `BASE_PATH=/` (in the workflow's build step `env`).

---

## Editing the words

All the text lives in `src/content/`. You don't need to touch any components to change it.

| File | What's in it |
| --- | --- |
| [src/content/letter.ts](src/content/letter.ts) | The letter: greeting, paragraphs, closing line and signature |
| [src/content/site.ts](src/content/site.ts) | Landing page, transition, envelope and ending copy |
| [src/content/loki.ts](src/content/loki.ts) | Loki's page: what he says, his note, and his colours (eyes, fur, stripes, collar) |

In the letter, wrap words in `*asterisks*` to give them a handwritten pink highlight.

## Project structure

```text
src/
  components/
    DreamyBackground.tsx  shared sky: gradient, clouds, floating hearts, sparkles
    FloatingHearts.tsx    ambient rising hearts (CSS-animated)
    Sparkles.tsx          twinkling stars
    Envelope.tsx          the CSS/SVG envelope and its opening sequence
    LetterPaper.tsx       the unfolded cream letter
    LetterEnding.tsx      cuddle button, hug, heart shower, sign-off
    LokiCat.tsx           Loki drawn in SVG, with purr / boop / nom moods
    HeartButton.tsx       the cuddle button
    HugHearts.tsx         two hearts hugging
    HeartBurst.tsx        one-off flurry of hearts (rising or showering)
    GlowButton.tsx        the glowing call-to-action button
    Logo.tsx              the "etherea." wordmark
    shapes.tsx            SVG artwork: hearts, sparkles, bow, wax seal, corner florals
  pages/
    LandingPage.tsx       experience 1: the mysterious landing page
    TransitionPage.tsx    the in-between moment
    LetterPage.tsx        experience 2: envelope → letter
    LokiPage.tsx          experience 3: Loki the cat (also at …/etherea/#loki)
  content/                all editable copy
  styles/globals.css      theme colours, fonts, paper texture, ambient animations
  App.tsx                 scene switcher
  main.tsx                entry point
```

### Adding a new experience

`App.tsx` moves between **scenes** (`'landing' | 'transition' | 'letter'`) inside one `AnimatePresence`, so every change is a smooth animated transition with no page reload, and the dreamy background stays put. To add a new one:

1. Create `src/pages/YourPage.tsx` with a `motion.main` root (give it an `exit` animation).
2. Add its id to the `Scene` type in `App.tsx` and render it in the `AnimatePresence` block.
3. Put its copy in `src/content/`.

To give a scene its own shareable link, add its id to `LINKABLE` in `App.tsx`. It then lives at `…/etherea/#<id>` (this is how `#loki` works). Hash links need no extra GitHub Pages config.

## Accessibility & motion

- Everything interactive is a real `<button>`: keyboard focusable, with visible focus rings.
- When the letter opens, focus moves to it so screen-reader users land on the content.
- If someone has **Reduce Motion** turned on, the movement is toned down: big transforms are skipped, ambient loops pause, and hearts rest in place. Fades still happen.
- Ambient effects run on CSS transforms/opacity only, which keeps them smooth on phones.
