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
  loading: boolean;
  phone: string;
  phoneVerifying: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  init: () => Promise<void>;
  setPhone: (phone: string) => Promise<void>;
  setPhoneVerifying: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  phone: "",
  phoneVerifying: false,
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
      set({ user: userCredential.user, loading: false });
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
      set({ user: userCredential.user, loading: false });
    } catch (error) {
      console.error(error);
    }
  },
  setPhone: async (phone: string) => {
    try {
      set({ phone: phone });
    } catch (error) {
      console.error(error);
    }
  },
  signout: async () => {
    try {
      await signOut(auth);
      set({ user: null, loading: false });
    } catch (error) {
      console.error(error);
    }
  },
  setPhoneVerifying: (value) => set(() => ({ phoneVerifying: value })),
  setLoading: (value) => set(() => ({ loading: value })),
}));

export default useAuthStore;
