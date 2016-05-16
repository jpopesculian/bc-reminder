import settings from "./settings"
import logger from './logging'

const {Wit} = require('node-wit')
const actions = require('./actions')

const token = settings.wit.token.get()

export const client = new Wit(token, actions, logger)
export default client
