import React, { useState } from "react";
import ModalONG from "./ModalOng";

export default function CarouselOngs({ ongs }) {
  const [ongSelecionada, setOngSelecionada] = useState(null);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 items-center py-4 px-2">
        {ongs.map((ong) => (
          <div
            key={ong._id}
            className="min-w-[100px] max-w-[100px] flex-shrink-0 bg-white p-2 rounded-xl shadow hover:shadow-md cursor-pointer flex flex-col items-center justify-center"
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
        <ModalOng
          ong={ongSelecionada}
          onClose={() => setOngSelecionada(null)}
        />
      )}
    </div>
  );
}
