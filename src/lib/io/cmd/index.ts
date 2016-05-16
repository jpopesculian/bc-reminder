import {IO} from '../interfaces'
import receive from './receive'
import send from './send'

export const io : IO = {receive, send}
export default io