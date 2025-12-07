import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />

      {/* Seção Hero */}
      <section className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 pt-40 pb-32 shadow-inner">
        <div className="max-w-5xl mx-auto px-6 text-left">
          {/* Título mais abaixo + estilização */}
          <h1 className="text-5xl lg:text-6xl font-extrabold text-black mb-8 animate-fade-in-down drop-shadow-md">
            Sobre o FinanPro
          </h1>
          <p className="text-xl text-gray-900 max-w-2xl animate-fade-in-up leading-relaxed font-medium">
            Transformando sua relação com o dinheiro através de controle,
            segurança e praticidade — para que você tome decisões financeiras
            com confiança e clareza.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <main className="px-6 lg:px-24 py-24 flex flex-col gap-32">

        {/* Seção: Propósito */}
        <section className="flex flex-col lg:flex-row items-start gap-16 max-w-7xl mx-auto">
          <div className="lg:w-1/2 text-left animate-fade-in-left space-y-6">
            <h2 className="text-4xl font-extrabold text-black tracking-tight">
              Nosso Propósito
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              O <span className="font-semibold text-black">FinanPro</span> nasceu com a missão de
              tornar o planejamento financeiro acessível, prático e eficiente
              para todos.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Com relatórios inteligentes, metas automáticas e recursos intuitivos,
              ajudamos você a transformar sua vida financeira
              com decisões estratégicas e seguras.
            </p>
          </div>

          <div className="lg:w-1/2 flex justify-end animate-fade-in-right">
            <div className="bg-yellow-300 text-black rounded-3xl w-72 h-72 md:w-80 md:h-80 flex items-center justify-center shadow-2xl border border-yellow-400/30 hover:scale-105 transition-transform duration-500">
              <p className="text-xl font-semibold text-center max-w-[240px] leading-relaxed">
                “Organizar o presente é o primeiro passo para conquistar o futuro.”
              </p>
            </div>
          </div>
        </section>

        {/* Seção: Segurança */}
        <section className="flex flex-col lg:flex-row items-start gap-16 max-w-7xl mx-auto">
          <div className="lg:w-1/2 text-left animate-fade-in-left space-y-6">
            <h2 className="text-4xl font-extrabold text-black tracking-tight">
              Segurança e Privacidade
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Sua segurança é prioridade. Utilizamos tecnologias avançadas de
              proteção, como criptografia SSL/TLS e autenticação em duas etapas.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Seguindo a LGPD, garantimos total transparência e controle sobre seus
              dados e como eles são utilizados.
            </p>
          </div>

          <div className="lg:w-1/2 flex justify-end animate-fade-in-right">
            <div className="bg-yellow-300 text-black rounded-3xl w-72 h-72 md:w-80 md:h-80 flex items-center justify-center shadow-2xl border border-yellow-400/30 hover:scale-105 transition-transform duration-500">
              <p className="text-xl font-semibold text-center max-w-[240px] leading-relaxed">
                “Segurança é a base da confiança financeira.”
              </p>
            </div>
          </div>
        </section>

        {/* Seção: Transparência */}
        <section className="flex flex-col lg:flex-row items-start gap-16 max-w-7xl mx-auto">
          <div className="lg:w-1/2 text-left animate-fade-in-left space-y-6">
            <h2 className="text-4xl font-extrabold text-black tracking-tight">
              Transparência e Confiança
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Trabalhamos com ética e clareza. Cada dado, cada relatório e cada
              gráfico são pensados para tornar sua experiência simples,
              visual e objetiva.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Nosso foco é garantir autonomia para que você tome decisões
              conscientes e seguras todos os dias.
            </p>
          </div>

          <div className="lg:w-1/2 flex justify-end animate-fade-in-right">
            <div className="bg-yellow-300 rounded-3xl w-72 h-72 md:w-80 md:h-80 flex items-center justify-center shadow-2xl border border-yellow-400/30 hover:scale-105 transition-transform duration-500">
              <p className="text-xl font-semibold text-center max-w-[240px] leading-relaxed">
                “Transparência constrói confiança — e confiança constrói futuro.”
              </p>
            </div>
          </div>
        </section>
      </main>


      {/* Animações */}
      <style>
        {`
          @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(25px); } 100% { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInDown { 0% { opacity: 0; transform: translateY(-25px); } 100% { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInLeft { 0% { opacity: 0; transform: translateX(-25px); } 100% { opacity: 1; transform: translateX(0); } }
          @keyframes fadeInRight { 0% { opacity: 0; transform: translateX(25px); } 100% { opacity: 1; transform: translateX(0); } }

          .animate-fade-in-up { animation: fadeInUp 0.9s ease-out forwards; }
          .animate-fade-in-down { animation: fadeInDown 0.9s ease-out forwards; }
          .animate-fade-in-left { animation: fadeInLeft 1s ease-out forwards; }
          .animate-fade-in-right { animation: fadeInRight 1s ease-out forwards; }
        `}
      </style>
    </div>
  );
};

export default About;
