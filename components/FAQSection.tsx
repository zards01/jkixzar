"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    category: "Event Corporate",
    questions: [
      {
        q: "Apa saja layanan event corporate yang tersedia?",
        a: "Kami melayani gathering perusahaan, seminar, launching produk, awarding night, conference, training event, family gathering, dan brand activation."
      },
      {
        q: "Apakah melayani event di luar Jakarta dan Bandung?",
        a: "Ya, PT Juragan Kreasi Indonesia melayani event di seluruh Indonesia."
      },
      {
        q: "Apakah bisa request konsep acara custom?",
        a: "Tentu, kami menyesuaikan konsep event dengan kebutuhan brand atau perusahaan Anda."
      }
    ]
  },
  {
    category: "Event Pemerintah & LPSE",
    questions: [
      {
        q: "Apakah PT Juragan Kreasi Indonesia terdaftar di LPSE?",
        a: "Ya, kami telah terdaftar sebagai anggota LPSE untuk mendukung kebutuhan event pemerintahan dan pengadaan resmi."
      },
      {
        q: "Event apa saja yang bisa ditangani?",
        a: "Kami menangani seminar pemerintah, pelatihan ASN, pameran daerah, dan berbagai kegiatan resmi lainnya."
      }
    ]
  },
  {
    category: "Dokumentasi Event",
    questions: [
      {
        q: "Apakah menyediakan fotografer dan videografer profesional?",
        a: "Ya, kami memiliki tim dokumentasi profesional untuk foto event, videografi, drone, dan after movie."
      },
      {
        q: "Apakah hasil dokumentasi bisa digunakan untuk media sosial?",
        a: "Tentu, hasil dokumentasi dapat disesuaikan untuk Instagram, TikTok, YouTube, dan kebutuhan promosi digital lainnya."
      }
    ]
  }
]

// Copy section ini dan paste SETELAH section client di homepage kamu

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id)
  }

  return (
    <section className="py-20 bg-black text-white px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Temukan jawaban seputar layanan Event Organizer, dokumentasi event, 
            dan general supplier dari PT Juragan Kreasi Indonesia.
          </p>
        </div>

        {faqData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-10">
            <h3 className="text-2xl font-semibold mb-5 text-orange-400">
              {section.category}
            </h3>

            <div className="space-y-4">
              {section.questions.map((item, index) => {
                const id = `${sectionIndex}-${index}`
                const isOpen = openIndex === id

                return (
                  <div
                    key={id}
                    className="border border-gray-800 rounded-2xl overflow-hidden bg-zinc-900"
                  >
                    <button
                      onClick={() => toggleFAQ(id)}
                      className="w-full flex justify-between items-center p-5 text-left"
                    >
                      <span className="font-medium text-lg">{item.q}</span>
                      <ChevronDown
                        className={`transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-gray-300">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Masih punya pertanyaan tentang event Anda?
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold transition">
            Hubungi Kami Sekarang
          </button>
        </div>
      </div>
    </section>
  )
}
