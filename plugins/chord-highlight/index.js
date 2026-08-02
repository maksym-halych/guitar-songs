import { visit } from "unist-util-visit"

// Mirrors the Dynamic Highlights queries used inside Obsidian, so the site and
// the editor color the same lines. Keep the two in sync:
// content/.obsidian/plugins/another-dynamic-highlights/data.json
const CHORD_LINE =
  /^[ \t]*(?:[A-G][#b]?(?:maj|min|dim|aug|sus|add|m|M)?\d*(?:sus[24]|add\d+)?(?:\/[A-G][#b]?)?[ \t]*)+$/
const SECTION_HEADER = /^\[[^\]]+\]$/

function textOf(node) {
  if (node.type === "text") return node.value
  if (node.children) return node.children.map(textOf).join("")
  return ""
}

function isCodeBlock(node) {
  return node.tagName === "code" && node.properties?.dataLanguage !== undefined
}

/**
 * Shiki emits one `<span data-line>` per source line. We only tag those spans
 * with a class; all styling lives in quartz/styles/custom.scss.
 */
function rehypeChordHighlight() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (!isCodeBlock(node)) return

      visit(node, "element", (line) => {
        if (line.properties?.dataLine === undefined) return

        const text = textOf(line)
        if (text.trim().length === 0) return

        let cls
        if (SECTION_HEADER.test(text)) {
          cls = "song-section"
        } else if (CHORD_LINE.test(text)) {
          cls = "chord-line"
        } else {
          return
        }

        const existing = line.properties.className ?? []
        line.properties.className = Array.isArray(existing)
          ? [...existing, cls]
          : [existing, cls]
      })
    })
  }
}

export const ChordHighlight = () => ({
  name: "ChordHighlight",
  htmlPlugins() {
    return [rehypeChordHighlight]
  },
})
