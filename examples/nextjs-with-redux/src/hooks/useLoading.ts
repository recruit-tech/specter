import { pathOr } from 'remeda'
import { useSelector } from 'react-redux'
import { RootState } from './../redux/modules/index'

type ResourcesKeys = keyof RootState['resources']

/**
 * resources 配下(master除く)の loading 状態を取得
 * １つでも loading: true なら true を返す
 * @param resourceNames
 * loading 状態を取得したい resources の path を指定(複数可)
 * 指定しなければ全てチェック
 */
export const useLoading = (...resourceNames: Array<Exclude<ResourcesKeys, 'master'>>): boolean => {
  return useSelector((state: RootState) => {
    const keys = resourceNames.length ? resourceNames : Object.keys(state['resources'])
    return keys.some(key => pathOr(state.resources[key], ['meta', 'loading'], false))
  })
}
