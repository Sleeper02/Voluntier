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
  const [resgatando, setResgatando] = useState<RecompensaPessoaDTO | null>(null);
  const [resgatadas, setResgatadas] = useState<Set<string>>(new Set());

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

  async function confirmarResgate() {
    if (!resgatando || !usuario?.id) return;
    try {
      await axiosInstance.post(`/user/resgatar/${usuario.id}/${resgatando.eventoNome}`);
      setResgatadas((prev) => new Set([...prev, resgatando.eventoNome]));
      // modal continua aberto mostrando sucesso
    } catch {
      // erro tratado pelo toast
    }
  }

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
                  src={recompensa.imagem ?? garrafas}
                  alt="Recompensa"
                  className="w-full h-[160px] object-cover rounded-t-2xl"
                />

                <span className="absolute top-4 right-4 bg-[#D9DDD5] px-4 py-1 rounded-full text-sm text-[#004C5C] font-medium">
                  TIER: {recompensa.tierNecessario ?? "—"}
                </span>
              </div>
              <div className="px-3 py-4">
                <h2 className="text-[#004C5C] font-bold text-lg leading-none">
                  {recompensa.nomeInstituicao ?? "Instituição"}
                </h2>

                <p className="text-black font-medium text-sm leading-none mb-3">
                  {recompensa.eventoNome ?? "Evento"}
                </p>

                <p className="text-[#004C5C] font-bold text-sm leading-5 mb-4">
                  {recompensa.recompensa ?? ""}
                </p>
                <button
                  onClick={() => setResgatando(recompensa)}
                  disabled={resgatadas.has(recompensa.eventoNome ?? "")}
                  className={`w-[100px] block mx-auto rounded-full py-1 text-sm font-medium shadow-sm transition ${
                    resgatadas.has(recompensa.eventoNome ?? "")
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#F5F5F5] hover:bg-gray-100 cursor-pointer"
                  }`}
                >
                  {resgatadas.has(recompensa.eventoNome ?? "") ? "Resgatado" : "Resgatar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />

      {/* Modal de resgate */}
      {resgatando && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl text-center">
            {resgatadas.has(resgatando.eventoNome ?? "") ? (
              <>
                <div className="w-14 h-14 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-4">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-[#4CAF50]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h2 className="text-xl font-bold text-[#2C2C2C] mb-1">
                  Recompensa resgatada!
                </h2>

                <p className="text-[#444] text-sm mb-1">
                  <span className="font-semibold">{resgatando.recompensa}</span>
                </p>
                <p className="text-[#666] text-sm mb-2">
                  {resgatando.eventoNome}
                </p>

                <div className="bg-[#FFFAF2] border border-[#E8D9B5] rounded-xl px-4 py-3 mb-6 text-sm text-[#5E4A1A]">
                  Entre em contato com{" "}
                  <span className="font-bold">{resgatando.nomeInstituicao}</span>{" "}
                  para receber sua recompensa.
                </div>

                <button
                  onClick={() => setResgatando(null)}
                  className="w-full py-3 rounded-xl bg-[#5E6B3F] hover:bg-[#4e5a34] text-white font-semibold text-sm transition"
                >
                  Entendido
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-[#2C2C2C] mb-2">
                  Resgatar recompensa?
                </h2>

                <p className="text-[#444] text-sm mb-1">
                  <span className="font-semibold">{resgatando.recompensa}</span>
                </p>
                <p className="text-[#666] text-sm mb-6">
                  {resgatando.eventoNome}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setResgatando(null)}
                    className="flex-1 py-3 rounded-xl border border-[#D8D8D8] text-[#444] font-semibold text-sm hover:bg-gray-50 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmarResgate}
                    className="flex-1 py-3 rounded-xl bg-[#5E6B3F] hover:bg-[#4e5a34] text-white font-semibold text-sm transition"
                  >
                    Resgatar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Recompensas;
