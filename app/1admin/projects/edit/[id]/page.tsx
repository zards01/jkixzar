"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useParams, useRouter } from "next/navigation"
import GalleryUploader from "@/components/GalleryUploader"

export default function EditProjectPage() {
  const { id } = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

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

  // ================= HELPERS =================
  const generateSlug = (text: string) =>
    text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")

  // ================= FETCH =================
  const fetchProject = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single()

    if (!error && data) {
      setTitle(data.title || "")
      setSlug(data.slug || "")
      setDescription(data.description || "")
      setCategory(data.category || "")
      setClient(data.client || "")
      setLocation(data.location || "")
      setDate(data.date || "")
      setStatus(data.status || "draft")
      setGallery(data.gallery || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    if (id) fetchProject()
  }, [id])

  // ================= UPDATE =================
  const handleUpdate = async () => {
    if (!title) {
      alert("Judul wajib diisi")
      return
    }

    setSaving(true)

    const { error } = await supabase
      .from("projects")
      .update({
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
      })
      .eq("id", id)

    setSaving(false)

    if (error) {
      alert("Gagal update")
      console.log(error)
    } else {
      alert("Berhasil diupdate")
      router.push("/admin/projects")
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-zinc-400">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* ================= TOP BAR ================= */}
      <div className="border-b border-zinc-800 px-6 py-3 flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-lg">Edit Project</h1>
          <p className="text-xs text-zinc-400">
            Update data project
          </p>
        </div>

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="bg-orange-500 px-5 py-2 rounded hover:bg-orange-600 transition disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : "Update"}
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

                if (!isSlugEdited) {
                  setSlug(generateSlug(val))
                }
              }}
              className="w-full text-3xl font-bold bg-transparent outline-none"
            />

            {/* SLUG */}
            <input
              value={slug}
              onChange={(e) => {
                setSlug(generateSlug(e.target.value))
                setIsSlugEdited(true)
              }}
              className="text-sm text-zinc-400 mt-2 bg-transparent outline-none"
            />

            <p className="text-xs text-zinc-500 mt-1">
              /projects/{slug}
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <label className="text-sm text-zinc-400">
              Deskripsi
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 h-40 bg-zinc-800 rounded p-3 outline-none"
            />
          </div>

          {/* GALLERY */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <label className="text-sm text-zinc-400">
              Gallery
            </label>

            <div className="mt-3">
              <GalleryUploader
                value={gallery}
                onChange={setGallery}
              />
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">

            <h2 className="font-semibold">⚙️ Pengaturan</h2>

            {/* STATUS */}
            <div>
              <label className="text-xs text-zinc-400">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full mt-1 bg-zinc-800 p-2 rounded"
              >
                <option value="draft">Draft</option>
                <option value="published">Publish</option>
              </select>
            </div>

            {/* CATEGORY */}
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Kategori"
              className="w-full bg-zinc-800 p-2 rounded"
            />

            {/* CLIENT */}
            <input
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Client"
              className="w-full bg-zinc-800 p-2 rounded"
            />

            {/* LOCATION */}
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Lokasi"
              className="w-full bg-zinc-800 p-2 rounded"
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