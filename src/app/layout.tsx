import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FS PET Distribuidora | Catálogo de Produtos 2026",
  description:
    "Catálogo online da FS PET Distribuidora. Encontre produtos para cães, gatos, aves e animais pequenos. Faça seu orçamento e solicite pelo WhatsApp!",
  keywords: "fspet, pet shop, distribuidora pet, produtos para animais, cães, gatos, petiscos, banho tosa",
  openGraph: {
    title: "FS PET Distribuidora | Catálogo de Produtos 2026",
    description: "Catálogo completo de produtos para pets. Faça seu orçamento online!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-gray-50 antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
