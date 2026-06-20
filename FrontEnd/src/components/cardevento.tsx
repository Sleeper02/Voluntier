import { useEffect, useState } from "react";

interface CardEventoProps {
  titulo: string;
  descricao: string;
  tag: string;
  endereco: string;
  cidade: string;
  dataEvento: string;
  imagem: string;

  concluido?: boolean;
  acaoTexto?: string;
  onAcao?: () => void;
}

function CardEvento({
  titulo,
  descricao,
  tag,
  endereco,
  cidade,
  dataEvento,
  imagem,
  concluido = false,
  acaoTexto,
  onAcao,
}: CardEventoProps) {
  const [tempoRestante, setTempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    if (concluido) return;

    const atualizarContagem = () => {
      const agora = new Date().getTime();
      const evento = new Date(dataEvento).getTime();

      const diferenca = evento - agora;

      if (diferenca <= 0) {
        setTempoRestante({
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
        });
        return;
      }

      setTempoRestante({
        dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
        horas: Math.floor(
          (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutos: Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60)),
        segundos: Math.floor((diferenca % (1000 * 60)) / 1000),
      });
    };

    atualizarContagem();

    const interval = setInterval(atualizarContagem, 1000);

    return () => clearInterval(interval);
  }, [dataEvento, concluido]);

  return (
    <div className="w-full border border-[#8B8B8B] rounded-3xl p-3 flex gap-5 bg-transparent">
      <img
        src={imagem}
        alt={titulo}
        className="w-[260px] h-[250px] object-cover rounded-3xl"
      />

      <div className="flex-1">
        {!concluido && (
          <div className="bg-[#2C2C2C] rounded-2xl flex w-fit px-5 py-3 gap-6 text-white">
            {[
              { valor: tempoRestante.dias, label: "DIAS" },
              { valor: tempoRestante.horas, label: "HORAS" },
              { valor: tempoRestante.minutos, label: "MINUTOS" },
              { valor: tempoRestante.segundos, label: "SEGUNDOS" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-lg font-bold">
                  {String(item.valor).padStart(2, "0")}
                </p>
                <p className="text-[9px]">{item.label}</p>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-3xl font-bold mt-4 text-black">{titulo}</h2>

        <p className="mt-2 text-[#2C2C2C] text-lg leading-6">{descricao}</p>

        <div className="flex justify-between mt-5 text-lg">
          <div>
            <p className="font-bold">{tag}</p>
            <p className="font-bold">{cidade}</p>
          </div>

          <div className="text-right">
            <p className="font-bold">{endereco}</p>

            <p className="font-bold">
              {new Date(dataEvento).toLocaleString("pt-BR")}
            </p>

            {acaoTexto && (
              <button
                onClick={onAcao}
                className="
                  mt-4
                  bg-[#3E6F73]
                  text-white
                  px-5
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  hover:opacity-90
                  transition
                "
              >
                {acaoTexto}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardEvento;
