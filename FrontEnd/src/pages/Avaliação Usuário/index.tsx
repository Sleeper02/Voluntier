/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";

import ondas from "../../assets/ondas.png";
import medico1 from "../../assets/medico1.png";
import medico2 from "../../assets/medico2.png";
import medico3 from "../../assets/medico3.png";

import { MapPin, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

type TermoAvaliacao =
  | "BEM_ORGANIZADO"
  | "MAL_ORGANIZADO"
  | "PONTUAL"
  | "ATRASADO"
  | "BOA_COMUNICACAO"
  | "IMPACTO_POSITIVO"
  | "ESTRUTURA_ADEQUADA";

const TERMOS: {
  label: string;
  value: TermoAvaliacao;
}[] = [
  {
    label: "Bem organizado",
    value: "BEM_ORGANIZADO",
  },
  {
    label: "Mal organizado",
    value: "MAL_ORGANIZADO",
  },
  {
    label: "Pontual",
    value: "PONTUAL",
  },
  {
    label: "Atrasado",
    value: "ATRASADO",
  },
  {
    label: "Boa comunicação",
    value: "BOA_COMUNICACAO",
  },
  {
    label: "Impacto positivo",
    value: "IMPACTO_POSITIVO",
  },
  {
    label: "Estrutura adequada",
    value: "ESTRUTURA_ADEQUADA",
  },
];

function AvaliacaoEvento() {
  const [nota, setNota] = useState(0);
  const [hoverNota, setHoverNota] = useState(0);

  const [comentario, setComentario] = useState("");

  const [termosSelecionados, setTermosSelecionados] = useState<
    TermoAvaliacao[]
  >([]);
  const [sucesso, setSucesso] = useState(false);

  const toggleTermo = (termo: TermoAvaliacao) => {
    setTermosSelecionados((prev) =>
      prev.includes(termo)
        ? prev.filter((item) => item !== termo)
        : [...prev, termo],
    );
  };

  const handleSubmit = async () => {
    const payload = {
      termosAvaliacao: termosSelecionados,
      avaliacao: nota,
      comentario,
    };

    console.log(payload);

    /**
     * FUTURA INTEGRAÇÃO
     *
     * await api.post(
     *   `/avaliacao/${idPessoa}/${idEvento}`,
     *   payload
     * );
     */

    setSucesso(true);

    setNota(0);
    setHoverNota(0);
    setComentario("");
    setTermosSelecionados([]);

    setTimeout(() => {
      setSucesso(false);
    }, 4000);
  };

  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
      {sucesso && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300 justify-center">
          <Alert
            variant="default"
            className="bg-white text-[#2c2c2c] font-bold shadow-lg w-[200px] justify-center"
          >
            <CheckCircle2 className="h-5 w-5 text-green-800" />
            <AlertTitle variant="default" className="">
              Avaliação enviada!
            </AlertTitle>
          </Alert>
        </div>
      )}
      <NavBar />

      <img src={ondas} alt="Ondas" className="left-0 w-full h-28" />

      <section className="relative z-10 px-20 py-10">
        <div>
          <h1 className="text-[45px] font-extrabold leading-[65px] text-[#2C2C2C]">
            Pequenos Cuidados
          </h1>

          <div className="flex items-center gap-8 mt-3 text-[15px] text-[#444444]">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>Presidente Prudente - SP</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>18/04 e 19/04</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="flex gap-3 h-[400px]">
            <img
              src={medico1}
              alt="Voluntariado"
              className="w-[620px] h-full object-cover rounded-[20px]"
            />

            <div className="flex flex-col gap-3">
              <img
                src={medico2}
                alt="Crianças"
                className="w-[260px] h-[194px] object-cover rounded-[20px]"
              />

              <img
                src={medico3}
                alt="Vacina"
                className="w-[260px] h-[194px] object-cover rounded-[20px]"
              />
            </div>
          </div>
        </div>

        <div className="max-w-[1150px] mx-auto mt-12">
          <h2 className="text-3xl font-bold text-[#2C2C2C]">
            Como foi sua experiência?
          </h2>

          <p className="text-[#666] mt-2">
            Sua avaliação ajuda as instituições a melhorarem seus eventos.
          </p>

          <div className="flex gap-2 mt-8">
            {[1, 2, 3, 4, 5].map((estrela) => (
              <button
                key={estrela}
                type="button"
                onClick={() => setNota(estrela)}
                onMouseEnter={() => setHoverNota(estrela)}
                onMouseLeave={() => setHoverNota(0)}
              >
                <Star
                  size={42}
                  className={`
                    transition-all duration-200
                    ${
                      estrela <= (hoverNota || nota)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  `}
                />
              </button>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-[#2C2C2C] mt-12">
            Selecione os termos que melhor descrevem o evento
          </h3>

          <div className="flex flex-wrap gap-3 mt-5">
            {TERMOS.map((termo) => {
              const ativo = termosSelecionados.includes(termo.value);

              return (
                <button
                  key={termo.value}
                  type="button"
                  onClick={() => toggleTermo(termo.value)}
                  className={`
                    px-4
                    py-2
                    rounded-full
                    border
                    transition-all
                    font-medium
                    ${
                      ativo
                        ? "bg-[#C96A3D] border-[#C96A3D] text-white"
                        : "bg-white border-[#D7D7D7] text-[#444]"
                    }
                  `}
                >
                  {termo.label}
                </button>
              );
            })}
          </div>

          <h3 className="text-xl font-semibold text-[#2C2C2C] mt-12">
            Comentário
          </h3>

          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Conte-nos mais sobre sua experiência no evento..."
            className="
              w-full
              mt-4
              min-h-[180px]
              rounded-2xl
              border
              border-[#D8D8D8]
              bg-white
              p-5
              resize-none
              outline-none
              focus:border-[#C96A3D]
            "
          />

          <div className="flex justify-center mt-10">
            <Button
              onClick={handleSubmit}
              disabled={nota === 0}
              className="
                bg-[#C96A3D]
                hover:bg-[#B85F34]
                text-white
                px-14
                py-6
                rounded-[18px]
                font-semibold
                disabled:opacity-50
              "
            >
              Enviar avaliação
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default AvaliacaoEvento;
