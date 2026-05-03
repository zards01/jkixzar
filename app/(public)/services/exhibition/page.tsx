

"use client"

import { motion, AnimatePresence } from "framer-motion"
import Particles from "@/components/Particles"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useRef, useEffect, useState } from "react"

export default function ExhibitionProductionPage() {

  const ref = useRef(null)
/* ================= GALLERY STATE ================= */
const [gallery, setGallery] = useState<string[]>([])
const [index, setIndex] = useState(0)
const [loading, setLoading] = useState(true)
const [lightboxOpen, setLightboxOpen] = useState(false)

/* ================= FETCH EXHIBITION ONLY ================= */
useEffect(() => {
  const fetchGallery = async () => {
    setLoading(true)

    const { data } = await supabase
  .from("projects")
  .select("gallery")
  .eq("category_id", "36fc72a7-5249-48f3-8180-82aa69009079") // 🔥 FIX
  .order("created_at", { ascending: false })

    if (data) {
  const images = data
    .flatMap((item: any) => item.gallery || [])
    .filter(Boolean)

  console.log("GALLERY:", images) // 🔥 debug

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

/* ================= SIDE IMAGE ================= */
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
      <section
        ref={ref}
        className="relative flex items-center justify-center min-h-[80vh] overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/image/booth-custom.png"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

        {/* Particles */}
        <div className="absolute inset-0 opacity-30">
          <Particles />
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Exhibition{" "}
            <span className="text-orange-500">Production</span>
          </h1>

          <p className="mt-4 text-zinc-300">
            Perencanaan, desain, dan eksekusi pameran secara menyeluruh
            dengan kualitas profesional dan hasil maksimal.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a
              href="https://wa.me/6285183113349"
              target="_blank"
              className="bg-orange-500 px-6 py-3 rounded-full hover:shadow-[0_0_25px_rgba(255,140,0,0.6)]"
            >
              Konsultasi Sekarang
            </a>

            <Link
              href="/"
              className="border border-zinc-900 px-6 py-3 rounded-full hover:shadow-[0_0_25px_rgba(255,140,0,0.6)]"
            >
              Kembali
            </Link>
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="relative py-20 px-6 bg-black">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,120,0,0.08),transparent_60%)]" />

        <div className="relative max-w-5xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tentang <span className="text-orange-500">Layanan Ini</span>
          </h2>

          <p className="text-zinc-400 leading-relaxed">
            Exhibition Production adalah layanan yang berfokus pada perencanaan,
            desain, dan pelaksanaan pameran secara menyeluruh.
          </p>

          <p className="text-zinc-400 mt-4">
            Kami memahami bahwa setiap pameran memiliki karakter unik, sehingga
            setiap detail kami sesuaikan untuk menciptakan hasil maksimal sesuai
            identitas brand Anda.
          </p>

        </div>
      </section>

{/* ================= BOOTH SIZE ================= */}
<section className="relative py-20 px-6 bg-zinc-950 overflow-hidden">

  {/* glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.08),transparent_70%)]" />

  <div className="relative max-w-6xl mx-auto">

    <div className="text-center mb-14">
      <h2 className="text-4xl font-bold">
        Pilihan <span className="text-orange-500">Ukuran Booth</span>
      </h2>

      <p className="text-zinc-400 mt-3">
        Fleksibel sesuai kebutuhan brand dan konsep exhibition Anda
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      {[
        {
          title: "Booth 3x3",
          img: "/image/booth-3x3.png",
          desc: "Ukuran standar yang cocok untuk brand activation, promosi produk, dan exhibition skala menengah.",
        },
        {
          title: "Booth 3x5",
          img: "/image/booth-3x5.png",
          desc: "Area lebih luas untuk pengalaman interaktif, display produk lebih banyak, dan branding maksimal.",
        },
        {
          title: "Custom Booth",
          img: "/image/booth-custom.png",
          desc: "Desain dan ukuran fleksibel sesuai kebutuhan brand untuk menciptakan pengalaman yang unik dan eksklusif.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          whileHover={{ y: -10 }}
          className="
            group rounded-2xl overflow-hidden
            bg-zinc-900/80 backdrop-blur-xl
            border border-zinc-800
            hover:border-orange-500/40
            hover:shadow-[0_0_40px_rgba(255,120,0,0.2)]
            transition
          "
        >

          {/* IMAGE */}
          <div className="h-[220px] overflow-hidden">
            <img
              src={item.img}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
          </div>

          {/* CONTENT */}
          <div className="p-6">

            <h3 className="text-lg font-semibold">
              {item.title}
            </h3>

            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              {item.desc}
            </p>

            {/* CTA kecil */}
            <a
              href="https://wa.me/6285183113349"
              className="
                inline-block mt-6 text-sm
                text-orange-500 hover:text-orange-400
              "
            >
              Konsultasi →
            </a>

          </div>

        </motion.div>
      ))}

    </div>

  </div>
