import { IUser } from "@/types";
import { create } from "zustand";

interface IUserStore {
  userData: IUser | null,
  setUserData: (data: IUser) => void,
}


export const getUserSrore = create<IUserStore>((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data })
}));