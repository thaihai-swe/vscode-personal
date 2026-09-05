# Glass Paper Theme & VS Code Settings Redesign

A Solarized, Nord, and Rosé Pine-inspired suite for VS Code, redesigned as one Glass Paper system for long coding sessions, stable focus states, and predictable workspace ergonomics.

Indentation is treated like Indent Rainbow: each theme cycles six distinct hues across indent guides, bracket pair guides, and bracket colorization so nesting depth is readable at a glance. Paste `vs-code-setting.jsonc` to keep those native guides always on.

Nord’s architecture is the shared grammar: Polar Night / Snow Storm for surfaces, Frost for structure (functions, types, focus, active chrome), Aurora for meaning (strings, numbers, errors, warnings). Palettes stay per-theme; roles stay the same.

## Included themes

### Light variants

- **Minimal** — neutral high-clarity default with Nord-role syntax and frost/aurora guides
- **Solarized Light** — warm cream and teal with frost structure and aurora semantics
- **Farmhouse** — warm gray editorial surface with deep frost structure and aurora accents
- **Parchment** — warm paper surface with deep pine/frost structure and warm aurora accents
- **Rosé Pine Dawn** — soft low-stimulation palette with 6-hue structural bracket guides
- **Ghostty Rosé Pine Dawn** — Ghostty's Dawn palette 1:1 (base `#faf4ed`, text `#575279`, selection `#dfdad9`)
- **Sage** — calm green surface with cool teal/frost structure and amber aurora accents

### Dark variants

- **Nord** — Arctic Nord palette 1:1 (`#2E3440` Polar Night, Snow Storm text, Frost structure, Aurora semantics) + Glass Paper rainbow guides
- **Midnight Teal** — Polar Night surfaces with Frost cyan accents (Nord architecture, teal character)
- **Solarized Dark** — canonical dark default aligned with Nord structural/semantic roles and 6-step rainbow guides

## Installation & setup

1. Install or update the extension in VS Code.
2. Open **Preferences: Color Theme** and choose a Glass Paper theme.
3. copy `vs-code-setting.jsonc` into your VS Code User `settings.json` for matching editor ergonomics and optional Custom UI Style chrome.
OR CTRL + SHIFT + P => **Preferences: Open Settings (JSON)** and paste the contents of `vs-code-setting.jsonc` into your `settings.json` file.
4. Install Marterial Icon Theme and set it as your icon theme in VS Code settings.
5. Install Custom UI Style extension
6. Reload


## Installation

```bash
npx vsce package
code --install-extension glass-paper-theme-0.0.1.vsix
```
