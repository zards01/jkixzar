"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Particles from "@/components/Particles"
import Link from "next/link"

type Blog = {
  id: string
  title: string
  slug: string
  image: string
  content: string
  created_at: string
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
export default function BlogDetailPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single()

      if (!error) setBlog(data)
      setLoading(false)
    }

    if (slug) fetchBlog()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-zinc-400">
        Loading...
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-zinc-400">
        <p>Artikel tidak ditemukan</p>
        <Link href="/blog" className="text-orange-500 mt-4">
          ← Kembali
        </Link>
      </div>
    )
  }

  return (
    <main className="bg-black text-white min-h-screen">

      {/* ================= HERO ================= */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">

        {/* IMAGE */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/70" />

        {/* PARTICLES */}
        <div className="absolute inset-0 opacity-20">
          <Particles />
        </div>

        {/* CONTENT */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold max-w-3xl"
          >
            {blog.title}
          </motion.h1>

          <p className="text-zinc-400 mt-4">
            {new Date(blog.created_at).toLocaleDateString()}
          </p>

        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert max-w-none"
          >
            {/* ⚠️ IMPORTANT: jika content HTML */}
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.div>

          {/* BACK BUTTON */}
          <div className="mt-16">
            <Link
              href="/blog"
              className="text-orange-500 hover:underline"
            >
              ← Kembali ke Blog
            </Link>
          </div>

        </div>
      </section>
 <FAQSection />
      {/* ================= CTA ================= */}
      <section className="py-20 text-center bg-gradient-to-b from-black to-zinc-900">

        <h2 className="text-3xl md:text-4xl font-bold">
          Butuh Event Profesional?
        </h2>

        <a
          href="https://wa.me/6285183113349"
          className="inline-block mt-6 px-8 py-4 rounded-full bg-orange-500 hover:shadow-[0_0_30px_rgba(255,120,0,0.7)] transition"
        >
          Konsultasi Sekarang
        </a>

      </section>

    </main>
  )
}