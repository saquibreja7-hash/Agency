/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Menu, X, ArrowRight, Sparkle } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProjectShowcase } from './components/ProjectShowcase'
import { submitContact } from './actions/contact'

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger)

// =========================================
// TYPES
// =========================================
interface Project {
  id: number
  title: string
  category: string
  client: string
  year: string
  result: string
  description: string
  role: string
}

interface FormData {
  name: string
  email: string
  company: string
  service: string
  timeline: string
  message: string
}

// =========================================
// CONTENT — Adapted to Slacc design language
// =========================================

const projectGroups = [
  {
    title: "Websites & Commerce",
    kicker: "PUBLIC DIGITAL EXPERIENCES",
    desc: "Launch-ready marketing, commerce, event, and SaaS surfaces with editorial presentation and production fundamentals.",
    items: [
      { id: 101, title: "TASI 2026 Website", category: "Website", client: "Centre For Social Research", year: "2026", result: "Conference website", description: "Official event website covering programme, speakers, registration, sponsorship, media coverage, and event information for TASI 2026.", role: "Next.js 16, React 19, Tailwind CSS, Sanity/Supabase/Clerk integrations" },
      { id: 102, title: "Shagun Box", category: "Commerce Website", client: "Shagun Box", year: "2026", result: "Complete MVP storefront", description: "India-focused premium gifting storefront for Shadi, Nikah, Eid/Ramadan, family gifting, and corporate orders with customization, cart, checkout-style requests, and WhatsApp handoff.", role: "Next.js App Router, TypeScript, Tailwind, product filters, cart, lead capture, SEO, analytics hooks" },
      { id: 103, title: "ShaadiInvite", category: "SaaS Web App", client: "RSVP", year: "2026", result: "Active MVP build", description: "Mobile-first wedding invitation and RSVP platform for Indian families, planners, and couples with invite pages, event schedules, guest RSVPs, WhatsApp sharing, payments, privacy, galleries, and planner tooling.", role: "Next.js 14, Supabase, Razorpay, Cloudinary, Anthropic, analytics, Sentry" },
      { id: 104, title: "JAMSAQ STUDIO Website", category: "Website", client: "JAMSAQ STUDIO", year: "2026", result: "Launch-ready agency site", description: "Premium digital studio website with typed local content, SEO surfaces, form protection, strategy documentation, QA evidence, and deployment handoff materials.", role: "Next.js App Router, TypeScript, Tailwind, shadcn/ui, Server Actions, Zod, QA and launch documentation" },
      { id: 105, title: "Let's Love Landing Page", category: "Landing Page", client: "Let's Love", year: "2026", result: "Landing Page", description: "Public signup site for the Let's Love mobile app, connected to Google Forms, optional Resend email, tester group links, voucher issuing, and production domain settings.", role: "Next.js, React, GSAP, Lenis, Three.js, server action signup flow" },
    ] as Project[],
  },
  {
    title: "Mobile Apps",
    kicker: "NATIVE PRODUCT SYSTEMS",
    desc: "Android and Expo products with real user flows, persistence, notifications, privacy controls, and release paths.",
    items: [
      { id: 201, title: "Let's Love", category: "Mobile App", client: "JAMSAQ STUDIO", year: "2026", result: "Android v1.2.37", description: "Private couple space for chat, memories, goals, todos, date ideas, calendar moments, daily quotes, pings, streaks, app lock, subscriptions, and Play Store release workflows.", role: "Expo SDK 54, React Native 0.81, Firebase Auth/Firestore/Storage/Functions/FCM, RevenueCat, Zustand" },
      { id: 202, title: "TASI 2026 App", category: "Mobile App", client: "Centre For Social Research", year: "2026", result: "Expo app v1.0.4", description: "Conference companion app with dark visual system, authentication, event data surfaces, camera permissions for QR check-in, notifications, media/profile support, and OTA updates.", role: "Expo, React Native, Clerk Expo, Firebase, Supabase, Sanity, Sentry, React Query" },
      { id: 203, title: "AI Note Researcher", category: "Android App", client: "Internal Product Lab", year: "2026", result: "MVP alpha/private beta", description: "Local-first Kotlin app that turns rough notes, shopping research, grocery lists, books, and app ideas into structured decision cards with citations, provenance, privacy controls, search, and export.", role: "Kotlin, Jetpack Compose, Room, WorkManager, FTS search, privacy controls, local template generation" },
      { id: 204, title: "Draft Habit", category: "Android App", client: "Creator Tools", year: "2026", result: "Creator execution assistant", description: "Solo creator app that turns social media uncertainty into daily content briefs, hooks, captions, tool recommendations, idea banks, templates, repurposing, and lightweight pipeline tracking.", role: "Kotlin Android, native Android Views, Room persistence, local reminders, backend scaffold" },
      { id: 205, title: "Hadith of the Day", category: "Android App", client: "Faith Product", year: "2026", result: "Android v0.9.1", description: "Calm, source-forward hadith reading app with a vertical reflection feed, saved notes, collections, source-linked corpus, reminders, widget, sharing, and reviewed remote corpus contracts.", role: "Kotlin Android, backend contracts, validation tooling, provider policy, Firebase Functions emulator checks" },
      { id: 206, title: "Time Twist", category: "AI Mobile System", client: "Productivity Lab", year: "2026", result: "AI life audit MVP foundation", description: "Android-first life audit app that maps a real 24-hour routine, detects time waste and hidden opportunity, then helps redesign tomorrow around goals, energy, relationships, work, health, and recovery.", role: "Kotlin Compose, Material 3, Room/DataStore-oriented models, TypeScript backend, PostgreSQL, OpenAPI, prompts, schemas, evals" },
    ] as Project[],
  },
  {
    title: "Systems & Documentation",
    kicker: "OPERATIONS, SAFETY, HANDOVER",
    desc: "Sensitive workflows, client handovers, automation, and documentation-heavy systems built with reviewability in mind.",
    items: [
      { id: 301, title: "Asmita", category: "Safety System", client: "Open-source safety project", year: "2026", result: "Digital Safety Platform", description: "Survivor-led URL takedown and notice-routing system for documenting abuse, generating reviewed notice packages, tracking escalation, and preserving audit trails without fetching or storing intimate media.", role: "Next.js, Prisma, safety architecture, notice templates, audit trails, admin review gates, policy documentation" },
      { id: 302, title: "TASI Client Handover", category: "Documentation System", client: "TASI 2026", year: "2026", result: "Full handover package", description: "Structured client handover package covering credentials, technical documentation, deployment SOPs, design assets, source-code notes, user manuals, invoices, and legal documents.", role: "Technical docs, PDF/HTML generation, deployment SOP, manuals, scope/warranty/NDA/maintenance documents" },
      { id: 303, title: "Speaker & Seminar Documents", category: "Document Automation", client: "Research / seminar workflow", year: "2026", result: "Formatted academic deliverables", description: "Document-production workspace for seminar papers, footnotes, references, numbering, render checks, speaker spreadsheets, and publishing polish.", role: "Python docx tooling, render verification, spreadsheet compilation, academic formatting and footnote workflows" },
    ] as Project[],
  },
]

