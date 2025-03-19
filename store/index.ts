import { Chart, CoinDetails, CryptoData, IChart } from '@/types'
import { create } from 'zustand'

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
