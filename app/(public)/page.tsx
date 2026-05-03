
"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Particles from "@/components/Particles"
import { useRef, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

type Project = {
  id: string
  title: string
  thumbnail: string
}

type Client = {
  id: string
  name: string
  logo: string
}

type Testimonial = {
  id: string
  name: string
  position?: string
  event_category?: string
  event_type?: string
  content: string
}
/* ================= FAQ DATA ================= */
const faqData = [
  {
    category: "Jasa Event Organizer Jakarta & Bandung",
    questions: [
      {
        q: "Apa saja layanan PT Juragan Kreasi Indonesia sebagai jasa event organizer?",
        a: "Kami melayani corporate event, gathering perusahaan, seminar, launching produk, konser, pameran, wedding, brand activation, hingga event pemerintahan di seluruh Indonesia."
      },
      {
        q: "Apakah melayani jasa event organizer di Jakarta?",
        a: "Ya, kami menyediakan layanan jasa event organizer Jakarta untuk perusahaan, brand, instansi pemerintah, komunitas, dan berbagai acara skala besar maupun kecil."
      },
      {
        q: "Apakah tersedia layanan event organizer di Bandung?",
        a: "Ya, kami juga melayani event organizer Bandung untuk seminar, festival, gathering, launching produk, dan berbagai kebutuhan event lainnya."
      },
      {
        q: "Apakah bisa menangani event di luar Jakarta dan Bandung?",
        a: "Tentu. PT Juragan Kreasi Indonesia melayani event di seluruh Indonesia termasuk Surabaya, Bali, Yogyakarta, Medan, Makassar, dan kota lainnya."
      }
    ]
  },

  {
    category: "Event Pemerintah & LPSE",
    questions: [
      {
        q: "Apakah PT Juragan Kreasi Indonesia terdaftar di LPSE?",
        a: "Ya, kami telah terdaftar sebagai anggota LPSE sehingga dapat mendukung kebutuhan event pemerintahan dan pengadaan resmi secara profesional."
      },
      {
        q: "Event pemerintah apa saja yang bisa ditangani?",
        a: "Kami menangani seminar pemerintah, pelatihan ASN, acara kementerian, pameran daerah, launching program, hingga event resmi lainnya."
      },
      {
        q: "Apakah menyediakan general supplier untuk kebutuhan event?",
        a: "Ya, kami juga menyediakan layanan general supplier seperti merchandise, printing, booth, perlengkapan event, dan kebutuhan pengadaan lainnya."
      }
    ]
  },

  {
    category: "Dokumentasi Event Profesional",
    questions: [
      {
        q: "Apakah menyediakan fotografer dan videografer profesional?",
        a: "Ya, kami memiliki tim event photography dan videography profesional untuk berbagai jenis acara di Jakarta, Bandung, dan seluruh Indonesia."
      },
      {
        q: "Apakah menyediakan drone dan live streaming event?",
        a: "Tentu. Kami menyediakan drone documentation, live streaming, multicam production, dan after movie event profesional."
      },
      {
        q: "Apakah hasil dokumentasi bisa digunakan untuk media sosial?",
        a: "Ya, hasil dokumentasi kami dapat disesuaikan untuk Instagram, TikTok, YouTube, website perusahaan, dan kebutuhan branding digital."
      }
    ]
  },

  {
    category: "Harga & Booking",
    questions: [
      {
        q: "Berapa harga jasa event organizer?",
        a: "Harga jasa event organizer tergantung pada skala acara, lokasi event, jumlah peserta, venue, serta kebutuhan produksi seperti stage, lighting, dokumentasi, dan entertainment."
      },
      {
        q: "Bagaimana cara booking jasa event organizer?",
        a: "Anda dapat menghubungi tim kami melalui WhatsApp atau form kontak website untuk konsultasi gratis mengenai kebutuhan event Anda."
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

export default function HomePage() {
  const ref = useRef(null)

  // ================= STATE =================
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [galleryIndex, setGalleryIndex] = useState(0)
  // HERO & TESTIMONIAL
  const [heroIndex, setHeroIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  // 🔥 GALLERY STATE (FIX ERROR)
  const [gallery, setGallery] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])

  // ================= FETCH =================
  const fetchData = async () => {
    setLoading(true)

    const [projectRes, clientRes, testimonialRes, galleryRes] = await Promise.all([
      supabase.from("projects").select("*"),
      supabase.from("clients").select("*"),
      supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10),

      // 🔥 GALLERY
      supabase
        .from("projects")
        .select("gallery")
        .order("created_at", { ascending: false }),
    ])

    setProjects(projectRes.data || [])
    setClients(clientRes.data || [])
    setTestimonials(testimonialRes.data || [])

    // 🔥 PROCESS GALLERY
    if (galleryRes.data) {
      const images = galleryRes.data
        .flatMap((item: any) => item.gallery || [])
        .filter(Boolean)

      setGallery(images)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ================= AUTO HERO =================
  useEffect(() => {
    if (projects.length === 0) return

    const interval = setInterval(() => {
      setHeroIndex((prev) =>
        prev === projects.length - 1 ? 0 : prev + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [projects])

  // ================= AUTO TESTIMONIAL =================
  useEffect(() => {
    if (testimonials.length === 0) return

    const interval = setInterval(() => {
      setTestimonialIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials])

  // ================= AUTO GALLERY =================
  useEffect(() => {
    if (gallery.length === 0) return

    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === gallery.length - 1 ? 0 : prev + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [gallery])

  useEffect(() => {
  if (projects.length === 0) return

  const interval = setInterval(() => {
    setGalleryIndex((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    )
  }, 4000)

  return () => clearInterval(interval)
}, [projects])
  // ================= SIDE IMAGE =================
  const sideImages =
    gallery.length > 0
      ? [1, 2, 3].map((i) => gallery[(index + i) % gallery.length])
      : []

  // ================= SAFE DATA =================
  const galleryMain = projects[galleryIndex]

const gallerySide = projects
  .slice(galleryIndex + 1, galleryIndex + 4)
  .concat(
    projects.slice(
      0,
      Math.max(0, galleryIndex + 4 - projects.length)
    )
  )
  const side = projects.slice(1, 4)
  const activeTestimonial = testimonials[testimonialIndex]

  return (
    <main className="bg-black text-white overflow-hidden">

    {/* ================= HERO CINEMATIC ================= */}
<section
  ref={ref}
  className="relative flex items-center justify-center min-h-[80vh] overflow-hidden"
>

  {/* 🔥 BACKGROUND IMAGE (SLIDESHOW) */}
  <div className="absolute inset-0 z-0">

    <AnimatePresence mode="wait">
      {!loading && projects[heroIndex] && (
        <motion.img
          key={projects[heroIndex].id}
          src={projects[heroIndex].thumbnail}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full object-cover"
        />
      )}
    </AnimatePresence>

  </div>

  {/* 🔥 GRADIENT HITAM (INI YANG BIKIN PRO) */}
  <div className="absolute inset-0 z-10 
    bg-gradient-to-b 
    from-black/80 via-black/50 to-black
  " />

  {/* 🔥 VIGNETTE (FOCUS KE TENGAH) */}
  <div className="absolute inset-0 z-10 bg-black/40" />

  {/* 🔥 OPTIONAL PARTICLE (TIPIS AJA) */}
  <div className="absolute inset-0 z-10 opacity-30">
    <Particles />
  </div>

  {/* 🔥 CONTENT */}
  <div className="relative z-20 text-center px-6 max-w-2xl">

    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
      Event Kamu Harus{" "}
      <span className="text-orange-500">
        Sempurna
      </span>
    </h1>

    <p className="mt-4 text-zinc-300">
      Dari konsep sampai eksekusi. Kami urus semuanya.
      Kamu tinggal menikmati hasilnya.
    </p>

    {/* CTA */}
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      <a
        href="https://wa.me/6285183113349"
        target="_blank"
        className="
          bg-orange-500 px-6 py-3 rounded-full
          bg-orange-500 hover:shadow-[0_0_25px_rgba(255,140,0,0.6)]
        "
      >
        Konsultasi Gratis
      </a>

      <Link
        href="#project"
        className="border border-zinc-600 px-6 py-3 rounded-full hover:shadow-[0_0_25px_rgba(255,140,0,0.6)]"
      >
        Lihat Portfolio
      </Link>
    </div>

  </div>

</section>


{/* ================= ABOUT INTRO ================= */}
<section className="relative py-20 px-6 bg-black overflow-hidden">

  {/* 🔥 background glow halus */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,120,0,0.08),transparent_60%)]" />

  <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* TEXT */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Event Organizer &{" "}
        <span className="text-orange-500">General Supplier</span>
      </h2>

      <p className="text-zinc-400 leading-relaxed">
        Lahir dari semangat <span className="text-orange-500">“kreativitas tanpa batas”</span>, 
        kami adalah generasi muda yang hadir dengan tujuan untuk perubahan positif 
        dalam industri event organizer di Indonesia.
      </p>

      <p className="text-zinc-400 mt-4">
        Sejak didirikan, kami telah berhasil menangani berbagai proyek dan acara 
        yang beragam, memperoleh reputasi sebagai penyedia layanan yang dapat 
        diandalkan dan inovatif.
      </p>

      <p className="text-zinc-500 text-sm mt-4">
        PT Juragan Kreasi Indonesia terdaftar sebagai anggota LPSE.
      </p>

      {/* CTA */}
      <Link
        href="/about"
        className="
          inline-block mt-8 px-6 py-3 rounded-full
          bg-orange-500 hover:shadow-[0_0_25px_rgba(255,140,0,0.6)]
          transition
        "
      >
        More About Us →
      </Link>
    </motion.div>

    {/* VISUAL CARD */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="
        relative bg-zinc-900/80 backdrop-blur-xl
        border border-zinc-800
        rounded-2xl p-8
        shadow-xl
      "
    >
      <ul className="space-y-4 text-zinc-300">

        <li className="flex items-center gap-3">
          <span className="text-orange-500">✔</span>
          Event Organizer Profesional
        </li>

        <li className="flex items-center gap-3">
          <span className="text-orange-500">✔</span>
          General Supplier Terpercaya
        </li>

        <li className="flex items-center gap-3">
          <span className="text-orange-500">✔</span>
          Tim Kreatif & Berpengalaman
        </li>

        <li className="flex items-center gap-3">
          <span className="text-orange-500">✔</span>
          Handling Event Skala Besar
        </li>

      </ul>

      {/* glow border effect */}
      <div className="absolute inset-0 rounded-2xl border border-orange-500/10 pointer-events-none" />
    </motion.div>

  </div>
</section>
    
    {/* ================= SERVICES / EVERY TYPE ================= */}
<section className="relative py-15 px-6 bg-zinc-950 overflow-hidden">

  {/* 🔥 glow background */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.08),transparent_70%)]" />

  <div className="relative max-w-6xl mx-auto text-center">

    <h2 className="text-4xl font-bold mb-4">
      Every Type of <span className="text-orange-500">Event</span> 
    </h2>

    <p className="text-zinc-400 max-w-xl mx-auto">
      Kami memiliki berbagai layanan profesional untuk memenuhi semua kebutuhan event Anda.
    </p>

    {/* 🔥 SERVICES CARD */}
    <div className="grid md:grid-cols-3 gap-6 mt-14">

      {[
        {
          title: "Event Organizer",
          desc: "Dari konsep hingga eksekusi, kami pastikan event berjalan sempurna tanpa hambatan.",
        },
        {
          title: "General Supplier",
          desc: "Penyedia kebutuhan event lengkap dengan kualitas terbaik dan harga kompetitif.",
        },
        {
          title: "Tour & Travel",
          desc: "Layanan perjalanan dan tour profesional dengan pengalaman yang terorganisir dengan baik.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          whileHover={{ y: -8 }}
          className="
            relative bg-zinc-900/80 backdrop-blur-xl
            border border-zinc-800
            rounded-2xl p-8
            text-left
            transition
            hover:border-orange-500/40
            hover:shadow-[0_0_30px_rgba(255,120,0,0.2)]
          "
        >

          {/* ICON FAKE (bisa ganti icon nanti) */}
          <div className="w-12 h-12 mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-xl">
            ✦
          </div>

          <h3 className="text-lg font-semibold">
            {item.title}
          </h3>

          <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
            {item.desc}
          </p>

          {/* hover glow */}
          <div className="absolute inset-0 rounded-2xl border border-orange-500/0 group-hover:border-orange-500/20 pointer-events-none" />

        </motion.div>
      ))}

    </div>

  </div>
</section> 

{/* ================= HOW IT WORKS (CLOSING) ================= */}
<section className="relative py-15 px-6 bg-black overflow-hidden">

  {/* glow background */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.08),transparent_70%)]" />

  <div className="relative max-w-6xl mx-auto text-center">

    <h2 className="text-4xl font-bold mb-4">
      How It <span className="text-orange-500">Works</span> 
    </h2>

    <p className="text-zinc-400 max-w-xl mx-auto">
      Proses sederhana, tanpa ribet. Kami yang handle semua — Anda tinggal menikmati hasilnya.
    </p>

    {/* STEP */}
    <div className="grid md:grid-cols-3 gap-8 mt-16">

      {[
        {
          num: "01",
          title: "Consultation",
          desc: "Ceritakan kebutuhan event Anda. Tim kami akan memberikan solusi terbaik berdasarkan pengalaman nyata.",
        },
        {
          num: "02",
          title: "Planning",
          desc: "Kami menyusun konsep, timeline, hingga detail teknis secara profesional dan terstruktur.",
        },
        {
          num: "03",
          title: "Execution",
          desc: "Tim kami mengeksekusi event dengan presisi tinggi agar berjalan lancar tanpa kendala.",
        },
      ].map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          whileHover={{ y: -10 }}
          className="
            relative bg-zinc-900/80 backdrop-blur-xl
            border border-zinc-800
            rounded-2xl p-8 text-left
            transition
            hover:border-orange-500/40
            hover:shadow-[0_0_30px_rgba(255,120,0,0.2)]
          "
        >

          {/* NUMBER */}
          <div className="text-5xl font-bold text-orange-500/20 absolute top-4 right-6">
            {step.num}
          </div>

          {/* CONTENT */}
          <h3 className="text-xl font-semibold mb-3">
            {step.title}
          </h3>

          <p className="text-zinc-400 text-sm leading-relaxed">
            {step.desc}
          </p>

        </motion.div>
      ))}

    </div>

    {/* TRUST LINE */}
    <p className="text-zinc-500 text-sm mt-12">
      ✔ Tanpa ribet • ✔ Tim profesional • ✔ Sudah dipercaya banyak client
    </p>

    {/* 🔥 CTA CLOSING */}
    <div className="mt-10">
      <a
        href="https://wa.me/6285183113349"
        target="_blank"
        className="
          inline-block px-8 py-4 rounded-full text-lg font-medium
          bg-orange-500 hover:shadow-[0_0_25px_rgba(255,140,0,0.6)]
          transition-all duration-300
        "
      >
       Book a Consultation
      </a>
    </div>

  </div>
</section>

{/* ================= GALERI ================= */}
<section className="relative py-20 px-6 bg-zinc-950 overflow-hidden">

  {/* glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.08),transparent_70%)]" />

  <div className="relative max-w-6xl mx-auto">

    {/* TITLE */}
    <div className="text-center mb-14">
      <h2 className="text-4xl font-bold">
        Our <span className="text-orange-500">Gallery</span>
      </h2>
      <p className="text-zinc-400 mt-2">
        Momen terbaik yang kami ciptakan untuk client
      </p>
    </div>

    {!loading && projects.length > 0 && (
      <div className="grid md:grid-cols-2 gap-6">

        {/* ================= MAIN ================= */}
        <div className="relative">

          <div className="relative h-[420px] rounded-2xl overflow-hidden group">

            <AnimatePresence mode="wait">
              <motion.img
                key={galleryMain?.id}
                src={galleryMain?.thumbnail}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* text */}
            <div className="absolute bottom-4 left-4">
              <h3 className="text-lg font-semibold">
                {galleryMain?.title}
              </h3>
            </div>

          </div>

        </div>

        {/* ================= SIDE ================= */}
        <div className="flex flex-col gap-4">

          {gallerySide.map((item, i) => (
            <motion.div
              key={item.id}
              onClick={() => setGalleryIndex(projects.indexOf(item))}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative h-[130px] rounded-xl overflow-hidden cursor-pointer group"
            >

              <img
                src={item.thumbnail}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />

              {/* text */}
              <div className="absolute bottom-2 left-3 opacity-0 group-hover:opacity-100 transition">
                <p className="text-sm text-white">
                  {item.title}
                </p>
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    )}

  </div>
</section>

    <section className="relative py-20 px-6 bg-black overflow-hidden">

  {/* glow halus */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.06),transparent_70%)]" />

  <div className="relative max-w-6xl mx-auto text-center">

    {/* HEADLINE */}
    <h2 className="text-3xl md:text-4xl font-bold">
     <span className="text-orange-500">Dipercaya</span> Oleh Banyak Client
    </h2>

    <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
      Dari brand, instansi, hingga event besar — kami telah menangani berbagai kebutuhan dengan hasil maksimal.
    </p>

    {/* 🔥 LOGO MARQUEE */}
<div className="relative mt-12 overflow-hidden">

  {/* FADE KIRI */}
  <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-zinc-950 to-transparent z-10" />

  {/* FADE KANAN */}
  <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-zinc-950 to-transparent z-10" />

  <div className="flex w-max animate-marquee gap-16">
    {[...clients, ...clients].map((c, i) => (
      <img key={i} src={c.logo} className="h-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition" />
    ))}
  </div>

</div>

    {/* 🔥 TRUST STATS */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 text-center">

      <div>
        <p className="text-3xl font-bold text-orange-500">
          {clients.length}+
        </p>
        <p className="text-zinc-400 text-sm">
          Client Aktif
        </p>
      </div>

      <div>
        <p className="text-3xl font-bold text-orange-500">
          100+
        </p>
        <p className="text-zinc-400 text-sm">
          Event Selesai
        </p>
      </div>

      <div>
        <p className="text-3xl font-bold text-orange-500">
          5+
        </p>
        <p className="text-zinc-400 text-sm">
          Tahun Pengalaman
        </p>
      </div>

      <div>
        <p className="text-3xl font-bold text-orange-500">
          100%
        </p>
        <p className="text-zinc-400 text-sm">
          Kepuasan Client
        </p>
      </div>

    </div>

    {/* 🔥 CTA */}
    <div className="mt-12">
      <a
        href="https://wa.me/6285183113349"
        target="_blank"
        className="
          inline-block px-6 py-3 rounded-full
          bg-orange-500 hover:drop-shadow-[0_0_10px_rgba(255,120,0,0.6)]
          transition
        "
      >
        Gabung Dengan Mereka
      </a>
    </div>

  </div>
</section>
     
 <FAQSection />
     
      {/* ================= FINAL CTA ================= */}
      <section className="py-15 text-center px-6 bg-gradient-to-b from-black to-zinc-900">

        <h2 className="text-4xl font-bold">
          Slot <span className="text-orange-500">Terbatas</span> Bulan Ini
        </h2>

        <p className="text-zinc-400 mt-4">
          Booking sekarang sebelum penuh
        </p>

        <a
          href="https://wa.me/6285183113349"
          className="inline-block mt-6 bg-orange-500 px-8 py-4 rounded-full text-lg "
        >
          Booking Sekarang
        </a>

      </section>

    </main>
  )
}