import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import NavBar from "../../components/navbar";
import ondas from "../../assets/ondas.png";
import { MapPin, Calendar, AlertCircle } from "lucide-react";
import Footer from "../../components/footer";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../context/AuthContext";
import { getInscricaoController } from "../../api/endpoints/inscricao-controller/inscricao-controller";
import axiosInstance from "../../api/axiosInstance";

const api = getInscricaoController(axiosInstance);

interface ListagemEventoDTO {
  id: string;
  titulo: string;
  descricao: string;
  dataHora: string;
  localizacao: string;
  idInstituicao: string;
  fotos?: string[];
}

type ConflictType = "NONE" | "SAME_DAY_AND_TIME";

function EventoDescricao() {
  const { id } = useParams<{ id: string }>();
  const { usuario } = useAuth();

  const [evento, setEvento] = useState<ListagemEventoDTO | null>(null);
  const [loadingEvento, setLoadingEvento] = useState(true);
  const [inscrito, setInscrito] = useState(false);
  const [conflictType, setConflictType] = useState<ConflictType>("NONE");
  const [loadingInscricao, setLoadingInscricao] = useState(false);

  useEffect(() => {
    if (!id) return;
    axiosInstance
      .get<ListagemEventoDTO>(`/evento/${id}`)
      .then((res) => setEvento(res.data))
      .finally(() => setLoadingEvento(false));
  }, [id]);

  const handleSubscription = async () => {
    if (!usuario?.id || !id) {
      toast.error("Faça login para se inscrever");
      return;
    }

    setLoadingInscricao(true);
    try {
      if (inscrito) {
        await api.cancelarInscricao(usuario.id, id);
        setInscrito(false);
        setConflictType("NONE");
        toast.info("Inscrição cancelada.");
      } else {
        await api.inscrever(usuario.id, id);
        setInscrito(true);
        toast.success("Inscrição realizada com sucesso!");
      }
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response
        ?.status;
      if (status === 409) {
        setConflictType("SAME_DAY_AND_TIME");
      } else {
        toast.error("Erro ao processar inscrição. Tente novamente.");
      }
    } finally {
      setLoadingInscricao(false);
    }
  };

  if (loadingEvento) {
    return (
      <main className="bg-[#FFFAF2] min-h-screen">
        <NavBar />
        <p className="text-center mt-20 text-[#666]">Carregando evento...</p>
      </main>
    );
  }

  if (!evento) {
    return (
      <main className="bg-[#FFFAF2] min-h-screen">
        <NavBar />
        <p className="text-center mt-20 text-red-500">
          Evento não encontrado.
        </p>
      </main>
    );
  }

  const fotosReais = evento.fotos?.slice(0, 3) ?? [];
  const numFotos = fotosReais.length;

  const dataFormatada = evento.dataHora
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
            {evento.titulo}
          </h1>

          <div className="flex items-center gap-8 mt-3 text-[15px] text-[#444444]">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{evento.localizacao || "Local a definir"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{dataFormatada}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          {numFotos === 0 && (
            <div className="w-full h-[400px] bg-gray-300 rounded-[20px] flex items-center justify-center">
              <p className="text-gray-600">Nenhuma imagem disponível</p>
            </div>
          )}

          {numFotos === 1 && (
            <img
              src={fotosReais[0]}
              alt="Foto do evento"
              className="w-full max-w-[900px] h-[400px] object-cover rounded-[20px]"
            />
          )}

          {numFotos === 2 && (
            <div className="flex gap-3 h-[400px]">
              <img
                src={fotosReais[0]}
                alt="Foto 1"
                className="flex-1 object-cover rounded-[20px]"
              />
              <img
                src={fotosReais[1]}
                alt="Foto 2"
                className="flex-1 object-cover rounded-[20px]"
              />
            </div>
          )}

          {numFotos >= 3 && (
            <div className="flex gap-3 h-[400px]">
              <img
                src={fotosReais[0]}
                alt="Foto principal"
                className="w-[620px] h-full object-cover rounded-[20px]"
              />

              <div className="flex flex-col gap-3">
                <img
                  src={fotosReais[1]}
                  alt="Foto 2"
                  className="w-[260px] h-[194px] object-cover rounded-[20px]"
                />

                <img
                  src={fotosReais[2]}
                  alt="Foto 3"
                  className="w-[260px] h-[194px] object-cover rounded-[20px]"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 max-w-[1150px] space-y-6 text-[17px] leading-[31px] text-[#2F2F2F] 2xl:justify-center 2xl:mx-auto">
          <p>{evento.descricao}</p>
        </div>

        <div className="max-w-[1150px] mx-auto mt-8 space-y-4">
          {conflictType === "SAME_DAY_AND_TIME" && (
            <Alert
              className="border-red-500 bg-red-50 text-red-900"
              variant="destructive"
            >
              <AlertCircle className="h-5 w-5" />
              <div>
                <AlertTitle className="">Conflito de horário</AlertTitle>
                <AlertDescription className="">
                  Você já possui um evento nesse mesmo dia e horário.
                </AlertDescription>
              </div>
            </Alert>
          )}
        </div>

        {usuario?.perfil === "VOLUNTARIO" && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleSubscription}
              disabled={loadingInscricao || conflictType === "SAME_DAY_AND_TIME"}
              className="
                bg-[#C96A3D]
                hover:bg-[#B85F34]
                text-white
                text-[15px]
                font-semibold
                px-16
                py-5
                rounded-[20px]
                transition-all
                duration-300
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loadingInscricao
                ? "Processando..."
                : inscrito
                  ? "Cancelar inscrição"
                  : "Inscreva-se"}
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default EventoDescricao;
