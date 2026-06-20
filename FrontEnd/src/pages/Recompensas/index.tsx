import trophy from "../../assets/trophy.png";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import garrafas from "../../assets/garrafas.png";

function Recompensas() {
  const user = {
    name: "usuário",
    points: 21192,
    level: "OURO",
  };
  const currentPoints = 21192;
  const nextLevelPoints = 22000;
  const progress = (currentPoints / nextLevelPoints) * 100;
  return (
    <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">
      <section className="relative">
        <NavBar />
        <h1 className="text-4xl font-bold text-left mx-28 my-4 text-[#2C2C2C]">
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
              <div className="mt-6 w-[320px]">
                <div className="w-full h-4 bg-[#D9D9D9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#009951] rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
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
        <h1 className="text-4xl font-bold text-left mx-28 my-4 text-[#C96A3D] mt-10">
          Recompensas Disponíveis
        </h1>
        <div className="flex items-center justify-center mx-auto gap-6 mt-8 mb-12">
          <div className="w-[250px] bg-[#E2E4DE] rounded-2xl overflow-hidden">
            <div className="relative">
              <img
                src={garrafas}
                alt="Garrafas"
                className="w-full h-auto object-cover rounded-t-2xl"
              />

              <span className="absolute top-4 right-4 bg-[#D9DDD5] px-4 py-1 rounded-full text-sm text-[#004C5C] font-medium">
                TIER: OURO
              </span>
            </div>
            <div className="px-3 py-4">
              <h2 className="text-[#004C5C] font-bold text-lg leading-none">
                Unimed
              </h2>

              <p className="text-black font-medium text-sm leading-none mb-5">
                Pequenos Cuidados
              </p>

              <p className="text-[#004C5C] font-bold text-sm leading-5 mb-4">
                kit com garrafa, bloco de notas e material de orientação.
              </p>
              <button className="w-[100px] block mx-auto bg-[#F5F5F5] rounded-full py-1 text-sm font-medium shadow-sm">
                Resgatar
              </button>
            </div>
          </div>
          <div className="w-[250px] bg-[#E2E4DE] rounded-2xl overflow-hidden">
            <div className="relative">
              <img
                src={garrafas}
                alt="Garrafas"
                className="w-full h-auto object-cover rounded-t-2xl "
              />

              <span className="absolute top-4 right-4 bg-[#D9DDD5] px-4 py-1 rounded-full text-sm text-[#004C5C] font-medium">
                TIER: OURO
              </span>
            </div>
            <div className="px-3 py-4">
              <h2 className="text-[#004C5C] font-bold text-lg leading-none">
                Unimed
              </h2>

              <p className="text-black font-medium text-sm leading-none mb-5">
                Pequenos Cuidados
              </p>

              <p className="text-[#004C5C] font-bold text-sm leading-5 mb-4">
                kit com garrafa, bloco de notas e material de orientação.
              </p>
              <button className="w-[100px] block mx-auto bg-[#F5F5F5] rounded-full py-1 text-sm font-medium shadow-sm">
                Resgatar
              </button>
            </div>
          </div>
          <div className="w-[250px] bg-[#E2E4DE] rounded-2xl overflow-hidden">
            <div className="relative">
              <img
                src={garrafas}
                alt="Garrafas"
                className="w-full h-auto object-cover rounded-t-2xl "
              />

              <span className="absolute top-4 right-4 bg-[#D9DDD5] px-4 py-1 rounded-full text-sm text-[#004C5C] font-medium">
                TIER: OURO
              </span>
            </div>
            <div className="px-3 py-4">
              <h2 className="text-[#004C5C] font-bold text-lg leading-none">
                Unimed
              </h2>

              <p className="text-black font-medium text-sm leading-none mb-5">
                Pequenos Cuidados
              </p>

              <p className="text-[#004C5C] font-bold text-sm leading-5 mb-4">
                kit com garrafa, bloco de notas e material de orientação.
              </p>
              <button className="w-[100px] block mx-auto bg-[#F5F5F5] rounded-full py-1 text-sm font-medium shadow-sm">
                Resgatar
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
export default Recompensas;
