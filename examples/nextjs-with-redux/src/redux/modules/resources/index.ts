import { combineReducers } from 'redux'
import { INITIAL_STATE as SAMPLE_STATE, reducer as sample } from './sample'

export const INITIAL_STATE = {
  sample: SAMPLE_STATE
}

export const reducer = combineReducers({
  sample
})

export type ResourceRootState = ReturnType<typeof reducer>
