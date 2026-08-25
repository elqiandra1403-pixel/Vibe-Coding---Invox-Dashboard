import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  OAuthProvider,
  Auth
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "invox-invoice.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "invox-invoice",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "invox-invoice.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "248501603417",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:248501603417:web:d245b6f36675000e9f3548",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-90E5E736XS"
};

let appInstance: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === "undefined" && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    return null;
  }
  if (!appInstance) {
    if (getApps().length > 0) {
      appInstance = getApp();
    } else if (firebaseConfig.apiKey) {
      appInstance = initializeApp(firebaseConfig);
    }
  }
  return appInstance;
}

export function getFirebaseAuth(): Auth {
  const app = getFirebaseApp();
  if (!app) {
    // Fallback stub for SSR / build time if API key is not present
    return null as unknown as Auth;
  }
  return getAuth(app);
}

export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");

export const auth = new Proxy({} as Auth, {
  get(_target, prop) {
    const instance = getFirebaseAuth();
    if (!instance) return undefined;
    const value = (instance as any)[prop];
    return typeof value === "function" ? value.bind(instance) : value;
  }
});

export default appInstance;
