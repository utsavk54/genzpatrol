import { create } from "zustand";

interface UserState {
  firstName: string;
  lastName: string;
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
}

// The generic <UserState> tells TS what 'state' is
export const useUserStore = create<UserState>((set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (firstName: string) => set({ firstName }),
  setLastName: (lastName: string) => set({ lastName }),
}));
