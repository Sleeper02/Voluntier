import { Link } from "react-router-dom";
import cadastroBg from "../../assets/cadastro-bg.png";
import paint from "../../assets/paint.png";

function Acesso() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${cadastroBg})`,
      }}
    >
      {/* Overlay escuro com blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px]" />

      {/* Card principal */}
      <div className="relative z-10 w-[760px] h-[500px] bg-[#F8F3EE]/95 rounded-[32px] flex p-2 shadow-2xl">
        
        {/* Lado esquerdo */}
        <div
          className="w-[45%] h-full rounded-[28px] bg-cover bg-center bg-no-repeat p-6 flex flex-col justify-between text-white"
          style={{
            backgroundImage: `url(${paint})`,
          }}
        >
          {/* Logo */}
          <h2 className="text-[18px] font-bold">
            Voluntier.
          </h2>

          {/* Textos */}
          <div>
            <h1 className="text-[28px] font-bold leading-[32px]">
              seu próximo
              <br />
              voluntariado te
              <br />
              espera!
            </h1>

            <p className="mt-4 text-sm leading-5 max-w-[250px]">
              Faça seu login agora e se conecte com projetos
              que façam sentido para você.
            </p>

            <p className="mt-4 text-sm">
              Sua próxima collab começa aqui :)
            </p>
          </div>
        </div>

        {/* Lado direito */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-[320px] text-center">
            
            <h1 className="text-3xl font-bold text-[#C46F3C] leading-[24px]">
              escolha como
              <br />
              deseja contribuir
            </h1>

            <p className="text-sm text-[#2C2C2C] mt-8 leading-4">
              para você que deseja promover seus
              <br />
              eventos e organizá-los na plataforma
            </p>
            <p className="text-sm text-[#2C2C2C] mt-2 leading-4">• é necessário um CNPJ</p>
            <Link
              to="/cadastro-instituicao"
              className="block w-full mt-4 rounded-md bg-[#C46F3C] py-2 text-xs font-semibold text-white transition hover:opacity-90"
            >
              Instituição
            </Link>

            <p className="text-sm text-[#2C2C2C] mt-8 leading-4">
              para você que deseja fazer parte de
              <br />
              eventos, contribuindo como voluntário
            </p>

            <Link
              to="/cadastro-voluntario"
              className="block w-full mt-4 rounded-md bg-[#C46F3C] py-2 text-xs font-semibold text-white transition hover:opacity-90"
            >
              Voluntário
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Acesso;