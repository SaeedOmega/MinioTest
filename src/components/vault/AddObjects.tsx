import { useEffect, useState } from "react"
import useVault from "../../stores/vault"
import Input from "../Input"
import useStore from "../../stores/store"
import { AddObject } from "../../repository/vault"

const AddObjects = () => {
  const {
    setOpenAddSecret,
    items,
    increaseItems,
    editItems,
    deleteItem,
    setItems,
  } = useVault()
  const { refresh } = useStore()
  // for input name
  const [name, setName] = useState<string>("")
  // error state
  const [error, setError] = useState<Error>()
  // loading state
  const [loading, setLoading] = useState(false)

  /**
   * this function sent object to save in vault
   */
  const done = () => {
    setLoading(true)
    AddObject(
      items,
      name,
      () => {
        setItems([{ key: "", value: "" }])
        setName("")
        refresh()
      },
      (err) => {
        setError(err)
      },
      () => {
        setLoading(false)
      }
    )
  }
  return (
    <div
      onClick={() => setOpenAddSecret(false)}
      className="w-screen z-30 select-none backdrop-blur-sm flex justify-center items-center fixed top-0 bottom-0"
    >
      <div
        onClick={(event) => {
          event.stopPropagation()
        }}
        className="bg-slate-900 w-96 p-10 flex flex-col items-center text-white rounded-2xl"
      >
        <h1 className="text-3xl mb-10">Add Object</h1>
        <Input
          onChange={(str) => {
            if (typeof str === "string") setName(str)
          }}
          value={name}
          name="objectName"
          label="Path or Name"
          placeholder="like Saeed or qwe/Saeed"
          className=""
        />
        <div
          id="itemContainer"
          className="flex flex-col overflow-auto h-80"
        >
          {items.map((item, index) => (
            <div
              className="flex"
              key={index + 1}
            >
              <Input
                onChange={(itemmm) => {
                  if (typeof itemmm === "object") {
                    if (itemmm.key)
                      editItems({ ...itemmm, key: itemmm.key }, index)
                    if (itemmm.value)
                      editItems({ ...itemmm, value: itemmm.value }, index)
                  }
                }}
                value={item}
                indexItem={index + 1}
                placeholder="like Saeed"
              />
              <button
                onClick={() => deleteItem(index)}
                className="text-[12px] pr-2 relative bottom-[-10px] ml-2 hover:text-slate-600 transition-colors duration-250"
              >
                delete
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => increaseItems()}
          className="border border-white w-full mb-10 mt-5 py-0.5 hover:bg-slate-400 hover:text-slate-800 rounded-lg transition-colors duration-250"
        >
          + Add Item
        </button>
        {error && (
          <div className="rounded-xl mb-3 text-center px-2 py-1 ">
            {error.message}
            <br /> Try Again!
          </div>
        )}
        {loading ? (
          <div className="rounded-xl px-2 py-1">Loading...</div>
        ) : (
          <div className="flex">
            <button
              onClick={done}
              className="rounded-xl hover:bg-slate-600 transition-colors duration-300 border border-white px-2 py-1 w-28"
            >
              Done
            </button>
            <button
              onClick={() => setOpenAddSecret(false)}
              className="ml-5 hover:bg-slate-600 transition-colors duration-300 rounded-xl border border-white px-2 py-1 w-28"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddObjects
