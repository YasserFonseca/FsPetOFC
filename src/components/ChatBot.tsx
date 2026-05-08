"use client";

import React, { useState } from "react";
import { MessageCircle, X, ChevronDown, ChevronUp, Bot } from "lucide-react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const FAQ: Record<string, string> = {
  "horário": "🕐 Nosso horário de atendimento é de segunda a sexta, das 8h às 18h, e aos sábados das 8h às 12h.",
  "entrega": "🚚 Realizamos entregas em toda a região. Consulte-nos pelo WhatsApp para saber o prazo e valor do frete para sua localidade.",
  "frete": "🚚 O frete é calculado de acordo com a sua localização. Entre em contato pelo WhatsApp para um orçamento completo com frete.",
  "pagamento": "💳 Aceitamos pagamento via PIX, boleto bancário e cartão de crédito/débito (mediante consulta). Pagamentos são negociados pelo WhatsApp.",
  "pix": "💳 Aceitamos pagamento via PIX! Ao finalizar seu orçamento pelo WhatsApp, te passamos a chave PIX.",
  "whatsapp": "📱 Nosso WhatsApp é o canal principal de atendimento e vendas. Clique no botão 'Solicitar Orçamento' em qualquer produto para nos chamar!",
  "promoção": "🏷️ Sim! Temos promoções especiais com preços diferenciados. Veja a seção 'Promoções' no topo da página ou filtre por promoções no catálogo.",
  "desconto": "🏷️ Para compras em volume, podemos negociar descontos especiais. Entre em contato pelo WhatsApp para saber mais!",
  "petisco": "🦴 Trabalhamos com diversas marcas de petiscos naturais e industriais. Acesse a categoria 'Petiscos' para ver todas as opções.",
  "ração": "🍖 Temos rações para cães e gatos. Verifique nossa categoria 'Petiscos' ou nos consulte pelo WhatsApp para marcas específicas.",
  "banho": "🛁 Na categoria 'Banho, Tosa & Higiene' você encontra shampoos, condicionadores, perfumes e acessórios profissionais de grooming.",
  "tosa": "✂️ Temos maquinas de tosa, tesouras e sopradoras profissionais. Acesse a categoria 'Banho, Tosa & Higiene'.",
  "gato": "🐈 Temos uma ampla seleção de produtos para gatos: arranhadores, comedouros, brinquedos e muito mais na categoria 'Gatos'!",
  "cachorro": "🐕 Para cães, temos coleiras, guias, comedouros, camas, brinquedos e muito mais! Veja a categoria 'Cães'.",
  "pássaro": "🐦 Para pássaros e aves, temos canecas de alumínio, banheiras e gaiolas na categoria 'Animais Pequenos'.",
  "hamster": "🐹 Temos gaiolas e acessórios para hamsters e roedores! Confira a categoria 'Animais Pequenos'.",
  "veterinário": "⚕️ Nossa categoria 'Veterinário' tem itens como vermífugos, antipulgas e suplementos. Sempre consulte um médico veterinário.",
  "ola": "👋 Olá! Sou o assistente virtual da FS PET. Como posso ajudar? Você pode perguntar sobre: horários, entregas, pagamento, produtos, promoções e muito mais!",
  "olá": "👋 Olá! Sou o assistente virtual da FS PET. Como posso ajudar? Você pode perguntar sobre: horários, entregas, pagamento, produtos, promoções e muito mais!",
  "oi": "👋 Olá! Sou o assistente virtual da FS PET. Em que posso ajudar você hoje?",
  "ajuda": "🆘 Posso ajudar com informações sobre: horários, entregas, formas de pagamento, produtos, promoções e categorias. O que deseja saber?",
  "obrigado": "😊 De nada! Fico feliz em ajudar. Se precisar de mais alguma coisa, é só perguntar! 🐾",
  "obrigada": "😊 De nada! Fico feliz em ajudar. Se precisar de mais alguma coisa, é só perguntar! 🐾",
  "contato": "📱 O melhor jeito de nos contatar é pelo WhatsApp! Clique em 'Solicitar Orçamento' em qualquer produto ou nos envie uma mensagem diretamente.",
  "localização": "📍 Somos uma distribuidora com atendimento online. Entre em contato pelo WhatsApp para mais informações sobre retirada no local.",
  "endereço": "📍 Atendemos de forma online com entregas. Para informações sobre retirada, entre em contato pelo WhatsApp.",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  
  for (const [key, response] of Object.entries(FAQ)) {
    if (lower.includes(key)) {
      return response;
    }
  }

  return "🤔 Não tenho certeza sobre isso ainda. Para informações detalhadas, te convido a entrar em contato pelo nosso WhatsApp onde nossa equipe vai te atender! Posso ajudar com: horários, entregas, pagamento, produtos e promoções.";
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "👋 Olá! Sou o assistente da FS PET. Posso ajudar com informações sobre horários, entregas, pagamentos e produtos. Como posso ajudar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    const botMsg: Message = { role: "bot", text: getBotResponse(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); }}
        className="fixed bottom-6 right-6 z-50 bg-[#F5C800] text-[#1B2A4A] rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200"
        aria-label="Abrir chat de assistência"
        id="chatbot-toggle"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col" style={{ maxHeight: isMinimized ? "56px" : "480px" }}>
          {/* Header */}
          <div className="bg-[#1B2A4A] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-[#F5C800]" />
              <div>
                <p className="font-semibold text-sm">Assistente FS PET</p>
                <p className="text-xs text-green-400">● Online</p>
              </div>
            </div>
            <button onClick={() => setIsMinimized(!isMinimized)} className="text-gray-300 hover:text-white">
              {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#1B2A4A] text-white rounded-br-sm"
                          : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t bg-white flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Escreva sua pergunta..."
                  className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-[#F5C800] focus:ring-1 focus:ring-[#F5C800]"
                  id="chatbot-input"
                />
                <button
                  onClick={sendMessage}
                  className="bg-[#F5C800] text-[#1B2A4A] rounded-full w-9 h-9 flex items-center justify-center hover:bg-yellow-400 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
