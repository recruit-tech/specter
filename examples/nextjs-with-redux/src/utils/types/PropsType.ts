/**
 *  PropsType<T>
 *  T は Componentの型
 *  T の Props型を Component から推論するためのユーティリティ型
 */
export type PropsType<T> = T extends React.FC<infer P>
  ? P
  : T extends React.ComponentClass<infer P>
  ? P
  : never;
