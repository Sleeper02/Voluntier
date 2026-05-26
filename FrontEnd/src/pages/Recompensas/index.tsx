import NavBar from "../../components/navbar";
import trophy from "../../assets/trophy.png";
import Footer from "../../components/footer";

function Recompensas() {
  const user = {
    name: "usuário",
    points: 21192,
    level: "OURO",
  };
  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
      <section className="relative">
        <NavBar />
        <h1 className="text-3xl font-bold text-left mx-28 my-4 text-[#2C2C2C]">
          Olá, {user.name}!
        </h1>
        <div className="w-[800px] flex items-start justify-between mx-auto px-8 py-8 bg-[#0D434E] rounded-2xl text-white">
          <div className="flex flex-col">
            <div className="bg-[#D9A441] px-5 py-2 rounded-xl w-fit">
              <p className="text-base font-bold text-[#2C2C2C] tracking-wide">
                NÍVEL OURO
              </p>
            </div>
            <div className="mt-10">
              <div className="flex items-end gap-2 leading-none">
                <h1 className="text-7xl font-bold">21.192</h1>

                <span className="text-3xl font-semibold mb-1">pontos</span>
              </div>
              <p className="text-base text-[#F2F2F2] font-semibold mt-4">
                faltam 808 pontos para o nível Diamante
              </p>
            </div>
          </div>

          <img
            src={trophy}
            alt="Trophy"
            className="w-[210px] h-auto object-contain"
          />
        </div>
        <div className="flex items-center justify-center mx-auto gap-6 mt-16">
          <div className="w-[250px] h-[350px] bg-[#6C8A8E] rounded-xl" />

          <div className="w-[250px] h-[350px] bg-[#D97B6C] rounded-xl" />

          <div className="w-[250px] h-[350px] bg-[#8B6F5A] rounded-xl" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
export default Recompensas;
