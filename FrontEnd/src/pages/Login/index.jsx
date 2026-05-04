import { Link } from "react-router-dom"
import cadastroBg from"../../assets/cadastro-bg.png";
import paint from"../../assets/paint.png";

function Login () {

    return (
        <main
            className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
            style={{
                backgroundImage: `url(${cadastroBg})`,
            }}
        >   

            {/*div da caixa bege no meio da página*/}
            <div className="h-[500px] w-[760px] bg-[#FFFAF2] rounded-[32px] flex overflow-hidden p-2">

                {/*div do lado esquerdo (imagem e textos)*/}
                <div 
                    className="w-[380px] h-full rounded-[30px] bg-cover bg-center bg-no-repeat p-8 flex flex-col justify-vetween text-white"
                    style={{
                        backgroundImage: `url(${paint})`
                    }}
                >
                    <h2 className="text-xl font-bold">Voluntier.</h2>

                    <div className="h-full flex flex-col justify-end">
                        <h1 className="text-[36px] font-bold leading-[30px]">
                            sua jornada de voluntariado começa aqui!
                        </h1>

                        <p className="mt-4 text-sm">
                            Crie sua conta agora e comece com projetos que façam sentido para você.
                        </p>

                        <p className="mt-4 text-sm">
                            Sua próxima collab começa aqui :)
                        </p>
                    </div>
                </div>

                {/* div do lado direito (formulário) */}
                <div className="w-1/2 h-full flex items-center justify-center px-10">
                    
                    <div className="w-full">
                        <div className="space-y-0">
                            <h1 className="text-[38px] font-bold text-[#C46F3C] leading-tight">
                            Welcome back!
                            </h1>

                            <p className="text-sm">
                                Por favor preencha suas informações.
                            </p>
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

                            <div className="w-full justify-between flex">
                                <div className="flex items-start gap-2">
                                    <input type="checkbox" className="mt-0.5 h-3 w-3" />
                                    <p className="text-[10px] leading-4 text-[#5D524D]">
                                    Lembrar de mim
                                    </p>
                                </div>

                                <p className="text-center text-xs">
                                <Link to="/cadastro" className="font-semibold">
                                Esqueci minha senha
                                </Link>
                                </p>

                            </div>

                            <button
                                className=" w-full rounded-md bg-[#c46f3c] py-2 text-sm font-semibold text-white"
                                type="submit"
                            >
                                Sign in
                            </button>

                            <p className="mt-4 text-center text-xs">
                                Não tem uma conta?{" "}
                                <Link to="/cadastro" className="font-semibold">
                                Cadastre-se
                                </Link>
                            </p>

                        </form>
                    </div>
                </div>

            </div>

        </main>
    )

}
export default Login