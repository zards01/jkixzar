"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import GalleryUploader from "@/components/GalleryUploader"
import Link from "next/link"

type Client = {
  id: string
  name: string
}

export default function NewProjectPage() {

  // ================= STATE =================
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [isSlugEdited, setIsSlugEdited] = useState(false)

  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [client, setClient] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [status, setStatus] = useState("draft")

  const [gallery, setGallery] = useState<string[]>([])
  const [clients, setClients] = useState<Client[]>([])

  const [loading, setLoading] = useState(false)
  const [loadingClient, setLoadingClient] = useState(true)

  // ================= FETCH CLIENT =================
  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("id, name")
      .order("name", { ascending: true })

    if (!error) setClients(data || [])
    setLoadingClient(false)
  }

  useEffect(() => {
    fetchClients()
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
        category,
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
      alert("Gagal simpan")
      console.log(error)
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
          className="bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50 shadow-lg shadow-orange-500/20"
        >
          {loading ? "Menyimpan..." : "Publish"}
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 p-6">

        {/* ================= LEFT ================= */}
        <div className="md:col-span-2 space-y-6">

          {/* TITLE */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <input
              value={title}
              onChange={(e) => {
                const val = e.target.value
                setTitle(val)

                if (!isSlugEdited) {
                  setSlug(generateSlug(val))
                }
              }}
              placeholder="Judul project..."
              className="w-full text-3xl font-bold bg-transparent outline-none placeholder:text-zinc-600"
            />

            {/* SLUG */}
            <div className="mt-3">
              <input
                value={slug}
                onChange={(e) => {
                  setSlug(generateSlug(e.target.value))
                  setIsSlugEdited(true)
                }}
                className="text-sm text-zinc-400 bg-transparent outline-none"
              />

              <p className="text-xs text-zinc-500 mt-1">
                https://domainmu.com/projects/{slug || "slug-project"}
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <label className="text-sm text-zinc-400">
              Deskripsi Project
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan project ini..."
              className="w-full mt-2 h-40 bg-zinc-800 rounded p-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* GALLERY */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <label className="text-sm text-zinc-400">
              Gallery Project
            </label>

            <div className="mt-3">
              <GalleryUploader
                value={gallery}
                onChange={setGallery}
              />
            </div>
          </div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="space-y-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">

            <h2 className="font-semibold text-white">⚙️ Pengaturan</h2>

            {/* STATUS */}
            <div>
              <label className="text-xs text-zinc-400">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full mt-1 bg-zinc-800 p-2 rounded focus:ring-2 focus:ring-orange-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Publish</option>
              </select>
            </div>

            {/* CATEGORY */}
            <div>
              <label className="text-xs text-zinc-400">Kategori</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 bg-zinc-800 p-2 rounded focus:ring-2 focus:ring-orange-500"
                placeholder="Wedding / Concert"
              />
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
            <div>
              <label className="text-xs text-zinc-400">Lokasi</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full mt-1 bg-zinc-800 p-2 rounded focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* DATE */}
            <div>
              <label className="text-xs text-zinc-400">Tanggal Event</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full mt-1 bg-zinc-800 p-2 rounded focus:ring-2 focus:ring-orange-500"
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}