</section>

      {/* ================= SERVICES ================= */}
      <section className="relative py-20 px-6 bg-zinc-950">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.08),transparent_70%)]" />

        <div className="relative max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-12">
            Services We <span className="text-orange-500">Provided</span>
          </h2>

          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16">
            Kami menyediakan layanan exhibition production secara menyeluruh,
            mulai dari konsep hingga pelaksanaan di lapangan.
          </p>

          <div className="grid md:grid-cols-2 gap-8">

            {/* CARD */}
            {[
              {
                title: "Concept & Design Development",
                items: [
                  "Perumusan konsep sesuai brand",
                  "Desain layout & booth",
                  "3D rendering & technical drawing",
                ],
              },
              {
                title: "Production & Fabrication",
                items: [
                  "Pembuatan booth & instalasi",
                  "Printing & materi branding",
                  "Lighting, audio & multimedia",
                ],
              },
              {
                title: "Installation & On-site",
                items: [
                  "Setup di lokasi",
                  "Koordinasi teknis",
                  "Quality control",
                ],
              },
              {
                title: "Dismantling & Logistics",
                items: [
                  "Pembongkaran booth",
                  "Manajemen logistik",
                  "Pengiriman ulang material",
                ],
              },
              {
                title: "Event Support",
                items: [
                  "Konsultasi strategi",
                  "Tim support profesional",
                  "Dokumentasi & evaluasi",
                ],
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="
                  bg-zinc-900/80 backdrop-blur-xl
                  border border-zinc-800
                  rounded-2xl p-8
                  hover:border-orange-500/40
                  transition
                "
              >
                <h3 className="text-xl font-semibold mb-4">
                  {service.title}
                </h3>

                <ul className="space-y-2 text-zinc-400 text-sm">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-orange-500">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="relative py-20 px-6 bg-black">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.08),transparent_70%)]" />

        <div className="relative max-w-6xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-12">
            Our <span className="text-orange-500">Process</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                num: "01",
                title: "Planning",
                desc: "Menyusun konsep dan strategi pameran",
              },
              {
                num: "02",
                title: "Production",
                desc: "Produksi booth dan materi branding",
              },
              {
                num: "03",
                title: "Execution",
                desc: "Pelaksanaan event dengan presisi tinggi",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800"
              >
                <div className="text-5xl text-orange-500/20 mb-4">
                  {step.num}
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  {step.title}
                </h3>

                <p className="text-zinc-400 text-sm">
                  {step.desc}
                </p>
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
        Exhibition <span className="text-orange-500">Gallery</span>
      </h2>
    </div>

    {loading && (
      <p className="text-center text-zinc-400">
        Loading gallery...
      </p>
    )}

    {!loading && gallery.length > 0 && (
      <div className="grid md:grid-cols-2 gap-6">

        {/* MAIN IMAGE */}
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

        {/* SIDE IMAGE */}
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

      {/* ================= CTA ================= */}
      <section className="py-20 text-center px-6 bg-gradient-to-b from-black to-zinc-900">

        <h2 className="text-4xl font-bold">
          Siap Buat Exhibition{" "}
          <span className="text-orange-500">Kelas Profesional?</span>
        </h2>

        <p className="text-zinc-400 mt-4">
          Konsultasikan kebutuhan Anda sekarang
        </p>

        <a
          href="https://wa.me/6285183113349"
          className="inline-block mt-6 bg-orange-500 px-8 py-4 rounded-full text-lg"
        >
          Hubungi Kami
        </a>

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
    </main>
  )
}