import { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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

// =========================================
// FLOATING MOCKUPS (product UI above pastel mesh)
// =========================================
function WebsiteMockup() {
  return (
    <div className="mockup mockup-browser w-full max-w-[420px] shadow-[0_0_32px_rgba(0,0,0,0.1)]">
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
  )
}

function MobileMockup() {
  return (
    <div className="mockup-phone w-[148px] text-[9.5px]">
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
  )
}

function PlatformMockup() {
  return (
    <div className="mockup w-full max-w-[380px] text-[10px]">
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

  // Refs for Lenis and scroll animations
  const lenisRef = useRef<Lenis | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const mockupsWrapperRef = useRef<HTMLDivElement>(null)
  const websiteMockRef = useRef<HTMLDivElement>(null)
  const mobileMockRef = useRef<HTMLDivElement>(null)
  const platformMockRef = useRef<HTMLDivElement>(null)

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
      // --- HERO MOCKUPS PARALLAX (different speeds for depth) ---
      if (websiteMockRef.current) {
        gsap.to(websiteMockRef.current, {
          y: -38,
          rotation: -1.5,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
          },
        })
      }
      if (mobileMockRef.current) {
        gsap.to(mobileMockRef.current, {
          y: -85,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.4,
          },
        })
      }
      if (platformMockRef.current) {
        gsap.to(platformMockRef.current, {
          y: 32,
          rotation: 2,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.9,
          },
        })
      }

      // Subtle parallax + fade on hero text
      const heroText = heroRef.current?.querySelector('.hero-text')
      if (heroText) {
        gsap.to(heroText, {
          y: 45,
          opacity: 0.92,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
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
      <nav className="nav-bar-light fixed top-0 left-0 right-0 z-50">
        <div className="container flex items-center justify-between h-20">
          <div onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-6 h-6 rounded bg-[#4a154b] flex items-center justify-center">
              <span className="text-white text-[13px] font-bold tracking-[-0.5px]">J</span>
            </div>
            <span className="font-semibold tracking-[-0.3px] text-[21px] text-[#4a154b]">jamsaq</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 text-sm">
            <button onClick={() => scrollTo('work')} className="nav-link">Work</button>
            <button onClick={() => scrollTo('engagements')} className="nav-link">Engagements</button>
            <button onClick={() => scrollTo('process')} className="nav-link">Process</button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => scrollTo('contact')} className="button-secondary-pill text-sm">Talk to us</button>
            <button onClick={() => scrollTo('contact')} className="button-primary-pill text-sm">Start a project</button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2" aria-label="Menu">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div className="md:hidden mobile-menu px-6 py-6 text-sm space-y-4">
              {['work', 'engagements', 'process', 'contact'].map(id => (
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
      <section id="hero" ref={heroRef} className="hero pastel-mesh">
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

          {/* Floating product UI mockups — parallax layers above the mesh */}
          <div ref={mockupsWrapperRef} className="mt-14 md:mt-6 relative min-h-[260px] md:min-h-[320px] flex items-end justify-center gap-6 flex-wrap">
            <div ref={websiteMockRef} className="relative z-10 -mb-6 md:mb-4 md:-rotate-[3deg] scale-[0.92] md:scale-100">
              <WebsiteMockup />
            </div>
            <div ref={mobileMockRef} className="relative z-20 -mb-2 md:mb-2 scale-[0.88] md:scale-[0.96]">
              <MobileMockup />
            </div>
            <div ref={platformMockRef} className="relative z-10 -mb-8 md:-mb-4 md:rotate-[2.5deg] scale-[0.92] md:scale-100">
              <PlatformMockup />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — card-feature-cream */}
      <section id="services" className="section container">
        <div className="text-center mb-12">
          <div className="pill-cap-shade mb-3">WHAT WE MAKE</div>
          <h2 className="display-xl tracking-[-0.5px]">Three kinds of work.<br />One standard of care.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="card-feature-cream">
              <div className="heading-md mb-3">{s.title}</div>
              <p className="text-[#696969] mb-6 body-md">{s.desc}</p>
              <ul className="space-y-[10px] text-sm">
                {s.points.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1.5 block w-[3px] h-[3px] rounded-full bg-[#4a154b]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* STATS — card-stat with massive aubergine display + scroll count-up + parallax */}
      <section ref={statsRef} className="container section border-t border-[var(--hairline)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="card-stat flex flex-col justify-center">
              <div className="number">{stat.number}</div>
              <div className="caption text-[#696969] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" ref={workRef} className="section container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="pill-cap-shade mb-2">SELECTED WORK</div>
            <h3 className="display-xl tracking-[-0.5px]">Projects we are proud to have shaped.</h3>
          </div>
          <button onClick={() => scrollTo('contact')} className="hidden md:block button-secondary-pill text-sm">Start your own</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(p => (
            <div key={p.id} onClick={() => openProject(p)} className="work-card p-7 cursor-pointer group">
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
      <section id="engagements" ref={engagementsRef} className="section bg-[#f9f0ff]">
        <div className="container">
          <div className="text-center mb-10">
            <div className="pill-cap-shade mb-3">HOW WE PARTNER</div>
            <h2 className="display-xl tracking-[-0.4px]">Clear starting points.<br />Generous scope.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1080px] mx-auto">
            {engagements.map((e, idx) => (
              <div key={idx} className={e.featured ? "card-pricing-featured" : "card-pricing"}>
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
        <div className="text-center mb-10">
          <div className="pill-cap-shade mb-3">HOW WE WORK</div>
          <h2 className="display-xl tracking-[-0.5px]">A clear, deliberate process.</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {process.map((step, i) => (
            <div key={i} className="card-feature-cream">
              <div className="micro-cap text-[#4a154b] mb-4">{step.num}</div>
              <div className="heading-md mb-3">{step.title}</div>
              <p className="body-md text-[#696969]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section container">
        <div className="mb-8">
          <div className="pill-cap-shade mb-2">FROM OUR PARTNERS</div>
          <h2 className="display-xl tracking-[-0.5px]">What our clients say.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card-pricing">
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
      <div className="card-aubergine-band mt-8">
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
        <div className="max-w-[860px]">
          <div className="pill-cap-shade mb-3">LET’S TALK</div>
          <h2 className="display-xl tracking-[-0.5px] mb-8">Tell us about the thing<br />you want to bring into the world.</h2>
        </div>

        <div className="max-w-[780px]">
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
