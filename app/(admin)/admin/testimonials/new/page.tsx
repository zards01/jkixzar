"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function NewTestimonialPage() {

  const [form, setForm] = useState({
    name: "",
    position: "",
    event_category: "",
    event_type: "",
    content: "", // ✅ FIXED
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.content) {
      alert("Nama & Testimoni wajib diisi")
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from("testimonials")
      .insert([form])

    setLoading(false)

    if (error) {
      console.log(error)
      alert("Gagal simpan")
    } else {
      alert("Berhasil disimpan")
      window.location.href = "/admin/testimonials"
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* TOP BAR */}
      <div className="border-b border-zinc-800 px-6 py-3 flex justify-between items-center bg-zinc-900">
        <div>
          <h1 className="font-semibold text-lg">
            New Testimonial
          </h1>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-orange-500 px-5 py-2 rounded-lg"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      {/* FORM */}
      <div className="max-w-3xl mx-auto p-6 space-y-4">

        <input
          value={form.name}
          placeholder="Nama"
          className="w-full bg-zinc-800 p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          value={form.position}
          placeholder="Jabatan"
          className="w-full bg-zinc-800 p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, position: e.target.value })
          }
        />

        <input
          value={form.event_category}
          placeholder="Kategori Event"
          className="w-full bg-zinc-800 p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, event_category: e.target.value })
          }
        />

        <input
          value={form.event_type}
          placeholder="Jenis Event"
          className="w-full bg-zinc-800 p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, event_type: e.target.value })
          }
        />

        <textarea
          value={form.content}
          placeholder="Isi Testimoni..."
          rows={5}
          className="w-full bg-zinc-800 p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />

      </div>
    </div>
  )
}