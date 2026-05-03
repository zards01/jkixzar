"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import Particles from "@/components/Particles"

type Blog = {
  id: string
  title: string
  slug: string
  image: string
  excerpt: string
  created_at: string
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false })

      if (data) setBlogs(data)
      setLoading(false)
    }

    fetchBlogs()
  }, [])

  const featured = blogs[0]
  const latestBlogs = blogs.slice(1)

  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative py-32 px-6 text-center overflow-hidden">

        {/* glow */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-orange-500/20 blur-[180px] rounded-full" />

        {/* particles */}
        <div className="absolute inset-0 opacity-20">
          <Particles />
        </div>

        {/* gradient */}
        <div className="absolute mt- inset-0 bg-gradient-to-b from-black via-black to-zinc-950" />

        <div className="relative mt-10 mb-10 z-10 max-w-4xl mx-auto">
          <p className="text-orange-500 uppercase tracking-[4px] text-sm mb-4">
            Blog & Insight
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Insight &{" "}
            <span className="text-orange-500">
              Artikel
            </span>
          </h1>

          <p className="text-zinc-400 mt-6 mb-5 max-w-2xl mx-auto leading-relaxed">
            Insight seputar event organizer, produksi event,
            branding activation, exhibition, wedding,
            dan strategi event profesional.
          </p>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      {!loading && featured && (
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                grid lg:grid-cols-2 gap-10 items-center
                bg-zinc-900/70
                backdrop-blur-xl
                border border-zinc-800
                rounded-3xl
                overflow-hidden
              "
            >
              {/* IMAGE */}
              <div className="relative h-[300px] md:h-[500px] overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="p-8 md:p-12">

                <span className="text-orange-500 text-sm uppercase tracking-widest">
                  Featured Article
                </span>

                <h2 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
                  {featured.title}
                </h2>

                <p className="text-zinc-400 mt-5 leading-relaxed">
                  {featured.excerpt}
                </p>

                <p className="text-sm text-zinc-500 mt-5">
                  {new Date(featured.created_at).toLocaleDateString()}
                </p>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="
                    inline-block mt-8
                    px-10 py-3 rounded-full
                    bg-orange-500
                    hover:shadow-[0_0_25px_rgba(255,120,0,0.6)]
                    transition
                  "
                >
                  Baca Artikel →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ================= BLOG GRID ================= */}
      <section className="relative px-6 pb-32 bg-black">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.06),transparent_70%)]" />

        <div className="relative  max-w-6xl mx-auto">

          <div className="text-center mt-16 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Artikel{" "}
              <span className="text-orange-500">
                Terbaru
              </span>
            </h2>

            <p className="text-zinc-400 mt-4">
              Update terbaru seputar dunia event & production
            </p>
          </div>

          {latestBlogs.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 mb-5 gap-8">

              {latestBlogs.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="
                    group
                    bg-zinc-900/70
                    backdrop-blur-xl
                    border border-zinc-800
                    rounded-2xl
                    overflow-hidden
                    hover:border-orange-500/40
                    hover:shadow-[0_0_25px_rgba(255,120,0,0.15)]
                    transition
                  "
                >
                  {/* image */}
                  <div className="relative h-[220px] overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="
                        w-full h-full object-cover
                        group-hover:scale-110
                        transition duration-700
                      "
                    />

                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* content */}
                  <div className="p-6">

                    <p className="text-xs text-zinc-500 mb-3">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </p>

                    <h3 className="text-xl font-semibold line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-zinc-400 text-sm mt-3 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-block mt-5 text-orange-500 font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.div>
              ))}

            </div>
          ) : (
            <div className="text-center py-20 text-zinc-500">
              Belum ada artikel tersedia.
            </div>
          )}
        </div>
      </section>

      
      {/* ================= CTA ================= */}
      <section className="py-20 text-center bg-gradient-to-b from-black to-zinc-900">

        <h2 className="text-4xl font-bold">
          Siap Jelajahi Dunia{" "}
          <span className="text-orange-500">Bersama Kami?</span>
        </h2>

        <a
          href="https://wa.me/6285183113349"
          className="inline-block mt-8 px-8 py-4 rounded-full bg-orange-500 hover:shadow-[0_0_30px_rgba(255,120,0,0.7)] transition"
        >
          Booking Sekarang
        </a>

      </section>
    </main>
  )
}