import settings from "./settings"

const {Logger, logLevels} = require('node-wit')

export const level = logLevels[settings.debugLevel.get().toUpperCase()]
export const logger = new Logger(level)

export default logger
