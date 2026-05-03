"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import imageCompression from "browser-image-compression"

export default function NewClientPage() {
  const [name, setName] = useState("")
  const [website, setWebsite] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState("")

  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  // ================= COMPRESS =================
  const compressImage = async (file: File) => {
    try {
      return await imageCompression(file, {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      })
    } catch {
      return file
    }
  }

  // ================= HANDLE IMAGE =================
  const handleImage = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar")
      return
    }

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const onFileChange = (e: any) => {
    const file = e.target.files[0]
    if (file) handleImage(file)
  }

  // ================= DRAG DROP =================
  const handleDrop = (e: any) => {
    e.preventDefault()
    setDragActive(false)

    const file = e.dataTransfer.files[0]
    if (file) handleImage(file)
  }

  // ================= UPLOAD =================
  const upload = async () => {
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
    if (!name) return alert("Nama client wajib diisi")

    try {
      setLoading(true)

      const logo = await upload()

      const { error } = await supabase.from("clients").insert([
        {
          name,
          website,
          logo,
          status: "active",
        },
      ])

      if (error) throw error

      alert("Client berhasil ditambahkan")
      window.location.href = "/admin/clients"

    } catch (err) {
      console.log(err)
      alert("Gagal menyimpan client")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* HEADER */}
      <div className="border-b border-zinc-800 px-6 py-4 bg-zinc-900">
        <h1 className="text-xl font-semibold">Tambah Client</h1>
        <p className="text-xs text-zinc-400">Tambahkan client baru</p>
      </div>

      {/* CONTENT */}
      <div className="max-w-xl mx-auto p-6 space-y-6">

        {/* FORM */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">

          {/* NAME */}
          <div>
            <label className="text-xs text-zinc-400">Nama Client</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Nike Indonesia"
              className="w-full mt-1 p-3 bg-zinc-800 rounded outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* WEBSITE */}
          <div>
            <label className="text-xs text-zinc-400">Website</label>
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://..."
              className="w-full mt-1 p-3 bg-zinc-800 rounded outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* UPLOAD */}
          <div>
            <label className="text-xs text-zinc-400">Logo</label>

            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragActive(true)
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`mt-2 border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer
                ${dragActive ? "border-orange-500 bg-zinc-800" : "border-zinc-700 hover:bg-zinc-800"}
              `}
            >
              <input
                type="file"
                onChange={onFileChange}
                className="hidden"
                id="upload"
              />

              <label htmlFor="upload" className="cursor-pointer">

                {!preview && (
                  <p className="text-sm text-zinc-500">
                    Klik atau drag logo ke sini
                  </p>
                )}

                {preview && (
                  <div className="flex flex-col items-center">
                    <img
                      src={preview}
                      className="w-24 h-24 object-contain bg-white rounded p-2"
                    />
                    <p className="text-xs text-zinc-500 mt-2">
                      {(image?.size! / 1024).toFixed(0)} KB
                    </p>
                  </div>
                )}

              </label>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 py-3 rounded font-medium hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Client"}
          </button>

        </div>

      </div>
    </div>
  )
}