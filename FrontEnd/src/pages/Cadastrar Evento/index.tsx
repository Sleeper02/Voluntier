import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LinhaSuperior from "../../components/linhasuperior";
import Footer from "../../components/footer";
import UploadFotos from "../../components/uploadfotos";
import { useAuth } from "../../context/AuthContext";
import { getEventoController } from "../../api/endpoints/evento-controller/evento-controller";
import axiosInstance from "../../api/axiosInstance";
import { CadastroEventoDTOAreaAtuacao } from "../../api/model";

const api = getEventoController(axiosInstance);

const CATEGORIAS: { label: string; value: CadastroEventoDTOAreaAtuacao }[] = [
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

const TIERS = ["BRONZE", "PRATA", "OURO", "DIAMANTE"] as const;

function CadastrarEvento() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [lotacao, setLotacao] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [areaAtuacao, setAreaAtuacao] = useState<CadastroEventoDTOAreaAtuacao | "">("");
  const [fotos, setFotos] = useState<string[]>([]);
  const [recompensas, setRecompensas] = useState<Record<string, string>>({
    BRONZE: "",
    PRATA: "",
    OURO: "",
    DIAMANTE: "",
  });
  const [recompensasImagens, setRecompensasImagens] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function setRecompensa(tier: string, valor: string) {
    setRecompensas((prev) => ({ ...prev, [tier]: valor }));
  }

  function handleImagemRecompensa(tier: string, file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setRecompensasImagens((prev) => ({ ...prev, [tier]: base64 }));
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    if (!titulo || !descricao || !lotacao || !data || !horario || !localizacao || !areaAtuacao) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const dataHora = `${data}T${horario}:00`;

    const recompensasEnvio: Record<string, string> = {};
    for (const tier of TIERS) {
      if (recompensas[tier].trim()) {
        recompensasEnvio[tier] = recompensas[tier].trim();
      }
    }

    const imagensEnvio: Record<string, string> = {};
    for (const tier of TIERS) {
      if (recompensasImagens[tier]) {
        imagensEnvio[tier] = recompensasImagens[tier];
      }
    }

    setLoading(true);
    try {
      await api.criarEvento({
        titulo,
        descricao,
        lotacao: Number(lotacao),
        dataHora,
        localizacao,
        areaAtuacao,
        idInstituicao: usuario?.id,
        fotos: fotos.length > 0 ? fotos : undefined,
        recompensas: Object.keys(recompensasEnvio).length > 0 ? recompensasEnvio : undefined,
        recompensasImagens: Object.keys(imagensEnvio).length > 0 ? imagensEnvio : undefined,
      });
      toast.success("Evento criado com sucesso!");
      navigate("/eventoscriados");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: string } })?.response?.data ??
        "Erro ao criar evento";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[#FFFAF2]">
      <LinhaSuperior />

      <div>
        <div>
          <h1 className="text-[#2D2D2D] text-[32px] font-bold px-8 mt-3">
            Cadastrar evento
          </h1>

          <p className="text-[#6B6B6B] text-[22px] px-8 leading-tight">
            Você está prestes a criar um evento que faz a diferença.
            Cadastre agora e gere impacto social e ambiental, conectando
            pessoas e inspirando mudanças positivas.
          </p>
        </div>

        <div className="mt-6 space-y-5 px-8 pb-6">
          <div>
            <label className="block text-[16px] font-semibold text-black">
              <span className="text-[#C96A3D]">*</span> Nome do Evento
            </label>
            <input
              type="text"
              className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-black">
              <span className="text-[#C96A3D]">*</span> Descrição
            </label>
            <textarea
              rows={3}
              className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none resize-none"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Objetivo, tipo de trabalho, perfil dos voluntários..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[16px] font-semibold text-black">
                <span className="text-[#C96A3D]">*</span> Categoria
              </label>
              <select
                className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                value={areaAtuacao}
                onChange={(e) => setAreaAtuacao(e.target.value as CadastroEventoDTOAreaAtuacao)}
              >
                <option value="">Selecione uma categoria</option>
                {CATEGORIAS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[16px] font-semibold text-black">
                <span className="text-[#C96A3D]">*</span> Local
              </label>
              <input
                type="text"
                className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                placeholder="Ex: Rua das Flores, 123 - São Paulo"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-black">
              <span className="text-[#C96A3D]">*</span> Nº máximo de voluntários
            </label>
            <input
              type="number"
              className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
              value={lotacao}
              onChange={(e) => setLotacao(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[16px] font-semibold text-black">
                <span className="text-[#C96A3D]">*</span> Data do evento
              </label>
              <input
                type="date"
                className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[16px] font-semibold text-black">
                <span className="text-[#C96A3D]">*</span> Horário
              </label>
              <input
                type="time"
                className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="px-8 pb-6">
          <UploadFotos onFotosSelecionadas={setFotos} />
        </div>

        {/* RECOMPENSAS */}
        <div className="px-8 pb-8">
          <h2 className="text-[20px] font-bold text-black mb-1">
            Recompensas por nível
          </h2>
          <p className="text-[13px] text-[#6B6B6B] mb-4">
            Opcional. Descreva o que cada nível de voluntário receberá ao participar.
          </p>
          <div className="grid grid-cols-2 gap-5">
            {TIERS.map((tier) => (
              <div key={tier} className="flex flex-col gap-2">
                <label className="block text-[14px] font-semibold text-black">
                  {tier.charAt(0) + tier.slice(1).toLowerCase()}
                </label>
                <input
                  type="text"
                  placeholder={`Descrição da recompensa`}
                  className="w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none text-sm"
                  value={recompensas[tier]}
                  onChange={(e) => setRecompensa(tier, e.target.value)}
                />
                <div className="flex items-center gap-3">
                  {recompensasImagens[tier] ? (
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <img
                        src={recompensasImagens[tier]}
                        alt={`Imagem ${tier}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setRecompensasImagens((p) => { const n = {...p}; delete n[tier]; return n; })}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
                      >×</button>
                    </div>
                  ) : (
                    <label className="cursor-pointer text-sm text-[#5D6F3E] underline">
                      + foto
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImagemRecompensa(tier, e.target.files?.[0] ?? null)}
                      />
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 pb-10 flex justify-center">
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="w-[280px] rounded-2xl bg-[#5D6F3E] py-4 text-[22px] font-bold text-white disabled:opacity-60"
          >
            {loading ? "Cadastrando..." : "cadastrar!"}
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default CadastrarEvento;
