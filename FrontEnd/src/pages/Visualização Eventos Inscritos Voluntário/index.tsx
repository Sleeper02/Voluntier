import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar";
import ondasblue from "../../assets/ondasblue.png";
import dogs from "../../assets/dogs.png";
import Footer from "../../components/footer";
import CardEvento from "../../components/cardevento";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";

interface ListagemEventoDTO {
  id: string;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  dataHora: string;
  localizacao: string;
  idInstituicao: string;
  fotos?: string[];
}

interface EventosVoluntarioDTO {
  inscricoes: ListagemEventoDTO[];
  participacoes: ListagemEventoDTO[];
}

function VisualizacaoEventosInscritos() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [abaAtiva, setAbaAtiva] = useState<"proximos" | "concluidos">(
    "proximos",
  );
  const [inscricoes, setInscricoes] = useState<ListagemEventoDTO[]>([]);
  const [participacoes, setParticipacoes] = useState<ListagemEventoDTO[]>([]);

  useEffect(() => {
    if (!usuario?.id) return;

    axiosInstance
      .get<EventosVoluntarioDTO>(`/evento/voluntario/${usuario.id}`)
      .then((res) => {
        setInscricoes(res.data.inscricoes ?? []);
        setParticipacoes(res.data.participacoes ?? []);
      });
  }, [usuario?.id]);

  const agora = new Date();

  const proximosEventos = inscricoes.filter(
    (e) => new Date(e.dataHora) > agora
  );

  const concluidosInscritos = inscricoes.filter(
    (e) => new Date(e.dataHora) <= agora
  );

  const todosConcluldos = [...participacoes, ...concluidosInscritos];

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
              <CardEvento
                key={evento.id}
                titulo={evento.titulo}
                descricao={evento.descricao}
                tag=""
                endereco={evento.localizacao ?? ""}
                cidade=""
                dataEvento={evento.dataHora}
                imagem={evento.fotos?.[0] ?? dogs}
              />
            ))}

          {abaAtiva === "concluidos" &&
            todosConcluldos.map((evento) => (
              <CardEvento
                key={evento.id}
                titulo={evento.titulo}
                descricao={evento.descricao}
                tag=""
                endereco={evento.localizacao ?? ""}
                cidade=""
                dataEvento={evento.dataHora}
                imagem={evento.fotos?.[0] ?? dogs}
                concluido
                acaoTexto="Avaliar Evento"
                onAcao={() => navigate(`/evento/${evento.id}/avaliacao`)}
              />
            ))}

          {abaAtiva === "proximos" && proximosEventos.length === 0 && (
            <p className="text-[#666] text-center py-10">
              Nenhum evento inscrito.
            </p>
          )}

          {abaAtiva === "concluidos" && todosConcluldos.length === 0 && (
            <p className="text-[#666] text-center py-10">
              Nenhum evento concluído.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default VisualizacaoEventosInscritos;
