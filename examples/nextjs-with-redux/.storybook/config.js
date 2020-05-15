import React from 'react'
import { Global } from '@emotion/core'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withA11y } from '@storybook/addon-a11y'
import { withConsole } from '@storybook/addon-console'
import { globalStyles } from '../src/utils/constants/css'
import './mockNextRouter'

const withGlobal = cb => (
  <>
    <Global styles={globalStyles} />
    {cb()}
  </>
)

if (process.env.CAP !== 1) {
  addDecorator(withInfo({ inline: true, header: true }))
  addDecorator(withA11y)
  addDecorator((storyFn, context) => withConsole()(storyFn)(context))
  addParameters({
    backgrounds: [
      { name: 'default', value: '#fff', default: true },
      { name: 'light', value: '#eee' },
      { name: 'dark', value: '#444' }
    ]
  })
}

addDecorator(withGlobal)

function loadStories() {
  let req = require.context('../src/components/', true, /\/__stories__\/index(\.skipTest)?\.tsx$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
