import { create } from "zustand"

type Vault = {
  openAddSecret: boolean
  items: { key: string; value: string }[]
  selectedItem: string
  selectItem: (name: string) => void
  setItems: (state: { key: string; value: string }[]) => void
  deleteItem: (index: number) => void
  increaseItems: () => void
  editItems: (
    inputValue: { key?: string; value?: string },
    index: number
  ) => void
  setOpenAddSecret: (state: boolean) => void
}

const useVault = create<Vault>()((set) => ({
  openAddSecret: false,
  items: [{ key: "", value: "" }],
  selectedItem: "",
  selectItem: (name) => set(() => ({ selectedItem: name })),
  setItems: (state) => set(() => ({ items: state })),
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
  setOpenAddSecret: (state: boolean) => set(() => ({ openAddSecret: state })),
}))

export default useVault
