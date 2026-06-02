import MainNavBar from "../../components/mainnavbar";
import kid from "../../assets/kid.png";
import eventolegal from "../../assets/eventolegal.png";
import SearchBar from "../../components/searchbar";
import GridEventos from "../../components/grideventos";
import Footer from "../../components/footer";
import EventoLegalBanner from "../../components/eventolegal";

function Eventos() {
  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
      <section className="relative">
        <MainNavBar />
        <div className="relative w-[80%] mx-auto mt-4">
          <img
            src={kid}
            alt="Criança"
            className="w-full h-auto object-cover rounded-xl"
          />
          <div className="absolute bottom-10 left-6">
            <h1 className="text-5xl font-bold text-[#FFFAF2]">
              reforço escolar
            </h1>

            <p className="text-[#FFFAF2] mt-2 max-w-[380px] font-medium text-lg">
              ajude crianças com dificuldades em matérias básicas (leitura,
              matemática).
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <SearchBar placeholder="Busque a categoria" width="50%" />
        </div>
        <h1 className="text-4xl font-bold text-left mx-10 my-4 text-[#C96A3D] mt-10">
          eventos mais acessados
        </h1>
        <GridEventos />
        <h1 className="text-4xl font-bold text-left mx-10 my-4 text-[#C96A3D] mt-10">
          eventos para o próximo mês
        </h1>
        <GridEventos />
        <h1 className="text-4xl font-bold text-left mx-10 my-4 text-[#C96A3D] mt-10">
          eventos hypadosss
        </h1>
        <GridEventos />
        <EventoLegalBanner />
      </section>
      <Footer />
    </main>
  );
}
export default Eventos;
