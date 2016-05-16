import {Receiver} from '../interfaces'
import * as readline from 'readline'
import * as db from 'rethinkdb'
import client from '../../client'
import logger from '../../logging'
import conn from '../../db'
import {MessageEvent, mockMessageEvent} from '../message-event'

const rl = readline.createInterface(process.stdin, process.stdout)
rl.setPrompt('[message] > ')

rl.on('line', (message : string) => {
    const event : MessageEvent = mockMessageEvent(message)
    db.table('messages')
        .insert(event)
        .run(conn())
        .catch((err) => logger.error(err))
}).on('close', () => process.exit(0))

export const receive : Receiver = () => {
    logger.debug('Interactive dialog starting ... ')
    rl.prompt()
}

export default receive
