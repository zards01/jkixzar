"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import GalleryUploader from "@/components/GalleryUploader"
import Link from "next/link"

type Client = {
  id: string
  name: string
}

type Category = {
  id: string
  name: string
  slug: string
}

export default function NewProjectPage() {

  // ================= STATE =================
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [isSlugEdited, setIsSlugEdited] = useState(false)

  const [description, setDescription] = useState("")

  // 🔥 FIX: category jadi UUID
  const [categoryId, setCategoryId] = useState("")

  const [client, setClient] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [status, setStatus] = useState("draft")

  const [gallery, setGallery] = useState<string[]>([])

  const [clients, setClients] = useState<Client[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [loading, setLoading] = useState(false)
  const [loadingClient, setLoadingClient] = useState(true)
  const [loadingCategory, setLoadingCategory] = useState(true)

  // ================= FETCH CLIENT =================
  const fetchClients = async () => {
    const { data } = await supabase
      .from("clients")
      .select("id, name")
      .order("name", { ascending: true })

    setClients(data || [])
    setLoadingClient(false)
  }

  // ================= FETCH CATEGORY =================
  const fetchCategories = async () => {
    const { data } = await supabase
      .from("event_categories")
      .select("id, name, slug")
      .order("name", { ascending: true })

    setCategories(data || [])
    setLoadingCategory(false)
  }

  useEffect(() => {
    fetchClients()
    fetchCategories()
  }, [])

  // ================= HELPERS =================
  const generateSlug = (text: string) =>
    text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!title) {
      alert("Judul wajib diisi")
      return
    }

    setLoading(true)

    const { error } = await supabase.from("projects").insert([
      {
        title,
        slug,
        description,

        // 🔥 FIX RELASI CATEGORY
        category_id: categoryId || null,

        client,
        location,
        date,
        status,
        gallery,
        thumbnail: gallery[0] || "",
      },
    ])

    setLoading(false)

    if (error) {
      console.log(error)
      alert("Gagal simpan")
    } else {
      alert("Berhasil disimpan")
      window.location.href = "/admin/projects"
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* ================= TOP BAR ================= */}
      <div className="border-b border-zinc-800 px-6 py-3 flex justify-between items-center bg-zinc-900">
        <div>
          <h1 className="font-semibold text-lg">New Project</h1>
          <p className="text-xs text-zinc-400">Buat project baru</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Publish"}
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 p-6">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">

          {/* TITLE */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <input
              value={title}
              onChange={(e) => {
                const val = e.target.value
                setTitle(val)
                if (!isSlugEdited) setSlug(generateSlug(val))
              }}
              placeholder="Judul project..."
              className="w-full text-3xl font-bold bg-transparent outline-none"
            />

            <input
              value={slug}
              onChange={(e) => {
                setSlug(generateSlug(e.target.value))
                setIsSlugEdited(true)
              }}
              className="text-sm text-zinc-400 mt-2 bg-transparent outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-40 bg-zinc-800 p-3 rounded"
            />
          </div>

          {/* GALLERY */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <GalleryUploader value={gallery} onChange={setGallery} />
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">

            {/* STATUS */}
            <div>
              <label className="text-xs text-zinc-400">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full mt-1 bg-zinc-800 p-2 rounded"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* CATEGORY 🔥 FIXED */}
            <div>
              <label className="text-xs text-zinc-400">Category</label>

              {loadingCategory ? (
                <div className="h-10 bg-zinc-800 animate-pulse rounded mt-1" />
              ) : (
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full mt-1 bg-zinc-800 p-2 rounded"
                >
                  <option value="">Pilih Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* CLIENT (FIXED 🔥) */}
            <div>
              <label className="text-xs text-zinc-400">Client</label>

              {loadingClient ? (
                <div className="mt-2 h-10 bg-zinc-800 rounded animate-pulse" />
              ) : clients.length === 0 ? (
                <div className="mt-2">
                  <p className="text-xs text-red-400 mb-2">
                    Belum ada client
                  </p>

                  <Link
                    href="/admin/clients/new"
                    className="text-sm text-orange-400 hover:underline"
                  >
                    + Tambah Client
                  </Link>
                </div>
              ) : (
                <>
                  <select
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full mt-1 bg-zinc-800 p-2 rounded focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Pilih Client</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <Link
                    href="/admin/clients/new"
                    className="text-xs text-orange-400 hover:underline mt-1 inline-block"
                  >
                    + Tambah Client baru
                  </Link>
                </>
              )}
            </div>
            {/* LOCATION */}
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-zinc-800 p-2 rounded"
              placeholder="Lokasi"
            />

            {/* DATE */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-zinc-800 p-2 rounded"
            />

          </div>

        </div>
      </div>
    </div>
  )
}