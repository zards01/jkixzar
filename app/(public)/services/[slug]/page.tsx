"use client"

import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import Particles from "@/components/Particles"

export default function ServiceDetail() {
  const { slug } = useParams()

  // 🔥 DATA SERVICE (bisa pindah ke CMS nanti)
  const services: any = {
    "event-organizer": {
      title: "Event Organizer",
      headline: "Event Profesional Tanpa Ribet",
      desc: "Kami bantu wujudkan event Anda dari nol hingga sukses dengan eksekusi yang terstruktur dan profesional.",
    },
    "wedding-organizer": {
      title: "Wedding Organizer",
      headline: "Hari Spesial Tanpa Stress",
      desc: "Nikmati momen pernikahan tanpa repot, kami yang urus semua detailnya.",
    },
    "exhibition-production": {
      title: "Exhibition Production",
      headline: "Booth & Exhibition yang Stand Out",
      desc: "Tingkatkan branding Anda dengan exhibition profesional yang menarik perhatian.",
    },
    "tour-travel": {
      title: "Tour & Travel",
      headline: "Perjalanan Nyaman & Terorganisir",
      desc: "Liburan atau perjalanan bisnis tanpa kendala dengan layanan profesional.",
    },
    "broadcasting": {
      title: "Broadcasting",
      headline: "Live Streaming Tanpa Gangguan",
      desc: "Produksi broadcasting profesional dengan kualitas tinggi dan stabil.",
    },
    "photo-video": {
      title: "Photo & Videographer",
      headline: "Abadikan Momen Terbaik Anda",
      desc: "Dokumentasi berkualitas tinggi untuk setiap momen penting.",
    },
  }

  const service = services[slug as string]

  if (!service) return <div className="text-white p-10">Service tidak ditemukan</div>

  return (
    <main className="bg-black text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-center px-6">

        <div className="absolute inset-0 opacity-30">
          <Particles />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold">
            {service.headline}
          </h1>

          <p className="text-zinc-400 mt-4">
            {service.desc}
          </p>

          <a
            href="https://wa.me/6285183113349"
            className="inline-block mt-6 px-8 py-4 rounded-full bg-orange-500 hover:shadow-[0_0_25px_rgba(255,140,0,0.6)]"
          >
            Konsultasi Sekarang
          </a>
        </div>

      </section>

      {/* ================= VALUE ================= */}
      <section className="py-20 px-6 bg-zinc-950 text-center">

        <h2 className="text-3xl font-bold">
          Kenapa Pilih <span className="text-orange-500">Kami?</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">

          {[
            "Tim Profesional & Berpengalaman",
            "Planning Detail & Terstruktur",
            "Eksekusi Tepat Waktu & Presisi",
          ].map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-zinc-900 p-6 rounded-xl border border-zinc-800"
            >
              {v}
            </motion.div>
          ))}

        </div>

      </section>

      {/* ================= BENEFIT ================= */}
      <section className="py-20 px-6 bg-black">

        <div className="max-w-5xl mx-auto">

          <h2 className="text-3xl font-bold text-center">
            Apa yang Anda Dapatkan?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-12">

            {[
              "Perencanaan event lengkap",
              "Manajemen timeline",
              "Koordinasi vendor",
              "Handling event full",
              "Dokumentasi profesional",
              "Support tim selama event",
            ].map((b, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-orange-500">✔</span>
                <p className="text-zinc-300">{b}</p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-20 px-6 bg-zinc-950 text-center">

        <h2 className="text-3xl font-bold">
          Cara Kerja <span className="text-orange-500">Kami</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">

          {[
            "Consultation",
            "Planning",
            "Execution",
          ].map((step, i) => (
            <div key={i} className="bg-zinc-900 p-6 rounded-xl">
              <p className="text-orange-500 text-xl font-bold">0{i + 1}</p>
              <p className="mt-2">{step}</p>
            </div>
          ))}

        </div>

      </section>

      {/* ================= STRONG CTA ================= */}
      <section className="py-24 text-center px-6 bg-gradient-to-b from-black to-zinc-900">

        <h2 className="text-4xl font-bold">
          Siap Buat Event <span className="text-orange-500">Lebih Profesional?</span>
        </h2>

        <p className="text-zinc-400 mt-4">
          Jangan tunggu sampai slot penuh — booking sekarang
        </p>

        <a
          href="https://wa.me/6285183113349"
          className="inline-block mt-6 px-10 py-5 text-lg rounded-full bg-orange-500 hover:shadow-[0_0_30px_rgba(255,140,0,0.7)]"
        >
          🔥 Booking Sekarang
        </a>

      </section>

    </main>
  )
}