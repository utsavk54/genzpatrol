import { create } from "zustand";

interface PatrolStore {
  patrolId: string | null;
  setPatrolId: (id: string | null) => void;
}

export const usePatrolStore = create<PatrolStore>((set) => ({
  patrolId: null,
  setPatrolId: (id) => set({ patrolId: id }),
}));