import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinhaSuperior from "../../components/linhasuperior";
import Footer from "../../components/footer";
import UploadFotos from "../../components/uploadfotos";
import { useAuth } from "../../context/AuthContext";
import { getEventoController } from "../../api/endpoints/evento-controller/evento-controller";
import axiosInstance from "../../api/axiosInstance";

const api = getEventoController(axiosInstance);

function CadastrarEvento() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [lotacao, setLotacao] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {

    if (!titulo || !descricao || !lotacao || !data || !horario) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const dataHora = `${data}T${horario}:00`;

    setLoading(true);
    try {
      await api.criarEvento({
        titulo,
        descricao,
        lotacao: Number(lotacao),
        dataHora,
        idInstituicao: usuario?.id,
      });
      alert("Evento criado com sucesso!");
      navigate("/eventoscriados");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: string } })?.response?.data ??
        "Erro ao criar evento";
      alert(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[#FFFAF2]">
      <LinhaSuperior />

      <div>
        {/* Instruções sobre cadastrar um evento */}
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

        {/* Formulário de cadastro de evento */}
        <div className="mt-6 space-y-5 px-8 pb-10">
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
            <p className="mt-1 text-[12px] text-[#6B6B6B]">
              (Nome do evento. Ex: Parque Feliz)
            </p>
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-black">
              <span className="text-[#C96A3D]">*</span> Descrição
            </label>
            <input
              type="text"
              className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <p className="mt-1 text-[12px] text-[#6B6B6B]">
              (objetivo da entidade, tipo de trabalho realizado, quem se beneficia, perfil dos voluntários, etc.)
            </p>
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
              <span className="text-[#C96A3D]">*</span> Horário do evento
            </label>

            <input
              type="time"
              className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 space-y-5 px-8 pb-10">
          <UploadFotos />
        </div>

        <div className="mt-4 px-8">
          <p className="text-[18px] font-semibold text-[#6B6B6B] flex justify-center">
            Após o envio, seu evento será avaliado pela nossa equipe. Para mais informações
            acompanhe o e-mail cadastrado na plataforma.
          </p>

          <div className="mt-10 flex justify-center">
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
      </div>

      <Footer />
    </main>
  );
}

export default CadastrarEvento;
