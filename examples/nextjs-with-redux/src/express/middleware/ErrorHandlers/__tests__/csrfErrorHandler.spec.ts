import assert from 'assert'
import { csrfErrorHandler, EBADCSRFTOKEN } from '../csrfErrorHandler'

describe('unexpectedErrorHandler', () => {
  it('matcher works', () => {
    const matcher = csrfErrorHandler[0]
    const error = { code: EBADCSRFTOKEN }
    const actual = matcher(error)
    assert.ok(actual)
  })

  it('handler works when got instanceof Error', done => {
    const handler = csrfErrorHandler[1]
    const error = { code: EBADCSRFTOKEN }
    const mockResponse = {
      status: () => {},
      send: (object: any) => ({
        json: () => {
          assert.ok(typeof object.message === 'string')
          assert.ok(typeof object.status === 'number')
          assert.ok(typeof object.statusText === 'string')
          assert.equal(object.handler, 'csrfErrorHandler')
          done()
        }
      })
    }
    handler(error, {} as any, mockResponse as any, () => {})
  })
})
