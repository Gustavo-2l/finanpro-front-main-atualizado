import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("https://finanpro-back-7.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: name,
          email: email,
          senha: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Erro ao registrar");
        return;
      }

      // Salva token e usuário no localStorage (para a sidebar pegar o nome)
      if (data.access_token && data.user) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("usuario", JSON.stringify(data.user));
      } else {
        // Caso a API não retorne o usuário, cria objeto manual
        const userObj = { nome: name, email };
        localStorage.setItem("usuario", JSON.stringify(userObj));
      }

      // Redireciona para o dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Erro ao conectar ao servidor");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 font-sans">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-sm transform transition-transform duration-500 hover:scale-105 border border-yellow-200">
          <h2 className="text-3xl font-bold text-center mb-2 text-yellow-800">Criar Conta</h2>
          <p className="text-center text-gray-600 mb-6">Comece sua jornada financeira!</p>

          {error && (
            <p className="text-red-500 mb-4 text-center font-medium animate-pulse">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Nome completo"
              className="w-full px-4 py-2 rounded-xl bg-gray-100 border border-gray-200 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all duration-300 placeholder-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="E-mail"
              className="w-full px-4 py-2 rounded-xl bg-gray-100 border border-gray-200 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all duration-300 placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Senha"
              className="w-full px-4 py-2 rounded-xl bg-gray-100 border border-gray-200 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all duration-300 placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirmar senha"
              className="w-full px-4 py-2 rounded-xl bg-gray-100 border border-gray-200 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all duration-300 placeholder-gray-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-yellow-300 hover:bg-yellow-200 text-black font-semibold py-2 rounded-xl shadow-md border border-yellow-400 transform transition-transform duration-300 hover:scale-105"
            >
              Registrar
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-5">
            Já possui uma conta?{" "}
            <Link to="/login" className="text-yellow-700 font-medium hover:underline">
              Entre aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
