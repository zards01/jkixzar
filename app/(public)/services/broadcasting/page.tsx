"use client"

import { motion, AnimatePresence } from "framer-motion"
import Particles from "@/components/Particles"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase"

// 🔥 TYPE KHUSUS (SESUAI QUERY)
type ProjectGallery = {
  gallery: string[] | null
}

export default function BroadcastingPage() {
  const ref = useRef(null)

  /* ================= STATE ================= */
  const [gallery, setGallery] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("projects")
        .select("gallery")
        .eq("category_id", "09c9a8ba-4da7-4091-866f-b4a0a2159a5b")
        .order("created_at", { ascending: false })

      if (error) {
        console.log(error)
        setLoading(false)
        return
      }

      if (data) {
        const images = (data as ProjectGallery[])
          .flatMap((item) => item.gallery || [])
          .filter(Boolean)

        setGallery(images)
      }

      setLoading(false)
    }

    fetchGallery()
  }, [])

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (gallery.length === 0) return

    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === gallery.length - 1 ? 0 : prev + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [gallery])

  /* ================= LOCK SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "auto"
  }, [lightboxOpen])

  /* ================= SIDE IMAGE SAFE ================= */
  const sideImages =
    gallery.length > 0
      ? [1, 2, 3].map((i) => gallery[(index + i) % gallery.length])
      : []

  return (
    <main className="bg-black text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section
        ref={ref}
        className="relative flex items-center justify-center min-h-[80vh]"
      >
        <div className="absolute inset-0">
          <img
            src="/image/multicam.png"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

        <div className="absolute inset-0 opacity-30">
          <Particles />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold">
            Broadcasting <span className="text-orange-500">Production</span>
          </h1>

          <p className="mt-4 text-zinc-300">
            Produksi live streaming dan broadcast event profesional
            dengan kualitas visual terbaik dan sistem yang stabil.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a
              href="https://wa.me/6285183113349"
              target="_blank"
              className="bg-orange-500 px-6 py-3 rounded-full"
            >
              Konsultasi Sekarang
            </a>

            <Link
              href="/"
              className="border border-zinc-600 px-6 py-3 rounded-full"
            >
              Kembali
            </Link>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">
              Broadcasting <span className="text-orange-500">Gallery</span>
            </h2>
          </div>

          {loading && (
            <p className="text-center text-zinc-400">
              Loading gallery...
            </p>
          )}

          {!loading && gallery.length === 0 && (
            <p className="text-center text-zinc-500">
              Belum ada gallery
            </p>
          )}

          {!loading && gallery.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">

              {/* MAIN */}
              <div className="relative h-[420px] rounded-2xl overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={gallery[index]}
                    src={gallery[index]}
                    onClick={() => setLightboxOpen(true)}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition duration-700"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* SIDE */}
              <div className="flex flex-col gap-4">
                {sideImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setIndex((index + i + 1) % gallery.length)
                      setLightboxOpen(true)
                    }}
                    className="h-[130px] rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </section>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <motion.img
              src={gallery[index]}
              className="max-h-[85vh] max-w-[90vw]"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}
