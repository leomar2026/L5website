import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import {
  ArrowRight, Bot, CheckCircle2, ChevronDown, Cloud, Code2, Cpu,
  Clock, HardDrive, Headphones, Mail, MapPin, Menu, MessageCircle,
  Network, Phone, Quote, ServerCog, ShieldCheck, Wrench, X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

const company = 'L5 Innovative IT Solutions'
const logo = '/assets/l5-logo.png'
const banner = '/assets/l5-banner.png'

const navItems = [
  ['Home', 'top'],
  ['About Us', 'about'],
  ['Services', 'services'],
  ['Solutions', 'solutions'],
  ['Projects', 'projects'],
  ['Contact Us', 'contact'],
]

const services = [
  {
    icon: Code2,
    title: 'Website and AI-Powered Web Application Development',
    items: [
      'Professional corporate websites, landing pages, and e-commerce websites',
      'Responsive website design for desktop, tablet, and mobile',
      'Custom business systems, client portals, dashboards, and internal applications',
      'Inventory, POS, booking, HR, and workflow management systems',
      'AI-assisted development solutions for faster delivery',
      'Website hosting, domain setup, DNS, SSL certificates, maintenance, and updates',
      'SEO-ready structure, contact forms, WhatsApp integration, and analytics setup',
    ],
  },
  {
    icon: ServerCog,
    title: 'Server Deployment and Infrastructure',
    items: [
      'Windows Server and Linux Server deployment',
      'VPS and cloud server setup',
      'File, ERP, backup, DNS, SSL, hosting, and email',
      'Backup and disaster recovery solutions',
    ],
  },
  {
    icon: Wrench,
    title: 'Hardware and Software Installation',
    items: [
      'Laptop, desktop, printer, and software installation',
      'CCTV, biometric, access control, and PBX installation',
      'Router, switch, Wi-Fi, and office network setup',
      'Device upgrades, maintenance, and troubleshooting',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Network and Cybersecurity Solutions',
    items: [
      'MikroTik and pfSense firewall setup',
      'VPN configuration',
      'Switching and wireless infrastructure',
      'Microsoft 365 administration, access, and endpoint security',
    ],
  },
  {
    icon: Headphones,
    title: 'Managed IT Support',
    items: [
      'Remote and onsite technical support',
      'Hardware and software troubleshooting',
      'IT maintenance and monitoring',
      'Asset management, licensing, and renewals',
    ],
  },
]

const solutions = [
  ['Build', 'AI-assisted web applications, portals, dashboards, responsive websites, and business systems engineered for real operations.'],
  ['Deploy', 'Servers, cloud hosting, domains, DNS, SSL, Microsoft 365, backups, networks, and secure access configured end-to-end.'],
  ['Support', 'Ongoing remote and onsite support, monitoring, maintenance, renewals, and fast troubleshooting when teams need help.'],
]

const projects = [
  ['Retail Operations', 'Inventory, POS, and dashboard portal for better stock visibility and faster branch reporting.'],
  ['Secure Office Network', 'Firewall, VPN, Wi-Fi, switches, and endpoint controls for a growing professional office.'],
  ['Cloud Server Launch', 'VPS, SSL, DNS, email, backups, and production deployment for a new web platform.'],
  ['Smart Workplace Setup', 'CCTV, biometric access, PBX, workstations, printers, and managed IT rollout.'],
]

const stats = [
  [50, '+', 'systems built and deployed'],
  [99, '%', 'uptime-focused infrastructure'],
  [24, '/7', 'support-minded operations'],
  [5, '', 'core service pillars'],
]

const about3DConfig = {
  eyebrow: 'About Us',
  title: 'Powering Businesses Through Smart IT Solutions',
  description: 'L5 Innovative IT Solutions helps businesses build modern websites and web applications, deploy secure server infrastructure, install reliable hardware and software, and maintain technology systems that support daily operations.',
  colors: {
    cyan: '#63e6ff',
    blue: '#087cff',
    violet: '#8d68ff',
    navy: '#030712',
    panel: 'rgba(7, 17, 31, .68)',
  },
  motion: {
    rotateX: 4,
    rotateY: 7,
    translate: 18,
    scrollShift: 70,
  },
  layers: {
    particles: 18,
    nodes: 11,
    blocks: 5,
  },
  blocks: [
    {
      icon: CheckCircle2,
      title: 'Our Mission',
      text: 'To provide reliable, scalable, and business-focused IT solutions that help organizations work smarter, stay connected, and grow with confidence.',
    },
    {
      icon: Cpu,
      title: 'What We Do',
      text: 'We combine website development, AI-powered web applications, server deployment, networking, cybersecurity, hardware installation, and managed IT support into practical solutions for modern businesses.',
    },
    {
      icon: ShieldCheck,
      title: 'Why L5',
      text: 'We focus on dependable delivery, clear communication, secure technology, and ongoing support tailored to each client’s business needs.',
    },
  ],
}

const services3DConfig = {
  colors: {
    cyan: '#63e6ff',
    blue: '#087cff',
    violet: '#8d68ff',
  },
  opacity: .72,
  intensity: {
    rotateX: 2.8,
    rotateY: 4.8,
    translate: 14,
  },
  enabledVisuals: {
    web: true,
    server: true,
    hardware: true,
    security: true,
    support: true,
  },
}

const projects3DConfig = {
  colors: {
    cyan: '#63e6ff',
    blue: '#087cff',
    violet: '#8d68ff',
  },
  opacity: .68,
  glowOpacity: .16,
  parallaxSpeed: {
    back: .12,
    mid: .28,
    front: .52,
  },
  cardMotion: {
    rotateX: 4.5,
    rotateY: 5.5,
    lift: 10,
  },
  enabledVisuals: {
    codePanels: true,
    serverCloud: true,
    security: true,
    devices: true,
    particles: true,
  },
}

const contact3DConfig = {
  images: {
    hero: {
      src: '/assets/contact-hero.svg',
      alt: 'Futuristic IT support communication background with contact and network icons',
    },
    side: {
      src: '/assets/contact-support.svg',
      alt: 'IT support workspace with laptop, headset, helpdesk dashboard and secure support indicators',
    },
  },
  colors: {
    cyan: '#63e6ff',
    blue: '#087cff',
    violet: '#8d68ff',
  },
  opacity: .72,
  glowOpacity: .18,
  motion: {
    rotateX: 3,
    rotateY: 5,
    translate: 16,
  },
  infoCards: [
    { label: 'Email', text: 'Send your inquiry', icon: Mail, image: 'envelope' },
    { label: 'Phone / WhatsApp', text: 'Fast support contact', icon: Phone, image: 'phone' },
    { label: 'Office Location', text: 'Business consultation', icon: MapPin, image: 'location' },
    { label: 'Support Hours', text: 'Responsive IT help', icon: Clock, image: 'clock' },
  ],
}

function LogoImage({ compact = false }) {
  return (
    <span className={compact ? 'logo-image compact' : 'logo-image'}>
      <img src={logo} alt="L5 Innovative IT Solutions logo" />
    </span>
  )
}

function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div className="loader" exit={{ opacity: 0 }}>
      <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} className="loader-logo">
        <LogoImage />
      </motion.div>
      <div className="loader-track"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: 'easeInOut' }} /></div>
      <p>Build • Deploy • Support</p>
    </motion.div>
  )
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: .75, delay, ease: [.2, .8, .2, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Eyebrow({ children }) {
  return <div className="eyebrow"><span />{children}</div>
}

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav-wrap">
      <a className="brand" href="#top" aria-label={`${company} home`} onClick={() => setOpen(false)}>
        <LogoImage compact />
        <span>L5<small>Innovative IT Solutions</small></span>
      </a>
      <nav className={open ? 'open' : ''} aria-label="Primary navigation">
        <div className="mobile-logo"><LogoImage compact /><b>L5 Innovative IT Solutions</b></div>
        {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Get a Consultation <ArrowRight size={15} /></a>
      </nav>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </header>
  )
}

