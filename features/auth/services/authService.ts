import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
  UserCredential,
} from "firebase/auth";
import {
  getFirebaseAuth,
  googleProvider,
  appleProvider,
} from "@/lib/firebase";

export const authService = {
  login: async (email: string, password: string): Promise<UserCredential> => {
    const auth = getFirebaseAuth();
    return await signInWithEmailAndPassword(auth, email, password);
  },

  register: async (
    email: string,
    password: string,
    fullName?: string
  ): Promise<UserCredential> => {
    const auth = getFirebaseAuth();
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (fullName && cred.user) {
      await updateProfile(cred.user, { displayName: fullName });
    }
    return cred;
  },

  loginWithGoogle: async (): Promise<UserCredential> => {
    const auth = getFirebaseAuth();
    return await signInWithPopup(auth, googleProvider);
  },

  loginWithApple: async (): Promise<UserCredential> => {
    const auth = getFirebaseAuth();
    return await signInWithPopup(auth, appleProvider);
  },

  logout: async (): Promise<void> => {
    const auth = getFirebaseAuth();
    await signOut(auth);
  },

  getCurrentUser: () => {
    try {
      return getFirebaseAuth().currentUser;
    } catch {
      return null;
    }
  },
};

