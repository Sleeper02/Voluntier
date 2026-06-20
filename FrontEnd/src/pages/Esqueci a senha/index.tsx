import { Link } from "react-router-dom";
import cadastroBg from "../../assets/cadastro-bg.png";

function ForgotPassword() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${cadastroBg})`,
      }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px]" />

      {/* Card */}
      <div className="relative z-10 w-[420px] h-[440px] bg-[#F8F3EE]/95 rounded-[28px] shadow-2xl flex flex-col items-center justify-center px-10">
        {/* Logo */}
        <div className="w-full mb-20">
          <a href="/home" className="text-xl font-bold text-[#C46F3C]">Voluntier.</a>
        </div>

        {/* Conteúdo */}
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold text-[#C46F3C] leading-none">
            esqueceu sua senha?
          </h1>

          <p className="text-[#6F625B] text-sm mt-2">
            iremos enviar um e-mail para definir uma nova senha
          </p>

          <form className="mt-10">
            <div className="text-left">
              <label className="block text-xs font-semibold text-[#C46F3C] mb-1">
                Email
              </label>

              <input
                type="email"
                placeholder="Escreva seu email"
                className="w-full h-10 rounded-md border border-[#B8AAA0] bg-transparent px-3 text-sm outline-none focus:border-[#C46F3C]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-10 mt-6 rounded-md bg-[#C46F3C] text-white font-semibold text-sm transition-all duration-300 hover:opacity-90"
            >
              Enviar
            </button>

            <Link
              to="/login"
              className="block mt-4 text-xs text-[#5D524D] hover:underline"
            >
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
