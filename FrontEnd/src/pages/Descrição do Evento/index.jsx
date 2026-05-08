/* eslint-disable no-unused-vars */
import React from "react";
import NavBar from "../../components/navbar";
import ondas from "../../assets/ondas.png";
import { MapPin, Calendar } from 'lucide-react';
import Footer from "../../components/footer";
import medico1 from "../../assets/medico1.png";
import medico2 from "../../assets/medico2.png";
import medico3 from "../../assets/medico3.png";

function EventoDescricao() {
    return (
        <main className="bg-[#FFFAF2] min-h-screen overflow-x-hidden">

            <NavBar />
            <img
                src={ondas}
                alt="Ondas"
                className="left-0 w-full h-28"
            />

            <section className="relative z-10 px-20 py-10">

                <div>

                    <h1 className="text-[45px] font-extrabold leading-[65px] text-[#2C2C2C]">
                        Pequenos Cuidados
                    </h1>

                    <div className="flex items-center gap-8 mt-3 text-[15px] text-[#444444]">

                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <span>Presidente Prudente - SP</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>18/04 e 19/04</span>
                        </div>

                    </div>
                </div>

                <div className="mt-10 flex justify-center">

                <div className="flex gap-3 h-[400px]">

                    {/* imagem grande */}
                    <img
                        src={medico1}
                        alt="Voluntariado"
                        className="w-[620px] h-full object-cover rounded-[20px]"
                    />

                    {/* imagens direita */}
                    <div className="flex flex-col gap-3">

                        <img
                            src={medico2}
                            alt="Crianças"
                            className="w-[260px] h-[194px] object-cover rounded-[20px]"
                        />

                        <img
                            src={medico3}
                            alt="Vacina"
                            className="w-[260px] h-[194px] object-cover rounded-[20px]"
                        />

                    </div>

                </div>

            </div>

                {/* texto */}
                <div className="mt-5 max-w-[1150px] space-y-6 text-[17px] leading-[31px] text-[#2F2F2F] 2xl:justify-center 2xl:mx-auto">

                    <p className="text-base">
                        <span className="font-bold text-2xl">Unimed</span> Área da saúde,
                        atendimento infantil.
                    </p>
                    <p>
                        Pequenos Cuidados é um evento
                        voluntário voltado à promoção da saúde infantil, que
                        acontecerá nos dias 18 e 19 de abril, em Presidente
                        Prudente – SP. A iniciativa é organizada por profissionais
                        e parceiros da área da saúde, com o objetivo de oferecer
                        atendimentos básicos, orientação preventiva e momentos de
                        acolhimento para crianças da comunidade.
                    </p>
                    <p>
                        Se você acredita no impacto de pequenos gestos na vida de
                        alguém, esse é o seu lugar. Buscamos voluntários dispostos
                        a contribuir com cuidado, atenção e empatia — não é preciso
                        ser da área da saúde, apenas ter vontade de ajudar.
                        Participar é fazer parte de uma ação que pode transformar o
                        presente e o futuro de muitas crianças.
                    </p>

                </div>

                {/* BOTÃO */}
                <div className="flex justify-center mt-8">

                    <button className="bg-[#C96A3D] text-white text-[15px] font-semibold px-16 py-2 rounded-[20px] transition-all duration-300 hover:opacity-90">
                        Inscreva-se
                    </button>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default EventoDescricao;
