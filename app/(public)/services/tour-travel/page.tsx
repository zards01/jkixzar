"use client"

import { motion, AnimatePresence } from "framer-motion"
import Particles from "@/components/Particles"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

/* ================= TYPE KHUSUS QUERY ================= */
type ProjectGalleryRow = {
  gallery: string[] | null
  category_id: string
}

export default function TourTravelPage() {

  /* ================= GALLERY STATE ================= */
  const [gallery, setGallery] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  /* ================= FETCH (FILTER TOUR) ================= */
  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true)

      const { data } = await supabase
        .from("projects")
        .select("gallery, category_id")
        .eq("category_id", "271c01c4-55eb-4a3b-8f5c-798eb960ee5f")
        .order("created_at", { ascending: false })

      if (data) {
        const images = (data as ProjectGalleryRow[])
          .flatMap((item) => item.gallery ?? [])
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
          src="/image/eo.jpeg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
        <div className="absolute inset-0 opacity-30">
          <Particles />
        </div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Tour & Travel{" "}
            <span className="text-orange-500">Experience</span>
          </h1>

          <p className="mt-4 text-zinc-300">
            Make Your Dream Adventure Come True
          </p>

          <a
            href="https://wa.me/6285183113349"
            className="inline-block mt-8 px-8 py-3 rounded-full bg-orange-500 hover:shadow-[0_0_30px_rgba(255,120,0,0.7)] transition"
          >
            Konsultasi Sekarang
          </a>
        </div>

      </section>

      {/* ================= INTRO ================= */}
      <section className="relative py-20 px-6 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,120,0,0.08),transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Perjalanan yang{" "}
            <span className="text-orange-500">Tak Terlupakan</span>
          </h2>

          <p className="text-zinc-400 leading-relaxed">
            Di Juragan Kreasi Indonesia, kami mengundang Anda untuk merayakan keindahan dunia melalui layanan tour and travel kami yang dipenuhi dengan petualangan, keajaiban, dan kenangan yang tak terlupakan.
          </p>

          <p className="text-zinc-400 mt-4">
            Kami menempatkan pengalaman pelanggan sebagai prioritas utama, memastikan setiap perjalanan menjadi kisah yang luar biasa.
          </p>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            Travel <span className="text-orange-500">Services</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Open Trip",
                desc: "Perjalanan seru bersama peserta lain dengan harga terjangkau.",
              },
              {
                title: "Private Trip",
                desc: "Liburan eksklusif bersama keluarga atau tim sesuai kebutuhan.",
              },
              {
                title: "Corporate Trip",
                desc: "Perjalanan perusahaan, outing, gathering, dan incentive trip.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-zinc-400 text-sm mt-2">{item.desc}</p>
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
              Travel <span className="text-orange-500">Gallery</span>
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

      {/* ================= CTA ================= */}
      <section className="py-20 text-center bg-gradient-to-b from-black to-zinc-900">
        <h2 className="text-4xl font-bold">
          Siap Jelajahi Dunia{" "}
          <span className="text-orange-500">Bersama Kami?</span>
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
