import { create } from "zustand"

type Store = {
  openAddBucket: boolean
  setOpenAddBucket: (state: boolean) => void
}

const useStore = create<Store>()((set) => ({
  openAddBucket: false,
  setOpenAddBucket: (state: boolean) => set(() => ({ openAddBucket: state })),
}))

export default useStore
