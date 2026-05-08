export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  ref?: string;
  image?: string;
  isPromo?: boolean;
  tags?: string[];
}

export const categories = [
  { id: "caes", name: "Cães", icon: "🐕", color: "#F5C800" },
  { id: "gatos", name: "Gatos", icon: "🐈", color: "#A8D8EA" },
  { id: "banho-tosa-higiene", name: "Banho, Tosa & Higiene", icon: "🛁", color: "#89C4CF" },
  { id: "petiscos", name: "Petiscos", icon: "🦴", color: "#F4A460" },
  { id: "animais-pequenos", name: "Animais Pequenos", icon: "🐹", color: "#C8A2C8" },
  { id: "vet", name: "Veterinário", icon: "⚕️", color: "#90EE90" },
];

export const products: Product[] = [
  // ===== PROMOÇÕES =====
  {
    id: "bq01",
    name: "Comedouro / Bebedouro Anti-formiga 350ml",
    description: "Comedouro ou bebedouro plástico anti-formiga, capacidade 350ml. Ideal para cães e gatos de pequeno porte.",
    price: 3.74,
    originalPrice: 3.94,
    category: "caes",
    subcategory: "comedouros",
    ref: "BQ01",
    isPromo: true,
    tags: ["comedouro", "bebedouro", "promoção"],
  },
  {
    id: "bq02",
    name: "Comedouro / Bebedouro Anti-formiga 1000ml",
    description: "Comedouro ou bebedouro plástico anti-formiga, capacidade 1000ml. Para cães de médio porte.",
    price: 6.87,
    originalPrice: 7.64,
    category: "caes",
    subcategory: "comedouros",
    ref: "BQ02",
    isPromo: true,
    tags: ["comedouro", "bebedouro", "promoção"],
  },
  {
    id: "bq03",
    name: "Comedouro / Bebedouro Anti-formiga 1900ml",
    description: "Comedouro ou bebedouro plástico anti-formiga, capacidade 1900ml. Para cães de grande porte.",
    price: 11.99,
    originalPrice: 12.80,
    category: "caes",
    subcategory: "comedouros",
    ref: "BQ03",
    isPromo: true,
    tags: ["comedouro", "bebedouro", "promoção"],
  },
  {
    id: "ms1637",
    name: "Com. Alumínio Pesado Grande 2300ml",
    description: "Comedouro de alumínio pesado, tamanho grande, capacidade 2300ml. Alta durabilidade.",
    price: 24.99,
    originalPrice: 32.49,
    category: "caes",
    subcategory: "comedouros",
    ref: "MS1637",
    isPromo: true,
    tags: ["comedouro", "alumínio", "promoção"],
  },
  {
    id: "ms1638",
    name: "Com. Alumínio Pesado Gigante 2800ml",
    description: "Comedouro de alumínio pesado, tamanho gigante, capacidade 2800ml. Para raças grandes.",
    price: 29.99,
    originalPrice: 40.66,
    category: "caes",
    subcategory: "comedouros",
    ref: "MS1638",
    isPromo: true,
    tags: ["comedouro", "alumínio", "promoção"],
  },

  // ===== GUIAS =====
  {
    id: "jp0361-a",
    name: "Guia de Corda c/ Amortecedor 0,80m 12mm",
    description: "Guia roliça de corda com amortecedor embutido. Comprimento 0,80m, espessura 12mm.",
    price: 13.99,
    category: "caes",
    subcategory: "guias",
    ref: "JP0361",
    tags: ["guia", "coleira", "passear"],
  },
  {
    id: "jp0327",
    name: "Guia de Corda c/ Amortecedor 0,60m 16mm",
    description: "Guia roliça de corda com amortecedor. Comprimento 0,60m, espessura 16mm.",
    price: 18.10,
    category: "caes",
    subcategory: "guias",
    ref: "JP0327",
    tags: ["guia", "coleira", "passear"],
  },
  {
    id: "jp0328",
    name: "Guia de Corda c/ Amortecedor 1,00m 16mm",
    description: "Guia roliça de corda com amortecedor. Comprimento 1,00m, espessura 16mm.",
    price: 15.15,
    category: "caes",
    subcategory: "guias",
    ref: "JP0328",
    tags: ["guia", "coleira", "passear"],
  },
  {
    id: "jp0378",
    name: "Guia de Corda Adestramento 0,80m 16mm",
    description: "Guia roliça com enforcador para adestramento. Comprimento 0,80m, espessura 16mm.",
    price: 7.35,
    category: "caes",
    subcategory: "guias",
    ref: "JP0378",
    tags: ["guia", "adestramento", "enforcador"],
  },
  {
    id: "rt2270",
    name: "Guia Nylon 57cm",
    description: "Guia de nylon resistente, comprimento 57cm. Design robusto para uso diário.",
    price: 24.40,
    category: "caes",
    subcategory: "guias",
    ref: "RT2270",
    tags: ["guia", "nylon", "passear"],
  },

  // ===== BEBEDOUROS / DISPENSERS =====
  {
    id: "beb-portatil",
    name: "Bebedouro Portátil para Pets",
    description: "Garrafa bebedouro portátil com dispenser integrado. Perfeito para passeios e viagens.",
    price: 35.90,
    category: "caes",
    subcategory: "bebedouros",
    tags: ["bebedouro", "portátil", "passeio"],
  },
  {
    id: "bebedouro-fonte",
    name: "Fonte / Dispenser de Água Automático",
    description: "Fonte automática com filtro e fluxo constante de água. Estimula o pet a se hidratar.",
    price: 89.90,
    category: "caes",
    subcategory: "bebedouros",
    tags: ["bebedouro", "fonte", "automático"],
  },

  // ===== CAMAS / CASINHAS =====
  {
    id: "cama-pet-p",
    name: "Cama Pet Acolchoada Pequena",
    description: "Cama confortável e acolchoada para pets. Tamanho P. Cobertura lavável.",
    price: 45.00,
    category: "caes",
    subcategory: "camas",
    tags: ["cama", "conforto", "dormir"],
  },
  {
    id: "cama-pet-m",
    name: "Cama Pet Acolchoada Média",
    description: "Cama confortável e acolchoada para pets. Tamanho M. Cobertura lavável.",
    price: 65.00,
    category: "caes",
    subcategory: "camas",
    tags: ["cama", "conforto", "dormir"],
  },
  {
    id: "cama-pet-g",
    name: "Cama Pet Acolchoada Grande",
    description: "Cama confortável e acolchoada para pets. Tamanho G. Para raças grandes.",
    price: 89.00,
    category: "caes",
    subcategory: "camas",
    tags: ["cama", "conforto", "dormir", "grande"],
  },

  // ===== COLEIRAS =====
  {
    id: "coleira-nylon-p",
    name: "Coleira Nylon Ajustável Pequena",
    description: "Coleira de nylon com fivela ajustável. Tamanho P. Cores variadas.",
    price: 12.50,
    category: "caes",
    subcategory: "coleiras",
    tags: ["coleira", "nylon", "ajustável"],
  },
  {
    id: "coleira-nylon-m",
    name: "Coleira Nylon Ajustável Média",
    description: "Coleira de nylon com fivela ajustável. Tamanho M. Cores variadas.",
    price: 15.90,
    category: "caes",
    subcategory: "coleiras",
    tags: ["coleira", "nylon", "ajustável"],
  },
  {
    id: "coleira-nylon-g",
    name: "Coleira Nylon Ajustável Grande",
    description: "Coleira de nylon com fivela ajustável. Tamanho G. Para raças grandes.",
    price: 19.90,
    category: "caes",
    subcategory: "coleiras",
    tags: ["coleira", "nylon", "ajustável", "grande"],
  },
  {
    id: "peitoral-p",
    name: "Peitoral para Cães Pequeno",
    description: "Peitoral confortável com regulagem. Tamanho P. Distribui a pressão no peito.",
    price: 28.90,
    category: "caes",
    subcategory: "coleiras",
    tags: ["peitoral", "passear"],
  },
  {
    id: "peitoral-m",
    name: "Peitoral para Cães Médio",
    description: "Peitoral confortável com regulagem. Tamanho M.",
    price: 35.90,
    category: "caes",
    subcategory: "coleiras",
    tags: ["peitoral", "passear"],
  },

  // ===== BRINQUEDOS =====
  {
    id: "brinq-corda",
    name: "Brinquedo de Corda para Cães",
    description: "Brinquedo de corda resistente para pets. Excelente para brincadeiras e interação.",
    price: 18.90,
    category: "caes",
    subcategory: "brinquedos",
    tags: ["brinquedo", "corda", "diversão"],
  },
  {
    id: "brinq-latex",
    name: "Brinquedo de Látex Mordedor",
    description: "Mordedor de látex atóxico para cães. Estimula o instinto natural de mastigar.",
    price: 14.90,
    category: "caes",
    subcategory: "brinquedos",
    tags: ["brinquedo", "mordedor", "látex"],
  },
  {
    id: "brinq-bola",
    name: "Bola para Cães",
    description: "Bola durável e colorida para brincadeiras. Material atóxico e resistente.",
    price: 12.90,
    category: "caes",
    subcategory: "brinquedos",
    tags: ["brinquedo", "bola", "diversão"],
  },

  // ===== GATOS =====
  {
    id: "areia-gatos-4kg",
    name: "Areia Sanitária para Gatos 4kg",
    description: "Areia granulada de alta absorção para caixa de areia. Neutraliza odores. Embalagem 4kg.",
    price: 22.90,
    category: "gatos",
    subcategory: "higiene",
    tags: ["areia", "caixa", "higiene"],
  },
  {
    id: "caixa-areia",
    name: "Caixa de Areia para Gatos",
    description: "Caixa de areia com proteção lateral. Fácil de limpar. Design que evita espalhamento.",
    price: 38.90,
    category: "gatos",
    subcategory: "higiene",
    tags: ["caixa de areia", "higiene", "gato"],
  },
  {
    id: "arranhador-torre",
    name: "Arranhador Torre para Gatos",
    description: "Torre arranhadora com múltiplos andares, tocas e plataformas. Sisal natural.",
    price: 119.90,
    category: "gatos",
    subcategory: "brinquedos",
    tags: ["arranhador", "torre", "gato"],
  },
  {
    id: "arranhador-simples",
    name: "Arranhador Simples Sisal",
    description: "Arranhador de sisal natural. Protege móveis e entretém o gato.",
    price: 45.90,
    category: "gatos",
    subcategory: "brinquedos",
    tags: ["arranhador", "sisal", "gato"],
  },
  {
    id: "comedouro-gato-duplo",
    name: "Comedouro Duplo para Gatos",
    description: "Comedouro duplo com dois compartimentos. Material premium, fácil higienização.",
    price: 28.90,
    category: "gatos",
    subcategory: "comedouros",
    tags: ["comedouro", "gato", "duplo"],
  },
  {
    id: "brinq-varinha",
    name: "Varinha Interativa para Gatos",
    description: "Varinha com pena e acessórios para estimular o instinto caçador do gato.",
    price: 19.90,
    category: "gatos",
    subcategory: "brinquedos",
    tags: ["brinquedo", "varinha", "gato"],
  },
  {
    id: "cama-gato",
    name: "Cama / Ninho para Gatos",
    description: "Cama redonda estilo ninho com bordas acolchoadas. Pelúcia macia e lavável.",
    price: 55.90,
    category: "gatos",
    subcategory: "camas",
    tags: ["cama", "ninho", "gato", "conforto"],
  },

  // ===== BANHO, TOSA & HIGIENE =====
  {
    id: "shampoo-caes",
    name: "Shampoo para Cães 500ml",
    description: "Shampoo neutro específico para cães. Fórmula suave que não resseca a pelagem.",
    price: 18.90,
    category: "banho-tosa-higiene",
    subcategory: "shampoos",
    tags: ["shampoo", "banho", "higiene"],
  },
  {
    id: "shampoo-gatos",
    name: "Shampoo para Gatos 500ml",
    description: "Shampoo específico para gatos. Fórmula delicada e segura.",
    price: 18.90,
    category: "banho-tosa-higiene",
    subcategory: "shampoos",
    tags: ["shampoo", "banho", "higiene", "gato"],
  },
  {
    id: "condicionador-pet",
    name: "Condicionador Pet 500ml",
    description: "Condicionador para pets. Hidrata e facilita o desembaraço da pelagem.",
    price: 22.90,
    category: "banho-tosa-higiene",
    subcategory: "shampoos",
    tags: ["condicionador", "banho", "higiene"],
  },
  {
    id: "perfume-colonia",
    name: "Colônia / Perfume Pet 100ml",
    description: "Perfume suave e agradável para pets. Fragrância duradoura e segura.",
    price: 25.90,
    category: "banho-tosa-higiene",
    subcategory: "perfumes",
    tags: ["perfume", "colônia", "higiene"],
  },
  {
    id: "escova-pelo",
    name: "Escova para Pelo de Pets",
    description: "Escova de cerdas macias para remoção de pelos soltos. Serve para cães e gatos.",
    price: 28.90,
    category: "banho-tosa-higiene",
    subcategory: "acessórios",
    tags: ["escova", "grooming", "pelo"],
  },
  {
    id: "tesoura-tosa",
    name: "Tesoura de Tosa Profissional",
    description: "Tesoura aço inox para tosa profissional. Lâminas afiadas e duráveis.",
    price: 45.90,
    category: "banho-tosa-higiene",
    subcategory: "tosa",
    tags: ["tesoura", "tosa", "profissional"],
  },
  {
    id: "maquina-tosa",
    name: "Máquina de Tosa Elétrica",
    description: "Máquina de tosa elétrica silenciosa e potente. Kit com pentes variados.",
    price: 189.90,
    category: "banho-tosa-higiene",
    subcategory: "tosa",
    tags: ["máquina de tosa", "elétrica", "grooming"],
  },
  {
    id: "soprador-kyklon",
    name: "Soprador Kyklon para Pets",
    description: "Soprador profissional de alta performance para secagem do pelo. Silencioso e eficiente.",
    price: 299.90,
    category: "banho-tosa-higiene",
    subcategory: "tosa",
    tags: ["soprador", "secador", "profissional", "tosa"],
  },
  {
    id: "lenco-umedecido",
    name: "Lenços Umedecidos Pet 50un",
    description: "Lenços umedecidos para limpeza rápida. Sem álcool, seguro para pets. 50 unidades.",
    price: 12.90,
    category: "banho-tosa-higiene",
    subcategory: "higiene",
    tags: ["lenço", "limpeza", "higiene"],
  },
  {
    id: "antipulgas-spray",
    name: "Antipulgas Spray 250ml",
    description: "Spray antipulgas e carrapatos de ação rápida. Proteção por até 30 dias.",
    price: 32.90,
    category: "banho-tosa-higiene",
    subcategory: "higiene",
    tags: ["antipulgas", "spray", "carrapatos"],
  },

  // ===== PETISCOS =====
  {
    id: "petisco-ossinho",
    name: "Ossinho Natural de Boi",
    description: "Ossinho natural de boi prensado. Rico em proteínas e entretenimento para cães.",
    price: 8.90,
    category: "petiscos",
    subcategory: "naturais",
    tags: ["petisco", "ossinho", "natural"],
  },
  {
    id: "petisco-bifinho",
    name: "Bifinho Carne 65g",
    description: "Bifinho macio sabor carne para cães. Rico em proteínas, irresistível!",
    price: 7.90,
    category: "petiscos",
    subcategory: "bifinho",
    tags: ["petisco", "bifinho", "carne"],
  },
  {
    id: "petisco-frango",
    name: "Jerky de Frango para Pets 100g",
    description: "Petisco de frango desidratado. Sabor natural, sem conservantes artificiais.",
    price: 12.90,
    category: "petiscos",
    subcategory: "naturais",
    tags: ["petisco", "frango", "natural"],
  },
  {
    id: "petisco-gato-sachê",
    name: "Petisco Sachê para Gatos 85g",
    description: "Sachê cremoso para gatos. Sabores variados: atum, frango e camarão.",
    price: 5.90,
    category: "petiscos",
    subcategory: "gatos",
    tags: ["petisco", "sachê", "gato"],
  },
  {
    id: "snack-dental",
    name: "Snack Dental para Cães",
    description: "Petisco funcional que reduz tártaro e cuida da saúde bucal do cão.",
    price: 9.90,
    category: "petiscos",
    subcategory: "dental",
    tags: ["petisco", "dental", "saúde bucal"],
  },
  {
    id: "finicat",
    name: "Ração Finicat para Gatos",
    description: "Ração completa e balanceada para gatos adultos. Alta palatabilidade.",
    price: 29.90,
    category: "petiscos",
    subcategory: "racao",
    tags: ["ração", "gato", "alimentação"],
  },

  // ===== ANIMAIS PEQUENOS =====
  {
    id: "caneca-alum-borboleta-p",
    name: "Caneca de Alumínio c/ Borboleta Pequena",
    description: "Caneca de alumínio com sistema de fixação borboleta para gaiola. Tamanho Pequeno.",
    price: 5.99,
    category: "animais-pequenos",
    subcategory: "comedouros",
    ref: "MS9083",
    tags: ["caneca", "alumínio", "pássaro", "gaiola"],
  },
  {
    id: "caneca-alum-borboleta-m",
    name: "Caneca de Alumínio c/ Borboleta Média",
    description: "Caneca de alumínio com sistema de fixação borboleta para gaiola. Tamanho Médio.",
    price: 7.60,
    category: "animais-pequenos",
    subcategory: "comedouros",
    ref: "MS9084",
    tags: ["caneca", "alumínio", "pássaro", "gaiola"],
  },
  {
    id: "caneca-alum-borboleta-g",
    name: "Caneca de Alumínio c/ Borboleta Grande",
    description: "Caneca de alumínio com sistema de fixação borboleta para gaiola. Tamanho Grande.",
    price: 9.40,
    category: "animais-pequenos",
    subcategory: "comedouros",
    ref: "MS9085",
    tags: ["caneca", "alumínio", "pássaro", "gaiola"],
  },
  {
    id: "banheira-alum-p",
    name: "Banheira de Alumínio Redonda Pequena",
    description: "Banheira de alumínio redonda para pássaros e animais pequenos. Tamanho Pequeno.",
    price: 4.60,
    category: "animais-pequenos",
    subcategory: "banho",
    ref: "MS9092",
    tags: ["banheira", "alumínio", "pássaro"],
  },
  {
    id: "banheira-alum-m",
    name: "Banheira de Alumínio Redonda Média",
    description: "Banheira de alumínio redonda para pássaros e animais pequenos. Tamanho Médio.",
    price: 5.20,
    category: "animais-pequenos",
    subcategory: "banho",
    ref: "MS9091",
    tags: ["banheira", "alumínio", "pássaro"],
  },
  {
    id: "banheira-alum-g",
    name: "Banheira de Alumínio Redonda Grande",
    description: "Banheira de alumínio redonda para pássaros e animais pequenos. Tamanho Grande.",
    price: 5.60,
    category: "animais-pequenos",
    subcategory: "banho",
    ref: "MS9090",
    tags: ["banheira", "alumínio", "pássaro"],
  },
  {
    id: "gaiola-passaro",
    name: "Gaiola para Pássaros Média",
    description: "Gaiola pintada para pássaros de médio porte. Arame galvanizado resistente.",
    price: 89.90,
    category: "animais-pequenos",
    subcategory: "gaiolas",
    tags: ["gaiola", "pássaro", "abrigo"],
  },
  {
    id: "hamster-gaiola",
    name: "Gaiola para Hamster com Acessórios",
    description: "Kit completo: gaiola, bebedouro, comedouro e roda de exercícios para hamster.",
    price: 65.90,
    category: "animais-pequenos",
    subcategory: "gaiolas",
    tags: ["hamster", "gaiola", "roedor"],
  },
  {
    id: "comida-passaro",
    name: "Alimento para Pássaros 500g",
    description: "Mix de sementes selecionadas para pássaros. Balanceado e nutritivo.",
    price: 12.90,
    category: "animais-pequenos",
    subcategory: "alimentos",
    tags: ["alimento", "pássaro", "sementes"],
  },

  // ===== VETERINÁRIO / SAÚDE =====
  {
    id: "vermifugo-caes",
    name: "Vermífugo para Cães (comprimido)",
    description: "Vermífugo de amplo espectro para cães. Combate vermes intestinais. Consulte o veterinário.",
    price: 18.90,
    category: "vet",
    subcategory: "medicamentos",
    tags: ["vermífugo", "saúde", "veterinário"],
  },
  {
    id: "vermifugo-gatos",
    name: "Vermífugo para Gatos (comprimido)",
    description: "Vermífugo específico para gatos. Combate vermes intestinais. Consulte o veterinário.",
    price: 18.90,
    category: "vet",
    subcategory: "medicamentos",
    tags: ["vermífugo", "saúde", "veterinário", "gato"],
  },
  {
    id: "antipulgas-pipeta",
    name: "Antipulgas Pipeta (pipeta)",
    description: "Pipeta antipulgas de aplicação tópica. Proteção duradoura contra pulgas e carrapatos.",
    price: 28.90,
    category: "vet",
    subcategory: "medicamentos",
    tags: ["antipulgas", "pipeta", "saúde"],
  },
  {
    id: "suplemento-articular",
    name: "Suplemento Articular para Pets",
    description: "Suplemento com glucosamina e condroitina para saúde articular dos pets.",
    price: 55.90,
    category: "vet",
    subcategory: "suplementos",
    tags: ["suplemento", "articular", "saúde"],
  },
  {
    id: "colar-elizabetano",
    name: "Colar Elizabetano Plástico P",
    description: "Colar elizabetano transparente para proteção pós-cirúrgica. Tamanho P.",
    price: 15.90,
    category: "vet",
    subcategory: "pós-cirúrgico",
    tags: ["colar", "elizabetano", "pós-cirúrgico"],
  },
  {
    id: "seringa-oral",
    name: "Seringa para Medicamento Oral 10ml",
    description: "Seringa graduada para administração de medicamentos líquidos. Bico oral.",
    price: 6.90,
    category: "vet",
    subcategory: "acessórios",
    tags: ["seringa", "medicamento", "saúde"],
  },
];

