# Recomp Plan — Setup Guide

Installs as a **separate app** from the Cut Plan. Green icon with up/down arrows,
versus the Cut Plan's dark navy. They will not overwrite each other.

---

## Important: use a different URL than the Cut Plan

The two apps must live at **different paths**, or the browser treats them as the
same app and one replaces the other.

| App | Example path |
|---|---|
| Cut Plan | `.../cut-plan/` |
| Recomp Plan | `.../recomp/` |

Any hosting works as long as the folders are separate.

---

## Option 1 — GitHub Pages (free, works well)

1. Create a repo, or add a folder to an existing one
2. Upload **all 6 files** into a folder named `recomp`
3. Settings → Pages → deploy from branch, root
4. Open `https://<username>.github.io/<repo>/recomp/`

## Option 2 — Netlify Drop (fastest)

1. Go to `app.netlify.com/drop`
2. Drag the whole unzipped folder in
3. You get a URL immediately — no account needed for a basic deploy

## Option 3 — Local network only

Serve the folder from any static file host on your machine. Note that iOS
requires **HTTPS** for service workers, so an offline-capable install needs
real hosting, not a local file.

---

## Installing on iPhone

1. Open the URL in **Safari** (Chrome cannot install PWAs on iOS)
2. Tap the Share button
3. **Add to Home Screen**
4. Name it **Recomp** so it's distinct from **Cut Plan**
5. Tap Add

The green arrows icon appears on your home screen. Launches full screen with no
browser chrome, and works offline after the first load.

---

## Data is per-app and per-browser

Each installed app keeps its own storage. Your Cut Plan history stays in the Cut
Plan app; Recomp starts with the seeded baselines and builds from there.

**Storage lives in the browser.** Clearing Safari data wipes it. Use the CSV
export in the History tab periodically — that's what it's for.

---

## Updating later

When you get a new `index.html`:

1. Replace `index.html` in your hosting folder
2. Open `service-worker.js` and bump the version string:
   `const CACHE_NAME = 'recomp-plan-cache-v2';`
3. Redeploy

Without the version bump, the service worker serves the cached copy and your
changes won't appear. This is the most common reason an update seems not to
have applied.

Force a refresh on the phone by closing the app fully (swipe up from the app
switcher) and reopening.

---

## Files in this package

| File | Purpose |
|---|---|
| `index.html` | The whole app — workouts, history, TDEE, nutrition, shopping, prep |
| `manifest.json` | App name, colors, icon references |
| `service-worker.js` | Offline caching |
| `icon-192.png` | Home screen icon |
| `icon-512.png` | Splash screen / large icon |
| `apple-touch-icon.png` | iOS home screen icon |
