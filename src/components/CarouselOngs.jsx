import React, { useState } from "react";
import ModalONG from "./ModalOng";

export default function CarouselOngs({ ongs, onClickOng }) {
  const [ongSelecionada, setOngSelecionada] = useState(null);

  return (
    <div className="w-full px-4 overflow-hidden">
      <div className="max-w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 snap-x snap-mandatory pb-4">
          {ongs.map((ong) => (
            <div
              key={ong._id}
              className="snap-start min-w-[140px] flex-shrink-0 bg-white p-2 rounded-xl shadow hover:shadow-md cursor-pointer flex flex-col items-center justify-center"
              onClick={() => onClickOng && onClickOng(ong)}
            >
              <img
                src={ong.logo}
                alt={ong.nome}
                className="w-full h-24 object-contain mb-2"
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
              />
              <p className="text-xs text-center font-semibold text-gray-700 truncate w-full">
                {ong.nome}
              </p>
            </div>
          ))}
        </div>
      </div>

      {ongSelecionada && (
        <ModalONG ong={ongSelecionada} onClose={() => setOngSelecionada(null)} />
      )}
    </div>
  );
}
