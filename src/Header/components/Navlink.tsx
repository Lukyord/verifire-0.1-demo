import Link from "next/link";

type Props = {
  navlink: string;
};

export default function Navlink({ navlink }: Props) {
  return (
    <Link href={`/${navlink}`} className="text-white font-semibold">
      {navlink}
    </Link>
  );
}
