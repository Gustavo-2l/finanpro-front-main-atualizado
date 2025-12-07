import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Plus, Minus, Wallet, ArrowDownCircle, ArrowUpCircle, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApi } from "../hooks/useApi";

export default function Banco() {
  const { request, loading } = useApi();

  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);
  const [valor, setValor] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("success");

  const saldo = entradas - saidas;

  function mostrarMensagem(texto, tipo = "success") {
    setMensagem(texto);
    setTipoMensagem(tipo);
    setTimeout(() => setMensagem(""), 3000);
  }

  useEffect(() => {
    async function carregarSaldo() {
      try {
        const dados = await request("GET", "/contas/saldo");
        setEntradas(dados.saldo); 
        setSaidas(0);
      } catch (err) {
        mostrarMensagem("Erro ao carregar saldo", "error");
      }
    }
    carregarSaldo();
  }, []);

  async function adicionarDinheiro() {
    const num = parseFloat(valor);
    if (!num || num <= 0) return mostrarMensagem("Digite um valor válido!", "error");

    try {
      const res = await request("POST", "/contas/depositar", { valor: num });
      setEntradas(res.saldo_atual);
      mostrarMensagem(`R$ ${num.toFixed(2)} adicionados com sucesso!`, "success");
      setValor("");
    } catch {
      mostrarMensagem("Erro ao adicionar dinheiro", "error");
    }
  }

  async function retirarDinheiro() {
    const num = parseFloat(valor);
    if (!num || num <= 0) return mostrarMensagem("Digite um valor válido!", "error");
    if (num > saldo) return mostrarMensagem("Saldo insuficiente!", "error");

    try {
      const res = await request("POST", "/contas/sacar", { valor: num });
      setEntradas(res.saldo_atual);
      mostrarMensagem(`R$ ${num.toFixed(2)} retirados com sucesso!`, "success");
      setValor("");
    } catch {
      mostrarMensagem("Erro ao retirar dinheiro", "error");
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col items-center p-10 gap-10">
        <AnimatePresence>
          {mensagem && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`fixed top-24 right-10 px-6 py-4 rounded-xl shadow-xl text-white text-lg flex items-center gap-3 ${
                tipoMensagem === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {tipoMensagem === "success" ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              {mensagem}
            </motion.div>
          )}
        </AnimatePresence>

        <h1 className="text-5xl font-extrabold text-yellow-900 drop-shadow-xl text-center">COFRE FINANPRO</h1>

        <div className="w-full max-w-5xl bg-white backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-yellow-200 flex flex-col items-center gap-10">
          <h2 className="text-2xl font-semibold text-yellow-800 text-center">
            Esse é o seu cofre pessoal! Adicione ou retire dinheiro conforme necessário para gerenciar suas finanças de forma eficaz
          </h2>

          {/* Cards */}
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
            <motion.div
              key={saldo}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex-1 bg-yellow-200 rounded-xl shadow-lg p-6 flex flex-col items-center border border-yellow-300"
            >
              <Wallet className="w-12 h-12 text-yellow-700 mb-3" />
              <p className="text-xl font-medium">Saldo disponível</p>
              <p className={`text-3xl font-extrabold ${saldo >= 0 ? "text-green-700" : "text-red-700"}`}>
                R$ {saldo ? saldo.toFixed(2) : "0.00"}
              </p>
            </motion.div>

            <div className="flex-1 bg-green-100 rounded-xl shadow-lg p-6 flex flex-col items-center border border-green-300">
              <ArrowUpCircle className="w-12 h-12 text-green-700 mb-3" />
              <p className="text-xl font-medium">Dinheiro Guardado</p>
              <p className="text-3xl font-extrabold text-green-700">{entradas ? entradas.toFixed(2) : "0.00"}</p>
            </div>

            <div className="flex-1 bg-red-100 rounded-xl shadow-lg p-6 flex flex-col items-center border border-red-300">
              <ArrowDownCircle className="w-12 h-12 text-red-700 mb-3" />
              <p className="text-xl font-medium">Saídas</p>
              <p className="text-3xl font-extrabold text-red-700">{saidas ? saidas.toFixed(2) : "0.00"}</p>
            </div>
          </div>

          {/* Input e Botões */}
          <div className="flex flex-col items-center gap-6 w-full">
            <input
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              type="number"
              placeholder="Digite o valor"
              className="w-60 px-5 py-3 border border-yellow-400 rounded-xl text-lg text-center"
            />

            <div className="flex flex-col md:flex-row gap-6">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={adicionarDinheiro}
                className="flex items-center gap-3 bg-green-500 text-white px-10 py-4 text-lg rounded-2xl shadow-xl"
              >
                <Plus className="w-6 h-6" /> Adicionar
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={retirarDinheiro}
                className="flex items-center gap-3 bg-red-500 text-white px-10 py-4 text-lg rounded-2xl shadow-xl"
              >
                <Minus className="w-6 h-6" /> Retirar
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
