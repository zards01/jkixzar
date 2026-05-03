import Link from "next/link"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 mt-20 relative overflow-hidden">

      {/* glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.08),transparent_70%)]" />

      <div className="relative max-w-7xl mt-10 mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* COMPANY */}
        <div>
          <img
            src="/D LOGO JKI.png"
            className="h-12 mb-5"
            alt="Juragan Kreasi"
          />

          <p className="text-zinc-400 text-sm leading-relaxed">
            Lahir dari semangat{" "}
            <span className="text-orange-500">
              “kreativitas tanpa batas”
            </span>
            , kami adalah generasi muda yang hadir untuk membawa perubahan
            positif dalam industri event organizer di Indonesia.
          </p>

          <p className="text-zinc-500 text-sm mt-4">
            Event Organizer • General Supplier • Creative Production
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold text-white mb-5">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-zinc-400 text-sm">
            <Link href="/" className="hover:text-orange-500 transition">
              Home
            </Link>

            <Link href="/about" className="hover:text-orange-500 transition">
              About Us
            </Link>

            <Link href="/services" className="hover:text-orange-500 transition">
              Services
            </Link>

            <Link href="/blog" className="hover:text-orange-500 transition">
              Blog
            </Link>

            <Link href="/contact" className="hover:text-orange-500 transition">
              Contact
            </Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-white mb-5">
            Contact Us
          </h3>

          <div className="space-y-4 text-zinc-400 text-sm">

            <div className="flex gap-3">
              <Phone size={16} className="text-orange-500 mt-1" />
              <span>0851-8311-3349</span>
            </div>

            <div className="flex gap-3">
              <MessageCircle size={16} className="text-orange-500 mt-1" />
              <span>0851-8311-3349 (Jakarta)</span>
            </div>

            <div className="flex gap-3">
              <MessageCircle size={16} className="text-orange-500 mt-1" />
              <span>0813-2602-6600 (Cirebon)</span>
            </div>

            <div className="flex gap-3">
              <Mail size={16} className="text-orange-500 mt-1" />
              <span>juragankreasi.idn@gmail.com</span>
            </div>

          </div>
        </div>

        {/* OFFICE */}
        <div>
          <h3 className="font-semibold text-white mb-5">
            Office Location
          </h3>

          <div className="space-y-4 text-zinc-400 text-sm">

            <div className="flex gap-3">
              <MapPin size={16} className="text-orange-500 mt-1" />
              <span>
                Gedung Ascom - Jl. Matraman Raya No.67 Palmeriam, Jakarta
              </span>
            </div>

            <div className="flex gap-3">
              <MapPin size={16} className="text-orange-500 mt-1" />
              <span>
                Jl. Pangkalan Jati 1 Kav 79 RT 01 RW 6, Jakarta Selatan
              </span>
            </div>

            <div className="flex gap-3">
              <MapPin size={16} className="text-orange-500 mt-1" />
              <span>
                The Garden Blok B3 No 7, Jl. Pangeran Cakrabuana,
                Talun, Cirebon, Jawa Barat 45171
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* bottom */}
      <div className=" text-center py-5 px-10">
        <div className="max-w-7xl mx-auto text-center flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-zinc-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} PT JKI x Zarmoney. All rights reserved.
          </p>

         
        </div>
      </div>
    </footer>
  )
}