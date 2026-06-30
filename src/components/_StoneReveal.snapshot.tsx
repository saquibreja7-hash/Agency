// SNAPSHOT — StoneReveal component + JSX usage
// Restore by:
// 1. Paste the StoneReveal function back into App.tsx before AgencyDashboardPreview()
// 2. Add <StoneReveal side="left" /> and <StoneReveal side="right" /> inside the hero section

// --- Component (paste into App.tsx) ---
/*
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
    ? '/images/stone-left.png'
    : '/images/stone-right.png'
  const grass = isLeft
    ? '/images/stone-g-left.png'
    : '/images/stone-g-right.png'

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
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
*/

// --- JSX usage (inside hero section) ---
// <StoneReveal side="left" />
// <StoneReveal side="right" />
