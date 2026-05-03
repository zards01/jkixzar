import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { title } = await req.json()

  // dummy AI (bisa ganti OpenAI nanti)
  const content = `
    <h2>${title}</h2>
    <p>Artikel ini membahas tentang ${title} secara lengkap...</p>
    <p>Konten ini di generate otomatis sebagai contoh AI.</p>
  `

  return NextResponse.json({ content })
}