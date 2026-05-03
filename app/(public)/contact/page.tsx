"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin } from "lucide-react"
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
export default function ContactPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    const text = `Halo PT Juragan Kreasi Indonesia,

Nama: ${name}
No WA: ${phone}

Pesan:
${message}`

    const whatsappUrl = `https://wa.me/6285183113349?text=${encodeURIComponent(
      text
    )}`

    window.open(whatsappUrl, "_blank")
  }

  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.15),transparent_70%)]" />

        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold">
            Contact <span className="text-orange-500">Us</span>
          </h1>

          <p className="text-zinc-400 mt-4">
            Hubungi kami untuk konsultasi event terbaik Anda.
          </p>
        </div>
      </section>

      {/* ================= CONTACT CARDS ================= */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          {/* PHONE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 text-center"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Phone />
            </div>

            <h3 className="text-xl font-semibold mb-2">Phone Number</h3>

            <p className="text-zinc-400 text-sm">
              Call : 0851-8311-3349
            </p>
            <p className="text-zinc-400 text-sm mt-2">
              WA 1 : 0851-8311-3349 (Jakarta)
            </p>
            <p className="text-zinc-400 text-sm">
              WA 2 : 0813-2602-6600 (Cirebon)
            </p>
          </motion.div>

          {/* EMAIL */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 text-center"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Mail />
            </div>

            <h3 className="text-xl font-semibold mb-2">Email</h3>

            <p className="text-zinc-400 text-sm">
              juragankreasi.idn@gmail.com
            </p>
          </motion.div>

          {/* ADDRESS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 text-center"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <MapPin />
            </div>

            <h3 className="text-xl font-semibold mb-2">Address</h3>

            <p className="text-zinc-400 text-sm">
              Gedung Ascom, Jl. Matraman Raya No.67 Palmeriam
            </p>

            <p className="text-zinc-400 text-sm mt-3">
              Jakarta Selatan
            </p>

            <p className="text-zinc-400 text-sm mt-3">
              Cirebon
            </p>
          </motion.div>

        </div>
      </section>

      {/* ================= SEND MESSAGE ================= */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mt-10 mx-auto">

          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">
              Send a <span className="text-orange-500">Message</span>
            </h2>

            <p className="text-zinc-400 mb-5 mt-3">
              Isi form berikut dan tim kami akan segera menghubungi Anda.
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8">

            {/* Nama */}
            <div className="mb-5">
              <label className="block mb-2 text-sm text-zinc-300">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            {/* No WA */}
            <div className="mb-5">
              <label className="block mb-2 text-sm text-zinc-300">
                No WhatsApp
              </label>
              <input
                type="text"
                placeholder="08xxxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            {/* Pesan */}
            <div className="mb-6">
              <label className="block mb-2 text-sm text-zinc-300">
                Pesan
              </label>
              <textarea
                rows={5}
                placeholder="Ceritakan kebutuhan event Anda..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-orange-500 py-4 rounded-xl font-semibold hover:shadow-[0_0_25px_rgba(255,140,0,0.5)] transition"
            >
              Kirim via WhatsApp
            </button>

          </div>
        </div>
      </section>

<FAQSection />

          {/* ================= FINAL CTA ================= */}
      <section className="py-15 text-center px-6 bg-gradient-to-b from-black to-zinc-900">

       <h2 className="text-3xl mt-10 font-bold">
          Siap Buat Event <span className="text-orange-500">Keren?</span>
        </h2>

        <p className="text-zinc-400 mt-3">
          Konsultasi gratis sekarang juga
        </p>

        <a
          href="https://wa.me/6285183113349"
          target="_blank"
          className="inline-block mt-6 px-8 py-4 rounded-full bg-orange-500"
        >
          Chat WhatsApp
        </a>

      </section>

    </main>
  )
}