import {Sender} from '../interfaces'

export const send : Sender = (message : string) => {
    console.log(`[MESSAGE] ${message}`)
}

export default send