import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  image_url: string | null;
  created_at?: string;
}

interface UserStore {
  user: User | null;
  profile: UserProfile | null;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  profile: null,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
}));
