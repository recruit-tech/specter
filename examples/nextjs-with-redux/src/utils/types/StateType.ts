/**
 *  StateType<T, M>
 *  reduxのstate型
 *  T はデータの型
 *  M は，データを修飾する情報の型
 *  networkを通して取得するものは，loading と error をなるべく入れる（初期値）
 */
export interface ResourceStateType<
  T,
  M = {
    loading: boolean
    errors: string[] | null
  }
> {
  data: T
  meta: M
}

/**
 *  ValidationResultType
 *  本アプリにおけるバリデータの返却値型
 * 'favalid/lib/core'のValidationResultの部分型でもある
 */
export interface ValidationResultType {
  error: boolean
  message?: string
}
/**
 *  FormStateType<V, R>
 *  reduxにおけるフォームのstate型
 *  V はフォームにおける各値を表すオブジェクト
 *  R は各値のバリデーション結果。
 */
export interface FormStateType<V extends Record<string, any>, R extends { [K in keyof V]?: ValidationResultType }> {
  form: {
    value: V
    validationResults: R
  }
}
