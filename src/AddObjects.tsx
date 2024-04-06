import { useState } from "react"
import useStore from "./stores/store"
import mc from "./utils/mc"
import { Buffer } from "buffer"
import axios from "axios"

const AddObjects = () => {
  const { setOpenAddBucket, refresh, increaseItem, countItems } = useStore()
  const [file, setFile] = useState<File | null>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadObj = async () => {
    const fileBuffer = new FileReader()
    if (file) {
      setLoading(true)
      fileBuffer.readAsArrayBuffer(file)

      fileBuffer.onload = async function () {
        const buf = Buffer.from(await file.arrayBuffer())
        // Replace "hello" with your bucket name and "FileName" with your desired file name
        await mc.putObject("test", file.name, buf, function (err, etag) {
          if (err) {
            setError(err.message)
            return
          }
          setLoading(false)
          setOpenAddBucket(false)
          refresh()
        })
      }

      fileBuffer.onerror = function (error) {
        console.log("Error: ", error)
      }
      let key = file.name.split(".")[0]
      const oldData = await axios.get(
        "http://localhost:8200/v1/secret/data/test",
        {
          headers: {
            "x-vault-token": "test-vault",
          },
        }
      )
      axios.post(
        "http://localhost:8200/v1/secret/data/test",
        JSON.stringify({
          data: { data: { ...oldData.data.data.data.data, [key]: file.name } },
        }),
        {
          headers: {
            "x-vault-token": "test-vault",
            "Content-Type": "application/json",
          },
        }
      )
    }
  }

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
          onChange={(event) => {
            if (event.target.files) setFile(event.target.files[0])
          }}
        />
        {error && (
          <div className="rounded-xl px-2 py-1 mb-5">
            {error}
            <br /> Try Again!
          </div>
        )}
        {loading ? (
          <div className="rounded-xl px-2 py-1">Loading...</div>
        ) : (
          <div className="flex">
            <button
              onClick={uploadObj}
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
        )}
      </div>
    </div>
  )
}

export default AddObjects
