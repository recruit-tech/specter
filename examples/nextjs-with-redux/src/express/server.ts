/* istanbul ignore file */

import * as express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import next from 'next'
import csrf from 'csurf'
import serverTiming from 'server-timing'
import Specter from '@specter/specter'
import session from 'express-session'
import memoryStoreCreator from 'memorystore'
import * as Services from './services'
import { apiGateway } from './middleware/apiGateway'
import { createErrorHandler } from './middleware/ErrorHandler'
import { log } from './utils/log'

const Store = memoryStoreCreator(session)

const storeBaseConfig = {
  prefix: 'session'
}

const sessionConfig = {
  name: 'session',
  cookie: { httpOnly: true, sameSite: 'strict' },
  store: new Store(storeBaseConfig),
  secret: 'specter - next.js with example',
  rolling: true,
  saveUninitialized: true,
  resave: true
}

const app = next({ dev: process.env.NODE_ENV !== 'production', quiet: process.env.NODE_ENV === 'production' })

const handle = app.getRequestHandler()

app.prepare().then(() => {
  // eject express instance
  const server = express.default()

  // register services of specter
  Object.entries(Services).forEach(tuple => {
    const [, Service] = tuple
    Specter.registerService(new Service({}))
  })

  // register middleware
  server.use(serverTiming())
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(session(sessionConfig))
  server.use(cookieParser())
  server.use(csrf({ cookie: { key: '_csrf', httpOnly: true, sameSite: 'strict' } }))

  // routing
  server.use('/xhr', apiGateway)

  server.get('*', (req, res) => {
    if (process.env.NODE_ENV === 'development') res.startTime('ssr', 'server side rendering')
    handle(req, res).then(() => {
      if (process.env.NODE_ENV === 'development') res.endTime('ssr')
    })
  })

  // error handling
  server.use(createErrorHandler())

  // serve
  const sv = server.listen(3000, err => {
    if (err) throw err
    const address = sv.address()
    if (!address || typeof address === 'string') {
      return
    }
    log.debug(`> Ready on http://localhost:${address.port}`)
  })
})
