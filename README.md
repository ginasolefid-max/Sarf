# Sarf Companion

An offline-first Progressive Web App (PWA) for Arabic verb morphology (**ʿIlm al-Ṣarf**): an IndexedDB-backed verb dictionary, a rule-based 14-pronoun conjugation (*tasreef*) engine, an interactive 14-chapter Sarf textbook, spaced-repetition flashcards, and conjugation drills.

Built with React, TypeScript, Vite, Tailwind CSS, Dexie (IndexedDB), and `vite-plugin-pwa` (Workbox) using relative paths (`base: "./"`) for zero-config deployment on GitHub Pages.

## Key Features

- **Offline-First PWA**: Precaches the app shell, self-hosted Arabic fonts (`Amiri`, `Noto Naskh Arabic`, `Scheherazade New`), and seed dictionary via Workbox so the entire app works in airplane mode after first load.
- **440+ Seeded Verbs in IndexedDB**: Triliteral Forms I–X and Quadriliteral Forms QI–QIV across all 6 verb classes (sound, hollow, defective, assimilated, doubled, hamzated), loaded automatically into IndexedDB via Dexie.
- **Instant Fuzzy Arabic & English Search**: Accepts Arabic with or without diacritics (*harakat*), alef/hamza/ta-marbuta variants, roots (`ك-ت-ب`), or English meanings. Includes Root Explorer, Form/type/topic filters, favorites, Word of the Day, and search history.
- **14-Pronoun Tasreef Engine**: Generates full `Madhi`, `Mudhari`, `Mansub`, `Majzum`, `Amr`, and `Nahy` tables plus derived nouns (`Masdar`, `Ism Fa'il`, `Ism Maf'ul`, `Ism Zaman/Makan`, `Ism Alah`), with stored overrides for irregular verbs, a **Highlight Root & Affixes** color toggle, personal notes, and A4 PDF export.
- **Interactive Sarf Textbook**: 14 locally stored chapters with tables of contents, bookmarks, mark-as-read progress tracking, audio examples, and end-of-chapter quizzes with *Show answer*.
- **Practice & Spaced Repetition**: SM-2 flashcards, 4 quiz modes (conjugate, identify root, identify Form, match meaning), conjugation typing drills, and daily study streaks.
- **Arabic Text-to-Speech**: Uses the browser's `ar-SA` Web Speech API with adjustable speed (`0.5x–1.5x`), repeat count (`1–3x`), and device setup instructions if no Arabic voice is installed.
- **Online Verb Verification (Bring Your Own Key)**: When online, enter your own Gemini API key in **Settings** (saved strictly in your browser's `localStorage` — never hardcoded) to verify and save new verbs. Offline requests queue automatically and process when connectivity returns.

---

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build for Production

```bash
npm run build
```

This creates the static bundle in `dist/`, including:
- `dist/manifest.webmanifest`
- `dist/sw.js` (Workbox service worker precaching all JS, CSS, fonts, icons, and `data/verbs.json`)
- Relative `./` asset references ready for any GitHub Pages repository subpath.

You can test the production build locally before pushing:

```bash
npx vite preview --port 4173
```

---

## Deploy to GitHub Pages

1. **Create a GitHub repository** (e.g., `sarf-companion`) and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Sarf Companion PWA"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sarf-companion.git
   git push -u origin main
   ```

2. **Add a GitHub Actions workflow** at `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy Sarf Companion to GitHub Pages

   on:
     push:
       branches: [main]

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build-and-deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub → **Settings** → **Pages**.
   - Under **Build and deployment → Source**, select **GitHub Actions**.
   - Push to `main` (or trigger the workflow). Your app will be live at `https://<your-username>.github.io/sarf-companion/`.

---

## Install on Your Phone & Verify Offline Mode

### Android (Chrome / Edge)
1. Open your deployed GitHub Pages URL in **Chrome**.
2. Wait a few seconds until the top bar displays **Offline ready** (all fonts, icons, and the 440+ verb dataset are cached).
3. Tap the **Install** button in the top bar (or open Chrome's `⋮` menu → **Install app** / **Add to Home screen**).
4. Launch **Sarf Companion** from your home screen.

### iPhone / iPad (iOS Safari)
1. Open your deployed GitHub Pages URL in **Safari** (required for iOS home-screen PWAs).
2. Tap the **Share** button (`□↑`) in the toolbar.
3. Scroll down and tap **Add to Home Screen**, then tap **Add**.
4. Open **Sarf Companion** from your home screen.

### Verifying Airplane Mode
1. Open the installed app once while online so the service worker activates and seeds IndexedDB.
2. Turn on **Airplane Mode** (disable Wi-Fi and cellular data).
3. Close and reopen **Sarf Companion**:
   - The top bar switches to **Offline**.
   - Instant search, all 14-pronoun conjugation tables, all 14 textbook chapters, flashcards, drills, and Arabic fonts continue to work without network access.
   - Any verb submitted to **Verify / Add Verb** while offline is saved in the queue and processed once you reconnect.
