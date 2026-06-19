import { Link } from "react-router-dom";
import { useState } from "react";
import cadastroBg from "../../assets/cadastro-bg.png";
import paint from "../../assets/paint.png";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("VOLUNTARIO");

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha email e senha");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Digite um email válido");
      return;
    }

    login({
      id: perfil === "VOLUNTARIO" ? 1 : 2,
      nome: perfil === "VOLUNTARIO" ? "João" : "ONG Amigos",
      perfil,
    });

    navigate("/home");
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${cadastroBg})`,
      }}
    >
      <div className="h-[500px] w-[760px] bg-[#FFFAF2] rounded-[32px] flex overflow-hidden p-2">
        {/* LADO ESQUERDO */}
        <div
          className="w-[380px] h-full rounded-[30px] bg-cover bg-center bg-no-repeat p-8 flex flex-col justify-between text-white"
          style={{
            backgroundImage: `url(${paint})`,
          }}
        >
          <a className="text-xl font-bold" href="/home">
            Voluntier.
          </a>

          <div className="h-full flex flex-col justify-end">
            <h1 className="text-[36px] font-bold leading-[30px]">
              sua jornada de voluntariado começa aqui!
            </h1>

            <p className="mt-4 text-sm">
              Faça seu login agora e se conecte com projetos que façam sentido
              para você.
            </p>

            <p className="mt-4 text-sm">Sua próxima collab começa aqui :)</p>
          </div>
        </div>

        {/* LADO DIREITO */}
        <div className="w-1/2 h-full flex items-center justify-center px-10">
          <div className="w-full">
            <h1 className="text-[38px] font-bold text-[#C46F3C] leading-tight">
              Welcome back!
            </h1>

            <p className="text-sm mb-4">Por favor preencha suas informações.</p>

            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div>
                <label className="block text-xs font-semibold text-[#C46F3C] mb-1">
                  Email
                </label>
                <input
                  className="w-full rounded-md border border-[#8d7f75] bg-transparent px-3 py-1.5 text-sm outline-none"
                  placeholder="Escreva seu email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* SENHA */}
              <div>
                <label className="block text-xs font-semibold text-[#C46F3C] mb-1">
                  Senha
                </label>
                <input
                  className="w-full rounded-md border border-[#8d7f75] bg-transparent px-3 py-1.5 text-sm outline-none"
                  placeholder="Digite sua senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              {/* OPÇÕES */}
              <div className="w-full justify-between flex">
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-0.5 h-3 w-3" />
                  <p className="text-[10px] leading-4 text-[#5D524D]">
                    Lembrar de mim
                  </p>
                </div>

                <Link to="/forgotpassword" className="text-xs font-semibold">
                  Esqueci minha senha
                </Link>
              </div>

              {/* BOTÕES DE PERFIL */}
              <button
                type="submit"
                onClick={() => setPerfil("VOLUNTARIO")}
                className="w-full rounded-md bg-[#c46f3c] py-2 text-sm font-semibold text-white"
              >
                Entrar como Voluntário
              </button>

              <button
                type="submit"
                onClick={() => setPerfil("INSTITUICAO")}
                className="w-full rounded-md bg-[#3E6F73] py-2 text-sm font-semibold text-white mt-2"
              >
                Entrar como Instituição
              </button>

              <p className="mt-4 text-center text-xs">
                Não tem uma conta?{" "}
                <Link
                  to="/cadastro"
                  className="font-semibold transition-all duration-300 hover:opacity-70 hover:translate-x-1"
                >
                  Cadastre-se
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
