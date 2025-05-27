// ✅ AnimalCard.jsx corrigido
import React from "react";

export default function AnimalCard({ animal, onAdotar, onImagemCarregada }) {
  const status = animal.status || "ativo";
  if (status === "adotado" || status === "pausado") return null;

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden transition hover:shadow-lg">
      {animal.fotos[0] ? (
        <img
          src={animal.fotos[0]}
          alt={animal.nome}
          className="w-full h-60 object-cover"
          onLoad={onImagemCarregada}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.png";
          }}
        />
      ) : (
        <img
          src="/placeholder.png"
          alt="Imagem não disponível"
          className="w-full h-60 object-cover"
        />
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 capitalize mb-1">{animal.nome}</h3>
        <p className="text-sm text-gray-500 mb-3">
          {animal.especie} • {animal.idade} • {animal.porte} • {animal.sexo}
        </p>
   {animal.createdAt && (
          <p className="text-xs text-gray-400 mb-3">
            Cadastrado em {new Date(animal.createdAt).toLocaleDateString("pt-BR")}
          </p>
        )}
        {animal.descricao && (
          <p className="text-sm italic text-gray-700 mb-4">"{animal.descricao}"</p>
        )}

        <div className="flex flex-wrap gap-2 mb-5">
          {String(animal.castrado) === "true" && (
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">
              <span className="material-icons text-sm">check_circle</span> Castrado
            </span>
          )}
          {String(animal.vacinado) === "true" && (
            <span className="flex items-center gap-1 bg-cyan-50 text-cyan-700 text-xs px-3 py-1 rounded-full font-medium">
              <span className="material-icons text-sm">vaccines</span> Vacinado
            </span>
          )}
          {String(animal.precisaLarTemporario) === "true" && status === "ativo" && (
            <span className="flex items-center gap-1 bg-sky-50 text-sky-700 text-xs px-3 py-1 rounded-full font-medium">
              <span className="material-icons text-sm">pets</span> Precisa de lar temporário
            </span>
          )}
          {String(animal.usaMedicacao) === "true" && (
            <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">
              <span className="material-icons text-sm">medication</span> Usa medicação
            </span>
          )}
          {status === "achouLar" && (
            <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full font-medium">
              <span className="material-icons text-sm">home</span> Em lar temporário
            </span>
          )}
        </div>

        <button
          onClick={onAdotar}
          className="botaoQueroAdotar w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm py-2 rounded-full transition duration-300"
        >
          Quero Adotar
        </button>
      </div>
    </div>
  );
}
