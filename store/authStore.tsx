import { create } from "zustand";
import { User as FirebaseUser } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

interface AuthState {
  user: FirebaseUser | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  init: () => Promise<void>;
  loading: boolean;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  init: async () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },
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

export default useAuthStore;