export function Hero3DBanner({
  image,
  title,
  subtitle,
  description,
  primaryButtonText,
  secondaryButtonText,
}) {
  const shell = useRef(null)
  const reduce = useReducedMotion()
  const state = useRef({
    rx: 0, ry: 0, tx: 0, ty: 0, glowX: 50, glowY: 50, scroll: 0,
    trx: 0, try: 0, ttx: 0, tty: 0, tgx: 50, tgy: 50, ts: 0,
    raf: 0,
  })

  useEffect(() => {
    const el = shell.current
    if (!el) return undefined
    const canTilt = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)').matches
    if (reduce || !canTilt) return undefined
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)').matches
    const s = state.current

    const render = () => {
      s.rx += (s.trx - s.rx) * .11
      s.ry += (s.try - s.ry) * .11
      s.tx += (s.ttx - s.tx) * .11
      s.ty += (s.tty - s.ty) * .11
      s.glowX += (s.tgx - s.glowX) * .13
      s.glowY += (s.tgy - s.glowY) * .13
      s.scroll += (s.ts - s.scroll) * .08
      el.style.setProperty('--rx', `${s.rx}deg`)
      el.style.setProperty('--ry', `${s.ry}deg`)
      el.style.setProperty('--tx', `${s.tx}px`)
      el.style.setProperty('--ty', `${s.ty}px`)
      el.style.setProperty('--glow-x', `${s.glowX}%`)
      el.style.setProperty('--glow-y', `${s.glowY}%`)
      el.style.setProperty('--scroll-p', `${s.scroll}`)
      s.raf = requestAnimationFrame(render)
    }

    const onMove = (event) => {
      if (!finePointer) return
      const rect = el.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - .5) * 2
      const y = ((event.clientY - rect.top) / rect.height - .5) * 2
      s.try = x * 7
      s.trx = y * -4
      s.ttx = x * 9
      s.tty = y * 5
      s.tgx = ((event.clientX - rect.left) / rect.width) * 100
      s.tgy = ((event.clientY - rect.top) / rect.height) * 100
    }
    const onLeave = () => {
      s.trx = 0; s.try = 0; s.ttx = 0; s.tty = 0; s.tgx = 50; s.tgy = 50
    }
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, window.innerHeight * .9)))
      s.ts = progress
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('mouseleave', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    render()

    return () => {
      cancelAnimationFrame(s.raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduce])

  return (
    <section className="hero" id="top" ref={shell}>
      <div className="hero-grid" />
      <div className="hero-perspective">
        <div className="hero-card">
          <div className="banner-depth background-depth" />
          <img className="hero-banner-image" src={image} alt="L5 technology banner" />
          <div className="banner-depth logo-depth" />
          <div className="banner-depth circuit-depth" />
          <div className="banner-glow" />
          <div className="hero-readable-overlay" aria-hidden="true" />
        </div>
      </div>
      <a className="scroll-cue" href="#about">Scroll <ChevronDown size={16} /></a>
    </section>
  )
}

