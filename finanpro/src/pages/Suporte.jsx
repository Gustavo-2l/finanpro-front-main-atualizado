import React, { useState, useEffect } from "react";
import mulher2 from "../assets/mulher2.png";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // ← IMPORTANTE
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

const perguntas = [
  {
    pergunta: "Qual o melhor investimento para iniciantes?",
    resposta:
      "Para iniciantes, recomendamos começar guardando pouco dinheiro e investir em pequenas metas mensais ex: usando o nosso calendário mensal.",
  },
  {
    pergunta: "Como investir com pouco dinheiro?",
    resposta:
      "Comece com o que você tem! Você não precisa de muito — dá pra começar com R$10, R$20 ou R$50 por mês. O mais importante é criar o hábito de investir regularmente.",
  },
  {
    pergunta: "Como funciona o calendário?",
    resposta:
      "Nosso calendário permite que o usuário defina por conta própria os dias do mês que ele investiu, podendo marcar em nosso calendário.",
  },
  {
    pergunta: "Como funciona o cofre disponível no site?",
    resposta:
      "O cofre do nosso site serve para guardar o valor que você deseja separar para suas metas. Ele não tem contato direto com o seu banco, mas você pode inserir a quantia manualmente e a FinanPro te ajuda a acompanhar.",
  },
];

function Suporte() {
  const [openIndex, setOpenIndex] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [showContato, setShowContato] = useState(false);
  const fullText = "ESTÁ COM ALGUMA DÚVIDA?";

  const navigate = useNavigate(); // ← CRIANDO O NAVEGATE

  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(typing);
    }, 100);
    return () => clearInterval(typing);
  }, []);

  const toggleResposta = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 overflow-hidden">
      <Navbar />

      <main className="flex flex-col md:flex-row items-center justify-center px-9 py-12 gap-12">

        {/* Lado esquerdo */}
        <div className="flex-1 flex justify-center items-end animate-fade-in-up overflow-hidden">
          <img
            src={mulher2}
            alt="Pessoa pensando"
            className="w-auto max-w-none h-full object-contain drop-shadow-2xl -translate-y-6"
          />
        </div>

        {/* Lado direito */}
        <div className="flex-1 flex flex-col items-start space-y-10 animate-fade-in-up mt-12">

          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-snug h-[120px]">
            <span className="border-r-4 border-gray-800 pr-1 animate-cursor">
              {typedText}
            </span>
          </h1>

          {/* Parágrafo */}
          <p className="text-gray-700 text-lg bg-white/70 p-4 rounded-xl shadow-md">
            Aqui estão as perguntas mais frequentes sobre a FinanPro. 
            Clique em uma delas para ver a resposta ou use uma das opções abaixo!
          </p>

          {/* CARDS DE AÇÃO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">

            {/* IA */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all cursor-pointer">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">💬 Conversar com a IA</h3>
              <p className="text-gray-700 mb-4">
                Tire dúvidas rapidamente usando nossa assistente inteligente FinanIA.
              </p>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-xl transition-all"
                onClick={() => navigate("/chatia")}  // ← REDIRECIONA PARA O CHAT
              >
                Abrir chat
              </button>
            </div>

            {/* SUPORTE HUMANO */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">📞 Falar com o Suporte</h3>
              <p className="text-gray-700 mb-4">
                Precisa de ajuda? Nossa equipe está pronta para atender você!
              </p>

              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-xl transition-all"
                onClick={() => setShowContato(!showContato)}
              >
                Entrar em contato
              </button>

              {/* DROPDOWN DE CONTATOS */}
              {showContato && (
                <div className="mt-4 bg-yellow-100 p-4 rounded-xl border border-yellow-300 shadow-inner space-y-2 animate-fade-in-up">

                  <a
                    href="https://wa.me/5511987654321"
                    target="_blank"
                    className="flex text-gray-800 font-semibold hover:text-yellow-700 space-x-1"
                  >
                     <FaWhatsapp className="mt-0.5 text-green-700 size-5" /> : (11) 98765-4321

                  </a>

                  <a
                    href="https://instagram.com/finanpro_oficial"
                    target="_blank"
                    className="flex text-gray-800 font-semibold hover:text-yellow-700 "
                  >
                    <FaInstagram className="mt-0.5 pr-1 text-pink-700 size-5"/>
                     : @finanpro_oficial
                  </a>

                  <a
                    href="mailto:suporte@finanpro.com"
                    className="flex text-gray-800 font-semibold hover:text-yellow-700 space-x-1"
                  >
                    <TfiEmail className="mt-0.5 text-red-700 size-5" />
                    : suporte@finanpro.com
                  </a>

                </div>
              )}
            </div>
          </div>

          {/* Lista de perguntas */}
          <div className="w-full flex flex-col gap-4 mt-10">
            {perguntas.map((item, index) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 0.15}s` }}
                className="question-item bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] animate-fade-in-up"
                onClick={() => toggleResposta(index)}
              >
                <h2 className="font-semibold text-gray-800 mb-2 flex justify-between items-center">
                  {item.pergunta}
                  <span className="text-yellow-600 text-xl transition-transform duration-300">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </h2>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? "max-h-40 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600">{item.resposta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Animações */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.7s ease-out forwards;
          }

          @keyframes blink {
            0%, 50%, 100% { border-color: transparent; }
            25%, 75% { border-color: #1f2937; }
          }
          .animate-cursor {
            animation: blink 1s infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Suporte;
