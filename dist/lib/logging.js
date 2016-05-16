"use strict";
const settings_1 = require("./settings");
const { Logger, logLevels } = require('node-wit');
exports.level = logLevels[settings_1.default.debugLevel.get().toUpperCase()];
exports.logger = new Logger(exports.level);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.logger;
//# sourceMappingURL=logging.js.map