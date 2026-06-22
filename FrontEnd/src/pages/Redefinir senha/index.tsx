import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import cadastroBg from "../../assets/cadastro-bg.png";

function RedefinirSenha() {
  const navigate = useNavigate();

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!novaSenha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (novaSenha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setErro("");

    toast.success("Senha alterada com sucesso!");
    setNovaSenha("");
    setConfirmarSenha("");

    // Redireciona para login
    navigate("/login");
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${cadastroBg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px]" />

      {/* Card */}
      <div className="relative z-10 w-[420px] h-[530px] bg-[#F8F3EE]/95 rounded-[28px] shadow-2xl flex flex-col items-center justify-center px-10">
        {/* Logo */}
        <div className="w-full mb-20">
          <a href="/home" className="text-xl font-bold text-[#C46F3C]">
            Voluntier.
          </a>
        </div>

        {/* Conteúdo */}
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold text-[#C46F3C] leading-none">
            redefinir senha
          </h1>

          <p className="text-[#6F625B] text-sm mt-2">
            redefina sua senha em duas etapas.
          </p>

          <form onSubmit={handleSubmit} className="mt-10">
            <div className="text-left">
              <label className="block text-xs font-semibold text-[#C46F3C] mb-1">
                Nova senha
              </label>

              <input
                type="password"
                placeholder="Digite sua nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className="w-full h-10 rounded-md border border-[#B8AAA0] bg-transparent px-3 text-sm outline-none focus:border-[#C46F3C]"
              />
            </div>

            <div className="text-left mt-8">
              <label className="block text-xs font-semibold text-[#C46F3C] mb-1">
                Confirmar nova senha
              </label>

              <input
                type="password"
                placeholder="Digite novamente sua senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full h-10 rounded-md border border-[#B8AAA0] bg-transparent px-3 text-sm outline-none focus:border-[#C46F3C]"
              />
            </div>

            {/* Erro */}
            {erro && (
              <p className="mt-3 text-left text-xs text-red-500">{erro}</p>
            )}

            <button
              type="submit"
              className="w-full h-10 mt-6 rounded-md bg-[#C46F3C] text-white font-semibold text-sm transition-all duration-300 hover:opacity-90"
            >
              Alterar senha
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

export default RedefinirSenha;
