import FriendHeader from "../../../src/FriendPage/FriendHeader";
import IdSearchBar from "../../../src/FriendPage/IdSearchBar";

export default function AddFriend() {
  return (
    <div>
      <FriendHeader />
      <section className="w-3/4 mx-auto flex flex-col gap-10 mt-20">
        <IdSearchBar />
      </section>
    </div>
  );
}
