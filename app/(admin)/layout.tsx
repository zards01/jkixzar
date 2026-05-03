"use client"

import { useState } from "react"
import AdminSidebar from "@/components/AdminSidebar"
import AdminNavbar from "@/components/AdminNavbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="h-screen flex font-sans text-slate-800 overflow-hidden">

      {/* SIDEBAR */}
      <AdminSidebar open={open} onClose={() => setOpen(false)} />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">

        {/* NAVBAR (fixed height) */}
        <div className="shrink-0">
          <AdminNavbar onToggle={() => setOpen(!open)} />
        </div>

        {/* CONTENT AREA (ONLY SCROLL HERE) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>

      </div>
    </div>
  )
}