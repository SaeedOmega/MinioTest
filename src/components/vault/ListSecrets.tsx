import { useEffect, useState } from "react"
import useStore from "../../stores/store"
import useVault from "../../stores/vault"
import { DeleteVault, ListVaultSecrets } from "../../repository/vault"
import { Link, useNavigate } from "react-router-dom"

const ListSecrets = () => {
  // vault objects for list
  const [objects, setObjects] = useState<string[]>([])
  const { refreshValue, refresh, setErrorMessage } = useStore()
  const { selectItem, refreshPath } = useVault()
  const navigate = useNavigate()
  useEffect(() => {
    const directory = location.pathname.replace("/vault", "")
    ListVaultSecrets(
      directory,
      (res: any) => {
        setObjects(res)
      },
      (err) => {
        setErrorMessage(err.message)
      }
    )
    refreshPath()
  }, [refreshValue, location.pathname])

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
          {location.pathname.split("/").length > 2 && (
            <tr
              onClick={() => {
                navigate(-1)
              }}
              className="cursor-pointer transition-colors duration-250 bg-slate-800 hover:bg-slate-300 "
            >
              <td className="!rounded-2xl p-3 pl-8 items-center flex justify-between border-slate-100 text-slate-400 hover:text-slate-800">
                ...
              </td>
            </tr>
          )}
          {objects?.map((b) => {
            return (
              <tr
                onClick={() => {
                  if (b[b.length - 1] !== "/") selectItem(b)
                }}
                key={b}
                className="cursor-pointer transition-colors duration-250 bg-slate-800 hover:bg-slate-300 "
              >
                <td
                  className={` ${
                    b[b.length - 1] !== "/" && "pl-8 p-3"
                  } !rounded-2xl items-center flex justify-between border-slate-100 text-slate-400 hover:text-slate-800`}
                >
                  {b[b.length - 1] !== "/" ? (
                    <div className="flex justify-between w-full">
                      {b}
                      <button
                        onClick={(event) => {
                          event.stopPropagation()
                          DeleteVault(
                            b,
                            () => {
                              refresh()
                            },
                            (err) => {
                              setErrorMessage(err.message)
                            }
                          )
                        }}
                        className="hover:underline"
                      >
                        delete
                      </button>
                    </div>
                  ) : (
                    <Link
                      className={`w-full h-full ${
                        b[b.length - 1] === "/" && "pl-8 p-3"
                      }`}
                      to={location.pathname + "/" + b.replace("/", "")}
                    >
                      {b}
                    </Link>
                  )}
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
