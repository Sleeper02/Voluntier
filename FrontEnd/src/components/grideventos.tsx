import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function GridEventos({ eventos }) {
  return (
    <div className="w-[1024px] mx-auto mt-10 px-10">
      <Swiper
        modules={[Navigation]}
        navigation
        loop={eventos.length > 3}
        slidesPerView={3}
        spaceBetween={22}
      >
        {eventos.map((evento) => (
          <SwiperSlide key={evento.id}>
            <div>
              <div className="relative">
                <img
                  src={evento.imagem}
                  alt={evento.nome}
                  className="w-full h-[190px] object-cover rounded-[18px]"
                />
                <a href="/eventodescricao">
                <button
                  className="
                    absolute
                    bottom-4
                    left-1/2
                    -translate-x-1/2
                    bg-[#D98C63]
                    text-white
                    font-bold
                    text-[16px]
                    px-8
                    py-2
                    rounded-xl
                    shadow-sm
                    hover:opacity-90
                    transition
                  "
                >
                  Inscreva-se
                </button>
                </a>
              </div>

              <div className="mt-2">
                <h2 className="text-center font-bold text-[18px] text-[#3A3A3A]">
                  {evento.nome}
                </h2>

                <p className="text-center text-[15px] text-[#666666] mt-1">
                  {evento.descricao}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #3E6F73;
          font-weight: bold;
          transform: scale(0.8);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 24px;
        }
      `}</style>
    </div>
  );
}

export default GridEventos;
