import axios from "axios"

/**
 * Get Key/Values from vault object
 *
 * @param name name of object
 */
export const Get = async (name: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:8200/v1/secret/data/${name}`, {
        headers: {
          "x-vault-token": "test-vault",
        },
      })
      .then((res) => resolve(res.data.data.data))
      .catch((err) => reject(err))
  })
}

/**
 *  POST to vault
 *
 * @param resultObject data object for post to vault
 * @param name name of object
 */
export const Post = async (resultObject: {}, name: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `http://localhost:8200/v1/secret/data${name}`,
        JSON.stringify(resultObject),
        {
          headers: {
            "x-vault-token": "test-vault",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

/**
 *  PUT to vault
 *  for edit vault Object
 *
 * @param resultObject data object for edit vault object
 * @param name name of object
 */
export const Put = async (resultObject: {}, name: string) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `http://localhost:8200/v1/secret/data/${name}`,
        JSON.stringify(resultObject),
        {
          headers: {
            "x-vault-token": "test-vault",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

/**
 * LIST secrets in vault
 */
export const List = async (directoryName: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    axios({
      headers: {
        "x-vault-token": "test-vault",
      },
      baseURL: `http://localhost:8200/v1/secret/metadata${directoryName}`,
      method: "LIST",
    })
      .then((res) => resolve(res.data.data.keys))
      .catch((err) => reject(err))
  })
}

/**
 * DELETE object in vault
 */
export const Delete = async (directoryName: string) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`http://localhost:8200/v1/secret/metadata${directoryName}`, {
        headers: {
          "x-vault-token": "test-vault",
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}
