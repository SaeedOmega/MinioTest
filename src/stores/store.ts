import { create } from "zustand"

type Store = {
  openAddBucket: boolean
  refreshValue: number
  countItems: number
  setOpenAddBucket: (state: boolean) => void
  refresh: () => void
  increaseItem: () => void
}

const useStore = create<Store>()((set) => ({
  openAddBucket: false,
  refreshValue: 0,
  countItems: 1,
  setOpenAddBucket: (state: boolean) => set(() => ({ openAddBucket: state })),
  refresh: () => set((state) => ({ refreshValue: state.refreshValue + 1 })),
  increaseItem: () => set((state) => ({ countItems: state.countItems + 1 })),
}))

export default useStore
