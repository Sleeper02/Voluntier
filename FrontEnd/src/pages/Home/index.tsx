import { useEffect, useState } from "react";
import MainNavBar from "../../components/mainnavbar";
import medico1 from "../../assets/medico1.png";
import GridEventos from "../../components/grideventos";
import Footer from "../../components/footer";

import voluntier from "../../assets/voluntier.png";
import bannerhome from "../../assets/bannerhome.png";

import ondaslaranjas from "../../assets/ondaslaranjas.png";
import ondascoloridas from "../../assets/ondascoloridas.png";
import { Search, UserPlus, HeartHandshake } from "lucide-react";
import { getEventoController } from "../../api/endpoints/evento-controller/evento-controller";
import axiosInstance from "../../api/axiosInstance";

const api = getEventoController(axiosInstance);

interface ListagemEventoDTO {
  id: string;
  titulo: string;
  descricao: string;
  fotos?: string[];
}

function Home() {
  const [eventos, setEventos] = useState<{ id: string; nome: string; descricao: string; imagem: string }[]>([]);

  useEffect(() => {
    api.listarEvento({}).then((res) => {
      const dados = res.data as unknown as ListagemEventoDTO[];
      setEventos(
        dados.map((e) => ({
          id: e.id,
          nome: e.titulo,
          descricao: e.descricao,
          imagem: e.fotos?.[0] ?? medico1,
        }))
      );
    }).catch(() => {});
  }, []);

  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
      <section>
        <MainNavBar />

        {/* BANNER PRINCIPAL */}
        {/* HERO */}
        <section className="relative mt-8">
          {/* ONDAS ATRÁS */}
          <img
            src={ondaslaranjas}
            alt="Ondas"
            className="
            absolute
            -bottom-16
            right-0
            w-[80%]
            h-auto
            pointer-events-none
        "
          />

          {/* BANNER */}
          <div className="relative z-10 px-4 md:px-6 lg:px-8">
            <div
              className="
        max-w-[1150px]
        mx-auto
        bg-[#66764A]
        rounded-[22px]
        px-6
        md:px-8
        py-8
        flex
        flex-col
        lg:flex-row
        items-center
        justify-between
        gap-8
      "
            >
              <div className="max-w-[480px]">
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  venha ser um voluntier!
                </h1>

                <p className="text-white mt-5 text-base md:text-lg font-medium leading-7">
                  Transforme o seu desejo de contribuir com sua comunidade em
                  ações que impactam vidas. Vem pro voluntier!
                </p>
              </div>

              <img
                src={voluntier}
                alt="Voluntários"
                className="
          w-full
          max-w-[420px]
          rounded-xl
          object-cover
        "
              />
            </div>
          </div>
        </section>

        {/* EVENTOS */}
        <div className="max-w-[1150px] mx-auto px-4">
          <h1
            className="
              text-3xl
              md:text-4xl
              font-bold
              text-[#C96A3D]
              mt-14
              mb-4
            "
          >
            eventos
          </h1>
        </div>

        <GridEventos eventos={eventos} />

        {/* COMO FUNCIONA */}
        <section className="relative py-16">
          <img
            src={ondascoloridas}
            alt="Ondas Coloridas"
            className="
              absolute
              inset-0
              w-full
              h-auto
              object-cover
              pointer-events-none
              mt-24
            "
          />

          <div className="relative z-10">
            <div className="max-w-[1150px] mx-auto px-4">
              <h1
                className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  text-right
                  text-[#66764A]
                  mb-10
                "
              >
                como funciona
              </h1>

              <div
                className="
                  grid
                  md:grid-cols-3
                  gap-6
                "
              >
                {/* CARD 1 */}
                <div
                  className="
                    bg-[#78949B]
                    rounded-[24px]
                    p-7
                    text-white
                    min-h-[280px]
                    flex
                    flex-col
                    justify-between
                    shadow-lg
                  "
                >
                  <div>
                    <div className="text-3xl mb-5">
                      <Search size={42} strokeWidth={2.5} />
                    </div>

                    <h2 className="text-2xl font-bold">busque por eventos</h2>

                    <p className="mt-5 text-sm leading-6">
                      Descubra eventos e ações voluntárias perto de você.
                      Escolha causas alinhadas aos seus interesses e participe
                      quando quiser.
                    </p>
                  </div>
                  <a href="/eventos">
                    <button
                      className="
                      self-end
                      bg-white/20
                      hover:bg-white/30
                      transition
                      px-5
                      py-2
                      rounded-full
                      font-semibold
                    "
                    >
                      Participar →
                    </button>
                  </a>
                </div>

                {/* CARD 2 */}
                <div
                  className="
                    bg-[#D98A78]
                    rounded-[24px]
                    p-7
                    text-white
                    min-h-[280px]
                    flex
                    flex-col
                    justify-between
                    shadow-lg
                  "
                >
                  <div>
                    <div className="text-3xl mb-5">
                      <UserPlus size={42} strokeWidth={2.5} />
                    </div>

                    <h2 className="text-2xl font-bold">
                      se torne um voluntário
                    </h2>

                    <p className="mt-5 text-sm leading-6">
                      Crie sua conta gratuitamente e encontre oportunidades
                      alinhadas ao seu perfil.
                    </p>
                  </div>
                  <a href="/eventos">
                    <button
                      className="
                      self-end
                      bg-white/20
                      hover:bg-white/30
                      transition
                      px-5
                      py-2
                      rounded-full
                      font-semibold
                    "
                    >
                      Participar →
                    </button>
                  </a>
                </div>

                {/* CARD 3 */}
                <div
                  className="
                    bg-[#9B8067]
                    rounded-[24px]
                    p-7
                    text-white
                    min-h-[280px]
                    flex
                    flex-col
                    justify-between
                    shadow-lg
                  "
                >
                  <div>
                    <div className="text-3xl mb-5">
                      <HeartHandshake size={42} strokeWidth={2.5} />
                    </div>

                    <h2 className="text-2xl font-bold">
                      contribua com a sociedade
                    </h2>

                    <p className="mt-5 text-sm leading-6">
                      Faça parte de iniciativas que geram impacto real e
                      transformam comunidades através do voluntariado.
                    </p>
                  </div>
                  <a href="/eventos">
                    <button
                      className="
                      self-end
                      bg-white/20
                      hover:bg-white/30
                      transition
                      px-5
                      py-2
                      rounded-full
                      font-semibold
                    "
                    >
                      Participar →
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BANNER FINAL */}
        <div className="px-4 md:px-6 lg:px-8 mt-10 mb-14">
          <img
            src={bannerhome}
            alt="Banner Home"
            className="
              w-full
              max-w-[800px]
              mx-auto
              rounded-[24px]
              object-cover
            "
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Home;
