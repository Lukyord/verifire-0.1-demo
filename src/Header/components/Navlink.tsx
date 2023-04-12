import { useRouter } from "next/navigation";

type Props = {
  navlink: string;
};

export default function Navlink({ navlink }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (navlink != "Home") {
      if (navlink === "Let's Meet") {
        router.push("/lets_meet");
      } else {
        router.push(`/${navlink.toLowerCase().replace(/ /g, "_")}`);
      }
    } else {
      router.replace("/");
    }
  };

  return (
    <button onClick={handleClick} className="text-white text-lg">
      {navlink}
    </button>
  );
}
