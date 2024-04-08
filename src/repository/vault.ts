import { Get, List, Post } from "../datasource/vault"

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
  const resultObject: any = {
    data: {},
  }
  for (const item of items) {
    if (item.key !== "") resultObject.data[item.key] = item.value
  }
  Post(resultObject, name)
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
  const resultObject: any = {
    data: {},
  }
  for (const item of items) {
    if (item.key !== "") resultObject.data[item.key] = item.value
  }
  Post(resultObject, name)
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
  Get(name).then(successFunc).catch(errorFunc)
}

export const ListVaultSecrets = (
  successFunc: (res: any) => void,
  errorFunc: (err: Error) => void
) => {
  List().then(successFunc).catch(errorFunc)
}
