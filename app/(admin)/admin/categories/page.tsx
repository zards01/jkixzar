"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

type Category = {
  id: string
  name: string
  slug: string
  created_at: string
}

export default function CategoriesPage() {
  const [data, setData] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  /* ================= FETCH ================= */
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("event_categories")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setData(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Hapus kategori ini?")) return

    await supabase.from("event_categories").delete().eq("id", id)

    setData((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">📂 Event Categories</h1>
          <p className="text-zinc-500 text-sm">
            Kelola kategori event
          </p>
        </div>

        <Link
          href="/admin/categories/new"
          className="bg-orange-500 px-5 py-2 rounded-xl hover:bg-orange-600 transition"
        >
          + Tambah
        </Link>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-zinc-800 animate-pulse rounded-xl" />
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading && data.length === 0 && (
        <p className="text-center text-zinc-500 py-20">
          Belum ada kategori
        </p>
      )}

      {/* TABLE */}
      {!loading && data.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">

          <table className="w-full text-sm">
            <thead className="bg-zinc-800 text-zinc-300">
              <tr>
                <th className="p-4 text-left">Nama</th>
                <th className="p-4 text-left">Slug</th>
                <th className="p-4 text-left">Tanggal</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((c) => (
                <tr key={c.id} className="border-t border-zinc-800 hover:bg-zinc-800/50">

                  <td className="p-4 font-medium">{c.name}</td>

                  <td className="p-4 text-zinc-400">{c.slug}</td>

                  <td className="p-4 text-zinc-500">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-400 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

    </div>
  )
}