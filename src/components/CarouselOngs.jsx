import React, { useState } from "react";
import ModalONG from "./ModalOng";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CarouselOngs({ ongs, onClickOng }) {
  const [ongSelecionada, setOngSelecionada] = useState(null);

  return (
    <div className="w-full px-2">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {ongs.map((ong) => (
          <SwiperSlide key={ong._id}>
            <div
              className="bg-white p-2 rounded-xl shadow hover:shadow-md cursor-pointer flex flex-col items-center justify-center"
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
          </SwiperSlide>
        ))}
      </Swiper>

      {ongSelecionada && (
        <ModalONG
          ong={ongSelecionada}
          onClose={() => setOngSelecionada(null)}
        />
      )}
    </div>
  );
}
