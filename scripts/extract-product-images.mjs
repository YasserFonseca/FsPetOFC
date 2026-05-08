/**
 * extract-product-images.mjs
 * Extrai imagens individuais dos produtos de cada página do catálogo FS PET.
 * Usa pdfjs-dist com NodeCanvasFactory para renderizar páginas no Node.js.
 */

import { createCanvas } from "canvas";
import { readFileSync, mkdirSync, existsSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDF_PATH = path.resolve(__dirname, "../../catalogo.pdf");
const OUTPUT_DIR = path.resolve(__dirname, "../public/products");

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// NodeCanvasFactory — necessário para pdfjs-dist rodar no Node.js
// ---------------------------------------------------------------------------
class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    return { canvas, context };
  }
  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }
  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
  }
}

// ---------------------------------------------------------------------------
// Mapa de páginas e recortes de produtos
// Cada entrada: { page, name, crop: { x, y, w, h } em % da página }
// x,y = canto superior esquerdo; w,h = largura/altura (valores 0-1)
// ---------------------------------------------------------------------------
const PRODUCTS_TO_EXTRACT = [
  // Página 2 - comedouros/bebedouros anti-formiga
  { page: 2, name: "comedouro-antiformiga-350ml",   crop: { x: 0.03, y: 0.06, w: 0.55, h: 0.30 } },
  { page: 2, name: "comedouro-antiformiga-1000ml",  crop: { x: 0.03, y: 0.36, w: 0.55, h: 0.25 } },
  { page: 2, name: "com-aluminio-grande-2300ml",    crop: { x: 0.03, y: 0.52, w: 0.55, h: 0.22 } },
  { page: 2, name: "bebedouro-automatico",          crop: { x: 0.40, y: 0.64, w: 0.35, h: 0.28 } },
  { page: 2, name: "bebedouro-fonte",               crop: { x: 0.60, y: 0.64, w: 0.38, h: 0.28 } },

  // Página 3 - arranhadores e casas para gatos
  { page: 3, name: "arranhador-torre-gatos",        crop: { x: 0.05, y: 0.05, w: 0.28, h: 0.55 } },
  { page: 3, name: "arranhador-simples-sisal",      crop: { x: 0.35, y: 0.05, w: 0.28, h: 0.35 } },
  { page: 3, name: "cama-ninho-gatos",              crop: { x: 0.63, y: 0.05, w: 0.35, h: 0.35 } },

  // Página 4 - shampoos
  { page: 4, name: "shampoo-caes",                  crop: { x: 0.03, y: 0.10, w: 0.45, h: 0.35 } },
  { page: 4, name: "shampoo-gatos",                 crop: { x: 0.50, y: 0.10, w: 0.45, h: 0.35 } },
  { page: 4, name: "condicionador-pet",             crop: { x: 0.03, y: 0.50, w: 0.45, h: 0.35 } },

  // Página 5 - mais shampoos/higiene
  { page: 5, name: "shampoos-variados",             crop: { x: 0.03, y: 0.08, w: 0.94, h: 0.50 } },

  // Página 6 - perfumes e colônias
  { page: 6, name: "perfume-colonia",               crop: { x: 0.03, y: 0.08, w: 0.94, h: 0.55 } },

  // Página 31 - guias de corda
  { page: 31, name: "guia-corda-amortecedor",       crop: { x: 0.03, y: 0.08, w: 0.55, h: 0.45 } },
  { page: 31, name: "guia-adestramento",            crop: { x: 0.03, y: 0.55, w: 0.55, h: 0.35 } },

  // Página 32 - guias nylon
  { page: 32, name: "guia-nylon",                   crop: { x: 0.03, y: 0.08, w: 0.55, h: 0.50 } },

  // Página 40 - petiscos naturais
  { page: 40, name: "petisco-ossinho-natural",      crop: { x: 0.03, y: 0.08, w: 0.94, h: 0.55 } },

  // Página 50 - petiscos / bifinho
  { page: 50, name: "bifinho-carne",                crop: { x: 0.03, y: 0.08, w: 0.94, h: 0.55 } },

  // Página 80 - higiene
  { page: 80, name: "antipulgas-spray",             crop: { x: 0.03, y: 0.08, w: 0.55, h: 0.55 } },
  { page: 80, name: "lenco-umedecido",              crop: { x: 0.55, y: 0.08, w: 0.42, h: 0.55 } },

  // Página 100 - veterinário
  { page: 100, name: "vermifugo-caes",              crop: { x: 0.03, y: 0.08, w: 0.45, h: 0.45 } },
  { page: 100, name: "vermifugo-gatos",             crop: { x: 0.52, y: 0.08, w: 0.45, h: 0.45 } },
  { page: 100, name: "antipulgas-pipeta",           crop: { x: 0.03, y: 0.55, w: 0.45, h: 0.35 } },

  // Página 120 - tosa
  { page: 120, name: "maquina-tosa",                crop: { x: 0.03, y: 0.08, w: 0.55, h: 0.55 } },
  { page: 120, name: "tesoura-tosa",               crop: { x: 0.55, y: 0.08, w: 0.42, h: 0.35 } },

  // Página 140 - animais pequenos
  { page: 140, name: "gaiola-passaro",              crop: { x: 0.03, y: 0.08, w: 0.55, h: 0.55 } },
  { page: 140, name: "hamster-gaiola",              crop: { x: 0.55, y: 0.08, w: 0.42, h: 0.45 } },

  // Página 169 - canecas alumínio
  { page: 169, name: "caneca-alum-borboleta-p",     crop: { x: 0.03, y: 0.08, w: 0.30, h: 0.40 } },
  { page: 169, name: "caneca-alum-borboleta-m",     crop: { x: 0.35, y: 0.08, w: 0.30, h: 0.40 } },
  { page: 169, name: "caneca-alum-borboleta-g",     crop: { x: 0.65, y: 0.08, w: 0.32, h: 0.40 } },

  // Página 172 - banheiras alumínio
  { page: 172, name: "banheira-alum-p",             crop: { x: 0.03, y: 0.55, w: 0.30, h: 0.35 } },
  { page: 172, name: "banheira-alum-m",             crop: { x: 0.35, y: 0.55, w: 0.30, h: 0.35 } },
  { page: 172, name: "banheira-alum-g",             crop: { x: 0.65, y: 0.55, w: 0.32, h: 0.35 } },
];

