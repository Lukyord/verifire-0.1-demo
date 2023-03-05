import { create } from "zustand";
import { User as FirebaseUser } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

type EmergencyContact = {
  emergencyContact1: string;
  relationship1: string;
  emergencyContact2: string;
  relationship2: string;
};

interface AuthState {
  user: FirebaseUser | null;
  loading: boolean;
  email: string;
  id: string;
  phone: string;
  phoneVerifying: boolean;
  emergencyContacts: EmergencyContact;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  init: () => Promise<void>;
  setEmail: (value: string) => void;
  setId: (value: string) => void;
  setPhone: (value: string) => void;
  setPhoneVerifying: (value: boolean) => void;
  setEmergencyContacts: (contacts: EmergencyContact) => void;
  setLoading: (value: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  email: "",
  id: "",
  phone: "",
  phoneVerifying: false,
  emergencyContacts: {
    emergencyContact1: "",
    relationship1: "",
    emergencyContact2: "",
    relationship2: "",
  },
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
  setEmail: (value: string) => {
    set({ email: value });
  },
  setId: (value: string) => {
    set({ id: value });
  },
  setPhone: (value: string) => {
    set({ phone: value });
  },
  signout: async () => {
    try {
      await signOut(auth);
      set({ user: null, loading: false });
    } catch (error) {
      console.error(error);
    }
  },
  setPhoneVerifying: (value: boolean) => set({ phoneVerifying: value }),
  setEmergencyContacts: (contacts: EmergencyContact) =>
    set({ emergencyContacts: contacts }),
  setLoading: (value: boolean) => set({ loading: value }),
}));

export default useAuthStore;
