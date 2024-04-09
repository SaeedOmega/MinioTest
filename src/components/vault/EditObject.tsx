import { useEffect, useState } from "react"
import useVault from "../../stores/vault"
import Input from "../Input"
import { EditVaultObject, GetKeyValues } from "../../repository/vault"
import useStore from "../../stores/store"
import { Button, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"

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
  const { setErrorMessage } = useStore()

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
      (err) => setErrorMessage(err.message)
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
      onClick={(event) => {
        setItems([{ key: "", value: "" }])
        selectItem("")
      }}
      className="w-screen z-30 select-none backdrop-blur-sm flex justify-center items-center fixed top-0 bottom-0"
    >
      <div
        onClick={(event) => {
          event.stopPropagation()
        }}
        className="w-96 p-10 flex flex-col items-center text-white rounded-2xl bg-slate-900"
      >
        <Typography
          variant="h4"
          className="!mb-10"
        >
          {selectedItem}
        </Typography>
        <div
          id="itemContainer"
          className="flex flex-col overflow-auto h-80"
        >
          {items.map((item, index) => (
            <Input
              key={index + 1}
              deleteFunc={() => deleteItem(index)}
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
              label="Object Name"
              placeholder="like Saeed"
            />
          ))}
        </div>
        <Button
          variant="outlined"
          onClick={() => increaseItems()}
          className="w-full !mb-10 !mt-5"
          sx={{
            color: "white",
            borderColor: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#94a3b8",
              color: "#1e293b",
              borderColor: "#94a3b8",
            },
          }}
        >
          + Add Item
        </Button>
        {error && (
          <div className="rounded-xl px-2 py-1 mb-5">
            {error}
            <br /> Try Again!
          </div>
        )}
        {
          <div className="flex justify-between w-full">
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              variant="outlined"
              onClick={edit}
              className="w-[45%]"
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#94a3b8",
                  color: "#1e293b",
                  borderColor: "#94a3b8",
                },
                "&.MuiLoadingButton-loading": {
                  color: "#94a3b8",
                  borderColor: "#94a3b8",
                },
              }}
            >
              Edit
            </LoadingButton>
            <Button
              variant="outlined"
              onClick={() => {
                setItems([{ key: "", value: "" }])
                selectItem("")
              }}
              className="w-[45%]"
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#94a3b8",
                  color: "#1e293b",
                  borderColor: "#94a3b8",
                },
              }}
            >
              Cancel
            </Button>
          </div>
        }
      </div>
    </div>
  )
}

export default EditObject
