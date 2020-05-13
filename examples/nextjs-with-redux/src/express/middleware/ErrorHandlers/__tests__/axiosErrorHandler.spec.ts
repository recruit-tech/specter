import assert from 'assert'
import { AxiosError } from 'axios'
import createError from 'axios/lib/core/createError'
import { axiosErrorHandler } from '../aixosErrorHandler'

describe('axiosErrorHandler', () => {
  it('matcher is works', () => {
    const matcher = axiosErrorHandler[0]
    const err: AxiosError = createError('for tests', {}, 500, {}, {})
    const actual = matcher(err)
    assert.ok(actual)
  })

  it('handler is works (500)', () => {
    const handler = axiosErrorHandler[1]
    const err: AxiosError = createError(
      'this is mock error for test',
      {},
      500,
      {},
      { status: 500, data: { errors: [{ kind: 'bad_request', message: 'for tests' }] } }
    )
    const mockRequest = {
      ip: '0.0.0.0',
      originalUrl: '/',
      method: 'GET',
      url: '/'
    }
    const mockResponse = {
      set: () => {},
      status: () => {},
      send: (object: any) => ({
        json: () => {
          assert.deepStrictEqual(object, {
            errors: [{ kind: 'bad_request', message: 'for tests' }]
          })
        }
      })
    }
    handler(err, mockRequest as any, mockResponse as any, () => {})
  })

  it('handler is works (400)', () => {
    const handler = axiosErrorHandler[1]
    const err: AxiosError = createError(
      'this is mock error for test',
      {},
      400,
      {},
      { status: 400, data: { errors: [{ kind: 'bad_request', message: 'for tests' }] } }
    )
    const mockRequest = {
      ip: '0.0.0.0',
      originalUrl: '/',
      method: 'GET',
      url: '/'
    }
    const mockResponse = {
      set: () => {},
      status: () => {},
      send: (object: any) => ({
        json: () => {
          assert.deepStrictEqual(object, {
            errors: [{ kind: 'bad_request', message: 'for tests' }]
          })
        }
      })
    }
    handler(err, mockRequest as any, mockResponse as any, () => {})
  })
})
