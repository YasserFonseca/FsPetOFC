"use client";

import { useCart } from "@/lib/cart-context";
import { getProductImage } from "@/lib/products";
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import Image from "next/image";

const categoryEmojis: Record<string, string> = {
  caes: "🐕",
  gatos: "🐈",
  "banho-tosa-higiene": "🛁",
  petiscos: "🦴",
  "animais-pequenos": "🐹",
  vet: "⚕️",
};

export function Cart() {
  const {
    items, removeItem, updateQuantity,
    totalItems, totalPrice, sendToWhatsApp,
    isCartOpen, setIsCartOpen, clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="bg-[#1B2A4A] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-[#F5C800]" />
            <div>
              <h2 className="font-bold text-lg">Orçamento</h2>
              <p className="text-xs text-gray-300">
                {totalItems} {totalItems === 1 ? "item" : "itens"} selecionado{totalItems !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-300 hover:text-white transition-colors"
            id="close-cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-medium">Seu orçamento está vazio</p>
              <p className="text-sm mt-1">Adicione produtos do catálogo</p>
            </div>
          ) : (
            items.map((item) => {
              const imgSrc = getProductImage(item.product);
              return (
                <div
                  key={item.product.id}
                  className="bg-gray-50 rounded-xl p-3 flex gap-3 items-start border border-gray-100"
                >
                  {/* Product image */}
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-100 shadow-sm">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={item.product.name}
                        width={64}
                        height={64}
                        className="object-contain w-full h-full p-1"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : (
                      <span className="text-2xl">
                        {categoryEmojis[item.product.category] ?? "🐾"}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1B2A4A] text-sm leading-tight line-clamp-2">
                      {item.product.name}
                    </p>
                    {item.product.ref && (
                      <p className="text-xs text-gray-400 mt-0.5">REF: {item.product.ref}</p>
                    )}
                    <p className="text-[#1B2A4A] font-bold text-sm mt-1">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#1B2A4A] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-semibold text-[#1B2A4A] w-5 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#1B2A4A] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 mt-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-3 bg-white">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Subtotal estimado:</span>
              <span className="font-bold text-[#1B2A4A] text-lg">
                R$ {totalPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <p className="text-xs text-gray-400 text-center">
              * Os preços são estimativas. O valor final será confirmado pelo WhatsApp.
            </p>
            <button
              onClick={sendToWhatsApp}
              id="send-whatsapp"
              className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-sm"
            >
              <MessageCircle size={20} />
              Solicitar Orçamento via WhatsApp
            </button>
            <button
              onClick={clearCart}
              className="w-full text-gray-400 hover:text-red-400 text-xs py-1 transition-colors"
            >
              Limpar orçamento
            </button>
          </div>
        )}
      </div>
    </>
  );
}
