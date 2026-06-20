function FooterWhite() {
  return (
    <footer className="bg-[#FFFFFF] border-b-[12px] border-[#C96A3D] py-8">
      <div className="px-8 flex flex-col items-center">
        <a className="text-2xl font-bold text-black" href="/home">Voluntier</a>
      </div>

      <div className="w-full h-[1px] bg-[#B8B8B8] opacity-80 mt-5"></div>

      <div className="px-8 flex justify-center">
        <p className="mt-5 text-center text-sm text-[#5A5A5A] max-w-[700px]">
          Voluntier está sendo criado para um projeto universitário em 2026. Somos um pequeno time de seis pessoas.
        </p>
      </div>
    </footer>
  );
}

export default FooterWhite;
