import settings from './settings'
import logger from './logging'
import * as db from 'rethinkdb'

let _conn : db.Connection = null
export function conn () : db.Connection {
    return _conn
}

export function connect () : Promise<db.Connection> {
    const host : string = settings.db.host.get()
    const port : number = settings.db.port.get()
    const name : string = settings.db.name.get()
    
    return db.connect({host, port})
        .then((conn) => {
            logger.debug(`RethinkDB connected to ${host}:${port}`)
            _conn = conn
            conn.use(name)
            logger.debug(`RethinkDB using database '${name}'`)
            return conn
        })
}

export default conn
