import { useEffect, useState } from "react"
import useStore from "../../stores/store"
import useMinio from "../../stores/minio"
import { DeleteObject, DownloadFile, GetObjects } from "../../repository/mc"

const ListBuckets = () => {
  // files for list
  const [files, setFiles] = useState<any[]>()
  const { refreshValue, refresh } = useStore()
  const { openAddFile } = useMinio()

  useEffect(() => {
    if (openAddFile === false) GetObjects((data) => setFiles(data))
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
          {files?.map((b) => {
            return (
              <tr
                key={b.name}
                className="bg-slate-800"
              >
                <td className="!rounded-2xl items-center flex justify-between border-slate-100 p-3 pl-8 text-slate-400">
                  {b.name}
                  <div className="flex">
                    <button
                      onClick={() => DownloadFile(b.name)}
                      className="border mr-5 border-slate-500 rounded-xl p-2 w-28 text-center hover:bg-slate-700 transition-colors duration-300"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => DeleteObject(b.name, () => refresh())}
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
