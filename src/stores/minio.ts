import { create } from "zustand"

type Minio = {
  openAddBucket: boolean
  setOpenAddBucket: (state: boolean) => void
}

const useMinio = create<Minio>()((set) => ({
  openAddBucket: false,
  setOpenAddBucket: (state: boolean) => set(() => ({ openAddBucket: state })),
}))

export default useMinio
