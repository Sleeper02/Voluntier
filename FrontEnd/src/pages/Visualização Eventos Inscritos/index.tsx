import NavBar from "../../components/navbar";
import ondasblue from "../../assets/ondasblue.png";
import dogs from "../../assets/dogs.png";
import Footer from "../../components/footer";
import CardEvento from "../../components/cardevento";

function VisualizacaoEventosInscritos() {
  const eventos = [
    {
      id: 1,
      titulo: "Nome do Evento Sendo Promovido",
      descricao:
        "Aqui vai uma breve descrição do evento, das coisinhas e tal e tal. Você pode falar qual a motivação desse evento e quais impactos são visados.",
      tag: "Tag do Evento",
      endereco: "Av. Celestino Figueiredo, 2039",
      cidade: "Presidente Prudente, SP",
      dataEvento: "2026-06-01T14:30:00",
      imagem: dogs,
    },
    {
      id: 2,
      titulo: "Nome do Evento Sendo Promovido",
      descricao:
        "Aqui vai uma breve descrição do evento, das coisinhas e tal e tal. Você pode falar qual a motivação desse evento e quais impactos são visados.",
      tag: "Tag do Evento",
      endereco: "Av. Celestino Figueiredo, 2039",
      cidade: "Presidente Prudente, SP",
      dataEvento: "2026-06-15T09:00:00",
      imagem: dogs,
    },
    {
      id: 3,
      titulo: "Nome do Evento Sendo Promovido",
      descricao:
        "Aqui vai uma breve descrição do evento, das coisinhas e tal e tal. Você pode falar qual a motivação desse evento e quais impactos são visados.",
      tag: "Tag do Evento",
      endereco: "Av. Celestino Figueiredo, 2039",
      cidade: "Presidente Prudente, SP",
      dataEvento: "2026-07-01T19:00:00",
      imagem: dogs,
    },
  ];
  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
      <NavBar />
      <section className="relative">
        <div className="relative">
          <img
            src={ondasblue}
            alt="Onda Azul"
            className="w-full h-[180px] object-cover mt-10"
          />

          <div className="absolute top-24 left-10">
            <h1 className="text-5xl font-bold text-white">MEUS EVENTOS</h1>
          </div>
        </div>
        <div className="flex gap-2 mx-10 mt-4">
          <p className="bg-[#3E6F73] text-[#FFFAF2] rounded-2xl px-2 py-1 text-sm">
            Próximos Eventos
          </p>
          <p className="bg-transparent border border-[#3E6F73] text-[#3E6F73] rounded-2xl px-2 py-1 text-sm">
            Eventos Concluídos
          </p>
        </div>
        <div className="mx-10 mt-4 flex flex-col gap-6">
          {eventos.map((evento) => (
            <CardEvento key={evento.id} {...evento} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
export default VisualizacaoEventosInscritos;
