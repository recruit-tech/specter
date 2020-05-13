import { steps } from 'redux-effects-steps'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { specterRead } from '@specter/redux-effects-specter'
import { ResourceStateType } from '../../../../utils/types/StateType'
import { Response } from './types'
import { FixMe } from '../../../../utils/types/FixMe'

/**
 * actions
 */
const actionCreator = actionCreatorFactory('SAMPLE')

const readReady = actionCreator('READY')
const successRead = actionCreator<Response>('SUCCESS')
const failureRead = actionCreator<FixMe>('FAILURE', {}, true)

/**
 * steps
 */
export function readSample() {
  return steps(
    //
    readReady(),
    specterRead('example'),
    [successRead, failureRead]
  )
}

/**
 * state
 */
export type State = ResourceStateType<{
  title: string
  body: string
}>

export const INITIAL_STATE: State = {
  data: null,
  meta: {
    loading: false,
    errors: []
  }
}

/**
 * reducer
 */
export const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(readReady, state => ({
    ...state,
    meta: {
      ...state.meta,
      loading: true
    }
  }))
  .case(successRead, (state, data) => ({
    ...state,
    data,
    meta: {
      ...state.meta,
      loading: false
    }
  }))
  .case(failureRead, (state, { errors }) => ({
    ...state,
    meta: {
      loading: false,
      errors
    }
  }))
