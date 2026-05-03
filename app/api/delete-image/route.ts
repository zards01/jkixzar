import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { public_id } = await req.json()

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  const timestamp = Math.floor(Date.now() / 1000)

  const crypto = require("crypto")

  const signature = crypto
    .createHash("sha1")
    .update(`public_id=${public_id}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex")

  const formData = new FormData()
  formData.append("public_id", public_id)
  formData.append("api_key", apiKey!)
  formData.append("timestamp", timestamp.toString())
  formData.append("signature", signature)

  await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    {
      method: "POST",
      body: formData,
    }
  )

  return NextResponse.json({ success: true })
}