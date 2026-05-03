"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl "
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <img src="/D LOGO JKI.png" className="h-8" alt="logo" />
            <span className="font-semibold text-white">
              JURAGAN
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-8 text-sm text-zinc-300">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-orange-500 transition"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* DESKTOP CTA */}
          <a
            href="https://wa.me/6285183113349"
            target="_blank"
            className="hidden md:block bg-orange-500 px-5 py-2 rounded-full text-sm hover:bg-orange-600 transition"
          >
            Konsultasi
          </a>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white z-50"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE SLIDE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Slide Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="
                fixed top-0 right-0 h-full w-[80%] max-w-sm
                bg-black/80 backdrop-blur-2xl
              
                z-50
                p-6
              "
            >
              {/* Close Button */}
              <div className="flex justify-end mb-10">
                <button onClick={() => setMenuOpen(false)}>
                  <X size={28} className="text-white" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col gap-6 text-lg">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-zinc-300 hover:text-orange-500 transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <a
                href="https://wa.me/6285183113349"
                target="_blank"
                className="
                  block mt-10 text-center
                  bg-orange-500 px-5
                  py-3 rounded-full
                  hover:bg-orange-600
                  transition
                "
              >
                Konsultasi Sekarang
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}