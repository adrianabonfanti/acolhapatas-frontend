const { useState } = require("react");
const ModalONG = require("./ModalOng");


const { useState } = require("react");
const ModalONG = require("./ModalOng");

function CarouselOngs({ ongs, onClickOng }) {
  const [ongSelecionada, setOngSelecionada] = useState(null);

  return (
    <div className="w-full overflow-x-auto px-4 scrollbar-hide">
      <div className="flex gap-4 snap-x snap-mandatory pb-4 w-fit carrossel">
        {ongs.map((ong) => (
          <div
            key={ong._id}
            className="snap-start w-[140px] flex-shrink-0 bg-white p-2 rounded-xl shadow hover:shadow-md cursor-pointer flex flex-col items-center justify-center"
            onClick={() => onClickOng && onClickOng(ong)}
          >
            <img
              src={ong.logo}
              alt={ong.nome}
              className="w-full mb-2 logoCarrossel"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.png";
              }}
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

module.exports = CarouselOngs;

