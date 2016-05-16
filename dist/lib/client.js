"use strict";
const settings_1 = require("./settings");
const logging_1 = require('./logging');
const { Wit } = require('node-wit');
const actions = require('./actions');
const token = settings_1.default.wit.token.get();
exports.client = new Wit(token, actions, logging_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.client;
//# sourceMappingURL=client.js.map