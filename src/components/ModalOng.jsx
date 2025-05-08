import React from "react";

export default function ModalOng({ ong, onClose }) {
  if (!ong) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-3xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <div className="flex flex-col items-center text-center">
          <img
            src={ong.logo || "/sem_logo.png"}
            alt={ong.nome}
            className="w-24 h-24 object-contain mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-4">{ong.nome}</h2>

          <div className="text-left text-sm text-gray-700 space-y-2 w-full">
            {ong.responsavel && (
              <p className="flex items-center gap-2">
                <span className="material-icons text-base">person</span>
                {ong.responsavel}
              </p>
            )}
            {ong.email && (
              <p className="flex items-center gap-2">
                <span className="material-icons text-base">email</span>
                {ong.email}
              </p>
            )}
            {ong.telefone && (
              <p className="flex items-center gap-2">
                <span className="material-icons text-base">call</span>
                {ong.telefone}
              </p>
            )}
            {ong.instagram && (
              <p className="flex items-center gap-2">
                <span className="material-icons text-base">camera_alt</span>
                @{typeof ong.instagram === "string" ? ong.instagram.replace("@", "") : ong.instagram}
              </p>
            )}
            {ong.site && (
              <p className="flex items-center gap-2">
                <span className="material-icons text-base">language</span>
                {ong.site}
              </p>
            )}
            {ong.pix && (
              <p className="flex items-center gap-2">
                <span className="material-icons text-base">paid</span>
                {ong.pix}
              </p>
            )}
            {ong.endereco && (
              <p className="flex items-center gap-2">
                <span className="material-icons text-base">home</span>
                {ong.endereco}
              </p>
            )}
            {(ong.cidade || ong.estado) && (
              <p className="flex items-center gap-2">
                <span className="material-icons text-base">place</span>
                {ong.cidade} - {ong.estado}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
