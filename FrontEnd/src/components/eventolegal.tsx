import { Link } from "react-router-dom";
import eventolegal from "../assets/eventolegal.png";

function EventoLegalBanner() {
  return (
    <div className="w-[80%] mx-auto mt-12 mb-8">
      <div className="bg-[#E8DCC8] rounded-[28px] overflow-hidden shadow-sm">
        <img
          src={eventolegal}
          alt="Evento Legal"
          className="w-full h-[55px] object-cover"
        />

        <div className="px-8 py-10">
          <h1 className="text-3xl font-bold leading-none text-[#2C2C2C]">
            tem um evento legal?
          </h1>

          <p className="mt-4 text-lg font-medium text-[#2C2C2C] max-w-[900px]">
            cadastre agora e transforme sua iniciativa em impacto social e
            ambiental positivo, conectando pessoas, ideias e mudanças reais para
            um futuro melhor.
          </p>
          <div className="flex justify-center mt-8">
            <Link to="/cadastrarevento">
              <button
                className="
                bg-[#5E6B3F]
                text-[#FFFFFF]
                font-semibold
                text-lg
                px-10
                py-3
                rounded-2xl
                hover:opacity-90
                transition
              "
              >
                quero participar!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventoLegalBanner;
