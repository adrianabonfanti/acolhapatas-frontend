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
              alt={`Logo da ${ong.nome}`}
              className="h-24 mx-auto object-contain"
            />
          </div>
        )}

        <div className="text-center mb-6">
          <h3 className="text-2xl font-extrabold text-gray-800">Informações da ONG</h3>
          <p className="text-sm text-gray-500 mt-1">Confira os dados completos da instituição</p>
        </div>

        <div className="grid grid-cols-[auto_auto_1fr] items-start gap-2 text-sm text-gray-700">
          {ong.nome && (
            <>
              <span className="material-icons text-emerald-600">business</span>
              <strong className="whitespace-nowrap">Nome:</strong>
              <span>{ong.nome}</span>
            </>
          )}
          {ong.responsibleName && (
            <>
              <span className="material-icons text-emerald-600">person</span>
              <strong className="whitespace-nowrap">Responsável:</strong>
              <span>{ong.responsibleName}</span>
            </>
          )}
          {ong.cnpj && (
            <>
              <span className="material-icons text-emerald-600">badge</span>
              <strong className="whitespace-nowrap">CNPJ:</strong>
              <span>{ong.cnpj}</span>
            </>
          )}
          {ong.phone && (
            <>
              <span className="material-icons text-emerald-600">call</span>
              <strong className="whitespace-nowrap">Telefone:</strong>
              <span>{ong.phone}</span>
            </>
          )}
          {ong.responsibleEmail && (
            <>
              <span className="material-icons text-emerald-600">mail</span>
              <strong className="whitespace-nowrap">Email Resp.:</strong>
              <a href={`mailto:${ong.responsibleEmail}`} className="text-emerald-600 hover:underline break-all">
                {ong.responsibleEmail}
              </a>
            </>
          )}
          {ong.email && (
            <>
              <span className="material-icons text-emerald-600">email</span>
              <strong className="whitespace-nowrap">Email ONG:</strong>
              <a href={`mailto:${ong.email}`} className="text-emerald-600 hover:underline break-all">
                {ong.email}
              </a>
            </>
          )}
          {ong.instagram && (
            <>
              <span className="material-icons text-emerald-600">photo_camera</span>
              <strong className="whitespace-nowrap">Instagram:</strong>
              <a
                href={`https://instagram.com/${ong.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline break-all"
              >
                @{ong.instagram.replace("@", "")}
              </a>
            </>
          )}
          {ong.tiktok && (
            <>
              <span className="material-icons text-emerald-600">smart_display</span>
              <strong className="whitespace-nowrap">TikTok:</strong>
              <span>@{ong.tiktok}</span>
            </>
          )}
          {ong.website && (
            <>
              <span className="material-icons text-emerald-600">language</span>
              <strong className="whitespace-nowrap">Site:</strong>
              <a
                href={ong.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline break-all"
              >
                {ong.website}
              </a>
            </>
          )}
          {ong.cep && (
            <>
              <span className="material-icons text-emerald-600">location_on</span>
              <strong className="whitespace-nowrap">CEP:</strong>
              <span>{ong.cep}</span>
            </>
          )}
          {(ong.street || ong.number || ong.complement) && (
            <>
              <span className="material-icons text-emerald-600">home</span>
              <strong className="whitespace-nowrap">Endereço:</strong>
              <span>
                {ong.street}, {ong.number} {ong.complement && `- ${ong.complement}`}<br />
                {ong.city} - {ong.state}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
