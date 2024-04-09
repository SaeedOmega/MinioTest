import { useState } from "react"
import useStore from "../../stores/store"
import { Buffer } from "buffer"
import useMinio from "../../stores/minio"
import { AddObjectToBucket } from "../../repository/mc"
import { Button, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"

const AddFile = () => {
  const { refresh } = useStore()
  const { setOpenAddFile: setOpenAddBucket } = useMinio()
  // selected file for upload
  const [file, setFile] = useState<File | null>()
  // loading state
  const [loading, setLoading] = useState(false)
  // error state
  const [error, setError] = useState<string | null>(null)

  /**
   * this function upload selected file to minio
   */
  const uploadObj = async () => {
    const fileBuffer = new FileReader()
    if (file) {
      setLoading(true)
      fileBuffer.readAsArrayBuffer(file)

      fileBuffer.onload = async function () {
        const buf = Buffer.from(await file.arrayBuffer())
        await AddObjectToBucket(
          file.name,
          buf,
          () => {
            setLoading(false)
            setOpenAddBucket(false)
            refresh()
          },
          (err) => {
            setError(err)
          }
        )
      }

      fileBuffer.onerror = function (error) {
        console.log("Error: ", error)
      }
    }
  }

  return (
    <div
      onClick={(event) => setOpenAddBucket(false)}
      className="w-screen z-30 select-none backdrop-blur-sm flex justify-center items-center fixed top-0 bottom-0"
    >
      <div
        onClick={(event) => {
          event.stopPropagation()
        }}
        className="bg-slate-900 p-10 flex flex-col items-center text-white rounded-2xl"
      >
        <Typography
          variant="h4"
          className="!mb-10"
        >
          Add File
        </Typography>{" "}
        <input
          type="file"
          className="mb-10"
          onChange={(event) => {
            if (event.target.files) setFile(event.target.files[0])
          }}
        />
        {error && (
          <div className="rounded-xl text-center px-2 py-1 mb-5">
            {error}
            <br /> Try Again!
          </div>
        )}
        {
          <div className="flex w-full justify-between">
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              variant="outlined"
              onClick={uploadObj}
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
              onClick={() => setOpenAddBucket(false)}
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

export default AddFile
