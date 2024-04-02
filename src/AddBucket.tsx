import useStore from "./stores/store"

const AddBucket = () => {
  const { setOpenAddBucket } = useStore()
  return (
    <div
      onClick={(event) => setOpenAddBucket(false)}
      className="w-screen h-screen select-none backdrop-blur-sm flex justify-center items-center absolute"
    >
      <div
        onClick={(event) => {
          event.stopPropagation()
        }}
        className="bg-slate-800 p-10 flex flex-col items-center text-white rounded-2xl"
      >
        <h1 className="text-3xl mb-10">Add Bucket</h1>
        <input
          type="file"
          className="mb-10"
        />
        <div className="flex">
          <button
            onClick={(event) => {
              setOpenAddBucket(false)
            }}
            className="rounded-xl hover:bg-slate-600 transition-colors duration-300 border border-white px-2 py-1 w-28"
          >
            Done
          </button>
          <button
            onClick={(event) => setOpenAddBucket(false)}
            className="ml-5 hover:bg-slate-600 transition-colors duration-300 rounded-xl border border-white px-2 py-1 w-28"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddBucket
