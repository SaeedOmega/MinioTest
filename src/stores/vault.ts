import { create } from "zustand"

type Vault = {
  /**
   * state for open add secret for vault or not
   */
  openAddSecret: boolean
  /**
   * vault item list in an objet
   */
  items: { key: string; value: string }[]
  /**
   * item name selected for edit component
   */
  selectedItem: string
  /**
   * a function for set selectedItem
   *
   * @param name string name of item
   */
  selectItem: (name: string) => void
  /**
   * a function for set items
   *
   * @param state array of object
   */
  setItems: (state: { key: string; value: string }[]) => void
  /**
   *  a function for delete item from items
   *
   * @param index number index of for delete item
   */
  deleteItem: (index: number) => void
  /**
   * a function for add items to items
   */
  increaseItems: () => void
  /**
   *  a function for edit an item
   *
   * @param inputValue new object for edit
   * @param index number index of for edit item
   */
  editItems: (
    inputValue: { key?: string; value?: string },
    index: number
  ) => void
  /**
   * a function for set open or close edit commponent
   *
   * @param state boolean
   */
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
