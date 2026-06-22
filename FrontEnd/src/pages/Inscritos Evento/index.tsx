import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import ondasblue from "../../assets/ondasblue.png";
import axiosInstance from "../../api/axiosInstance";

interface InscritoDTO {
  id: string;
  nome: string;
  tier: string;
  pontos: number;
}

interface EventoInfo {
  titulo: string;
  localizacao?: string;
  dataHora?: string;
}

const TIER_LABEL: Record<string, string> = {
  NENHUM: "Sem nível",
  BRONZE: "Bronze",
  PRATA: "Prata",
  OURO: "Ouro",
  DIAMANTE: "Diamante",
};

const TIER_STYLE: Record<string, string> = {
  NENHUM: "bg-gray-200 text-gray-600",
  BRONZE: "bg-amber-100 text-amber-800",
  PRATA: "bg-slate-200 text-slate-700",
  OURO: "bg-yellow-100 text-yellow-800",
  DIAMANTE: "bg-cyan-100 text-cyan-800",
};

function InscritosEvento() {
  const { id: idEvento } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [inscritos, setInscritos] = useState<InscritoDTO[]>([]);
  const [evento, setEvento] = useState<EventoInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmando, setConfirmando] = useState<InscritoDTO | null>(null);
  const [bloqueando, setBloqueando] = useState(false);

  useEffect(() => {
    if (!idEvento) return;

    Promise.all([
      axiosInstance.get<EventoInfo>(`/evento/${idEvento}`),
      axiosInstance.get<InscritoDTO[]>(`/inscrever/evento/${idEvento}`),
    ])
      .then(([eventoRes, inscritosRes]) => {
        setEvento(eventoRes.data);
        setInscritos(inscritosRes.data ?? []);
      })
      .catch(() => toast.error("Erro ao carregar inscritos."))
      .finally(() => setLoading(false));
  }, [idEvento]);

  async function confirmarBloqueio() {
    if (!confirmando || !idEvento) return;
    setBloqueando(true);
    try {
      await axiosInstance.delete(`/inscrever/bloquear/${confirmando.id}/${idEvento}`);
      setInscritos((prev) => prev.filter((i) => i.id !== confirmando.id));
      toast.success(`${confirmando.nome} foi bloqueado deste evento.`);
    } catch {
      toast.error("Erro ao bloquear voluntário.");
    } finally {
      setBloqueando(false);
      setConfirmando(null);
    }
  }

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

      {/* Header */}
      <section className="relative">
        <img
          src={ondasblue}
          alt="Onda"
          className="w-full h-auto object-cover mt-10"
        />
        <div className="absolute inset-0 flex flex-col justify-center pl-14 mt-10">
          <button
            onClick={() => navigate(-1)}
            className="text-white text-sm font-medium underline w-fit mb-2 opacity-80 hover:opacity-100"
          >
            ← Voltar
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {evento?.titulo ?? "Inscritos"}
          </h1>
          {dataFormatada && (
            <p className="text-white text-sm mt-1 opacity-80">{dataFormatada}</p>
          )}
        </div>
      </section>

      {/* Contagem */}
      <section className="mx-10 mt-8">
        <p className="text-[#3E6F73] font-semibold text-lg">
          {inscritos.length} voluntário{inscritos.length !== 1 ? "s" : ""} inscrito{inscritos.length !== 1 ? "s" : ""}
        </p>
      </section>

      {/* Lista */}
      <section className="mx-10 mt-4 mb-16 flex flex-col gap-4">
        {loading && (
          <p className="text-center text-[#C96A3D] py-10">Carregando...</p>
        )}

        {!loading && inscritos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="text-[#666] text-lg">Nenhum voluntário inscrito ainda.</p>
          </div>
        )}

        {inscritos.map((inscrito) => (
          <div
            key={inscrito.id}
            className="flex items-center justify-between bg-white rounded-2xl px-6 py-5 shadow-sm border border-[#E8E1E1]"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-[#0D434E] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {inscrito.nome.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-semibold text-[#2C2C2C] text-base leading-tight">
                  {inscrito.nome}
                </p>
                <p className="text-[#666] text-sm mt-0.5">
                  {inscrito.pontos} ponto{inscrito.pontos !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${TIER_STYLE[inscrito.tier] ?? TIER_STYLE.NENHUM}`}
              >
                {TIER_LABEL[inscrito.tier] ?? inscrito.tier}
              </span>

              <button
                onClick={() => setConfirmando(inscrito)}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm font-semibold hover:bg-red-100 transition"
              >
                Bloquear
              </button>
            </div>
          </div>
        ))}
      </section>

      <Footer />

      {/* Modal de confirmação */}
      {confirmando && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl">
            <h2 className="text-xl font-bold text-[#2C2C2C] mb-2">
              Bloquear voluntário?
            </h2>
            <p className="text-[#666] text-sm mb-6">
              <strong>{confirmando.nome}</strong> será removido deste evento e não
              poderá se inscrever novamente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmando(null)}
                disabled={bloqueando}
                className="flex-1 py-3 rounded-xl border border-[#D8D8D8] text-[#444] font-semibold text-sm hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarBloqueio}
                disabled={bloqueando}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition disabled:opacity-50"
              >
                {bloqueando ? "Bloqueando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default InscritosEvento;
