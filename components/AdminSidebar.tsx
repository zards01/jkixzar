"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

type MenuItem = {
  name: string
  href?: string
  children?: { name: string; href: string }[]
}

export default function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const path = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const menu: MenuItem[] = [
    { name: "Dashboard", href: "/admin" },
    {
      name: "Blog",
      children: [
        { name: "Semua Artikel", href: "/admin/blog" },
        { name: "Tambah Artikel", href: "/admin/blog/new" },
      ],
    },
    {
      name: "Category",
      children: [
        { name: "Semua Category", href: "/admin/categories" },
        { name: "Tambah Category", href: "/admin/categories/new" },
      ],
    },
    {
      name: "Projects",
      children: [
        { name: "Semua Project", href: "/admin/projects" },
        { name: "Tambah Project", href: "/admin/projects/new" },
      ],
    },
    {
      name: "Clients",
      children: [
        { name: "Data Client", href: "/admin/clients" },
      ],
    },
    {
      name: "Testimonial",
      children: [
        { name: "Semua Testimoni", href: "/admin/testimonials" },
        { name: "Tambah Testimoni", href: "/admin/testimonials/new" },
      ],
    },
  ]

  const toggleMenu = (name: string) => {
    setOpenMenu((prev) => (prev === name ? null : name))
  }

  return (
    <>
      {/* overlay mobile */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-full w-64
          bg-zinc-900 text-zinc-200 p-5
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* ================= LOGO ================= */}
        <Link
          href="/admin"
          onClick={onClose}
          className="flex justify-center mb-8"
        >
          <img
            src="/D LOGO JKI.png"
            alt="Logo"
            className="h-12 object-contain hover:opacity-80 transition"
          />
        </Link>

        {/* ================= MENU ================= */}
        <nav className="flex flex-col gap-1">

          {menu.map((item) => {
            const isActive = item.href && path === item.href

            if (item.children) {
              const isOpen = openMenu === item.name

              return (
                <div key={item.name}>
                  {/* parent */}
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="w-full flex justify-between items-center px-3 py-2 rounded-lg hover:bg-zinc-800 transition"
                  >
                    <span>{item.name}</span>
                    <span className="text-xs text-zinc-400">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* children */}
                  {isOpen && (
                    <div className="ml-3 mt-1 border-l border-zinc-800 pl-3 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={`px-3 py-2 text-sm rounded-lg transition
                            ${
                              path === child.href
                                ? "bg-orange-500 text-white"
                                : "hover:bg-zinc-800 text-zinc-300"
                            }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href!}
                onClick={onClose}
                className={`px-3 py-2 rounded-lg transition
                  ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "hover:bg-zinc-800 text-zinc-300"
                  }`}
              >
                {item.name}
              </Link>
            )
          })}

        </nav>
      </aside>
    </>
  )
}