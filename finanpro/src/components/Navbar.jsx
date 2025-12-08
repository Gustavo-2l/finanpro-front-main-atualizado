import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // estado do menu mobile

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-yellow-600 cursor-pointer">
          FinanPro
        </h1>

        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-yellow-600 transition font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-yellow-600 transition font-medium"
          >
            Sobre
          </Link>
          <Link
            to="/suporte"
            className="text-gray-700 hover:text-yellow-600 transition font-medium"
          >
            Suporte
          </Link>
          <Link to="/login">
            <button className="bg-yellow-600 text-white px-5 py-2 rounded-md hover:bg-yellow-700 transition font-medium">
              Entrar
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Ícone de menu hamburguer */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-4 px-6 py-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-yellow-600 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-yellow-600 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/suporte"
              className="text-gray-700 hover:text-yellow-600 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Suporte
            </Link>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="bg-yellow-600 text-white px-5 py-2 rounded-md hover:bg-yellow-700 transition font-medium w-full">
                Entrar
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
