import type { ReactNode } from 'react'

// =========================================
// TYPES
// =========================================
export interface Project {
  id: number
  title: string
  category: string
  client: string
  year: string
  result: string
  description: string
  role: string
  type: 'site' | 'app'
  /** Explicit logo path. When null/undefined, the modal renders an initials avatar. */
  logo?: string | null
  /** Render the logo in a wide white pill (for wordmark logos like TASI) instead of a square tile. */
  wideLogo?: boolean
  /** Tailwind rounding class for the square logo tile. Defaults to rounded-2xl. */
  logoRounded?: string
  /** Public live site — drives the "Check out the site" CTA. */
  liveUrl?: string | null
  /** Play Store listing — drives the "Download on Play Store" CTA. */
  playStoreUrl?: string | null
}

const PLAY_STORE_LETSLOVE = 'https://play.google.com/store/apps/details?id=com.letslove.app'

// =========================================
// PROJECTS — single source of truth.
// Behaviour (logo, CTA, live URL) is read from these explicit fields,
// never inferred from the title string.
// =========================================
export const projects: Project[] = [
  {
    id: 501,
    title: "Meri Asmita",
    category: "Web App",
    client: "Open-source safety project",
    year: "2026",
    result: "Digital Safety Platform",
    description: "Survivor-led URL takedown and notice-routing system for documenting abuse, generating reviewed notice packages, tracking escalation, and preserving audit trails without fetching or storing intimate media.",
    role: "Next.js, Prisma, safety architecture, notice templates, audit trails, admin review gates, policy documentation",
    type: "site",
    logo: "/images/logo-asmita.png",
    logoRounded: "rounded-xl",
    liveUrl: "https://meriasmita.org",
  },
  {
    id: 502,
    title: "Let's Love",
    category: "Mobile App",
    client: "JAMSAQ STUDIO",
    year: "2026",
    result: "Android v1.2.37",
    description: "Private couple space for chat, memories, goals, todos, date ideas, shared calendar moments, daily quotes, pings, streaks, app lock, subscriptions, and Play Store release workflows.",
    role: "Expo SDK 54, React Native 0.81, Firebase, Cloud Functions, FCM, RevenueCat, Zustand",
    type: "app",
    logo: "/images/logo-letslove.png",
    playStoreUrl: PLAY_STORE_LETSLOVE,
  },
  {
    id: 504,
    title: "Hadith of the Day",
    category: "Android App",
    client: "Faith Product",
    year: "2026",
    result: "Android v0.9.1",
    description: "Calm, source-forward hadith reading app with a vertical reflection feed, saved notes, collections, source-linked corpus, reminders, widget, sharing, and reviewed remote corpus contracts.",
    role: "Kotlin Android, backend contracts, validation tooling, provider policy, Firebase Functions emulator checks",
    type: "app",
    logo: "/images/logo-hod.png",
  },
  {
    id: 505,
    title: "Let's Love",
    category: "Landing Page",
    client: "Let's Love",
    year: "2026",
    result: "Landing Page",
    description: "Public signup site for the Let's Love mobile app, connected to Google Forms, optional Resend email, tester group links, voucher issuing, and production domain settings.",
    role: "Next.js, React, GSAP, Lenis, Three.js, server action signup flow",
    type: "site",
    logo: "/images/logo-letslove.png",
    liveUrl: "https://letslove.jamsaq.in",
  },
  {
    id: 508,
    title: "Trust and Safety India Festival",
    category: "Conference Website",
    client: "Centre For Social Research",
    year: "2026",
    result: "Official conference platform",
    description: "A polished event website for programme discovery, speaker profiles, registration, sponsors, media coverage, and conference information.",
    role: "Next.js 16, React 19, Tailwind, Sanity, Supabase, Clerk, Sentry",
    type: "site",
    logo: "/images/logo-tasi.png",
    wideLogo: true,
    liveUrl: "https://trustandsafetyindia.org",
  },
  {
    id: 509,
    title: "TASI",
    category: "Mobile App",
    client: "Centre For Social Research",
    year: "2026",
    result: "Expo app v1.0.4",
    description: "Conference companion app with authentication, event data, dark visual system, camera permissions for QR check-in, notifications, media/profile support, and OTA updates.",
    role: "Expo, React Native, Clerk Expo, Firebase, Supabase, Sanity, Sentry, React Query",
    type: "app",
    logo: "/images/logo-tasi.png",
    wideLogo: true,
  },
]

