import React, { useState } from "react";
import ModalONG from "./ModalOng";

export default function CarouselOngs({ ongs, onClickOng }) {
  const [ongSelecionada, setOngSelecionada] = useState(null);

  return (
    <div className="w-full overflow-hidden px-4">
      <div className="flex gap-4 overflow-x-auto scroll-snap-x snap-x snap-mandatory pb-4 scrollbar-hide">
        {ongs.map((ong) => (
          <div
            key={ong._id}
            className="snap-start min-w-[120px] bg-white p-2 rounded-xl shadow hover:shadow-md cursor-pointer flex flex-col items-center justify-center flex-shrink-0"
            onClick={() => onClickOng && onClickOng(ong)}
          >
            <img
              src={ong.logo}
              alt={ong.nome}
              className="w-full h-24 object-contain mb-2"
            />
            <p className="text-xs text-center font-semibold text-gray-700 truncate w-full">
              {ong.nome}
            </p>
          </div>
        ))}
      </div>

      {ongSelecionada && (
        <ModalONG ong={ongSelecionada} onClose={() => setOngSelecionada(null)} />
      )}
    </div>
  );
}
