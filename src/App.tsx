import AddObjects from "./AddObjects"
import ListBuckets from "./ListBuckets"
import useStore from "./stores/store"

function App() {
  const { setOpenAddBucket, openAddBucket } = useStore()
  return (
    <>
      {openAddBucket && <AddObjects />}
      <div className="flex flex-col p-5 select-none">
        <div className="flex">
          <h2 className="p-2">List of Buckets</h2>
          <h2
            onClick={() => setOpenAddBucket(true)}
            className="ml-5 border border-black p-2 rounded-xl cursor-pointer hover:bg-slate-500 transition-colors duration-300 hover:text-white"
          >
            + Add a File
          </h2>
        </div>
        <div className="mt-5">
          <ListBuckets />
        </div>
      </div>
    </>
  )
}

export default App
