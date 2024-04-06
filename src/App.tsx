import { useEffect, useState } from "react"
import AddObjects from "./AddObjects"
import ListBuckets from "./ListFiless"
import useStore from "./stores/store"
import mc from "./utils/mc"
import axios from "axios"

function App() {
  const { setOpenAddBucket, openAddBucket } = useStore()
  useEffect(() => {
    mc.bucketExists("test", function (err, exists) {
      if (err) {
        return console.log(err)
      }
      if (!exists) {
        mc.makeBucket("test", "us-east-1", function (err) {
          if (err) return console.log("Error creating bucket.", err)
          console.log('Bucket created successfully in "us-east-1".')
          location.reload()
        })
      }
      return console.log("Bucket exists.")
    })
    axios
      .get("http://localhost:8200/v1/secret/data/test", {
        headers: {
          "x-vault-token": "test-vault",
        },
      })
      .catch((error) => {
        if (error.message.includes("404")) {
          axios
            .post(
              "http://127.0.0.1:8200/v1/secret/data/test",
              { data: {} },
              { headers: { "x-vault-token": "test-vault" } }
            )
            .then(() => {
              location.reload()
            })
        }
      })
  }, [])

  return (
    <>
      {openAddBucket && <AddObjects />}
      <div className="flex flex-col p-5 select-none">
        <div className="flex items-center">
          <div className="flex flex-col p-2">
            <h2>List of Files</h2>
            <p className="text-[12px] font-light">Bucket Name: test</p>
          </div>
          <h2
            onClick={() => setOpenAddBucket(true)}
            className="ml-5 border h-fit border-black p-2 rounded-xl cursor-pointer hover:bg-slate-500 transition-colors duration-300 hover:text-white"
          >
            + Add a File
          </h2>
        </div>
        <div className="mt-5">
          <ListBuckets />
        </div>
      </div>
    </>
  )
}

export default App