// ---------------------------------------------------------------------------
// Extrai e recorta uma imagem de produto a partir de uma página renderizada
// ---------------------------------------------------------------------------
async function extractProductFromPage(pdf, pageNum, name, crop, scale = 2.5) {
  try {
    const page = await pdf.getPage(pageNum);
    const origViewport = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale });

    const factory = new NodeCanvasFactory();
    const { canvas, context } = factory.create(viewport.width, viewport.height);

    await page.render({
      canvasContext: context,
      viewport,
      canvasFactory: factory,
    }).promise;

    // Dimensões do crop em pixels
    const cropX = Math.floor(crop.x * viewport.width);
    const cropY = Math.floor(crop.y * viewport.height);
    const cropW = Math.floor(crop.w * viewport.width);
    const cropH = Math.floor(crop.h * viewport.height);

    // Canvas de saída com fundo branco
    const outCanvas = createCanvas(cropW, cropH);
    const outCtx = outCanvas.getContext("2d");
    outCtx.fillStyle = "#FFFFFF";
    outCtx.fillRect(0, 0, cropW, cropH);
    outCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const buffer = outCanvas.toBuffer("image/jpeg", { quality: 0.90 });
    const outPath = path.join(OUTPUT_DIR, `${name}.jpg`);
    writeFileSync(outPath, buffer);
    console.log(`  ✓ [p${pageNum}] ${name}.jpg (${cropW}×${cropH}px)`);
    return true;
  } catch (err) {
    console.error(`  ✗ [p${pageNum}] ${name}: ${err.message}`);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  // Import dinâmico para ESM
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");

  console.log(`\n📄 Carregando PDF: ${PDF_PATH}`);
  const data = readFileSync(PDF_PATH);
  const pdf = await getDocument({
    data: new Uint8Array(data),
    useSystemFonts: true,
  }).promise;

  console.log(`📚 PDF carregado — ${pdf.numPages} páginas\n`);

  // Agrupar por página para carregar cada página uma só vez
  const byPage = new Map();
  for (const item of PRODUCTS_TO_EXTRACT) {
    if (!byPage.has(item.page)) byPage.set(item.page, []);
    byPage.get(item.page).push(item);
  }

  let ok = 0, fail = 0;
  for (const [pageNum, items] of [...byPage.entries()].sort((a, b) => a[0] - b[0])) {
    console.log(`\n📄 Página ${pageNum} — ${items.length} produto(s)`);
    const page = await pdf.getPage(pageNum);
    const scale = 2.5;
    const viewport = page.getViewport({ scale });

    const factory = new NodeCanvasFactory();
    const { canvas, context } = factory.create(viewport.width, viewport.height);

    await page.render({ canvasContext: context, viewport, canvasFactory: factory }).promise;

    for (const { name, crop } of items) {
      try {
        const cX = Math.floor(crop.x * viewport.width);
        const cY = Math.floor(crop.y * viewport.height);
        const cW = Math.floor(crop.w * viewport.width);
        const cH = Math.floor(crop.h * viewport.height);

        const outCanvas = createCanvas(cW, cH);
        const outCtx = outCanvas.getContext("2d");
        outCtx.fillStyle = "#FFFFFF";
        outCtx.fillRect(0, 0, cW, cH);
        outCtx.drawImage(canvas, cX, cY, cW, cH, 0, 0, cW, cH);

        const buffer = outCanvas.toBuffer("image/jpeg", { quality: 0.90 });
        writeFileSync(path.join(OUTPUT_DIR, `${name}.jpg`), buffer);
        console.log(`  ✓ ${name}.jpg (${cW}×${cH}px)`);
        ok++;
      } catch (err) {
        console.error(`  ✗ ${name}: ${err.message}`);
        fail++;
      }
    }
  }

  console.log(`\n✅ Concluído: ${ok} imagens salvas, ${fail} falhas`);
  console.log(`📁 Pasta: ${OUTPUT_DIR}\n`);
}

main().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(1);
});
