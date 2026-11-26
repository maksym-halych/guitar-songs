# Guitar Chords

[![Read online](https://img.shields.io/badge/read%20online-guitar--songs-7AA2F7?style=flat-square&logo=github)](https://maksym-halych.github.io/guitar-songs)
[![Deploy](https://img.shields.io/github/actions/workflow/status/maksym-halych/guitar-songs/deploy.yml?branch=main&style=flat-square&label=deploy)](https://github.com/maksym-halych/guitar-songs/actions/workflows/deploy.yml)

An [Obsidian](https://obsidian.md) vault of chord charts for my favorite songs.

Open the **`content/`** folder as a vault in Obsidian, then start at
**[index](content/index.md)**. The vault is also published to
[maksym-halych.github.io/guitar-songs](https://maksym-halych.github.io/guitar-songs)
with [Quartz](https://quartz.jzhao.xyz) — see [Publishing](#publishing).

```
.
├── content/            the Obsidian vault — open THIS in Obsidian
│   ├── index.md        entry point, and the site homepage
│   ├── Songs/          one note per song
│   ├── Templates/      Song.md — new-song template (not published)
│   └── .obsidian/      vault config (committed on purpose)
├── quartz/             Quartz static-site generator
└── quartz.config.yaml  site config
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
[index](content/index.md).

## Publishing

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
vault with Quartz and deploys `public/` to GitHub Pages. Requires
**Settings → Pages → Source: GitHub Actions** on the repo.

To preview locally:

```sh
npm ci
npx quartz build --serve   # http://localhost:8080
```

Only `content/` is published. `Templates/` and `.obsidian/` are excluded via
`ignorePatterns` in `quartz.config.yaml`.
