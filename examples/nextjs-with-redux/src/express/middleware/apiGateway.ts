import { RequestHandler } from 'express'
import Specter from '@specter/specter'

export const apiGateway: RequestHandler = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') res.startTime('xhr', 'execution service')
  const middleware = Specter.createMiddleware({})
  middleware(req, res, next).then(() => {
    if (process.env.NODE_ENV === 'development') res.endTime('xhr')
  })
}
