import { useEffect, useState } from "react"
import mc from "../../utils/mc"
import useStore from "../../stores/store"
import axios from "axios"
import fileDownload from "js-file-download"
import useMinio from "../../stores/minio"

const ListBuckets = () => {
  const [buckets, setBuckets] = useState<any[]>()
  const { refreshValue, refresh } = useStore()
  const { openAddBucket } = useMinio()
  const getObjects = async () => {
    const data: any[] = []
    let stream = mc.listObjects("test", "", true)
    stream.on("data", function (obj) {
      data.push(obj)
    })
    stream.on("end", function () {
      setBuckets(data)
    })
    stream.on("error", function (err) {
      console.log(err)
    })
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
            <th className=" border-slate-600 font-medium p-4 pl-8 pb-3 text-slate-400 text-left">
              File Name
            </th>
          </tr>
        </thead>
        <tbody>
          {buckets?.map((b) => {
            return (
              <tr
                key={b.name}
                className="bg-slate-800"
              >
                <td className="!rounded-2xl items-center flex justify-between border-slate-100 p-3 pl-8 text-slate-400">
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