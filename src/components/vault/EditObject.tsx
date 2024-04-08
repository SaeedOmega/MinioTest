import { useEffect, useState } from "react"
import useVault from "../../stores/vault"
import Input from "../Input"
import { EditVaultObject, GetKeyValues } from "../../repository/vault"

const EditObject = () => {
  const {
    selectItem,
    selectedItem,
    increaseItems,
    items,
    setItems,
    editItems,
    deleteItem,
  } = useVault()
  // error state
  const [error, setError] = useState("")
  // loading state
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const arr: { key: string; value: string }[] = []
    GetKeyValues(
      selectedItem,
      (res) => {
        for (const keyy in res) {
          arr.push({ key: keyy, value: res[keyy] })
        }
        setItems(arr)
      },
      (err) => console.log(err)
    )
  }, [])

  /**
   * this function edit vault object
   */
  const edit = () => {
    setLoading(true)
    EditVaultObject(
      items,
      selectedItem,
      () => {
        setItems([{ key: "", value: "" }])
        selectItem("")
      },
      (err) => {
        setError(err.message)
      },
      () => {
        setLoading(false)
      }
    )
  }
  return (
    <div
      onClick={(event) => selectItem("")}
      className="w-screen z-30 select-none backdrop-blur-sm flex justify-center items-center fixed top-0 bottom-0"
    >
      <div
        onClick={(event) => {
          event.stopPropagation()
        }}
        className="w-96 p-10 flex flex-col items-center text-white rounded-2xl bg-slate-900"
      >
        <h1 className="text-3xl mb-10">{selectedItem}</h1>
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
              onClick={edit}
              className="rounded-xl hover:bg-slate-600 transition-colors duration-300 border border-white px-2 py-1 w-28"
            >
              Edit
            </button>
            <button
              onClick={(event) => selectItem("")}
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

export default EditObject
