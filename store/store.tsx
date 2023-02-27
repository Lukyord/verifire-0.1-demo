import { create } from "zustand";
import { User as FirebaseUser } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

interface NavigationModalState {
  modalShown: boolean;
  setModalShown: (modalShown: boolean) => void;
}

interface UserState {
  user: FirebaseUser | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}

const useModalShownStore = create<NavigationModalState>((set) => ({
  modalShown: false,
  setModalShown: () => set((state) => ({ modalShown: !state.modalShown })),
}));

const useUserStore = create<UserState>((set) => ({
  user: null,
  signin: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      set({ user: userCredential.user });
    } catch (error) {
      console.error(error);
    }
  },
  signup: async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      set({ user: userCredential.user });
    } catch (error) {
      console.error(error);
    }
  },
  signout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useModalShownStore;
