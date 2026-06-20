import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar";
import ondasblue from "../../assets/ondasblue.png";
import dogs from "../../assets/dogs.png";
import Footer from "../../components/footer";
import CardEvento from "../../components/cardevento";

function VisualizacaoEventosInscritos() {
  const navigate = useNavigate();

  const [abaAtiva, setAbaAtiva] = useState<"proximos" | "concluidos">(
    "proximos",
  );

  const eventos = [
    {
      id: 1,
      titulo: "Nome do Evento Sendo Promovido",
      descricao:
        "Aqui vai uma breve descrição do evento, das coisinhas e tal e tal.",
      tag: "Tag do Evento",
      endereco: "Av. Celestino Figueiredo, 2039",
      cidade: "Presidente Prudente, SP",
      dataEvento: "2026-06-01T14:30:00",
      imagem: dogs,
    },
    {
      id: 2,
      titulo: "Evento Concluído",
      descricao:
        "Aqui vai uma breve descrição do evento, das coisinhas e tal e tal.",
      tag: "Saúde",
      endereco: "Av. Brasil, 100",
      cidade: "Presidente Prudente, SP",
      dataEvento: "2025-01-01T09:00:00",
      imagem: dogs,
    },
  ];

  const agora = new Date();

  const proximosEventos = eventos.filter(
    (evento) => new Date(evento.dataEvento) > agora,
  );

  const eventosConcluidos = eventos.filter(
    (evento) => new Date(evento.dataEvento) <= agora,
  );

  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
      <NavBar />

      <section className="relative">
        <div className="relative">
          <img
            src={ondasblue}
            alt="Onda Azul"
            className="w-full h-auto object-cover mt-10"
          />

          <div className="absolute inset-0 flex items-center md:pl-14">
            <h1
              className="
                text-2xl
                sm:text-3xl
                md:text-6xl
                lg:text-6xl
                mt-10
                md:mt-16
                lg:mt-24
                font-bold
                text-white
              "
            >
              MEUS EVENTOS
            </h1>
          </div>
        </div>

        <div className="flex gap-3 mx-10 mt-6">
          <button
            onClick={() => setAbaAtiva("proximos")}
            className={
              abaAtiva === "proximos"
                ? "bg-[#3E6F73] text-white rounded-full px-4 py-2 text-sm font-medium"
                : "border border-[#3E6F73] text-[#3E6F73] rounded-full px-4 py-2 text-sm font-medium"
            }
          >
            Próximos Eventos
          </button>

          <button
            onClick={() => setAbaAtiva("concluidos")}
            className={
              abaAtiva === "concluidos"
                ? "bg-[#3E6F73] text-white rounded-full px-4 py-2 text-sm font-medium"
                : "border border-[#3E6F73] text-[#3E6F73] rounded-full px-4 py-2 text-sm font-medium"
            }
          >
            Eventos Concluídos
          </button>
        </div>

        <div className="mx-10 mt-6 flex flex-col gap-6">
          {abaAtiva === "proximos" &&
            proximosEventos.map((evento) => (
              <CardEvento key={evento.id} {...evento} />
            ))}

          {abaAtiva === "concluidos" &&
            eventosConcluidos.map((evento) => (
              <CardEvento
                key={evento.id}
                {...evento}
                concluido
                acaoTexto="Avaliar Evento"
                onAcao={() => navigate(`/evento/${evento.id}/avaliacao`)}
              />
            ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default VisualizacaoEventosInscritos;
