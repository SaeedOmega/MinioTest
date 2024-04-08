import { useState } from "react"
import useVault from "../../stores/vault"
import Input from "../Input"
import axios from "axios"
import useStore from "../../stores/store"

const AddObjects = () => {
  const {
    setOpenAddSecret,
    items,
    increaseItems,
    editItems,
    deleteItem,
    sentItems,
  } = useVault()
  const { refresh } = useStore()
  const [name, setName] = useState<string>("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const done = () => {
    setLoading(true)
    const resultObject: any = {
      data: {},
    }
    for (const item of items) {
      if (item.key !== "") resultObject.data[item.key] = item.value
    }
    axios
      .post(
        `http://localhost:8200/v1/secret/data/${name}`,
        JSON.stringify(resultObject),
        {
          headers: {
            "x-vault-token": "test-vault",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        sentItems()
        setName("")
        refresh()
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <div
      onClick={(event) => setOpenAddSecret(false)}
      className="w-screen z-30 select-none backdrop-blur-sm flex justify-center items-center fixed top-0 bottom-0"
    >
      <div
        onClick={(event) => {
          event.stopPropagation()
        }}
        className="bg-slate-800 w-96 p-10 flex flex-col items-center text-white rounded-2xl"
      >
        <h1 className="text-3xl mb-10">Add Object</h1>
        <Input
          onChange={(str) => {
            if (typeof str === "string") setName(str)
          }}
          value={name}
          name="objectName"
          label="Object Name"
          placeholder="like Saeed"
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
                name="objectName"
                label="Object Name"
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
          className="border border-white w-full mt-5 py-0.5 hover:bg-slate-400 hover:text-slate-800 rounded-lg transition-colors duration-250"
        >
          + Add Item
        </button>
        {error && (
          <div className="rounded-xl px-2 py-1 mb-5">
            {error}
            <br /> Try Again!
          </div>
        )}
        {loading ? (
          <div className="rounded-xl px-2 py-1">Loading...</div>
        ) : (
          <div className="flex mt-10">
            <button
              onClick={done}
              className="rounded-xl hover:bg-slate-600 transition-colors duration-300 border border-white px-2 py-1 w-28"
            >
              Done
            </button>
            <button
              onClick={(event) => setOpenAddSecret(false)}
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
