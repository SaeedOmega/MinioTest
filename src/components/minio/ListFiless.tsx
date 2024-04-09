import { useEffect, useState } from "react"
import useStore from "../../stores/store"
import useMinio from "../../stores/minio"
import { DeleteObject, DownloadFile, GetObjects } from "../../repository/mc"
import { List, ListItem, ListItemText } from "@mui/material"

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
      <List>
        <ListItem>
          <ListItemText
            className="font-medium p-4 pb-3 text-slate-500"
            primary="File Name"
          />
        </ListItem>
        {files?.map((b) => {
          return (
            <ListItem
              key={b.name}
              className="bg-slate-800 rounded-xl"
            >
              <ListItemText
                primary={b.name}
                className="items-center flex justify-between border-slate-100 p-3 text-slate-400"
              />
              <div className="flex text-slate-400">
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
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

export default ListBuckets
