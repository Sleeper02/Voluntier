/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import { toast } from "sonner";

import ondas from "../../assets/ondas.png";
import medico1 from "../../assets/medico1.png";
import medico2 from "../../assets/medico2.png";
import medico3 from "../../assets/medico3.png";

import { MapPin, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useAuth } from "../../context/AuthContext";
import { getAvaliacaoController } from "../../api/endpoints/avaliacao-controller/avaliacao-controller";
import axiosInstance from "../../api/axiosInstance";
import type { CriarAvaliacaoDTOTermosAvaliacaoItem } from "../../api/model";

const api = getAvaliacaoController(axiosInstance);

type TermoAvaliacao = CriarAvaliacaoDTOTermosAvaliacaoItem;

interface ListagemEventoDTO {
  id: string;
  titulo: string;
  descricao: string;
  dataHora: string;
  localizacao: string;
  fotos?: string[];
}

const TERMOS: { label: string; value: TermoAvaliacao }[] = [
  { label: "Bem organizado", value: "BEM_ORGANIZADO" },
  { label: "Mal organizado", value: "MAL_ORGANIZADO" },
  { label: "Pontual", value: "PONTUAL" },
  { label: "Atrasado", value: "ATRASADO" },
  { label: "Boa comunicação", value: "BOA_COMUNICACAO" },
  { label: "Impacto positivo", value: "IMPACTO_POSITIVO" },
  { label: "Estrutura adequada", value: "ESTRUTURA_ADEQUADA" },
];

function AvaliacaoEvento() {
  const { id: idEvento } = useParams<{ id: string }>();
  const { usuario } = useAuth();

  const [evento, setEvento] = useState<ListagemEventoDTO | null>(null);
  const [jaAvaliou, setJaAvaliou] = useState(false);
  const [nota, setNota] = useState(0);
  const [hoverNota, setHoverNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [termosSelecionados, setTermosSelecionados] = useState<TermoAvaliacao[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!idEvento) return;
    axiosInstance
      .get<ListagemEventoDTO>(`/evento/${idEvento}`)
      .then((res) => setEvento(res.data))
      .catch(() => {});
  }, [idEvento]);

  useEffect(() => {
    if (!usuario?.id || !idEvento) return;
    api.visualizarAvaliacao(usuario.id, idEvento)
      .then(() => setJaAvaliou(true))
      .catch(() => setJaAvaliou(false));
  }, [usuario?.id, idEvento]);

  const toggleTermo = (termo: TermoAvaliacao) => {
    setTermosSelecionados((prev) =>
      prev.includes(termo) ? prev.filter((item) => item !== termo) : [...prev, termo]
    );
  };

  const handleSubmit = async () => {
    if (!usuario?.id || !idEvento) return;

    setLoading(true);
    try {
      await api.avaliar(usuario.id, idEvento, {
        termosAvaliacao: termosSelecionados,
        avaliacao: nota,
        comentario,
      });
      toast.success("Avaliação enviada com sucesso!");
      setJaAvaliou(true);
    } catch {
      toast.error("Erro ao enviar avaliação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const imagem1 = evento?.fotos?.[0] ?? medico1;
  const imagem2 = evento?.fotos?.[1] ?? medico2;
  const imagem3 = evento?.fotos?.[2] ?? medico3;

  const dataFormatada = evento?.dataHora
    ? new Date(evento.dataHora).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
      <NavBar />

      <img src={ondas} alt="Ondas" className="left-0 w-full h-28" />

      <section className="relative z-10 px-20 py-10">
        <div>
          <h1 className="text-[45px] font-extrabold leading-[65px] text-[#2C2C2C]">
            {evento?.titulo ?? "Carregando..."}
          </h1>

          <div className="flex items-center gap-8 mt-3 text-[15px] text-[#444444]">
            {evento?.localizacao && (
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{evento.localizacao}</span>
              </div>
            )}

            {dataFormatada && (
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{dataFormatada}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="flex gap-3 h-[400px]">
            <img
              src={imagem1}
              alt="Foto principal"
              className="w-[620px] h-full object-cover rounded-[20px]"
            />

            <div className="flex flex-col gap-3">
              <img
                src={imagem2}
                alt="Foto 2"
                className="w-[260px] h-[194px] object-cover rounded-[20px]"
              />

              <img
                src={imagem3}
                alt="Foto 3"
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

          {jaAvaliou ? (
            <div className="mt-10 flex flex-col items-center justify-center gap-4 py-16 rounded-2xl border border-[#C96A3D] bg-[#FFF5EE]">
              <Star size={48} className="fill-yellow-400 text-yellow-400" />
              <h3 className="text-2xl font-semibold text-[#2C2C2C]">Você já avaliou este evento</h3>
              <p className="text-[#666]">Sua avaliação já foi registrada. Obrigado pelo feedback!</p>
            </div>
          ) : (
          <>
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
                  className={`transition-all duration-200 ${
                    estrela <= (hoverNota || nota)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
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
                  className={`px-4 py-2 rounded-full border transition-all font-medium ${
                    ativo
                      ? "bg-[#C96A3D] border-[#C96A3D] text-white"
                      : "bg-white border-[#D7D7D7] text-[#444]"
                  }`}
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
            className="w-full mt-4 min-h-[180px] rounded-2xl border border-[#D8D8D8] bg-white p-5 resize-none outline-none focus:border-[#C96A3D]"
          />

          <div className="flex justify-center mt-10">
            <Button
              onClick={handleSubmit}
              disabled={nota === 0 || loading}
              className="bg-[#C96A3D] hover:bg-[#B85F34] text-white px-14 py-6 rounded-[18px] font-semibold disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar avaliação"}
            </Button>
          </div>
          </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default AvaliacaoEvento;
