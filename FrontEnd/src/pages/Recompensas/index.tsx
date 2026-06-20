import { useEffect, useState } from "react";
import trophy from "../../assets/trophy.png";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import garrafas from "../../assets/garrafas.png";
import { useAuth } from "../../context/AuthContext";
import { getPessoaController } from "../../api/endpoints/pessoa-controller/pessoa-controller";
import axiosInstance from "../../api/axiosInstance";
import type { ViewRecompensaPessoalDTO, RecompensaPessoaDTO } from "../../api/model";

const api = getPessoaController(axiosInstance);

const TIER_LABELS: Record<string, string> = {
  NENHUM: "SEM NÍVEL",
  BRONZE: "BRONZE",
  PRATA: "PRATA",
  OURO: "OURO",
  DIAMANTE: "DIAMANTE",
};

const PROXIMA_TIER: Record<string, string> = {
  NENHUM: "Bronze",
  BRONZE: "Prata",
  PRATA: "Ouro",
  OURO: "Diamante",
  DIAMANTE: "",
};

function Recompensas() {
  const { usuario } = useAuth();
  const [dados, setDados] = useState<ViewRecompensaPessoalDTO | null>(null);
  const [pontos, setPontos] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuario?.id) return;

    setLoading(true);
    Promise.all([api.recompensas(usuario.id), api.ranking()])
      .then(([recompRes, rankingRes]) => {
        setDados(recompRes.data);
        const encontrado = rankingRes.data.find((u) => u.id === usuario.id);
        setPontos(encontrado?.pontos ?? 0);
      })
      .finally(() => setLoading(false));
  }, [usuario?.id]);

  if (loading) {
    return (
      <main className="bg-[#FFFAF2] min-h-screen">
        <NavBar />
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-xl font-semibold text-[#C96A3D]">
            Carregando recompensas...
          </p>
        </div>
      </main>
    );
  }

  const tier = dados?.tierConta ?? "NENHUM";
  const pontosProxT = dados?.pontosProxT ?? 0;
  const recompensas: RecompensaPessoaDTO[] = dados?.recompensas ?? [];
  const proximaTier = PROXIMA_TIER[tier] ?? "";

  const nextLevelPoints = pontos + pontosProxT;
  const progress =
    nextLevelPoints > 0 ? (pontos / nextLevelPoints) * 100 : 100;

  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
      <section className="relative">
        <NavBar />
        <h1 className="text-4xl font-bold text-left mx-28 my-4 text-[#2C2C2C]">
          Olá, {usuario?.nome ?? "usuário"}!
        </h1>
        <div className="w-[800px] flex items-start justify-between mx-auto px-8 py-8 bg-[#0D434E] rounded-2xl text-white">
          <div className="flex flex-col">
            <div className="bg-[#D9A441] px-5 py-2 rounded-xl w-fit">
              <p className="text-base font-bold text-[#2C2C2C] tracking-wide">
                NÍVEL {TIER_LABELS[tier] ?? tier}
              </p>
            </div>
            <div className="mt-10">
              <div className="flex items-end gap-2 leading-none">
                <h1 className="text-7xl font-bold">
                  {pontos.toLocaleString("pt-BR")}
                </h1>

                <span className="text-3xl font-semibold mb-1">pontos</span>
              </div>
              <div className="mt-6 w-[320px]">
                <div className="w-full h-4 bg-[#D9D9D9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#009951] rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              {proximaTier && (
                <p className="text-base text-[#F2F2F2] font-semibold mt-4">
                  faltam {pontosProxT} pontos para o nível {proximaTier}
                </p>
              )}
              {!proximaTier && (
                <p className="text-base text-[#F2F2F2] font-semibold mt-4">
                  Nível máximo atingido!
                </p>
              )}
            </div>
          </div>

          <img
            src={trophy}
            alt="Trophy"
            className="w-[210px] h-auto object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold text-left mx-28 my-4 text-[#C96A3D] mt-10">
          Recompensas Disponíveis
        </h1>
        <div className="flex items-center justify-center mx-auto gap-6 mt-8 mb-12 flex-wrap">
          {recompensas.length === 0 && (
            <p className="text-[#666] text-lg">
              Nenhuma recompensa disponível ainda.
            </p>
          )}
          {recompensas.map((recompensa, index) => (
            <div
              key={index}
              className="w-[250px] bg-[#E2E4DE] rounded-2xl overflow-hidden"
            >
              <div className="relative">
                <img
                  src={garrafas}
                  alt="Recompensa"
                  className="w-full h-auto object-cover rounded-t-2xl"
                />

                <span className="absolute top-4 right-4 bg-[#D9DDD5] px-4 py-1 rounded-full text-sm text-[#004C5C] font-medium">
                  TIER: {recompensa.tierNecessario ?? "—"}
                </span>
              </div>
              <div className="px-3 py-4">
                <h2 className="text-[#004C5C] font-bold text-lg leading-none">
                  {recompensa.nomeInstituicao ?? "Instituição"}
                </h2>

                <p className="text-black font-medium text-sm leading-none mb-5">
                  {recompensa.eventoNome ?? "Evento"}
                </p>

                <p className="text-[#004C5C] font-bold text-sm leading-5 mb-4">
                  {recompensa.recompensa ?? ""}
                </p>
                <button className="w-[100px] block mx-auto bg-[#F5F5F5] rounded-full py-1 text-sm font-medium shadow-sm">
                  Resgatar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Recompensas;
