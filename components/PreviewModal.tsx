"use client"

export default function PreviewModal({
  open,
  onClose,
  title,
  content,
  image,
}: any) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-start overflow-auto p-6">
      <div className="bg-white max-w-3xl w-full rounded-xl overflow-hidden">

        {/* CLOSE */}
        <div className="flex justify-end p-3">
          <button onClick={onClose} className="text-sm text-gray-500">
            ✕ Close
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6">

          {image && (
            <img
              src={image}
              className="w-full h-60 object-cover rounded mb-4"
            />
          )}

          <h1 className="text-3xl font-bold mb-4">
            {title || "Judul Artikel"}
          </h1>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

      </div>
    </div>
  )
}