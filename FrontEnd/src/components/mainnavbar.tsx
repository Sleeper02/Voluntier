import { Link } from "react-router-dom";

function MainNavBar () {

    return (
    <nav className="relative bg-[#FFFAF2] h-[80px] flex items-center border-t-[12px] border-[#C96A3D] px-8">

      {/* Logo esquerda */}
      <div className="text-2xl font-bold text-black">
        Voluntier
      </div>

      {/* Menu central */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">

        <a
          href="/login"
          className="font-medium text-sm text-black hover:text-gray-800 transition-colors duration-300"
        >
          Home
        </a>
        <a
          href="/cadastro"
          className="font-medium text-sm text-black hover:text-gray-800 transition-colors duration-300"
        >
          Eventos
        </a>
        <a
          href="/cadastro"
          className="font-medium text-sm text-black hover:text-gray-800 transition-colors duration-300"
        >
          Ranking
        </a>
      </div>

      {/* Botões de Login e Cadastro */}
      <div className="ml-auto flex items-center gap-2">

        <Link
            to="/login"
            className="rounded-full border-[#7A6A5F] px-5 py-2 text-base font-medium text-black"
        >
        Login
        </Link>

        <Link
            to="/cadastro"
            className="rounded-full bg-[#C96A3D] px-6 py-2 text-base font-medium text-white"
        >
        Cadastre-se
        </Link>

      </div>

    </nav>
  );

}

export default MainNavBar; 