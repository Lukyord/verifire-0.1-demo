import { useRouter } from "next/navigation";

type Props = {
  navlink: string;
};

export default function Navlink({ navlink }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (navlink != "Home/About") {
      router.push(`/${navlink.toLowerCase().replace(/ /g, "_")}`);
    } else {
      router.replace("/");
    }
  };

  return (
    <button onClick={handleClick} className="text-white font-semibold">
      {navlink}
    </button>
  );
}
