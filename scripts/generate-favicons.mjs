/**
 * Build Google-ready favicons from public/favicon.source.png (or public/favicon.png).
 * Run: node scripts/generate-favicons.mjs
 */
import fs from "node:fs";
import sharp from "sharp";

const SOURCE = fs.existsSync("public/favicon.source.png")
  ? "public/favicon.source.png"
  : "public/favicon.png";

async function knockOutBlack(inputPath) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.from(data);
  const threshold = 40;
  let minX = width,
    minY = height,
    maxX = 0,
    maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = out[i];
      const g = out[i + 1];
      const b = out[i + 2];
      if (r < threshold && g < threshold && b < threshold) {
        out[i + 3] = 0;
        continue;
      }
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < minX) throw new Error(`No logo pixels found in ${inputPath}`);

  const margin = 2;
  minX = Math.max(0, minX - margin);
  minY = Math.max(0, minY - margin);
  maxX = Math.min(width - 1, maxX + margin);
  maxY = Math.min(height - 1, maxY + margin);

  return sharp(out, { raw: { width, height, channels: 4 } })
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .png()
    .toBuffer();
}

async function toSquare(glyphPng, size, { padRatio = 0.04, opaqueBlack = false } = {}) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const resized = await sharp(glyphPng)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: opaqueBlack
        ? { r: 0, g: 0, b: 0, alpha: 1 }
        : { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resized, gravity: "centre" }])
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
  if (!fs.existsSync(SOURCE)) {
    throw new Error(`Missing ${SOURCE}. Add your red F logo as public/favicon.png first.`);
  }

  if (!fs.existsSync("public/favicon.source.png")) {
    fs.copyFileSync(SOURCE, "public/favicon.source.png");
  }

  fs.mkdirSync("public/icons", { recursive: true });
  fs.mkdirSync("public/images/logo", { recursive: true });

  const glyph = await knockOutBlack(SOURCE);
  fs.writeFileSync("public/icons/glyph-f.png", glyph);

  for (const s of [16, 32, 48, 96, 192, 512]) {
    fs.writeFileSync(
      `public/icons/icon-${s}.png`,
      await toSquare(glyph, s, { padRatio: 0.04, opaqueBlack: false }),
    );
  }

  const apple180 = await toSquare(glyph, 180, { padRatio: 0.06, opaqueBlack: true });
  fs.writeFileSync("public/icons/icon-180.png", apple180);
  fs.writeFileSync("public/apple-touch-icon.png", apple180);

  // Google SERP + browser tab (must be crawlable at /favicon.ico)
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

  console.log("✓ Favicons generated (square, transparent, Google-ready)");
  console.log("  /favicon.ico");
  console.log("  /favicon.png");
  console.log("  /icons/icon-48.png … icon-512.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
