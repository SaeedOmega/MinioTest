import * as minio from "minio"

/**
 * a minio client object
 */
export const mc = new minio.Client({
  endPoint: "localhost",
  useSSL: false,
  port: 9000,
  accessKey: "minioadmin",
  secretKey: "minioadmin",
})
