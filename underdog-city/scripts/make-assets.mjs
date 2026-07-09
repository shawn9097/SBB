import sharp from "sharp";

const SRC =
  "/root/.claude/uploads/c783087e-5998-516c-9332-623b016aee60/f6d0b04b-Professional_Band_Profile_Picture.png";

// 1. Hero image — full portrait, web-optimized.
await sharp(SRC).resize(1024, 1024).webp({ quality: 88 }).toFile("public/hero-mask.webp");

// 2. Favicon — tight square crop on the crown + mask.
await sharp(SRC)
  .extract({ left: 400, top: 80, width: 1250, height: 1250 })
  .resize(512, 512)
  .png()
  .toFile("src/app/icon.png");

// 3. Apple touch icon — same crop, 180px.
await sharp(SRC)
  .extract({ left: 400, top: 80, width: 1250, height: 1250 })
  .resize(180, 180)
  .png()
  .toFile("src/app/apple-icon.png");

// 4. OG share image — 1200x630 on void, mask on the left, wordmark on the right.
const maskH = 560;
const mask = await sharp(SRC).resize({ height: maskH }).png().toBuffer();
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <text x="640" y="285" font-family="Georgia, 'Times New Roman', serif" font-size="86" font-weight="700" fill="#E3DCCB" letter-spacing="3">UNDERDOG</text>
  <text x="640" y="378" font-family="Georgia, 'Times New Roman', serif" font-size="86" font-weight="700" fill="#E3DCCB" letter-spacing="3">CITY</text>
  <text x="642" y="438" font-family="Georgia, 'Times New Roman', serif" font-size="26" fill="#A8772E" letter-spacing="6">NOW ACCEPTING TENANTS</text>
</svg>`;
await sharp({
  create: { width: 1200, height: 630, channels: 3, background: "#0a0a0b" },
})
  .composite([
    { input: mask, left: 70, top: Math.round((630 - maskH) / 2) },
    { input: Buffer.from(svg), left: 0, top: 0 },
  ])
  .png()
  .toFile("src/app/opengraph-image.png");

console.log("assets written");
