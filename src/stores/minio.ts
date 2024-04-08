import { create } from "zustand"

type Minio = {
  /**
   * state for open add file in minio or not
   */
  openAddFile: boolean
  /**
   * for set state
   *
   * @param state boolean
   */
  setOpenAddFile: (state: boolean) => void
}

const useMinio = create<Minio>()((set) => ({
  openAddFile: false,
  setOpenAddFile: (state: boolean) => set(() => ({ openAddFile: state })),
}))

export default useMinio