function InfrastructureCore({ progress = 0 }) {
  const group = useRef()
  const nodes = useMemo(() => Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2
    const radius = i % 2 ? 1.75 : 2.35
    return [Math.cos(angle) * radius, Math.sin(angle * 1.7) * .75, Math.sin(angle) * radius]
  }), [])

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * (.12 + progress * .35)
    group.current.rotation.x = .15 + progress * .45
    group.current.scale.setScalar(1 + progress * .18)
  })

  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[1.05, .18, 130, 16]} />
        <meshStandardMaterial color="#08152a" emissive="#087cff" emissiveIntensity={1.1} roughness={.18} metalness={.8} wireframe />
      </mesh>
      {nodes.map((p, i) => (
        <Float key={i} speed={1 + (i % 4) * .2} floatIntensity={.18}>
          <mesh position={p}>
            <sphereGeometry args={[i % 5 === 0 ? .065 : .038, 12, 12]} />
            <meshBasicMaterial color={i % 3 === 0 ? '#8d68ff' : '#63e6ff'} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function ThreeScene({ progress = 0 }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={.35} />
      <pointLight position={[4, 3, 4]} color="#63e6ff" intensity={15} />
      <pointLight position={[-4, -2, 2]} color="#8d68ff" intensity={12} />
      <InfrastructureCore progress={progress} />
      <Sparkles count={38} scale={7} size={1.2} speed={.18} color="#63e6ff" />
    </Canvas>
  )
}

export function About3DHero({ config = about3DConfig }) {
  const wrap = useRef(null)
  const reduce = useReducedMotion()
  const particles = useMemo(() => Array.from({ length: config.layers.particles }, (_, i) => ({
    left: `${8 + ((i * 19) % 86)}%`,
    top: `${10 + ((i * 29) % 78)}%`,
    size: 2 + (i % 4),
    delay: `${(i % 7) * .35}s`,
  })), [config.layers.particles])
  const nodes = useMemo(() => Array.from({ length: config.layers.nodes }, (_, i) => ({
    left: `${9 + ((i * 23) % 82)}%`,
    top: `${15 + ((i * 17) % 68)}%`,
    delay: `${(i % 5) * .45}s`,
  })), [config.layers.nodes])
  const blocks = useMemo(() => Array.from({ length: config.layers.blocks }, (_, i) => ({
    left: `${12 + ((i * 21) % 72)}%`,
    top: `${18 + ((i * 31) % 58)}%`,
    delay: `${i * .38}s`,
  })), [config.layers.blocks])
  const state = useRef({
    rx: 0, ry: 0, x: 0, y: 0, gx: 50, gy: 50, scroll: 0,
    trx: 0, try: 0, tx: 0, ty: 0, tgx: 50, tgy: 50, ts: 0,
    raf: 0,
  })

  useEffect(() => {
    const el = wrap.current
    if (!el || reduce) return
    const canMove = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)').matches
    const s = state.current

    const render = () => {
      s.rx += (s.trx - s.rx) * .09
      s.ry += (s.try - s.ry) * .09
      s.x += (s.tx - s.x) * .1
      s.y += (s.ty - s.y) * .1
      s.gx += (s.tgx - s.gx) * .12
      s.gy += (s.tgy - s.gy) * .12
      s.scroll += (s.ts - s.scroll) * .08
      el.style.setProperty('--about-rx', `${s.rx}deg`)
      el.style.setProperty('--about-ry', `${s.ry}deg`)
      el.style.setProperty('--about-x', `${s.x}px`)
      el.style.setProperty('--about-y', `${s.y}px`)
      el.style.setProperty('--about-glow-x', `${s.gx}%`)
      el.style.setProperty('--about-glow-y', `${s.gy}%`)
      el.style.setProperty('--about-scroll', `${s.scroll}`)
      s.raf = requestAnimationFrame(render)
    }

    const move = (event) => {
      if (!canMove) return
      const rect = el.getBoundingClientRect()
      const px = ((event.clientX - rect.left) / rect.width - .5) * 2
      const py = ((event.clientY - rect.top) / rect.height - .5) * 2
      s.try = px * config.motion.rotateY
      s.trx = py * -config.motion.rotateX
      s.tx = px * config.motion.translate
      s.ty = py * config.motion.translate * .55
      s.tgx = ((event.clientX - rect.left) / rect.width) * 100
      s.tgy = ((event.clientY - rect.top) / rect.height) * 100
    }

    const leave = () => {
      s.trx = 0; s.try = 0; s.tx = 0; s.ty = 0; s.tgx = 50; s.tgy = 50
    }

    const scroll = () => {
      const rect = el.getBoundingClientRect()
      s.ts = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('mousemove', move)
    el.addEventListener('pointerleave', leave)
    el.addEventListener('mouseleave', leave)
    window.addEventListener('scroll', scroll, { passive: true })
    scroll()
    render()

    return () => {
      cancelAnimationFrame(s.raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('mousemove', move)
      el.removeEventListener('pointerleave', leave)
      el.removeEventListener('mouseleave', leave)
      window.removeEventListener('scroll', scroll)
    }
  }, [config.motion.rotateX, config.motion.rotateY, config.motion.translate, reduce])

  return (
    <section
      className="about-3d-hero"
      id="about"
      ref={wrap}
      style={{
        '--about-cyan': config.colors.cyan,
        '--about-blue': config.colors.blue,
        '--about-violet': config.colors.violet,
        '--about-navy': config.colors.navy,
        '--about-panel': config.colors.panel,
        '--about-scroll-shift': `${config.motion.scrollShift}px`,
      }}
    >
      <div className="about-depth-scene" aria-hidden="true">
        <div className="about-layer about-layer-far">
          <div className="about-grid" />
          {particles.map((p, i) => <span key={i} className="about-particle" style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay }} />)}
        </div>
        <div className="about-layer about-layer-mid">
          <div className="about-circuit circuit-a" />
          <div className="about-circuit circuit-b" />
          {nodes.map((node, i) => <span key={i} className="about-node" style={{ left: node.left, top: node.top, animationDelay: node.delay }} />)}
        </div>
        <div className="about-layer about-layer-front">
          {blocks.map((block, i) => <span key={i} className={`about-holo-block block-${i + 1}`} style={{ left: block.left, top: block.top, animationDelay: block.delay }} />)}
        </div>
        <div className="about-cursor-glow" />
      </div>

      <div className="about-3d-wrap">
        <Reveal className="about-glass-panel">
          <Eyebrow>{config.eyebrow}</Eyebrow>
          <h2>{config.title}</h2>
          <p className="lead">{config.description}</p>
          <div className="about-content-blocks">
            {config.blocks.map((block) => (
              <article key={block.title}>
                <block.icon />
                <div>
                  <h3>{block.title}</h3>
                  <p>{block.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="about-tech-visual" delay={.12}>
          <div className="visual-core">
            <span className="core-ring ring-one" />
            <span className="core-ring ring-two" />
            <span className="core-ring ring-three" />
            <ServerCog className="core-icon" />
          </div>
          <div className="visual-pills">
            <span><Code2 /> Web</span>
            <span><ServerCog /> Servers</span>
            <span><Network /> Network</span>
            <span><ShieldCheck /> Security</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function About() {
  return (
    <About3DHero />
  )
}

export function Services3DEffects({ config = services3DConfig }) {
  const wrap = useRef(null)
  const reduce = useReducedMotion()
  const particles = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    left: `${5 + ((i * 17) % 90)}%`,
    top: `${8 + ((i * 23) % 82)}%`,
    delay: `${(i % 8) * .32}s`,
  })), [])
  const state = useRef({
    x: 0, y: 0, rx: 0, ry: 0, gx: 50, gy: 45,
    tx: 0, ty: 0, trx: 0, try: 0, tgx: 50, tgy: 45,
    raf: 0,
  })

  useEffect(() => {
    const el = wrap.current
    if (!el || reduce) return
    const canMove = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)').matches
    const s = state.current
    const render = () => {
      s.x += (s.tx - s.x) * .09
      s.y += (s.ty - s.y) * .09
      s.rx += (s.trx - s.rx) * .08
      s.ry += (s.try - s.ry) * .08
      s.gx += (s.tgx - s.gx) * .12
      s.gy += (s.tgy - s.gy) * .12
      el.style.setProperty('--svc-x', `${s.x}px`)
      el.style.setProperty('--svc-y', `${s.y}px`)
      el.style.setProperty('--svc-rx', `${s.rx}deg`)
      el.style.setProperty('--svc-ry', `${s.ry}deg`)
      el.style.setProperty('--svc-glow-x', `${s.gx}%`)
      el.style.setProperty('--svc-glow-y', `${s.gy}%`)
      s.raf = requestAnimationFrame(render)
    }
    const move = (event) => {
      if (!canMove) return
      const rect = el.getBoundingClientRect()
      const px = ((event.clientX - rect.left) / rect.width - .5) * 2
      const py = ((event.clientY - rect.top) / rect.height - .5) * 2
      s.tx = px * config.intensity.translate
      s.ty = py * config.intensity.translate * .65
      s.try = px * config.intensity.rotateY
      s.trx = py * -config.intensity.rotateX
      s.tgx = ((event.clientX - rect.left) / rect.width) * 100
      s.tgy = ((event.clientY - rect.top) / rect.height) * 100
    }
    const leave = () => {
      s.tx = 0; s.ty = 0; s.trx = 0; s.try = 0; s.tgx = 50; s.tgy = 45
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('mousemove', move)
    el.addEventListener('pointerleave', leave)
    el.addEventListener('mouseleave', leave)
    render()
    return () => {
      cancelAnimationFrame(s.raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('mousemove', move)
      el.removeEventListener('pointerleave', leave)
      el.removeEventListener('mouseleave', leave)
    }
  }, [config.intensity.rotateX, config.intensity.rotateY, config.intensity.translate, reduce])

  return (
    <div
      className="services-3d-effects"
      ref={wrap}
      aria-hidden="true"
      style={{
        '--svc-cyan': config.colors.cyan,
        '--svc-blue': config.colors.blue,
        '--svc-violet': config.colors.violet,
        '--svc-opacity': config.opacity,
      }}
    >
      <div className="svc-layer svc-layer-back">
        <div className="svc-grid" />
        {particles.map((p, i) => <span key={i} className="svc-particle" style={{ left: p.left, top: p.top, animationDelay: p.delay }} />)}
      </div>
      <div className="svc-layer svc-layer-mid">
        {config.enabledVisuals.web && <div className="svc-orbit svc-web">
          <span className="browser-window"><i /><i /><i /></span>
          <span className="code-token">&lt;/&gt;</span>
          <span className="dashboard-block"><b /><b /><b /></span>
        </div>}
        {config.enabledVisuals.server && <div className="svc-orbit svc-server">
          <span className="server-stack"><i /><i /><i /></span>
          <span className="cloud-shape" />
          <span className="data-line" />
        </div>}
        {config.enabledVisuals.hardware && <div className="svc-orbit svc-hardware">
          <span className="device-laptop" />
          <span className="device-printer" />
          <span className="install-box" />
        </div>}
        {config.enabledVisuals.security && <div className="svc-orbit svc-security">
          <span className="shield-shape" />
          <span className="lock-shape" />
          <span className="firewall-grid" />
        </div>}
        {config.enabledVisuals.support && <div className="svc-orbit svc-support">
          <span className="headset-shape" />
          <span className="support-panel"><b /><b /></span>
          <span className="check-orb">✓</span>
        </div>}
      </div>
      <div className="svc-layer svc-layer-front">
        <span className="svc-glow-orb orb-one" />
        <span className="svc-glow-orb orb-two" />
        <span className="svc-connection connection-one" />
        <span className="svc-connection connection-two" />
      </div>
      <div className="svc-cursor-glow" />
    </div>
  )
}

function Services() {
  return (
    <section className="section services" id="services">
      <Services3DEffects />
      <Reveal className="section-head">
        <div>
          <Eyebrow>Services</Eyebrow>
          <h2>Complete IT solutions, from application to infrastructure.</h2>
        </div>
        <p>Choose a focused service or let L5 manage the full technology path: build the system, deploy it securely, and support it long-term.</p>
      </Reveal>
      <div className="service-grid">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={(index % 3) * .05}>
            <article className="service-card">
              <div className="card-top"><service.icon /><span>{String(index + 1).padStart(2, '0')}</span></div>
              <h3>{service.title}</h3>
              <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Solutions() {
  const wrap = useRef(null)
  const [progress, setProgress] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !wrap.current) return
    const trigger = ScrollTrigger.create({
      trigger: wrap.current,
      start: 'top top',
      end: '+=140%',
      pin: true,
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    })
    return () => trigger.kill()
  }, [reduce])

  return (
    <section className="solutions" id="solutions" ref={wrap}>
      <div className="solutions-scene"><ThreeScene progress={progress} /></div>
      <div className="solutions-copy">
        <Eyebrow>Solutions</Eyebrow>
        <h2>One technology partner for the full lifecycle.</h2>
        <div className="solution-steps">
          {solutions.map(([title, text], i) => (
            <div key={title} className={progress >= i / 3 || reduce ? 'active' : ''}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="progress"><span style={{ transform: `scaleX(${reduce ? 1 : progress})` }} /></div>
    </section>
  )
}

function TechStack() {
  const items = [
    ['AI Development', Bot], ['Web Apps', Code2], ['Servers', ServerCog], ['Cloud/VPS', Cloud],
    ['Security', ShieldCheck], ['Networks', Network], ['Hardware', HardDrive], ['Automation', Cpu],
  ]
  return (
    <section className="section tech-stack">
      <Reveal className="section-head">
        <div>
          <Eyebrow>Technology Stack</Eyebrow>
          <h2>Modern tools, stable deployments, clear support.</h2>
        </div>
        <p>Placeholder platform icons are easy to replace with your preferred vendors, frameworks, cloud providers, and partner badges.</p>
      </Reveal>
      <div className="tech-grid">
        {items.map(([name, Icon], i) => (
          <motion.div className="tech-pill" key={name} initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .04 }}>
            <Icon /><span>{name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Counter({ value, suffix }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to({ v: 0 }, {
        v: value,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate() { setN(Math.round(this.targets()[0].v)) },
      }),
    })
    return () => trigger.kill()
  }, [value])

  return <strong ref={ref}>{n}{suffix}</strong>
}

function Stats() {
  return (
    <section className="stats">
      {stats.map(([value, suffix, label]) => (
        <div key={label}><Counter value={value} suffix={suffix} /><span>{label}</span></div>
      ))}
    </section>
  )
}

export function Projects3DEffects({ config = projects3DConfig }) {
  const wrap = useRef(null)
  const reduce = useReducedMotion()
  const particles = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    left: `${5 + ((i * 19) % 90)}%`,
    top: `${9 + ((i * 31) % 78)}%`,
    delay: `${(i % 9) * .28}s`,
  })), [])
  const state = useRef({
    x: 0, y: 0, rx: 0, ry: 0, gx: 50, gy: 50, scroll: 0,
    tx: 0, ty: 0, trx: 0, try: 0, tgx: 50, tgy: 50, ts: 0,
    raf: 0,
  })

  useEffect(() => {
    const el = wrap.current
    if (!el || reduce) return
    const canMove = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)').matches
    const s = state.current
    const render = () => {
      s.x += (s.tx - s.x) * .09
      s.y += (s.ty - s.y) * .09
      s.rx += (s.trx - s.rx) * .08
      s.ry += (s.try - s.ry) * .08
      s.gx += (s.tgx - s.gx) * .12
      s.gy += (s.tgy - s.gy) * .12
      s.scroll += (s.ts - s.scroll) * .08
      el.style.setProperty('--proj-x', `${s.x}px`)
      el.style.setProperty('--proj-y', `${s.y}px`)
      el.style.setProperty('--proj-rx', `${s.rx}deg`)
      el.style.setProperty('--proj-ry', `${s.ry}deg`)
      el.style.setProperty('--proj-glow-x', `${s.gx}%`)
      el.style.setProperty('--proj-glow-y', `${s.gy}%`)
      el.style.setProperty('--proj-scroll', `${s.scroll}`)
      s.raf = requestAnimationFrame(render)
    }
    const move = (event) => {
      if (!canMove) return
      const rect = el.getBoundingClientRect()
      const px = ((event.clientX - rect.left) / rect.width - .5) * 2
      const py = ((event.clientY - rect.top) / rect.height - .5) * 2
      s.tx = px * 16
      s.ty = py * 10
      s.try = px * 5
      s.trx = py * -3
      s.tgx = ((event.clientX - rect.left) / rect.width) * 100
      s.tgy = ((event.clientY - rect.top) / rect.height) * 100
    }
    const leave = () => {
      s.tx = 0; s.ty = 0; s.trx = 0; s.try = 0; s.tgx = 50; s.tgy = 50
    }
    const scroll = () => {
      const rect = el.getBoundingClientRect()
      s.ts = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('mousemove', move)
    el.addEventListener('pointerleave', leave)
    el.addEventListener('mouseleave', leave)
    window.addEventListener('scroll', scroll, { passive: true })
    scroll()
    render()
    return () => {
      cancelAnimationFrame(s.raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('mousemove', move)
      el.removeEventListener('pointerleave', leave)
      el.removeEventListener('mouseleave', leave)
      window.removeEventListener('scroll', scroll)
    }
  }, [reduce])

  return (
    <div
      className="projects-3d-effects"
      ref={wrap}
      aria-hidden="true"
      style={{
        '--proj-cyan': config.colors.cyan,
        '--proj-blue': config.colors.blue,
        '--proj-violet': config.colors.violet,
        '--proj-opacity': config.opacity,
        '--proj-glow-opacity': config.glowOpacity,
        '--proj-back-speed': config.parallaxSpeed.back,
        '--proj-mid-speed': config.parallaxSpeed.mid,
        '--proj-front-speed': config.parallaxSpeed.front,
      }}
    >
      <div className="proj-layer proj-layer-back">
        <div className="proj-grid" />
        {config.enabledVisuals.particles && particles.map((p, i) => <span key={i} className="proj-particle" style={{ left: p.left, top: p.top, animationDelay: p.delay }} />)}
      </div>
      <div className="proj-layer proj-layer-mid">
        {config.enabledVisuals.codePanels && <div className="proj-float proj-code">
          <span className="proj-browser"><i /><i /><i /></span>
          <span className="proj-code-lines"><b /><b /><b /></span>
        </div>}
        {config.enabledVisuals.serverCloud && <div className="proj-float proj-server">
          <span className="proj-rack"><i /><i /><i /></span>
          <span className="proj-cloud" />
          <span className="proj-data-line" />
        </div>}
        {config.enabledVisuals.security && <div className="proj-float proj-secure">
          <span className="proj-shield" />
          <span className="proj-lock" />
          <span className="proj-path" />
        </div>}
        {config.enabledVisuals.devices && <div className="proj-float proj-devices">
          <span className="proj-monitor" />
          <span className="proj-router" />
          <span className="proj-printer" />
        </div>}
      </div>
      <div className="proj-layer proj-layer-front">
        <span className="proj-holo holo-one" />
        <span className="proj-holo holo-two" />
        <span className="proj-node node-one" />
        <span className="proj-node node-two" />
      </div>
      <div className="proj-cursor-glow" />
    </div>
  )
}

export function ProjectCard3D({ title, text, index, config = projects3DConfig }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const state = useRef({ rx: 0, ry: 0, scale: 1, lift: 0, trx: 0, try: 0, ts: 1, tl: 0, raf: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('is-visible')
        observer.disconnect()
      }
    }, { threshold: .05, rootMargin: '160px' })
    observer.observe(el)
    const revealTimer = setTimeout(() => el.classList.add('is-visible'), 650)

    const canTilt = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)').matches
    if (reduce || !canTilt) return () => {
      clearTimeout(revealTimer)
      observer.disconnect()
    }
    const s = state.current
    const render = () => {
      s.rx += (s.trx - s.rx) * .12
      s.ry += (s.try - s.ry) * .12
      s.scale += (s.ts - s.scale) * .1
      s.lift += (s.tl - s.lift) * .12
      el.style.transform = `translate3d(0, ${-s.lift}px, 0) rotateX(${s.rx}deg) rotateY(${s.ry}deg) scale(${s.scale})`
      s.raf = requestAnimationFrame(render)
    }
    const move = (event) => {
      const rect = el.getBoundingClientRect()
      const px = ((event.clientX - rect.left) / rect.width - .5) * 2
      const py = ((event.clientY - rect.top) / rect.height - .5) * 2
      s.try = px * config.cardMotion.rotateY
      s.trx = py * -config.cardMotion.rotateX
      s.ts = 1.018
      s.tl = config.cardMotion.lift
    }
    const leave = () => {
      s.trx = 0; s.try = 0; s.ts = 1; s.tl = 0
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    render()
    return () => {
      clearTimeout(revealTimer)
      cancelAnimationFrame(s.raf)
      observer.disconnect()
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [config.cardMotion.rotateX, config.cardMotion.rotateY, reduce])

  return (
    <article
      className="project-card"
      ref={ref}
      style={{ '--project-delay': `${index * .08}s` }}
    >
      <span>0{index + 1}</span>
      <div className="project-icon"><Network /></div>
      <h3>{title}</h3>
      <p>{text}</p>
      <a href="#contact">Discuss similar work <ArrowRight size={16} /></a>
    </article>
  )
}

function Projects() {
  const track = useRef(null)
  const section = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => gsap.to(track.current, {
        x: () => -(track.current.scrollWidth - window.innerWidth + 90),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${track.current.scrollWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      }))
    })
    return () => ctx.revert()
  }, [reduce])

  return (
    <section className="projects" id="projects" ref={section}>
      <Projects3DEffects />
      <div className="projects-intro">
        <Eyebrow>Projects</Eyebrow>
        <h2>Featured implementation examples.</h2>
        <p>Use these placeholders for real case studies, client stories, and before/after outcomes.</p>
      </div>
      <div className="project-track" ref={track}>
        {projects.map(([title, text], i) => (
          <ProjectCard3D key={title} title={title} text={text} index={i} />
        ))}
      </div>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  const quotes = [
    ['L5 helped us move from scattered tools to a reliable system our team can actually use every day.', 'Operations Manager', 'Business Systems Client'],
    ['The server deployment was clean, documented, and secure. Support after launch has been excellent.', 'Managing Director', 'Infrastructure Client'],
    ['They understand both the hardware side and the software side, which makes troubleshooting much faster.', 'Office Administrator', 'Managed IT Client'],
  ]

  return (
    <section className="section testimonials">
      <Reveal><Eyebrow>Testimonials</Eyebrow></Reveal>
      <div className="quote-wrap">
        <Quote />
        <motion.blockquote key={active} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>“{quotes[active][0]}”</motion.blockquote>
        <motion.div key={`${active}-author`} className="quote-author" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <strong>{quotes[active][1]}</strong>
          <span>{quotes[active][2]}</span>
        </motion.div>
        <div className="quote-nav">{quotes.map((_, i) => <button key={i} className={i === active ? 'active' : ''} onClick={() => setActive(i)} aria-label={`Show testimonial ${i + 1}`} />)}</div>
      </div>
    </section>
  )
}

