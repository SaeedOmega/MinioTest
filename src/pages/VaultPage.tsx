import ListSecrets from "../components/vault/ListSecrets"

const VaultPage = () => {
  return (
    <div className="flex flex-col p-5 select-none">
      <div className="flex items-center">
        <h2>List of Secrets</h2>
        <h2
          //   onClick={() => setOpenAddBucket(true)}
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
