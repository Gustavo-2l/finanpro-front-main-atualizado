import React, { useState, useEffect } from "react";
import {
  Calendar,
  PiggyBank,
  Sparkles,
  Shield,
  MessageCircle,
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Dashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [savingsData, setSavingsData] = useState([]);
  const [metasAtivas, setMetasAtivas] = useState([]);
  const [meta, setMeta] = useState("");
  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const BASE_URL = "http://localhost:8000";

  const fetchDashboard = async () => {
    try {
      const response = await fetch(`${BASE_URL}/dashboard/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`Erro ${response.status}`);
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      console.error("Erro ao buscar dados do dashboard:", err);
      setError("Não foi possível carregar o dashboard.");
    }
  };

  const fetchSavings = async () => {
    try {
      const response = await fetch(`${BASE_URL}/dashboard/savings/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`Erro ${response.status}`);
      const data = await response.json();
      const arrayData = Array.isArray(data)
        ? data.map((item) => ({
            mes: item.month,
            valor: item.value,
          }))
        : [];

      setSavingsData(arrayData);
    } catch (err) {
      console.error("Erro ao buscar savings:", err);
      setError("Não foi possível carregar os dados de economia.");
    }
  };

  const fetchGoals = async () => {
    try {
      const response = await fetch(`${BASE_URL}/goals/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`Erro ${response.status}`);
      const data = await response.json();
      setMetasAtivas(data);
    } catch (err) {
      console.error("Erro ao buscar metas:", err);
    }
  };

  const handleSaveGoal = async () => {
    if (!meta || !valor) return alert("Preencha todos os campos!");

    try {
      const response = await fetch(`${BASE_URL}/goals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: meta,
          value: Number(valor),
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        alert(errData.detail || "Erro ao salvar meta");
        return;
      }

      const novaMeta = { title: meta, value: Number(valor) };
      setMetasAtivas([...metasAtivas, novaMeta]);

      alert("Meta salva com sucesso!");
      setMeta("");
      setValor("");
    } catch (err) {
      console.error("Erro ao salvar meta:", err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      setLoading(true);
      await fetchDashboard();
      await fetchSavings();
      await fetchGoals();
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-700">Carregando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200">
      <Sidebar />
      <main className="flex-1 flex flex-col justify-start items-center p-10 gap-10">
        {/* Cabeçalho */}
        <div className="text-center animate-fadeIn">
          <h2 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-2 text-yellow-900 drop-shadow-xl">
            <Sparkles className="text-yellow-500 animate-pulse" />
            PAINEL FINANCEIRO <span className="text-yellow-600 font-extrabold">FINANPRO</span>
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            Acompanhe seu progresso financeiro com clareza.
          </p>
        </div>

        {/* Botões Extras */}
        <div className="flex gap-6">
          <button
            onClick={() => navigate("/bank")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl shadow-md font-semibold flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Shield size={20} /> Cofre
          </button>

          <button
            onClick={() => navigate("/chatia")}
            className="bg-white hover:bg-gray-100 text-yellow-600 px-6 py-3 rounded-xl shadow-md font-semibold flex items-center gap-2 transition-transform hover:scale-105"
          >
            <MessageCircle size={20} /> Chat IA
          </button>
        </div>

        {/* Cards */}
        {dashboardData && (
          <div className="flex justify-center w-full max-w-3xl gap-4">
            {/* Saldo Atual */}
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center w-[260px]">
              <PiggyBank className="text-yellow-500 mx-auto mb-3" size={34} />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Saldo Atual</h3>
              <p className="text-2xl font-bold text-gray-900">R$ {dashboardData.saldo}</p>
            </div>

            {/* Metas Ativas */}
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center w-[260px]">
              <Calendar className="text-yellow-600 mx-auto mb-3" size={34} />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Metas Ativas</h3>
              <p className="text-2xl font-bold text-gray-900">{metasAtivas.length} metas</p>
              <ul className="text-sm text-gray-700 mt-2">
                {metasAtivas.map((goal, index) => (
                  <li key={index}>• {goal.title}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Gráfico */}
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-6xl">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Dinheiro Guardado por Mês
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="valor" stroke="#eab308" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Estabelecer Meta */}
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-xl">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Estabelecer Nova Meta
          </h3>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Qual é sua meta? (ex: Comprar notebook)"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              className="p-3 rounded-xl border border-gray-300"
            />

            <input
              type="number"
              placeholder="Valor necessário (R$)"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="p-3 rounded-xl border border-gray-300"
            />

            <button
              onClick={handleSaveGoal}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold shadow-md transition-transform hover:scale-105"
            >
              Salvar Meta
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
