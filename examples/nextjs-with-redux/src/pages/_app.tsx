import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Global } from '@emotion/core'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { withReduxStore } from '../hoc/with-redux-store'
import { globalStyles } from '../utils/constants/css'

class MyApp extends App<{ reduxStore: Store }> {
  render() {
    const { Component, reduxStore } = this.props
    return (
      <>
        <Head>
          <title>Specter - nextjs-with-redux</title>
        </Head>
        <Global styles={globalStyles} />
        <Provider store={reduxStore}>
          <Component />
        </Provider>
      </>
    )
  }
}

export default withReduxStore(MyApp)
