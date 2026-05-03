"use client"

import { motion, AnimatePresence } from "framer-motion"
import Particles from "@/components/Particles"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

/* ================= TYPES ================= */
type ProjectRow = {
  gallery: string[] | null
  category_id: string
}

export default function PhotoVideoPage() {

  /* ================= GALLERY STATE ================= */
  const [gallery, setGallery] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true)

      const { data } = await supabase
        .from("projects")
        .select("gallery, category_id")
        .eq("category_id", "0b115848-97b2-460c-8266-d6d60184d42c")

      if (data) {
        const images = (data as ProjectRow[])
          .flatMap((item) => item.gallery ?? [])

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

  const getSideImages = () => {
    if (gallery.length === 0) return []
    return [1, 2, 3].map(
      (i) => gallery[(index + i) % gallery.length]
    )
  }

  const sideImages = getSideImages()

  return (
    <main className="bg-black text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center px-6">

        <img
          src="/image/photo-video.png"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

        <div className="absolute inset-0 opacity-30">
          <Particles />
        </div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold">
            Photo &{" "}
            <span className="text-orange-500">
              Videographer
            </span>
          </h1>

          <p className="mt-4 text-zinc-300">
            Capture Every Moment with Cinematic Quality
          </p>

          <a
            href="https://wa.me/6285183113349"
            className="inline-block mt-8 px-8 py-3 rounded-full bg-orange-500 hover:shadow-[0_0_30px_rgba(255,120,0,0.7)] transition"
          >
            Book Now
          </a>
        </div>

      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-24 px-6 bg-black">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl text-center font-bold mb-12">
            Photo & Video{" "}
            <span className="text-orange-500">
              Gallery
            </span>
          </h2>

          {!loading && gallery.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">

              {/* MAIN */}
              <div className="relative h-[420px] rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={gallery[index]}
                    src={gallery[index]}
                    onClick={() => setLightboxOpen(true)}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </AnimatePresence>
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
                    className="h-[130px] rounded-xl overflow-hidden cursor-pointer"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover hover:scale-110 transition"
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
