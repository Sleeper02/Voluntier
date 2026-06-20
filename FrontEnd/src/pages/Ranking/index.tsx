import { useState } from "react";

import NavBar from "../../components/navbar";
import FooterWhite from "../../components/footerwhite";
import SearchBar from "../../components/searchbar";

import RankingList from "../../components/rankinglist";
import Pagination from "../../components/pagination";

import rankingcapa from "../../assets/rankingcapa (2).png";

function Ranking() {
  const mockUsers = [
    { id: 1, username: "@user1", position: 1, events: 21 },
    { id: 2, username: "@user2", position: 2, events: 18 },
    { id: 3, username: "@user3", position: 3, events: 15 },
    { id: 4, username: "@user4", position: 4, events: 12 },
    { id: 5, username: "@user5", position: 5, events: 10 },
    { id: 6, username: "@user6", position: 6, events: 9 },
    { id: 7, username: "@user7", position: 7, events: 8 },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;

  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = mockUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(mockUsers.length / usersPerPage);

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
