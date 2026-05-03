"use client"

export default function AdminNavbar({
  onToggle,
}: {
  onToggle: () => void
}) {
  return (
    <div className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 md:px-6">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* hamburger */}
        <button
          onClick={onToggle}
          className="md:hidden p-2 rounded hover:bg-zinc-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-zinc-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <h2 className="font-semibold text-zinc-100">Juragan Kreasi Indonesia</h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-400">Admin</span>
        <div className="w-8 h-8 bg-zinc-700 rounded-full" />
      </div>
    </div>
  )
}