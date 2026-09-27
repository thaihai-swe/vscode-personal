# Glass Paper Theme & VS Code Settings Redesign

A Solarized, Nord, Rosé Pine, Sage, and Islands-inspired suite for VS Code, designed as one Glass Paper system for long coding sessions, stable focus states, and predictable workspace ergonomics.

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

### Classic Preserved Suites

- **Rosé Pine Dawn** — soft low-stimulation palette (`#faf4ed`) with 6-hue structural bracket guides.
- **Firefox NOVA** — NOVA Light (`#ffffff`) and NOVA Dark (`#161326`) with vivid purple and cyan accents.
- **Solarized** — Solarized Light (`#fdf6e3`) and Solarized Dark (`#002b36`) canonical palettes.
- **Zed** — Zed Light (`#fafafa`), Zed Dark (`#282c33`), and Zed OLED (`#000000`).

## Installation & setup

1. Install or update the extension in VS Code.
2. Open **Preferences: Color Theme** and choose a Glass Paper theme.
3. Copy `vs-code-setting.jsonc` into your VS Code User `settings.json` for matching editor ergonomics and optional Custom UI Style chrome. It now prefers **Islands Dark** in dark mode and **Sage** in light mode.
OR CTRL + SHIFT + P => **Preferences: Open Settings (JSON)** and paste the contents of `vs-code-setting.jsonc` into your `settings.json` file.
4. Install Material Icon Theme and set it as your icon theme in VS Code settings.
5. Install Custom UI Style extension
6. Reload


## Installation

```bash
npx vsce package
code --install-extension glass-paper-theme-0.0.1.vsix
```