const featuredProjects = [
  {
    id: 401,
    title: "TASI 2026 Website",
    category: "Conference Website",
    client: "Centre For Social Research",
    year: "2026",
    result: "Official conference platform",
    description: "A polished event website for programme discovery, speaker profiles, registration, sponsors, media coverage, and conference information.",
    role: "Next.js 16, React 19, Tailwind, Sanity, Supabase, Clerk, Sentry",
    visual: "event",
    tone: "Deep event system with editorial programme cards, speaker surfaces, and registration flow.",
  },
  {
    id: 402,
    title: "Shagun Box",
    category: "Commerce Website",
    client: "Shagun Box",
    year: "2026",
    result: "Complete MVP storefront",
    description: "Premium India-first gifting storefront for Shadi, Nikah, Eid/Ramadan, family gifting, and corporate orders with cart, customization, and WhatsApp-assisted checkout.",
    role: "Next.js App Router, TypeScript, Tailwind, product filters, cart, lead capture, SEO, analytics hooks",
    visual: "commerce",
    tone: "Warm storefront system with occasion-led collections, personalization controls, and trust-building checkout handoff.",
  },
  {
    id: 403,
    title: "Let's Love",
    category: "Mobile App",
    client: "JAMSAQ STUDIO",
    year: "2026",
    result: "Android v1.2.37",
    description: "Private couple space for chat, memories, goals, todos, date ideas, shared calendar moments, daily quotes, pings, streaks, app lock, and subscriptions.",
    role: "Expo SDK 54, React Native 0.81, Firebase, Cloud Functions, FCM, RevenueCat, Zustand",
    visual: "phone",
    tone: "A complete relationship app with intimate rituals, realtime messaging, and Play Store release workflows.",
  },
  {
    id: 404,
    title: "TASI 2026 App",
    category: "Mobile App",
    client: "Centre For Social Research",
    year: "2026",
    result: "Expo app v1.0.4",
    description: "Conference companion app with authentication, event data, dark visual system, camera permissions for QR check-in, notifications, media/profile support, and OTA updates.",
    role: "Expo, React Native, Clerk Expo, Firebase, Supabase, Sanity, Sentry, React Query",
    visual: "darkPhone",
    tone: "Mobile conference companion designed for on-site utility, attendee identity, and live operational moments.",
  },
  {
    id: 405,
    title: "JAMSAQ STUDIO Website",
    category: "Agency Website",
    client: "JAMSAQ STUDIO",
    year: "2026",
    result: "Launch-ready studio site",
    description: "Premium digital studio website with typed local content, SEO surfaces, protected forms, strategy documentation, QA evidence, and deployment handoff materials.",
    role: "Next.js App Router, TypeScript, Tailwind, shadcn/ui, Server Actions, Zod, QA and launch documentation",
    visual: "browser",
    tone: "A refined agency system with case-study storytelling, lead capture, SEO, and launch discipline.",
  },
  {
    id: 406,
    title: "TASI Client Handover",
    category: "Documentation System",
    client: "TASI 2026",
    year: "2026",
    result: "Full handover package",
    description: "Structured handover package covering credentials, technical docs, deployment SOPs, design assets, source-code notes, user manuals, invoices, and legal documents.",
    role: "Technical docs, PDF/HTML generation, deployment SOP, manuals, scope/warranty/NDA/maintenance documents",
    visual: "docs",
    tone: "A complete client-transfer system, built so ownership, maintenance, and future changes are understandable.",
  },
] satisfies Array<Project & { visual: string; tone: string }>

const curatedShowcase = [
  { id: 501, title: "Meri Asmita", category: "Web App", client: "Open-source safety project", year: "2026", result: "Digital Safety Platform", description: "Survivor-led URL takedown and notice-routing system for documenting abuse, generating reviewed notice packages, tracking escalation, and preserving audit trails without fetching or storing intimate media.", role: "Next.js, Prisma, safety architecture, notice templates, audit trails, admin review gates, policy documentation", type: "site" },
  { id: 502, title: "Let's Love", category: "Mobile App", client: "JAMSAQ STUDIO", year: "2026", result: "Android v1.2.37", description: "Private couple space for chat, memories, goals, todos, date ideas, shared calendar moments, daily quotes, pings, streaks, app lock, subscriptions, and Play Store release workflows.", role: "Expo SDK 54, React Native 0.81, Firebase, Cloud Functions, FCM, RevenueCat, Zustand", type: "app" },
  { id: 504, title: "Hadith of the Day", category: "Android App", client: "Faith Product", year: "2026", result: "Android v0.9.1", description: "Calm, source-forward hadith reading app with a vertical reflection feed, saved notes, collections, source-linked corpus, reminders, widget, sharing, and reviewed remote corpus contracts.", role: "Kotlin Android, backend contracts, validation tooling, provider policy, Firebase Functions emulator checks", type: "app" },
  { id: 505, title: "Let's Love", category: "Landing Page", client: "Let's Love", year: "2026", result: "Landing Page", description: "Public signup site for the Let's Love mobile app, connected to Google Forms, optional Resend email, tester group links, voucher issuing, and production domain settings.", role: "Next.js, React, GSAP, Lenis, Three.js, server action signup flow", type: "site" },

  { id: 508, title: "Trust and Safety India Festival", category: "Conference Website", client: "Centre For Social Research", year: "2026", result: "Official conference platform", description: "A polished event website for programme discovery, speaker profiles, registration, sponsors, media coverage, and conference information.", role: "Next.js 16, React 19, Tailwind, Sanity, Supabase, Clerk, Sentry", type: "site" },
  { id: 509, title: "TASI", category: "Mobile App", client: "Centre For Social Research", year: "2026", result: "Expo app v1.0.4", description: "Conference companion app with authentication, event data, dark visual system, camera permissions for QR check-in, notifications, media/profile support, and OTA updates.", role: "Expo, React Native, Clerk Expo, Firebase, Supabase, Sanity, Sentry, React Query", type: "app" },
] satisfies Array<Project & { type: 'site' | 'app' }>

function getProjectLogo(title: string): string | null {
  const t = title.toLowerCase()
  if (t.includes('asmita')) return '/images/logo-asmita.png'
  if (t.includes("let's love") || t.includes('lets love')) return '/images/logo-letslove.png'
  if (t.includes('tasi') || t.includes('trust and safety india')) return '/images/logo-tasi.png'
  if (t.includes('hadith')) return '/images/logo-hod.png'
  return null
}

function getProjectAvatar(title: string): { initials: string; bg: string; text: string } {
  const t = title.toLowerCase()
  if (t.includes('tasi') || t.includes('trust and safety india')) return { initials: 'T', bg: '#b91c1c', text: '#fef2f2' }
  if (t.includes('hadith')) return { initials: 'H', bg: '#1a6b5c', text: '#d4f0e8' }
  if (t.includes('draft habit')) return { initials: 'DH', bg: '#c45c1a', text: '#fde8d4' }
  if (t.includes('time twist')) return { initials: 'TT', bg: '#1a3a6b', text: '#d4e0f0' }
  if (t.includes('ai note') || t.includes('note researcher')) return { initials: 'AI', bg: '#3a1a6b', text: '#e0d4f0' }
  if (t.includes('shagun')) return { initials: 'SB', bg: '#6b1a3a', text: '#f0d4e0' }
  if (t.includes('shaadi') || t.includes('rsvp')) return { initials: 'SI', bg: '#6b3a1a', text: '#f0e0d4' }
  if (t.includes('jamsaq')) return { initials: 'JS', bg: '#4a154b', text: '#d9bdde' }
  if (t.includes("let's love landing") || t.includes('lets love landing')) return { initials: 'LL', bg: '#8b1a4a', text: '#f0d4e3' }
  // generic fallback using first letter
  const word = title.trim().split(' ')[0]
  return { initials: word.slice(0, 2).toUpperCase(), bg: '#4a154b', text: '#d9bdde' }
}

