import React from "react";
import { motion } from "framer-motion";
import homeDevices from "../assets/home-devices.png";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="relative min-h-screen font-sans text-black overflow-hidden">
      {/* Fundo dividido em triângulo */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 clip-triangle z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-white z-[-1]"></div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto w-full z-10">
        
        {/* Texto */}
        <motion.div
          className="lg:w-1/2 w-full text-center lg:text-left mb-12 lg:mb-0 mt-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            ORGANIZE SUAS FINANÇAS, <br />
            ACOMPANHE SEUS GASTOS E <br />
            <span className="text-yellow-600">CONQUISTE</span> SEUS OBJETIVOS <br />
            DE FORMA SIMPLES E SEGURA
          </h1>
          <p className="text-lg text-gray-700 max-w-md mx-auto lg:mx-0 mb-8">
            Um jeito fácil e rápido de entender para onde vai o seu dinheiro e planejar o futuro.
          </p>

          {/* Botão removido */}
        </motion.div>

        {/* Imagem */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center items-end mb-12 lg:mb-0 relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={homeDevices}
            alt="Mockup FinanPro"
            className="
              w-[600px] lg:w-[700px] xl:w-[820px]
              absolute bottom-[-220px]
              drop-shadow-xl
              mix-blend-multiply
              brightness-110 contrast-110
            "
          />
        </motion.div>

      </section>

      {/* Benefícios */}
      <section className="py-20 px-8 max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12">
          Por que usar o FinanPro?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-bold text-xl mb-2">Controle Total</h3>
            <p>Visualize seus gastos e receitas de forma clara e simples.</p>
          </motion.div>
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-bold text-xl mb-2">Planejamento Fácil</h3>
            <p>Organize suas metas e planeje seu futuro financeiro com segurança.</p>
          </motion.div>
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-bold text-xl mb-2">Acesso Rápido</h3>
            <p>Tenha todas as suas finanças na palma da mão, em qualquer lugar.</p>
          </motion.div>
        </div>
      </section>

      {/* Estilização do triângulo via CSS */}
      <style>
        {`
          .clip-triangle {
            clip-path: polygon(0 0, 100% 0, 100% 60%, 0 100%);
          }
        `}
      </style>

    </div>
  );
};

export default Home;
