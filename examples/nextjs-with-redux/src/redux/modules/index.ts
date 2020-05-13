import { combineReducers } from 'redux'
import { reducer as resources, INITIAL_STATE as RESOURCES_STATE } from './resources'
import { reducer as config, INITIAL_STATE as CONFIG_STATE } from './config'

export const INITIAL_STATE = {
  resources: RESOURCES_STATE,
  config: CONFIG_STATE
}

export const reducer = combineReducers({
  resources,
  config
})

export type RootState = ReturnType<typeof reducer>
