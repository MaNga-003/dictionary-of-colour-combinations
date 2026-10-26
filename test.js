const assert = require('assert');
const fs = require('fs');
const path = require('path');
const build = require('./src/build');

const colors = require('./colors.json');
const palettes = require('./palettes.json');
const meta = require('./meta.json');

// colors.json
assert.strictEqual(colors.length, 159, '159 unique colours');
colors.forEach(c => {
  assert.match(c.hex, /^#[0-9a-f]{6}$/, `${c.name}: hex format`);
  const rgb = c.rgb.map(n => Math.max(0, Math.min(255, Math.round(n))));
  const fromHex = [ 1, 3, 5 ].map(i => parseInt(c.hex.slice(i, i + 2), 16));
  assert.deepStrictEqual(fromHex, rgb, `${c.name}: hex matches rgb`);
});

// palettes.json
assert.strictEqual(palettes.length, 348, '348 combinations');
const sizes = palettes.reduce((acc, p) => {
  acc[p.size] = (acc[p.size] || 0) + 1;
  return acc;
}, {});
assert.deepStrictEqual(sizes, { 2: 120, 3: 120, 4: 108 });
palettes.forEach((p, i) => {
  assert.strictEqual(p.id, i + 1, 'palettes sorted by id without gaps');
  const expected = p.id <= 120 ? 2 : p.id <= 240 ? 3 : 4;
  assert.strictEqual(p.size, expected, `palette ${p.id}: size matches book chapter`);
  assert.strictEqual(p.colors.length, p.size);
  assert.deepStrictEqual(p.hex, p.colors.map(c => colors[c].hex));
  assert.strictEqual(p.contrast.length, p.size * (p.size - 1) / 2, `palette ${p.id}: all pairs`);
  p.colors.forEach(c => assert.ok(colors[c].combinations.includes(p.id)));
});

// contrast math
assert.strictEqual(build.contrast('#000000', '#ffffff'), 21);
assert.strictEqual(build.contrast('#ae5224', '#ae5224'), 1);
assert.strictEqual(build.contrast('#ae5224', '#ffffff'), build.contrast('#ffffff', '#ae5224'));
palettes.forEach(p => p.contrast.forEach(pair => {
  assert.ok(pair.ratio >= 1 && pair.ratio <= 21);
  if (pair.aaa) assert.ok(pair.aa);
  if (pair.aa) assert.ok(pair.aaLarge);
}));

// meta.json
assert.strictEqual(meta.length, colors.length);
assert.strictEqual(new Set(meta.map(m => m.slug)).size, meta.length, 'unique slugs');
meta.forEach((m, i) => {
  assert.strictEqual(m.name, colors[i].name);
  const best = Math.max(m.contrastOnWhite, m.contrastOnBlack);
  const chosen = m.textColor === '#ffffff' ? m.contrastOnWhite : m.contrastOnBlack;
  assert.strictEqual(chosen, best, `${m.name}: textColor picks higher contrast`);
});

// generated files are up to date with colors.json
const outputs = build.buildAll(colors);
Object.keys(outputs).forEach(file => {
  const committed = fs.readFileSync(path.join(__dirname, file), 'utf8');
  assert.strictEqual(committed, outputs[file], `${file} is stale, run "npm run build"`);
});

console.log('All tests passed');
