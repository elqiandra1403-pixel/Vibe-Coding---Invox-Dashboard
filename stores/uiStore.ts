"use client";
import { create } from "zustand";

export interface UserProfile {
  name: string;
  email: string;
  company: string;
  currency: string;
}

export interface ToastItem {
  id: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface UiStore {
  sidebarOpen: boolean;
  theme: "light" | "dark";
  userProfile: UserProfile;
  newInvoiceModalOpen: boolean;
  searchModalOpen: boolean;
  toasts: ToastItem[];
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  setUserProfile: (profile: Partial<UserProfile>) => void;
  setNewInvoiceModalOpen: (open: boolean) => void;
  setSearchModalOpen: (open: boolean) => void;
  addToast: (message: string, type?: ToastItem["type"]) => void;
  removeToast: (id: string) => void;
}

export const useUiStore = create<UiStore>((set, get) => ({
  sidebarOpen: true,
  theme: "dark",
  userProfile: {
    name: "Elqi",
    email: "elqiandra1403@gmail.com",
    company: "Aperture Films",
    currency: "USD",
  },
  newInvoiceModalOpen: false,
  searchModalOpen: false,
  toasts: [],
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("invox-theme", theme);
    }
    set({ theme });
  },
  toggleTheme: () => {
    const nextTheme = get().theme === "dark" ? "light" : "dark";
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("invox-theme", nextTheme);
    }
    set({ theme: nextTheme });
  },
  setUserProfile: (newProfile) =>
    set((state) => {
      const updated = { ...state.userProfile, ...newProfile };
      if (typeof window !== "undefined") {
        localStorage.setItem("invox-user-profile", JSON.stringify(updated));
      }
      return { userProfile: updated };
    }),
  setNewInvoiceModalOpen: (newInvoiceModalOpen) => set({ newInvoiceModalOpen }),
  setSearchModalOpen: (searchModalOpen) => set({ searchModalOpen }),
  addToast: (message, type = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 3500);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

