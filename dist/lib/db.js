"use strict";
const settings_1 = require('./settings');
const logging_1 = require('./logging');
const db = require('rethinkdb');
let _conn = null;
function conn() {
    return _conn;
}
exports.conn = conn;
function connect() {
    const host = settings_1.default.db.host.get();
    const port = settings_1.default.db.port.get();
    const name = settings_1.default.db.name.get();
    return db.connect({ host: host, port: port })
        .then((conn) => {
        logging_1.default.debug(`RethinkDB connected to ${host}:${port}`);
        _conn = conn;
        conn.use(name);
        logging_1.default.debug(`RethinkDB using database '${name}'`);
        return conn;
    });
}
exports.connect = connect;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = conn;
//# sourceMappingURL=db.js.map