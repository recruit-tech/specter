import assert from 'assert'
import { required } from 'favalid'
import { createFormReducer, decideNextValueWithMaxLength, decideNextValueOnlyNumber } from '../createFormReducer'
import { FormStateType, ValidationResultType } from '../../types/StateType'

const INITIAL_STATE1: FormStateType<{ test: string }, {}> = {
  form: {
    value: { test: '' },
    validationResults: {}
  }
}

const INITIAL_STATE2: FormStateType<{ test: string }, { test: ValidationResultType }> = {
  form: {
    value: { test: '' },
    validationResults: { test: { error: false, message: '' } }
  }
}

const requiredValidater = (v: { test: string }) => required(() => '入力してください')(v.test)

describe('createFormReducer test', () => {
  it('no validator', () => {
    const reducer = createFormReducer('test', payload => payload)
    const nextState = reducer(INITIAL_STATE1, 'hoge')
    assert.deepStrictEqual(nextState, {
      form: {
        value: { test: 'hoge' },
        validationResults: {}
      }
    })
  })

  it('required validator: valid', () => {
    const reducer = createFormReducer('test', payload => payload, requiredValidater)
    const nextState = reducer(INITIAL_STATE2, 'hoge')
    assert.deepStrictEqual(nextState, {
      form: {
        value: { test: 'hoge' },
        validationResults: { test: { error: false, message: '' } }
      }
    })
  })

  it('required validator: invalid', () => {
    const reducer = createFormReducer('test', payload => payload, requiredValidater)
    const nextState = reducer(INITIAL_STATE2, '')
    assert.deepStrictEqual(nextState, {
      form: {
        value: { test: '' },
        validationResults: { test: { error: true, message: '入力してください' } }
      }
    })
  })

  it('decideNextValueWithMaxLength を使って文字数制限ができる', () => {
    const reducer = createFormReducer('test', decideNextValueWithMaxLength(2))
    const nextState = reducer(INITIAL_STATE1, '1234')
    assert.deepStrictEqual(nextState, {
      form: {
        value: { test: '12' },
        validationResults: {}
      }
    })
  })

  it('decideNextValueOnlyNumber を使って数字のみの入力制限ができる', () => {
    const reducer = createFormReducer('test', decideNextValueOnlyNumber)
    const nextState = reducer(INITIAL_STATE1, 'hoo1234abc')
    assert.deepStrictEqual(nextState, {
      form: {
        value: { test: '1234' },
        validationResults: {}
      }
    })
  })
})
