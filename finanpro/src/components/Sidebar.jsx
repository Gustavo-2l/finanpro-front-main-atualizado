import React, { useState, useEffect } from "react";
import { Calendar, Lightbulb, X, MessageSquare, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      try {
        setUsuario(JSON.parse(userData));
      } catch (err) {
        console.error("Erro ao parsear usuário do localStorage:", err);
        setUsuario(null);
      }
    }
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Calendário", icon: <Calendar size={20} />, path: "/calendario" },
    { name: "Dicas", icon: <Lightbulb size={20} />, path: "/dicas" },
    { name: "Chat IA", icon: <MessageSquare size={20} />, path: "/chatia" },
    { name: "Cofre", icon: <MessageSquare size={20} />, path: "/bank" },
  ];

  const handleNavigation = (item) => {
    navigate(item.path);
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <aside className="bg-gradient-to-b from-[#fff9d8] to-[#fff5c4] w-64 min-h-screen flex flex-col justify-between rounded-r-3xl shadow-lg p-6 border-r border-yellow-300/40">
      
      {/* Topo */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-[#f69b00] rounded-full w-9 h-9 flex items-center justify-center text-white font-extrabold shadow-md">
            F
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            FinanPro
          </h1>
        </div>

        {/* Saudação do usuário */}
        <p className="text-yellow-800 font-semibold mb-6 text-lg">
          Olá, {usuario ? usuario.nome : "visitante"}!
        </p>

        {/* MENU */}
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`group flex items-center gap-4 px-5 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md
                  ${isActive
                    ? "bg-[#f69b00] text-white shadow-lg scale-[1.02]"
                    : "bg-white text-gray-800 hover:bg-[#f69b00]/90 hover:text-white"
                  }`}
              >
                <div
                  className={`transition-transform duration-300 ${
                    isActive
                      ? "scale-110 text-white"
                      : "text-[#f69b00] group-hover:text-white"
                  }`}
                >
                  {item.icon}
                </div>

                <span className="tracking-wide">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Botão de fechar */}
      <div className="flex justify-center mt-12">
        <button
          onClick={handleClose}
          className="bg-[#f69b00] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#d88100] transition-all duration-300 hover:scale-110 shadow-md"
        >
          <X size={22} />
        </button>
      </div>
    </aside>
  );
};
