import { Bars3Icon } from "@heroicons/react/24/solid";
import useModalShownStore from "../../../store/store";

export default function Hamgberger() {
  const { toggle } = useModalShownStore();

  // console.log(useModalShownStore.getState().modalShown);

  return (
    <div onClick={toggle}>
      <Bars3Icon
        className="mt-6 w-10 h-10 cursor-pointer drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        color="black"
      />
    </div>
  );
}
