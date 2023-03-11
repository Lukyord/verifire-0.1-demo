import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import produce from "immer";

interface NavigationModalState {
  modalShown: boolean;
  toggle: () => void;
  setModalShown: () => void;
}

const useModalShownStore = create(
  persist<NavigationModalState>(
    (set, get) => ({
      modalShown: false,
      toggle: () =>
        set(
          produce((state) => {
            state.modalShown = !state.modalShown;
          })
        ),
      setModalShown: () => set({ modalShown: false }),
    }),
    {
      name: "overlayModal-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useModalShownStore;
