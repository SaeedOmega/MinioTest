import { useEffect, useState } from "react"
import useStore from "../../stores/store"
import axios from "axios"
import useVault from "../../stores/vault"

const ListSecrets = () => {
  const [objects, setObjects] = useState<string[]>([])
  const { refresh, refreshValue } = useStore()
  const { selectItem } = useVault()
  useEffect(() => {
    axios({
      headers: {
        "x-vault-token": "test-vault",
      },
      baseURL: "http://localhost:8200/v1/secret/metadata/",
      method: "LIST",
    }).then((res: any) => {
      setObjects(res.data.data.keys)
    })
  }, [refreshValue])

  return (
    <>
      <table className="table-auto w-full text-sm">
        <thead>
          <tr>
            <th className="border-slate-600 font-medium p-4 pl-8 pb-3 text-slate-400 text-left">
              Name
            </th>
          </tr>
        </thead>
        <tbody>
          {objects?.map((b) => {
            return (
              <tr
                onClick={() => {
                  selectItem(b)
                }}
                key={b}
                className="cursor-pointer transition-colors duration-250 bg-slate-800 hover:bg-slate-300 "
              >
                <td className="!rounded-2xl items-center flex justify-between border-slate-100 p-3 pl-8 text-slate-400 hover:text-slate-800">
                  {b}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default ListSecrets
