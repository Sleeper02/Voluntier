import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import GridRecompensas from "../../components/gridrecompensas";
import garrafas from "../../assets/garrafas.png";

function RecompensasInstitucional() {
  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
      <section className="relative">
        <NavBar />
        <div className="w-[800px] items-start mx-auto px-8 py-4 mt-10 bg-[#5E6B3F] rounded-2xl">
        <h1 className="text-4xl font-bold text-left text-[#ffffff]">
          Unimed
        </h1>
        <p className="text-base text-[#ffffff] mt-2">
          Acompanhe por aqui todas as recompensas disponibilizadas pela sua instituição.
        </p>
        </div>
        <h1 className="text-4xl font-bold text-left mx-28 my-4 text-[#C96A3D] mt-10">
          Tier: Ouro
        </h1>
        <GridRecompensas />
        <h1 className="text-4xl font-bold text-left mx-28 my-4 text-[#C96A3D] mt-10">
          Tier: Prata
        </h1>
        <GridRecompensas />
        <h1 className="text-4xl font-bold text-left mx-28 my-4 text-[#C96A3D] mt-10">
          Tier: Bronze
        </h1>
        <GridRecompensas />
      </section>
      <Footer />
    </main>
  );
}
export default RecompensasInstitucional;
