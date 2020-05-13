import { BFFSession } from '../../scheme/Session'
declare global {
  declare namespace Express {
    export interface Request {
      session: BFFSession
    }
  }
}
