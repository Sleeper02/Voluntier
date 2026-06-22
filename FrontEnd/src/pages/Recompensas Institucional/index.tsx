import { useEffect, useState } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import garrafas from "../../assets/garrafas.png";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";

interface ViewRecompensaDTO {
  titulo: string;
  id: string;
  recompensa: string;
  tierConta: string;
  imagem?: string;
}

const TIER_ORDER = ["DIAMANTE", "OURO", "PRATA", "BRONZE", "NENHUM"];

const TIER_LABELS: Record<string, string> = {
  NENHUM: "Sem nível",
  BRONZE: "Bronze",
  PRATA: "Prata",
  OURO: "Ouro",
  DIAMANTE: "Diamante",
};

function RecompensasInstitucional() {
  const { usuario } = useAuth();
  const [recompensas, setRecompensas] = useState<ViewRecompensaDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuario?.id) return;
    axiosInstance
      .get<ViewRecompensaDTO[]>(`/evento/recompensas/${usuario.id}`)
      .then((res) => setRecompensas(res.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [usuario?.id]);

  const porTier = TIER_ORDER.reduce<Record<string, ViewRecompensaDTO[]>>(
    (acc, tier) => {
      const lista = recompensas.filter(
        (r) => r.tierConta === tier && r.recompensa !== "NULL" && r.recompensa.trim() !== ""
      );
      if (lista.length > 0) acc[tier] = lista;
      return acc;
    },
    {}
  );

  const tiersComRecompensas = TIER_ORDER.filter((t) => porTier[t]);

  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
      <section className="relative">
        <NavBar />

        <div className="w-[800px] items-start mx-auto px-8 py-4 mt-10 bg-[#5E6B3F] rounded-2xl">
          <h1 className="text-4xl font-bold text-left text-white">
            {usuario?.nome ?? "Minha Instituição"}
          </h1>
          <p className="text-base text-white mt-2">
            Acompanhe por aqui todas as recompensas disponibilizadas pela sua instituição.
          </p>
        </div>

        {loading && (
          <p className="text-center mt-12 text-[#C96A3D] font-medium">
            Carregando recompensas...
          </p>
        )}

        {!loading && tiersComRecompensas.length === 0 && (
          <p className="text-center mt-12 text-[#666]">
            Nenhuma recompensa cadastrada ainda. Adicione recompensas ao criar um evento.
          </p>
        )}

        {!loading &&
          tiersComRecompensas.map((tier) => (
            <div key={tier}>
              <h1 className="text-4xl font-bold text-left mx-28 my-4 text-[#C96A3D] mt-10">
                Tier: {TIER_LABELS[tier]}
              </h1>

              <div className="flex flex-wrap gap-6 mx-28 mb-4">
                {porTier[tier].map((r, i) => (
                  <div
                    key={i}
                    className="w-[250px] bg-[#E2E4DE] rounded-2xl overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={r.imagem ?? garrafas}
                        alt="Recompensa"
                        className="w-full h-[160px] object-cover rounded-t-2xl"
                      />
                      <span className="absolute top-4 right-4 bg-[#D9DDD5] px-4 py-1 rounded-full text-sm text-[#004C5C] font-medium">
                        {TIER_LABELS[tier]}
                      </span>
                    </div>
                    <div className="px-3 py-4">
                      <h2 className="text-[#004C5C] font-bold text-lg leading-none">
                        {r.titulo}
                      </h2>
                      <p className="text-[#004C5C] font-bold text-sm leading-5 mt-3">
                        {r.recompensa}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </section>

      <Footer />
    </main>
  );
}

export default RecompensasInstitucional;
