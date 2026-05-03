"use client"

import { motion } from "framer-motion"
import Particles from "@/components/Particles"
import Link from "next/link"
import { useState } from "react"
/* ================= FAQ DATA ================= */
const faqData = [
 {
  category: "Booking & Event Planning",
  questions: [
    {
      q: "Berapa lama proses persiapan event biasanya?",
      a: "Waktu persiapan tergantung skala acara. Event kecil biasanya membutuhkan 1–2 minggu, sedangkan event besar seperti corporate gathering, konser, atau pameran dapat memerlukan persiapan 1–3 bulan."
    },
    {
      q: "Apakah bisa booking mendadak?",
      a: "Ya, kami tetap melayani event last minute tergantung ketersediaan tim, vendor, dan kebutuhan produksi acara."
    },
    {
      q: "Apakah PT Juragan Kreasi Indonesia membantu mencari venue acara?",
      a: "Ya, kami dapat membantu rekomendasi venue terbaik di Jakarta, Bandung, Cirebon, dan berbagai kota lain sesuai kebutuhan event Anda."
    }
  ]
},

{
  category: "Vendor & Production",
  questions: [
    {
      q: "Apakah menyediakan sound system, lighting, dan LED screen?",
      a: "Ya, kami menyediakan kebutuhan produksi event lengkap seperti stage, sound system, lighting, LED videotron, booth exhibition, hingga entertainment."
    },
    {
      q: "Apakah bisa menyediakan MC, talent, atau pengisi acara?",
      a: "Tentu. Kami dapat menyediakan MC profesional, band, talent, artis, dancer, hingga entertainment sesuai konsep acara."
    },
    {
      q: "Apakah melayani event hybrid atau live streaming?",
      a: "Ya, kami melayani event hybrid, webinar production, live streaming multicam, dan kebutuhan digital event lainnya."
    }
  ]
},

{
  category: "Payment & Consultation",
  questions: [
    {
      q: "Apakah konsultasi event dikenakan biaya?",
      a: "Tidak. Konsultasi awal bersama tim kami sepenuhnya gratis untuk membantu Anda merencanakan event terbaik."
    },
    {
      q: "Bagaimana sistem pembayaran jasa event organizer?",
      a: "Pembayaran biasanya dilakukan secara bertahap sesuai kesepakatan project, mulai dari DP hingga pelunasan setelah event selesai."
    },
    {
      q: "Bagaimana cara mendapatkan penawaran harga?",
      a: "Anda cukup menghubungi tim kami melalui WhatsApp, email, atau form contact untuk mendapatkan proposal dan estimasi harga."
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
export default function AboutPage() {
  return (
    <main className="bg-black text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative flex items-center justify-center min-h-[60vh] overflow-hidden">

        <div className="absolute inset-0 opacity-30">
          <Particles />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold">
            About <span className="text-orange-500">Us</span>
          </h1>
          <p className="text-zinc-400 mt-4">
            Juragan Kreasi Indonesia
          </p>
        </div>

      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-15 px-6 relative">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,120,0,0.08),transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            Juragan Kreasi Indonesia
          </h2>

          <p className="text-zinc-400 leading-relaxed">
            Lahir dari semangat <span className="text-orange-500">“kreativitas tanpa batas”</span>, 
            kami adalah generasi muda yang hadir dengan tujuan untuk perubahan positif dalam industri event organizer di Indonesia.
          </p>

          <p className="text-zinc-400 mt-4">
            Sejak didirikan, kami telah berhasil menangani berbagai proyek dan acara yang beragam, memperoleh reputasi sebagai penyedia layanan yang dapat diandalkan dan inovatif.
          </p>
        </motion.div>

      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="py-15 px-6 bg-zinc-950 relative">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.08),transparent_70%)]" />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          {/* VISION */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800"
          >
            <h3 className="text-xl font-semibold mb-4 text-orange-500">
              Company Vision
            </h3>

            <p className="text-zinc-400">
              Visi kami adalah menjadi perusahaan event management dengan reputasi terbaik dan terpercaya melalui layanan profesional dengan orientasi kepuasan klien.
            </p>
          </motion.div>

          {/* MISSION */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800"
          >
            <h3 className="text-xl font-semibold mb-4 text-orange-500">
              Company Mission
            </h3>

            <ul className="text-zinc-400 space-y-3 text-sm">
              <li>✔ Kerja keras, cerdas, dan tuntas dengan integritas tinggi</li>
              <li>✔ Memberikan pelayanan terbaik & profesional</li>
              <li>✔ Membangun relasi dan jaringan bisnis luas</li>
              <li>✔ Mengembangkan tim kreatif & profesional</li>
            </ul>
          </motion.div>

        </div>

      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-15 px-6 relative">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.06),transparent_70%)]" />

        <div className="relative max-w-5xl mx-auto text-center">

          <h2 className="text-3xl font-bold">
            Our <span className="text-orange-500">Service</span>
          </h2>

          <p className="text-zinc-400 mt-4">
            Kami menyediakan layanan event organizer komprehensif dari awal hingga akhir.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">

            {[
              "Perencanaan Acara",
              "Pengadaan & Koordinasi",
              "Manajemen Acara",
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="bg-zinc-900 p-6 rounded-xl border border-zinc-800"
              >
                <h3 className="font-semibold mb-2 text-orange-500">
                  {item}
                </h3>

                <p className="text-zinc-400 text-sm">
                  Layanan profesional untuk memastikan event berjalan sempurna tanpa kendala.
                </p>
              </motion.div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= TIMELINE ================= */}
<section className="relative py-24 px-6 bg-black overflow-hidden">

  {/* glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.08),transparent_70%)]" />

  <div className="relative max-w-5xl mx-auto">

    {/* TITLE */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold">
        Perjalanan <span className="text-orange-500">Kami</span>
      </h2>
      <p className="text-zinc-400 mt-3">
        Dari awal berdiri hingga menjadi partner terpercaya
      </p>
    </div>

    {/* TIMELINE */}
    <div className="relative">

      {/* garis tengah */}
      <div className="absolute left-1/2 top-0 w-[2px] h-full bg-zinc-800 -translate-x-1/2" />

      {[
        {
          year: "Awal Berdiri",
          title: "Lahirnya Juragan Kreasi Indonesia",
          desc: "Berawal dari semangat kreativitas tanpa batas, kami memulai perjalanan sebagai tim kecil dengan visi besar.",
        },
        {
          year: "Pengembangan",
          title: "Menangani Berbagai Event",
          desc: "Mulai dipercaya menangani berbagai jenis acara dari skala kecil hingga besar dengan hasil yang memuaskan.",
        },
        {
          year: "Ekspansi",
          title: "Menjadi General Supplier",
          desc: "Mengembangkan layanan menjadi penyedia kebutuhan event secara lengkap dan profesional.",
        },
        {
          year: "Sekarang",
          title: "Partner Event Terpercaya",
          desc: "Menjadi mitra andalan berbagai client dalam menciptakan event berkualitas tinggi.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className={`
            relative mb-12 flex items-center
            ${i % 2 === 0 ? "justify-start" : "justify-end"}
          `}
        >

          {/* CARD */}
          <div className="
            w-full md:w-[45%]
            bg-zinc-900/80 backdrop-blur-xl
            border border-zinc-800
            rounded-2xl p-6
            transition
            hover:border-orange-500/40
            hover:shadow-[0_0_30px_rgba(255,120,0,0.2)]
          ">

            <p className="text-xs text-orange-500 mb-2">
              {item.year}
            </p>

            <h3 className="font-semibold text-lg">
              {item.title}
            </h3>

            <p className="text-zinc-400 text-sm mt-2">
              {item.desc}
            </p>

          </div>

          {/* DOT */}
          <div className="
            absolute left-1/2 -translate-x-1/2
            w-4 h-4 rounded-full
            bg-orange-500
            shadow-[0_0_15px_rgba(255,120,0,0.8)]
          " />

        </motion.div>
      ))}

    </div>

  </div>
</section>


      {/* ================= TEAM ================= */}
<section className="py-24 px-6  bg-gradient-to-b relative overflow-hidden">

  {/* glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.08),transparent_70%)]" />

  <div className="relative max-w-6xl mx-auto text-center">

    <h2 className="text-4xl font-bold">
      Board Of <span className="text-orange-500">Management</span>
    </h2>

    <p className="text-zinc-400 mt-3">
      Tim profesional yang berpengalaman dan berdedikasi
    </p>

    {/* ================= EXECUTIVE ================= */}
    <div className="mt-16">
      <h3 className="text-sm text-zinc-500 uppercase tracking-widest mb-6">
        Executive
      </h3>

      <div className="flex justify-center">
        <motion.div
  whileHover={{ y: -10 }}
  className="
    relative bg-zinc-900/80 backdrop-blur-xl
    border border-orange-500/20
    rounded-2xl p-8 w-[280px]
    shadow-[0_0_30px_rgba(255,120,0,0.15)]
  "
>
  <img
    src="/image/andi.png"
    alt="Andy Pristiono"
    className="w-20 h-20 mx-auto mb-4 rounded-full object-cover border border-orange-500/30"
  />

  <p className="font-semibold text-lg">
    Andy Pristiono
  </p>
  <p className="text-sm text-orange-500">
    Chief Executive Officer
  </p>

  <div className="absolute inset-0 rounded-2xl border border-orange-500/10 pointer-events-none" />
</motion.div>
      </div>
    </div>

    {/* ================= BOARD ================= */}
    <div className="mt-16">
      <h3 className="text-sm text-zinc-500 uppercase tracking-widest mb-6">
        Board & Directors
      </h3>

      <div className="grid md:grid-cols-3 gap-6">

        {[
  { name: "Astrialita", role: "Komisaris", img: "/image/astri.png" },
  { name: "Anna", role: "Direktur Keuangan", img: "/image/anna.png" },
  { name: "Yayang", role: "Direktur Operasional", img: "/image/yayang.png" },
].map((m, i) => (
  <motion.div
    key={i}
    whileHover={{ y: -8 }}
    className="
      relative bg-zinc-900/80 backdrop-blur-xl
      border border-zinc-800
      rounded-2xl p-6
      transition
      hover:border-orange-500/40
      hover:shadow-[0_0_25px_rgba(255,120,0,0.2)]
    "
  >
    <img
      src={m.img}
      alt={m.name}
      className="w-16 h-16 mx-auto mb-4 rounded-full object-cover border border-orange-500/20"
    />

    <p className="font-semibold">{m.name}</p>
    <p className="text-sm text-zinc-400">{m.role}</p>
  </motion.div>
))}

      </div>
    </div>

    {/* ================= MANAGEMENT ================= */}
    <div className="mt-16">
      <h3 className="text-sm text-zinc-500 uppercase tracking-widest mb-6">
        Management Team
      </h3>

      <div className="grid md:grid-cols-4 gap-6">

       {[
  { name: "Ninda", role: "Finance Manager", img: "/image/ninda.png" },
  { name: "Pandu Wira A", role: "Head Tenan Relation", img: "/image/pandu.webp" },
  { name: "Rizky Jhovan", role: "Show Management Director", img: "/image/rizky.png" },
  { name: "Hanif Aji A", role: "Event Officer", img: "/image/hanif.webp" }, // fallback
].map((m, i) => (
  <motion.div
    key={i}
    whileHover={{ y: -6 }}
    className="
      bg-zinc-900
      border border-zinc-800
      rounded-xl p-5
      transition
      hover:border-orange-500/30
    "
  >
    <img
      src={m.img}
      alt={m.name}
      className="w-14 h-14 mx-auto mb-3 rounded-full object-cover border border-orange-500/20"
    />

    <p className="text-sm font-medium">{m.name}</p>
    <p className="text-xs text-zinc-500">{m.role}</p>
  </motion.div>
))}

      </div>
    </div>

  </div>
</section>

<FAQSection />

     
    {/* ================= FINAL CTA ================= */}
      <section className="py-15 text-center px-6 bg-gradient-to-b from-black to-zinc-900">

        <h2 className="text-3xl font-bold">
          Siap Membuat Event <span className="text-orange-500">Terbaik?</span>
        </h2>

        <p className="text-zinc-400 mt-4">
          Konsultasikan kebutuhan event Anda sekarang
        </p>

        <a
          href="https://wa.me/6285183113349"
          className="inline-block mt-6 bg-orange-500 px-8 py-4 rounded-full hover:shadow-[0_0_25px_rgba(255,140,0,0.6)]"
        >
          Konsultasi Sekarang
        </a>

      </section>
    </main>
  )
}