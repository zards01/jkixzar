"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Project = {
  id: string
  gallery: string[] | null
}

export default function EventOrganizerPage() {

  /* ================= EVENT DATA ================= */
  const events = [
    { title: "Wedding Organizer", img: "/image/wo.jpeg" },
    { title: "Gathering / Outing", img: "/image/Outbound.jpg" },
    { title: "Concert", img: "/image/konser.jpeg" },
    { title: "Seminar / Conference", img: "/image/seminar.jpeg" },
    { title: "Birthday Party", img: "/image/eo.jpeg" },
    { title: "Product Launch", img: "/image/laucing.jpeg" },
  ]

  /* ================= STATE ================= */
  const [gallery, setGallery] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  /* ================= FETCH GALLERY ================= */
  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true)

      const { data } = await supabase
        .from("projects")
        .select("id, gallery")
        .order("created_at", { ascending: false })

      if (data) {
        const allImages = data
          .flatMap((item: Project) => item.gallery || [])
          .filter(Boolean)

        setGallery(allImages)
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

  /* ================= SIDE PREVIEW ================= */
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
      <section className="relative min-h-[75vh] flex items-center justify-center text-center px-6">

        <img
          src="/image/eo.jpeg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-bold">
            Event Organizer <span className="text-orange-500">Profesional</span>
          </h1>

          <p className="text-zinc-300 mt-4">
            Dari konsep hingga eksekusi, kami memastikan setiap event berjalan sempurna.
          </p>

          <a
            href="https://wa.me/6285183113349"
            className="inline-block mt-8 px-8 py-3 rounded-full bg-orange-500 hover:shadow-[0_0_30px_rgba(255,120,0,0.7)] transition"
          >
            Konsultasi Sekarang
          </a>
        </div>

      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-24 px-6 bg-zinc-950">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              Event <span className="text-orange-500">Solutions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {events.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/70 hover:border-orange-500/40 hover:shadow-[0_0_40px_rgba(255,120,0,0.2)] transition"
              >

                <div className="h-[220px] overflow-hidden">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>

                  <div className="flex gap-3 mt-6">

                    <a
                      href="https://wa.me/6285183113349"
                      className="px-4 py-2 text-sm rounded-full bg-orange-500 hover:shadow-[0_0_20px_rgba(255,120,0,0.6)] transition"
                    >
                      Book Now
                    </a>

                    <a
                      href="https://wa.me/6285183113349"
                      className="px-4 py-2 text-sm rounded-full border border-zinc-700 hover:border-orange-500 hover:text-orange-400 transition"
                    >
                      Cek Harga
                    </a>

                  </div>
                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-24 px-6 bg-black">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">
              Galeri <span className="text-orange-500">Project</span>
            </h2>
          </div>

          {loading && (
            <p className="text-center text-zinc-400">Loading gallery...</p>
          )}

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

          {/* DOT */}
          <div className="flex justify-center gap-3 mt-10">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  index === i ? "bg-orange-500" : "bg-zinc-600"
                }`}
              />
            ))}
          </div>

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
              key={gallery[index]}
              src={gallery[index]}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-h-[85vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* CLOSE */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              ✕
            </button>

            {/* PREV */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIndex((prev) =>
                  prev === 0 ? gallery.length - 1 : prev - 1
                )
              }}
              className="absolute left-6 text-3xl text-white"
            >
              ‹
            </button>

            {/* NEXT */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIndex((prev) =>
                  prev === gallery.length - 1 ? 0 : prev + 1
                )
              }}
              className="absolute right-6 text-3xl text-white"
            >
              ›
            </button>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CTA ================= */}
      <section className="py-24 text-center bg-gradient-to-b from-black to-zinc-900">

        <h2 className="text-4xl font-bold">
          Siap Buat Event <span className="text-orange-500">Berkesan?</span>
        </h2>

        <a
          href="https://wa.me/6285183113349"
          className="inline-block mt-8 px-8 py-4 rounded-full bg-orange-500 hover:shadow-[0_0_30px_rgba(255,120,0,0.7)] transition"
        >
          Booking Sekarang
        </a>

      </section>

    </main>
  )
}