import { AxiosError } from 'axios'
import { ErrorHandler, ErrorPayload } from './interface'
import { log } from '../../utils/log'

function isAxiosError(err: any): err is AxiosError {
  if (typeof err !== 'object') return false
  if (typeof err.isAxiosError === 'boolean' && err.isAxiosError === true) return true
  return false
}

function createAxiosError(err: AxiosError) {
  return {
    message: err.message,
    code: err.code,
    status: err.response.status,
    statusText: err.response.statusText,
    request: {
      headers: {
        err: err.response.headers
      }
    },
    response: {
      headers: {
        err: err.response.headers
      },
      data: err.response.data
    }
  } as const
}

export const axiosErrorHandler: ErrorHandler = [
  isAxiosError,
  (err: AxiosError, req, res) => {
    const error = createAxiosError(err)
    if (err.response && err.response.status >= 400) {
      const payload: ErrorPayload = {
        error,
        handler: 'axiosErrorHandler',
        ...{ ip: req.ip, originalUrl: req.originalUrl, method: req.method, url: req.url }
      }
      if (err.response.status >= 500) {
        log.error(payload)
      } else if (err.response.status >= 400) {
        log.warn(payload)
      }
      res.set(error.response.headers.err)
      res.status(error.status)
      res.send(error.response.data).json()
    }
  }
]