// ── Image map: product.id → extracted individual image ──
const IMAGE_MAP: Record<string, string> = {
  // Comedouros/Bebedouros
  "bq01": "/products/comedouro-antiformiga-350ml.jpg",
  "bq02": "/products/comedouro-antiformiga-350ml.jpg", // reuso
  "bq03": "/products/comedouro-antiformiga-350ml.jpg", // reuso
  "ms1637": "/products/com-aluminio-grande-2300ml.jpg",
  "ms1638": "/products/com-aluminio-grande-2300ml.jpg",
  "beb-portatil": "/products/bebedouro-automatico.jpg",
  "bebedouro-fonte": "/products/bebedouro-fonte.jpg",
  "comedouro-gato-duplo": "/products/comedouro-antiformiga-350ml.jpg", // fallback
  
  // Guias
  "jp0361-a": "/products/guia-corda-amortecedor.jpg",
  "jp0327": "/products/guia-corda-amortecedor.jpg",
  "jp0328": "/products/guia-corda-amortecedor.jpg",
  "jp0378": "/products/guia-adestramento.jpg",
  "rt2270": "/products/guia-nylon.jpg",
  
  // Gatos / Arranhadores
  "arranhador-torre": "/products/arranhador-torre-gatos.jpg",
  "arranhador-simples": "/products/arranhador-simples-sisal.jpg",
  "cama-gato": "/products/cama-ninho-gatos.jpg",
  
  // Higiene / Banho e Tosa
  "shampoo-caes": "/products/shampoo-caes.jpg",
  "shampoo-gatos": "/products/shampoo-gatos.jpg",
  "condicionador-pet": "/products/condicionador-pet.jpg",
  "perfume-colonia": "/products/perfume-colonia.jpg",
  "antipulgas-spray": "/products/antipulgas-spray.jpg",
  "lenco-umedecido": "/products/lenco-umedecido.jpg",
  "tesoura-tosa": "/products/tesoura-tosa.jpg",
  "maquina-tosa": "/products/maquina-tosa.jpg",
  "soprador-kyklon": "/products/maquina-tosa.jpg", // fallback
  "escova-pelo": "/products/tesoura-tosa.jpg", // fallback
  
  // Petiscos / Ração
  "petisco-ossinho": "/products/petisco-ossinho-natural.jpg",
  "petisco-bifinho": "/products/bifinho-carne.jpg",
  "petisco-frango": "/products/bifinho-carne.jpg", // fallback
  "petisco-gato-sachê": "/products/racao-gatos.jpg", // fallback
  "snack-dental": "/products/petisco-ossinho-natural.jpg", // fallback
  "finicat": "/products/racao-gatos.jpg",
  
  // Animais Pequenos
  "gaiola-passaro": "/products/gaiola-passaro.jpg",
  "hamster-gaiola": "/products/hamster-gaiola.jpg",
  "caneca-alum-borboleta-p": "/products/caneca-alum-borboleta-p.jpg",
  "caneca-alum-borboleta-m": "/products/caneca-alum-borboleta-m.jpg",
  "caneca-alum-borboleta-g": "/products/caneca-alum-borboleta-g.jpg",
  "banheira-alum-p": "/products/banheira-alum-p.jpg",
  "banheira-alum-m": "/products/banheira-alum-m.jpg",
  "banheira-alum-g": "/products/banheira-alum-g.jpg",
  "comida-passaro": "/products/petisco-ossinho-natural.jpg", // fallback
  
  // Veterinário
  "vermifugo-caes": "/products/vermifugo-caes.jpg",
  "vermifugo-gatos": "/products/vermifugo-gatos.jpg",
  "antipulgas-pipeta": "/products/antipulgas-pipeta.jpg",
  "suplemento-articular": "/products/suplemento-articular.jpg",
  "colar-elizabetano": "/products/suplemento-articular.jpg", // fallback
  "seringa-oral": "/products/vermifugo-caes.jpg", // fallback
};

export function getProductImage(product: Product): string | undefined {
  if (product.image) return product.image;
  // Prioriza a imagem exata do ID do produto
  if (IMAGE_MAP[product.id]) return IMAGE_MAP[product.id];
  // Se não tiver exata, retorna uma genérica da categoria baseada nos primeiros itens mapeados
  const categoryFallback = Object.entries(IMAGE_MAP).find(([id, path]) => 
    products.find(p => p.id === id)?.category === product.category
  );
  return categoryFallback ? categoryFallback[1] : undefined;
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
  );
}

export function getPromoProducts(): Product[] {
  return products.filter((p) => p.isPromo);
}
