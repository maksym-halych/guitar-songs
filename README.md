# Guitar Chords

An [Obsidian](https://obsidian.md) vault of chord charts for my favorite songs.

Open this folder as a vault in Obsidian, then start at **[Songs index](Songs%20index.md)**.

```
.
├── Songs index.md      entry point
├── Songs/              one note per song
├── Templates/          Song.md — new-song template
└── .obsidian/          vault config (committed on purpose)
```

## Conventions

- **Filenames:** `Artist - Title.md`, so the explorer groups by artist.
- **Frontmatter:** `title`, `artist`, `key`, `tags: [song]`.
- **Charts** live in a single fenced ```` ```text ```` block — chord line directly
  above the lyric line it belongs to. The fence is what keeps the monospace
  alignment intact.

## Setup

Two things beyond stock Obsidian:

- **CSS snippet** — `.obsidian/snippets/chord-charts.css`, enabled in
  Settings → Appearance. Keeps chart blocks monospaced and unwrapped.
- **Dynamic Highlights** (community plugin) — regex-based coloring for chord
  lines and section headers. Install via Settings → Community plugins.

  Chord lines (whole line, allows indentation):

  ```
  ^[ \t]*(?:[A-G][#b]?(?:maj|min|dim|aug|sus|add|m|M)?\d*(?:sus[24]|add\d+)?(?:\/[A-G][#b]?)?[ \t]*)+$
  ```

  Section headers:

  ```
  ^\[[^\]]+\]$
  ```

  Set the decoration to **text color**, not background, or you get a solid bar
  across the whole line. Suggested: amber `#e0af68` for chords, blue `#7aa2f7`
  for section headers, lyrics left at the default neutral.

## Adding a song

Command palette → *Insert template* → `Song`, then fill in the frontmatter and
paste the chart. Name the file `Artist - Title` and add it to
[Songs index](Songs%20index.md).
