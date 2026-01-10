import { userType } from "@/types/user";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

const initialValues = {
  sessionUserData: null,
  dialogIsOpen: false,
  profile: null,
  selectedMonth: undefined,
  addGoalDialogIsOpen: false,
  editingGoal: null,
  accountDialogIsOpen: false,
  editingAccount: null,
  accounts: null,
  editingTransaction: null,
  isEditTransactionModalOpen: false,
};

interface UserStore {
  sessionUserData: User | null;
  profile: userType | null;
  setSessionUserData: (user: User | null) => void;
  setProfile: (profile: userType | null) => void;
  accounts: any | null;
  dialogIsOpen: boolean;
  setDialogIsOpen: (isOpen: boolean) => void;
  addGoalDialogIsOpen: boolean;
  setAddGoalDialog: (isOpen: boolean) => void;
  selectedMonth: number | undefined;
  setSelectedMonth: (month: number | undefined) => void;
  editingGoal: any | null;
  setEditingGoal: (goal: any | null) => void;
  accountDialogIsOpen: boolean;
  setAccountDialogIsOpen: (isOpen: boolean) => void;
  editingAccount: any | null;
  setEditingAccount: (account: any | null) => void;
  setAccounts: (accounts: any | null) => void;
  editingTransaction: any | null;
  setEditingTransaction: (transaction: any | null) => void;
  isEditTransactionModalOpen: boolean;
  setIsEditTransactionModalOpen: (isOpen: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  ...initialValues,
  setEditingTransaction: (transaction) =>
    set({ editingTransaction: transaction }),
  setIsEditTransactionModalOpen: (isOpen) =>
    set({ isEditTransactionModalOpen: isOpen }),
  setAccounts: (accounts) => set({ accounts }),
  setEditingAccount: (account) => set({ editingAccount: account }),
  setAccountDialogIsOpen: (isOpen) => set({ accountDialogIsOpen: isOpen }),
  setEditingGoal: (goal) => set({ editingGoal: goal }),
  setSessionUserData: (sessionUserData) => set({ sessionUserData }),
  setProfile: (profile) => set({ profile }),
  setDialogIsOpen: (isOpen) => set({ dialogIsOpen: isOpen }),
  setAddGoalDialog: (isOpen) => set({ addGoalDialogIsOpen: isOpen }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
}));
