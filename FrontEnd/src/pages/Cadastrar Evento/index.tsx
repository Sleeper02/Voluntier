import LinhaSuperior from "../../components/linhasuperior";
import Footer from "../../components/footer";
import UploadFotos from "../../components/uploadfotos";
import { Link } from "react-router-dom";

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
                    Você está prestes a criar um evento que faz a diferença. 
                    Cadastre agora e gere impacto social e ambiental, conectando 
                    pessoas e inspirando mudanças positivas.
                    </p>

                </div>

                {/* Formulário de cadastro de evento */}
                <form className="mt-6 space-y-5 px-8 pb-10"> 

                    {/*<div>
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

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Razão Social
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                        <p className="mt-1 text-[12px] text-[#6B6B6B]">
                        (nome completo. Ex: Associação Brasileira Amiga de Voluntários)
                        </p>
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> CNPJ
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                        <p className="mt-1 text-[12px] text-[#6B6B6B]">
                        (Ex: 99.999.999/9999-99)
                        </p>
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Área de Atuação
                        </label>
                            <select className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none">
                                <option>Escolha a área de atuação</option>
                                <option>Meio ambiente</option>
                                <option>Educação</option>
                                <option>Saúde</option>
                                <option>Cultura</option>
                            </select>
                    </div> */}

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Nome do Evento
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                        <p className="mt-1 text-[12px] text-[#6B6B6B]">
                        (Nome do evento. Ex: Parque Feliz)
                        </p>
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Descrição
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                        <p className="mt-1 text-[12px] text-[#6B6B6B]">
                        (objetivo da entidade, tipo de trabalho realizado, quem se beneficia, perfil dos voluntários, etc.)
                        </p>
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Nº máximo de voluntários
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                            <span className="text-[#C96A3D]">*</span> Data do evento
                        </label>

                        <input
                            type="date"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                        </div>

                        <div>
                        <label className="block text-[16px] font-semibold text-black">
                            <span className="text-[#C96A3D]">*</span> Horário do evento
                        </label>

                        <input
                            type="time"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                        </div>

                    {/*<div>
                        <label className="block text-[16px] font-semibold text-black">
                        Website
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        Instagram
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>
                
                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        Facebook
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        LinkedIn
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        YouTube
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        Observações Adicionais
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                        <p className="mt-1 text-[12px] text-[#6B6B6B]">
                        (observações que você considera importante para o evento)
                        </p>
                    </div>*/}

                </form>

                {/* Informações sobre o responsável pelo evento */}
                {/*<div>

                    <h1 className="text-[#2D2D2D] text-[32px] font-bold px-8 mt-3">
                    Responsável
                    </h1>

                </div>

                {/* Formulário de informações do responsável pelo evento 
                <form className="mt-6 space-y-5 px-8 pb-10">
                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Primeiro Nome
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Sobrenome
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Cargo
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>
                </form>

                <div>

                    <h1 className="text-[#2D2D2D] text-[32px] font-bold px-8 mt-3">
                    Endereço
                    </h1>

                </div>

                <form className="mt-6 space-y-5 px-8 pb-10">
                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> CEP
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Logradouro
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Bairro
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Estado
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Cidade
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>
                </form>

                <div>

                    <h1 className="text-[#2D2D2D] text-[32px] font-bold px-8 mt-3">
                    Contato
                    </h1>

                </div>

                <form className="mt-6 space-y-5 px-8 pb-10">
                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        Telefone
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> Celular
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                        <p className="mt-1 text-[12px] text-[#6B6B6B]">
                        (Ex. (11) 11111-1111)
                        </p>
                    </div>

                    <div>
                        <label className="block text-[16px] font-semibold text-black">
                        <span className="text-[#C96A3D]">*</span> E-mail
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-full rounded-md bg-[#E8E1E1] px-4 py-3 outline-none"
                        />
                        <p className="mt-1 text-[12px] text-[#6B6B6B]">
                        (Ex. email@gmail.com)
                        </p>
                    </div>

                </form>*/}

                <form className="mt-6 space-y-5 px-8 pb-10">

                    <UploadFotos />
                
                </form>

                <div className="mt-4 px-8">
                    <p className="text-[18px] font-semibold text-[#6B6B6B] flex justify-center">
                        Após o envio, seu evento será avaliado pela nossa equipe. Para mais informações
                        acompanhe o e-mail cadastrado na plataforma.
                    </p>

                    <div className="mt-10 flex justify-center">
                        <button
                        type="submit"
                        className="w-[280px] rounded-2xl bg-[#5D6F3E] py-4 text-[22px] font-bold text-white"
                        >
                        cadastrar!
                        </button>
                    </div>
                </div>

            </div>
            
            <Footer />

        </main>
        
    );
}

export default CadastrarEvento;