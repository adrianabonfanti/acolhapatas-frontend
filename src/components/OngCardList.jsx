import React from "react";

const OngCardList = ({ ongs, openModal }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-emerald-700 mb-6 flex items-center gap-2">
        <span className="material-icons text-3xl">diversity_3</span>
        ONGs Parceiras
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
        {ongs.map((ong) => (
          <div
            key={ong._id}
            onClick={() => openModal(ong)}
            className="min-w-[200px] max-w-[250px] bg-white border border-emerald-100 shadow-md rounded-xl p-4 flex flex-col items-center gap-3 hover:shadow-lg transition cursor-pointer"
          >
            <div className="w-full h-28 flex items-center justify-center overflow-hidden rounded">
              <img
                src={ong.logo || "/sem_logo.png"}
                alt={ong.name}
                className="max-h-24 object-contain"
              />
            </div>
            <h3 className="font-semibold text-center text-sm text-emerald-800 truncate w-full">{ong.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OngCardList;
