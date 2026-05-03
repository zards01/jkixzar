"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

type Client = {
  id: string
  name: string
  logo: string
  website: string
  status: string
  created_at: string
}

export default function ClientsPage() {
  const [data, setData] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setData(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ================= DELETE =================
  const getPublicId = (url: string) => {
    try {
      const parts = url.split("/upload/")[1]
      const noVersion = parts.replace(/v\d+\//, "")
      return noVersion.split(".")[0]
    } catch {
      return null
    }
  }

  const handleDelete = async (client: Client) => {
    if (!confirm("Hapus client + logo?")) return

    try {
      if (client.logo) {
        const publicId = getPublicId(client.logo)

        if (publicId) {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_id: publicId }),
          })
        }
      }

      await supabase.from("clients").delete().eq("id", client.id)

      setData((prev) => prev.filter((c) => c.id !== client.id))
    } catch {
      alert("Gagal hapus")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-zinc-100 p-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            👥 Clients
          </h1>
          <p className="text-zinc-500 text-sm">
            Kelola client & brand partnership
          </p>
        </div>

        <Link
          href="/admin/clients/new"
          className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-orange-500/20 hover:scale-[1.03]"
        >
          + Tambah Client
        </Link>
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-zinc-800/60 rounded-xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* ================= EMPTY ================= */}
      {!loading && data.length === 0 && (
        <div className="text-center py-24 text-zinc-500">
          <p className="text-lg">Belum ada client</p>
        </div>
      )}

      {/* ================= DESKTOP ================= */}
      {!loading && data.length > 0 && (
        <div className="hidden md:block bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">

          <table className="w-full text-sm">
            <thead className="bg-zinc-800/80 text-zinc-300">
              <tr>
                <th className="p-4 text-left">Client</th>
                <th className="p-4 text-left">Website</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                >
                  {/* CLIENT */}
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow">
                      <img
                        src={c.logo}
                        className="max-h-8 object-contain"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-white">{c.name}</p>
                      <p className="text-xs text-zinc-500">
                        {new Date(c.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </td>

                  {/* WEBSITE */}
                  <td className="p-4 text-zinc-400">
                    {c.website ? (
                      <a
                        href={c.website}
                        target="_blank"
                        className="hover:text-orange-400 transition underline underline-offset-2"
                      >
                        {c.website}
                      </a>
                    ) : "-"}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        c.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-zinc-700 text-zinc-400"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(c)}
                      className="text-red-400 hover:text-red-300 hover:underline transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

      {/* ================= MOBILE ================= */}
      {!loading && data.length > 0 && (
        <div className="grid gap-4 md:hidden">

          {data.map((c) => (
            <div
              key={c.id}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
            >
              {/* LOGO */}
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow">
                <img src={c.logo} className="max-h-8 object-contain" />
              </div>

              {/* INFO */}
              <div className="flex-1">
                <h2 className="font-semibold group-hover:text-orange-400 transition">
                  {c.name}
                </h2>

                <p className="text-xs text-zinc-400 mt-1 truncate">
                  {c.website || "Tidak ada website"}
                </p>

                <span
                  className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                    c.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-zinc-700 text-zinc-400"
                  }`}
                >
                  {c.status}
                </span>
              </div>

              {/* ACTION */}
              <button
                onClick={() => handleDelete(c)}
                className="text-red-400 text-sm hover:text-red-300 transition"
              >
                Hapus
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  )
}