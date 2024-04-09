import { useState } from "react"
import useVault from "../../stores/vault"
import Input from "../Input"
import useStore from "../../stores/store"
import { AddObject } from "../../repository/vault"
import { Button, Typography, styled } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"

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
        setOpenAddSecret(false)
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
        <Typography
          variant="h4"
          className="!mb-10"
        >
          Add Object
        </Typography>
        <Input
          onChange={(str) => {
            if (typeof str === "string") setName(str)
          }}
          value={name}
          label="Path or Name"
          placeholder="like Saeed or qwe/Saeed"
        />
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
          <div className="rounded-xl mb-3 text-center px-2 py-1 ">
            {error.message}
            <br /> Try Again!
          </div>
        )}
        {
          <div className="flex justify-between w-full">
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              variant="outlined"
              onClick={done}
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
              Done
            </LoadingButton>
            <Button
              variant="outlined"
              onClick={() => setOpenAddSecret(false)}
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

export default AddObjects
