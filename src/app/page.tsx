"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { ChatBot } from "@/components/ChatBot";
import {
  products,
  categories,
  getProductsByCategory,
  searchProducts,
  getPromoProducts,
} from "@/lib/products";
import { Tag, Star, ChevronRight, MapPin } from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPromoOnly, setShowPromoOnly] = useState(false);

  const displayedProducts = useMemo(() => {
    if (searchQuery.trim()) {
      return searchProducts(searchQuery);
    }
    if (showPromoOnly) {
      return getPromoProducts();
    }
    if (selectedCategory === "todos") {
      return products;
    }
    return getProductsByCategory(selectedCategory);
  }, [selectedCategory, searchQuery, showPromoOnly]);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q) {
      setSelectedCategory("todos");
      setShowPromoOnly(false);
    }
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setSearchQuery("");
    setShowPromoOnly(false);
  };

  const handlePromoToggle = () => {
    setShowPromoOnly(!showPromoOnly);
    setSelectedCategory("todos");
    setSearchQuery("");
  };

  return (
    <main className="min-h-screen">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      <Cart />
      <ChatBot />

      {/* ========== HERO SECTION ========== */}
      <section className="relative bg-[#1B2A4A] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F5C800]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-72 h-72 bg-[#89C4CF]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #F5C800 1px, transparent 0)",
              backgroundSize: "40px 40px"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#F5C800]/20 text-[#F5C800] text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-[#F5C800]/30">
              <Star size={14} fill="currentColor" />
              Catálogo de Produtos 2026
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
              Tudo para o seu{" "}
              <span className="hero-title">pet favorito</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Somos distribuidores de produtos para animais de estimação. Escolha os produtos, monte seu orçamento e nos chame pelo WhatsApp!
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-[#F5C800] text-[#1B2A4A] font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all flex items-center gap-2"
                id="ver-catalogo-btn"
              >
                Ver Catálogo Completo
                <ChevronRight size={18} />
              </button>
              <button
                onClick={handlePromoToggle}
                className="border-2 border-[#F5C800]/50 text-[#F5C800] font-semibold px-6 py-3 rounded-xl hover:bg-[#F5C800]/10 transition-all flex items-center gap-2"
                id="ver-promocoes-btn"
              >
                <Tag size={16} />
                Ver Promoções
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
            {[
              { value: "60+", label: "Produtos" },
              { value: "6", label: "Categorias" },
              { value: "100%", label: "Via WhatsApp" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 rounded-2xl p-4 text-center border border-white/10">
                <p className="text-2xl font-black text-[#F5C800]">{stat.value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#F8F9FB"/>
          </svg>
        </div>
      </section>

      {/* ========== CATEGORY BANNERS ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-4">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              id={`cat-${cat.id}`}
              className={`category-pill flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                selectedCategory === cat.id && !showPromoOnly && !searchQuery
                  ? "border-[#F5C800] bg-[#F5C800]/10 active shadow-lg"
                  : "border-transparent bg-white hover:border-gray-200 shadow-sm"
              }`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs font-semibold text-[#1B2A4A] text-center leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ========== CATALOG SECTION ========== */}
      <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-[#1B2A4A]">
              {searchQuery
                ? `Resultados para "${searchQuery}"`
                : showPromoOnly
                ? "🏷️ Promoções Especiais"
                : selectedCategory === "todos"
                ? "Catálogo por Categoria"
                : categories.find((c) => c.id === selectedCategory)?.name ?? "Produtos"}
            </h2>
            <p className="text-gray-400 text-sm mt-0.5">
              {selectedCategory === "todos" && !showPromoOnly && !searchQuery
                ? `${categories.length} categorias • ${products.length} produtos no total`
                : `${displayedProducts.length} produto${displayedProducts.length !== 1 ? "s" : ""} encontrado${displayedProducts.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategorySelect("todos")}
              className={`text-sm px-4 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === "todos" && !showPromoOnly && !searchQuery
                  ? "bg-[#1B2A4A] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
              id="filter-todos"
            >
              Início
            </button>
            <button
              onClick={handlePromoToggle}
              className={`text-sm px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                showPromoOnly
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
              id="filter-promo"
            >
              <Tag size={14} />
              Promoções
            </button>
          </div>
        </div>

        {/* ── VIEW 1: Página inicial — seções por categoria ── */}
        {selectedCategory === "todos" && !showPromoOnly && !searchQuery ? (
          <div className="space-y-12">
            {categories.map((cat) => {
              const catProducts = getProductsByCategory(cat.id);
              if (catProducts.length === 0) return null;
              const preview = catProducts.slice(0, 4);
              return (
                <div key={cat.id} id={`section-${cat.id}`}>
                  {/* Category header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
                        style={{ backgroundColor: (cat as any).color + "33" }}
                      >
                        {cat.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-[#1B2A4A]">{cat.name}</h3>
                        <p className="text-xs text-gray-400">{catProducts.length} produtos</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCategorySelect(cat.id)}
                      id={`ver-todos-${cat.id}`}
                      className="group flex items-center gap-1.5 text-sm font-semibold text-[#1B2A4A] border border-[#1B2A4A]/20 px-4 py-2 rounded-xl transition-all bg-white hover:bg-[#1B2A4A] hover:text-white hover:border-[#1B2A4A]"
                    >
                      Ver todos
                      <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  {/* Divider line with color accent */}
                  <div className="w-full h-px mb-5" style={{ background: `linear-gradient(to right, ${(cat as any).color}, transparent)` }} />

                  {/* Product row – 4 cards preview */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {preview.map((product, i) => (
                      <div
                        key={product.id}
                        className="animate-fade-up"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>

                  {/* "Ver mais" strip if category has more than 4 products */}
                  {catProducts.length > 4 && (
                    <button
                      onClick={() => handleCategorySelect(cat.id)}
                      className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-[#F5C800] hover:text-[#1B2A4A] hover:bg-[#F5C800]/5 transition-all text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <span>+{catProducts.length - 4} mais produtos em {cat.name}</span>
                      <ChevronRight size={15} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* ── VIEW 2: Categoria específica / busca / promoções ── */
          <>
            {/* Back button */}
            {!searchQuery && (
              <button
                onClick={() => handleCategorySelect("todos")}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1B2A4A] mb-5 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Voltar ao catálogo
              </button>
            )}

            {displayedProducts.length > 0 ? (
              <div className="product-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {displayedProducts.map((product, i) => (
                  <div key={product.id} className="product-card animate-fade-up" style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400">
                <span className="text-6xl block mb-4">🔍</span>
                <p className="font-semibold text-lg text-gray-600">Nenhum produto encontrado</p>
                <p className="text-sm mt-1">Tente buscar por outro termo ou categoria</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("todos"); }}
                  className="mt-4 text-[#1B2A4A] font-semibold underline text-sm"
                >
                  Ver todos os produtos
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ========== CTA WHATSAPP ========== */}
      <section className="bg-green-500 py-12 mt-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-black text-white mb-3">
            Pronto para fazer seu pedido?
          </h2>
          <p className="text-green-100 text-lg mb-6 max-w-xl mx-auto">
            Monte seu orçamento no catálogo e envie direto pelo WhatsApp. Nossa equipe confirma disponibilidade e valores rapidinho!
          </p>
          <a
            href={`https://wa.me/5551999999999?text=${encodeURIComponent("Olá! Vim pelo catálogo online da FS PET e gostaria de mais informações.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-8 py-4 rounded-2xl text-lg hover:bg-green-50 active:scale-95 transition-all wa-pulse"
            id="whatsapp-cta"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar pelo WhatsApp
          </a>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-[#1B2A4A] text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="bg-[#F5C800] rounded-xl px-4 py-2 inline-flex items-center gap-1 mb-3">
                <span className="text-[#1B2A4A] font-black text-2xl">fs</span>
                <span className="text-[#1B2A4A] font-black text-2xl">pet</span>
                <span className="text-[#1B2A4A] text-[9px] font-bold ml-0.5 self-end mb-1">®</span>
              </div>
              <p className="text-sm leading-relaxed">
                Transformando a distribuição de produtos pet através de uma presença digital profissional e organizada.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Categorias</h3>
              <ul className="space-y-2 text-sm">
                {categories.map((c) => (
                  <li key={c.id}>
                    <span className="mr-1">{c.icon}</span> {c.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Contato</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp (atualizar número)
                </li>
                <li className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F472B6" strokeWidth="2" className="w-[18px] h-[18px]">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="#F472B6"/>
                  </svg>
                  @fspet.distribuidora
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={18} className="text-red-400" />
                  Região Sul — RS
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center text-xs">
            <p>© 2026 FS PET Distribuidora. Todos os direitos reservados.</p>
            <p className="mt-1 text-gray-600">
              Desenvolvido pela equipe InovaTech — Catálogo v2.9
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
