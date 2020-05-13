import fs from 'fs'
import pino from 'pino'

const padZero = (numOrStr: number | string) => numOrStr.toString().padStart(2, '0')

const toISOStringWithJST = (d: Date) => {
  return (
    `${d.getFullYear()}-` +
    `${padZero(d.getMonth() + 1)}-` +
    `${padZero(d.getDate())}T` +
    `${padZero(d.getHours())}:` +
    `${padZero(d.getMinutes())}:` +
    `${padZero(d.getSeconds())}+` +
    `${padZero(d.getTimezoneOffset() / -60)}:00`
  )
}

const timestamp = () => `,"time":"${toISOStringWithJST(new Date())}"`

let level: string

const prod = process.env.NODE_ENV === 'production'
const test = process.env.NODE_ENV === 'test'

if (prod) {
  level = 'info'
} else {
  level = 'debug'
}
const prettyPrint = prod ? false : { colorize: true }

export const log = test
  ? pino(
      {
        level,
        timestamp,
        prettyPrint
      },
      fs.createWriteStream('/dev/null', 'utf8')
    )
  : pino({
      level,
      timestamp,
      prettyPrint
    })
