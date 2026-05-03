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
  <div className="min-h-screen bg-black text-white">

    {/* TOP BAR */}
    <div className="sticky top-0 z-50 backdrop-blur bg-black/70 border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="font-semibold text-lg">New Article</h1>
        <p className="text-xs text-zinc-400">
          {isDirty ? "Draft belum disimpan" : "Semua perubahan tersimpan"}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setShowPreview(true)}
          className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
        >
          Preview
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-orange-500 hover:shadow-[0_0_20px_rgba(255,120,0,0.5)] transition"
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>

    {/* CONTENT */}
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 px-6 py-10">

      {/* LEFT - EDITOR */}
      <div className="md:col-span-2 space-y-6">

        {/* TITLE */}
        <div>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setSlug(generateSlug(e.target.value))
              setIsDirty(true)
            }}
            placeholder="Tulis judul artikel di sini..."
            className="w-full text-5xl font-bold bg-transparent outline-none placeholder:text-zinc-600"
          />

          <p className="text-sm text-zinc-500 mt-2">
            URL: /blog/{slug || "judul-artikel"}
          </p>
        </div>

        {/* EDITOR BOX */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 min-h-[400px]">

          {!content && (
            <p className="text-zinc-500 mb-4 text-sm">
              Mulai tulis artikel Anda di sini... <br />
              Gunakan heading, paragraf, dan format untuk membuat konten lebih menarik.
            </p>
          )}

          <Editor
            content={content}
            setContent={(val: string) => {
              setContent(val)
              setIsDirty(true)
            }}
          />

        </div>

        {/* AI BUTTON */}
        <button
          onClick={generateAI}
          className="bg-purple-600 px-5 py-2 rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition"
        >
          ✨ Generate Draft AI
        </button>

        {/* IMAGE */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <p className="text-sm mb-3 text-zinc-400">
            Thumbnail Artikel
          </p>

          <input type="file" onChange={handleImageChange} />

          {preview && (
            <img src={preview} className="mt-4 rounded-xl" />
          )}
        </div>

      </div>

      {/* RIGHT - SIDEBAR */}
      <div className="space-y-6">

        {/* CATEGORY */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="text-sm mb-2 text-zinc-400">Category</p>
          <input
            placeholder="Contoh: Wedding, Event, Corporate"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 bg-zinc-800 rounded-lg outline-none"
          />
        </div>

        {/* TAG */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="text-sm mb-2 text-zinc-400">Tags</p>

          <input
            placeholder="Tekan Enter untuk tambah tag"
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addTag(e.target.value)
                e.target.value = ""
              }
            }}
            className="w-full p-2 bg-zinc-800 rounded-lg"
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                onClick={() => removeTag(tag)}
                className="bg-orange-500 px-3 py-1 text-xs rounded-full cursor-pointer hover:scale-105 transition"
              >
                {tag} ✕
              </span>
            ))}
          </div>
        </div>

        {/* SEO */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="text-sm mb-3 text-zinc-400">SEO Score</p>

          <div className="w-full bg-zinc-800 h-3 rounded-full">
            <div
              className={`h-3 rounded-full transition-all ${
                seoScore() > 70 ? "bg-green-500" : "bg-yellow-500"
              }`}
              style={{ width: `${seoScore()}%` }}
            />
          </div>

          <p className="text-xs mt-2 text-zinc-400">
            {seoScore()} / 100
          </p>

          <ul className="text-xs text-zinc-500 mt-3 space-y-1">
            <li>• Judul minimal 20 karakter</li>
            <li>• Konten minimal 300 kata</li>
            <li>• Gunakan gambar</li>
            <li>• Tambahkan tag</li>
          </ul>
        </div>

      </div>
    </div>

    {/* PREVIEW */}
    {showPreview && (
      <div className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center p-6">

        <div className="bg-white text-black max-w-3xl w-full p-8 rounded-2xl overflow-y-auto max-h-[90vh]">

          <button
            onClick={() => setShowPreview(false)}
            className="mb-6 text-red-500"
          >
            Tutup Preview
          </button>

          <h1 className="text-4xl font-bold mb-4">{title}</h1>

          {preview && (
            <img src={preview} className="mb-6 rounded-xl" />
          )}

          <div dangerouslySetInnerHTML={{ __html: content }} />

        </div>

      </div>
    )}

  </div>
)
}