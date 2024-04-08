import { Delete, Get, List, Post } from "../datasource/vault"

/**
 *  add object to vault
 *
 * @param resultObject an object data for post to vault
 * @param name name of object for vault
 * @param successFunc a function for when successfully API call
 * @param errorFunc a function for when error API call
 * @param finallyFunc a function for in finally API call
 */
export const AddObject = (
  items: {
    key: string
    value: string
  }[],
  name: string,
  successFunc: () => void,
  errorFunc: (err: Error) => void,
  finallyFunc: () => void
) => {
  const naame = name.split("/")
  if (name[0] === "/") naame.shift()
  const directory = location.pathname.replace("/vault", "")
  const resultObject: any = {
    data: {},
  }
  for (const item of items) {
    if (item.key !== "") resultObject.data[item.key] = item.value
  }
  Post(resultObject, directory + "/" + naame.join("/"))
    .then(successFunc)
    .catch(errorFunc)
    .finally(finallyFunc)
}

/**
 *  edit object to vault
 *
 * @param resultObject an object data for edit vault object
 * @param name name of object for vault
 * @param successFunc a function for when successfully API call
 * @param errorFunc a function for when error API call
 * @param finallyFunc a function for in finally API call
 */
export const EditVaultObject = (
  items: {
    key: string
    value: string
  }[],
  name: string,
  successFunc: () => void,
  errorFunc: (err: Error) => void,
  finallyFunc: () => void
) => {
  const directory = location.pathname.replace("/vault", "")
  const resultObject: any = {
    data: {},
  }
  for (const item of items) {
    if (item.key !== "") resultObject.data[item.key] = item.value
  }
  Post(resultObject, directory + "/" + name)
    .then(successFunc)
    .catch(errorFunc)
    .finally(finallyFunc)
}

/**
 *
 * @param name name of vault object
 * @param successFunc  a function for when successfully API call
 * @param errorFunc a function for when error API call
 */
export const GetKeyValues = (
  name: string,
  successFunc: (res: any) => void,
  errorFunc: (err: Error) => void
) => {
  const directory = location.pathname.replace("/vault", "")
  Get(directory + "/" + name)
    .then(successFunc)
    .catch(errorFunc)
}

/**
 *  list all of node in a vault directory
 *
 * @param directoryName folder name for list objects
 * @param successFunc a function for when successfully API call
 * @param errorFunc a function for when error API call
 */
export const ListVaultSecrets = (
  directoryName: string = "",
  successFunc: (res: any) => void,
  errorFunc: (err: Error) => void
) => {
  List(directoryName)
    .then((res) => {
      const array1: string[] = []
      const array2: string[] = []
      res.forEach((item) => {
        if (item.includes("/")) array1.push(item)
        else array2.push(item)
      })
      successFunc(array1.concat(array2))
    })
    .catch(errorFunc)
}

/**
 * delete object from vault
 *
 * @param name object name for delete
 * @param successFunc a function for when successfully API call
 * @param errorFunc a function for when error API call
 */
export const DeleteVault = (
  name: string = "",
  successFunc: (res: any) => void,
  errorFunc: (err: Error) => void
) => {
  const directory = location.pathname.replace("/vault", "")
  Delete(directory + "/" + name)
    .then(successFunc)
    .catch(errorFunc)
}
