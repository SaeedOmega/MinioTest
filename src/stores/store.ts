import { create } from "zustand"

type Store = {
  refreshValue: number
  wichPage: string
  refresh: () => void
  setPage: (page: string) => void
}

const useStore = create<Store>()((set) => ({
  refreshValue: 0,
  wichPage: location.pathname.includes("vault") ? "vault" : "minio",
  setPage: (page: string) => set(() => ({ wichPage: page })),
  refresh: () => set((state) => ({ refreshValue: state.refreshValue + 1 })),
}))

export default useStore
