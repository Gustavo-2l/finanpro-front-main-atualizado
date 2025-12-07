import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Páginas
import Home from "../pages/Home";

import About from "../pages/About";
import Suporte from "../pages/Suporte";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Calendar from "../pages/Calendar";
import { Dashboard }from "../pages/Dashboard";
import { ChatIA } from "../pages/ChatIA";
import { Dicas } from "../pages/Dicas"
import BankPage from "../pages/BankPage"
; // Removido as chaves { } — o import deve ser padrão, não nomeado

// Componentes de rota protegida e pública
function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ isAuthenticated, children }) {
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}

export default function AppRoutes() {
  // Simulação de autenticação
  // Substitua isso futuramente por Context API, Redux ou LocalStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Login setIsAuthenticated={setIsAuthenticated} />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Register />
            </PublicRoute>
          }
        />

      
     

        {/* Rotas públicas acessíveis sem login */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/suporte" element={<Suporte />} />
        <Route path="/calendario" element={<Calendar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatia" element={<ChatIA />} />
        <Route path="/dicas" element={<Dicas/>} />
        <Route path="/bank" element={<BankPage/>} />

        {/* Redirecionamento padrão */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
