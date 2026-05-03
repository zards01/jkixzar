"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function NewCategoryPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  /* ================= SLUG GENERATOR ================= */
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!name) return alert("Nama wajib diisi")

    const slug = generateSlug(name)

    setLoading(true)

    const { error } = await supabase
      .from("event_categories")
      .insert([{ name, slug }])

    setLoading(false)

    if (error) {
      alert("Gagal tambah kategori")
    } else {
      router.push("/admin/categories")
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-md"
      >

        <h1 className="text-xl font-bold mb-6">
          ➕ Tambah Kategori
        </h1>

        <input
          type="text"
          placeholder="Nama kategori"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
        />

        {/* PREVIEW SLUG */}
        {name && (
          <p className="text-sm text-zinc-500 mt-2">
            Slug: <span className="text-orange-400">
              {generateSlug(name)}
            </span>
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-3 bg-orange-500 rounded-xl hover:bg-orange-600 transition"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>

      </form>

    </div>
  )
}