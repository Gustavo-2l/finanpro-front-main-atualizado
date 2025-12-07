import React from "react";

const Card = ({ title, description, buttonText, onClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 w-full max-w-sm">
      {/* Conteúdo */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Botão */}
      {buttonText && (
        <button
          onClick={onClick}
          className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition font-medium"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default Card;
