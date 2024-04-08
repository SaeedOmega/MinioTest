import { create } from "zustand"

type Store = {
  /**
   * count of refresh
   */
  refreshValue: number
  /**
   * page state
   */
  wichPage: string
  /**
   * a function for refresh page
   */
  refresh: () => void
  /**
   * set wichPage
   *
   * @param page string name of page
   */
  setPage: (page: string) => void
}

const useStore = create<Store>()((set) => ({
  refreshValue: 0,
  wichPage: location.pathname.includes("vault") ? "vault" : "minio",
  setPage: (page: string) => set(() => ({ wichPage: page })),
  refresh: () => set((state) => ({ refreshValue: state.refreshValue + 1 })),
}))

export default useStore
