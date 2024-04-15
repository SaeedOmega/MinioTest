import { create } from "zustand";

type Store = {
  /**
   * state of open error or not
   */
  errorMessage: string;
  /**
   * count of refresh
   */
  refreshValue: number;
  /**
   * page state
   */
  wichPage: "minio" | "vault" | "nats";
  /**
   * a function for refresh page
   */
  refresh: () => void;
  /**
   * set wichPage
   *
   * @param page string name of page
   */
  setPage: (page: "minio" | "vault" | "nats") => void;
  /**
   * a function for set state of open error or not
   *
   * @param state boolean new state
   */
  setErrorMessage: (state: string) => void;
};

const useStore = create<Store>()((set) => ({
  refreshValue: 0,
  errorMessage: "",
  wichPage: location.pathname.includes("vault")
    ? "vault"
    : location.pathname.includes("minio")
    ? "minio"
    : "nats",
  setErrorMessage: (state) => set({ errorMessage: state }),
  setPage: (page) => set(() => ({ wichPage: page })),
  refresh: () => set((state) => ({ refreshValue: state.refreshValue + 1 })),
}));

export default useStore;
