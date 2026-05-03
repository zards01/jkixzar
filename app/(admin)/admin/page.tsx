"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { motion } from "framer-motion"

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
]

export default function AdminDashboard() {

  const [ready, setReady] = useState(false)

  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    blogs: 0,
  })

  const [chartData, setChartData] = useState<any[]>([])
  const [topClients, setTopClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // ================= AUTH =================
  useEffect(() => {
    let mounted = true

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session && mounted) {
        window.location.href = "/login"
      } else {
        setReady(true)
      }
    }

    checkSession()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          window.location.href = "/login"
        }
      }
    )

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  // ================= FETCH =================
  useEffect(() => {
    if (!ready) return

    const fetchData = async () => {
      setLoading(true)

      const [p, c, b] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("clients").select("*", { count: "exact", head: true }),
        supabase.from("blogs").select("*", { count: "exact", head: true }),
      ])

      setStats({
        projects: p.count || 0,
        clients: c.count || 0,
        blogs: b.count || 0,
      })

      const { data: projects } = await supabase
        .from("projects")
        .select("created_at, client")

      const monthly: Record<string, number> = {}
      const clientMap: Record<string, number> = {}

      MONTHS.forEach((m) => (monthly[m] = 0))

      projects?.forEach((p) => {
        const month = new Date(p.created_at).toLocaleString("default", {
          month: "short",
        })

        monthly[month]++

        if (p.client) {
          clientMap[p.client] = (clientMap[p.client] || 0) + 1
        }
      })

      setChartData(
        MONTHS.map((m) => ({
          month: m,
          total: monthly[m],
        }))
      )

      setTopClients(
        Object.keys(clientMap)
          .map((name) => ({
            name,
            total: clientMap[name],
          }))
          .sort((a, b) => b.total - a.total)
      )

      setLoading(false)
    }

    fetchData()
  }, [ready])

  if (!ready) return null

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-zinc-500 text-sm">
          Overview bisnis & performa
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        {[
          { title: "Total Event", value: stats.projects },
          { title: "Total Client", value: stats.clients },
          { title: "Blog Post", value: stats.blogs },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: i * 0.15,
            }}
          >
            <StatCard
              title={item.title}
              value={item.value}
              loading={loading}
            />
          </motion.div>
        ))}

      </div>

      {/* ================= CHART ================= */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">

        <h2 className="text-lg font-semibold mb-4">
          📊 Event per Bulan
        </h2>

        {loading ? (
          <div className="h-64 bg-zinc-800 animate-pulse rounded-xl" />
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>

              <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="month"
                stroke="#71717a"
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "10px",
                }}
              />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ================= TOP CLIENT ================= */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <h2 className="text-lg font-semibold mb-4">
          🏆 Top Clients
        </h2>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 bg-zinc-800 rounded animate-pulse" />
            ))}
          </div>
        ) : topClients.length === 0 ? (
          <p className="text-zinc-500 text-sm">
            Belum ada data client
          </p>
        ) : (
          <div className="space-y-3">

            {topClients.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 hover:border-orange-500/40 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-orange-500/20 text-orange-400 rounded-full text-sm font-bold">
                    {i + 1}
                  </div>

                  <p className="text-sm font-medium">
                    {c.name}
                  </p>
                </div>

                <p className="text-sm text-zinc-400">
                  {c.total} project
                </p>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  )
}

// ================= STAT CARD =================
function StatCard({
  title,
  value,
  loading,
}: {
  title: string
  value: number
  loading: boolean
}) {
  return (
    <div
      className="
        group
        bg-zinc-900 border border-zinc-800 rounded-2xl p-6
        transition-all duration-300
        hover:scale-[1.03]
        hover:border-orange-500/40
        hover:shadow-[0_0_30px_rgba(255,120,0,0.25)]
      "
    >

      <p className="
        text-zinc-500 text-sm
        transition-colors duration-300
        group-hover:text-orange-300
      ">
        {title}
      </p>

      {loading ? (
        <div className="h-8 w-20 bg-zinc-800 mt-2 rounded animate-pulse" />
      ) : (
        <h2 className="
          text-3xl font-bold mt-2 text-white
          transition-colors duration-300
          group-hover:text-orange-400
        ">
          {value}
        </h2>
      )}

    </div>
  )
}