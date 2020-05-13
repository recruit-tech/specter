import React, { Component } from 'react'
import { Dispatch, Store } from 'redux'
import { AppContext } from 'next/app'
import { RootState, INITIAL_STATE } from '../redux/modules'
import { getOrCreateStore } from '../redux/createStore'
import { isServer } from '../utils/constants/runtimeCondition'

export const withReduxStore = (App: any) => {
  return class AppWithRedux extends Component<{}> {
    static async getInitialProps(appContext: AppContext & { ctx: { dispatch: Dispatch } }) {
      const { ctx } = appContext
      const reduxStore = getOrCreateStore(INITIAL_STATE)
      ctx.dispatch = reduxStore.dispatch

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return isServer && ctx.req
        ? {
            ...appProps,
            initialReduxState: {
              ...reduxStore.getState(),
              config: {
                _csrf: (ctx.req as any).csrfToken()
              }
            }
          }
        : {
            ...appProps,
            initialReduxState: reduxStore.getState()
          }
    }

    private reduxStore: Store

    constructor(props: { initialReduxState: RootState }) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    public render() {
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
}
