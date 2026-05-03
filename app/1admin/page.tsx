"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type Chart = {
  name: string
  total: number
}

type ClientStat = {
  name: string
  total: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    blogs: 0,
  })

  const [chartData, setChartData] = useState<Chart[]>([])
  const [topClients, setTopClients] = useState<ClientStat[]>([])
  const [loading, setLoading] = useState(true)

  // ================= FETCH =================
  const fetchData = async () => {
    setLoading(true)

    try {
      // ===== COUNT =====
      const [projectsRes, clientsRes, blogsRes] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("clients").select("*", { count: "exact", head: true }),
        supabase.from("blogs").select("*", { count: "exact", head: true }),
      ])

      setStats({
        projects: projectsRes.count || 0,
        clients: clientsRes.count || 0,
        blogs: blogsRes.count || 0,
      })

      // ===== PROJECT DATA =====
      const { data: projects } = await supabase
        .from("projects")
        .select("created_at, client")

      const monthly: Record<string, number> = {}
      const clientMap: Record<string, number> = {}

      projects?.forEach((p) => {
        // ===== MONTHLY =====
        const date = new Date(p.created_at)
        const month = date.toLocaleString("default", { month: "short" })

        monthly[month] = (monthly[month] || 0) + 1

        // ===== CLIENT COUNT =====
        if (p.client) {
          clientMap[p.client] = (clientMap[p.client] || 0) + 1
        }
      })

      // ===== FORMAT CHART =====
      const formattedChart: Chart[] = Object.keys(monthly).map((m) => ({
        name: m,
        total: monthly[m],
      }))

      // ===== SORT CLIENT =====
      const sortedClients: ClientStat[] = Object.keys(clientMap)
        .map((name) => ({
          name,
          total: clientMap[name],
        }))
        .sort((a, b) => b.total - a.total)

      setChartData(formattedChart)
      setTopClients(sortedClients)

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">

      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-zinc-500 text-sm">
          Overview bisnis & performa
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <StatCard title="Total Event" value={stats.projects} loading={loading} />
        <StatCard title="Total Client" value={stats.clients} loading={loading} />
        <StatCard title="Blog Post" value={stats.blogs} loading={loading} />

      </div>

      {/* ================= CHART ================= */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">

        <h2 className="text-lg font-semibold mb-4">
          📊 Event per Bulan
        </h2>

        {loading ? (
          <div className="h-64 bg-zinc-800 animate-pulse rounded-xl" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="total" radius={[6, 6, 0, 0]} />
            </BarChart>
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
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">

      <p className="text-zinc-500 text-sm">{title}</p>

      {loading ? (
        <div className="h-8 w-20 bg-zinc-800 mt-2 rounded animate-pulse" />
      ) : (
        <h2 className="text-3xl font-bold mt-2 text-white">
          {value}
        </h2>
      )}

    </div>
  )
}