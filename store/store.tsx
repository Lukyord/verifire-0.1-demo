import { create } from "zustand";

interface NavigationModalState {
  modalShown: boolean;
  setModalShown: () => void;
}

const useModalShownStore = create<NavigationModalState>((set) => ({
  modalShown: false,
  setModalShown: () => set((state) => ({ modalShown: !state.modalShown })),
}));

export default useModalShownStore;
