import useStore from "../stores/store"

const Error = () => {
  const { setErrorMessage, errorMessage } = useStore()
  return (
    <div
      onClick={() => setErrorMessage("")}
      className="w-screen z-30 select-none backdrop-blur-sm flex justify-center items-center fixed top-0 bottom-0"
    >
      <div
        onClick={(event) => {
          event.stopPropagation()
        }}
        className="bg-slate-900 w-96 p-10 flex flex-col items-center text-white rounded-2xl"
      >
        {errorMessage}
        <button
          onClick={() => setErrorMessage("")}
          className="ml-5 mt-10 hover:bg-slate-600 transition-colors duration-300 rounded-xl border border-white px-2 py-1 w-28"
        >
          Ok
        </button>
      </div>
    </div>
  )
}

export default Error
