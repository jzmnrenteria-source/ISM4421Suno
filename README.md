# ISM4421Suno — Suno Music Studio

A one-page AI music generator built on the [Suno API](https://docs.sunoapi.org), with email and Google login through Supabase. Ready to deploy on Netlify.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jzmnrenteria-source/ISM4421Suno)

## Features

- **Email login** (Supabase Auth): sign in, create an account, confirm by email, forgot/reset password, sign out.
- **Continue with Google** (Supabase OAuth). Once signed in, the header shows the person's name and profile picture from their Supabase `user_metadata`.
- **Simple mode**: describe a song and get two versions.
- **Custom mode**: your own title, style tags and lyrics.
- **AI lyrics writer**, **instrumental toggle**, **model picker** (V3.5 → V5) and **advanced options**.
- **Live progress** with playback while tracks are still being made. A song in progress continues after a page refresh.
- **Download**, **extend**, **view lyrics** and **reuse** a track's settings.
- **Library** saved in the browser, plus a **credit balance** in the header.
- **Themes:** Dark, White, Light and System.

## Setup (one time)

1. **Netlify:** click the Deploy button above, or go to **Add new site → Import an existing project**, pick this repo and the `main` branch, then deploy. There are no build settings or environment variables to set.
2. **Supabase:** open **Authentication → URL Configuration** for the project and set:
   - **Site URL** = your Netlify address, for example `https://your-site.netlify.app`
   - **Redirect URLs** → add `https://your-site.netlify.app/**`

   Without this, confirmation and password-reset emails send people to `localhost`.
3. Open the site, create an account, click the link in the confirmation email, sign in, and paste your Suno API key ([get one here](https://sunoapi.org/api-key)).

## How it's put together

```
public/index.html                  the whole front end (HTML/CSS/JS, no build step)
public/vendor/supabase-2.117.3.js  Supabase client library (bundled, no CDN needed)
netlify/functions/suno.mjs         tiny pass-through + callback endpoint (no config)
netlify.toml                       Netlify config
```

- **Login:** Supabase Auth with email and password, or Google. For Google, enable the Google provider in Supabase (Authentication → Providers) with `https://kukglvtcsiovqvrahgmi.supabase.co/auth/v1/callback` as the redirect URI in Google Cloud, and add the site URL under Authentication → URL Configuration. The Supabase URL and *publishable* key in `index.html` are meant to be public.
- **Suno API key:** each user pastes their own. It's stored in their browser and removed when they sign out.
- **Suno calls:** the browser calls `api.sunoapi.org` directly. If that's blocked (CORS), the app automatically retries through `/api/suno/*` on your own site, which forwards the user's key and stores nothing. `/api/callback` receives Suno's "song finished" notification.

## Run locally

```bash
npx netlify-cli dev     # serves public/ and the function at http://localhost:8888
```

For local email links, add `http://localhost:8888/**` to Supabase's Redirect URLs.
