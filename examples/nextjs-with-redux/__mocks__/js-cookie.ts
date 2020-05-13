// @ts-ignore
jest.mock('js-cookie', () => {
  return {
    _map: new Map<string, string>(),
    get(key: string) {
      return this._map.get(key)
    },
    set(key: string, value: string, _opt?: Record<string, string>) {
      return this._map.set(key, value)
    }
  }
})
