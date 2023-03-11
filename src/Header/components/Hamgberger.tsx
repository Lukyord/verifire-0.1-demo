import { Bars3Icon } from "@heroicons/react/24/solid";
import useModalShownStore from "../../../store/store";

export default function Hamgberger() {
  const { toggle } = useModalShownStore();

  // console.log(useModalShownStore.getState().modalShown);

  return (
    <div onClick={toggle}>
      <Bars3Icon className="w-8 h-8 cursor-pointer" color="white" />
    </div>
  );
}
