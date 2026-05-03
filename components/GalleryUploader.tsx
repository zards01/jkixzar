"use client"

import { useRef, useState } from "react"
import imageCompression from "browser-image-compression"

type Props = {
  value: string[]
  onChange: (updater: (prev: string[]) => string[]) => void
}

export default function GalleryUploader({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  // ================= UPLOAD =================
  const uploadFile = async (file: File) => {
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 1600,
      useWebWorker: true,
    })

    const fd = new FormData()
    fd.append("file", compressed)
    fd.append("upload_preset", "unsigned_preset")

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: fd,
      }
    )

    const data = await res.json()

    if (!res.ok) {
      console.log(data)
      alert("Upload gagal")
      return null
    }

    return data.secure_url
  }

  const handleFiles = async (files: File[]) => {
    if (!files.length) return

    setUploading(true)

    const urls: string[] = []

    for (const file of files) {
      if (!file.type.startsWith("image/")) continue

      const url = await uploadFile(file)
      if (url) urls.push(url)
    }

    // 🔥 FIX: functional update (ANTI STALE STATE)
    onChange((prev) => [...prev, ...urls])

    // 🔥 FIX: reset input biar file lama tidak nempel
    if (inputRef.current) {
      inputRef.current.value = ""
    }

    setUploading(false)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)

    const files = Array.from(e.dataTransfer.files || [])
    handleFiles(files)
  }

  const handleDelete = (index: number) => {
    onChange((prev) => {
      const newArr = [...prev]
      newArr.splice(index, 1)
      return newArr
    })
  }

  return (
    <div className="space-y-4">

      {/* DROPZONE */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
          ${dragging ? "border-orange-500 bg-zinc-800" : "border-zinc-700"}
        `}
      >
        <p className="text-sm text-zinc-400">
          Drag & drop gambar di sini atau klik untuk upload
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* STATUS */}
      {uploading && (
        <p className="text-xs text-zinc-400">
          Uploading & compressing...
        </p>
      )}

      {/* PREVIEW */}
      <div className="grid grid-cols-3 gap-3">
        {value?.map((img, i) => (
          <div key={i} className="relative group">

            <img
              src={img}
              className="w-full h-28 object-cover rounded"
            />

            {/* DELETE BUTTON */}
            <button
              onClick={() => handleDelete(i)}
              className="
                absolute top-2 right-2
                bg-black/70 text-white text-xs
                px-2 py-1 rounded
                opacity-0 group-hover:opacity-100
                hover:bg-red-600 transition
              "
            >
              ✕
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}