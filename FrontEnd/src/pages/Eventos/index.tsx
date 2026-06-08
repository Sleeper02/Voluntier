import { useState } from "react";
import MainNavBar from "../../components/mainnavbar";
import kid from "../../assets/kid.png";
import medico1 from "../../assets/medico1.png";
import energisa from "../../assets/energisa.png";
import cachorro from "../../assets/cachorro.png";
import SearchBar from "../../components/searchbar";
import GridEventos from "../../components/grideventos";
import Footer from "../../components/footer";
import EventoLegalBanner from "../../components/eventolegal";

function Eventos() {
  const [selectedTag, setSelectedTag] = useState("");

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

  const eventos = [
    {
      id: 1,
      nome: "Unimed - Pequenos Cuidados",
      descricao: "Área da saúde, atendimento infantil.",
      imagem: medico1,
      tag: "SAUDE",
    },
    {
      id: 2,
      nome: "Energisa - Cidade Limpa",
      descricao: "Limpeza e coleta de lixo na cidade.",
      imagem: energisa,
      tag: "MEIO_AMBIENTE",
    },
    {
      id: 3,
      nome: "Cobasi - Lar Pet Lar",
      descricao: "Feira de adoção de animais.",
      imagem: cachorro,
      tag: "BEM_ESTAR",
    },
  ];

  const eventosFiltrados =
    selectedTag === ""
      ? eventos
      : eventos.filter((evento) => evento.tag === selectedTag);

  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
      <section className="relative">
        <MainNavBar />

        <div className="relative w-[80%] mx-auto mt-4">
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

        {selectedTag === "" ? (
          <>
            <h1 className="text-4xl font-bold text-left mx-10 my-4 text-[#C96A3D] mt-10">
              eventos mais acessados
            </h1>

            <GridEventos eventos={eventos} />

            <h1 className="text-4xl font-bold text-left mx-10 my-4 text-[#C96A3D] mt-10">
              eventos para o próximo mês
            </h1>

            <GridEventos eventos={eventos} />

            <h1 className="text-4xl font-bold text-left mx-10 my-4 text-[#C96A3D] mt-10">
              eventos hypadosss
            </h1>

            <GridEventos eventos={eventos} />
          </>
        ) : eventosFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-[#C96A3D]">
              Nenhum evento encontrado
            </h2>

            <p className="text-gray-600 mt-3">
              Não encontramos eventos para a categoria selecionada.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-left my-8 px-10 text-[#C96A3D]">
              Resultados para{" "}
              {tags.find((tag) => tag.value === selectedTag)?.label}
            </h1>

            <GridEventos eventos={eventosFiltrados} />
          </>
        )}

        <EventoLegalBanner />
      </section>

      <Footer />
    </main>
  );
}

export default Eventos;
