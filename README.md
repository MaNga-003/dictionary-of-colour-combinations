# dictionary-of-colour-combinations

> 🌐 **Bu belge iki dillidir:** önce Türkçe, ardından İngilizce.
> **This document is bilingual:** Turkish first, followed by English.
>
> **[Türkçe](#türkçe)** · **[English](#english)**

![book](./images/print.jpg)

---

## Türkçe

Sanzo Wada'nın (1883 – 1967) derlediği ve Seigensha Art tarafından yayımlanan ["A Dictionary of Colour Combinations"](https://coloursmayvary.com/products/copy-of-a-dictionary-of-colour-combinations-by-sanzo-wada) kitabındaki 159 benzersiz renkten oluşan 348 renk kombinasyonunu (2, 3 ve 4 renkli) içeren bir JSON veri seti.

### Kaynak

Bu veriler ilk olarak **Dain M. Blodorn Kim** (@dblodorn) tarafından interaktif web sürümü ([dblodorn/sanzo-wada](https://github.com/dblodorn/sanzo-wada/)) için derlenip açık kaynak olarak yayımlandı. Ardından **Matt DesLauriers** (@mattdesl) orijinaldeki bazı hatalı verileri düzeltti, CMYK'dan RGB'ye daha algısal bir dönüşüm kullandı ve veri setini bağımsız, dağıtılabilir bir proje haline getirdi ([mattdesl/dictionary-of-colour-combinations](https://github.com/mattdesl/dictionary-of-colour-combinations)).

Bu repo, o projenin bir fork'udur ve yazılım projelerine yönelik dosyalar ekler. Bu dosyaların tamamı `colors.json`'dan türetilir: hazır paletler, WCAG kontrast verileri, objektif renk etiketleri, CSS değişkenleri, design token'lar ve TypeScript tipleri. `colors.json` değiştirilmemiştir, yani mevcut kodlar çalışmaya devam eder.

### Veri

[./colors.json](./colors.json) dosyası, her biri aşağıdaki biçimde olan renklerden oluşan bir dizidir:

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

Kitapta her benzersiz rengin şu bilgileri vardır:

- "Burnt Sienna" veya "Rosolanc Purple" gibi bir isim
- Kombinasyonlar: rengin yer aldığı palet(ler) (1 ile 348 arası kimlikler)
- 0 ile 100 arasında `C% / M% / Y% / K%` biçiminde CMYK değerleri
- Rengin ait olduğu renk kartelası (159 renk 6 bölüme ayrılmıştır, `swatch` 0 – 5)

Renkler yazar tarafından zaten oldukça hoş bir düzende sıralanmıştır ve buradaki veri bu sırayı korur.

### Kurulum

JavaScript ve npm/Node.js kullanıyorsanız bu fork'u GitHub'dan kurabilirsiniz:

```sh
npm install github:MaNga-003/dictionary-of-colour-combinations
```

(`npm install dictionary-of-colour-combinations` komutu yalnızca `colors.json` içeren orijinal paketi kurar.)

### Türetilmiş Dosyalar

Bu dosyalar `colors.json`'dan `src/build.js` ile üretilir (`npm run build`). Renklere her zaman `colors.json` içindeki sıra numaralarıyla (index) başvurulur.

| Dosya | İçerik |
| --- | --- |
| [`palettes.json`](./palettes.json) | Kullanıma hazır paletler halinde 348 kombinasyon ve her renk çifti için WCAG kontrastı |
| [`meta.json`](./meta.json) | Her renk için slug, parlaklık (luminance), LCh, beyaz/siyah üzerinde kontrast, önerilen metin rengi ve etiketler |
| [`colors.css`](./colors.css) | CSS değişkenleri, örn. `--sanzo-burnt-sienna: #ae5224;` |
| [`tokens.json`](./tokens.json) | [W3C Design Tokens](https://design-tokens.github.io/community-group/format/) formatı |
| [`index.d.ts`](./index.d.ts) | Yukarıdakilerin tümü için TypeScript tipleri |

#### palettes.json

Kimliğe (id) göre sıralıdır. 1–120 arası kimlikler 2 renkli, 121–240 arası 3 renkli, 241–348 arası 4 renkli kombinasyonlardır.

```js
{
  "id": 241,
  "size": 4,
  "colors": [ 17, 39, 50, 124 ],
  "names": [ "Red Orange", "Pale Lemon Yellow", "Isabella Color", "Dark Medici Blue" ],
  "hex": [ "#dd4027", "#ffefae", "#c5a56e", "#547076" ],
  "contrast": [
    { "a": 39, "b": 124, "ratio": 4.6, "aa": true, "aaLarge": true, "aaa": false },
    // ... her renk çifti için bir kayıt
  ]
}
```

`ratio`, iki ondalık basamağa yuvarlanmış [WCAG 2.x kontrast oranıdır](https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio). `aa` (≥ 4.5), `aaLarge` (≥ 3, büyük metin ve arayüz bileşenleri) ve `aaa` (≥ 7) değerleri yuvarlanmamış orandan hesaplanır.

#### meta.json

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

`lch`, `lab` alanından (D50) türetilen CIE LCh değeridir: açıklık (L), doygunluk (C) ve derece cinsinden renk tonu (H). Etiketler yalnızca bu değerlerden, aşağıdaki eşiklerle atanır (bkz. `src/build.js`). Filtreleme kolaylığı içindir, kitaptan gelen yorumlar değildir.

| Grup | Etiket | Kural |
| --- | --- | --- |
| Sıcaklık | `neutral` (nötr) | C < 10 |
| | `warm` (sıcak) | ton ∈ [330°, 360°) ∪ [0°, 90°) |
| | `cool` (soğuk) | ton ∈ [150°, 300°) |
| Açıklık | `light` (açık) | L ≥ 70 |
| | `dark` (koyu) | L ≤ 35 |
| Doygunluk | `vivid` (canlı) | C ≥ 50 |
| | `pastel` | L ≥ 70 ve 10 ≤ C < 40 |
| | `muted` (soluk) | L < 70 ve 10 ≤ C < 25 |

Aradaki tonlar (sarımsı yeşiller ve morlar) sıcaklık etiketi almaz.

### Örnekler

```js
const colors = require('dictionary-of-colour-combinations');
const palettes = require('dictionary-of-colour-combinations/palettes.json');
const meta = require('dictionary-of-colour-combinations/meta.json');

// Tüm 3 renkli paletler
const triads = palettes.filter(p => p.size === 3);

// En az bir AA okunabilir metin/arka plan çifti içeren paletler
const readable = palettes.filter(p => p.contrast.some(pair => pair.aa));

// Bir rengin üzerinde okunabilir metin rengi
const { hex, textColor } = meta.find(m => m.slug === 'burnt-sienna');

// Açık ve soğuk renkler
const coolLights = meta.filter(m => m.tags.includes('cool') && m.tags.includes('light'));
```

CSS (paket import'larını çözebilen bir bundler ile, örn. Vite veya webpack):

```css
@import 'dictionary-of-colour-combinations/colors.css';

.button {
  background: var(--sanzo-burnt-sienna);
}
```

TypeScript (JSON dosyaları için `resolveJsonModule` gerekir):

```ts
import colors, { Palette, ColorMeta } from 'dictionary-of-colour-combinations';
import palettesJson from 'dictionary-of-colour-combinations/palettes.json';

const palettes = palettesJson as Palette[];
```

### Geliştirme

```sh
npm run build   # türetilmiş dosyaları colors.json'dan yeniden üretir
npm test        # veriyi doğrular ve türetilmiş dosyaların güncel olduğunu kontrol eder
```

`colors.json`'u yeniden üretirseniz (bkz. [Kaynaktan Dönüştürme](#kaynaktan-dönüştürme)), ardından `npm run build` çalıştırın.

> Not: `package.json` içindeki paket adı orijinal npm paketiyle aynıdır. Bu fork'u npm'de yayımlamadan önce adı değiştirilmelidir (örn. scope eklenerek).

### CMYK'dan RGB'ye

@dblodorn'un orijinal verisindeki bazı CMYK → RGB dönüşümleri, kitaptaki basılı renklerden oldukça farklı görünüyordu.

Bu veride her CMYK değeri, basılı renkleri daha iyi temsil etmeye çalışan belirli renk profilleri kullanılarak RGB'ye dönüştürülmüştür:

- CMYK: U.S. Web Coated (SWOP) v2.icc
- RGB: sRGB IEC61966-2.1.icc

(Relative Colorimetric ve Black Point Compensation ile dönüştürülmüştür)

JSON verisindeki `rgb`, `lab` (D50 aydınlatıcılı L\*a\*b\*) ve `hex` alanları bu dönüşümlerden gelir.

Dönüşüm birebir olmadığı için kitabın basılı renkleriyle hâlâ bazı farklar olabilir.

### Kaynaktan Dönüştürme

CMYK değerlerini farklı renk profilleriyle RGB/LAB/HEX'e dönüştürmek isterseniz Python ile şunu yapabilirsiniz:

```sh
pip3 install -r requirements.txt
```

Ardından `src/augment_sanzo.py` içindeki profil dosyalarını değiştirip script'i çalıştırın:

```sh
python3 src/augment_sanzo.py
npm run build
```

### Lisans

MIT, ayrıntılar için [LICENSE.md](./LICENSE.md) dosyasına bakın.

---

## English

A JSON dataset of 348 colour combinations (of 2, 3, and 4 colours) of 159 unique colours, from the book ["A Dictionary of Colour Combinations"](https://coloursmayvary.com/products/copy-of-a-dictionary-of-colour-combinations-by-sanzo-wada) compiled by Sanzo Wada (1883 – 1967) and published by Seigensha Art.

### Source

The data here has originally been compiled and open sourced by **Dain M. Blodorn Kim** (@dblodorn) for his interactive web version ([dblodorn/sanzo-wada](https://github.com/dblodorn/sanzo-wada/)). **Matt DesLauriers** (@mattdesl) then fixed some incorrect data from the original, used a more perceptual CMYK to RGB conversion, and encapsulated the dataset as a standalone and distributed project ([mattdesl/dictionary-of-colour-combinations](https://github.com/mattdesl/dictionary-of-colour-combinations)).

This repository is a fork of that project which adds files aimed at software projects, all derived from `colors.json`: ready-made palettes, WCAG contrast data, objective colour tags, CSS custom properties, design tokens and TypeScript types. `colors.json` itself is unchanged, so existing code keeps working.

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
- Which swatch book the colour is associated with (the 159 colours are split into 6 chapters, `swatch` 0 – 5)

The colours are already sorted by the author in a fairly pleasing way, and the data here maintains that order.

### Installation

If you are using JavaScript and npm/Node.js, you can install this fork from GitHub:

```sh
npm install github:MaNga-003/dictionary-of-colour-combinations
```

(`npm install dictionary-of-colour-combinations` installs the upstream package, which only contains `colors.json`.)

### Derived Files

These files are generated from `colors.json` by `src/build.js` (`npm run build`). Colours are always referenced by their index in `colors.json`.

| File | Contents |
| --- | --- |
| [`palettes.json`](./palettes.json) | The 348 combinations as ready-to-use palettes, with WCAG contrast for every colour pair |
| [`meta.json`](./meta.json) | Per-colour slug, luminance, LCh, contrast on white/black, recommended text colour and tags |
| [`colors.css`](./colors.css) | CSS custom properties, e.g. `--sanzo-burnt-sienna: #ae5224;` |
| [`tokens.json`](./tokens.json) | [W3C Design Tokens](https://design-tokens.github.io/community-group/format/) format |
| [`index.d.ts`](./index.d.ts) | TypeScript types for all of the above |

#### palettes.json

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

#### meta.json

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

### Examples

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

CSS (with a bundler that resolves package imports, e.g. Vite or webpack):

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

### Development

```sh
npm run build   # regenerate the derived files from colors.json
npm test        # validate the data and check the derived files are up to date
```

If you regenerate `colors.json` (see [Converting from Source](#converting-from-source)), run `npm run build` afterwards.

> Note: the package name in `package.json` is the same as the upstream npm package, so it must be renamed (e.g. scoped) before publishing this fork to npm.

### CMYK to RGB

The original data by @dblodorn contained some conversions from CMYK to RGB that looked very different than the physical colours in the book.

In this fork of the data, each CMYK value is converted to RGB using specific colour profiles that attempt to better represent the physical printed colours:

- CMYK: U.S. Web Coated (SWOP) v2.icc
- RGB: sRGB IEC61966-2.1.icc

(Converted with Relative Colorimetric and Black Point Compensation)

These conversions provide the `rgb`, `lab` (L\*a\*b\* with D50 illuminant) and `hex` fields in the JSON data.

There may still be some differences to the book's printed swatches, as the conversion is not exact.

### Converting from Source

If you wish to convert the CMYK values to RGB/LAB/HEX with different colour profiles, you can do the following with Python:

```sh
pip3 install -r requirements.txt
```

Then, change the profile files in `src/augment_sanzo.py` and run the script:

```sh
python3 src/augment_sanzo.py
npm run build
```

### License

MIT, see [LICENSE.md](./LICENSE.md) for details.
