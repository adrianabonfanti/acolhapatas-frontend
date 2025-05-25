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

        {ong.logo && (
          <div className="mb-4 text-center">
            <img
              src={ong.logo}
              alt={`Logo da ${ong.name}`}
              className="h-24 mx-auto object-contain"
            />
          </div>
        )}

        <div className="text-center mb-6">
          <h3 className="text-2xl font-extrabold text-gray-800">Informações da ONG</h3>
          <p className="text-sm text-gray-500 mt-1">Confira os dados completos da instituição</p>
        </div>

        <div className=" gap-x-6 gap-y-3 text-gray-700 text-sm">
          {ong.name && (
            <p className="flex items-start gap-2">
              <span className="material-icons text-emerald-600">business</span>
              <strong className="min-w-[110px]">Nome:</strong> <span>{ong.name}</span>
            </p>
          )}
          {ong.responsibleName && (
            <p className="flex items-start gap-2">
              <span className="material-icons text-emerald-600">person</span>
              <strong className="min-w-[110px]">Responsável:</strong> <span>{ong.responsibleName}</span>
            </p>
          )}
          {ong.cnpj && (
            <p className="flex items-start gap-2">
              <span className="material-icons text-emerald-600">badge</span>
              <strong className="min-w-[110px]">CNPJ:</strong> <span>{ong.cnpj}</span>
            </p>
          )}
          {ong.phone && (
            <p className="flex items-start gap-2">
              <span className="material-icons text-emerald-600">call</span>
              <strong className="min-w-[110px]">Telefone:</strong> <span>{ong.phone}</span>
            </p>
          )}
          {ong.responsibleEmail && (
            <p className="flex items-start gap-2">
              <span className="material-icons text-emerald-600">mail</span>
              <strong className="min-w-[110px]">Email Resp.:</strong>
              <a href={`mailto:${ong.responsibleEmail}`} className="text-emerald-600 hover:underline">
                {ong.responsibleEmail}
              </a>
            </p>
          )}
          {ong.email && (
            <p className="flex items-start gap-2">
              <span className="material-icons text-emerald-600">email</span>
              <strong className="min-w-[110px]">Email ONG:</strong>
              <a href={`mailto:${ong.email}`} className="text-emerald-600 hover:underline">
                {ong.email}
              </a>
            </p>
          )}
          {ong.instagram && (
            <p className="flex items-start gap-2">
              <span className="material-icons text-emerald-600">photo_camera</span>
              <strong className="min-w-[110px]">Instagram:</strong>
              <a
                href={`https://instagram.com/${ong.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                @{ong.instagram.replace("@", "")}
              </a>
            </p>
          )}
          {ong.tiktok && (
            <p className="flex items-start gap-2">
              <span className="material-icons text-emerald-600">smart_display</span>
              <strong className="min-w-[110px]">TikTok:</strong> <span>@{ong.tiktok}</span>
            </p>
          )}
          {ong.website && (
            <p className="flex items-start gap-2">
              <span className="material-icons text-emerald-600">language</span>
              <strong className="min-w-[110px]">Site:</strong>
              <a
                href={ong.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                {ong.website}
              </a>
            </p>
          )}
          {ong.cep && (
            <p className="flex items-start gap-2">
              <span className="material-icons text-emerald-600">location_on</span>
              <strong className="min-w-[110px]">CEP:</strong> <span>{ong.cep}</span>
            </p>
          )}
          {(ong.street || ong.number || ong.complement) && (
            <p className="flex items-start gap-2 sm:col-span-2">
              <span className="material-icons text-emerald-600 mt-0.5">home</span>
              <strong className="min-w-[110px]">Endereço:</strong>
              <span>
                {ong.street}, {ong.number} {ong.complement && `- ${ong.complement}`}<br />
                {ong.city} - {ong.state}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
