"use client"

import { motion } from "framer-motion"
import Particles from "@/components/Particles"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      title: "Event Organizer",
      slug: "event-organizer",
      desc: "Kami menangani seluruh proses event dari konsep hingga eksekusi dengan detail dan profesional.",
      icon: "🎉",
    },
    {
      title: "Wedding Organizer",
      slug: "wedding-organizer",
      desc: "Wujudkan momen spesial Anda dengan perencanaan matang dan eksekusi yang sempurna.",
      icon: "💍",
    },
    {
      title: "Exhibition Production",
      slug: "exhibition",
      desc: "Produksi pameran profesional mulai dari booth, setup hingga manajemen event.",
      icon: "🏢",
    },
    {
      title: "Tour & Travel",
      slug: "tour-travel",
      desc: "Layanan perjalanan terorganisir dengan pengalaman nyaman dan menyenangkan.",
      icon: "✈️",
    },
    {
      title: "Broadcasting",
      slug: "broadcasting",
      desc: "Produksi live streaming dan broadcasting dengan kualitas profesional.",
      icon: "📡",
    },
    {
      title: "Photo & Videographer",
      slug: "photo-video",
      desc: "Dokumentasi event berkualitas tinggi untuk mengabadikan setiap momen penting.",
      icon: "📸",
    },
  ]

  return (
    <main className="bg-black text-white overflow-hidden">

      {/* ================= HERO ================= */}
<section className="relative flex items-center justify-center min-h-[70vh] overflow-hidden">

  {/* BACKGROUND IMAGE / GLOW */}
  <img
          src="/image/ourservice.png"
          className="absolute inset-0 w-full h-full object-cover"
        />
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
 

  {/* PARTICLES (lebih halus biar ga ganggu text) */}
  <div className="absolute inset-0 opacity-20">
    <Particles />
  </div>

  {/* FLOATING ORANGE GLOW */}
  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full" />

  {/* CONTENT */}
  <div className="relative z-10 text-center px-6 max-w-3xl">

    {/* BADGE */}
    <div className="inline-block mb-4 px-4 py-1 rounded-full border border-orange-500/30 text-orange-500 text-sm">
      Professional Event Solutions
    </div>

    {/* TITLE */}
    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
      Our <span className="text-orange-500">Services</span>
      <br />
      For Every Event
    </h1>

    {/* DESCRIPTION */}
    <p className="text-zinc-400 mt-5 leading-relaxed">
      Solusi lengkap mulai dari Event Organizer, Production, hingga Creative Service 
      untuk memastikan setiap event berjalan sempurna dan berkesan.
    </p>


  </div>

</section>

      {/* ================= INTRO SELLING ================= */}
      <section className="relative py-20 px-6 bg-black">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,120,0,0.08),transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto text-center">

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Bukan Sekadar Event, Tapi{" "}
            <span className="text-orange-500">Pengalaman Tak Terlupakan</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 mt-6 leading-relaxed"
          >
            Kami memahami bahwa setiap event memiliki tujuan, cerita, dan standar yang berbeda.
            Oleh karena itu, kami hadir tidak hanya sebagai vendor, tetapi sebagai partner strategis
            yang memastikan setiap detail berjalan sempurna — dari perencanaan hingga eksekusi.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-400 mt-4 leading-relaxed"
          >
            Dengan pengalaman menangani berbagai jenis acara, kami siap memberikan solusi kreatif,
            efisien, dan profesional sesuai kebutuhan Anda.
          </motion.p>

          {/* TRUST POINT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-zinc-400"
          >
            <span>✔ Profesional</span>
            <span>✔ Terpercaya</span>
            <span>✔ Full Service</span>
            <span>✔ Berpengalaman</span>
          </motion.div>

        </div>

      </section>

      {/* ================= SERVICES ================= */}
      <section className="relative py-24 px-6 bg-zinc-950">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.08),transparent_70%)]" />

        <div className="relative max-w-6xl mx-auto">

          {/* TITLE */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">
              Layanan <span className="text-orange-500">Kami</span>
            </h2>
            <p className="text-zinc-400 mt-3">
              Pilih layanan yang sesuai dengan kebutuhan event Anda
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-6">

            {services.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10 }}
                className="
                  relative bg-zinc-900/80 backdrop-blur-xl
                  border border-zinc-800
                  rounded-2xl p-8
                  flex flex-col justify-between
                  transition
                  hover:border-orange-500/40
                  hover:shadow-[0_0_30px_rgba(255,120,0,0.2)]
                "
              >

                <div>
                  <div className="w-14 h-14 mb-5 rounded-xl bg-orange-500/10 flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>

                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link
                    href={`/services/${item.slug}`}
                    className="
                      inline-block w-full text-center
                      px-4 py-2 rounded-full text-sm font-medium
                      border border-zinc-700
                      hover:bg-orange-500 hover:text-white
                      hover:border-orange-500
                      transition
                    "
                  >
                    Lihat Detail →
                  </Link>
                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 text-center px-6 bg-gradient-to-b from-black to-zinc-900">

        <h2 className="text-4xl font-bold">
          Siap Buat Event <span className="text-orange-500">Lebih Profesional?</span>
        </h2>

        <p className="text-zinc-400 mt-4">
          Konsultasikan kebutuhan Anda sekarang juga
        </p>

        <a
          href="https://wa.me/6285183113349"
          className="
            inline-block mt-6 px-8 py-4 rounded-full
            bg-orange-500
            hover:shadow-[0_0_25px_rgba(255,140,0,0.6)]
            transition
          "
        >
          Konsultasi Gratis
        </a>

      </section>

    </main>
  )
}