# ISM4421Suno — Suno Music Studio

A one-page AI music generator built on the [Suno API](https://docs.sunoapi.org), ready to deploy on Netlify.

## Features

- **Simple mode**: describe a song and get two versions.
- **Custom mode**: set your own title, style tags and lyrics.
- **AI lyrics writer**: generate lyric options from a short idea.
- **Instrumental toggle**, **model picker** (V3.5 → V5) and **advanced options** (excluded styles, vocal gender, style weight, weirdness).
- **Live progress**: play tracks while they're still being made.
- **Download**, **extend**, **view lyrics** and **reuse** a track's settings.
- **Library** saved in the browser, plus a **credit balance** in the header.

## API key

Each user enters their own Suno API key (get one at https://sunoapi.org/api-key) with the 🔑 button.
The key is stored only in that user's browser and sent only to `api.sunoapi.org`. Nothing is stored on the server.

## Deploy to Netlify

1. **Add new site → Import an existing project**, then pick this repo and the `main` branch.
2. `netlify.toml` already sets the publish directory to `public`. There's no build command and no environment variables.
3. Deploy, open the site and paste your API key.

## Run locally

Serve the `public` folder with any static server, for example `npx serve public`.
