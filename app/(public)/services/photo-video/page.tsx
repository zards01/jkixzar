"use client"

import { motion, AnimatePresence } from "framer-motion"
import Particles from "@/components/Particles"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Project = {
  id: string
  gallery: string[] | null
  category_id: string
}
/* ================= FAQ DATA ================= */
const faqData = [
{
  category: "",
  questions: [
    {
      q: "Apakah menyediakan jasa fotografer dan videografer profesional?",
      a: "Ya, kami menyediakan layanan foto dan videografer profesional untuk event corporate, wedding, seminar, konser, hingga brand activation dengan hasil berkualitas tinggi."
    },
    {
      q: "Apakah tersedia layanan dokumentasi foto dan video untuk event perusahaan?",
      a: "Tentu. Kami melayani dokumentasi lengkap untuk event perusahaan seperti gathering, launching produk, meeting, dan event internal maupun eksternal."
    },
    {
      q: "Apakah menyediakan layanan video highlight atau after movie event?",
      a: "Ya, kami menyediakan pembuatan after movie, highlight video, hingga cinematic video yang dapat digunakan untuk promosi dan dokumentasi perusahaan."
    },
    {
      q: "Apakah bisa request konsep foto dan video sesuai brand?",
      a: "Bisa. Tim kami dapat menyesuaikan konsep foto dan video sesuai branding perusahaan, tema event, dan kebutuhan promosi digital Anda."
    },
    {
      q: "Apakah hasil foto dan video bisa digunakan untuk media sosial?",
      a: "Ya, semua hasil dokumentasi kami dioptimalkan untuk kebutuhan media sosial seperti Instagram, TikTok, YouTube, website, dan kebutuhan marketing lainnya."
    },
    {
      q: "Apakah menyediakan drone untuk dokumentasi event?",
      a: "Ya, kami menyediakan layanan drone untuk pengambilan gambar aerial agar hasil dokumentasi lebih cinematic dan profesional."
    },
      {
      q: "Berapa harga jasa fotografer dan videografer event di Jakarta dan Bandung?",
      a: "Harga jasa fotografer dan videografer event di Jakarta dan Bandung tergantung pada jenis acara, durasi, jumlah tim, konsep produksi, serta kebutuhan tambahan seperti drone, live streaming, dan after movie. Kami menyediakan paket fleksibel sesuai kebutuhan klien."
    },
   
  ]
},

 {
  category: "",
  questions: [
    {
      q: "Apa saja layanan jasa fotografer dan videografer profesional untuk event di Jakarta dan Bandung?",
      a: "Kami menyediakan jasa fotografer dan videografer profesional untuk event di Jakarta, Bandung, dan seluruh Indonesia, termasuk corporate event, seminar, workshop, gathering perusahaan, launching produk, konser, hingga wedding event dengan hasil dokumentasi berkualitas tinggi dan standar industri."
    },
    {
      q: "Apakah tersedia jasa dokumentasi event perusahaan (corporate event documentation)?",
      a: "Ya, kami menyediakan layanan corporate event documentation profesional meliputi foto dan video untuk perusahaan, mulai dari gathering, meeting internal, seminar, peluncuran produk, hingga event branding perusahaan dengan hasil yang siap digunakan untuk marketing dan media sosial."
    },
    {
      q: "Apakah menyediakan jasa videografer untuk after movie dan highlight event?",
      a: "Kami menyediakan jasa videografer profesional untuk pembuatan after movie event, highlight video, dan cinematic video dengan storytelling yang kuat untuk kebutuhan promosi perusahaan, branding, dan publikasi media sosial seperti YouTube, Instagram, dan TikTok."
    },
    {
      q: "Apakah bisa custom konsep foto dan video sesuai branding perusahaan?",
      a: "Ya, kami menyediakan layanan custom konsep foto dan video yang disesuaikan dengan branding perusahaan, konsep acara, dan tujuan marketing agar hasil dokumentasi lebih efektif untuk promosi bisnis Anda."
    },
    {
      q: "Apakah hasil foto dan video bisa digunakan untuk kebutuhan media sosial dan digital marketing?",
      a: "Tentu, seluruh hasil jasa fotografer dan videografer kami sudah dioptimalkan untuk kebutuhan digital marketing seperti Instagram, TikTok, YouTube, website perusahaan, hingga campaign branding digital."
    },
    {
      q: "Apakah tersedia layanan drone untuk dokumentasi event profesional?",
      a: "Ya, kami menyediakan layanan drone videography dan aerial photography untuk dokumentasi event agar hasil visual lebih cinematic, modern, dan menarik untuk kebutuhan promosi perusahaan maupun publikasi media."
    },
   {
      q: "Bagaimana cara booking jasa fotografer dan videografer profesional?",
      a: "Anda dapat melakukan booking jasa fotografer dan videografer profesional dengan menghubungi tim kami melalui WhatsApp atau form kontak website untuk konsultasi gratis mengenai kebutuhan event Anda."
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

export default function PhotoVideoPage() {

  /* ================= GALLERY STATE ================= */
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
        .select("gallery, category_id")
        .eq("category_id", "0b115848-97b2-460c-8266-d6d60184d42c") // 🔥 ganti

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
          src="/image/photo-video.png"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

        <div className="absolute inset-0 opacity-30">
          <Particles />
        </div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold">
            Photo &{" "}
            <span className="text-orange-500">
              Videographer
            </span>
          </h1>

          <p className="mt-4 text-zinc-300">
            Capture Every Moment with Cinematic Quality
          </p>

          <a
            href="https://wa.me/6285183113349"
            className="inline-block mt-8 px-8 py-3 rounded-full bg-orange-500 hover:shadow-[0_0_30px_rgba(255,120,0,0.7)] transition"
          >
            Book Now
          </a>
        </div>

      </section>

      {/* ================= INTRO ================= */}
      <section className="py-20 px-6 bg-black">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tentang{" "}
            <span className="text-orange-500">
              Layanan Ini
            </span>
          </h2>

          <p className="text-zinc-400">
            Layanan Photo & Videographer kami menghadirkan dokumentasi visual berkualitas tinggi untuk berbagai jenis event, mulai dari corporate, wedding, hingga konser dan festival.
          </p>

          <p className="text-zinc-400 mt-4">
            Dengan tim profesional dan peralatan modern, kami memastikan setiap momen tertangkap dengan sempurna dan penuh emosi.
          </p>

          {/* ================= CARD ================= */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">

  {[
    {
      title: "Videography",
      desc: "Produksi video cinematic untuk promosi, iklan, dan storytelling brand.",
      img: "/image/videography.png",
    },
    {
      title: "Photography",
      desc: "Foto berkualitas tinggi untuk event, produk, dan corporate.",
      img: "/image/photography.png",
    },
    {
      title: "Brand Storytelling",
      desc: "Membangun narasi visual yang kuat dan emosional untuk brand Anda.",
      img: "/image/storytelling.png",
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
        hover:shadow-[0_0_30px_rgba(255,120,0,0.2)]
        transition
      "
    >

      {/* 🔥 THUMBNAIL (INI LETAKNYA) */}
      <div className="h-[180px] overflow-hidden">
        <img
          src={item.img}
          className="
            w-full h-full object-cover
            transition duration-700
            group-hover:scale-110
          "
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
      <section className="py-20 px-6 bg-zinc-950">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-12">
            Our <span className="text-orange-500">Service</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {[
              {
                title: "Video Outputs",
                desc: "Video promosi, corporate, event, dan social media.",
              },
              {
                title: "Photo Outputs",
                desc: "Fotografi produk, corporate, event, dan konten media sosial.",
              },
              {
                title: "Video & Photo Package",
                desc: "Paket lengkap untuk campaign dan event.",
              },
              {
                title: "Live Streaming",
                desc: "Broadcast real-time untuk event dan webinar.",
              },
              {
                title: "Podcast Production",
                desc: "Produksi podcast dari recording hingga editing.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>

                <p className="text-zinc-400 text-sm">
                  {item.desc}
                </p>

                <a
                  href="https://wa.me/6285183113349"
                  className="inline-block mt-4 text-orange-500 text-sm"
                >
                  Book Now →
                </a>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-24 px-6 bg-black">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl text-center font-bold mb-12">
            Photo & Video{" "}
            <span className="text-orange-500">
              Gallery
            </span>
          </h2>

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

<FAQSection />

      {/* ================= CTA ================= */}
      <section className="py-20 text-center bg-gradient-to-b from-black to-zinc-900">

        <h2 className="text-4xl font-bold">
          Siap Mengabadikan{" "}
          <span className="text-orange-500">
            Momen Anda?
          </span>
        </h2>

        <a
          href="https://wa.me/6285183113349"
          className="inline-block mt-8 px-8 py-4 rounded-full bg-orange-500"
        >
          Booking Sekarang
        </a>

      </section>

    </main>
  )
}