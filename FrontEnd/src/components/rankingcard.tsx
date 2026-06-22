type User = {
  id: number;
  username: string;
  position: number;
  events: number;
  pontos: number;
};

type RankingCardProps = {
  user: User;
};

function RankingCard({ user }: RankingCardProps) {
  return (
    <div className="grid grid-cols-[1fr_100px_120px_100px] items-center border-b border-gray-300 py-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <p className="font-semibold text-sm">{user.username}</p>
      </div>

      <div className="text-center">
        <p className="text-gray-500 text-sm">#{user.position}</p>
      </div>

      <div className="text-center">
        <p className="text-gray-500 text-sm">{user.events} evento{user.events !== 1 ? "s" : ""}</p>
      </div>

      <div className="text-center">
        <p className="font-semibold text-sm text-[#C96A3D]">{user.pontos} pts</p>
      </div>
    </div>
  );
}

export default RankingCard;
