"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Heart, Search, ShoppingCart, User, ChevronLeft, ChevronRight, Truck, Gift, Shield, Users, ArrowRight, Menu, X } from "lucide-react"

// Announcement Bar Component with infinite scroll
function AnnouncementBar() {
  const announcements = [
    { icon: Truck, text: "全球免费配送" },
    { icon: Gift, text: "新客户享30%折扣" },
    { icon: Shield, text: "免税购物" },
    { icon: Users, text: "20,000+ 满意客户" },
  ]

  return (
    <div className="bg-primary text-primary-foreground py-2.5 overflow-hidden">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 md:gap-16 whitespace-nowrap"
      >
        {[...announcements, ...announcements, ...announcements, ...announcements].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs md:text-sm">
            <item.icon className="w-3 h-3 md:w-4 md:h-4" />
            <span>{item.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// Navigation Component
function Navigation() {
  const [isSticky, setIsSticky] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (placeholderRef.current) {
        const placeholderTop = placeholderRef.current.getBoundingClientRect().top
        setIsSticky(placeholderTop <= 0)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = ["首页", "商店", "关于我们", "联系我们"]

  return (
    <>
      {/* Placeholder to detect scroll position and maintain layout when nav becomes fixed */}
      <div ref={placeholderRef} className={isSticky ? "h-14 md:h-16" : "h-0"} />
      <nav
        ref={navRef}
        className={`${isSticky ? "fixed top-0 left-0 right-0" : "relative"} z-50 transition-all duration-300 ${isSticky ? "bg-background/95 backdrop-blur-xl shadow-lg" : "bg-background"
          }`}
      >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        {/* Left icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <Heart className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href="#"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative text-sm font-medium tracking-wide group"
              whileHover={{ y: -2 }}
            >
              {item}
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-secondary rounded-full transition-colors hidden md:flex"
          >
            <User className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-secondary rounded-full transition-colors relative"
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-primary text-primary-foreground text-[10px] md:text-xs rounded-full flex items-center justify-center">
              0
            </span>
          </motion.button>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-secondary rounded-full transition-colors md:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="block py-2 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  )
}

// Hero Section with parallax and responsive carousel
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const slides = [
    {
      title: "强大",
      subtitle: "灵活",
      accent: "超值",
      description: "为您的生活空间带来极致体验",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    },
    {
      title: "精致",
      subtitle: "优雅",
      accent: "品质",
      description: "每一个细节都彰显匠心工艺",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    },
    {
      title: "创新",
      subtitle: "智能",
      accent: "便捷",
      description: "科技与美学的完美融合",
      image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=80",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section ref={containerRef} className="relative min-h-[75vh] md:min-h-[80vh] overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 bg-secondary" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-16 lg:py-20 h-full">
        {/* Mobile Layout: Text on top, Image below */}
        <div className="flex flex-col md:grid md:grid-cols-5 gap-6 md:gap-8 lg:gap-12 items-center h-full">

          {/* Content - First on mobile, left on desktop (2 columns) */}
          <div className="space-y-4 md:space-y-6 order-1 text-center md:text-left md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-1 md:space-y-2"
              >
                {/* Layered typography for hierarchy */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground"
                >
                  精选系列
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, x: -30, rotateX: 45 }}
                  animate={{ opacity: 1, x: 0, rotateX: 0 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-none"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl md:text-3xl lg:text-4xl font-serif text-muted-foreground leading-none"
                >
                  {slides[currentSlide].subtitle}
                </motion.h2>

                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-xl md:text-2xl lg:text-3xl font-serif font-medium text-primary leading-none"
                >
                  {slides[currentSlide].accent}
                </motion.span>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="text-xs md:text-sm text-muted-foreground pt-2 md:pt-4 max-w-xs mx-auto md:mx-0"
                >
                  {slides[currentSlide].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-primary text-primary-foreground px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-medium flex items-center gap-2 mx-auto md:mx-0 overflow-hidden relative text-sm"
            >
              <span className="relative z-10">查看促销商品</span>
              <motion.div
                className="absolute inset-0 bg-foreground"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Slide indicators */}
            <div className="flex justify-center md:justify-start gap-3 pt-2 md:pt-4">
              {slides.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="flex items-center gap-1.5"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-[10px] md:text-xs font-medium text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <motion.div
                    className="h-0.5 bg-foreground rounded-full"
                    initial={{ width: 20 }}
                    animate={{
                      width: currentSlide === i ? 36 : 20,
                      opacity: currentSlide === i ? 1 : 0.3
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Image - Second on mobile, right on desktop (3 columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full order-2 md:col-span-3"
          >
            <motion.div
              className="relative rounded-2xl md:rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={slides[currentSlide].image}
                  alt="Premium interior"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-[50vh] md:h-[58vh] object-cover"
                />
              </AnimatePresence>

              {/* Floating elements - Hidden on mobile */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="hidden lg:block absolute top-10 right-10 w-20 h-20 bg-accent/30 backdrop-blur-md rounded-2xl"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="hidden lg:block absolute bottom-10 left-10 w-16 h-16 bg-primary/20 backdrop-blur-md rounded-full"
              />


            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Navigation Arrows - Inside image on all screens */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 md:px-4">
        <motion.button
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      </div>
    </section>
  )
}

// Section Header Component
function SectionHeader({ subtitle, title, description }: { subtitle: string; title: string; description: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="text-center max-w-2xl mx-auto mb-10 md:mb-16 space-y-3 md:space-y-4 px-4">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase text-muted-foreground"
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold">{title}</h2>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.08 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-primary whitespace-nowrap pointer-events-none"
        >
          {title}
        </motion.span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-sm md:text-base text-muted-foreground leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  )
}

// Product Card Component with enhanced animations
function ProductCard({
  name,
  category,
  image,
  price,
  originalPrice,
  badge,
  delay = 0
}: {
  name: string
  category: string
  image: string
  price: string
  originalPrice?: string
  badge?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <motion.div
        className="relative overflow-hidden rounded-xl md:rounded-2xl bg-card mb-3 md:mb-4 aspect-square"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: delay + 0.3 }}
            className="absolute top-3 left-3 z-10 px-2 md:px-3 py-1 bg-accent text-accent-foreground text-[10px] md:text-xs font-medium rounded-full"
          >
            {badge}
          </motion.div>
        )}

        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
        />

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent flex items-end justify-center pb-4 md:pb-6"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 bg-background text-foreground px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-xs md:text-sm shadow-lg"
          >
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
            加入购物车
          </motion.button>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          className="absolute top-3 right-3 flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
        >
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 md:w-10 md:h-10 bg-background rounded-full flex items-center justify-center shadow-md"
          >
            <Heart className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.3 }}
        className="text-center space-y-1"
      >
        <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">{category}</p>
        <h3 className="font-semibold text-sm md:text-lg group-hover:text-primary transition-colors">{name}</h3>
        <div className="flex items-center justify-center gap-2">
          <span className="font-bold text-sm md:text-base text-primary">{price}</span>
          {originalPrice && (
            <span className="text-xs md:text-sm text-muted-foreground line-through">{originalPrice}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Products Section with Masonry-like layout
function ProductsSection({ title, subtitle, products }: {
  title: string
  subtitle: string
  products: Array<{
    name: string
    category: string
    image: string
    price: string
    originalPrice?: string
    badge?: string
  }>
}) {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle={subtitle}
          title={title}
          description="精心挑选的高品质厨房电器，为您的生活带来便利与品质。"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.name} {...product} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Featured Banner Section
function FeaturedBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-8 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80"
            alt="Featured collection"
            className="w-full h-[300px] md:h-[450px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="px-6 md:px-16 max-w-lg space-y-3 md:space-y-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs md:text-sm font-medium rounded-full"
              >
                限时特惠
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-background"
              >
                全新系列
                <br />
                智���厨电
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="text-background/80 text-sm md:text-base hidden md:block"
              >
                探索我们最新推出的智能厨房电器系列，让烹饪���得更加轻松愉快。
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-background text-foreground px-5 md:px-8 py-2.5 md:py-3 rounded-full font-medium flex items-center gap-2 text-sm md:text-base"
              >
                立即选购
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Category Grid Section
function CategoryGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const categories = [
    { name: "搅拌机", count: "24 款产品", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80" },
    { name: "料理机", count: "18 款产品", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80" },
    { name: "食品加工机", count: "12 款产品", image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=600&q=80" },
  ]

  return (
    <section ref={ref} className="py-12 md:py-24 px-4 md:px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle="产品分类"
          title="按类别选购"
          description="浏览我们精心分类的产品系列，找到最适合您需求的厨房电器。"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer"
            >
              <motion.img
                src={category.image}
                alt={category.name}
                className="w-full h-[200px] md:h-[300px] object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-lg md:text-2xl font-serif font-bold text-background mb-1">{category.name}</h3>
                <p className="text-background/70 text-xs md:text-sm">{category.count}</p>
              </div>
              <motion.div
                className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-xl md:rounded-2xl transition-colors duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <footer ref={ref} className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="col-span-2 md:col-span-1 space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-serif font-bold">REECON</h3>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
              Reecon Poland 拥有15年的欧洲市场经验，垂直整合制造，为全球消费者提供高品质、高性价比的智能家居电器。
            </p>
          </motion.div>

          {[
            { title: "产品分类", links: ["搅拌机", "料理机", "食品加工机", "手持搅拌机"] },
            { title: "客户服务", links: ["联系我们", "配送信息", "退换货政策", "常见问题"] },
            { title: "关于我们", links: ["品牌故事", "新闻动态", "加入我们", "隐私政策"] },
          ].map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
            >
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">{section.title}</h4>
              <ul className="space-y-2 md:space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors text-xs md:text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-border mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
            2024 REECON TRADE LIMITED 版权所有
          </p>
          <div className="flex gap-3 md:gap-4">
            {["VISA", "MC", "PayPal", "AMEX"].map((card) => (
              <motion.div
                key={card}
                whileHover={{ y: -3 }}
                className="w-10 h-6 md:w-12 md:h-8 bg-secondary rounded flex items-center justify-center text-[10px] md:text-xs font-medium"
              >
                {card}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function HomePage() {
  const bestSellerProducts = [
    { name: "Pro Blender B03", category: "搅拌机", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80", price: "¥1,299", originalPrice: "¥1,599", badge: "热卖" },
    { name: "Smart Mixer B06", category: "搅拌机", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80", price: "¥1,899", badge: "新品" },
    { name: "Power Blend R25", category: "搅拌机", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80", price: "¥2,199" },
    { name: "Chef Pro E01", category: "食品加工机", image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=600&q=80", price: "¥1,499", originalPrice: "¥1,899", badge: "-20%" },
  ]

  const newArrivalProducts = [
    { name: "手持搅拌机 SM-2545", category: "手持搅拌机", image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80", price: "¥599", badge: "新品" },
    { name: "多功能料理机 SM-2544", category: "料理机", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80", price: "¥1,699" },
    { name: "迷你搅拌机 SM-2543", category: "小型厨房电器", image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=600&q=80", price: "¥399", originalPrice: "¥499" },
    { name: "专业料理套装 SM-2542", category: "料理机组合", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", price: "¥2,999", badge: "限量" },
  ]

  return (
    <main className="min-h-screen overflow-x-hidden">
      <AnnouncementBar />
      <Navigation />
      <HeroSection />
      <ProductsSection
        title="畅销产品"
        subtitle="热门推荐"
        products={bestSellerProducts}
      />
      <FeaturedBanner />
      <CategoryGrid />
      <ProductsSection
        title="新品上市"
        subtitle="最新系列"
        products={newArrivalProducts}
      />
      <Footer />
    </main>
  )
}
