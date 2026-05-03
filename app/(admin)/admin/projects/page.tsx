"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

type Project = {
  id: string
  title: string
  slug: string
  thumbnail: string
  category: string
  status: string
  date: string
  gallery?: string[]
}

export default function ProjectsPage() {
  const [data, setData] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setData(data || [])
    setLoading(false)
  }

  // ================= DELETE =================
  const getPublicId = (url: string) => {
    try {
      const parts = url.split("/")
      const file = parts[parts.length - 1]
      return file.split(".")[0]
    } catch {
      return null
    }
  }

  const handleDelete = async (project: Project) => {
    if (!confirm("Hapus project + semua gambar?")) return

    try {
      const allImages = [
        ...(project.gallery || []),
        project.thumbnail,
      ].filter(Boolean)

      for (const img of allImages) {
        const publicId = getPublicId(img)
        if (!publicId) continue

        await fetch("/api/delete-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: publicId }),
        })
      }

      await supabase.from("projects").delete().eq("id", project.id)

      setData((prev) => prev.filter((p) => p.id !== project.id))
    } catch {
      alert("Gagal hapus")
    }
  }

  // ================= STATUS COLOR =================
  const statusStyle = (status: string) => {
    if (status === "published")
      return "bg-green-500/20 text-green-400"
    if (status === "draft")
      return "bg-yellow-500/20 text-yellow-400"

    return "bg-zinc-700 text-zinc-300"
  }

  // ================= SKELETON =================
  const SkeletonCard = () => (
    <div className="animate-pulse bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
      <div className="h-40 bg-zinc-800" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-zinc-700 rounded w-3/4" />
        <div className="h-3 bg-zinc-700 rounded w-1/2" />
      </div>
    </div>
  )

  return (
    <div className="p-4 md:p-6 text-zinc-100">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl text-zinc-800 font-bold">📁 Projects</h1>
          <p className="text-zinc-500 text-sm">
            Kelola semua project event
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-medium shadow-lg shadow-orange-500/20 transition"
        >
          + Tambah Project
        </Link>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="grid gap-4 md:hidden">

        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}

        {!loading && data.length === 0 && (
          <p className="text-center text-zinc-500 py-10">
            Belum ada project
          </p>
        )}

        {!loading &&
          data.map((item) => (
            <div
              key={item.id}
              className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-orange-500/40 transition"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.thumbnail}
                  className="w-full h-44 object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <span
                  className={`absolute top-3 left-3 text-xs px-2 py-1 rounded ${statusStyle(item.status)}`}
                >
                  {item.status}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h2 className="font-semibold line-clamp-1">
                  {item.title}
                </h2>

                <p className="text-xs text-zinc-400">
                  {item.category}
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  {item.date}
                </p>

                {/* ACTION */}
                <div className="flex justify-between mt-4 text-sm">
                  <Link
                    href={`/admin/projects/edit/${item.id}`}
                    className="text-green-400 hover:text-green-300"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(item)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}

      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-zinc-800 text-zinc-300">
            <tr>
              <th className="p-4 text-left">Project</th>
              <th className="p-4 text-left">Kategori</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Tanggal</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t border-zinc-800">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-14 h-14 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
                  </td>
                </tr>
              ))}

            {!loading &&
              data.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                >
                  {/* PROJECT */}
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={item.thumbnail}
                      className="w-14 h-14 object-cover rounded-lg"
                    />

                    <div>
                      <p className="font-medium text-white">
                        {item.title}
                      </p>
                    </div>
                  </td>

                  <td className="p-4 text-zinc-400">
                    {item.category}
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${statusStyle(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4 text-zinc-400">
                    {item.date}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-4">
                      <Link
                        href={`/admin/projects/edit/${item.id}`}
                        className="text-green-400 hover:text-green-300"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(item)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}