// =========================================
// SERVICES / CAPABILITIES / ENGAGEMENTS / PROCESS / TESTIMONIALS
// =========================================
export const services = [
  {
    title: "Websites",
    desc: "High-signal marketing sites and digital experiences that feel considered at every pixel.",
    points: ["Brand systems & visual language", "Conversion-focused marketing sites", "Webflow + custom engineering", "Performance & accessibility"]
  },
  {
    title: "Mobile Apps",
    desc: "Quietly excellent iOS and Android experiences built for real people, not app-store theatre.",
    points: ["Consumer and B2B products", "Real-time and offline-first", "App Store growth support", "Native + cross-platform"]
  },
  {
    title: "AI Systems",
    desc: "Agents, RAG pipelines, and LLM-powered automation that actually work in production.",
    points: ["RAG & vector search pipelines", "AI agents & workflow automation", "Document intelligence & extraction", "OpenAI · Anthropic · LangChain"]
  }
]

export const capabilities: { title: string; headline: string; items: string[]; icon: ReactNode }[] = [
  {
    title: "WEB",
    headline: "Websites & Web Apps",
    items: ["Landing pages & marketing sites", "Conference & event platforms", "SaaS web applications", "Next.js · TypeScript · Tailwind"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "MOBILE",
    headline: "Mobile Apps",
    items: ["Android (Kotlin / Compose)", "Cross-platform (Expo / React Native)", "Firebase · Supabase · RevenueCat", "Play Store release & OTA updates"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M10 18h4" />
      </svg>
    ),
  },
  {
    title: "AI SYSTEMS",
    headline: "AI Agents & Automation",
    items: ["RAG pipelines & vector search", "LLM-powered workflows & agents", "Document automation & extraction", "OpenAI · Anthropic · LangChain"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
        <path d="M9 12h6" />
        <path d="M8 16h8a4 4 0 0 1 4 4H4a4 4 0 0 1 4-4z" />
        <circle cx="9" cy="7" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export const engagements = [
  {
    name: "Starter",
    scope: "Marketing site or landing page",
    desc: "A focused build for brands that need a sharp, fast web presence, designed, built, and deployed in weeks.",
    timeline: "1–2 weeks",
    includes: ["Landing page or marketing site", "Mobile-responsive design", "CMS integration", "Launch & handoff support"],
    featured: false,
  },
  {
    name: "Growth",
    scope: "Full product build",
    desc: "End-to-end product engagement: discovery, design system, core experience, and first release.",
    timeline: "2–4 weeks",
    includes: ["Web or mobile application", "Design system & component library", "Auth, payments, integrations", "Testing & deployment pipeline"],
    featured: true,
  },
  {
    name: "Scale",
    scope: "Complex platform",
    desc: "For products that need real-time collaboration, multi-user roles, integrations, and infrastructure that holds.",
    timeline: "4–8 weeks",
    includes: ["Multi-service architecture", "Admin dashboards & tooling", "Third-party integrations", "Observability & scale planning"],
    featured: false,
  },
]

export const process = [
  { num: "01", title: "Discover", desc: "Deep listening. User research, constraints, ambition. We align before we design." },
  { num: "02", title: "Design", desc: "High-fidelity prototypes, interaction systems, and a living design language you can feel." },
  { num: "03", title: "Build", desc: "Production-grade, type-safe work with weekly demos and zero theatre at handoff." },
  { num: "04", title: "Launch & Care", desc: "Careful deployment, training, and an ongoing relationship. We stay close." }
]

export const testimonials = [
  { quote: "The TASI 2026 website and app exceeded every expectation. Delivered on time, polished, and production-ready.", name: "TASI 2026 Team", role: "Centre For Social Research" },
  { quote: "Really loving the experience so far. The app feels cozy, private, and designed with couples in mind. Features like shared memories, goals, and daily interactions make staying connected feel more special. Excited to see what's coming next!", name: "Let's Love user", role: "★★★★★ via Google Play" },
  { quote: "The Asmita platform handled sensitive workflows with exactly the right level of care and technical rigour.", name: "Asmita Project", role: "Open-source safety project" }
]
