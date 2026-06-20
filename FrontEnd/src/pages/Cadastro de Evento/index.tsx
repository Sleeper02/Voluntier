import MainNavBar from "../../components/mainnavbar";
import Footer from "../../components/footer"
import { Link } from "react-router-dom";
import wallpapercadastroevento from "../../assets/wallpaperCadastroEvento.jpg"



function CadastroEvento () {

    return (

        <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">

            <MainNavBar />

            <section className="relative">
                <img
                src={wallpapercadastroevento}
                alt="pessoas plantando"
                className="w-full h-[600px] object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#FFFAF2] flex flex-col items-center justify-center text-center h-[300px] w-[580px] rounded-3xl px-10">
                    <h1 className="text-[40px] font-bold text-[#2D2D2D]">
                    cadastre seu evento
                    </h1>

                    <p className="mt-2 text-[20px] text-[#2D2D2D]">
                    cadastre agora e gere impacto social e ambiental,
                    </p>

                    <p className="mt-2 text-[20px] text-[#2D2D2D]">
                    conectando pessoas e transformando ideias em ação.
                    </p>

                    <Link 
                        to="/cadastrarevento"
                        className="mt-8 rounded-2xl bg-[#5D6F3E] px-20 py-4 text-2xl font-bold text-white"
                    >
                    quero participar!
                    </Link>
                </div>
                </div>
            </section>

            <Footer />

        </main>
    )



}

export default CadastroEvento;