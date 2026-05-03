"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

type Blog = {
  id: string
  title: string
  slug: string
  image: string
  created_at: string
  published: boolean
}

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  // ================= FETCH =================
  const fetchBlogs = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setBlogs(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

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

  const handleDelete = async (id: string, image?: string) => {
    if (!confirm("Hapus blog + gambar?")) return

    try {
      // 🔥 DELETE IMAGE
      if (image) {
        const publicId = getPublicId(image)

        if (publicId) {
          await fetch("/api/delete_image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ public_id: publicId }),
          })
        }
      }

      // 🔥 DELETE DB
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", id)

      if (error) throw error

      setBlogs((prev) => prev.filter((b) => b.id !== id))

      alert("Berhasil hapus")
    } catch (err) {
      console.log(err)
      alert("Gagal hapus")
    }
  }

  return (
    <div className="p-4 md:p-6 bg-zinc-950 min-h-screen text-zinc-100">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">
          📚 Blog Admin
        </h1>

        <Link
          href="/admin/blog/new"
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white text-center transition"
        >
          + Tambah Blog
        </Link>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-zinc-500 animate-pulse">Loading...</p>
      )}

      {/* EMPTY */}
      {!loading && blogs.length === 0 && (
        <p className="text-zinc-500">Belum ada blog</p>
      )}

      {/* ================= DESKTOP ================= */}
      {!loading && blogs.length > 0 && (
        <div className="hidden md:block bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

          <table className="w-full text-sm">
            <thead className="bg-zinc-800 text-left text-zinc-300">
              <tr>
                <th className="p-3">Thumbnail</th>
                <th className="p-3">Judul</th>
                <th className="p-3">Status</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/60 transition"
                >
                  <td className="p-3">
                    {blog.image ? (
                      <img src={blog.image} className="w-14 h-14 object-cover rounded" />
                    ) : (
                      <div className="w-14 h-14 bg-zinc-800 rounded" />
                    )}
                  </td>

                  <td className="p-3 font-medium">{blog.title}</td>

                  <td className="p-3">
                    {blog.published ? (
                      <span className="text-green-400 bg-green-500/10 px-2 py-1 rounded text-xs">
                        Published
                      </span>
                    ) : (
                      <span className="text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded text-xs">
                        Draft
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-zinc-400">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-4 text-sm">

                      <Link href={`/blog/${blog.slug}`} target="_blank" className="text-blue-400 hover:text-blue-300">
                        Preview
                      </Link>

                      <Link href={`/admin/blog/edit/${blog.id}`} className="text-green-400 hover:text-green-300">
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(blog.id, blog.image)}
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
      )}

      {/* ================= MOBILE ================= */}
      {!loading && blogs.length > 0 && (
        <div className="grid gap-4 md:hidden">

          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:bg-zinc-800 transition"
            >

              <div className="flex gap-3">
                {blog.image ? (
                  <img src={blog.image} className="w-20 h-20 object-cover rounded" />
                ) : (
                  <div className="w-20 h-20 bg-zinc-800 rounded" />
                )}

                <div className="flex-1">
                  <h2 className="font-semibold text-sm line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-xs text-zinc-500 mt-1">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>

                  <div className="mt-2">
                    {blog.published ? (
                      <span className="text-green-400 bg-green-500/10 px-2 py-1 rounded text-xs">
                        Published
                      </span>
                    ) : (
                      <span className="text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded text-xs">
                        Draft
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-4 text-sm border-t border-zinc-800 pt-3">

                <Link href={`/blog/${blog.slug}`} target="_blank" className="text-blue-400">
                  Preview
                </Link>

                <Link href={`/admin/blog/edit/${blog.id}`} className="text-green-400">
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(blog.id, blog.image)}
                  className="text-red-400"
                >
                  Hapus
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  )
}