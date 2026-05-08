"use client";

import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onSearch: (q: string) => void;
  searchQuery: string;
}

export function Header({ onSearch, searchQuery }: HeaderProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#1B2A4A] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative">
              {/* fsPet logo recreation */}
              <div className="bg-[#F5C800] rounded-xl px-3 py-1.5 flex items-center gap-1">
                <span className="text-[#1B2A4A] font-black text-xl tracking-tight leading-none">fs</span>
                <div className="flex flex-col leading-none">
                  <span className="text-[#1B2A4A] font-black text-xl tracking-tight">pet</span>
                </div>
                <span className="text-[#1B2A4A] text-[8px] font-bold ml-0.5 self-end mb-0.5">®</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">FS PET</p>
              <p className="text-[#F5C800] text-xs">Distribuidora</p>
            </div>
          </div>

          {/* Search Bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-xl border border-white/20 focus:outline-none focus:border-[#F5C800] focus:bg-white/15 transition-all text-sm"
                id="search-input"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden text-white p-2 hover:text-[#F5C800] transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              id="open-cart"
              className="relative bg-[#F5C800] text-[#1B2A4A] rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-yellow-400 active:scale-95 transition-all font-semibold text-sm"
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Orçamento</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-gray-400 pl-9 pr-4 py-2 rounded-xl border border-white/20 focus:outline-none focus:border-[#F5C800] text-sm"
                autoFocus
                id="search-mobile"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
