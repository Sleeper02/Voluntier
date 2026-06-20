import garrafas from "../assets/garrafas.png";

function GridRecompensas() {
  return (
    <div className="flex items-center justify-center mx-auto gap-6 mt-8 mb-12">
      <div className="w-[250px] bg-[#E2E4DE] rounded-2xl overflow-hidden">
        <div className="relative">
          <img
            src={garrafas}
            alt="Garrafas"
            className="w-full h-auto object-cover rounded-t-2xl"
          />
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
  );
}

export default GridRecompensas;
