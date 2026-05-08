import { createCanvas } from "canvas";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { readFileSync, mkdirSync, existsSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDF_PATH = path.resolve(__dirname, "../../catalogo.pdf");
const OUTPUT_DIR = path.resolve(__dirname, "../public/products");

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

// Pages to extract and their output name
const PAGES_TO_EXTRACT = [
  { page: 2,  name: "comedouros-promo" },
  { page: 3,  name: "arranhadores-gatos" },
  { page: 4,  name: "shampoos-1" },
  { page: 5,  name: "shampoos-2" },
  { page: 6,  name: "perfumes" },
  { page: 10, name: "coleiras-caes" },
  { page: 15, name: "camas-caes" },
  { page: 20, name: "brinquedos-caes" },
  { page: 31, name: "guias-corda" },
  { page: 32, name: "guias-nylon" },
  { page: 35, name: "coleiras-1" },
  { page: 40, name: "petiscos-1" },
  { page: 50, name: "petiscos-2" },
  { page: 60, name: "racao-gatos" },
  { page: 80, name: "higiene-1" },
  { page: 100, name: "vet-1" },
  { page: 120, name: "tosa-1" },
  { page: 140, name: "animais-pequenos-1" },
  { page: 160, name: "passaros-1" },
  { page: 169, name: "canecas-alum" },
  { page: 172, name: "banheiras-alum" },
];

const SCALE = 1.5;

async function extractPage(pdf, pageNum, outputName) {
  try {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: SCALE });

    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext("2d");

    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    const buffer = canvas.toBuffer("image/jpeg", { quality: 0.85 });
    const outPath = path.join(OUTPUT_DIR, `${outputName}.jpg`);
    await writeFile(outPath, buffer);
    console.log(`✓ Page ${pageNum} → ${outputName}.jpg`);
  } catch (err) {
    console.error(`✗ Page ${pageNum} failed:`, err.message);
  }
}

async function main() {
  console.log(`📄 Loading PDF: ${PDF_PATH}`);
  const data = readFileSync(PDF_PATH);
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(data) }).promise;
  console.log(`📚 PDF loaded — ${pdf.numPages} pages total`);

  for (const { page, name } of PAGES_TO_EXTRACT) {
    await extractPage(pdf, page, name);
  }

  console.log(`\n✅ Done! Images saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
