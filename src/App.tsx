import { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
const projects: Project[] = [
  {
    id: 1,
    title: "Finly",
    category: "Web App",
    client: "Finly Financial",
    year: "2025",
    result: "14k businesses • Series B",
    description: "Full-featured financial operations platform with real-time ledgers, invoicing, and cash-flow forecasting.",
    role: "Design system, product architecture, full-stack delivery"
  },
  {
    id: 2,
    title: "Verve",
    category: "Website",
    client: "Verve Atelier",
    year: "2024",
    result: "3.8× conversion lift",
    description: "Luxury direct-to-consumer flagship with cinematic storytelling and frictionless commerce.",
    role: "Brand expression, Webflow architecture, performance optimization"
  },
  {
    id: 3,
    title: "Orbit",
    category: "Mobile App",
    client: "Orbit Labs",
    year: "2025",
    result: "#1 App Store • 92k MAU",
    description: "Calm, high-fidelity workspace for distributed teams with real-time sync and async video.",
    role: "React Native, product design, growth loops"
  },
  {
    id: 4,
    title: "Aether",
    category: "Web App",
    client: "Aether",
    year: "2024",
    result: "87% faster insight",
    description: "Enterprise analytics platform where natural language replaces dashboard hunting.",
    role: "Interface architecture, AI integration, enterprise rollout"
  }
]

const projectGroups = [
  {
    title: "Websites & Commerce",
    kicker: "PUBLIC DIGITAL EXPERIENCES",
    desc: "Launch-ready marketing, commerce, event, and SaaS surfaces with editorial presentation and production fundamentals.",
    items: [
      { id: 101, title: "TASI 2026 Website", category: "Website", client: "The Centre For Social Research", year: "2026", result: "Conference website", description: "Official event website covering programme, speakers, registration, sponsorship, media coverage, and event information for TASI 2026.", role: "Next.js 16, React 19, Tailwind CSS, Sanity/Supabase/Clerk integrations" },
      { id: 102, title: "Shagun Box", category: "Commerce Website", client: "Shagun Box", year: "2026", result: "Complete MVP storefront", description: "India-focused premium gifting storefront for Shadi, Nikah, Eid/Ramadan, family gifting, and corporate orders with customization, cart, checkout-style requests, and WhatsApp handoff.", role: "Next.js App Router, TypeScript, Tailwind, product filters, cart, lead capture, SEO, analytics hooks" },
      { id: 103, title: "ShaadiInvite", category: "SaaS Web App", client: "RSVP", year: "2026", result: "Active MVP build", description: "Mobile-first wedding invitation and RSVP platform for Indian families, planners, and couples with invite pages, event schedules, guest RSVPs, WhatsApp sharing, payments, privacy, galleries, and planner tooling.", role: "Next.js 14, Supabase, Razorpay, Cloudinary, Anthropic, analytics, Sentry" },
      { id: 104, title: "Jamsaq Agency Website", category: "Website", client: "Jamsaq Agency", year: "2026", result: "Launch-ready agency site", description: "Premium digital studio website with typed local content, SEO surfaces, form protection, strategy documentation, QA evidence, and deployment handoff materials.", role: "Next.js App Router, TypeScript, Tailwind, shadcn/ui, Server Actions, Zod, QA and launch documentation" },
      { id: 105, title: "Let's Love Landing Page", category: "Landing Page", client: "Let's Love", year: "2026", result: "Early access funnel", description: "Public signup site for the Let's Love mobile app, connected to Google Forms, optional Resend email, tester group links, voucher issuing, and production domain settings.", role: "Next.js, React, GSAP, Lenis, Three.js, server action signup flow" },
    ] as Project[],
  },
  {
    title: "Mobile Apps",
    kicker: "NATIVE PRODUCT SYSTEMS",
    desc: "Android and Expo products with real user flows, persistence, notifications, privacy controls, and release paths.",
    items: [
      { id: 201, title: "Let's Love", category: "Mobile App", client: "JAMSAQ STUDIO", year: "2026", result: "Android v1.2.37", description: "Private couple space for chat, memories, goals, todos, date ideas, calendar moments, daily quotes, pings, streaks, app lock, subscriptions, and Play Store release workflows.", role: "Expo SDK 54, React Native 0.81, Firebase Auth/Firestore/Storage/Functions/FCM, RevenueCat, Zustand" },
      { id: 202, title: "TASI 2026 App", category: "Mobile App", client: "The Centre For Social Research", year: "2026", result: "Expo app v1.0.4", description: "Conference companion app with dark visual system, authentication, event data surfaces, camera permissions for QR check-in, notifications, media/profile support, and OTA updates.", role: "Expo, React Native, Clerk Expo, Firebase, Supabase, Sanity, Sentry, React Query" },
      { id: 203, title: "AI Note Researcher", category: "Android App", client: "Internal Product Lab", year: "2026", result: "MVP alpha/private beta", description: "Local-first Kotlin app that turns rough notes, shopping research, grocery lists, books, and app ideas into structured decision cards with citations, provenance, privacy controls, search, and export.", role: "Kotlin, Jetpack Compose, Room, WorkManager, FTS search, privacy controls, local template generation" },
      { id: 204, title: "Draft Habit", category: "Android App", client: "Creator Tools", year: "2026", result: "Creator execution assistant", description: "Solo creator app that turns social media uncertainty into daily content briefs, hooks, captions, tool recommendations, idea banks, templates, repurposing, and lightweight pipeline tracking.", role: "Kotlin Android, native Android Views, Room persistence, local reminders, backend scaffold" },
      { id: 205, title: "Hadith of the Day", category: "Android App", client: "Faith Product", year: "2026", result: "Local app and backend foundation", description: "Calm, source-forward hadith reading app with a vertical reflection feed, saved notes, collections, source-linked corpus, reminders, widget, sharing, and reviewed remote corpus contracts.", role: "Kotlin Android, backend contracts, validation tooling, provider policy, Firebase Functions emulator checks" },
      { id: 206, title: "Time Twist", category: "AI Mobile System", client: "Productivity Lab", year: "2026", result: "AI life audit MVP foundation", description: "Android-first life audit app that maps a real 24-hour routine, detects time waste and hidden opportunity, then helps redesign tomorrow around goals, energy, relationships, work, health, and recovery.", role: "Kotlin Compose, Material 3, Room/DataStore-oriented models, TypeScript backend, PostgreSQL, OpenAPI, prompts, schemas, evals" },
    ] as Project[],
  },
  {
    title: "Systems & Documentation",
    kicker: "OPERATIONS, SAFETY, HANDOVER",
    desc: "Sensitive workflows, client handovers, automation, and documentation-heavy systems built with reviewability in mind.",
    items: [
      { id: 301, title: "Asmita", category: "Safety System", client: "Open-source safety project", year: "2026", result: "Privacy-preserving NCII workflow", description: "Survivor-led URL takedown and notice-routing system for documenting abuse, generating reviewed notice packages, tracking escalation, and preserving audit trails without fetching or storing intimate media.", role: "Next.js, Prisma, safety architecture, notice templates, audit trails, admin review gates, policy documentation" },
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
    client: "The Centre For Social Research",
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
    client: "The Centre For Social Research",
    year: "2026",
    result: "Expo app v1.0.4",
    description: "Conference companion app with authentication, event data, dark visual system, camera permissions for QR check-in, notifications, media/profile support, and OTA updates.",
    role: "Expo, React Native, Clerk Expo, Firebase, Supabase, Sanity, Sentry, React Query",
    visual: "darkPhone",
    tone: "Mobile conference companion designed for on-site utility, attendee identity, and live operational moments.",
  },
  {
    id: 405,
    title: "Jamsaq Agency Website",
    category: "Agency Website",
    client: "Jamsaq Agency",
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
  { id: 501, title: "Asmita", category: "Web App", client: "Open-source safety project", year: "2026", result: "Privacy-preserving NCII workflow", description: "Survivor-led URL takedown and notice-routing system for documenting abuse, generating reviewed notice packages, tracking escalation, and preserving audit trails without fetching or storing intimate media.", role: "Next.js, Prisma, safety architecture, notice templates, audit trails, admin review gates, policy documentation", type: "site" },
  { id: 502, title: "Let's Love", category: "Mobile App", client: "JAMSAQ STUDIO", year: "2026", result: "Android v1.2.37", description: "Private couple space for chat, memories, goals, todos, date ideas, shared calendar moments, daily quotes, pings, streaks, app lock, subscriptions, and Play Store release workflows.", role: "Expo SDK 54, React Native 0.81, Firebase, Cloud Functions, FCM, RevenueCat, Zustand", type: "app" },
  { id: 503, title: "Draft Habit", category: "Android App", client: "Creator Tools", year: "2026", result: "Creator execution assistant", description: "Solo creator app that turns social media uncertainty into daily content briefs, hooks, captions, tool recommendations, idea banks, templates, repurposing, and lightweight pipeline tracking.", role: "Kotlin Android, native Android Views, Room persistence, local reminders, backend scaffold", type: "app" },
  { id: 504, title: "Hadith of the Day", category: "Android App", client: "Faith Product", year: "2026", result: "Local app and backend foundation", description: "Calm, source-forward hadith reading app with a vertical reflection feed, saved notes, collections, source-linked corpus, reminders, widget, sharing, and reviewed remote corpus contracts.", role: "Kotlin Android, backend contracts, validation tooling, provider policy, Firebase Functions emulator checks", type: "app" },
  { id: 505, title: "Let's Love Landing Page", category: "Landing Page", client: "Let's Love", year: "2026", result: "Early access funnel", description: "Public signup site for the Let's Love mobile app, connected to Google Forms, optional Resend email, tester group links, voucher issuing, and production domain settings.", role: "Next.js, React, GSAP, Lenis, Three.js, server action signup flow", type: "site" },
  { id: 506, title: "ShaadiInvite", category: "SaaS Web App", client: "RSVP", year: "2026", result: "Active MVP build", description: "Mobile-first wedding invitation and RSVP platform for Indian families, planners, and couples with invite pages, event schedules, guest RSVPs, WhatsApp sharing, payments, privacy, galleries, and planner tooling.", role: "Next.js 14, Supabase, Razorpay, Cloudinary, Anthropic, analytics, Sentry", type: "site" },
  { id: 507, title: "Shagun Box", category: "Commerce Website", client: "Shagun Box", year: "2026", result: "Complete MVP storefront", description: "Premium India-first gifting storefront for Shadi, Nikah, Eid/Ramadan, family gifting, and corporate orders with cart, customization, and WhatsApp-assisted checkout.", role: "Next.js App Router, TypeScript, Tailwind, product filters, cart, lead capture, SEO, analytics hooks", type: "site" },
  { id: 508, title: "TASI 2026 Website", category: "Conference Website", client: "The Centre For Social Research", year: "2026", result: "Official conference platform", description: "A polished event website for programme discovery, speaker profiles, registration, sponsors, media coverage, and conference information.", role: "Next.js 16, React 19, Tailwind, Sanity, Supabase, Clerk, Sentry", type: "site" },
  { id: 509, title: "TASI 2026 App", category: "Mobile App", client: "The Centre For Social Research", year: "2026", result: "Expo app v1.0.4", description: "Conference companion app with authentication, event data, dark visual system, camera permissions for QR check-in, notifications, media/profile support, and OTA updates.", role: "Expo, React Native, Clerk Expo, Firebase, Supabase, Sanity, Sentry, React Query", type: "app" },
  { id: 510, title: "Time Twist", category: "AI Mobile System", client: "Productivity Lab", year: "2026", result: "AI life audit MVP foundation", description: "Android-first life audit app that maps a real 24-hour routine, detects time waste and hidden opportunity, then helps redesign tomorrow around goals, energy, relationships, work, health, and recovery.", role: "Kotlin Compose, Material 3, Room/DataStore-oriented models, TypeScript backend, PostgreSQL, OpenAPI, prompts, schemas, evals", type: "app" },
] satisfies Array<Project & { type: 'site' | 'app' }>

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
    title: "Web Platforms",
    desc: "Complex, scalable internal tools and customer-facing platforms that teams actually enjoy using.",
    points: ["Dashboards & command centers", "SaaS and collaboration products", "Operations & admin tooling", "Integrations & data layers"]
  }
]

const stats = [
  { number: "127", label: "Projects delivered" },
  { number: "68", label: "Clients across 19 countries" },
  { number: "4.9", label: "Average client rating" }
]

const engagements = [
  {
    name: "Website Launch",
    price: "From $28,000",
    desc: "Brand expression, high-performance marketing site, CMS, and launch support.",
    timeline: "6–9 weeks",
    featured: false
  },
  {
    name: "Signature Partnership",
    price: "From $85,000",
    desc: "Full product engagement: discovery, design system, core experience, and first release.",
    timeline: "10–16 weeks",
    featured: true
  },
  {
    name: "Platform Build",
    price: "From $145,000",
    desc: "Complex web or mobile platform with real-time collaboration, integrations, and scale.",
    timeline: "14–22 weeks",
    featured: false
  }
]

const process = [
  { num: "01", title: "Discover", desc: "Deep listening. User research, constraints, ambition. We align before we design." },
  { num: "02", title: "Design", desc: "High-fidelity prototypes, interaction systems, and a living design language you can feel." },
  { num: "03", title: "Build", desc: "Production-grade, type-safe work with weekly demos and zero theatre at handoff." },
  { num: "04", title: "Launch & Care", desc: "Careful deployment, training, and an ongoing relationship. We stay close." }
]

const testimonials = [
  { quote: "They elevated the entire vision. Every interaction felt thoughtful and world-class.", name: "Maya Patel", role: "CEO, Aether" },
  { quote: "The best piece of software our team has ever shipped. Their rigor is unmatched.", name: "James Okoro", role: "Founder, Orbit Labs" },
  { quote: "Fast, beautiful, and it converts. The single best decision in our rebrand.", name: "Clara Voss", role: "Head of Digital, Verve" }
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

function StoneReveal({ side }: { side: 'left' | 'right' }) {
  const x = useMotionValue(140)
  const y = useMotionValue(160)
  const radiusRaw = useMotionValue(0)
  const radius = useSpring(radiusRaw, { stiffness: 200, damping: 25 })
  const mask = useTransform([radius, x, y], ([r, mx, my]) => (
    `radial-gradient(circle ${r}px at ${mx}px ${my}px, black 0%, black 40%, transparent 100%)`
  ))
  const isLeft = side === 'left'
  const base = isLeft
    ? 'https://qclay.design/lovable/synex/stone-left.png'
    : 'https://qclay.design/lovable/synex/stone-right.png'
  const grass = isLeft
    ? 'https://qclay.design/lovable/synex/stone-g-left.png'
    : 'https://qclay.design/lovable/synex/stone-g-right.png'

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => radiusRaw.set(120)}
      onMouseLeave={() => radiusRaw.set(0)}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        x.set(event.clientX - rect.left)
        y.set(event.clientY - rect.top)
      }}
      className={`absolute bottom-0 ${isLeft ? 'left-0 z-[1]' : 'right-0 z-[4]'} h-[260px] w-fit cursor-crosshair sm:h-[360px] md:h-[480px] lg:h-[580px] xl:h-[650px]`}
    >
      <img src={base} alt="" className={`h-full w-auto object-contain ${isLeft ? 'object-left-bottom' : 'object-right-bottom'}`} />
      <motion.img
        src={grass}
        alt=""
        className={`pointer-events-none absolute inset-0 h-full w-auto object-contain ${isLeft ? 'object-left-bottom' : 'object-right-bottom'}`}
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      />
    </motion.div>
  )
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
    name: '', email: '', company: '', service: 'Website', timeline: '3–6 months', message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)

  // Refs for Lenis and scroll animations
  const lenisRef = useRef<Lenis | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const mockup1Ref = useRef<HTMLDivElement>(null)
  const mockup2Ref = useRef<HTMLDivElement>(null)
  const mockup3Ref = useRef<HTMLDivElement>(null)

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

      // --- STATS: Count-up + light parallax on the stat cards ---
      if (statsRef.current) {
        const numbers = statsRef.current.querySelectorAll('.number')
        const statValues = [127, 68, 4.9]

        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            numbers.forEach((el, i) => {
              const target = statValues[i]
              const isDecimal = target % 1 !== 0
              const obj = { val: 0 }

              gsap.to(obj, {
                val: target,
                duration: isDecimal ? 1.8 : 1.65,
                ease: 'power2.out',
                onUpdate: () => {
                  const htmlEl = el as HTMLElement
                  if (isDecimal) {
                    htmlEl.textContent = obj.val.toFixed(1)
                  } else {
                    htmlEl.textContent = Math.round(obj.val).toString()
                  }
                },
              })
            })
          },
        })

        // Gentle parallax on the stat cards themselves
        const statCards = statsRef.current.querySelectorAll('.card-stat')
        statCards.forEach((card, i) => {
          gsap.to(card, {
            y: i === 1 ? -18 : -10,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 70%',
              end: 'bottom top',
              scrub: 1.2,
            },
          })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 950))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', company: '', service: 'Website', timeline: '3–6 months', message: '' })
    }, 3800)
  }

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink)] selection:bg-[#4a154b] selection:text-white font-sans">
      {/* NAV — nav-bar-light */}
      <nav className="nav-bar-light fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between gap-5">
          <div onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-6 h-6 rounded bg-[#4a154b] flex items-center justify-center">
              <span className="text-white text-[13px] font-bold tracking-[-0.5px]">J</span>
            </div>
            <span className="font-semibold tracking-[-0.3px] text-[21px] text-[#4a154b]">jamsaq</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 text-sm">
            <button onClick={() => scrollTo('work')} className="nav-link">Work</button>
            <button onClick={() => scrollTo('engagements')} className="nav-link">Engagements</button>
            <button onClick={() => scrollTo('process')} className="nav-link">Process</button>
          </div>

          <div className="hidden md:flex shrink-0 items-center gap-3">
            <button onClick={() => scrollTo('contact')} className="button-secondary-pill text-sm">Talk to us</button>
            <button onClick={() => scrollTo('contact')} className="button-primary-pill text-sm">Start a project</button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 md:hidden" aria-label="Menu">
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
                <button onClick={() => scrollTo('contact')} className="button-secondary-pill w-full justify-center">Talk to us</button>
                <button onClick={() => scrollTo('contact')} className="button-primary-pill w-full justify-center">Start a project</button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO — pastel mesh + floating mockups with parallax */}
      <section id="hero" ref={heroRef} className="hero relative min-h-screen overflow-hidden bg-[#f2f2f0] px-5 pt-[96px] text-center sm:pt-[118px] md:pt-[140px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(220,220,215,0.6),transparent_70%)]" />
        <div className="hero-text relative z-10 mx-auto flex max-w-[820px] flex-col items-center">
          <motion.div custom={{ offset: 16, blur: 8, delay: 0.1, duration: 0.6 }} initial="hidden" animate="visible" variants={textReveal} className="mb-3 text-xs font-medium text-black/50 sm:mb-4 sm:text-[13px] md:text-sm">
            DIGITAL PRODUCTS, CAREFULLY MADE
          </motion.div>
          <h1 className="text-[34px] font-medium leading-[1.05] tracking-[-1.36px] sm:text-[44px] md:text-[56px] lg:text-[68px]">
            <motion.span custom={{ offset: 24, blur: 12, delay: 0.2 }} initial="hidden" animate="visible" variants={textReveal} className="block text-black/20">A New Standard</motion.span>
            <motion.span custom={{ offset: 24, blur: 12, delay: 0.32 }} initial="hidden" animate="visible" variants={textReveal} className="block text-[#05050c]">for Digital Craft</motion.span>
          </h1>
          <motion.p custom={{ offset: 20, blur: 8, delay: 0.45 }} initial="hidden" animate="visible" variants={textReveal} className="mt-4 max-w-[460px] text-sm font-medium leading-relaxed text-black/20 sm:text-base md:mt-5 md:text-lg">
            Jamsaq builds websites, mobile apps, and web platforms with premium motion, precise interfaces, and production-grade engineering.
          </motion.p>
          <motion.div custom={{ offset: 18, blur: 8, delay: 0.58 }} initial="hidden" animate="visible" variants={textReveal} className="mt-7 flex flex-wrap justify-center gap-3">
            <button onClick={() => scrollTo('work')} className="button-primary-pill !bg-[#111] hover:!bg-[#333]">See our work</button>
            <button onClick={() => scrollTo('contact')} className="button-secondary-pill">Begin a conversation</button>
          </motion.div>
        </div>

        <StoneReveal side="left" />
        <StoneReveal side="right" />

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
          <motion.img
            src="https://qclay.design/lovable/synex/star.svg"
            alt=""
            className="h-3.5 w-3.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          Scroll to explore
        </motion.button>
      </section>

      <section className="hidden">
        <div className="container">
          <div className="hero-text max-w-[720px]">
            <div className="pill-cap-shade mb-4">EST. 2019 • NEW YORK • LONDON</div>

            <h1 className="display-xxl tracking-[-0.768px] leading-none mb-6">
              We craft digital<br />products of lasting quality.
            </h1>

            <p className="body-lg text-[#696969] max-w-[42ch] mb-9">
              Jamsaq partners with ambitious teams to build websites, mobile apps, and web platforms that feel considered at every level.
            </p>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo('work')} className="button-primary-pill">See our work</button>
              <button onClick={() => scrollTo('contact')} className="button-secondary-pill">Begin a conversation</button>
            </div>
          </div>

          {/* Floating product UI mockups */}
          <div className="mt-14 md:mt-6 relative min-h-[260px] md:min-h-[320px] flex items-end justify-center gap-6 flex-wrap">
            <div ref={mockup1Ref} className="mockup mockup-browser w-full max-w-[420px] shadow-[0_0_32px_rgba(0,0,0,0.1)]">
              <div className="mockup-header">
                <div className="mockup-dot" style={{ background: '#f55' }} />
                <div className="mockup-dot" style={{ background: '#fc5' }} />
                <div className="mockup-dot" style={{ background: '#5c5' }} />
              </div>
              <div className="mockup-content text-[11px]">
                <div className="h-2 w-16 bg-[#4a154b] rounded mb-3" />
                <div className="text-[13px] font-semibold tracking-[-0.2px] mb-1">A new way to see your numbers.</div>
                <div className="text-[#696969] text-[10px] mb-3 leading-snug">Beautiful financial clarity for teams that move fast.</div>
                <div className="flex gap-2">
                  <div className="button-primary-pill text-[11px] px-4 py-1" style={{ fontSize: '11px', padding: '6px 14px' }}>Start free trial</div>
                  <div className="button-secondary-pill text-[11px] px-4 py-1" style={{ fontSize: '11px', padding: '6px 14px' }}>Watch 1:42</div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-[9px]">
                  <div className="bg-[#f4ede4] rounded p-2">+34% MRR</div>
                  <div className="bg-[#f4ede4] rounded p-2">92 NPS</div>
                  <div className="bg-[#f4ede4] rounded p-2">12s load</div>
                </div>
              </div>
            </div>
            <div ref={mockup2Ref} className="mockup-phone w-[148px] text-[9.5px]">
              <div className="mockup-header" />
              <div className="mockup-content">
                <div className="font-semibold tracking-tight mb-2">Today</div>
                <div className="space-y-2">
                  <div className="bg-[#f9f0ff] rounded-xl p-2.5">
                    <div className="font-medium">Design sync</div>
                    <div className="text-[#696969] text-[9px]">10:30 • 4 attendees</div>
                  </div>
                  <div className="bg-[#f9f0ff] rounded-xl p-2.5">
                    <div className="font-medium">Launch checklist</div>
                    <div className="text-[#696969] text-[9px]">14 items • 3 left</div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <div className="button-primary-pill mx-auto" style={{ fontSize: '10px', padding: '5px 16px' }}>New update</div>
                </div>
              </div>
            </div>
            <div ref={mockup3Ref} className="mockup w-full max-w-[380px] text-[10px]">
              <div className="flex border-b border-[#e6e6e6] bg-[#faf6f1]">
                <div className="px-3 py-1.5 text-[#4a154b] font-medium border-b-2 border-[#4a154b]">Overview</div>
                <div className="px-3 py-1.5 text-[#696969]">Teams</div>
                <div className="px-3 py-1.5 text-[#696969]">Insights</div>
              </div>
              <div className="p-3 bg-white">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <div className="text-[11px] text-[#696969]">Active this week</div>
                    <div className="display-md" style={{ fontSize: '22px', letterSpacing: '-0.4px' }}>2,481</div>
                  </div>
                  <div className="text-right text-[10px] text-[#007a5a]">+18%</div>
                </div>
                <div className="h-1.5 bg-[#f4ede4] rounded mb-4">
                  <div className="h-1.5 w-[78%] bg-[#4a154b] rounded" />
                </div>
                <div className="text-[9px] text-[#696969]">Highest adoption in Product and Growth teams.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — card-feature-cream */}
      <section id="services" className="section editorial-band relative overflow-hidden">
        <div className="container">
          <div data-reveal className="text-center mb-10">
            <div className="pill-cap-shade mb-3">WHAT WE MAKE</div>
            <h2 className="display-xl tracking-[-0.5px]">Three kinds of work.<br />One standard of care.</h2>
            <p className="body-lg text-[#696969] max-w-[42ch] mx-auto mt-4">
              Every project receives the same obsessive attention to craft, motion, and user delight — whether it's a marketing site, a mobile product, or a complex platform.
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
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors ${
                    activeServiceIndex === index ? 'bg-white' : 'bg-[#4a154b] group-hover:bg-[#4a154b]'
                  }`} />
                  <div>
                    <div className="font-semibold tracking-tight text-lg">{service.title}</div>
                    <div className={`text-sm mt-0.5 ${activeServiceIndex === index ? 'text-[#d9bdde]' : 'text-[#696969]'}`}>
                      {index === 0 && "Stunning digital experiences"}
                      {index === 1 && "Native-quality on every device"}
                      {index === 2 && "Complex systems that feel simple"}
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
                            <div className="font-semibold">98 Lighthouse</div>
                          </div>
                          <div className="bg-[#f4ede4] p-4 rounded-xl">
                            <div className="text-[#4a154b] text-xs tracking-widest mb-1">CONVERSION</div>
                            <div className="font-semibold">+3.4× average lift</div>
                          </div>
                          <div className="bg-[#f4ede4] p-4 rounded-xl">
                            <div className="text-[#4a154b] text-xs tracking-widest mb-1">ENGAGEMENT</div>
                            <div className="font-semibold">42% longer sessions</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeServiceIndex === 1 && (
                    /* Mobile Apps Preview — Clean, attractive phone frame using your provided UI image */
                    <div className="flex justify-center">
                      <div 
                        className="w-[270px] bg-[#111] rounded-[3.25rem] p-[6px] shadow-2xl"
                        style={{ boxShadow: '0 25px 70px -10px rgb(0 0 0 / 0.35), 0 8px 25px -8px rgb(0 0 0 / 0.2)' }}
                      >
                        {/* Thin black bezel */}
                        <div className="bg-black rounded-[2.75rem] overflow-hidden p-[3px]">
                          {/* 
                            IMPORTANT: Save the mobile UI image you attached as: 
                            public/mobile-app-ui.jpg 
                            (or update the src below if you put it elsewhere)
                          */}
                          {/* 
                            === PLACE THE ATTACHED IMAGE HERE ===
                            Save the image from the chat as:
                            public/images/mobile-app-ui.jpg
                            (Create the 'images' folder inside 'public' if needed)
                            Then it will load at /images/mobile-app-ui.jpg
                          */}
                          <img 
                            src="/images/mobile-app-ui.jpg" 
                            alt="Mobile app UI screen — example of the polished, modern mobile experiences we deliver"
                            className="w-full rounded-[2.4rem] block"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeServiceIndex === 2 && (
                    /* Web Platforms Preview - Dashboard Style */
                    <div className="bg-white border border-[#e6e6e6] rounded-3xl p-6 max-w-[820px] mx-auto shadow-xl">
                      <div className="flex justify-between items-center mb-6 px-2">
                        <div>
                          <div className="text-xs tracking-[2px] text-[#4a154b]">AETHER ANALYTICS</div>
                          <div className="text-2xl font-semibold tracking-tight">Platform overview</div>
                        </div>
                        <div className="button-secondary-pill text-xs py-1.5 px-5">Export report</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#f4ede4] rounded-2xl p-5">
                          <div className="text-[#696969] text-sm mb-1">Monthly active</div>
                          <div className="text-5xl font-semibold text-[#4a154b] tracking-tighter">14.8k</div>
                          <div className="text-emerald-600 text-sm mt-1">+27% from last month</div>
                        </div>
                        <div className="md:col-span-2 bg-[#f9f0ff] rounded-2xl p-5">
                          <div className="text-[#696969] text-sm mb-3">Team health</div>
                          <div className="flex items-end gap-3">
                            <div className="text-6xl font-semibold text-[#4a154b] leading-none tracking-[-2px]">94</div>
                            <div className="text-sm text-[#696969] pb-1">/ 100</div>
                          </div>
                          <div className="mt-4 h-1.5 bg-white/70 rounded-full overflow-hidden">
                            <div className="h-1.5 w-[94%] bg-[#4a154b] rounded-full" />
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

      {/* STATS — card-stat with massive aubergine display + scroll count-up + parallax */}
      <section ref={statsRef} className="container section border-t border-[var(--hairline)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} data-reveal className="card-stat motion-card flex flex-col justify-center">
              <div className="number">{stat.number}</div>
              <div className="caption text-[#696969] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" ref={workRef} className="section container">
        <div data-reveal className="flex items-end justify-between mb-8">
          <div>
            <div className="pill-cap-shade mb-2">SELECTED NEAR-LAUNCH WORK</div>
            <h3 className="display-xl tracking-[-0.5px]">Finished enough to feel real.</h3>
            <p className="body-lg text-[#696969] max-w-[54ch] mt-3">
              A tighter edit of the strongest projects in your workspace, presented as clean case-study entries rather than a directory listing.
            </p>
          </div>
          <button onClick={() => scrollTo('contact')} className="hidden md:block button-secondary-pill text-sm">Start your own</button>
        </div>

        <div className="clean-showcase space-y-14">
          {[
            { title: "Sites", desc: "Websites, storefronts, and SaaS products with strong launch surfaces.", items: showcasedSites },
            { title: "Apps", desc: "Mobile and Android-first products with real product loops and release foundations.", items: showcasedApps },
          ].map(section => (
            <div key={section.title} data-reveal>
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="micro-cap text-[#4a154b] mb-2">{section.title === 'Sites' ? 'WEBSITES & WEB APPS' : 'MOBILE PRODUCTS'}</div>
                  <h4 className="display-md tracking-[-0.3px]">{section.title}</h4>
                  <p className="caption text-[#696969] max-w-[56ch] mt-2">{section.desc}</p>
                </div>
                <div className="text-sm font-semibold text-[#4a154b]">{section.items.length} projects</div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {section.items.map(p => (
                  <button key={p.id} onClick={() => openProject(p)} className="portfolio-row motion-card text-left">
                    <div className="portfolio-row-top">
                      <div>
                        <div className="heading-md tracking-[-0.2px]">{p.title}</div>
                        <div className="caption text-[#696969] mt-1">{p.client} - {p.year}</div>
                      </div>
                      <span className="portfolio-pill">{p.category}</span>
                    </div>
                    <p className="body-md text-[#696969] mt-5">{p.description}</p>
                    <div className="portfolio-meta">
                      <span>{p.result}</span>
                      <span className="inline-flex items-center">Details <ArrowRight size={15} className="ml-1.5" /></span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

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
          {projects.map(p => (
            <div key={p.id} onClick={() => openProject(p)} className="work-card motion-card p-7 cursor-pointer group">
              <div className="flex justify-between items-start">
                <div>
                  <div className="heading-lg tracking-[-0.2px] group-hover:text-[#4a154b] transition-colors">{p.title}</div>
                  <div className="caption text-[#696969] mt-0.5">{p.client} — {p.year}</div>
                </div>
                <div className="text-right text-xs text-[#4a154b] font-medium tracking-wide">{p.result}</div>
              </div>
              <div className="mt-6 text-[#696969] body-md leading-snug">{p.description}</div>
              <div className="mt-6 pt-4 border-t border-[#e6e6e6] flex items-center text-sm text-[#4a154b] group-hover:gap-1 transition-all">
                View details <ArrowRight size={15} className="ml-1.5" />
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
            <h2 className="display-xl tracking-[-0.4px]">Clear starting points.<br />Generous scope.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1080px] mx-auto">
            {engagements.map((e, idx) => (
              <div key={idx} className={e.featured ? "card-pricing-featured motion-card" : "card-pricing motion-card"}>
                <div className="micro-cap mb-3 opacity-70">STARTING AT</div>
                <div className={e.featured ? "text-white" : ""}>
                  <div className="heading-lg mb-1">{e.name}</div>
                  <div className="display-md mb-1" style={{ color: e.featured ? '#fff' : '#4a154b' }}>{e.price}</div>
                  <div className="caption mb-6" style={{ color: e.featured ? '#d9bdde' : '#696969' }}>{e.timeline}</div>
                </div>
                <p className="body-md mb-8" style={{ color: e.featured ? '#d9bdde' : '#696969' }}>{e.desc}</p>
                <button onClick={() => scrollTo('contact')} className={e.featured ? "button-outline-on-aubergine w-full" : "button-primary-pill w-full"}>
                  Begin this engagement
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
                      <option>Within 3 months</option>
                      <option>3–6 months</option>
                      <option>6–9 months</option>
                      <option>Exploring for later</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="caption mb-1.5 text-[#696969]">TELL US MORE</div>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="text-input min-h-[118px]" placeholder="What problem are you solving? Who is it for? Any constraints or reference projects we should know about?" />
                </div>

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
          <div className="flex items-center gap-2 mb-8">
            <div className="w-5 h-5 rounded bg-white/90 flex items-center justify-center">
              <span className="text-[#4a154b] font-bold text-xs">J</span>
            </div>
            <span className="font-semibold tracking-tight">jamsaq</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 text-sm">
            <div>
              <div className="text-[#d9bdde] text-xs tracking-widest mb-3">STUDIO</div>
              <div>New York<br />London<br />Remote-first</div>
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
                <a href="#">Privacy</a><br />
                <a href="#">Terms</a><br />
                <a href="mailto:hello@jamsaq.com">hello@jamsaq.com</a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/20 text-xs text-[#d9bdde]">
            © {new Date().getFullYear()} Jamsaq Inc. All rights reserved.
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
                  <button onClick={closeProject} className="text-[#696969] hover:text-[#1d1d1d] p-1">Close</button>
                </div>

                <div className="mt-8 grid md:grid-cols-5 gap-x-8 text-[15px]">
                  <div className="md:col-span-3">
                    <div className="text-[#4a154b] text-xs tracking-[1px] mb-1.5">THE WORK</div>
                    <p className="leading-relaxed text-[#1d1d1d]">{selectedProject.description}</p>
                    <div className="mt-6 text-sm text-[#696969]">{selectedProject.role}</div>
                  </div>
                  <div className="md:col-span-2 mt-6 md:mt-0">
                    <div className="text-[#4a154b] text-xs tracking-[1px] mb-2">OUTCOME</div>
                    <div className="text-xl font-semibold text-[#4a154b]">{selectedProject.result}</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#e6e6e6] px-8 md:px-10 py-6 bg-[#faf6f1] flex flex-col md:flex-row gap-3 justify-between items-center text-sm">
                <div className="text-[#696969]">Curious about a similar project?</div>
                <button onClick={() => { closeProject(); setTimeout(() => scrollTo('contact'), 280) }} className="button-primary-pill px-7 text-sm">Start a conversation</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
