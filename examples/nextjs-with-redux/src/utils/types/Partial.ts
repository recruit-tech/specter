/**
 * @example
 * type A = Partial<{ foo: 'bar', hoge?: 'poge' }>
 *   => A is { foo: 'bar', hoge: 'poge' }
 */
export type UnPartial<T extends object> = { [P in keyof T]-?: T[P] }

/**
 * @example
 * type A = Partial<{ foo: 'bar', hoge?: 'poge' }>
 *   => A is { foo?: 'bar', hoge?: 'poge' }
 */
export type Partial<T extends object> = { [P in keyof T]?: T[P] }