function getPlayStoreLink(title: string, category: string): string | null {
  const t = title.toLowerCase()
  if ((t.includes("let's love") || t.includes('lets love')) && category.toLowerCase().includes('mobile')) {
    return 'https://play.google.com/store/apps/details?id=com.letslove.app'
  }
  return null
}

function getProjectUrl(title: string, category?: string): string | null {
  const t = title.toLowerCase()
  const c = (category ?? '').toLowerCase()
  const LIVE_URLS: Record<string, string> = {
    asmita: 'https://meriasmita.org',
    letsLoveLanding: 'https://letslove.jamsaq.in',
    tasiWebsite: 'https://trustandsafetyindia.org',
  }
  if (t.includes('asmita') && LIVE_URLS.asmita) return LIVE_URLS.asmita
  if ((t.includes("let's love") || t.includes('lets love')) && c.includes('landing') && LIVE_URLS.letsLoveLanding) return LIVE_URLS.letsLoveLanding
  if ((t.includes('tasi') || t.includes('trust and safety india')) && !c.includes('mobile') && !c.includes('android') && !c.includes('app') && LIVE_URLS.tasiWebsite) return LIVE_URLS.tasiWebsite
  return null
}

const showcasedSites = curatedShowcase.filter(project => project.type === 'site')
const showcasedApps = curatedShowcase.filter(project => project.type === 'app')

const services = [
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

const capabilities = [
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

const engagements = [
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

const process = [
  { num: "01", title: "Discover", desc: "Deep listening. User research, constraints, ambition. We align before we design." },
  { num: "02", title: "Design", desc: "High-fidelity prototypes, interaction systems, and a living design language you can feel." },
  { num: "03", title: "Build", desc: "Production-grade, type-safe work with weekly demos and zero theatre at handoff." },
  { num: "04", title: "Launch & Care", desc: "Careful deployment, training, and an ongoing relationship. We stay close." }
]

const testimonials = [
  { quote: "The TASI 2026 website and app exceeded every expectation. Delivered on time, polished, and production-ready.", name: "TASI 2026 Team", role: "Centre For Social Research" },
  { quote: "Really loving the experience so far. The app feels cozy, private, and designed with couples in mind. Features like shared memories, goals, and daily interactions make staying connected feel more special. Excited to see what's coming next!", name: "Let's Love user", role: "★★★★★ via Google Play" },
  { quote: "The Asmita platform handled sensitive workflows with exactly the right level of care and technical rigour.", name: "Asmita Project", role: "Open-source safety project" }
]

const textReveal = {
  hidden: ({ offset = 20, blur = 10 }: { offset?: number; blur?: number }) => ({ opacity: 0, y: offset, filter: `blur(${blur}px)` }),
  visible: ({ delay, duration = 0.7 }: { delay: number; duration?: number }) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration, delay, ease: 'easeOut' },
  }),
}


