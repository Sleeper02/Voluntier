import { useEffect, useState } from "react";

import NavBar from "../../components/navbar";
import FooterWhite from "../../components/footerwhite";
import SearchBar from "../../components/searchbar";

import RankingList from "../../components/rankinglist";
import Pagination from "../../components/pagination";

import rankingcapa from "../../assets/rankingcapa (2).png";
import { getPessoaController } from "../../api/endpoints/pessoa-controller/pessoa-controller";
import axiosInstance from "../../api/axiosInstance";
import type { PessoaModel } from "../../api/model";

const api = getPessoaController(axiosInstance);

interface RankingUser {
  id: number;
  username: string;
  position: number;
  events: number;
}

function Ranking() {
  const [users, setUsers] = useState<RankingUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    api
      .ranking()
      .then((res) => {
        const mapped: RankingUser[] = res.data.map(
          (pessoa: PessoaModel, index: number) => ({
            id: index + 1,
            username: `@${pessoa.nome}`,
            position: index + 1,
            events: pessoa.eventosParticipados?.length ?? 0,
          }),
        );
        setUsers(mapped);
      })
      .catch(() => setErro(true));
  }, []);

  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;

  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <main className="bg-white min-h-screen overflow-x-hidden">
      <NavBar />
      <section className="relative">
        <section className="-mt-6">
          <img
            src={rankingcapa}
            alt="Ranking Voluntários"
            className="w-full object-cover"
          />
        </section>

        <div
          className="
            absolute
            inset-0
            flex
            items-center
          "
        >
          <div
            className="
              mt-24
              px-6
              md:px-10
              max-w-[600px]
            "
          >
            <h1
              className="
                text-3xl
                md:text-5xl
                font-bold
                text-[#FFFAF2]
              "
            >
              ranking voluntários
            </h1>

            <p
              className="
                text-sm
                md:text-lg
                font-medium
                text-[#FFFAF2]
                max-w-[400px]
                mt-3
              "
            >
              colabore com a sociedade e veja sua posição no nosso ranking
            </p>
          </div>
        </div>
      </section>

      {/* TÍTULO + BUSCA */}
      <section
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          px-6
          md:px-10
        "
      >
        <h1
          className="
            text-2xl
            md:text-3xl
            font-bold
            text-black
          "
        >
          Ranking
        </h1>

        <div className="w-full md:w-[320px]">
          <SearchBar placeholder="Buscar usuário" />
        </div>
      </section>

      {/* LISTA */}
      <section className="px-6 md:px-10 mt-8">
        {erro && (
          <p className="text-center text-red-500 py-10">
            Não foi possível carregar o ranking. Tente novamente mais tarde.
          </p>
        )}
        <RankingList users={currentUsers} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>

      <FooterWhite />
    </main>
  );
}

export default Ranking;
