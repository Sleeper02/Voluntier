/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import NavBar from "../../components/navbar";
import ondas from "../../assets/ondas.png";
import { MapPin, Calendar, AlertCircle } from "lucide-react";
import Footer from "../../components/footer";
import medico1 from "../../assets/medico1.png";
import medico2 from "../../assets/medico2.png";
import medico3 from "../../assets/medico3.png";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import { useAuth } from "../../context/AuthContext";
import { getInscricaoController } from "../../api/endpoints/inscricao-controller/inscricao-controller";
import axiosInstance from "../../api/axiosInstance";

const api = getInscricaoController(axiosInstance);

type ConflictType = "NONE" | "SAME_DAY" | "SAME_DAY_AND_TIME";

type EventStatus = "ATIVO" | "CANCELADO";

interface Evento {
  id: number;
  titulo: string;
  cidade: string;
  data: string;
  status: EventStatus;
  inscrito: boolean;
  conflictType: ConflictType;
}

function EventoDescricao() {
  const { usuario } = useAuth();

  const [evento, setEvento] = useState<Evento>({
    id: 1,
    titulo: "Pequenos Cuidados",
    cidade: "Presidente Prudente - SP",
    data: "18/04 e 19/04",
    status: "ATIVO",
    inscrito: false,
    conflictType: "NONE",
  });

  const [loading, setLoading] = useState(false);

  const handleSubscription = async () => {
    if (!usuario?.id) {
      alert("Faça login para se inscrever");
      return;
    }

    setLoading(true);
    try {
      if (evento.inscrito) {
        await api.cancelarInscricao(usuario.id, String(evento.id));
        setEvento((prev) => ({ ...prev, inscrito: false, conflictType: "NONE" }));
      } else {
        await api.inscrever(usuario.id, String(evento.id));
        setEvento((prev) => ({ ...prev, inscrito: true }));
      }
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 409) {
        setEvento((prev) => ({ ...prev, conflictType: "SAME_DAY_AND_TIME" }));
      } else {
        alert("Erro ao processar inscrição. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

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
              <span>{evento.cidade}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{evento.data}</span>
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

        <div className="mt-5 max-w-[1150px] space-y-6 text-[17px] leading-[31px] text-[#2F2F2F] 2xl:justify-center 2xl:mx-auto">
          <p className="text-base">
            <span className="font-bold text-2xl">Unimed</span> Área da saúde,
            atendimento infantil.
          </p>

          <p>
            Pequenos Cuidados é um evento voluntário voltado à promoção da saúde
            infantil, que acontecerá nos dias 18 e 19 de abril, em Presidente
            Prudente – SP. A iniciativa é organizada por profissionais e
            parceiros da área da saúde, com o objetivo de oferecer atendimentos
            básicos, orientação preventiva e momentos de acolhimento para
            crianças da comunidade.
          </p>

          <p>
            Se você acredita no impacto de pequenos gestos na vida de alguém,
            esse é o seu lugar. Buscamos voluntários dispostos a contribuir com
            cuidado, atenção e empatia — não é preciso ser da área da saúde,
            apenas ter vontade de ajudar. Participar é fazer parte de uma ação
            que pode transformar o presente e o futuro de muitas crianças.
          </p>
        </div>

        {/* ALERTAS */}

        <div className="max-w-[1150px] mx-auto mt-8 space-y-4">
          {evento.status === "CANCELADO" && (
            <Alert
              className="border-red-500 bg-red-50 text-red-900"
              variant="destructive"
            >
              <AlertCircle className="h-5 w-5" />
              <div>
                <AlertTitle className="">Evento cancelado</AlertTitle>

                <AlertDescription className="">
                  Este evento foi cancelado pelo organizador. Novas inscrições
                  não estão disponíveis.
                </AlertDescription>
              </div>
            </Alert>
          )}

          {evento.conflictType === "SAME_DAY" && (
            <Alert
              className="border-yellow-500 bg-yellow-50 text-yellow-900"
              variant="default"
            >
              <AlertCircle className="h-5 w-5" />
              <div>
                <AlertTitle className="">Atenção</AlertTitle>

                <AlertDescription className="">
                  Você já possui um evento nesse mesmo dia.
                </AlertDescription>
              </div>
            </Alert>
          )}

          {evento.conflictType === "SAME_DAY_AND_TIME" && (
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

        <div className="flex justify-center mt-8">
          <Button
            onClick={handleSubscription}
            disabled={
              loading ||
              evento.conflictType === "SAME_DAY_AND_TIME" ||
              evento.status === "CANCELADO"
            }
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
            {evento.status === "CANCELADO"
              ? "Evento cancelado"
              : loading
                ? "Processando..."
                : evento.inscrito
                  ? "Cancelar inscrição"
                  : "Inscreva-se"}
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default EventoDescricao;
