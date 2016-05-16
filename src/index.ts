import {connect} from './lib/db'

function start () : void {
    connect()
        .then(process.exit())
}

start()
