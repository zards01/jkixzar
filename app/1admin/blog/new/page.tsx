"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import dynamic from "next/dynamic"
import imageCompression from "browser-image-compression"

const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
})

export default function NewBlogPage() {

  // ================= STATE =================
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [category, setCategory] = useState("")

  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState("")

  const [loading, setLoading] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  // ================= HELPERS =================
  const generateSlug = (text: string) =>
    text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")

  const stripHTML = (html: string) =>
    html.replace(/<[^>]*>/g, "")

  // ================= SEO =================
  const seoScore = () => {
    let score = 0
    if (title.length > 20) score += 25
    if (content.length > 300) score += 25
    if (slug) score += 15
    if (tags.length > 0) score += 15
    if (preview) score += 20
    return score
  }

  // ================= AI MOCK =================
  const generateAI = () => {
    if (!title) return alert("Isi judul dulu")

    const fake = `
      <h2>${title}</h2>
      <p>Konten otomatis untuk artikel tentang <b>${title}</b>.</p>
      <p>Edit sesuai kebutuhan kamu.</p>
    `

    setContent(fake)
    setIsDirty(true)
  }

  // ================= COMPRESS =================
  const compressImage = async (file: File) => {
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      })

      return new File([compressed], `blog-${Date.now()}.jpg`, {
        type: compressed.type,
      })
    } catch {
      return file
    }
  }

  // ================= IMAGE =================
  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("File harus gambar")
      return
    }

    setImage(file)
    setPreview(URL.createObjectURL(file))
    setIsDirty(true)
  }

  const uploadImage = async () => {
    if (!image) return ""

    const compressed = await compressImage(image)

    const fd = new FormData()
    fd.append("file", compressed)
    fd.append("upload_preset", "unsigned_preset")

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: fd }
    )

    const data = await res.json()

    if (!res.ok) {
      console.log(data)
      throw new Error("Upload gagal")
    }

    return data.secure_url
  }

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!title || !content || content === "<p></p>") {
      alert("Judul & konten wajib")
      return
    }

    setLoading(true)

    try {
      let imageUrl = ""
      if (image) imageUrl = await uploadImage()

      const { error } = await supabase.from("blogs").insert([
        {
          title,
          slug,
          content,
          excerpt: stripHTML(content).slice(0, 150),
          image: imageUrl,
          tags: tags, // pastikan kolom jsonb
          category,
          author: "Admin",
          published: true,
        },
      ])

      if (error) throw error

      alert("Berhasil disimpan")
      window.location.href = "/admin/blog"

    } catch (err: any) {
      console.log(err)
      alert("Gagal simpan: " + err.message)
    }

    setLoading(false)
  }

  // ================= TAG =================
  const addTag = (tag: string) => {
    if (!tag) return
    if (tags.includes(tag)) return
    setTags([...tags, tag])
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* TOP BAR */}
      <div className="flex justify-between px-6 py-3 border-b border-zinc-800 bg-zinc-900">
        <div>
          <h1 className="font-semibold">New Post</h1>
          <p className="text-xs text-zinc-400">
            {isDirty ? "Belum disimpan" : "Tersimpan"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(true)}
            className="px-4 py-2 bg-zinc-700 rounded"
          >
            Preview
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-orange-500 rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-6">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">

          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setSlug(generateSlug(e.target.value))
              setIsDirty(true)
            }}
            placeholder="Judul artikel..."
            className="text-4xl font-bold bg-transparent outline-none"
          />

          <p className="text-xs text-zinc-500">{slug}</p>

          <Editor
            content={content}
            setContent={(val: string) => {
              setContent(val)
              setIsDirty(true)
            }}
          />

          <button
            onClick={generateAI}
            className="bg-purple-600 px-4 py-2 rounded"
          >
            Generate AI
          </button>

          {/* IMAGE */}
          <div className="border border-zinc-800 p-4 rounded">
            <input type="file" onChange={handleImageChange} />

            {preview && (
              <img src={preview} className="mt-3 rounded" />
            )}
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 bg-zinc-800 rounded"
          />

          {/* TAG */}
          <div>
            <input
              placeholder="Tambah tag lalu enter"
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag(e.target.value)
                  e.target.value = ""
                }
              }}
              className="w-full p-2 bg-zinc-800 rounded"
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => removeTag(tag)}
                  className="bg-orange-500 px-2 py-1 text-xs rounded cursor-pointer"
                >
                  {tag} ✕
                </span>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
            <p className="text-sm mb-2">SEO Score</p>

            <div className="w-full bg-zinc-800 h-3 rounded">
              <div
                className={`h-3 rounded ${
                  seoScore() > 70 ? "bg-green-500" : "bg-yellow-500"
                }`}
                style={{ width: `${seoScore()}%` }}
              />
            </div>

            <p className="text-xs mt-2">{seoScore()} / 100</p>
          </div>

        </div>
      </div>

      {/* PREVIEW */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
          <div className="bg-white text-black max-w-3xl w-full p-6 rounded-lg overflow-y-auto max-h-[90vh]">

            <button
              onClick={() => setShowPreview(false)}
              className="mb-4 text-red-500"
            >
              Tutup
            </button>

            <h1 className="text-3xl font-bold mb-4">{title}</h1>

            {preview && (
              <img src={preview} className="mb-4 rounded" />
            )}

            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      )}

    </div>
  )
}