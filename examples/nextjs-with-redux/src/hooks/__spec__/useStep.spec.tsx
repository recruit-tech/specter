import assert from 'assert'
import { AnyAction } from 'redux'
import { act, renderHook } from '@testing-library/react-hooks'
import { steps } from 'redux-effects-steps'
import { Provider } from 'react-redux'
import { createMockStore } from '../../utils/for-tests/createMockStore'
import { useStep } from '../useStep'

describe('useSteps', () => {
  let sampleStep: (payload: { data: string }) => AnyAction
  beforeEach(() => {
    const readyFSA = { type: 'test-ready' }
    const testingCreator = (payload: { data: string }) => ({ type: 'testing', payload })
    sampleStep = (payload: { data: string }) => {
      return steps(readyFSA, testingCreator(payload))
    }
  })

  it('works', done => {
    const store = createMockStore(_ => next => action => {
      if (action.type === 'testing') {
        assert.deepStrictEqual(action, {
          type: 'testing',
          payload: {
            data: 'dummy data'
          }
        })
        done()
      }
      return next(action)
    })
    const Context = ({ children }) => <Provider store={store}>{children}</Provider>
    const { result } = renderHook(() => useStep(sampleStep, { data: 'dummy data' }), { wrapper: Context })

    act(() => {
      result.current()
    })
  })
})
