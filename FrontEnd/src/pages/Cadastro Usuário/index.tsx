import { useState } from "react";
import { Link } from "react-router-dom";

import cadastroBg from "../../assets/cadastro-bg.png";
import paint from "../../assets/paint.png";

function CadastroUsuario() {
  const [step, setStep] = useState(1);

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${cadastroBg})` }}
    >
      <div className="relative h-[500px] w-[760px] bg-[#FFFAF2] rounded-[32px] overflow-hidden">
        {/* formulario pt1 e pt2 */}
        <div className="absolute inset-0 flex">
          {/* STEP 1 */}
          <div
            className={`
                            w-1/2 h-full flex items-center justify-center px-10
                            transition-all duration-700 ease-in-out
                            ${step === 1 ? "translate-x-0 opacity-100" : "-translate-x-[60px] opacity-0 pointer-events-none"}
                        `}
          >
            <div className="w-full">
              <div className="space-y-0">
                <h1 className="text-[38px] font-bold text-[#C46F3C] leading-tight">
                  Bem-vindo!
                </h1>

                <p className="text-sm">Por favor preencha suas informações.</p>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#C46F3C] mb-1">
                    Nome Completo
                  </label>

                  <input
                    className="w-full rounded-md border border-[#8d7f75] bg-transparent px-3 py-1.5 text-sm outline-none"
                    placeholder="Digite seu nome e sobrenome"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#C46F3C] mb-1">
                    CPF
                  </label>

                  <input
                    className="w-full rounded-md border border-[#8d7f75] bg-transparent px-3 py-1.5 text-sm outline-none"
                    placeholder="Digite seu CPF"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#C46F3C] mb-1">
                    Telefone
                  </label>

                  <input
                    className="w-full rounded-md border border-[#8d7f75] bg-transparent px-3 py-1.5 text-sm outline-none"
                    placeholder="Digite seu telefone"
                    type="text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C46F3C] mb-1">
                    Data de nascimento
                  </label>

                  <input
                    className="w-full rounded-md border border-[#8d7f75] text-[#8B95A7] bg-transparent px-3 py-1.5 text-sm outline-none"
                    type="date"
                  />
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full rounded-md bg-[#c46f3c] py-2 text-sm font-semibold text-white mt-2 transition-all duration-300 hover:opacity-90"
                  type="button"
                >
                  Continuar
                </button>
                <p className="mt-4 text-center text-xs">
                  Já tem uma conta?{" "}
                  <Link
                    to="/login"
                    className="font-semibold transition-all duration-300 hover:opacity-70 hover:translate-x-1"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div
            className={`
                            w-1/2 h-full flex items-center justify-center px-10
                            transition-all duration-700 ease-in-out
                            ${step === 2 ? "translate-x-0 opacity-100" : "translate-x-[60px] opacity-0 pointer-events-none"}
                        `}
          >
            <div className="w-full">
              <div className="space-y-0">
                <h1 className="text-[38px] font-bold text-[#C46F3C] leading-tight">
                  Novo por aqui?
                </h1>

                <p className="text-sm">Por favor preencha suas informações.</p>
              </div>

              <form className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#C46F3C] mb-1">
                    Email
                  </label>

                  <input
                    className="w-full rounded-md border border-[#8d7f75] bg-transparent px-3 py-1.5 text-sm outline-none"
                    placeholder="Escreva seu email"
                    type="email"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C46F3C] mb-1">
                    Senha
                  </label>

                  <input
                    className="w-full rounded-md border border-[#8d7f75] bg-transparent px-3 py-1.5 text-sm outline-none"
                    placeholder="Digite sua senha"
                    type="password"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C46F3C] mb-1">
                    Confirmar Senha
                  </label>

                  <input
                    className="w-full rounded-md border border-[#8d7f75] bg-transparent px-3 py-1.5 text-sm outline-none"
                    placeholder="Confirme sua senha"
                    type="password"
                  />
                </div>

                <button
                  className="w-full rounded-md bg-[#c46f3c] py-2 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
                  type="submit"
                >
                  Sign up
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="w-full rounded-md border border-[#8d7f75] py-2 text-sm font-medium text-[#5D524D] transition-all duration-300 hover:bg-[#f2e6da]"
                  type="button"
                >
                  Voltar
                </button>

                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 h-3 w-3" />

                  <p className="text-[10px] leading-4 text-[#5D524D]">
                    Concordo com a Política de privacidade e os Termos de uso da
                    Voluntier
                  </p>
                </div>

                <p className="mt-4 text-center text-xs">
                  Já tem uma conta?{" "}
                  <Link
                    to="/login"
                    className="font-semibold transition-all duration-300 hover:opacity-70 hover:translate-x-1"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* PAINEL */}
        <div
          className={`
                    absolute top-2 bottom-2 w-[372px] rounded-[30px]
                    bg-cover bg-center bg-no-repeat p-8 text-white z-20
                    transition-all duration-700 ease-in-out
                    ${step === 1 ? "left-[378px]" : "left-2"}
                    `}
          style={{ backgroundImage: `url(${paint})` }}
        >
          <div className="h-full flex flex-col justify-between">
            <div
              className={`
                                transition-all duration-500
                                ${step === 1 ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"}
                            `}
            >
              <a className="text-xl font-bold" href="/home">
                Voluntier.
              </a>
            </div>

            <div
              className={`
                                transition-all duration-700 delay-100
                                ${step === 1 ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"}
                            `}
            >
              <h1 className="text-[36px] font-bold leading-[30px]">
                sua jornada de voluntariado começa aqui!
              </h1>

              <p className="mt-4 text-sm">
                Crie sua conta agora e comece com projetos que façam sentido
                para você.
              </p>

              <p className="mt-4 text-sm">Sua próxima collab começa aqui :)</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CadastroUsuario;