export function Contact3DEffects({ config = contact3DConfig }) {
  const wrap = useRef(null)
  const reduce = useReducedMotion()
  const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    left: `${6 + ((i * 23) % 88)}%`,
    top: `${8 + ((i * 17) % 82)}%`,
    delay: `${(i % 7) * .34}s`,
  })), [])
  const state = useRef({
    x: 0, y: 0, rx: 0, ry: 0, gx: 50, gy: 45,
    tx: 0, ty: 0, trx: 0, try: 0, tgx: 50, tgy: 45,
    raf: 0,
  })

  useEffect(() => {
    const el = wrap.current
    if (!el || reduce) return
    const canMove = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)').matches
    const s = state.current
    const render = () => {
      s.x += (s.tx - s.x) * .09
      s.y += (s.ty - s.y) * .09
      s.rx += (s.trx - s.rx) * .08
      s.ry += (s.try - s.ry) * .08
      s.gx += (s.tgx - s.gx) * .12
      s.gy += (s.tgy - s.gy) * .12
      el.style.setProperty('--contact-x', `${s.x}px`)
      el.style.setProperty('--contact-y', `${s.y}px`)
      el.style.setProperty('--contact-rx', `${s.rx}deg`)
      el.style.setProperty('--contact-ry', `${s.ry}deg`)
      el.style.setProperty('--contact-glow-x', `${s.gx}%`)
      el.style.setProperty('--contact-glow-y', `${s.gy}%`)
      s.raf = requestAnimationFrame(render)
    }
    const move = (event) => {
      if (!canMove) return
      const rect = el.getBoundingClientRect()
      const px = ((event.clientX - rect.left) / rect.width - .5) * 2
      const py = ((event.clientY - rect.top) / rect.height - .5) * 2
      s.tx = px * config.motion.translate
      s.ty = py * config.motion.translate * .6
      s.try = px * config.motion.rotateY
      s.trx = py * -config.motion.rotateX
      s.tgx = ((event.clientX - rect.left) / rect.width) * 100
      s.tgy = ((event.clientY - rect.top) / rect.height) * 100
    }
    const leave = () => {
      s.tx = 0; s.ty = 0; s.trx = 0; s.try = 0; s.tgx = 50; s.tgy = 45
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('mousemove', move)
    el.addEventListener('pointerleave', leave)
    el.addEventListener('mouseleave', leave)
    render()
    return () => {
      cancelAnimationFrame(s.raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('mousemove', move)
      el.removeEventListener('pointerleave', leave)
      el.removeEventListener('mouseleave', leave)
    }
  }, [config.motion.rotateX, config.motion.rotateY, config.motion.translate, reduce])

  return (
    <div
      className="contact-3d-effects"
      ref={wrap}
      aria-hidden="true"
      style={{
        '--contact-cyan': config.colors.cyan,
        '--contact-blue': config.colors.blue,
        '--contact-violet': config.colors.violet,
        '--contact-opacity': config.opacity,
        '--contact-glow-opacity': config.glowOpacity,
      }}
    >
      <div className="contact-layer contact-layer-back">
        <div className="contact-grid" />
        {particles.map((p, i) => <span key={i} className="contact-particle" style={{ left: p.left, top: p.top, animationDelay: p.delay }} />)}
      </div>
      <div className="contact-layer contact-layer-mid">
        <span className="contact-shape envelope-shape" />
        <span className="contact-shape phone-shape" />
        <span className="contact-shape chat-shape" />
        <span className="contact-shape pin-shape" />
        <span className="contact-shape server-cubes"><i /><i /><i /></span>
        <span className="contact-line line-one" />
        <span className="contact-line line-two" />
      </div>
      <div className="contact-layer contact-layer-front">
        <span className="contact-node node-a" />
        <span className="contact-node node-b" />
        <span className="contact-node node-c" />
      </div>
      <div className="contact-cursor-glow" />
    </div>
  )
}