function AgencyDashboardPreview() {
  return (
    <div className="overflow-hidden rounded-t-xl border border-white/60 bg-white text-left shadow-[0_-8px_80px_rgba(74,21,75,0.12),0_40px_120px_rgba(0,0,0,0.16)]">
      <div className="flex h-10 items-center justify-between border-b border-[#e6e6e6] bg-[#faf6f1] px-4">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#06d6a0]" />
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#4a154b]">Jamsaq Launch Room</div>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-[1.1fr_0.9fr] sm:p-7">
        <div className="rounded-lg bg-[#f4ede4] p-5">
          <div className="mb-3 text-xs font-bold uppercase tracking-[1.4px] text-[#4a154b]">Product build</div>
          <div className="text-3xl font-semibold leading-none tracking-[-1px] text-[#1d1d1d] sm:text-5xl">From idea to shipped</div>
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-[#696969]">A focused workspace for websites, mobile apps, and platforms moving from brief to launch.</p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
            <div className="rounded bg-white p-3"><strong className="block text-[#4a154b]">98</strong>Perf score</div>
            <div className="rounded bg-white p-3"><strong className="block text-[#4a154b]">6 wk</strong>First release</div>
            <div className="rounded bg-white p-3"><strong className="block text-[#4a154b]">4.9</strong>Client rating</div>
          </div>
        </div>
        <div className="space-y-3">
          {['Discovery sprint', 'Design system', 'Engineering handoff'].map((item, index) => (
            <div key={item} className="rounded-lg border border-[#e6e6e6] bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#1d1d1d]">{item}</span>
                <span className="text-xs text-[#4a154b]">{index === 2 ? 'Ready' : 'Live'}</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-[#f4ede4]">
                <div className="h-1.5 rounded-full bg-[#4a154b]" style={{ width: `${88 - index * 14}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectArtifact({ type, title }: { type: string; title: string }) {
  if (type === 'phone' || type === 'darkPhone') {
    return (
      <div className={`artifact-phone ${type === 'darkPhone' ? 'artifact-phone-dark' : ''}`}>
        <div className="artifact-phone-speaker" />
        <div className="artifact-phone-screen">
          <div className="artifact-phone-kicker">{type === 'darkPhone' ? 'TASI LIVE' : 'LET\'S LOVE'}</div>
          <div className="artifact-phone-title">{type === 'darkPhone' ? 'Today at the venue' : 'Shared home'}</div>
          <div className="artifact-chat-card">{type === 'darkPhone' ? 'QR check-in ready' : 'Date idea saved'}</div>
          <div className="artifact-chat-card muted">{type === 'darkPhone' ? 'Programme updated' : 'Memory added'}</div>
          <div className="artifact-bottom-pill">{type === 'darkPhone' ? 'Open pass' : 'Send ping'}</div>
        </div>
      </div>
    )
  }

  if (type === 'commerce') {
    return (
      <div className="artifact-commerce">
        <div className="artifact-box lid" />
        <div className="artifact-box">
          <span>Dry Fruits</span>
          <strong>Custom Shagun</strong>
        </div>
        <div className="artifact-tag">WhatsApp order</div>
      </div>
    )
  }

  if (type === 'docs') {
    return (
      <div className="artifact-docs">
        {['SOP', 'Tech Docs', 'Legal'].map((label, index) => (
          <div key={label} className="artifact-doc" style={{ transform: `translate(${index * 18}px, ${index * -10}px) rotate(${index * 2 - 3}deg)` }}>
            <div className="artifact-doc-line wide" />
            <div className="artifact-doc-line" />
            <div className="artifact-doc-label">{label}</div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'event') {
    return (
      <div className="artifact-event">
        <div className="artifact-event-date">2026</div>
        <div className="artifact-event-title">TASI</div>
        <div className="artifact-event-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }

  return (
    <div className="artifact-browser">
      <div className="artifact-browser-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="artifact-browser-body">
        <div className="artifact-browser-kicker">{title}</div>
        <div className="artifact-browser-headline" />
        <div className="artifact-browser-headline short" />
        <div className="artifact-browser-row">
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  )
}

// =========================================
// MAIN APP
// =========================================
function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', company: '', service: 'Website', timeline: '1–2 weeks (Starter)', message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)

  // Refs for Lenis and scroll animations
  const lenisRef = useRef<Lenis | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const engagementsRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) => {
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(`#${id}`, { 
        offset: -70, 
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3) 
      })
    } else {
      const el = document.getElementById(id)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 72
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  const openProject = (p: Project) => {
    setSelectedProject(p)
    lenisRef.current?.stop()
    document.body.style.overflow = 'hidden'
  }
  const closeProject = () => {
    setSelectedProject(null)
    lenisRef.current?.start()
    document.body.style.overflow = 'unset'
  }

  // Initialize Lenis smooth scroll + GSAP ScrollTrigger parallax animations
  useEffect(() => {
    // Create Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 * (-Math.pow(2, -10 * t) + 1)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
    })
    lenisRef.current = lenis

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Setup all scroll-driven parallax and entrance animations
    const setupAnimations = () => {
      // Hero text subtle spatial parallax
      const heroText = heroRef.current?.querySelector('.hero-text')
      if (heroText) {
        gsap.to(heroText, {
          y: 38,
          opacity: 0.94,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.65,
          },
        })
      }

      // Capability cards entrance
      if (statsRef.current) {
        const capCards = statsRef.current.querySelectorAll('[data-reveal]')
        gsap.from(capCards, {
          y: 30,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 78%',
          },
        })
      }

      const revealEls = document.querySelectorAll('[data-reveal]')
      revealEls.forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
          },
        })
      })

      // --- WORK SECTION: staggered reveal + parallax on cards ---
      if (workRef.current) {
        const cards = workRef.current.querySelectorAll('.work-card')
        gsap.from(cards, {
          y: 52,
          opacity: 0,
          duration: 0.85,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: workRef.current,
            start: 'top 72%',
          },
        })

        // Light individual parallax
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 === 0 ? -22 : 18,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'bottom top',
              scrub: 1.1,
            },
          })
        })
      }

      // --- ENGAGEMENTS / PRICING: featured card emphasis + parallax ---
      if (engagementsRef.current) {
        const pricingCards = engagementsRef.current.querySelectorAll('.card-pricing, .card-pricing-featured')
        gsap.from(pricingCards, {
          y: 35,
          opacity: 0.3,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: engagementsRef.current,
            start: 'top 75%',
          },
        })

        pricingCards.forEach((card) => {
          gsap.to(card, {
            y: -14,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom top',
              scrub: 0.8,
            },
          })
        })
      }

      // --- PROCESS: nice staggered cards with parallax ---
      if (processRef.current) {
        const procCards = processRef.current.querySelectorAll('.card-feature-cream')
        gsap.from(procCards, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.11,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 70%',
          },
        })

        procCards.forEach((card, i) => {
          gsap.to(card, {
            y: -16 + (i % 2) * 8,
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              end: 'bottom top',
              scrub: 1,
            },
          })
        })
      }
    }

    // Delay setup slightly so DOM and measurements are ready
    const raf = requestAnimationFrame(() => {
      setupAnimations()
      // Refresh ScrollTrigger after Lenis is ready
      ScrollTrigger.refresh()
    })

    // Cleanup
    return () => {
      cancelAnimationFrame(raf)
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      // GSAP ticker is automatically managed; explicit remove not strictly needed here
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    const form = e.target as HTMLFormElement
    const honeypot = (form.elements.namedItem('website') as HTMLInputElement)?.value ?? ''
    const result = await submitContact(formData, honeypot)
    setIsSubmitting(false)
    if (result.ok) {
      setIsSubmitted(true)
      setFormData({ name: '', email: '', company: '', service: 'Website', timeline: '1–2 weeks (Starter)', message: '' })
      setTimeout(() => setIsSubmitted(false), 5000)
    } else {
      setSubmitError(result.error ?? 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink)] selection:bg-[#4a154b] selection:text-white font-sans">
      {/* NAV — nav-bar-light */}
      <nav className="nav-bar-light fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#f0f0f0]">
        <div className="container grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-5">
          <div onClick={() => scrollTo('hero')} className="cursor-pointer justify-self-start">
            <Image src="/images/logo-purple.png" alt="JAMSAQ STUDIO" width={180} height={40} priority style={{ height: '40px', width: 'auto' }} />
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 text-sm justify-self-center">
            <button onClick={() => scrollTo('work')} className="nav-link">Work</button>
            <button onClick={() => scrollTo('engagements')} className="nav-link">Engagements</button>
            <button onClick={() => scrollTo('process')} className="nav-link">Process</button>
          </div>

          <div className="hidden md:flex shrink-0 items-center gap-3 justify-self-end">
            <button onClick={() => scrollTo('contact')} className="button-primary-pill text-sm">Start a project</button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 md:hidden justify-self-end" aria-label="Menu">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div className="md:hidden mobile-menu px-6 py-6 text-sm space-y-4">
              {['work', 'services', 'engagements', 'process', 'contact'].map(id => (
                <button key={id} onClick={() => scrollTo(id)} className="block w-full text-left py-1 nav-link capitalize">{id}</button>
              ))}
              <div className="pt-3 flex flex-col gap-3">
                <button onClick={() => scrollTo('contact')} className="button-primary-pill w-full justify-center">Start a project</button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO — pastel mesh + floating mockups with parallax */}
      <section id="hero" ref={heroRef} className="hero relative min-h-screen overflow-hidden px-5 pt-[96px] text-center sm:pt-[118px] md:pt-[140px]" style={{ backgroundColor: '#1a1420' }}>
        <Image src="/images/hero-bg.png" alt="" fill priority style={{ objectFit: 'cover', objectPosition: 'center bottom', opacity: 0.85 }} />
        <div className="pointer-events-none absolute inset-0 bg-[rgba(10,8,15,0.45)]" />
        <div className="hero-text relative z-10 mx-auto flex max-w-[820px] flex-col items-center">
          <motion.div custom={{ offset: 16, blur: 8, delay: 0.1, duration: 0.6 }} initial="hidden" animate="visible" variants={textReveal} className="mb-3 text-xs font-medium text-white/80 sm:mb-4 sm:text-[13px] md:text-sm">
            DIGITAL PRODUCTS, CAREFULLY MADE
          </motion.div>
          <h1 className="text-[34px] font-medium leading-[1.05] tracking-[-1.36px] sm:text-[44px] md:text-[56px] lg:text-[68px]">
            <motion.span custom={{ offset: 24, blur: 12, delay: 0.2 }} initial="hidden" animate="visible" variants={textReveal} className="block text-white/60">A New Standard</motion.span>
            <motion.span custom={{ offset: 24, blur: 12, delay: 0.32 }} initial="hidden" animate="visible" variants={textReveal} className="block text-white">for Digital Craft</motion.span>
          </h1>
          <motion.p custom={{ offset: 20, blur: 8, delay: 0.45 }} initial="hidden" animate="visible" variants={textReveal} className="mt-4 max-w-[460px] text-sm font-medium leading-relaxed text-white/85 sm:text-base md:mt-5 md:text-lg">
            JAMSAQ STUDIO builds websites, mobile apps, and web platforms with premium motion, precise interfaces, and production-grade engineering.
          </motion.p>
          <motion.div custom={{ offset: 18, blur: 8, delay: 0.58 }} initial="hidden" animate="visible" variants={textReveal} className="mt-7 flex flex-wrap justify-center gap-3">
            <button onClick={() => scrollTo('work')} className="button-primary-pill !bg-[#111] hover:!bg-[#333]">See our work</button>
            <button onClick={() => scrollTo('contact')} className="button-secondary-pill">Begin a conversation</button>
          </motion.div>
        </div>


        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 80, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-[92vw] max-w-[944px] sm:w-[72vw] md:w-[60vw] lg:w-[54vw]"
          >
            <AgencyDashboardPreview />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[6] h-[220px] bg-gradient-to-t from-[#05050c]/85 via-[#05050c]/50 to-transparent" />
        <motion.button
          onClick={() => scrollTo('services')}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
          transition={{ opacity: { duration: 0.6, delay: 1.2 }, y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute bottom-3 left-0 right-0 z-20 mx-auto flex w-fit items-center gap-2 text-sm font-medium tracking-[-0.28px] text-white"
        >
          <motion.span
            className="inline-flex h-3.5 w-3.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkle size={14} strokeWidth={2} />
          </motion.span>
          Scroll to explore
        </motion.button>
      </section>

      {/* SERVICES — card-feature-cream */}
      <section id="services" className="section editorial-band relative overflow-hidden">
        <div className="container">
          <div data-reveal className="text-center mb-10">
            <div className="pill-cap-shade mb-3">WHAT WE MAKE</div>
            <h2 className="display-xl tracking-[-0.5px]">Three kinds of work.<br />One standard of care.</h2>
            <p className="body-lg text-[#696969] max-w-[42ch] mx-auto mt-4">
              Every project receives the same obsessive attention to craft, motion, and user delight, whether it's a marketing site, a mobile product, or a complex platform.
            </p>
          </div>

          {/* Interactive Service Showcase */}
          <div className="max-w-5xl mx-auto">
            {/* Service Selectors - elegant interactive tabs */}
            <div data-reveal className="flex flex-col md:flex-row justify-center gap-3 mb-8">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setActiveServiceIndex(index)}
                  className={`motion-card group flex-1 md:flex-none px-8 py-4 rounded-[90px] text-left md:text-center transition-all border flex items-center gap-3 ${
                    activeServiceIndex === index 
                      ? 'bg-[#4a154b] text-white border-[#4a154b] shadow-lg' 
                      : 'bg-white hover:bg-[#f9f0ff] border-[#e6e6e6] text-[#1d1d1d] hover:border-[#4a154b]'
                  }`}
                >
                  <div>
                    <div className="font-semibold tracking-tight text-lg">{service.title}</div>
                    <div className={`text-sm mt-0.5 ${activeServiceIndex === index ? 'text-[#d9bdde]' : 'text-[#696969]'}`}>
                      {index === 0 && "Stunning digital experiences"}
                      {index === 1 && "Native-quality on every device"}
                      {index === 2 && "Agents, RAG & LLM automation"}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Attractive Live Preview Area */}
            <div data-reveal className="surface-halo relative bg-white rounded-[24px] border border-[#e6e6e6] overflow-hidden shadow-xl min-h-[380px] md:min-h-[420px] flex items-center justify-center p-4 md:p-8 transition-all duration-500">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeServiceIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.985 }}
                  transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full max-w-[920px]"
                >
                  {activeServiceIndex === 0 && (
                    /* Websites Preview - Elegant Browser */
                    <div className="mockup-browser w-full max-w-[860px] mx-auto shadow-2xl">
                      <div className="mockup-header bg-[#f4ede4]">
                        <div className="mockup-dot" style={{ background: '#f55' }} />
                        <div className="mockup-dot" style={{ background: '#fc5' }} />
                        <div className="mockup-dot" style={{ background: '#5c5' }} />
                      </div>
                      <div className="p-8 bg-white text-left">
                        <div className="max-w-md">
                          <div className="pill-cap-shade mb-4">BRAND EXPERIENCE</div>
                          <h3 className="text-4xl tracking-[-1.5px] font-semibold leading-none mb-4 text-[#1d1d1d]">
                            Digital presence<br />that actually converts.
                          </h3>
                          <p className="text-[#696969] mb-6">We build fast, beautiful marketing sites and platforms with obsessive attention to typography, motion, and performance.</p>
                          <div className="flex gap-3">
                            <div className="button-primary-pill text-sm">Explore our work</div>
                            <div className="button-secondary-pill text-sm">See case studies</div>
                          </div>
                        </div>
                        <div className="mt-10 grid grid-cols-3 gap-4 text-sm">
                          <div className="bg-[#f4ede4] p-4 rounded-xl">
                            <div className="text-[#4a154b] text-xs tracking-widest mb-1">PERFORMANCE</div>
                            <div className="font-semibold">Production-grade</div>
                          </div>
                          <div className="bg-[#f4ede4] p-4 rounded-xl">
                            <div className="text-[#4a154b] text-xs tracking-widest mb-1">MOTION</div>
                            <div className="font-semibold">Framer Motion</div>
                          </div>
                          <div className="bg-[#f4ede4] p-4 rounded-xl">
                            <div className="text-[#4a154b] text-xs tracking-widest mb-1">STACK</div>
                            <div className="font-semibold">Next.js + Tailwind</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeServiceIndex === 1 && (
                    <div className="flex justify-center items-end gap-7">
                      {[
                        { src: '/images/app-letslove.jpg', name: 'Let\'s Love', label: 'Couple Space' },
                        { src: '/images/app-tasi.jpg', name: 'TASI 2026', label: 'Conference App' },
                        { src: '/images/app-hadith.jpg', name: 'Hadith of the Day', label: 'Daily Reflections' },
                      ].map((app, i) => {
                        const isCenter = i === 1
                        const w = isCenter ? 230 : 190
                        const r = 40 * (w / 393)
                        const bezel = 10 * (w / 393)
                        const diW = 126 * (w / 393)
                        const diH = 34 * (w / 393)
                        const diTop = 10 * (w / 393)

                        return (
                          <div key={app.name} className={`flex flex-col items-center gap-3 ${isCenter ? 'z-10' : 'z-0 hidden md:flex'}`}
                            style={{ transform: isCenter ? 'translateY(-10px)' : 'none' }}>
                            {/* iPhone 15 Pro frame */}
                            <div className="relative" style={{ width: w }}>
                              {/* Titanium outer frame */}
                              <div className="relative overflow-hidden" style={{
                                borderRadius: r,
                                padding: 3,
                                background: 'linear-gradient(145deg, #e8e5e0 0%, #d4d0ca 30%, #c7c3bc 60%, #ddd9d3 100%)',
                                boxShadow: `0 ${isCenter ? 40 : 25}px ${isCenter ? 90 : 60}px -20px rgba(0,0,0,0.25), 0 12px 35px -12px rgba(0,0,0,0.15), inset 0 0.5px 0 rgba(255,255,255,0.6), inset 0 -0.5px 0 rgba(0,0,0,0.1)`,
                              }}>
                                {/* Inner black bezel */}
                                <div className="relative" style={{
                                  borderRadius: r - 2,
                                  padding: bezel,
                                  background: '#000',
                                }}>
                                  {/* Dynamic Island */}
                                  <div className="absolute z-30" style={{
                                    width: diW, height: diH,
                                    top: bezel + diTop,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    borderRadius: 999,
                                    background: '#000',
                                    boxShadow: '0 0 0 1px rgba(255,255,255,0.04)',
                                  }} />
                                  {/* Screen */}
                                  <div className="relative overflow-hidden" style={{ borderRadius: r - bezel - 2 }}>
                                    <Image src={app.src} alt={app.name} width={390} height={844} className="w-full block" />
                                    {/* Glass reflection */}
                                    <div className="absolute inset-0 pointer-events-none" style={{
                                      background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)',
                                    }} />
                                  </div>
                                </div>
                                {/* Frame edge highlight */}
                                <div className="absolute inset-0 pointer-events-none" style={{
                                  borderRadius: r,
                                  border: '0.5px solid rgba(255,255,255,0.4)',
                                }} />
                              </div>
                              {/* Power button */}
                              <div className="absolute bg-gradient-to-b from-[#d4d0ca] to-[#c0bbb4]" style={{
                                width: 2.5, height: w * 0.14, right: -0.5,
                                top: '26%', borderRadius: '0 2px 2px 0',
                                boxShadow: '1px 0 2px rgba(0,0,0,0.3)',
                              }} />
                              {/* Volume up */}
                              <div className="absolute bg-gradient-to-b from-[#d4d0ca] to-[#c0bbb4]" style={{
                                width: 2.5, height: w * 0.08, left: -0.5,
                                top: '22%', borderRadius: '2px 0 0 2px',
                                boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
                              }} />
                              {/* Volume down */}
                              <div className="absolute bg-gradient-to-b from-[#d4d0ca] to-[#c0bbb4]" style={{
                                width: 2.5, height: w * 0.08, left: -0.5,
                                top: '32%', borderRadius: '2px 0 0 2px',
                                boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
                              }} />
                              {/* Action button */}
                              <div className="absolute bg-gradient-to-b from-[#d4d0ca] to-[#c0bbb4]" style={{
                                width: 2.5, height: w * 0.04, left: -0.5,
                                top: '16%', borderRadius: '2px 0 0 2px',
                                boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
                              }} />
                            </div>
                            {/* Label */}
                            <div className="text-center mt-1">
                              <div className="text-[11px] font-semibold text-[#1d1d1d] tracking-tight">{app.name}</div>
                              <div className="text-[9px] text-[#696969]">{app.label}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {activeServiceIndex === 2 && (
                    /* AI Systems Preview */
                    <div className="bg-[#0f0f14] border border-white/10 rounded-3xl p-6 max-w-[820px] mx-auto shadow-2xl text-white">
                      <div className="flex justify-between items-center mb-6 px-2">
                        <div>
                          <div className="text-xs tracking-[2px] text-[#d9bdde]">AI AGENT RUNTIME</div>
                          <div className="text-2xl font-semibold tracking-tight">Document intelligence pipeline</div>
                        </div>
                        <div className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-4 py-1.5">● Running</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                          <div className="text-white/50 text-xs mb-3 tracking-widest">PIPELINE</div>
                          {['Ingest PDF', 'Chunk & embed', 'Vector store', 'LLM synthesise'].map((step, i) => (
                            <div key={step} className="flex items-center gap-2 text-sm mb-2.5">
                              <span className={`h-1.5 w-1.5 rounded-full ${i < 3 ? 'bg-emerald-400' : 'bg-[#4a154b]'}`} />
                              <span className={i < 3 ? 'text-white/80' : 'text-white/40'}>{step}</span>
                            </div>
                          ))}
                        </div>
                        <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">
                          <div className="text-white/50 text-xs mb-3 tracking-widest">AGENT OUTPUT</div>
                          <div className="font-mono text-sm text-white/70 leading-relaxed">
                            <span className="text-[#d9bdde]">›</span> Retrieved <span className="text-emerald-400">12 chunks</span> from vector store<br />
                            <span className="text-[#d9bdde]">›</span> Reranked by relevance · top-k=4<br />
                            <span className="text-[#d9bdde]">›</span> <span className="text-white">Summary ready</span> · 3 citations linked<br />
                            <span className="text-[#d9bdde]">›</span> Confidence <span className="text-emerald-400">0.91</span> · hallucination score <span className="text-emerald-400">low</span>
                          </div>
                          <div className="mt-5 flex gap-2 flex-wrap">
                            {['RAG', 'Vector DB', 'Anthropic', 'LangChain'].map(tag => (
                              <span key={tag} className="text-[11px] bg-[#4a154b]/60 border border-[#4a154b] text-[#d9bdde] rounded-full px-3 py-1">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="text-center mt-6 text-sm text-[#696969]">
              Click the services above to explore live interface previews.
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES — what we actually ship */}
      <section ref={statsRef} className="container section border-t border-[var(--hairline)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="card-feature-cream motion-card flex flex-col gap-5 p-7">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#4a154b]/10 text-[#4a154b]">
                {cap.icon}
              </div>
              <div>
                <div className="text-[10px] font-semibold tracking-[2.5px] text-[#4a154b] mb-1.5">{cap.title}</div>
                <div className="heading-md tracking-[-0.3px]">{cap.headline}</div>
              </div>
              <ul className="space-y-2.5 mt-1">
                {cap.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 body-md text-[#696969]">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-[#4a154b] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" ref={workRef} className="section container">
        <div data-reveal className="flex items-end justify-between mb-8">
          <div>
            <div className="pill-cap-shade mb-2">SELECTED WORK</div>
            <h3 className="display-xl tracking-[-0.5px]">Finished enough to feel real.</h3>
            <p className="body-lg text-[#696969] max-w-[54ch] mt-3">
              A tighter edit of our strongest projects, presented as clean case-study entries rather than a directory listing.
            </p>
          </div>
        </div>

        <ProjectShowcase projects={curatedShowcase} onOpen={openProject} />

        <div className="hidden">
          {projectGroups.map(group => (
            <div key={group.title}>
              <div>
                <div>
                  <div className="micro-cap text-[#4a154b] mb-2">{group.kicker}</div>
                  <h4 className="heading-lg tracking-[-0.2px]">{group.title}</h4>
                  <p className="caption text-[#696969] max-w-[62ch] mt-2">{group.desc}</p>
                </div>
                <div className="text-sm font-semibold text-[#4a154b]">{group.items.length} projects</div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {group.items.map(p => (
                  <div key={p.id} onClick={() => openProject(p)} className="work-card motion-card p-6 cursor-pointer group">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="heading-sm tracking-[-0.2px] group-hover:text-[#4a154b] transition-colors">{p.title}</div>
                        <div className="caption text-[#696969] mt-0.5">{p.client} - {p.year}</div>
                      </div>
                      <div className="rounded-full bg-[#f4ede4] px-3 py-1 text-[11px] font-semibold text-[#4a154b] whitespace-nowrap">{p.category}</div>
                    </div>
                    <div className="mt-5 text-[#696969] body-md leading-snug">{p.description}</div>
                    <div className="mt-5 text-xs font-medium tracking-wide text-[#4a154b]">{p.result}</div>
                    <div className="mt-5 pt-4 border-t border-[#e6e6e6] flex items-center text-sm text-[#4a154b] group-hover:gap-1 transition-all">
                      View details <ArrowRight size={15} className="ml-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ENGAGEMENTS / PRICING — exact card-pricing + featured */}
      <section id="engagements" ref={engagementsRef} className="section editorial-band editorial-band-lavender relative overflow-hidden">
        <div className="container">
          <div data-reveal className="text-center mb-10">
            <div className="pill-cap-shade mb-3">HOW WE PARTNER</div>
            <h2 className="display-xl tracking-[-0.4px]">Three ways to work together.</h2>
            <p className="body-lg text-[#696969] max-w-[48ch] mx-auto mt-3">Every engagement is scoped, time-boxed, and built around your goals, not ours.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1080px] mx-auto">
            {engagements.map((e, idx) => (
              <div key={idx} className={e.featured ? "card-pricing-featured motion-card" : "card-pricing motion-card"}>
                <div className={e.featured ? "text-white" : ""}>
                  <div className="text-[10px] font-semibold tracking-[2.5px] mb-2" style={{ color: e.featured ? '#d9bdde' : '#4a154b' }}>{e.scope.toUpperCase()}</div>
                  <div className="heading-lg mb-1">{e.name}</div>
                  <div className="caption" style={{ color: e.featured ? '#d9bdde' : '#696969' }}>{e.timeline}</div>
                </div>
                <p className="body-md mt-5" style={{ color: e.featured ? '#d9bdde' : '#696969' }}>{e.desc}</p>
                <ul className="space-y-2 mt-5 mb-8">
                  {e.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px]" style={{ color: e.featured ? 'rgba(255,255,255,0.85)' : '#555' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                        <path d="M3.5 8.5L6.5 11.5L12.5 5" stroke={e.featured ? '#d9bdde' : '#4a154b'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo('contact')} className={e.featured ? "button-outline-on-aubergine w-full" : "button-primary-pill w-full"}>
                  Start a conversation
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" ref={processRef} className="section container">
        <div data-reveal className="text-center mb-10">
          <div className="pill-cap-shade mb-3">HOW WE WORK</div>
          <h2 className="display-xl tracking-[-0.5px]">A clear, deliberate process.</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {process.map((step, i) => (
            <div key={i} className="card-feature-cream motion-card">
              <div className="micro-cap text-[#4a154b] mb-4">{step.num}</div>
              <div className="heading-md mb-3">{step.title}</div>
              <p className="body-md text-[#696969]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section container">
        <div data-reveal className="mb-8">
          <div className="pill-cap-shade mb-2">FROM OUR PARTNERS</div>
          <h2 className="display-xl tracking-[-0.5px]">What our clients say.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} data-reveal className="card-pricing motion-card">
              <div className="body-lg leading-snug">“{t.quote}”</div>
              <div className="mt-8 pt-5 border-t border-[#e6e6e6]">
                <div className="font-semibold">{t.name}</div>
                <div className="caption text-[#696969]">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING AUBERGINE BAND — card-aubergine-band */}
      <div data-reveal className="card-aubergine-band closing-band mt-8">
        <div className="container text-center">
          <div className="max-w-[620px] mx-auto">
            <div className="text-[15px] tracking-[1.5px] text-[#d9bdde] mb-3">READY WHEN YOU ARE</div>
            <h2 className="display-xl text-white tracking-[-0.5px] mb-5">Let’s build something<br />that will still feel right in five years.</h2>
            <button onClick={() => scrollTo('contact')} className="button-outline-on-aubergine mt-2 px-9">Speak with our team</button>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact" className="section container">
        <div data-reveal className="max-w-[860px]">
          <div className="pill-cap-shade mb-3">LET’S TALK</div>
          <h2 className="display-xl tracking-[-0.5px] mb-8">Tell us about the thing<br />you want to bring into the world.</h2>
        </div>

        <div data-reveal className="max-w-[780px]">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* honeypot — bots fill this, humans don't see it */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <div className="caption mb-1.5 text-[#696969]">YOUR NAME</div>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="text-input" placeholder="Alex Rivera" />
                  </div>
                  <div>
                    <div className="caption mb-1.5 text-[#696969]">WORK EMAIL</div>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="text-input" placeholder="you@company.com" />
                  </div>
                </div>

                <div>
                  <div className="caption mb-1.5 text-[#696969]">COMPANY OR ORGANIZATION</div>
                  <input type="text" name="company" value={formData.company} onChange={handleInputChange} required className="text-input" placeholder="Acme" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <div className="caption mb-1.5 text-[#696969]">WHAT ARE YOU BUILDING?</div>
                    <select name="service" value={formData.service} onChange={handleInputChange} className="text-input">
                      <option>Website</option>
                      <option>Mobile App</option>
                      <option>Web Platform</option>
                      <option>Multiple engagements</option>
                    </select>
                  </div>
                  <div>
                    <div className="caption mb-1.5 text-[#696969]">DESIRED TIMELINE</div>
                    <select name="timeline" value={formData.timeline} onChange={handleInputChange} className="text-input">
                      <option>1–2 weeks (Starter)</option>
                      <option>2–4 weeks (Growth)</option>
                      <option>4–8 weeks (Scale)</option>
                      <option>Not sure yet</option>
                      <option>Exploring for later</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="caption mb-1.5 text-[#696969]">TELL US MORE</div>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="text-input min-h-[118px]" placeholder="What problem are you solving? Who is it for? Any constraints or reference projects we should know about?" />
                </div>

                {submitError && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {submitError}
                  </div>
                )}
                <button type="submit" disabled={isSubmitting} className="button-primary-pill mt-2 px-10">
                  {isSubmitting ? "Sending..." : "Send inquiry"}
                </button>
                <div className="caption text-[#696969]">We reply to every serious note within a day.</div>
              </form>
            ) : (
              <div className="card-pricing text-center py-12">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#4a154b] text-white flex items-center justify-center mb-5">✓</div>
                <div className="heading-lg mb-2">Thank you. We received it.</div>
                <p className="text-[#696969]">A partner from the team will be in touch within one business day to schedule a conversation.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FOOTER — footer-aubergine */}
      <footer className="footer-aubergine mt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 text-sm">
            <div className="md:col-span-1 flex flex-col gap-4">
              <span className="text-white font-bold text-2xl tracking-[-0.5px]">JAMSAQ STUDIO</span>
              <p className="text-[#d9bdde] text-sm leading-relaxed max-w-[220px]">
                Websites, apps, and AI systems. Designed and built to last.
              </p>
              <a href="mailto:hello@jamsaq.in" className="text-white/80 text-sm hover:text-white transition-colors">hello@jamsaq.in</a>
            </div>
            <div>
              <div className="text-[#d9bdde] text-xs tracking-widest mb-3">WORK</div>
              <div className="space-y-1">
                <a href="#work">Selected projects</a><br />
                <a href="#engagements">How we partner</a><br />
                <a href="#process">Process</a>
              </div>
            </div>
            <div>
              <div className="text-[#d9bdde] text-xs tracking-widest mb-3">COMPANY</div>
              <div className="space-y-1">
                <a href="#services">What we make</a><br />
                <a href="#contact">Contact sales</a>
              </div>
            </div>
            <div>
              <div className="text-[#d9bdde] text-xs tracking-widest mb-3">LEGAL</div>
              <div className="space-y-1">
                <a href="/privacy">Privacy</a><br />
                <a href="/terms">Terms</a><br />
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">Sitemap</a><br />
                <a href="mailto:hello@jamsaq.in">hello@jamsaq.in</a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/20 text-xs text-[#d9bdde]">
            © {new Date().getFullYear()} JAMSAQ STUDIO. All rights reserved.
          </div>
        </div>
      </footer>

      {/* PROJECT MODAL — clean light modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4" onClick={closeProject}>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.985 }}
              transition={{ duration: 0.18 }}
              className="modal w-full max-w-[820px] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="pill-cap-shade mb-2">{selectedProject.category} • {selectedProject.year}</div>
                    <div className="display-md tracking-[-0.3px]">{selectedProject.title}</div>
                    <div className="text-[#696969]">{selectedProject.client}</div>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    {getProjectLogo(selectedProject.title) ? (
                      (selectedProject.title.toLowerCase().includes('tasi') || selectedProject.title.toLowerCase().includes('trust and safety india')) ? (
                        <div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] flex items-center justify-center px-3" style={{ height: '56px' }}>
                          <img src="/images/logo-tasi.png" alt="TASI logo" style={{ height: '32px', width: 'auto', display: 'block' }} />
                        </div>
                      ) : (
                        <Image src={getProjectLogo(selectedProject.title)!} alt={`${selectedProject.title} logo`} width={56} height={56} className={`h-14 w-14 object-cover ring-1 ring-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] ${selectedProject.title.toLowerCase().includes('asmita') ? 'rounded-xl' : 'rounded-2xl'}`} />
                      )
                    ) : (() => { const av = getProjectAvatar(selectedProject.title); return (
                      <div className="h-14 w-14 rounded-2xl ring-1 ring-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] flex items-center justify-center font-bold text-sm tracking-wide select-none" style={{ background: av.bg, color: av.text }}>{av.initials}</div>
                    )})()}
                    <button onClick={closeProject} className="text-xs text-[#696969] hover:text-[#1d1d1d]">Close</button>
                  </div>
                </div>

                <div className="mt-8 text-[15px]">
                  <div className="text-[#4a154b] text-xs tracking-[1px] mb-1.5">THE WORK</div>
                  <p className="leading-relaxed text-[#1d1d1d]">{selectedProject.description}</p>

                  <div className="mt-6 text-[#4a154b] text-xs tracking-[1px] mb-1.5">OUTCOME</div>
                  <div className="text-xl font-semibold text-[#4a154b]">{selectedProject.result}</div>

                  <div className="mt-6 text-sm text-[#696969]">{selectedProject.role}</div>
                </div>
              </div>

              <div className="border-t border-[#e6e6e6] px-8 md:px-10 py-6 bg-[#faf6f1] flex flex-col md:flex-row gap-3 justify-between items-center text-sm">
                {getPlayStoreLink(selectedProject.title, selectedProject.category) ? (
                  <>
                    <div className="text-[#696969]">Available now on Android</div>
                    <a
                      href={getPlayStoreLink(selectedProject.title, selectedProject.category)!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white rounded-full px-6 py-3 font-semibold text-sm transition-transform hover:scale-[1.03] shadow-[0_6px_18px_rgba(237,42,98,0.35)]"
                      style={{ background: 'linear-gradient(90deg, #ff1f6d 0%, #ff7a3d 100%)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.6 1.8c-.3.3-.5.7-.5 1.2v18c0 .5.2.9.5 1.2l.1.1L13.9 12 3.7 1.7l-.1.1z" fill="#fff" fillOpacity="0.95"/>
                        <path d="M17.5 8.4 13.9 12l3.6 3.6 4.1-2.4c.6-.3.9-.9.9-1.5s-.3-1.2-.9-1.5l-4.1-2.3z" fill="#fff" fillOpacity="0.7"/>
                        <path d="M13.9 12 3.6 22.2c.3.1.6.2.9.2.3 0 .6-.1.9-.3l8.5-4.9-4-5.2z" fill="#fff" fillOpacity="0.85"/>
                        <path d="M13.9 12 17.5 8.4 9 3.5c-.3-.2-.6-.3-.9-.3-.3 0-.6.1-.9.2L13.9 12z" fill="#fff" fillOpacity="0.85"/>
                      </svg>
                      Download on Play Store
                    </a>
                  </>
                ) : getProjectUrl(selectedProject.title, selectedProject.category) ? (
                  <>
                    <div className="text-[#696969]">Want to see it live?</div>
                    <a href={getProjectUrl(selectedProject.title, selectedProject.category)!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white rounded-full px-6 py-3 font-semibold text-sm transition-transform hover:scale-[1.03] shadow-[0_6px_18px_rgba(237,42,98,0.35)]" style={{ background: 'linear-gradient(90deg, #ff1f6d 0%, #ff7a3d 100%)' }}>Check out the site</a>
                  </>
                ) : (() => { const cat = selectedProject.category.toLowerCase(); return (cat.includes('mobile') || cat.includes('android') || cat === 'ai mobile system') && !cat.includes('web') && !cat.includes('landing') })() ? (
                  <>
                    <div className="text-[#696969]">Coming soon on Android</div>
                    <button
                      disabled
                      className="inline-flex items-center gap-2 text-white rounded-full px-6 py-3 font-semibold text-sm cursor-not-allowed shadow-[0_6px_18px_rgba(237,42,98,0.35)]"
                      style={{ background: 'linear-gradient(90deg, #ff1f6d 0%, #ff7a3d 100%)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.6 1.8c-.3.3-.5.7-.5 1.2v18c0 .5.2.9.5 1.2l.1.1L13.9 12 3.7 1.7l-.1.1z" fill="#fff" fillOpacity="0.95"/>
                        <path d="M17.5 8.4 13.9 12l3.6 3.6 4.1-2.4c.6-.3.9-.9.9-1.5s-.3-1.2-.9-1.5l-4.1-2.3z" fill="#fff" fillOpacity="0.7"/>
                        <path d="M13.9 12 3.6 22.2c.3.1.6.2.9.2.3 0 .6-.1.9-.3l8.5-4.9-4-5.2z" fill="#fff" fillOpacity="0.85"/>
                        <path d="M13.9 12 17.5 8.4 9 3.5c-.3-.2-.6-.3-.9-.3-.3 0-.6.1-.9.2L13.9 12z" fill="#fff" fillOpacity="0.85"/>
                      </svg>
                      Coming Soon on Play Store
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-[#696969]">Curious about a similar project?</div>
                    <button onClick={() => { closeProject(); setTimeout(() => scrollTo('contact'), 280) }} className="button-primary-pill px-7 text-sm">Start a conversation</button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
