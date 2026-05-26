import RankingCard from "./rankingcard";

type User = {
  id: number;
  username: string;
  position: number;
  events: number;
};

type RankingListProps = {
  users: User[];
};

function RankingList({ users }: RankingListProps) {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <RankingCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default RankingList;
