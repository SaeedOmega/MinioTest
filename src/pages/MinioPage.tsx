import { useEffect } from "react"
import ListBuckets from "../components/minio/ListFiless"
import useMinio from "../stores/minio"
import { ExistBucket } from "../repository/mc"

function MinioPage() {
  const { setOpenAddFile: setOpenAddBucket } = useMinio()
  useEffect(() => {
    ExistBucket()
  }, [])

  return (
    <>
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

export default MinioPage
