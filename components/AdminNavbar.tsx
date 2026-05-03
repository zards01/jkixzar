"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

type Admin = {
  name: string
  avatar?: string | null
}

export default function AdminNavbar({
  onToggle,
}: {
  onToggle: () => void
}) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [open, setOpen] = useState(false)

  // ================= GET USER =================
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) return

      const { data: adminData } = await supabase
        .from("admins")
        .select("name, avatar")
        .eq("id", data.user.id)
        .single()

      if (adminData) {
        setAdmin(adminData)
      }
    }

    getUser()
  }, [])

  // ================= LOGOUT =================
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <div className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 md:px-6 relative">

      {/* ================= LEFT ================= */}
      <div className="flex items-center gap-3">
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

        <h2 className="font-semibold text-zinc-100">
          Juragan Kreasi Indonesia
        </h2>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="relative">

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 hover:bg-zinc-800 px-3 py-2 rounded-xl transition"
        >
          <span className="text-sm text-zinc-300">
            {admin?.name || "Admin"}
          </span>

          <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-700">
            <Image
              src={admin?.avatar || "/D LOGO JKI.png"}
              alt="avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        </button>

        {/* ================= DROPDOWN ================= */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden"
            >

              {/* USER INFO */}
              <div className="px-4 py-3 border-b border-zinc-800">
                <p className="text-sm text-white font-medium">
                  {admin?.name || "Admin"}
                </p>
                <p className="text-xs text-zinc-500">
                  Admin Panel
                </p>
              </div>

              {/* MENU */}
              <button
                onClick={handleLogout}
                className="
                  w-full text-left px-4 py-3 text-sm
                  text-red-400
                  hover:bg-red-500/10
                  hover:text-red-300
                  transition
                "
              >
                Logout
              </button>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}