'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Project } from '../content'

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProjectShowcaseProps {
  projects: Project[]
  onOpen: (p: Project) => void
}

// ─── Tilt Card Wrapper ────────────────────────────────────────────────────────

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), { stiffness: 300, damping: 30 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, perspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Mini Landing Page Previews ───────────────────────────────────────────────

function TASIWebsitePreview({ hovered }: { hovered: boolean }) {
  return <ScrollingScreenshot src="/images/tasi-fullpage.webp" alt="TASI 2026 landing page" hovered={hovered} bg="#6b0f1a" />
}

function ShagunBoxPreview({ hovered }: { hovered: boolean }) {
  return (
    <div className="relative w-full h-full bg-[#fdf6ee] overflow-hidden select-none">
      <motion.div animate={{ opacity: hovered ? 0.5 : 0.25 }} transition={{ duration: 0.5 }}
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#c2410c] blur-3xl" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 text-center gap-2">
        <motion.div animate={{ opacity: hovered ? 1 : 0.6, y: hovered ? 0 : 4 }} transition={{ duration: 0.4 }}
          className="text-[8px] tracking-[2px] text-[#9a3412] font-semibold">PREMIUM GIFTING</motion.div>
        <motion.div animate={{ opacity: hovered ? 1 : 0.85, y: hovered ? 0 : 5 }} transition={{ duration: 0.45, delay: 0.05 }}
          className="text-[19px] font-bold text-[#431407] leading-tight tracking-tight">Shagun Box</motion.div>
        <motion.div animate={{ opacity: hovered ? 0.7 : 0.4, y: hovered ? 0 : 7 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[8.5px] text-[#78350f] max-w-[180px] leading-relaxed">Shadi · Nikah · Eid · Ramadan · Corporate</motion.div>
        {/* Gift box illustration */}
        <motion.div animate={{ opacity: hovered ? 1 : 0.6, y: hovered ? -2 : 2, scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
          className="my-2 relative">
          <div className="w-12 h-10 bg-[#7c2d12] rounded-sm relative mx-auto">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-2 bg-[#9a3412] rounded-sm" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-[#fbbf24]/50" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-[#fbbf24]/50" />
          </div>
        </motion.div>
        <motion.div animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }} transition={{ duration: 0.4, delay: 0.2 }}
          className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-[#7c2d12] text-white text-[8px] font-semibold">Shop Now</span>
          <span className="px-3 py-1 rounded-full border border-[#7c2d12]/30 text-[#7c2d12] text-[8px]">WhatsApp Order</span>
        </motion.div>
      </div>
    </div>
  )
}

function ShaadiInvitePreview({ hovered }: { hovered: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden select-none"
      style={{ background: 'linear-gradient(135deg,#fce7f3 0%,#fff1f2 50%,#fdf4ff 100%)' }}>
      <motion.div animate={{ opacity: hovered ? 0.4 : 0.15 }} transition={{ duration: 0.5 }}
        className="absolute top-4 right-4 w-32 h-32 rounded-full bg-[#f472b6] blur-3xl" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 text-center gap-2">
        {/* Ornament */}
        <motion.div animate={{ rotate: hovered ? 180 : 0, scale: hovered ? 1.1 : 1 }} transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="text-[#d4a0c0] text-lg leading-none">✦</motion.div>
        <motion.div animate={{ opacity: hovered ? 1 : 0.6, y: hovered ? 0 : 4 }} transition={{ duration: 0.4 }}
          className="text-[8px] tracking-[2px] text-[#be185d] font-semibold">WEDDING INVITATIONS & RSVP</motion.div>
        <motion.div animate={{ opacity: hovered ? 1 : 0.85, y: hovered ? 0 : 5 }} transition={{ duration: 0.45, delay: 0.05 }}
          className="text-[18px] font-bold text-[#831843] leading-tight" style={{ fontFamily: 'Georgia, serif' }}>ShaadiInvite</motion.div>
        <motion.div animate={{ opacity: hovered ? 0.7 : 0.4, y: hovered ? 0 : 7 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[8.5px] text-[#9d174d] max-w-[180px] leading-relaxed">Beautiful digital invitations for Indian weddings</motion.div>
        <motion.div animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }} transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-1 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-[#be185d] text-white text-[8px] font-semibold">Create Invite</span>
          <span className="px-3 py-1 rounded-full border border-[#be185d]/30 text-[#be185d] text-[8px]">See Examples</span>
        </motion.div>
      </div>
    </div>
  )
}

function JamsaqWebsitePreview({ hovered }: { hovered: boolean }) {
  return (
    <div className="relative w-full h-full bg-[#f2f2f0] overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(74,21,75,0.1),transparent_70%)]" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 text-center gap-2">
        <motion.div animate={{ opacity: hovered ? 1 : 0.5, y: hovered ? 0 : 4 }} transition={{ duration: 0.4 }}
          className="text-[8px] tracking-[2px] text-black/40 font-medium">DIGITAL PRODUCTS, CAREFULLY MADE</motion.div>
        <motion.div animate={{ opacity: hovered ? 1 : 0.85, y: hovered ? 0 : 5 }} transition={{ duration: 0.45, delay: 0.05 }}>
          <div className="text-[11px] text-black/20 font-medium leading-none">A New Standard</div>
          <div className="text-[20px] font-semibold text-[#05050c] leading-tight tracking-tight">for Digital Craft</div>
        </motion.div>
        <motion.div animate={{ opacity: hovered ? 0.6 : 0.3, y: hovered ? 0 : 7 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[8px] text-black/40 max-w-[170px] leading-relaxed">Websites, mobile apps, and web platforms</motion.div>
        <motion.div animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }} transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-1 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-[#111] text-white text-[8px] font-semibold">See our work</span>
          <span className="px-3 py-1 rounded-full border border-black/20 text-black/60 text-[8px]">Begin conversation</span>
        </motion.div>
        {/* Mini dashboard */}
        <motion.div animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }} transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-2 w-full max-w-[200px] bg-white rounded-lg border border-black/10 p-2 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          </div>
          <div className="flex gap-2 text-[7px]">
            <div className="flex-1 bg-[#f4ede4] rounded p-1 text-center"><strong className="text-[#4a154b]">98</strong><br/>Perf</div>
            <div className="flex-1 bg-[#f4ede4] rounded p-1 text-center"><strong className="text-[#4a154b]">6wk</strong><br/>Ship</div>
            <div className="flex-1 bg-[#f4ede4] rounded p-1 text-center"><strong className="text-[#4a154b]">4.9</strong><br/>Rating</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const sharpImg: React.CSSProperties = {
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  imageRendering: 'auto',
}

function LetsLoveLandingPreview({ hovered }: { hovered: boolean }) {
  return <ScrollingScreenshot src="/images/letslove-fullpage-trimmed.webp" alt="Let's Love landing page" hovered={hovered} bg="#f0f4ff" />
}

function ScrollingScreenshot({ src, alt, hovered, bg = '#f0ede6', dark = false }: { src: string; alt: string; hovered: boolean; bg?: string; dark?: boolean }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollDistance, setScrollDistance] = useState(0)
  const [autoScroll, setAutoScroll] = useState(false)

  useEffect(() => {
    const img = imgRef.current
    const container = containerRef.current
    if (!img || !container) return
    const update = () => {
      const overflow = img.scrollHeight - container.clientHeight
      setScrollDistance(overflow > 0 ? overflow : 0)
    }
    img.addEventListener('load', update)
    update()
    return () => img.removeEventListener('load', update)
  }, [])

  const duration = Math.max(3, Math.min(8, scrollDistance / 80))

  // Touch devices have no hover, so drive the scroll automatically while the
  // card is on screen — toggling in a loop (down, pause, up, pause).
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(hover: none)').matches) return
    const container = containerRef.current
    if (!container) return
    let timer: ReturnType<typeof setInterval> | undefined
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAutoScroll(true)
        timer = setInterval(() => setAutoScroll(a => !a), (duration + 1.4) * 1000)
      } else {
        setAutoScroll(false)
        if (timer) { clearInterval(timer); timer = undefined }
      }
    }, { threshold: 0.35 })
    io.observe(container)
    return () => { io.disconnect(); if (timer) clearInterval(timer) }
  }, [duration])

  const active = hovered || autoScroll

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden select-none" style={{ backgroundColor: bg }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full"
        style={{
          ...sharpImg,
          willChange: 'transform',
          transition: `transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1)`,
          transform: active && scrollDistance > 0 ? `translateY(-${scrollDistance}px)` : 'translateY(0)',
        }}
      />
      <motion.div
        animate={{ opacity: active ? 0 : 0.15 }}
        transition={{ duration: 0.35 }}
        className={`absolute inset-0 pointer-events-none ${dark ? 'bg-black' : 'bg-white'}`}
      />
      <motion.div
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white rounded-full px-3 py-1.5 pointer-events-none whitespace-nowrap"
      >
        <span className="text-[8px] font-medium">↗ Visit site</span>
      </motion.div>
    </div>
  )
}

function AsmitaPreview({ hovered }: { hovered: boolean }) {
  return <ScrollingScreenshot src="/images/asmita-fullpage.webp" alt="Asmita landing page" hovered={hovered} bg="#f0ede6" />
}

// ─── App Link Preview Cards ───────────────────────────────────────────────────

interface AppLinkPreviewProps {
  hovered: boolean
  icon: string
  name: string
  developer: string
  category: string
  description: string
  rating: string
  reviews: string
  platform: string
  bg: string        // card background gradient
  accentColor: string  // button + ring color
  textLight: boolean   // whether to use light text
}

function AppLinkPreview({
  hovered, icon, name, developer, category, description,
  rating, reviews, platform, bg, accentColor, textLight,
}: AppLinkPreviewProps) {
  const textPrimary   = textLight ? '#ffffff' : '#1a1a1a'
  const textSecondary = textLight ? 'rgba(255,255,255,0.80)' : '#555'
  const divider       = textLight ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.07)'

  return (
    <div
      className="w-full h-full flex flex-col justify-between overflow-hidden select-none px-5 py-5"
      style={{ background: bg }}
    >
      {/* Top row: icon + name/dev + GET button */}
      <div className="flex items-center gap-4">
        {/* Icon */}
        <img
          src={icon}
          alt={name}
          className="w-14 h-14 rounded-[16px] shrink-0 object-cover"
          style={{
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        />

        {/* Name + developer */}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[14px] leading-tight truncate" style={{ color: textPrimary }}>{name}</div>
          <div className="text-[10px] mt-0.5 truncate" style={{ color: textSecondary }}>{developer}</div>
          <div className="text-[9px] mt-1 truncate" style={{ color: textSecondary }}>{category}</div>
        </div>

        {/* GET button */}
        <motion.div
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-wide"
          style={{ background: accentColor, color: '#fff', boxShadow: `0 2px 12px ${accentColor}66` }}
        >
          GET
        </motion.div>
      </div>

      {/* Divider */}
      <div className="h-px my-4" style={{ background: divider }} />

      {/* Description */}
      <motion.p
        animate={{ opacity: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
        className="text-[11px] leading-relaxed line-clamp-3 flex-1"
        style={{ color: textLight ? 'rgba(255,255,255,0.88)' : '#444' }}
      >
        {description}
      </motion.p>

      {/* Bottom: rating + platform */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Stars */}
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1l1.12 2.27L9 3.64 7 5.58l.47 2.75L5 7.02 2.53 8.33 3 5.58 1 3.64l2.88-.37L5 1z"
                  fill={i <= Math.floor(parseFloat(rating)) ? accentColor : divider} />
              </svg>
            ))}
          </div>
          <span className="text-[9px] font-semibold" style={{ color: textSecondary }}>{rating}</span>
        </div>
        <div className="text-[9px] font-medium px-2 py-0.5 rounded-full" style={{ background: divider, color: textSecondary }}>
          {platform}
        </div>
      </div>
    </div>
  )
}

function LetsLoveAppPreview({ hovered }: { hovered: boolean }) {
  return (
    <AppLinkPreview
      hovered={hovered}
      icon="/images/icon-letslove.png"
      name="Let's Love"
      developer="Jamsaq Studio"
      category="Lifestyle · Relationships"
      description="A private couple space for daily rituals, shared memories, date ideas, mood board, streaks, and real-time connection — built for exactly two people."
      rating="4.8"
      reviews="1.2K ratings"
      platform="Android"
      bg="linear-gradient(145deg, #1e2535 0%, #2d1f2a 100%)"
      accentColor="#e85d8a"
      textLight
    />
  )
}

function HadithPreview({ hovered }: { hovered: boolean }) {
  return (
    <AppLinkPreview
      hovered={hovered}
      icon="/images/icon-hadith.png"
      name="Hadith of the Day"
      developer="Jamsaq Studio"
      category="Education · Faith"
      description="Daily hadith reflections presented with Arabic calligraphy, English translation, source attribution, and a curated corpus — calm and source-forward."
      rating="4.9"
      reviews="840 ratings"
      platform="Android"
      bg="linear-gradient(145deg, #071812 0%, #0f2b1a 100%)"
      accentColor="#c9a84c"
      textLight
    />
  )
}

function TASIAppPreview({ hovered }: { hovered: boolean }) {
  return (
    <AppLinkPreview
      hovered={hovered}
      icon="/images/icon-tasi.png"
      name="TASI Festival"
      developer="Centre for Social Research"
      category="Events · Conference"
      description="Official companion app for Trust and Safety India Festival — agenda, speakers, QR badge, networking, AI assistant, and live updates for Delhi 2026."
      rating="4.7"
      reviews="320 ratings"
      platform="Android · iOS"
      bg="linear-gradient(145deg, #2a0606 0%, #5c0e0e 100%)"
      accentColor="#f5c518"
      textLight
    />
  )
}

// ─── Preview Router ───────────────────────────────────────────────────────────

function ProjectPreview({ id, hovered }: { id: number; hovered: boolean }) {
  switch (id) {
    case 501: return <AsmitaPreview hovered={hovered} />
    case 502: return <LetsLoveAppPreview hovered={hovered} />
    case 504: return <HadithPreview hovered={hovered} />
    case 505: return <LetsLoveLandingPreview hovered={hovered} />
    case 508: return <TASIWebsitePreview hovered={hovered} />
    case 509: return <TASIAppPreview hovered={hovered} />
    default: return <div className="w-full h-full bg-[#f4ede4]" />
  }
}

// ─── Browser Chrome Wrapper ───────────────────────────────────────────────────

function BrowserChrome({ children, dark = false, url = 'jamsaq.com', hovered = false }: { children: React.ReactNode; dark?: boolean; url?: string; hovered?: boolean }) {
  return (
    <div className={`rounded-t-xl overflow-hidden border ${dark ? 'border-white/10' : 'border-black/10'}`}>
      {/* Tab bar animates on hover */}
      <motion.div
        animate={{ backgroundColor: hovered ? (dark ? '#2a2a2a' : '#d8d8d8') : (dark ? '#1e1e1e' : '#e8e8e8') }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-1.5 px-3 py-2"
      >
        {/* Traffic lights pulse on hover */}
        <motion.span animate={{ scale: hovered ? 1.2 : 1 }} transition={{ duration: 0.2 }} className="w-2 h-2 rounded-full bg-[#ff5f56]" />
        <motion.span animate={{ scale: hovered ? 1.2 : 1 }} transition={{ duration: 0.2, delay: 0.04 }} className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
        <motion.span animate={{ scale: hovered ? 1.2 : 1 }} transition={{ duration: 0.2, delay: 0.08 }} className="w-2 h-2 rounded-full bg-[#27c93f]" />
        {/* URL bar highlights and shows full URL on hover */}
        <motion.div
          animate={{
            backgroundColor: hovered ? (dark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,1)') : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)'),
            color: hovered ? (dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)') : (dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'),
          }}
          transition={{ duration: 0.3 }}
          className="ml-2 flex-1 rounded-full px-3 py-0.5 text-[8px] truncate"
        >
          {hovered ? `🔒 ${url}` : url}
        </motion.div>
      </motion.div>
      <div className="h-[220px]">
        {children}
      </div>
    </div>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────

// Card presentation only (browser-chrome URL + dark theme). Live URLs come from the project itself.
const PROJECT_META: Record<number, { url: string; dark?: boolean }> = {
  501: { url: 'meriasmita.org' },
  502: { url: 'letslove.jamsaq.in' },
  504: { url: 'hadithoftheday.app' },
  505: { url: 'letslove.jamsaq.in' },
  508: { url: 'trustandsafetyindia.org' },
  509: { url: 'trustandsafetyindia.org' },
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const [hovered, setHovered] = useState(false)
  const meta = PROJECT_META[project.id] ?? { url: 'jamsaq.com' }
  const liveUrl = project.liveUrl ?? undefined

  return (
    <TiltCard className="cursor-pointer group h-full">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onOpen(project)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="h-full flex flex-col rounded-2xl overflow-hidden border border-[#e6e6e6] bg-white shadow-sm hover:shadow-xl hover:shadow-black/8 transition-shadow duration-300"
      >
        {/* Thumbnail — clicking it opens the live site if available, otherwise the modal */}
        <div
          className="relative overflow-hidden"
          onClick={liveUrl ? (e) => { e.stopPropagation(); window.open(liveUrl, '_blank', 'noopener,noreferrer') } : undefined}
        >
          <BrowserChrome dark={meta.dark} url={meta.url} hovered={hovered}>
            <ProjectPreview id={project.id} hovered={hovered} />
          </BrowserChrome>
          {/* Category pill */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.25 }}
            className="absolute top-10 right-3"
          >
            <span className="px-2.5 py-1 rounded-full bg-black/70 text-white text-[9px] font-medium backdrop-blur-sm">
              {project.category}
            </span>
          </motion.div>
        </div>

        {/* Project info */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-[#1d1d1d] tracking-tight text-[15px] group-hover:text-[#4a154b] transition-colors duration-200">
                {project.title}
              </div>
              <div className="text-[11px] text-[#696969] mt-0.5">{project.client} · {project.year}</div>
            </div>
            <span className="shrink-0 mt-0.5 text-[9px] font-semibold text-[#4a154b] bg-[#f4ede4] px-2.5 py-1 rounded-full">
              {project.result}
            </span>
          </div>

          <p className="text-[12px] text-[#696969] leading-relaxed mt-3 line-clamp-2 flex-1">
            {project.description}
          </p>

          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
            transition={{ duration: 0.2 }}
            className="mt-4 pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-[11px]"
          >
            <span className="text-[#696969] truncate max-w-[65%]">{project.role}</span>
            <div className="flex items-center gap-3 shrink-0">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1 text-[#696969] hover:text-[#1d1d1d] transition-colors"
                >
                  ↗ Live site
                </a>
              )}
              <span className="flex items-center gap-1 text-[#4a154b] font-semibold">
                Details <ArrowRight size={12} />
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </TiltCard>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function ProjectShowcase({ projects, onOpen }: ProjectShowcaseProps) {
  const sites = projects.filter(p => p.type === 'site')
  const apps = projects.filter(p => p.type === 'app')

  return (
    <div className="clean-showcase space-y-14">
      {[
        { title: 'Sites', kicker: 'WEBSITES & WEB APPS', desc: 'Websites, storefronts, and SaaS products with strong launch surfaces.', items: sites },
        { title: 'Apps', kicker: 'MOBILE PRODUCTS', desc: 'Mobile and Android-first products with real product loops and release foundations.', items: apps },
      ].map(section => (
        <div key={section.title} data-reveal>
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="micro-cap text-[#4a154b] mb-2">{section.kicker}</div>
              <h4 className="display-md tracking-[-0.3px]">{section.title}</h4>
              <p className="caption text-[#696969] max-w-[56ch] mt-2">{section.desc}</p>
            </div>
            <div className="text-sm font-semibold text-[#4a154b]">{section.items.length} projects</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {section.items.map(p => (
              <ProjectCard key={p.id} project={p} onOpen={onOpen} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
