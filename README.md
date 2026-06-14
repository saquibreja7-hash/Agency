# Jamsaq Agency

**Official website for Jamsaq Agency** — a premium digital studio that designs and builds exceptional websites, mobile apps, and web applications.

> **⚠️ IMPORTANT: Do NOT double-click index.html**  
> Opening the HTML file directly will show a **blank page**.  
> This is a modern Vite + React project and must be served by a development server.

## How to view the website (Windows / PowerShell)

1. Open PowerShell or Terminal
2. Run these commands:

```powershell
cd "C:\Users\Media\Desktop\Personal\01-Projects\Grok Test"
npm run dev
```

3. Open your browser and go to: **http://localhost:5173**

For the final built version:
```powershell
npm run build
npm run preview
```
Then visit **http://localhost:4173**

![Jamsaq](https://picsum.photos/id/1015/1200/630)

## Live Preview

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

- **Elegant, modern dark design** — refined typography, glassmorphism navbar, premium micro-interactions
- **Fully responsive** — beautiful on mobile, tablet, and desktop
- **Interactive portfolio** — filterable projects (Website / Mobile App / Web App) with rich detail modals powered by Framer Motion
- **Working contact form** — fully functional UI with realistic submission flow and success state
- **Services, process, testimonials, and stats** — compelling storytelling for a high-end agency
- **Built with modern stack**:
  - Vite + React 19 + TypeScript
  - Tailwind CSS 4 (via Vite plugin)
  - Framer Motion (smooth modal + animations)
  - Lucide icons

## Project Structure

```
src/
├── App.tsx          # Entire site (well-organized sections + state)
├── index.css        # Premium design tokens + component styles
├── main.tsx
└── assets/          # (Legacy Vite assets — unused)
```

The site is intentionally contained in `App.tsx` for simplicity and easy maintenance. All project data lives in a clean TypeScript array.

## Customization

- **Update projects**: Edit the `projects` array in `App.tsx`
- **Branding & colors**: Primary accent lives in CSS custom properties (`--accent`) + Tailwind classes in `index.css`
- **Contact behavior**: `handleSubmit` currently simulates a network call. Swap in your own backend / Formspree / Resend easily.

## Production Build

```bash
npm run build
npm run preview
```

## Deploy

Deploy anywhere that supports static sites:

- Vercel (recommended — zero config)
- Netlify
- Cloudflare Pages
- GitHub Pages

## Credits

Designed & built with care by the Grok team for Jamsaq Agency.

---

Want to turn this into a full Next.js site with a real CMS (Sanity/Contentful), contact API route, or analytics? Just say the word.
