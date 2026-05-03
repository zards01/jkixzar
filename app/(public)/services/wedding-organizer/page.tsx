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

export default function WeddingPage() {

  const [gallery, setGallery] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
const [testimonialIndex, setTestimonialIndex] = useState(0)

const testimonials = [
  {
    name: "Rina & Andi",
    text: "Kami benar-benar tidak perlu memikirkan apa pun. Semua berjalan sempurna!",
  },
  {
    name: "Dewi & Rizky",
    text: "Dekorasi sangat mewah dan sesuai impian kami. Timnya profesional!",
  },
  {
    name: "Salsa & Dimas",
    text: "Hari paling bahagia kami jadi jauh lebih berkesan berkat tim ini.",
  },

  // 🔥 TAMBAHAN 20 TESTI
  {
    name: "Nadia & Fajar",
    text: "Awalnya kami takut ribet, tapi semuanya di-handle dengan sangat rapi.",
  },
  {
    name: "Putri & Ardi",
    text: "Vendor lengkap, koordinasi rapi, hasilnya luar biasa!",
  },
  {
    name: "Ayu & Bima",
    text: "Kami cuma datang dan menikmati hari pernikahan. Sisanya diurus semua.",
  },
  {
    name: "Tasya & Ilham",
    text: "Pelayanan cepat, responsif, dan sangat profesional.",
  },
  {
    name: "Lia & Rendi",
    text: "Dekorasi sesuai moodboard kami, bahkan lebih bagus dari ekspektasi.",
  },
  {
    name: "Maya & Dito",
    text: "Timnya sabar banget menghadapi revisi kami. Hasilnya perfect!",
  },
  {
    name: "Vina & Yoga",
    text: "Acara berjalan lancar tanpa kendala sedikit pun.",
  },
  {
    name: "Citra & Adi",
    text: "Kami merasa seperti tamu di pernikahan sendiri karena semuanya diurus.",
  },
  {
    name: "Sari & Kevin",
    text: "Sangat worth it! Tidak menyesal memilih WO ini.",
  },
  {
    name: "Bella & Rangga",
    text: "Detail kecil pun diperhatikan, benar-benar totalitas.",
  },
  {
    name: "Nina & Hafiz",
    text: "Komunikasi sangat enak dan jelas dari awal sampai akhir.",
  },
  {
    name: "Dina & Reza",
    text: "Timnya on time dan sangat terorganisir.",
  },
  {
    name: "Wulan & Fikri",
    text: "Kami dapat banyak pujian dari tamu. Terima kasih!",
  },
  {
    name: "Rika & Bagas",
    text: "Konsep unik kami berhasil diwujudkan dengan sempurna.",
  },
  {
    name: "Yuni & Akbar",
    text: "Semua vendor bekerja sinkron, tidak ada miss sama sekali.",
  },
  {
    name: "Tari & Joko",
    text: "Kami merasa tenang karena semuanya sudah di-handle.",
  },
  {
    name: "Lina & Arman",
    text: "Highly recommended untuk yang tidak mau ribet!",
  },
  {
    name: "Mega & Andra",
    text: "Proses dari awal sampai hari H sangat smooth.",
  },
  {
    name: "Rani & Dika",
    text: "Timnya detail-oriented dan sangat berpengalaman.",
  },
  {
    name: "Siska & Dani",
    text: "Pernikahan impian kami benar-benar terwujud!",
  },
]
 useEffect(() => {
     const fetchGallery = async () => {
       setLoading(true)
 
       const { data } = await supabase
         .from("projects")
         .select("gallery, category_id")
         .eq("category_id", "e8479d36-730f-4f8c-a5ad-4741ec20d084") // 🔥 ganti
 
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
    document.body.style.overflow = lightboxOpen ? "hidden" : "auto"
  }, [lightboxOpen])

  const getSideImages = () => {
    if (gallery.length === 0) return []
    return [1, 2, 3].map(
      (i) => gallery[(index + i) % gallery.length]
    )
  }
useEffect(() => {
  const interval = setInterval(() => {
    setTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    )
  }, 4000)

  return () => clearInterval(interval)
}, [])


  const sideImages = getSideImages()

  return (
    <main className="bg-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center px-6">

        <img
          src="/image/heroWO.png"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

        <div className="absolute inset-0 opacity-30">
          <Particles />
        </div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold">
            Wedding{" "}
            <span className="text-orange-500">
              Organizer
            </span>
          </h1>

          <p className="mt-4 text-zinc-300">
            Kami Wujudkan Hari Spesial Anda Menjadi Momen Tak Terlupakan
          </p>

          <a
            href="https://wa.me/6285183113349"
            className="inline-block mt-8 px-8 py-3 rounded-full bg-orange-500 hover:shadow-[0_0_30px_rgba(255,120,0,0.7)] transition"
          >
            Konsultasi Gratis
          </a>
        </div>

      </section>

      {/* INTRO */}
      <section className="py-20 px-6 bg-black">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tentang{" "}
            <span className="text-orange-500">
              Layanan Kami
            </span>
          </h2>

          <p className="text-zinc-400">
            Kami adalah tim Wedding Organizer profesional yang siap membantu Anda merancang pernikahan impian dengan konsep yang elegan, modern, dan penuh makna.
          </p>

          <p className="text-zinc-400 mt-4">
            Dari tahap perencanaan hingga hari H, kami memastikan setiap detail berjalan sempurna tanpa stres, sehingga Anda dapat menikmati setiap momen berharga.
          </p>

          {/* CARD */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">

            {[
              {
                title: "Wedding Planning",
                desc: "Perencanaan pernikahan dari awal hingga hari H secara detail dan terstruktur.",
                img: "/image/Planning.png",
              },
              {
                title: "Wedding Decoration",
                desc: "Dekorasi eksklusif sesuai tema impian Anda, dari klasik hingga modern.",
                img: "/image/Decoration.png",
              },
              {
                title: "Makeup & Attire",
                desc: "Penampilan terbaik untuk momen spesial Anda dengan tim profesional.",
                img: "/image/Makeup.png",
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
                  group
                  bg-zinc-900/80 backdrop-blur-xl
                  border border-zinc-800
                  rounded-2xl overflow-hidden
                  hover:border-orange-500/40
                  hover:shadow-[0_0_30px_rgba(255,120,0,0.2)]
                  transition
                "
              >

                <div className="h-[180px] overflow-hidden">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

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

{/* ================= PRICING ================= */}
<section className="py-24 px-6 bg-zinc-950">

  <div className="max-w-6xl mx-auto text-center ">

    <h2 className="text-4xl font-bold mb-4">
      Pilih Paket <span className="text-orange-500">Pernikahan Anda</span>
    </h2>

    <p className="text-zinc-400 mb-12">
      Sesuaikan dengan kebutuhan dan budget, tanpa ribet.
    </p>

    <div className="grid md:grid-cols-3 gap-8 ">

      {[
        {
          name: "Silver",
          price: "Mulai 50 JT",
          desc: "Untuk intimate wedding sederhana",
          highlight: false,
        },
        {
          name: "Gold ⭐",
          price: "Mulai 65 JT",
          desc: "Paket paling favorit + dekor + dokumentasi",
          highlight: true,
        },
        {
          name: "Platinum",
          price: "Mulai 100 JT",
          desc: "Full service luxury wedding",
          highlight: false,
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -8, scale: 1.03 }}
          className={`
            relative p-8 rounded-2xl border transition
            ${item.highlight
              ? "border-orange-500 bg-zinc-900 shadow-[0_0_40px_rgba(255,120,0,0.2)] hover:shadow-[0_0_30px_rgba(255,120,0,0.7)] transition"
              : "border-zinc-800 bg-zinc-900 hover:shadow-[0_0_30px_rgba(255,120,0,0.7)] transition"}
          `}
        >

          {/* BADGE BEST */}
          {item.highlight && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-black text-xs px-4 py-1 rounded-full ">
              BEST CHOICE
            </div>
          )}

          <h3 className="text-xl font-semibold">
            {item.name}
          </h3>

          <p className="text-4xl text-orange-500 mt-4 font-bold">
            {item.price}
          </p>

          <p className="text-zinc-400 mt-4 text-sm">
            {item.desc}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-zinc-300 text-left">
            <li>✔ Wedding Planner</li>
            <li>✔ Koordinasi Hari H</li>
            <li>✔ Vendor Support</li>
            {item.highlight && <li>✔ Dokumentasi Foto & Video</li>}
          </ul>

          <a
            href="https://wa.me/6285183113349"
            className="block mt-8 py-3 rounded-full bg-orange-500 hover:shadow-[0_0_20px_rgba(255,120,0,0.6)] transition"
          >
            Pilih Paket
          </a>

        </motion.div>
      ))}

    </div>

  </div>
</section>

      {/* SERVICES */}
      <section className="py-20 px-6 bg-zinc-950">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-12">
            Paket{" "}
            <span className="text-orange-500">
              Pernikahan
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {[
              {
                title: "Silver Package",
                desc: "Solusi terbaik untuk intimate wedding yang sederhana namun tetap elegan.",
              },
              {
                title: "Gold Package",
                desc: "Paket lengkap dengan dekorasi, dokumentasi, dan koordinasi acara.",
              },
              {
                title: "Platinum Package",
                desc: "Pernikahan mewah dengan layanan all-in dan konsep eksklusif.",
              },
              {
                title: "Custom Wedding",
                desc: "Kami wujudkan konsep pernikahan sesuai keinginan dan budget Anda.",
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
                  Konsultasi →
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
            Wedding{" "}
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

{/* ================= TESTIMONI ================= */}
<section className="py-24 px-6 bg-black">

  <div className="max-w-4xl mx-auto text-center">

    <h2 className="text-4xl font-bold mb-4">
      Apa Kata <span className="text-orange-500">Client Kami</span>
    </h2>

    <p className="text-zinc-400 mb-12">
      Testimoni nyata dari pasangan yang sudah mempercayakan hari spesial mereka.
    </p>

    <div className="relative">

      <AnimatePresence mode="wait">
        <motion.div
          key={testimonialIndex}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="
            bg-zinc-900/80 backdrop-blur-xl
            border border-zinc-800
            rounded-2xl p-10
          "
        >

          <p className="text-lg text-zinc-300 leading-relaxed">
            “{testimonials[testimonialIndex].text}”
          </p>

          <div className="mt-6">
            <p className="text-orange-500 font-semibold">
              {testimonials[testimonialIndex].name}
            </p>
          </div>

        </motion.div>
      </AnimatePresence>

    </div>

  </div>
</section>

      {/* CTA */}
      <section className="py-20 text-center bg-gradient-to-b from-black to-zinc-900">

        <h2 className="text-4xl font-bold">
          Siap Mewujudkan{" "}
          <span className="text-orange-500">
            Pernikahan Impian?
          </span>
        </h2>

        <p className="text-zinc-400 mt-4">
          Hubungi kami sekarang dan mulai perjalanan menuju hari bahagia Anda.
        </p>

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
