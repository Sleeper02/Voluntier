import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MainNavBar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <nav className="relative bg-[#FFFAF2] h-[80px] flex items-center border-t-[12px] border-[#C96A3D] px-8">
      {/* Logo esquerda */}
      <a className="text-2xl font-bold text-black" href="/home">
        Voluntier
      </a>

      {/* Menu central */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">
        <Link
          to="/home"
          className="font-medium text-sm text-black hover:text-gray-800 transition-colors duration-300"
        >
          Home
        </Link>

        <Link
          to="/eventos"
          className="font-medium text-sm text-black hover:text-gray-800 transition-colors duration-300"
        >
          Eventos
        </Link>

        {usuario?.perfil === "VOLUNTARIO" && (
          <>
            <Link
              to="/ranking"
              className="font-medium text-sm text-black hover:text-gray-800 transition-colors duration-300"
            >
              Ranking
            </Link>

            <Link
              to="/eventosinscritos"
              className="font-medium text-sm text-black hover:text-gray-800 transition-colors duration-300"
            >
              Meus Eventos
            </Link>
          </>
        )}

        {usuario?.perfil === "INSTITUICAO" && (
          <>
            <Link
              to="/eventoscriados"
              className="font-medium text-sm text-black hover:text-gray-800 transition-colors duration-300"
            >
              Eventos Criados
            </Link>

            <Link
              to="/cadastrarevento"
              className="font-medium text-sm text-black hover:text-gray-800 transition-colors duration-300"
            >
              Criar Evento
            </Link>
          </>
        )}
      </div>

      {/* Botões de Login e Cadastro */}
      <div className="ml-auto flex items-center gap-2">
        {!usuario ? (
          <>
            <Link
              to="/login"
              className="rounded-full border-[#7A6A5F] px-5 py-2 text-base font-medium text-black"
            >
              Login
            </Link>

            <Link
              to="/acesso"
              className="rounded-full bg-[#C96A3D] px-6 py-2 text-base font-medium text-white"
            >
              Cadastre-se
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm font-medium">Olá, {usuario.nome}</span>

            <button
              onClick={handleLogout}
              className="rounded-full bg-[#C96A3D] px-6 py-2 text-base font-medium text-white"
            >
              Sair
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default MainNavBar;
