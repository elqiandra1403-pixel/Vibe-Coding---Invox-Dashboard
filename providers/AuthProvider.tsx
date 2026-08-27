"use client";

import React, { useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuthStore } from "@/stores/authStore";
import { useUiStore } from "@/stores/uiStore";
import { UserProfile } from "@/features/auth/types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);
  const setUserProfile = useUiStore((s) => s.setUserProfile);

  useEffect(() => {
    let authInstance;
    try {
      authInstance = getFirebaseAuth();
    } catch (err) {
      console.warn("Firebase Auth not initialized:", err);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(authInstance, (user: FirebaseUser | null) => {
      if (user) {
        const displayName = user.displayName || user.email?.split("@")[0] || "User";
        const email = user.email || "";

        const profile: UserProfile = {
          id: user.uid,
          email: email,
          role: "admin",
          org_id: "org_default",
          full_name: displayName,
          avatar_url: user.photoURL || undefined,
        };

        setUser(profile);
        setUserProfile({
          name: displayName,
          email: email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setUserProfile]);

  return <>{children}</>;
}

