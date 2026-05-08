/**
 * extract-puppeteer-v3.mjs
 * Versão corrigida: usa coordenadas relativas à área da página PDF (não ao viewport)
 * 
 * Layout do Chrome PDF Viewer (1100x1500 viewport):
 *   - Sidebar esquerda: ~300px (thumbnails)
 *   - Área de conteúdo começa em X ≈ 408, Y ≈ 330 (para primeira página visível)
 *   - Largura da página PDF ≈ 660px, Altura ≈ 930px
 */
import puppeteer from "puppeteer";
import { mkdirSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDF_PATH = path.resolve(__dirname, "../../catalogo.pdf").replace(/\\/g, "/");
const PDF_URL = `file:///${PDF_PATH}`;
const OUTPUT_DIR = path.resolve(__dirname, "../public/products");

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const VP_W = 1100;
const VP_H = 1500;

// Área da página PDF dentro do viewport do Chrome PDF Viewer
// (medir após renderização — sidebar ocupa ~300px, margin ~8px)
// Para cada navigate, a página fica centralizada — ajuste esses valores se necessário
const PAGE_OFFSET_X = 408; // início da área branca da página
const PAGE_OFFSET_Y = 10;  // início vertical (topo do viewer sem sidebar mostrando)
const PAGE_W = 660;        // largura da página PDF em px (no zoom atual)
const PAGE_H = 1480;       // altura da página PDF em px

// ---------------------------------------------------------------------------
// crop: { x, y, w, h } — frações relativas à PAGE_W e PAGE_H
// ---------------------------------------------------------------------------
const EXTRACTIONS = [
  // ── Página 2: comedouros/bebedouros ──
  { page: 2, name: "comedouro-antiformiga-350ml",  crop: { x: 0.00, y: 0.04, w: 0.55, h: 0.28 } },
  { page: 2, name: "com-aluminio-grande-2300ml",   crop: { x: 0.00, y: 0.38, w: 0.55, h: 0.22 } },
  { page: 2, name: "bebedouro-automatico",         crop: { x: 0.36, y: 0.62, w: 0.32, h: 0.27 } },
  { page: 2, name: "bebedouro-fonte",              crop: { x: 0.60, y: 0.62, w: 0.38, h: 0.27 } },

  // ── Página 3: gatos ──
  { page: 3, name: "arranhador-torre-gatos",       crop: { x: 0.02, y: 0.06, w: 0.28, h: 0.55 } },
  { page: 3, name: "arranhador-simples-sisal",     crop: { x: 0.32, y: 0.06, w: 0.30, h: 0.40 } },
  { page: 3, name: "cama-ninho-gatos",             crop: { x: 0.63, y: 0.06, w: 0.35, h: 0.38 } },

  // ── Página 4: shampoos ──
  { page: 4, name: "shampoo-caes",                 crop: { x: 0.02, y: 0.10, w: 0.45, h: 0.36 } },
  { page: 4, name: "shampoo-gatos",               crop: { x: 0.52, y: 0.10, w: 0.45, h: 0.36 } },
  { page: 4, name: "condicionador-pet",            crop: { x: 0.02, y: 0.50, w: 0.45, h: 0.36 } },

  // ── Página 6: perfumes ──
  { page: 6, name: "perfume-colonia",              crop: { x: 0.02, y: 0.08, w: 0.94, h: 0.50 } },

  // ── Página 31: guias corda ──
  { page: 31, name: "guia-corda-amortecedor",      crop: { x: 0.02, y: 0.08, w: 0.55, h: 0.46 } },
  { page: 31, name: "guia-adestramento",           crop: { x: 0.02, y: 0.56, w: 0.55, h: 0.34 } },

  // ── Página 32: guias nylon ──
  { page: 32, name: "guia-nylon",                  crop: { x: 0.02, y: 0.08, w: 0.55, h: 0.50 } },

  // ── Página 40: petiscos ──
  { page: 40, name: "petisco-ossinho-natural",     crop: { x: 0.02, y: 0.08, w: 0.94, h: 0.53 } },

  // ── Página 50: bifinho ──
  { page: 50, name: "bifinho-carne",               crop: { x: 0.02, y: 0.08, w: 0.94, h: 0.53 } },

  // ── Página 60: ração gatos ──
  { page: 60, name: "racao-gatos",                 crop: { x: 0.02, y: 0.08, w: 0.94, h: 0.53 } },

  // ── Página 80: higiene ──
  { page: 80, name: "antipulgas-spray",            crop: { x: 0.02, y: 0.08, w: 0.55, h: 0.53 } },
  { page: 80, name: "lenco-umedecido",             crop: { x: 0.55, y: 0.08, w: 0.42, h: 0.53 } },

  // ── Página 100: veterinário ──
  { page: 100, name: "vermifugo-caes",             crop: { x: 0.02, y: 0.08, w: 0.45, h: 0.43 } },
  { page: 100, name: "vermifugo-gatos",            crop: { x: 0.52, y: 0.08, w: 0.45, h: 0.43 } },
  { page: 100, name: "antipulgas-pipeta",          crop: { x: 0.02, y: 0.53, w: 0.45, h: 0.36 } },
  { page: 100, name: "suplemento-articular",       crop: { x: 0.52, y: 0.53, w: 0.45, h: 0.36 } },

  // ── Página 120: tosa ──
  { page: 120, name: "maquina-tosa",               crop: { x: 0.02, y: 0.08, w: 0.55, h: 0.53 } },
  { page: 120, name: "tesoura-tosa",               crop: { x: 0.55, y: 0.08, w: 0.42, h: 0.36 } },

  // ── Página 140: animais pequenos ──
  { page: 140, name: "gaiola-passaro",             crop: { x: 0.02, y: 0.08, w: 0.55, h: 0.53 } },
  { page: 140, name: "hamster-gaiola",             crop: { x: 0.55, y: 0.08, w: 0.42, h: 0.43 } },

  // ── Página 169: canecas alumínio ──
  { page: 169, name: "caneca-alum-borboleta-p",    crop: { x: 0.01, y: 0.05, w: 0.34, h: 0.40 } },
  { page: 169, name: "caneca-alum-borboleta-m",    crop: { x: 0.34, y: 0.05, w: 0.34, h: 0.40 } },
  { page: 169, name: "caneca-alum-borboleta-g",    crop: { x: 0.65, y: 0.05, w: 0.33, h: 0.40 } },

  // ── Página 172: banheiras alumínio ──
  { page: 172, name: "banheira-alum-p",            crop: { x: 0.01, y: 0.50, w: 0.34, h: 0.40 } },
  { page: 172, name: "banheira-alum-m",            crop: { x: 0.34, y: 0.50, w: 0.34, h: 0.40 } },
  { page: 172, name: "banheira-alum-g",            crop: { x: 0.65, y: 0.50, w: 0.33, h: 0.40 } },
];

// ---------------------------------------------------------------------------
async function main() {
  console.log("\n🚀 Iniciando Puppeteer (v3 — coordenadas corrigidas)...");

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--allow-file-access-from-files",
      "--disable-web-security",
    ],
  });

  const tab = await browser.newPage();
  // Sem sidebar: usar viewer sem thumbnail pane
  await tab.setViewport({ width: VP_W, height: VP_H, deviceScaleFactor: 2 });

  const byPage = new Map();
  for (const item of EXTRACTIONS) {
    if (!byPage.has(item.page)) byPage.set(item.page, []);
    byPage.get(item.page).push(item);
  }

  let ok = 0, fail = 0;

  for (const [pageNum, items] of [...byPage.entries()].sort((a, b) => a[0] - b[0])) {
    console.log(`\n📄 Página ${pageNum} — ${items.length} produto(s)...`);
    try {
      // Usar parâmetro toolbar=0 para esconder a sidebar de thumbnails
      await tab.goto(`${PDF_URL}#page=${pageNum}&toolbar=0&navpanes=0&scrollbar=0`, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });
      await new Promise((r) => setTimeout(r, 4000));

      // Descobrir layout real após carregamento
      const layout = await tab.evaluate(() => {
        // Tentar encontrar o canvas do PDF
        const embeds = document.querySelectorAll("embed, iframe");
        const canvases = document.querySelectorAll("canvas");
        const body = document.body;
        return {
          embedCount: embeds.length,
          canvasCount: canvases.length,
          bodyW: body.scrollWidth,
          bodyH: body.scrollHeight,
          innerW: window.innerWidth,
          innerH: window.innerHeight,
        };
      });
      console.log(`  Layout: ${JSON.stringify(layout)}`);

      // Tirar screenshot completo para debug da primeira página
      if (pageNum === 2 || pageNum === 3) {
        await tab.screenshot({
          path: path.join(OUTPUT_DIR, `_debug_page${pageNum}.jpg`),
          type: "jpeg", quality: 80,
        });
        console.log(`  📸 Debug screenshot salvo`);
      }

      for (const { name, crop } of items) {
        try {
          // Calcular coordenadas em pixels do viewport
          // O PDF viewer do Chrome renderiza a página numa área que precisamos descobrir
          const clipX = Math.round(PAGE_OFFSET_X + crop.x * PAGE_W);
          const clipY = Math.round(PAGE_OFFSET_Y + crop.y * PAGE_H);
          const clipW = Math.round(crop.w * PAGE_W);
          const clipH = Math.round(crop.h * PAGE_H);

          const outPath = path.join(OUTPUT_DIR, `${name}.jpg`);
          await tab.screenshot({
            path: outPath,
            type: "jpeg",
            quality: 92,
            clip: { x: clipX, y: clipY, width: clipW, height: clipH },
          });
          console.log(`  ✓ ${name}.jpg (clip: ${clipX},${clipY} ${clipW}×${clipH})`);
          ok++;
        } catch (err) {
          console.error(`  ✗ ${name}: ${err.message}`);
          fail++;
        }
      }
    } catch (err) {
      console.error(`  Erro página ${pageNum}: ${err.message}`);
      fail += items.length;
    }
  }

  await browser.close();
  console.log(`\n✅ ${ok} ✓ | ${fail} ✗`);
  console.log(`📁 ${OUTPUT_DIR}\n`);
}

main().catch((err) => {
  console.error("\n💥", err.message);
  process.exit(1);
});
