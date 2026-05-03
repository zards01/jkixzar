"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"

/* ================= CLEAN HTML ================= */
function cleanHTML(html: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")

  const allowed = ["P", "H1", "H2", "H3", "UL", "OL", "LI", "STRONG", "EM", "U"]

  const walk = (node: any) => {
    if (node.nodeType === 8) return node.remove()
    if (node.nodeType === 3) return

    if (!allowed.includes(node.tagName)) {
      const parent = node.parentNode
      while (node.firstChild) parent.insertBefore(node.firstChild, node)
      node.remove()
      return
    }

    ;[...node.attributes].forEach((a) => node.removeAttribute(a.name))
    Array.from(node.childNodes).forEach(walk)
  }

  Array.from(doc.body.childNodes).forEach(walk)
  return doc.body.innerHTML
}

/* ================= EDITOR ================= */
export default function Editor({ content, setContent }: any) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: "Mulai menulis seperti di Google Docs...",
      }),
    ],

    content,
    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "prose max-w-3xl mx-auto focus:outline-none min-h-[600px] px-20 py-16 text-lg leading-relaxed",
      },

      handlePaste(view, event) {
        event.preventDefault()

        const html = event.clipboardData?.getData("text/html")
        const text = event.clipboardData?.getData("text/plain")

        if (html) {
          editor?.commands.insertContent(cleanHTML(html))
        } else {
          editor?.commands.insertContent(
            text
              .split("\n")
              .map((l) => `<p>${l}</p>`)
              .join("")
          )
        }

        return true
      },
    },

    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="bg-white text-black rounded-xl shadow-xl border overflow-hidden">

      {/* TOOLBAR */}
      <div className="flex gap-2 border-b px-4 py-3 bg-gray-50 sticky top-0 z-10">

        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </button>

        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          U
        </button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          •
        </button>

      </div>

      {/* CANVAS */}
      <EditorContent editor={editor} />

    </div>
  )
}