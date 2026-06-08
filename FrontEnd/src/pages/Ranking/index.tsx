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

  const indexOfLastUser =
    currentPage * usersPerPage;

  const indexOfFirstUser =
    indexOfLastUser - usersPerPage;

  const currentUsers = mockUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const totalPages = Math.ceil(
    mockUsers.length / usersPerPage
  );

  return (
    <main className="bg-[#FFFFFF] min-h-screen overflow-x-hidden">

      <section className="relative">

        <NavBar />

        <img
          src={rankingcapa}
          alt="Caparanking"
          className="w-full h-auto object-cover absolute top-16"
        />

        <div className="relative px-10 py-20">
          <h1 className="text-4xl font-bold mt-28 text-[#FFFAF2]">
            ranking voluntário
          </h1>

          <h3 className="text-lg font-semibold mt-2 text-[#FFFAF2] w-[400px]">
            colabore com a sociedade e veja sua posição no nosso ranking
          </h3>
        </div>

        <div className="absolute flex items-center justify-between w-full px-10 py-10 top-[400px]">
          <h1 className="text-2xl font-bold text-black">
            Ranking
          </h1>

          <SearchBar />
        </div>

        <div className="mt-12 px-10">

          <RankingList users={currentUsers} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

        </div>

      </section>

      <FooterWhite />

    </main>
  );
}

export default Ranking;