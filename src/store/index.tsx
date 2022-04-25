import { UserProps as User } from "@/types";
import create from "zustand";

interface StoreProps {
  currentUser: null | undefined | User;
  setCurrentUser: (user: User) => void;
}

export const useStore = create<StoreProps>((set) => ({
  currentUser: undefined,
  setCurrentUser: (user) => set({ currentUser: user })
}));