import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <div className="h-20 md:h-24 w-full bg-purple-700 flex items-center justify-between p-2 px-10 shadow-2xl">
      <h1 className="text-white text-4xl sm:text-4xl lg:text-6xl font-bold my-auto">
        VeriFire
      </h1>
      <div>
        <NavLinks />
      </div>
    </div>
  );
}
