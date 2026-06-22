/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import NuvemPalavras from "@/components/nuvempalavras";
import ondas from "../../assets/ondas.png";
import medico1 from "../../assets/medico1.png";
import medico2 from "../../assets/medico2.png";
import medico3 from "../../assets/medico3.png";

import { MapPin, Calendar, Star } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getAvaliacaoController } from "../../api/endpoints/avaliacao-controller/avaliacao-controller";
import axiosInstance from "../../api/axiosInstance";

interface ListagemEventoDTO {
  titulo: string;
  dataHora: string;
  localizacao: string;
  fotos?: string[];
}

const api = getAvaliacaoController(axiosInstance);

interface ViewAvaliacaoDTO {
  idEvento: string;
  termosAvaliacao: string[];
  avaliacao: number;
  comentario: string;
}

interface DashboardAvaliacaoDTO {
  avaliacoes: ViewAvaliacaoDTO[];
  mediaAvaliacao: number;
  distribuicao: Record<number, number>;
  frequenciaTermos: Record<string, number>;
}

function AvaliacaoInstituicao() {
  const { id: idEvento } = useParams<{ id: string }>();
  const { usuario } = useAuth();

  const [dashboard, setDashboard] = useState<DashboardAvaliacaoDTO | null>(null);
  const [evento, setEvento] = useState<ListagemEventoDTO | null>(null);

  useEffect(() => {
    if (!idEvento) return;
    axiosInstance
      .get<ListagemEventoDTO>(`/evento/${idEvento}`)
      .then((res) => setEvento(res.data))
      .catch(() => {});
  }, [idEvento]);

  useEffect(() => {
    if (!usuario?.id || !idEvento) return;

    api
      .visualizarAvaliacoes(usuario.id, idEvento)
      .then((res) => {
        setDashboard(res.data as unknown as DashboardAvaliacaoDTO);
      })
      .catch(() => {
        setDashboard({
          mediaAvaliacao: 0,
          distribuicao: {},
          frequenciaTermos: {},
          avaliacoes: [],
        });
      });
  }, [usuario?.id, idEvento]);

  if (!dashboard) {
    return (
      <main className="bg-[#FFFAF2] min-h-screen">
        <NavBar />
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-xl font-semibold text-[#C96A3D]">
            Carregando avaliações...
          </p>
        </div>
      </main>
    );
  }

  const totalAvaliacoes = Object.values(dashboard.distribuicao).reduce(
    (acc: number, value: number) => acc + value,
    0,
  );

  const formatarTermo = (termo: string) =>
    termo
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const palavras = Object.entries(dashboard.frequenciaTermos).map(
    ([termo, quantidade]) => ({
      text: formatarTermo(termo),
      value: quantidade,
    }),
  );

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

            {evento?.dataHora && (
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>
                  {new Date(evento.dataHora).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="flex gap-3 h-[400px]">
            <img
              src={evento?.fotos?.[0] ?? medico1}
              alt="Foto principal"
              className="w-[620px] h-full object-cover rounded-[20px]"
            />

            <div className="flex flex-col gap-3">
              <img
                src={evento?.fotos?.[1] ?? medico2}
                alt="Foto 2"
                className="w-[260px] h-[194px] object-cover rounded-[20px]"
              />

              <img
                src={evento?.fotos?.[2] ?? medico3}
                alt="Foto 3"
                className="w-[260px] h-[194px] object-cover rounded-[20px]"
              />
            </div>
          </div>
        </div>

        <div className="max-w-[1150px] mx-auto mt-14">
          <h2 className="text-3xl font-bold text-[#2C2C2C] mb-10">
            Resumo das avaliações
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="font-bold text-xl text-[#2C2C2C]">Nota média</h3>

              <div className="flex items-center gap-2 mt-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={28}
                    className={
                      star <= Math.round(dashboard.mediaAvaliacao)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <p className="text-6xl font-bold text-[#C96A3D] mt-4">
                {dashboard.mediaAvaliacao.toFixed(1)}
              </p>

              <p className="text-[#666] mt-2">
                Baseado em {totalAvaliacoes} avaliações
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="font-bold text-xl text-[#2C2C2C] mb-6">
                Distribuição das notas
              </h3>

              {[5, 4, 3, 2, 1].map((nota) => {
                const quantidade = dashboard.distribuicao[nota] || 0;

                const porcentagem =
                  totalAvaliacoes > 0
                    ? (quantidade / totalAvaliacoes) * 100
                    : 0;

                return (
                  <div key={nota} className="flex items-center gap-4 mb-4">
                    <span className="w-6 font-medium">{nota}</span>

                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-[#C96A3D] h-3 rounded-full"
                        style={{
                          width: `${porcentagem}%`,
                        }}
                      />
                    </div>

                    <span className="w-10 text-right text-sm">
                      {quantidade}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {palavras.length > 0 && (
            <div className="bg-white rounded-3xl p-8 shadow-sm mt-8">
              <h3 className="font-bold text-xl text-[#2C2C2C] mb-8 text-center">
                Word Cloud dos termos mais citados
              </h3>

              <NuvemPalavras palavras={palavras} />
            </div>
          )}

          <div className="bg-white rounded-3xl p-8 shadow-sm mt-8">
            <h3 className="font-bold text-xl text-[#2C2C2C] mb-6">
              Comentários dos voluntários
            </h3>

            {dashboard.avaliacoes.length === 0 && (
              <p className="text-[#666]">Nenhum comentário ainda.</p>
            )}

            <div className="space-y-5">
              {dashboard.avaliacoes.map((avaliacao, index) => (
                <div key={index} className="border-b border-gray-200 pb-5">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={
                          star <= avaliacao.avaliacao
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <p className="text-[#444]">{avaliacao.comentario}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default AvaliacaoInstituicao;
