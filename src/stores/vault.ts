import { create } from "zustand"

type Vault = {
  openAddSecret: boolean
  editSecret: boolean
  items: { key: string; value: string }[]
  sentItems: () => void
  deleteItem: (index: number) => void
  increaseItems: () => void
  editItems: (
    inputValue: { key?: string; value?: string },
    index: number
  ) => void
  setEditSecret: (state: boolean) => void
  setOpenAddSecret: (state: boolean) => void
}

const useVault = create<Vault>()((set) => ({
  openAddSecret: false,
  editSecret: false,
  items: [{ key: "", value: "" }],
  sentItems: () => set(() => ({ items: [{ key: "", value: "" }] })),
  deleteItem: (index) =>
    set((state) => {
      state.items.splice(index, 1)
      return { items: state.items }
    }),
  editItems: (inputValue, index) =>
    set((state) => {
      state.items[index] = { ...state.items[index], ...inputValue }
      return { items: state.items }
    }),
  increaseItems: () =>
    set((state) => ({ items: [...state.items, { key: "", value: "" }] })),
  setEditSecret: (state: boolean) => set(() => ({ editSecret: state })),
  setOpenAddSecret: (state: boolean) => set(() => ({ openAddSecret: state })),
}))

export default useVault
