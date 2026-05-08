"use client";

import { useCart } from "@/lib/cart-context";
import { Product, getProductImage } from "@/lib/products";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const categoryEmojis: Record<string, string> = {
  "caes": "🐕",
  "gatos": "🐈",
  "banho-tosa-higiene": "🛁",
  "petiscos": "🦴",
  "animais-pequenos": "🐹",
  "vet": "⚕️",
};

const categoryColors: Record<string, string> = {
  "caes": "from-yellow-50 to-amber-100",
  "gatos": "from-blue-50 to-sky-100",
  "banho-tosa-higiene": "from-teal-50 to-cyan-100",
  "petiscos": "from-orange-50 to-amber-100",
  "animais-pequenos": "from-purple-50 to-violet-100",
  "vet": "from-green-50 to-emerald-100",
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgSrc = getProductImage(product);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const bgClass = categoryColors[product.category] ?? "from-gray-50 to-gray-100";

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 hover:-translate-y-1">
      {/* Promo Badge */}
      {product.isPromo && discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          -{discount}%
        </div>
      )}

      {/* Image area */}
      <div className={`relative h-44 bg-gradient-to-br ${bgClass} flex items-center justify-center overflow-hidden`}>
        {imgSrc && !imgError ? (
          <>
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
            {/* subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        ) : (
          // Fallback emoji
          <span className="text-6xl opacity-60 group-hover:scale-110 transition-transform duration-300 select-none">
            {categoryEmojis[product.category] || "🐾"}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category tag */}
        {product.subcategory && (
          <span className="text-xs text-[#89C4CF] font-medium uppercase tracking-wide mb-1">
            {product.subcategory}
          </span>
        )}

        <h3 className="font-semibold text-[#1B2A4A] text-sm leading-snug mb-1 line-clamp-2 flex-1">
          {product.name}
        </h3>

        {product.ref && (
          <p className="text-xs text-gray-400 mb-2">REF: {product.ref}</p>
        )}

        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-3">
          {product.originalPrice && (
            <p className="text-xs text-gray-400 line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </p>
          )}
          <p className="text-xl font-bold text-[#1B2A4A]">
            R${" "}
            <span className={product.isPromo ? "text-red-500" : ""}>
              {product.price.toFixed(2).replace(".", ",")}
            </span>
          </p>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAdd}
          id={`add-to-cart-${product.id}`}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            added
              ? "bg-green-500 text-white scale-95"
              : "bg-[#F5C800] text-[#1B2A4A] hover:bg-yellow-400 active:scale-95"
          }`}
        >
          {added ? (
            <>
              <Check size={16} />
              Adicionado!
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              Adicionar ao Orçamento
            </>
          )}
        </button>
      </div>
    </div>
  );
}
