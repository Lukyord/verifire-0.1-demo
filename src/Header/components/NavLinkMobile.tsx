import { useRouter } from "next/navigation";
import useModalShownStore from "../../../store/store";

type Props = {
  navlink: string;
};

export default function Navlink({ navlink }: Props) {
  const router = useRouter();

  const { setModalShown, modalShown } = useModalShownStore();

  const handleSubmit = () => {
    if (navlink != "Home/About") {
      router.push(`/${navlink.toLowerCase().replace(/ /g, "_")}`);
    } else {
      router.replace("/");
    }

    setModalShown(!modalShown);
  };

  return (
    <button
      onClick={handleSubmit}
      className="text-black text-2xl font-semibold text-left pl-16"
    >
      {navlink}
    </button>
  );
}
