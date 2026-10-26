# dictionary-of-colour-combinations

A JSON dataset of 348 colour combinations (of 2, 3, and 4 colours) of 159 unique colours, from the book ["A Dictionary of Colour Combinations"](https://coloursmayvary.com/products/copy-of-a-dictionary-of-colour-combinations-by-sanzo-wada) compiled by Sanzo Wada (1883 – 1967) and published by Seigensha Art.

![book](./images/print.jpg)

### Source

The data here has originally been compiled and open sourced by **Dain M. Blodorn Kim** (@dblodorn) for his interactive web version ([dblodorn/sanzo-wada](https://github.com/dblodorn/sanzo-wada/)). In this fork, I've fixed some incorrect data from the original, used a more perceptual CMYK to RGB conversion, and encapsulated the dataset as a standalone and distributed project.

This repository is a fork of [mattdesl/dictionary-of-colour-combinations](https://github.com/mattdesl/dictionary-of-colour-combinations) that adds files aimed at software projects, all derived from `colors.json`: ready-made palettes, WCAG contrast data, objective colour tags, CSS custom properties, design tokens and TypeScript types. `colors.json` itself is unchanged.

### Data

See [./colors.json](./colors.json), an array of colours where each takes the following form:

```js
{
  "name": "Burnt Sienna",
  "combinations": [ 198, 242, 263, 285, 286, 297, 312, 333, 343 ],
  "swatch": 0,
  "cmyk": [ 22, 76, 100, 15 ],
  "lab": [ 46.43778133821622, 36.23346303501947, 43.7898832684825 ],
  "rgb": [ 174, 82, 36 ],
  "hex": "#ae5224"
}
```

In the book, each unique colour has:

- A name such as "Burnt Sienna" or "Rosolanc Purple"
- Combinations: which palette(s) this colour is associated with (identifiers from 1 to 348)
- CMYK values in `C% / M% / Y% / K%` from 0 to 100
- Which swatch book the colour is associated with (the 159 colours are split into 6 chapters)

The colours are already sorted by the author in a fairly pleasing way, and the data here maintains that order.

## Installation

If you are using JavaScript and npm/Node.js, you can install this fork from GitHub:

```sh
npm install github:MaNga-003/dictionary-of-colour-combinations
```

(`npm install dictionary-of-colour-combinations` installs the upstream package, which only contains `colors.json`.)

## Derived Files

These files are generated from `colors.json` by `src/build.js` (`npm run build`). Colours are always referenced by their index in `colors.json`.

| File | Contents |
| --- | --- |
| [`palettes.json`](./palettes.json) | The 348 combinations as ready-to-use palettes, with WCAG contrast for every colour pair |
| [`meta.json`](./meta.json) | Per-colour slug, luminance, LCh, contrast on white/black, recommended text colour and tags |
| [`colors.css`](./colors.css) | CSS custom properties, e.g. `--sanzo-burnt-sienna: #ae5224;` |
| [`tokens.json`](./tokens.json) | [W3C Design Tokens](https://design-tokens.github.io/community-group/format/) format |
| [`index.d.ts`](./index.d.ts) | TypeScript types for all of the above |

### palettes.json

Sorted by id. Ids 1–120 are 2-colour, 121–240 are 3-colour and 241–348 are 4-colour combinations.

```js
{
  "id": 241,
  "size": 4,
  "colors": [ 17, 39, 50, 124 ],
  "names": [ "Red Orange", "Pale Lemon Yellow", "Isabella Color", "Dark Medici Blue" ],
  "hex": [ "#dd4027", "#ffefae", "#c5a56e", "#547076" ],
  "contrast": [
    { "a": 39, "b": 124, "ratio": 4.6, "aa": true, "aaLarge": true, "aaa": false },
    // ... one entry per colour pair
  ]
}
```

`ratio` is the [WCAG 2.x contrast ratio](https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio) rounded to two decimals; `aa` (≥ 4.5), `aaLarge` (≥ 3, large text and UI components) and `aaa` (≥ 7) are computed from the unrounded value.

### meta.json

```js
{
  "index": 0,
  "name": "Hermosa Pink",
  "slug": "hermosa-pink",
  "hex": "#f9c1ce",
  "luminance": 0.6274,
  "lch": [ 83.43, 22.2, 4.23 ],
  "contrastOnWhite": 1.55,
  "contrastOnBlack": 13.55,
  "textColor": "#000000",
  "tags": [ "warm", "light", "pastel" ]
}
```

`lch` is CIE LCh derived from the `lab` field (D50). Tags are assigned purely from these values, using the thresholds below (see `src/build.js`). They are a convenience for filtering, not judgements from the book.

| Group | Tag | Rule |
| --- | --- | --- |
| Temperature | `neutral` | C < 10 |
| | `warm` | hue ∈ [330°, 360°) ∪ [0°, 90°) |
| | `cool` | hue ∈ [150°, 300°) |
| Lightness | `light` | L ≥ 70 |
| | `dark` | L ≤ 35 |
| Chroma | `vivid` | C ≥ 50 |
| | `pastel` | L ≥ 70 and 10 ≤ C < 40 |
| | `muted` | L < 70 and 10 ≤ C < 25 |

Hues in between (yellow-greens and purples) get no temperature tag.

## Examples

```js
const colors = require('dictionary-of-colour-combinations');
const palettes = require('dictionary-of-colour-combinations/palettes.json');
const meta = require('dictionary-of-colour-combinations/meta.json');

// All 3-colour palettes
const triads = palettes.filter(p => p.size === 3);

// Palettes containing at least one AA-readable text/background pair
const readable = palettes.filter(p => p.contrast.some(pair => pair.aa));

// Readable text colour on top of a swatch
const { hex, textColor } = meta.find(m => m.slug === 'burnt-sienna');

// Light, cool colours
const coolLights = meta.filter(m => m.tags.includes('cool') && m.tags.includes('light'));
```

CSS:

```css
@import 'dictionary-of-colour-combinations/colors.css';

.button {
  background: var(--sanzo-burnt-sienna);
}
```

TypeScript (`resolveJsonModule` is needed for the JSON files):

```ts
import colors, { Palette, ColorMeta } from 'dictionary-of-colour-combinations';
import palettesJson from 'dictionary-of-colour-combinations/palettes.json';

const palettes = palettesJson as Palette[];
```

## Development

```sh
npm run build   # regenerate the derived files from colors.json
npm test        # validate the data and check the derived files are up to date
```

If you regenerate `colors.json` (see below), run `npm run build` afterwards.

> Note: the package name in `package.json` is the same as the upstream npm package, so it must be renamed (e.g. scoped) before publishing this fork to npm.

## CMYK to RGB

The original data by @dblodorn contained some conversions from CMYK to RGB that looked very different than the physical colours in the book.

In this fork of the data, each CMYK value is converted to RGB using specific colour profiles that attempt to better represent the physical printed colours:

- CMYK: U.S. Web Coated (SWOP) v2.icc
- RGB: sRGB IEC61966-2.1.icc

(Converted with Relative Colorimetric and Black Point Compensation)

These conversions provides the `rgb`, `lab` (L\*a\*b\* with D50 illuminant) and `hex` fields in the JSON data.

There may still be some differences to the book's printed swatches, as the conversion is not exact.

## Converting from Source

If you wish to convert the CMYK values to RGB/LAB/HEX with different colour profiles, you can do the following with Python:

```sh
pip3 install -r requirements.txt
```

Then, change the profile files in `augment_sanzo.py` and run the script:

```sh
python3 src/augment_sanzo.py
```

## License

MIT, see [LICENSE.md](./LICENSE.md) for details.