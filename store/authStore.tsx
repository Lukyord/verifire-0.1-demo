import { create } from "zustand";
import { User as FirebaseUser } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { DocumentData } from "firebase/firestore";

interface AuthState {
  user: FirebaseUser | null;
  userData: DocumentData | null;
  loading: boolean;
  email: string;
  id: string;
  phone: string;
  phoneVerifying: boolean | null;
  emergencyContacts: EmergencyContact;
  bio: string;
  displayName: string;
  dob: string;
  gender: string;
  photoURL: string;
  verifireId: string;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  init: () => Promise<void>;
  setUserData: (value: DocumentData) => void;
  setEmail: (value: string) => void;
  setId: (value: string) => void;
  setPhone: (value: string) => void;
  setPhoneVerifying: (value: boolean) => void;
  setEmergencyContacts: (contacts: EmergencyContact) => void;
  setLoading: (value: boolean) => void;
  setData: (value: UserData) => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userData: null,
  loading: true,
  email: "",
  id: "",
  phone: "",
  phoneVerifying: null,
  emergencyContacts: {
    emergencyContact1: "",
    relationship1: "",
    emergencyContact2: "",
    relationship2: "",
  },
  bio: "",
  displayName: "",
  dob: "",
  gender: "",
  photoURL: "",
  verifireId: "",
  init: async () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },
  setUserData: async (value: DocumentData) => {
    set({ userData: value });
  },
  signin: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      set({ user: userCredential.user, loading: false });
      console.log("signed in");
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
      console.log("signed out");
    } catch (error) {
      console.error(error);
    }
  },
  setPhoneVerifying: (value: boolean) => set({ phoneVerifying: value }),
  setEmergencyContacts: (contacts: EmergencyContact) =>
    set({ emergencyContacts: contacts }),
  setLoading: (value: boolean) => set({ loading: value }),
  setData: (value: UserData) =>
    set({
      bio: value.bio,
      displayName: value.displayName,
      dob: value.dob,
      gender: value.gender,
      photoURL: value.photoURL,
      verifireId: value.verifireId,
    }),
}));

export default useAuthStore;
