"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error || !data.user) {
        setError(error?.message || "Login gagal")
        setLoading(false)
        return
      }

      console.log("LOGIN SUCCESS:", data.user)

      // 🔥 CEK ADMIN
      const { data: admin } = await supabase
        .from("admins")
        .select("id, role")
        .eq("id", data.user.id)
        .single()

      if (!admin) {
        setError("Bukan admin")
        await supabase.auth.signOut()
        setLoading(false)
        return
      }

      // 🔥 HARUS HARD REDIRECT
      window.location.href = "/admin"

    } catch (err) {
      console.log(err)
      setError("Terjadi kesalahan server")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/D LOGO JKI.png"
            alt="Logo"
            width={140}
            height={140}
          />

          <h1 className="text-white text-xl font-bold mt-3">
            JURAGAN <span className="text-orange-400">KREASI</span> INDONESIA
          </h1>

          <p className="text-zinc-500 text-sm">
            Admin Panel Login
          </p>
        </div>

        {/* CARD */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Loading..." : "Login"}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}