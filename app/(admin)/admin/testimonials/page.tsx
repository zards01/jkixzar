"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

type Testimonial = {
  id: string
  name: string
  position?: string
  event_category?: string
  event_type?: string
  content: string
  created_at: string
}

export default function TestimonialsPage() {
  const [data, setData] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)

    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })

    setData(data || [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus testimoni?")) return

    await supabase.from("testimonials").delete().eq("id", id)

    setData((prev) => prev.filter((t) => t.id !== id))
  }

  const SkeletonCard = () => (
    <div className="animate-pulse bg-zinc-900 rounded-xl border border-zinc-800 p-4 space-y-2">
      <div className="h-4 bg-zinc-700 rounded w-3/4" />
      <div className="h-3 bg-zinc-700 rounded w-1/2" />
      <div className="h-3 bg-zinc-700 rounded w-full" />
    </div>
  )

  return (
    <div className="p-4 md:p-6 text-zinc-100">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl text-black font-bold">💬 Testimonials</h1>
          <p className="text-zinc-500 text-sm">
            Kelola testimoni client
          </p>
        </div>

        <Link
          href="/admin/testimonials/new"
          className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-medium shadow-lg shadow-orange-500/20 transition"
        >
          + Tambah Testimoni
        </Link>
      </div>

      {/* MOBILE */}
      <div className="grid gap-4 md:hidden">

        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}

        {!loading && data.length === 0 && (
          <p className="text-center text-zinc-500 py-10">
            Belum ada testimoni
          </p>
        )}

        {!loading &&
          data.map((t) => (
            <div
              key={t.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
            >
              <div className="mt-3">
                <p className="italic text-zinc-300 line-clamp-3">
                {t.content}
              </p>
                <p className="font-semibold">{t.name}</p>

                {t.position && (
                  <p className="text-xs text-zinc-400">{t.position}</p>
                )}

                <p className="text-xs text-orange-400 mt-1">
                  {t.event_category} • {t.event_type}
                </p>
              </div>

              <button
                onClick={() => handleDelete(t.id)}
                className="text-red-400 text-sm mt-3"
              >
                Hapus
              </button>
            </div>
          ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-zinc-800 text-zinc-300">
            <tr>
              <th className="p-4 text-left">Client</th>
              <th className="p-4 text-left">Event</th>
              <th className="p-4 text-left">Testimoni</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t border-zinc-800">
                  <td className="p-4">
                    <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
                  </td>
                </tr>
              ))}

            {!loading &&
              data.map((t) => (
                <tr
                  key={t.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/50"
                >
                  <td className="p-4">
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-zinc-400">{t.position}</p>
                  </td>

                  <td className="p-4 text-zinc-400">
                    {t.event_category} • {t.event_type}
                  </td>

                  <p className="italic text-zinc-300">
                "{t.content}"
              </p>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}