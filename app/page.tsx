"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Heart, Search, ShoppingCart, User, ChevronLeft, ChevronRight, Truck, Gift, Shield, Users, Menu, X } from "lucide-react"

// Announcement Bar Component with infinite scroll
function AnnouncementBar() {
  const announcements = [
    { icon: Truck, text: "Free Worldwide Shipping" },
    { icon: Gift, text: "New Customers Save 30%" },
    { icon: Shield, text: "Duty-Free Shopping" },
    { icon: Users, text: "20,000+ Happy Customers" },
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

  const navItems = ["Home", "Shop", "About Us", "Contact Us"]

  return (
    <>
      {/* Placeholder to detect scroll position and maintain layout when nav becomes fixed */}
      <div ref={placeholderRef} className={isSticky ? "h-14 md:h-16" : "h-0"} />
      <nav
        ref={navRef}
        className={`${isSticky ? "fixed top-0 left-0 right-0" : "relative"} z-50 transition-all duration-300 ${isSticky ? "bg-background/95 backdrop-blur-xl shadow-lg" : "bg-background"
          }`}
      >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-1 md:py-2 flex items-center justify-between">
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

// Hero Section with parallax and responsive banner images
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const images = [
    "/网站素材/Banner/1.jpg",
    "/网站素材/Banner/2.jpg"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [currentSlide])

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)

  return (
    <section ref={containerRef} className="relative w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-8">
      <div 
        className="relative overflow-hidden h-[45vh] sm:h-[60vh] md:h-[70vh] lg:h-[78vh] w-full rounded-xl md:rounded-2xl border border-border/40 bg-secondary/20 isolate"
        style={{ transform: "translate3d(0, 0, 0)", WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
      >
        
        {/* Parallax image container */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={images[currentSlide]}
              alt={`Premium Kitchen Appliance Banner ${currentSlide + 1}`}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </motion.div>

        {/* Elegant vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none" />

        {/* Glassmorphic Arrows */}
        <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/15 text-white shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-colors pointer-events-auto cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/15 text-white shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-colors pointer-events-auto cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </div>

        {/* Minimalist Progress Indicators */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="h-3 flex items-center group relative cursor-pointer"
            >
              <div
                className="h-1 rounded-full bg-white/25 transition-all duration-300 relative overflow-hidden"
                style={{ width: currentSlide === i ? "48px" : "16px" }}
              >
                {currentSlide === i && (
                  <motion.div
                    key={currentSlide}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute top-0 left-0 bottom-0 bg-white"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
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
            Add to Cart
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
          description="Curated premium appliances bringing convenience and elegance to your kitchen."
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
          className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-border/40"
        >
          <img
            src="/网站素材/1.jpg"
            alt="Featured collection"
            className="w-full h-[300px] md:h-[450px] object-cover"
          />
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
    { name: "Stand Mixers", image: "/网站素材/Stand mixer/1570ML/1570bm (5).png" },
    { name: "Efficient Grinders", image: "/网站素材/grinder/3405.1322.png" },
    { name: "Light Egg Beaters", image: "/网站素材/egg beater/3040.17.png" },
  ]

  return (
    <section ref={ref} className="py-12 md:py-24 px-4 md:px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle="Product Categories"
          title="Shop by Category"
          description="Browse our curated collections to find the perfect kitchen appliance for your needs."
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
            <h3 className="text-xl md:text-2xl font-serif font-bold"></h3>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
              15 years of European market expertise, delivering premium, value-driven smart appliances globally.
            </p>
          </motion.div>

          {[
            { title: "Categories", links: ["Stand Mixers", "Food Processors", "Grinders", "Hand Mixers"] },
            { title: "Customer Service", links: ["Contact Us", "Shipping Info", "Returns", "FAQs"] },
            { title: "About Us", links: ["Our Story", "News & Updates", "Careers", "Privacy Policy"] },
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
            © 2024  TRADE LIMITED. All rights reserved.
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
    { name: "Milk Frother", image: "/网站素材/1（milk frother）.png" },
    { name: "FUFU", image: "/网站素材/2（FUFU）.png"},
    { name: "Juicer", image: "/网站素材/3（juicer）.png" },
    { name: "Centrifugal Juicer", image: "/网站素材/4（Centrifugal juicer）.png" },
  ]

  const newArrivalProducts = [
    { name: "Hand Mixer", image: "/网站素材/egg beater/HM-3052.png"},
    { name: "Smart Grinder", image: "/网站素材/grinder/3402.1661.png"},
    { name: "Portable Mixer", image: "/网站素材/egg beater/HM-3041.png"},
    { name: "Supreme Grinder", image: "/网站素材/grinder/3453.1759.png"},
  ]

  return (
    <main className="min-h-screen overflow-x-hidden">
      <AnnouncementBar />
      <Navigation />
      <HeroSection />
      <ProductsSection
        title="Best Sellers"
        subtitle="Hot Recommendations"
        products={bestSellerProducts}
      />
      <FeaturedBanner />
      <CategoryGrid />
      <ProductsSection
        title="New Arrivals"
        subtitle="Latest Collections"
        products={newArrivalProducts}
      />
      <Footer />
    </main>
  )
}
