import { Routes, Route, Link, Navigate } from "react-router-dom"
import MinioPage from "./pages/MinioPage"
import useStore from "./stores/store"
import VaultPage from "./pages/VaultPage"
import useMinio from "./stores/minio"
import AddFile from "./components/minio/AddFile"
import useVault from "./stores/vault"
import AddObjects from "./components/vault/AddObjects"

const App = () => {
  const { setPage, wichPage } = useStore()
  const { openAddBucket } = useMinio()
  const { openAddSecret } = useVault()
  return (
    <>
      {openAddBucket && <AddFile />}
      {openAddSecret && <AddObjects />}
      <div className="flex mx-5 mt-5 select-none">
        <Link
          to="/minio"
          onClick={() => {
            if (wichPage !== "minio") setPage("minio")
          }}
          className={`${
            wichPage !== "minio"
              ? " hover:bg-slate-200 !cursor-pointer"
              : "z-20 bottom-[-1px]"
          } p-5 cursor-default transition-all duration-200 relative  bg-white border border-b-0 border-slate-900 rounded-t-2xl mr-5`}
        >
          Minio Project
        </Link>
        <Link
          to="/vault"
          onClick={() => {
            if (wichPage !== "vault") setPage("vault")
          }}
          className={`${
            wichPage !== "vault"
              ? " hover:bg-slate-200 !cursor-pointer"
              : "z-20 bottom-[-1px]"
          } p-5 cursor-default transition-all duration-200 relative  bg-white border border-b-0 border-slate-900 rounded-t-2xl mr-5`}
        >
          Vault Project
        </Link>
      </div>
      <div className="border h-[90vh] overflow-y-auto mx-2 rounded-lg select-none z-10 border-slate-800">
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/minio"
                replace={true}
              />
            }
          />
          <Route
            path="minio"
            element={<MinioPage />}
          />
          <Route
            path="vault"
            element={<VaultPage />}
          />
        </Routes>
      </div>
    </>
  )
}

export default App
