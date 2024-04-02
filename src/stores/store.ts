import { create } from "zustand"

type Store = {
  openAddBucket: boolean
  refreshValue: number
  setOpenAddBucket: (state: boolean) => void
  refresh: () => void
}

const useStore = create<Store>()((set) => ({
  openAddBucket: false,
  refreshValue: 0,
  setOpenAddBucket: (state: boolean) => set(() => ({ openAddBucket: state })),
  refresh: () => set((state) => ({ refreshValue: state.refreshValue + 1 })),
}))

export default useStore
