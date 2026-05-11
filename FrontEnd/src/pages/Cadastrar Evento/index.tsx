import LinhaSuperior from "../../components/linhasuperior";

function CadastrarEvento () {

    return (

        <main className="bg-[#FFFAF2]">

            <LinhaSuperior />

            <div>

                {/* Instruções sobre cadastrar um evento */}
                <div>

                    <h1 className="text-[#2D2D2D] text-[32px] font-bold px-8 mt-3">
                    Cadastrar evento
                    </h1>

                    <p className="text-[#6B6B6B] text-[22px] px-8 leading-tight">
                    Você está prestes a criar um evento que faz a diferença — 
                    cadastre agora e gere impacto social e ambiental, conectando 
                    pessoas e inspirando mudanças positivas.
                    </p>

                </div>

                {/* Formulário de cadastro de evento */}
                <form className="mt-6 space-y-5 px-8 pb-10"> 

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Nome Fantasia
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                        <p className="mt-1 text-[12px] text-[#6B6B6B]">
                        Sigla, acrônimo, apelido. Ex: ABAV
                        </p>

                    </div>
                    
                </form>

            </div>
            

        </main>
        
    );
}

export default CadastrarEvento;