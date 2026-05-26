type User = {
  id: number;
  username: string;
  position: number;
  events: number;
};

type RankingCardProps = {
  user: User;
};

function RankingCard({ user }: RankingCardProps) {
  return (
    <div className="grid grid-cols-[1fr_120px_120px] items-center border-b border-gray-300 py-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300" />

        <div>
          <p className="font-semibold text-sm">Usuário</p>

          <p className="text-gray-500 text-sm">{user.username}</p>
        </div>
      </div>

      <div className="text-center">
        <p className="font-semibold text-sm">Posição</p>

        <p className="text-gray-500 text-sm">#{user.position}</p>
      </div>
      <div className="text-center">
        <p className="font-semibold text-sm">Qtd. Eventos</p>

        <p className="text-gray-500 text-sm">{user.events}</p>
      </div>
    </div>
  );
}

export default RankingCard;
