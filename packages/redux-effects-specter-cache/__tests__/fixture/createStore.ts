import { createStore as createReduxStore, applyMiddleware, Middleware, AnyAction } from "redux"
import { SPECTER } from "@specter/redux-effects-specter"
import fetcherCacheMiddleware, { MiddlewareOption } from "../../src"

export const dummySpecterResolvedActionType = "DUMMY_SPECTER_RESOLVED"

const logger: Middleware = ({ dispatch }) => (next) => (action) => {
  if (action.type === "logging") return next(action)
  return next(action)
}

function dummySpecterMiddleware(): Middleware {
  return ({ dispatch }) => (next) => (action: AnyAction) => {
    if (action.type !== SPECTER) return next(action)
    dispatch({
      type: "logging",
      payload: action
    })
    return Promise.resolve({
      type: dummySpecterResolvedActionType,
      payload: action.payload
    })
  }
} 

const INITIAL_STATE = {
  log: []
}

export function resetStore() {
  return {
    type: "reset-store"
  }
}

export default function createStore(option?: MiddlewareOption<{ log: Array<any> }>) {
  return createReduxStore<{ log: Array<any> }, any, any, any>(
    (state, action) => {
      if (typeof state === "undefined") return INITIAL_STATE
      if (action.type === "reset-store") return INITIAL_STATE
      if (action.type === "logging") {
        const logs = state.log.concat()
        logs.push(action.payload)
        return {
          log: logs,
        }
      }
      return state
    },
    INITIAL_STATE,
    applyMiddleware(
      logger,
      fetcherCacheMiddleware({ middlewareOption: option }),
      dummySpecterMiddleware(),
    )
  )
}