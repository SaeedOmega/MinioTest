import ListSecrets from "../components/vault/ListSecrets"
import useVault from "../stores/vault"

const VaultPage = () => {
  const { setOpenAddSecret, path } = useVault()
  return (
    <div className="flex flex-col p-5 select-none">
      <div className="flex items-center">
        <div className="flex flex-col p-2">
          <h2>List of Secrets</h2>
          <p className="text-[12px] font-light">{path}</p>
        </div>
        <h2
          onClick={() => setOpenAddSecret(true)}
          className="ml-5 border h-fit border-black p-2 rounded-xl cursor-pointer hover:bg-slate-500 transition-colors duration-300 hover:text-white"
        >
          + Add a Object
        </h2>
      </div>
      <ListSecrets />
    </div>
  )
}

export default VaultPage
