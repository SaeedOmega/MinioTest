import { create } from "zustand"

type Store = {
  openAddBucket: boolean
  refreshValue: number
  countItems: number
  wichPage: string
  setOpenAddBucket: (state: boolean) => void
  refresh: () => void
  increaseItem: () => void
  setPage: (page: string) => void
}

const useStore = create<Store>()((set) => ({
  openAddBucket: false,
  refreshValue: 0,
  countItems: 1,
  wichPage: "minio",
  setPage: (page: string) => set(() => ({ wichPage: page })),
  setOpenAddBucket: (state: boolean) => set(() => ({ openAddBucket: state })),
  refresh: () => set((state) => ({ refreshValue: state.refreshValue + 1 })),
  increaseItem: () => set((state) => ({ countItems: state.countItems + 1 })),
}))

export default useStore