export function ContactInfoCard3D({ card, index }) {
  const Icon = card.icon
  return (
    <motion.article
      className={`contact-info-card ${card.image}`}
      initial={{ opacity: 0, y: 18, rotateX: -4 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: .55, delay: index * .06 }}
    >
      <Icon />
      <div>
        <strong>{card.label}</strong>
        <span>{card.text}</span>
      </div>
    </motion.article>
  )
}

export function ContactVisualPanel({ config = contact3DConfig }) {
  return (
    <Reveal className="contact-visual-panel" delay={.12}>
      <div className="contact-side-image-wrap">
        <img src={config.images.side.src} alt={config.images.side.alt} loading="lazy" decoding="async" />
      </div>
      <div className="contact-info-grid">
        {config.infoCards.map((card, index) => <ContactInfoCard3D key={card.label} card={card} index={index} />)}
      </div>
    </Reveal>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-shell">
        <img className="contact-hero-image" src={contact3DConfig.images.hero.src} alt={contact3DConfig.images.hero.alt} loading="lazy" decoding="async" />
        <Contact3DEffects />
        <div className="contact-glow" />
        <div className="contact-layout">
          <form onSubmit={(event) => event.preventDefault()}>
            <label><span>Your name</span><input type="text" placeholder="Your name" /></label>
            <label><span>Work email</span><input type="email" placeholder="you@company.com" /></label>
            <label><span>Service needed</span><input type="text" placeholder="Web app, server, network, support..." /></label>
            <label><span>Phone</span><input type="tel" placeholder="+966 ..." /></label>
            <label className="wide"><span>Project details</span><textarea placeholder="Briefly describe what you want to build, deploy, or support." rows="4" /></label>
            <button className="button primary" type="submit">Get a Consultation <ArrowRight size={18} /></button>
          </form>
          <Reveal className="contact-copy">
            <Eyebrow>Contact Us</Eyebrow>
            <h2>Ready to build, deploy, or support your next IT solution?</h2>
            <p>Tell us what you need. L5 can help scope the right approach for your web application, server, network, security, hardware, or managed support requirement.</p>
            <ContactVisualPanel />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <a className="brand" href="#top"><LogoImage compact /><span>L5<small>Innovative IT Solutions</small></span></a>
          <p>Build • Deploy • Support</p>
        </div>
        <div><span>Navigation</span>{navItems.slice(1).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
        <div><span>Services</span><a href="#services">Web Applications</a><a href="#services">Servers & Cloud</a><a href="#services">Networking & Security</a><a href="#services">Managed Support</a></div>
        <div><span>Company</span><p>L5 Innovative IT Solutions<br />Reliable technology solutions for modern businesses.</p><a href="mailto:hello@l5innovative.com">hello@l5innovative.com</a></div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 L5 Innovative IT Solutions. All rights reserved.</span>
        <span className="system"><i /> Systems ready</span>
      </div>
    </footer>
  )
}

function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const move = (event) => gsap.to(ref.current, { x: event.clientX, y: event.clientY, duration: .45, ease: 'power3.out' })
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return <div className="cursor-glow" ref={ref} />
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [reduce])

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Navbar />
      <main>
        <Hero3DBanner
          image={banner}
          title="Innovative IT Solutions"
          subtitle="Build • Deploy • Support"
          description="Reliable technology solutions for modern businesses."
          primaryButtonText="Get a Consultation"
          secondaryButtonText="Explore Services"
        />
        <About />
        <Services />
        <Solutions />
        <TechStack />
        <Stats />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      {!reduce && <CursorGlow />}
    </>
  )
}
