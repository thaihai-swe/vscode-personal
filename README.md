# Islands Studio Theme & VS Code Settings Redesign

A Solarized, Nord, Rosé Pine, Sage, and Islands-inspired suite for VS Code, designed as an Islands Studio system for long coding sessions, stable focus states, and predictable workspace ergonomics with floating island panels and tactile specular glass reflections.

The **Islands Dark** variant is synced directly from [vscode-dark-islands](https://github.com/bwya77/vscode-dark-islands), including its workbench palette and syntax colors. Its companion settings keep the same darker canvas, lighter floating surfaces, rounded panels, pill activity bar, quieter inactive chrome, and subtle motion from that reference.

Indentation is treated like Indent Rainbow: each theme cycles six distinct hues across indent guides, bracket pair guides, and bracket colorization so nesting depth is readable at a glance. Paste `vs-code-setting.jsonc` to keep those native guides always on.

Nord’s architecture is the shared grammar: Polar Night / Snow Storm for surfaces, Frost for structure (functions, types, focus, active chrome), Aurora for meaning (strings, numbers, errors, warnings). Palettes stay per-theme; roles stay the same.

## Included themes

### Unique Consolidated Variants

- **Islands Dark** — dark canvas (`#121216`) with floating elevated island surfaces (`#181a1d`), warm slate text, and 6-hue rainbow bracket guides.
- **Nord Arctic** — authentic Polar Night slate (`#2e3440`) with matching dark panels and terminal, Snow Storm text, Frost cyan/blue structural syntax, and Aurora semantic highlights.
- **Midnight OLED** — pitch-black canvas (`#000000`) with elevated graphite chrome (`#090a0c`), crisp `#d4d7dd` text, and vibrant rainbow bracket guides.
- **Warm Editorial** — warm paper surface (`#fbf7eb`) with high-contrast ink (`#2c2b27`), deep pine, terracotta, and berry syntax accents, and 6-hue warm bracket guides.
- **Sage Botanic** — serene mint-tinted paper (`#f5f8f5`) with crisp slate text (`#242d38`), forest green, teal, and amber syntax.
- **Proof** — warm paper surface (`#f5f3ed`) with dark olive-charcoal ink (`#2f312d`), restrained forest green (`#3d755d`) and slate-blue (`#365f7c`) accents, inspired by ChatGPT & Codex Proof aesthetics.

### Classic Preserved Suites

- **Rosé Pine Dawn** — soft low-stimulation palette (`#faf4ed`) with 6-hue structural bracket guides.
- **Firefox NOVA** — NOVA Light (`#ffffff`) and NOVA Dark (`#161326`) with vivid purple and cyan accents.
- **Solarized** — Solarized Light (`#fdf6e3`) and Solarized Dark (`#002b36`) canonical palettes.
- **Zed** — Zed Light (`#fafafa`), Zed Dark (`#282c33`), and Zed OLED (`#000000`).

## Installation & setup

1. Install or update the extension in VS Code.
2. Open **Preferences: Color Theme** and choose an Islands Studio theme.
3. Copy `vs-code-setting.jsonc` into your VS Code User `settings.json` for matching editor ergonomics and optional Custom UI Style chrome. It prefers **Islands Dark** in dark mode and **Warm Editorial** in light mode; you can replace either preference or select any installed theme. The optional custom chrome derives its colors from VS Code theme tokens.
OR CTRL + SHIFT + P => **Preferences: Open Settings (JSON)** and paste the contents of `vs-code-setting.jsonc` into your `settings.json` file.
4. Install Material Icon Theme and set it as your icon theme in VS Code settings.
5. Install Custom UI Style extension
6. Reload

## Theme compatibility

The optional Custom UI Style chrome is theme-agnostic: it reads only VS Code theme
tokens (`--vscode-*`) and never hardcodes palette colors, so any installed theme —
not just the bundled Islands Studio themes — gets coherent surfaces, borders, and
contrast.

- **Focus rings** use a two-layer indicator: an opaque foreground ring plus an
  accent halo. Themes that ship a fully transparent `focusBorder` (common in
  minimal dark themes) stay keyboard-navigable.
- **Active states** get an accent rail and inset highlight derived from the theme's
  focus color, so selection is legible even on low-contrast palettes.
- **High contrast** (`hc-black` / `hc-light`) and `prefers-contrast: more` fall back
  to system `CanvasText` borders and drop glass blur and shadows.
- **Reduced transparency and motion** are honored via media queries.
- **Older VS Code builds** that predate `color-mix()` (Chromium 111 / VS Code ~1.82)
  are covered by an `@supports not (...)` fallback layer that maps every derived
  token to a plain theme token instead of rendering transparent blocks.


## Installation

```bash
npx vsce package
code --install-extension islands-studio-theme-0.0.1.vsix
```
