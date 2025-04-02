import { Chart, CoinDetails, CryptoData, IChart, IUser, NewArticle } from '@/types'
import { create } from 'zustand'


// user store

interface IUserStore { 
  user: IUser | null
  setUserData: (user: IUser | null) => void
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUserData: (user) => set({ user, })
}))




// chart store
interface IDataStore {
  data: CoinDetails | null,
  setData: (user: CoinDetails | null) => void,  // update user data in the store.  //+
}

export const userDataStore = create<IDataStore>((set) => ({
  data: null,
  setData: (user: CoinDetails | null) => set({ data: user }),
}))

// orders

interface IOrderStore {
  data: CryptoData[] | null,
  setData: (data: CryptoData[] | null) => void,  // update order data in the store.  //+
}

export const useOrderStore = create<IOrderStore>((set) => ({
  data: null,
  setData: (data: CryptoData[] | null) => set({ data }),  //+
}))

interface IChartStore {
  chart: Chart[] | null,
  setChart: (data: Chart[] | null) => void,  // update order data in the store.  //+
}

export const useChartStore = create<IChartStore>((set) => ({
  chart: null,
  setChart: (data: Chart[] | null) => set({ chart: data }),  //+
}))

// news store
interface INewsStore {
  news: NewArticle[] | null,
  setNews: (data: NewArticle[] | null) => void,  // update order data in the store.  //+
}

export const useNewsStore = create<INewsStore>((set) => ({
  news: null,
  setNews: (data: NewArticle[] | null) => set({ news: data }),  //+
}))
