import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  navlink: string;
};

export default function Navlink({ navlink }: Props) {
  const router = useRouter();

  const handleSubmit = () => {
    if (navlink != "Home/About") {
      router.push(`/${navlink.toLowerCase().replace(/ /g, "_")}`);
    } else {
      router.replace("/");
    }
  };

  return (
    <button onClick={handleSubmit} className="text-white font-semibold">
      {navlink}
    </button>
  );
}
