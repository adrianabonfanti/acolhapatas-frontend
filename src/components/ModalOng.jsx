import React from "react";

export default function ModalONG({ ong, onClose }) {
  if (!ong) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <span className="material-icons">close</span>
        </button>

        <div className="flex flex-col items-center text-center">
          <img
            src={ong.logo || "/sem_logo.png"}
            alt={ong.nome}
            className="w-28 h-28 object-contain mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{ong.nome}</h2>
          <p className="text-sm text-gray-700 mb-1"><strong>Email:</strong> {ong.email}</p>
          <p className="text-sm text-gray-700 mb-1"><strong>Telefone:</strong> {ong.telefone}</p>
          <p className="text-sm text-gray-700 mb-1"><strong>Instagram:</strong> {ong.instagram}</p>
          <p className="text-sm text-gray-700"><strong>Cidade:</strong> {ong.cidade} - {ong.estado}</p>
        </div>
      </div>
    </div>
  );
}
