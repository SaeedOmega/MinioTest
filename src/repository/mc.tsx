import axios from "axios"
import { mc } from "../datasource/mc"
import fileDownload from "js-file-download"

/**
 * check exist test bucket
 * if test bucket not exist create a test bucket
 */
export const ExistBucket = async () => {
  mc.bucketExists("test", function (err, exists) {
    if (err) {
      return console.log(err)
    }
    if (!exists) {
      MakeBucket()
    }
    return console.log("Bucket exists.")
  })
}

/**
 * create bucket
 */
export const MakeBucket = async () => {
  mc.makeBucket("test", "us-east-1", function (err) {
    if (err) return console.log("Error creating bucket.", err)
    console.log('Bucket created successfully in "us-east-1".')
    location.reload()
  })
}

/**
 * add a file to bucket
 *
 * @param fileName string name of file
 * @param buf Buffer file for upload
 * @param successFunc a function for when successfully API call
 * @param errorFunc a function for when error API call
 */
export const AddObjectToBucket = async (
  fileName: string,
  buf: Buffer,
  successFunc: () => void,
  errorFunc: (err: string) => void
) => {
  await mc.putObject("test", fileName, buf, function (err, etag) {
    if (err) {
      errorFunc(err.message)
      return
    }
    successFunc()
  })
}

/**
 *
 * @param successFunc a function for when successfully API call
 */
export const GetObjects = (successFunc: (data: any[]) => void) => {
  const data: any[] = []
  let stream = mc.listObjects("test", "", true)
  stream.on("data", function (obj) {
    data.push(obj)
  })
  stream.on("end", function () {
    successFunc(data)
  })
  stream.on("error", function (err) {
    console.log(err)
  })
}

/**
 * remove a file from minio
 * @param fileName string name of file
 * @param successFunc a function for when successfully API call
 */
export const DeleteObject = async (
  fileName: string,
  successFunc: () => void
) => {
  mc.removeObject("test", fileName).then(() => successFunc())
}

/**
 *  download file from minio
 *
 * @param fileName name of file
 */
export const DownloadFile = async (fileName: string) => {
  const url = await mc.presignedUrl("GET", "test", fileName)
  fileDownload((await axios.get(url, { responseType: "blob" })).data, fileName)
}
