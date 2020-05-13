import assert from 'assert'
import { createErrorHandler } from '../../ErrorHandler'

describe('ErrorHandler', () => {
  let middleware: ReturnType<typeof createErrorHandler>

  beforeEach(() => {
    middleware = createErrorHandler()
  })

  it('works', () => {
    const response = {
      status: () => {},
      send: (object: any) => ({
        json: () => {
          assert.ok(typeof object.message === 'string')
        }
      })
    }
    middleware(new Error('a'), {} as any, response as any, () => {})
  })
})
