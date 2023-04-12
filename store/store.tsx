import { create } from "zustand";

interface NavigationModalState {
  modalShown: boolean;
  toggle: () => void;
  setModalShown: () => void;
}

const useModalShownStore = create<NavigationModalState>((set, get) => ({
  modalShown: false,
  toggle: () => set({ modalShown: !get().modalShown }), //!get().modalShown
  setModalShown: () => set({ modalShown: false }),
}));

export default useModalShownStore;
