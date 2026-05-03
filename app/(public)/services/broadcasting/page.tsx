
"use client"

import { motion, AnimatePresence } from "framer-motion"
import Particles from "@/components/Particles"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase"

type Project = {
  id: string
  gallery: string[] | null
  category_id: string
}
/* ================= FAQ DATA ================= */
/* ================= FAQ DATA ================= */
const faqData = [
  {
   category: "Jasa Broadcasting Live Streaming Profesional Jakarta & Bandung",
    questions: [
      {
        q: "Apa itu jasa broadcasting atau live streaming event?",
        a: "Jasa broadcasting adalah layanan siaran langsung (live streaming) acara seperti seminar, konser, webinar, corporate event, hingga peluncuran produk ke platform digital seperti YouTube, Zoom, Instagram, dan lainnya."
      },
      {
        q: "Apakah menyediakan jasa live streaming event perusahaan?",
        a: "Ya, kami menyediakan jasa live streaming profesional untuk event perusahaan seperti meeting, seminar, townhall, dan launching produk dengan kualitas HD hingga 4K."
      },
      {
        q: "Apakah bisa live streaming ke YouTube, Instagram, dan Facebook?",
        a: "Tentu. Kami menyediakan multi-platform live streaming ke YouTube, Instagram, Facebook, Zoom, dan platform digital lainnya secara bersamaan."
      },
      {
        q: "Apakah menyediakan jasa live streaming seminar dan webinar?",
        a: "Ya, kami melayani live streaming seminar dan webinar lengkap dengan multi camera, audio profesional, dan dukungan teknis selama acara berlangsung."
      },
      {
        q: "Apakah tersedia multi camera production untuk live streaming?",
        a: "Ya, kami menggunakan sistem multi camera production agar hasil live streaming lebih profesional, dinamis, dan menarik untuk penonton."
      },
      {
        q: "Apakah bisa live streaming event skala besar seperti konser?",
        a: "Bisa. Kami berpengalaman menangani live streaming konser, festival, dan event besar dengan sistem broadcasting profesional."
      },
      {
        q: "Apakah menyediakan operator dan tim teknis broadcasting?",
        a: "Ya, kami menyediakan tim lengkap seperti camera operator, switcher, audio engineer, dan streaming technician profesional."
      },
      {
        q: "Apakah hasil live streaming bisa direkam?",
        a: "Tentu. Semua live streaming dapat direkam dalam kualitas tinggi untuk kebutuhan dokumentasi dan konten ulang (replay)."
      },
      {
        q: "Apakah bisa live streaming hybrid event (offline + online)?",
        a: "Ya, kami menyediakan solusi hybrid event yang menggabungkan acara offline dan online secara bersamaan dengan sistem broadcasting profesional."
      },
      {
        q: "Apakah mendukung branding dalam live streaming?",
        a: "Ya, kami dapat menambahkan overlay branding, logo perusahaan, lower third, dan grafis sesuai identitas brand Anda."
      }
    ]
  },

 {
    category: "Jasa Live Streaming Event, Webinar & Production Broadcasting Indonesia",
    questions: [
      {
        q: "Berapa harga jasa live streaming atau broadcasting event?",
        a: "Harga jasa live streaming tergantung pada durasi event, jumlah kamera, lokasi, kebutuhan teknis, serta platform streaming yang digunakan."
      },
      {
        q: "Apakah tersedia jasa live streaming full HD atau 4K?",
        a: "Ya, kami menyediakan layanan live streaming dengan kualitas Full HD hingga 4K untuk hasil visual yang lebih profesional."
      },
      {
        q: "Apakah bisa live streaming acara pemerintahan atau instansi?",
        a: "Ya, kami melayani live streaming untuk acara pemerintah, kementerian, BUMN, dan instansi resmi lainnya."
      },
      {
        q: "Apakah menyediakan live streaming untuk wedding atau acara pribadi?",
        a: "Tentu. Kami juga melayani live streaming wedding, ulang tahun, dan acara pribadi dengan kualitas profesional."
      },
      {
        q: "Apakah mendukung streaming dengan latensi rendah?",
        a: "Ya, kami menggunakan sistem broadcasting dengan low latency agar tayangan real-time lebih stabil dan minim delay."
      },
      {
        q: "Apakah bisa integrasi dengan Zoom atau platform meeting online?",
        a: "Bisa. Kami dapat mengintegrasikan live streaming dengan Zoom, Google Meet, Microsoft Teams, dan platform webinar lainnya."
      },
      {
        q: "Apakah menyediakan jasa live streaming outdoor?",
        a: "Ya, kami berpengalaman dalam live streaming outdoor seperti konser, festival, olahraga, dan event lapangan terbuka."
      },
      {
        q: "Apakah tersedia paket lengkap live streaming + dokumentasi?",
        a: "Ya, kami menyediakan paket lengkap yang mencakup live streaming, fotografi, videografi, dan after movie event."
      },
      {
        q: "Apakah bisa konsultasi sebelum booking jasa broadcasting?",
        a: "Tentu. Kami menyediakan konsultasi gratis untuk menentukan kebutuhan teknis live streaming sesuai jenis event Anda."
      },
      {
        q: "Apakah layanan broadcasting tersedia di seluruh Indonesia?",
        a: "Ya, kami melayani jasa live streaming dan broadcasting di Jakarta, Bandung, Surabaya, Bali, Yogyakarta, dan seluruh Indonesia."
      }
    ]
  }

]
/* ================= FAQ COMPONENT ================= */
function FAQSection() {
  const [open, setOpen] = useState<string | null>(null)

  return (
   <section className="py-20 bg-black text-white px-6">
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-14">
      <h2 className="text-4xl md:text-5xl font-bold">
        Frequently Asked <span className="text-orange-500">Questions</span>
      </h2>

      <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
        Temukan jawaban seputar jasa event organizer Jakarta, event organizer Bandung,
        dokumentasi event, LPSE, hingga kebutuhan general supplier.
      </p>
    </div>

    {/* 2 Column Layout */}
    <div className="grid md:grid-cols-2 gap-10">

      {faqData.map((section, i) => (
        <div key={i}>

          {/* Category */}
          <h3 className="text-xl font-semibold text-orange-500 mb-5">
            {section.category}
          </h3>

          {/* Questions */}
          <div className="space-y-4">
            {section.questions.map((item, j) => {
              const id = `${i}-${j}`
              const isOpen = open === id

              return (
                <div
                  key={id}
                  className="
                    border border-zinc-800 
                    rounded-2xl 
                    bg-zinc-900/50
                    backdrop-blur-sm
                    overflow-hidden
                  "
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : id)}
                    className="
                      w-full 
                      flex 
                      justify-between 
                      items-center 
                      p-5 
                      text-left
                    "
                  >
                    <span className="font-medium text-sm md:text-base pr-4">
                      {item.q}
                    </span>

                    <span className="text-orange-500 text-xl font-bold">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-zinc-400 text-sm leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}

    </div>

  </div>
</section>
  )
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

      const { data } = await supabase
        .from("projects")
        .select("gallery")
        .eq("category_id", "09c9a8ba-4da7-4091-866f-b4a0a2159a5b")
        .order("created_at", { ascending: false })

      if (data) {
        const images = data
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

  /* ================= SIDE IMAGE ================= */
  const sideImages = [1, 2, 3].map(
    (i) => gallery[(index + i) % gallery.length]
  )

  return (
    <main className="bg-black text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section
        ref={ref}
        className="relative flex items-center justify-center min-h-[80vh] overflow-hidden"
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

      {/* ================= INTRO ================= */}
<section className="relative py-20 px-6 bg-black">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,120,0,0.08),transparent_60%)]" />

  <div className="relative max-w-6xl mx-auto text-center">

    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      Tentang <span className="text-orange-500">Layanan Ini</span>
    </h2>

    <p className="text-zinc-400 leading-relaxed max-w-3xl mx-auto">
      Broadcasting Production adalah layanan yang berfokus pada
      penyediaan sistem live streaming dan produksi video profesional
      untuk berbagai jenis event.
    </p>

    <p className="text-zinc-400 mt-4 max-w-3xl mx-auto">
      Kami memastikan kualitas visual yang tajam, audio yang jernih,
      serta sistem teknis yang stabil untuk pengalaman broadcast tanpa gangguan.
    </p>

    {/* ================= CARD LAYANAN ================= */}
    <div className="grid md:grid-cols-3 gap-6 mt-16">

      {[
        {
          title: "Live Streaming",
          desc: "Streaming ke berbagai platform dengan kualitas stabil dan profesional.",
          img: "/image/live-streaming.png",
        },
        {
          title: "Multi Camera Production",
          desc: "Produksi multi kamera dengan switching system untuk hasil cinematic.",
          img: "/image/multicam.png",
        },
        {
          title: "Audio Visual System",
          desc: "Setup audio & visual lengkap untuk mendukung kualitas broadcast terbaik.",
          img: "/image/audiovisual.png",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          whileHover={{ y: -8 }}
          className="
            bg-zinc-900/80 backdrop-blur-xl
            border border-zinc-800
            rounded-2xl overflow-hidden
            hover:border-orange-500/40
            transition
          "
        >

          {/* IMAGE */}
          <div className="h-[180px] overflow-hidden">
            <img
              src={item.img}
              className="w-full h-full object-cover hover:scale-110 transition duration-700"
            />
          </div>

          {/* CONTENT */}
          <div className="p-6 text-left">
            <h3 className="text-lg font-semibold">
              {item.title}
            </h3>

            <p className="text-zinc-400 text-sm mt-2">
              {item.desc}
            </p>
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

          <div className="grid md:grid-cols-2 gap-8">

            {[
              {
                title: "Live Streaming",
                items: [
                  "YouTube, Zoom, Webinar",
                  "Multi platform streaming",
                  "Stable streaming system",
                ],
              },
              {
                title: "Multi Camera Production",
                items: [
                  "Switching system",
                  "Professional camera setup",
                  "Cinematic visuals",
                ],
              },
              {
                title: "Audio & Visual",
                items: [
                  "Audio mixing",
                  "Lighting setup",
                  "LED & screen system",
                ],
              },
              {
                title: "Recording & Documentation",
                items: [
                  "Full event recording",
                  "Highlight video",
                  "Editing & post production",
                ],
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800"
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

        <div className="relative max-w-6xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-12">
            Our <span className="text-orange-500">Process</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              { num: "01", title: "Planning", desc: "Konsep & kebutuhan teknis" },
              { num: "02", title: "Setup", desc: "Persiapan alat & sistem" },
              { num: "03", title: "Broadcast", desc: "Live execution profesional" },
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
              Broadcasting <span className="text-orange-500">Gallery</span>
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
                    className="
                      w-full h-full object-cover cursor-pointer
                      group-hover:scale-110 transition duration-700
                    "
                  />
                </AnimatePresence>

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

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
                    className="h-[130px] rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={img}
                      className="
                        w-full h-full object-cover
                        group-hover:scale-110 transition duration-700
                      "
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
<FAQSection />
      {/* ================= CTA ================= */}
      <section className="py-20 text-center px-6 bg-gradient-to-b from-black to-zinc-900">

        <h2 className="text-4xl font-bold">
          Siap Live Event Tanpa Gangguan?
        </h2>

        <p className="text-zinc-400 mt-4">
          Kami siap membantu kebutuhan broadcasting Anda
        </p>

        <a
          href="https://wa.me/6285183113349"
          className="inline-block mt-6 bg-orange-500 px-8 py-4 rounded-full"
        >
          Hubungi Kami
        </a>

      </section>

    </main>
  )
}
