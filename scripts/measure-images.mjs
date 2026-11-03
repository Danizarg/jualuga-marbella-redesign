/**
 * Reads the intrinsic size of every photograph in public/img and writes
 * src/data/image-dimensions.ts. Run with `npm run measure:images` after
 * adding or replacing photography.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const imgRoot = path.join(root, "public", "img");

function jpegSize(b) {
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    const sof = [0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf];
    if (sof.includes(m)) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7)) { i += 2; continue; }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

function pngSize(b) {
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}

const entries = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir).sort()) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) { walk(full); continue; }
    if (!/\.(jpe?g|png)$/i.test(name)) continue;
    const buf = fs.readFileSync(full);
    const size = buf[0] === 0x89 ? pngSize(buf) : jpegSize(buf);
    if (!size || !size.w || !size.h) {
      console.warn("could not measure", full);
      continue;
    }
    const url = "/" + path.relative(path.join(root, "public"), full).split(path.sep).join("/");
    entries.push([url, size]);
  }
}
walk(imgRoot);

const body = entries
  .map(([url, s]) => `  "${url}": { width: ${s.w}, height: ${s.h} },`)
  .join("\n");

const out = `// GENERATED FILE — do not edit by hand.
// Run \`npm run measure:images\` to regenerate after changing photography.

export interface ImageDimensions {
  width: number;
  height: number;
}

export const IMAGE_DIMENSIONS: Record<string, ImageDimensions> = {
${body}
};
`;

fs.writeFileSync(path.join(root, "src", "data", "image-dimensions.ts"), out);
console.log(`measured ${entries.length} images`);
