import { create } from "zustand"

type Vault = {
  openAddSecret: boolean
  editSecret: boolean
  setEditSecret: (state: boolean) => void
  setOpenAddSecret: (state: boolean) => void
}

const useVault = create<Vault>()((set) => ({}))

export default useVault
