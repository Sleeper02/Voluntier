/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";

import ondas from "../../assets/ondas.png";
import medico1 from "../../assets/medico1.png";
import medico2 from "../../assets/medico2.png";
import medico3 from "../../assets/medico3.png";

import { MapPin, Calendar, Star } from "lucide-react";

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
  const [dashboard, setDashboard] = useState<DashboardAvaliacaoDTO | null>(
    null,
  );

  const carregarDashboard = async () => {
    const mockDashboard: DashboardAvaliacaoDTO = {
      mediaAvaliacao: 4.7,

      distribuicao: {
        5: 82,
        4: 28,
        3: 12,
        2: 4,
        1: 1,
      },

      frequenciaTermos: {
        BEM_ORGANIZADO: 45,
        PONTUAL: 39,
        BOA_COMUNICACAO: 31,
        IMPACTO_POSITIVO: 26,
        ESTRUTURA_ADEQUADA: 18,
      },

      avaliacoes: [
        {
          idEvento: "1",
          avaliacao: 5,
          comentario:
            "Evento extremamente bem organizado e com ótima comunicação.",
          termosAvaliacao: ["BEM_ORGANIZADO", "BOA_COMUNICACAO"],
        },
        {
          idEvento: "1",
          avaliacao: 4,
          comentario: "Experiência muito positiva. Participaria novamente.",
          termosAvaliacao: ["IMPACTO_POSITIVO"],
        },
        {
          idEvento: "1",
          avaliacao: 5,
          comentario: "Equipe pontual e estrutura excelente.",
          termosAvaliacao: ["PONTUAL", "ESTRUTURA_ADEQUADA"],
        },
      ],
    };

    setDashboard(mockDashboard);

    /**
     * FUTURA INTEGRAÇÃO
     *
     * const response = await api.get(
     *   `/avaliacao/eventos/${idInstituicao}/${idEvento}`
     * );
     *
     * setDashboard(response.data);
     */
  };

  useEffect(() => {
    carregarDashboard();
  }, []);

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

  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
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

          <div className="bg-white rounded-3xl p-8 shadow-sm mt-8">
            <h3 className="font-bold text-xl text-[#2C2C2C] mb-6">
              Termos mais citados
            </h3>

            <div className="flex flex-wrap gap-3">
              {Object.entries(dashboard.frequenciaTermos).map(
                ([termo, quantidade]) => (
                  <div
                    key={termo}
                    className="
                    bg-[#FFF1EA]
                    border
                    border-[#C96A3D]
                    text-[#C96A3D]
                    px-4
                    py-2
                    rounded-full
                    font-medium
                  "
                  >
                    {formatarTermo(termo)} ({quantidade})
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm mt-8">
            <h3 className="font-bold text-xl text-[#2C2C2C] mb-6">
              Comentários dos voluntários
            </h3>

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
