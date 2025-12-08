import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://finanpro-back-7.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Credenciais inválidas");
        return;
      }

      // Salva o token no localStorage
      localStorage.setItem("token", data.access_token);

      // Salva os dados do usuário no localStorage
      // Assumindo que o backend retorne { user: { id, nome, email } }
      localStorage.setItem("usuario", JSON.stringify(data.user));

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
          <h2 className="text-3xl font-bold text-center mb-2 text-yellow-800">Bem-vindo!</h2>
          <p className="text-center text-gray-600 mb-6">Entre na sua conta digital e explore suas finanças!</p>

          {error && (
            <p className="text-red-500 mb-4 text-center font-medium animate-pulse">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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

            <button
              type="submit"
              className="w-full bg-yellow-300 hover:bg-yellow-200 text-black font-semibold py-2 rounded-xl shadow-md border border-yellow-400 transform transition-transform duration-300 hover:scale-105"
            >
              Entrar
            </button>

          </form>

          <p className="text-center text-gray-600 text-sm mt-5">
            Ainda não possui conta?{" "}
            <Link to="/register" className="text-yellow-700 font-medium hover:underline">
              Faça o cadastro
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
