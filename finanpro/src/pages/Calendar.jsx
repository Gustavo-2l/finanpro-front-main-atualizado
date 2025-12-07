// Calendar page with explanatory card added
// (Your entire calendar code pasted and enhanced)

import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";

const Calendar = () => {
  const meses = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO",
  ];

  const diasSemana = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

  const [anoAtual, setAnoAtual] = useState(2025);
  const [mesAtual, setMesAtual] = useState(0);
  const [selecionados, setSelecionados] = useState(new Set());

  const gerarSemanas = (ano, mes) => {
    const totalDias = new Date(ano, mes + 1, 0).getDate();
    let primeiroDia = new Date(ano, mes, 1).getDay();
    let indiceSegunda = primeiroDia === 0 ? 6 : primeiroDia - 1;

    const semanas = [];
    let semanaAtual = new Array(7).fill(null);

    for (let i = 0; i < indiceSegunda; i++) semanaAtual[i] = null;

    let dia = 1;
    for (let i = indiceSegunda; i < 7; i++) semanaAtual[i] = dia++;

    semanas.push([...semanaAtual]);

    while (dia <= totalDias) {
      const novaSemana = new Array(7).fill(null);
      for (let i = 0; i < 7 && dia <= totalDias; i++) novaSemana[i] = dia++;
      semanas.push(novaSemana);
    }
    return semanas;
  };

  const semanas = gerarSemanas(anoAtual, mesAtual);

  useEffect(() => {
    const key = `cal_sel_${anoAtual}_${mesAtual}`;
    const raw = localStorage.getItem(key);
    setSelecionados(raw ? new Set(JSON.parse(raw)) : new Set());
  }, [mesAtual, anoAtual]);

  useEffect(() => {
    const key = `cal_sel_${anoAtual}_${mesAtual}`;
    localStorage.setItem(key, JSON.stringify(Array.from(selecionados)));
  }, [selecionados, mesAtual, anoAtual]);

  const toggleDia = (dia) => {
    setSelecionados((prev) => {
      const novo = new Set(prev);
      novo.has(dia) ? novo.delete(dia) : novo.add(dia);
      return novo;
    });
  };

  const limparTodos = () => setSelecionados(new Set());
  const marcarTodos = () => {
    const diasReais = semanas.flat().filter((d) => d !== null);
    setSelecionados(new Set(diasReais));
  };

  const proximoMes = () => {
    if (mesAtual === 11) {
      if (anoAtual === 2026) return;
      setAnoAtual(anoAtual + 1);
      setMesAtual(0);
    } else setMesAtual(mesAtual + 1);
  };

  const mesAnterior = () => {
    if (mesAtual === 0) {
      if (anoAtual === 2025) return;
      setAnoAtual(anoAtual - 1);
      setMesAtual(11);
    } else setMesAtual(mesAtual - 1);
  };

  const todosDias = semanas.flat().filter((d) => d !== null);
  const todosMarcados = selecionados.size === todosDias.length;

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 font-sans">
      <Sidebar />

      <div className="flex-1 p-8 md:p-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl text-yellow-900 drop-shadow-xl font-extrabold text-center mt-10 mb-4 text-gray-900 tracking-wide">
          CALENDÁRIO FINANCEIRO
        </h1>

        {/* 💬 NOVO CARD EXPLICATIVO */}
        <div className="w-full max-w-4xl mb-8 p-6 bg-white shadow-xl rounded-2xl border border-yellow-400/40">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">📅 Como funciona o Calendário Mensal?</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Este calendário é usado para acompanhar os dias em que você está <strong>guardando seu dinheiro</strong> no
            caso por conta propria. Cada dia marcado representa um compromisso que você cumpriu com a sua própria meta financeira.
            <br /><br />
            💛 Sempre que guardar dinheiro, clique no dia — ele ficará marcado.  
            <br />
            💛 No final do mês, você poderá visualizar seu progresso completo.
            <br />
            💛 Isso ajuda você a criar o hábito de poupar e manter disciplina financeira.
          </p>
        </div>

        {/* Navegação */}
        <div className="flex items-center justify-center gap-10 mb-8">
          <button onClick={mesAnterior} className="text-5xl font-extrabold text-[#f69b00] hover:scale-125 transition">‹</button>

          <h2 className="text-4xl font-black uppercase tracking-widest text-gray-900 drop-shadow-sm">
            {meses[mesAtual]} <span className="text-[#f69b00] font-extrabold">{anoAtual}</span>
          </h2>

          <button onClick={proximoMes} className="text-5xl font-extrabold text-[#f69b00] hover:scale-125 transition">›</button>
        </div>

        {/* Tabela do calendário */}
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-36 p-5 bg-white text-left">
                  <span className="italic text-2xl font-bold text-gray-900">{meses[mesAtual].substring(0, 3)}.</span>
                  <div className="bg-[#f69b00] text-white rounded-full px-4 py-1 text-sm font-bold mt-3 shadow-md">{anoAtual}</div>
                </th>

                {diasSemana.map((dia, idx) => (
                  <th key={idx} className="text-center px-4 py-4 bg-[#FFD54F] text-white font-semibold text-base border border-[#FBC02D]/30">
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {semanas.map((semana, idx) => (
                <tr key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 120}ms` }}>
                  <td className="bg-[#FFF8E1] font-semibold text-gray-700 py-4 px-3 border text-left">Semana {idx + 1}</td>

                  {semana.map((dia, i) => {
                    if (dia === null)
                      return (
                        <td key={`vazio-${i}`} className="border p-0">
                          <div className="w-full aspect-square bg-gray-50 rounded-md"></div>
                        </td>
                      );

                    const marcado = selecionados.has(dia);

                    return (
                      <td key={dia} className="border p-0">
                        <button
                          onClick={() => toggleDia(dia)}
                          className={`relative w-full aspect-square flex items-center justify-center rounded-md transition hover:-translate-y-1 ${marcado ? "bg-green-50 border-green-400" : "bg-white border-gray-300"}`}
                        >
                          <span className="text-base md:text-lg font-medium">{dia}</span>

                          <span
                            className={`absolute top-2 right-2 text-sm font-bold px-3 py-1 rounded-full transition ${marcado ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                            style={{ background: "#22c55e", color: "white", boxShadow: "0 4px 14px rgba(34,197,94,0.35)" }}
                          >
                            ✓ OK
                          </span>
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 w-full max-w-5xl">
          <div className="text-sm text-gray-700">Clique em um dia para marcar ou desmarcar.</div>

          <div className="flex gap-4">
            <button onClick={limparTodos} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl shadow">🧹 Limpar marcações</button>
            <button onClick={marcarTodos} className="px-6 py-2 bg-yellow-500 text-white rounded-xl shadow">✅ Marcar todos</button>
          </div>
        </div>

        {todosMarcados && (
          <button onClick={proximoMes} className="mt-6 px-8 py-3 bg-green-600 text-white font-semibold rounded-2xl shadow-md hover:bg-green-700">
            🌟 Avançar para {meses[(mesAtual + 1) % 12]}
          </button>
        )}

      </div>
    </div>
  );
};

export default Calendar;