import { useEffect, useState } from "react"
import mc from "./utils/mc"
import useStore from "./stores/store"
import axios from "axios"
import fileDownload from "js-file-download"

const ListBuckets = () => {
  const [buckets, setBuckets] = useState<{ name: string }[]>()
  const { openAddBucket, refreshValue, refresh } = useStore()
  const getObjects = async () => {
    const res = await axios.get("http://localhost:8200/v1/secret/data/test", {
      headers: {
        "x-vault-token": "test-vault",
      },
    })
    const data: { name: string }[] = []
    if (res.data.data.data.data) {
      let array = Object.entries(res.data.data.data.data)

      for (let index = 0; index < array.length; index++) {
        data.push({
          //@ts-ignore
          name: array[index][1],
        })
      }
    }
    setBuckets(data)
  }

  const deleteObjects = (fileName: string) => {
    mc.removeObject("test", fileName)
    refresh()
  }

  const downloadURL = async (name: string) => {
    const url = await mc.presignedUrl("GET", "test", name)
    fileDownload((await axios.get(url)).data, name)
  }
  useEffect(() => {
    if (openAddBucket === false) getObjects()
  }, [refreshValue])
  return (
    <>
      <table className="table-auto w-full text-sm">
        <thead>
          <tr>
            <th className=" dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-slate-200 dark:text-slate-400 text-left">
              File Name
            </th>
          </tr>
        </thead>
        <tbody>
          {buckets?.map((b) => {
            return (
              <tr
                key={b.name}
                className="bg-white dark:bg-slate-800"
              >
                <td className="!rounded-2xl items-center flex justify-between border-slate-100 dark:border-slate-700 p-3 pl-8 text-slate-500 dark:text-slate-400">
                  {b.name}
                  <div className="flex">
                    <button
                      onClick={() => downloadURL(b.name)}
                      className="border mr-5 border-slate-500 rounded-xl p-2 w-28 text-center hover:bg-slate-700 transition-colors duration-300"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => deleteObjects(b.name)}
                      className="border border-slate-500 rounded-xl p-2 w-28 text-center hover:bg-slate-700 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default ListBuckets
