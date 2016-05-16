"use strict";
const readline = require('readline');
const db = require('rethinkdb');
const logging_1 = require('../../logging');
const db_1 = require('../../db');
const message_event_1 = require('../message-event');
const rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('[message] > ');
rl.on('line', (message) => {
    const event = message_event_1.mockMessageEvent(message);
    db.table('messages')
        .insert(event)
        .run(db_1.default())
        .catch((err) => logging_1.default.error(err));
}).on('close', () => process.exit(0));
exports.receive = () => {
    logging_1.default.debug('Interactive dialog starting ... ');
    rl.prompt();
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.receive;
//# sourceMappingURL=receive.js.map