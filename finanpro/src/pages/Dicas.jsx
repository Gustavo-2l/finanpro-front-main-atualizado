import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ChevronLeft, ChevronRight, Lightbulb, Sparkles, PiggyBank, Wallet, Coins } from "lucide-react";

export const Dicas = () => {
  const todasDicas = [
    "Registre todos os gastos do dia, mesmo os pequenos.",
    "Evite compras por impulso — espere 48h antes de decidir.",
    "Defina uma meta financeira semanal simples (ex: guardar R$ 10).",
    "Separe 10% de qualquer valor que receber.",
    "Use cartões de crédito só se puder pagar tudo no mês.",
    "Evite parcelamentos longos; eles viram armadilhas.",
    "Crie um fundo de emergência começando com R$ 2 por dia.",
    "Corte gastos invisíveis: taxas, apps, delivery.",
    "Use o método 50/30/20 para organizar seu dinheiro.",
    "Venda algo que você não usa mais e guarde o dinheiro.",
    "Faça uma lista antes de comprar qualquer coisa.",
  ];

  const [dicasDoDia, setDicasDoDia] = useState([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const seed = new Date().getDate();
    const dicasGeradas = [];

    for (let i = 0; i < 3; i++) {
      const pos = (seed + i * 3) % todasDicas.length;
      dicasGeradas.push(todasDicas[pos]);
    }

    setDicasDoDia(dicasGeradas);
  }, []);

  const trocarDica = (novoIndex) => {
    setFade(false);
    setTimeout(() => {
      setIndex(novoIndex);
      setFade(true);
    }, 230);
  };

  const proxima = () => trocarDica((index + 1) % dicasDoDia.length);
  const anterior = () => trocarDica((index - 1 + dicasDoDia.length) % dicasDoDia.length);

  useEffect(() => {
    const timer = setInterval(() => {
      proxima();
    }, 3500);
    return () => clearInterval(timer);
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 animate-gradient-smooth">
      <Sidebar />

      <div className="flex-1 flex flex-col items-center p-10 relative">
        {/* Figurinhas animadas */}
        <div className="absolute top-14 right-14 animate-pulse">
   
        </div>
        <div className="absolute bottom-20 left-20 animate-spin-slow">
          
        </div>

        <h1 className="text-5xl font-extrabold text-yellow-900 mb-10 flex items-center gap-3 drop-shadow-lg">
          <Lightbulb className="text-yellow-900 drop-shadow-xl" /> DICAS DO DIA
        </h1>

        {/* CARD PRINCIPAL */}
        <div
          className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-10 relative border border-yellow-300 transition-all duration-300 hover:scale-[1.02] backdrop-blur-xl"
          style={{ height: "260px" }}
        >
          <div className={`transition-all duration-300 ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}> 
            <div className="flex flex-col items-center">
              <Lightbulb className="w-14 h-14 text-yellow-500 mb-4 animate-bounce" />

              <span className="text-sm bg-yellow-200 text-yellow-700 px-4 py-1 rounded-full font-medium mb-2 shadow-sm">
                Atualiza todos os dias ✨
              </span>

              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Dica {index + 1} de {dicasDoDia.length}
              </h2>

              <p className="text-xl text-gray-600 text-center px-4 leading-relaxed">
                {dicasDoDia[index]}
              </p>
            </div>
          </div>

          {/* Botões */}
          <button
            onClick={anterior}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-yellow-300 hover:bg-yellow-400 p-3 rounded-full shadow-md transition-all hover:scale-110">
            <ChevronLeft className="text-yellow-800" />
          </button>

          <button
            onClick={proxima}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-300 hover:bg-yellow-400 p-3 rounded-full shadow-md transition-all hover:scale-110">
            <ChevronRight className="text-yellow-800" />
          </button>
        </div>

        {/* SUBTEXTO */}
        <p className="mt-6 text-gray-700 text-lg flex items-center gap-2 font-medium">
           Dicas reais, simples e que realmente ajudam no seu dia a dia!
        </p>

        {/* --- CARDS ORGANIZADOS COM FIGURINHAS --- */}
        <div className="mt-16 w-full max-w-6xl">
          <div className="text-center text-yellow-800 font-bold text-3xl mb-10 tracking-wide">
            Dicas que realmente ajudam ✨
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-yellow-200 hover:shadow-2xl hover:scale-[1.03] transition-all group cursor-pointer">
              <div className="flex justify-center mb-3">
                <PiggyBank className="text-yellow-500 w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-700 mb-2 text-center group-hover:underline">
                Criar seu Cofrinho
              </h3>
              <p className="text-gray-600 text-center group-hover:text-gray-800">
                Comece guardando só R$ 2 por dia. Parece pouco, mas no fim do mês vira muito!
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-yellow-200 hover:shadow-2xl hover:scale-[1.03] transition-all group cursor-pointer">
              <div className="flex justify-center mb-3">
                <Wallet className="text-yellow-500 w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-700 mb-2 text-center group-hover:underline">
                Controle Simples
              </h3>
              <p className="text-gray-600 text-center group-hover:text-gray-800">
                Anote o que gastar: lanche, Uber, app, tudo! Isso muda completamente sua visão.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-yellow-200 hover:shadow-2xl hover:scale-[1.03] transition-all group cursor-pointer">
              <div className="flex justify-center mb-3">
                <Coins className="text-yellow-500 w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-700 mb-2 text-center group-hover:underline">
                Corte Invisíveis
              </h3>
              <p className="text-gray-600 text-center group-hover:text-gray-800">
                Pequenas taxas e gastos escondidos consomem seu dinheiro sem você perceber.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};