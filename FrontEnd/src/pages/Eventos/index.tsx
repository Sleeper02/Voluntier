import { useEffect, useState } from "react";
import NavBar from "@/components/navbar";
import kid from "../../assets/kid.png";
import medico1 from "../../assets/medico1.png";
import SearchBar from "../../components/searchbar";
import GridEventos from "../../components/grideventos";
import Footer from "../../components/footer";
import EventoLegalBanner from "../../components/eventolegal";
import { getEventoController } from "../../api/endpoints/evento-controller/evento-controller";
import axiosInstance from "../../api/axiosInstance";

const api = getEventoController(axiosInstance);

interface ListagemEventoDTO {
  id: string;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  dataHora: string;
  localizacao: string;
  idInstituicao: string;
}

function Eventos() {
  const [selectedTag, setSelectedTag] = useState("");
  const [eventos, setEventos] = useState<ListagemEventoDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);

  const tags = [
    { label: "Assistência Social", value: "ASSISTENCIA_SOCIAL" },
    { label: "Direitos Humanos", value: "DIREITOS_HUMANOS" },
    { label: "Meio Ambiente", value: "MEIO_AMBIENTE" },
    { label: "Sustentabilidade", value: "SUSTENTABILIDADE" },
    { label: "Educação", value: "EDUCACAO" },
    { label: "Capacitação", value: "CAPACITACAO" },
    { label: "Saúde", value: "SAUDE" },
    { label: "Bem-estar", value: "BEM_ESTAR" },
    { label: "Cultura", value: "CULTURA" },
    { label: "Lazer", value: "LAZER" },
    { label: "Esporte", value: "ESPORTE" },
  ];

  useEffect(() => {
    setLoading(true);
    setErro(false);
    api
      .listarEvento(selectedTag ? { tag: selectedTag } : {})
      .then((res) => {
        setEventos(res.data as unknown as ListagemEventoDTO[]);
      })
      .catch(() => setErro(true))
      .finally(() => setLoading(false));
  }, [selectedTag]);

  const eventosFormatados = eventos.map((e) => ({
    id: e.id,
    nome: e.titulo,
    descricao: e.descricao,
    imagem: medico1,
  }));

  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
      <section className="relative">
        <NavBar />

        <div className="relative w-[70%] mx-auto mt-4">
          <img
            src={kid}
            alt="Criança"
            className="w-full h-auto object-cover rounded-xl"
          />

          <div className="absolute bottom-10 left-6">
            <h1 className="text-5xl font-bold text-[#FFFAF2]">
              reforço escolar
            </h1>

            <p className="text-[#FFFAF2] mt-2 max-w-[380px] font-medium text-lg">
              ajude crianças com dificuldades em matérias básicas (leitura,
              matemática).
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <SearchBar placeholder="Busque a categoria" width="50%" />
        </div>

        {/* TAGS */}

        <div className="flex flex-wrap justify-center gap-3 mt-8 px-8">
          <button
            onClick={() => setSelectedTag("")}
            className={`px-2 py-1 rounded-full border transition-all ${
              selectedTag === ""
                ? "bg-[#C96A3D] text-white border-[#C96A3D]"
                : "bg-white text-[#C96A3D] border-[#C96A3D]"
            }`}
          >
            Todas
          </button>

          {tags.map((tag) => (
            <button
              key={tag.value}
              onClick={() => setSelectedTag(tag.value)}
              className={`px-2 py-1 rounded-full border transition-all ${
                selectedTag === tag.value
                  ? "bg-[#C96A3D] text-white border-[#C96A3D]"
                  : "bg-white text-[#C96A3D] border-[#C96A3D] hover:bg-[#C96A3D] hover:text-white"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {selectedTag && (
          <div className="text-center mt-4">
            <span className="text-[#555]">
              Filtrando por:{" "}
              <strong>
                {tags.find((tag) => tag.value === selectedTag)?.label}
              </strong>
            </span>
          </div>
        )}

        {loading && (
          <div className="text-center py-10">
            <p className="text-[#C96A3D] font-medium">Carregando eventos...</p>
          </div>
        )}

        {erro && (
          <div className="text-center py-10">
            <p className="text-red-500 font-medium">
              Não foi possível carregar os eventos. Tente novamente mais tarde.
            </p>
          </div>
        )}

        {!loading && !erro && selectedTag === "" && (
          <>
            <h1 className="text-4xl font-bold text-left mx-10 my-4 text-[#C96A3D] mt-10">
              eventos mais acessados
            </h1>

            <GridEventos eventos={eventosFormatados} />

            <h1 className="text-4xl font-bold text-left mx-10 my-4 text-[#C96A3D] mt-10">
              eventos para o próximo mês
            </h1>

            <GridEventos eventos={eventosFormatados} />

            <h1 className="text-4xl font-bold text-left mx-10 my-4 text-[#C96A3D] mt-10">
              eventos hypadosss
            </h1>

            <GridEventos eventos={eventosFormatados} />
          </>
        )}

        {!loading && !erro && selectedTag !== "" && eventosFormatados.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-[#C96A3D]">
              Nenhum evento encontrado
            </h2>

            <p className="text-gray-600 mt-3">
              Não encontramos eventos para a categoria selecionada.
            </p>
          </div>
        )}

        {!loading && !erro && selectedTag !== "" && eventosFormatados.length > 0 && (
          <>
            <h1 className="text-4xl font-bold text-left my-8 px-10 text-[#C96A3D]">
              Resultados para{" "}
              {tags.find((tag) => tag.value === selectedTag)?.label}
            </h1>

            <GridEventos eventos={eventosFormatados} />
          </>
        )}

        <EventoLegalBanner />
      </section>

      <Footer />
    </main>
  );
}

export default Eventos;
