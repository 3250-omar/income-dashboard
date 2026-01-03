import { userType } from "@/types/user";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserStore {
  sessionUserData: User | null;
  profile: userType | null;
  setSessionUserData: (user: User | null) => void;
  setProfile: (profile: userType | null) => void;
  dialogIsOpen: boolean;
  setDialogIsOpen: (isOpen: boolean) => void;
  addGoalDialogIsOpen: boolean;
  setAddGoalDialog: (isOpen: boolean) => void;
  selectedMonth: number | undefined;
  setSelectedMonth: (month: number | undefined) => void;
  editingGoal: any | null;
  setEditingGoal: (goal: any | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  sessionUserData: null,
  dialogIsOpen: false,
  profile: null,
  selectedMonth: undefined,
  addGoalDialogIsOpen: false,
  editingGoal: null,
  setEditingGoal: (goal) => set({ editingGoal: goal }),
  setSessionUserData: (sessionUserData) => set({ sessionUserData }),
  setProfile: (profile) => set({ profile }),
  setDialogIsOpen: (isOpen) => set({ dialogIsOpen: isOpen }),
  setAddGoalDialog: (isOpen) => set({ addGoalDialogIsOpen: isOpen }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
}));
