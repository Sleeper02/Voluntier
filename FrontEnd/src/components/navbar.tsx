function NavBar() {
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

    </nav>
  );
}

export default NavBar;