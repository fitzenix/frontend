/**
 * Build favicons from the Fitzenix F mark.
 * Prefer src/app/f_favicon.png (uploaded brand mark), then public/favicon.source.png.
 *
 * Run: npm run generate:favicons
 */
import fs from "node:fs";
import sharp from "sharp";

const CANDIDATES = ["src/app/f_favicon.png", "public/favicon.source.png", "public/favicon.png"];

function resolveSource() {
  const found = CANDIDATES.find((p) => fs.existsSync(p));
  if (!found) {
    throw new Error(
      `Missing favicon source. Add your red F logo as src/app/f_favicon.png (or public/favicon.source.png).`,
    );
  }
  return found;
}

/** Resize the full branded icon (keeps red background + F). */
async function resizeIcon(inputPath, size) {
  return sharp(inputPath)
    .resize(size, size, {
      fit: "cover",
      position: "centre",
    })
    .png()
    .toBuffer();
}

function createIco(pngBuffers, dims) {
  const num = pngBuffers.length;
  const headerSize = 6 + num * 16;
  let offset = headerSize;
  const entries = pngBuffers.map((buf, i) => {
    const entry = { d: dims[i], size: buf.length, offset };
    offset += buf.length;
    return entry;
  });
  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(num, 4);
  let p = 6;
  for (const e of entries) {
    buf.writeUInt8(e.d >= 256 ? 0 : e.d, p++);
    buf.writeUInt8(e.d >= 256 ? 0 : e.d, p++);
    buf.writeUInt8(0, p++);
    buf.writeUInt8(0, p++);
    buf.writeUInt16LE(1, p);
    p += 2;
    buf.writeUInt16LE(32, p);
    p += 2;
    buf.writeUInt32LE(e.size, p);
    p += 4;
    buf.writeUInt32LE(e.offset, p);
    p += 4;
  }
  for (let i = 0; i < num; i++) pngBuffers[i].copy(buf, entries[i].offset);
  return buf;
}

async function main() {
  const source = resolveSource();
  fs.mkdirSync("public/icons", { recursive: true });
  fs.mkdirSync("public/images/logo", { recursive: true });

  // Keep a stable public source copy for builds / deploys.
  fs.copyFileSync(source, "public/favicon.source.png");

  const sizes = [16, 32, 48, 96, 180, 192, 512];
  for (const s of sizes) {
    const png = await resizeIcon(source, s);
    fs.writeFileSync(`public/icons/icon-${s}.png`, png);
  }

  fs.copyFileSync("public/icons/icon-180.png", "public/apple-touch-icon.png");
  fs.copyFileSync("public/icons/icon-512.png", "public/favicon.png");
  fs.copyFileSync("public/icons/icon-48.png", "public/images/logo/favicon.png");
  fs.copyFileSync("public/icons/icon-512.png", "public/images/logo/fitzenix-mark.png");
  fs.copyFileSync("public/icons/icon-192.png", "src/app/icon.png");
  fs.copyFileSync("public/icons/icon-180.png", "src/app/apple-icon.png");

  const icoSizes = [16, 32, 48];
  const ico = createIco(
    icoSizes.map((s) => fs.readFileSync(`public/icons/icon-${s}.png`)),
    icoSizes,
  );
  fs.writeFileSync("public/favicon.ico", ico);
  fs.writeFileSync("src/app/favicon.ico", ico);

  console.log(`✓ Favicons generated from ${source}`);
  console.log("  /favicon.ico  /favicon.png  /apple-touch-icon.png");
  console.log("  /icons/icon-16.png … icon-512.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
