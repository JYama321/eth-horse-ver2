const debug = require('debug')
const logger = {}
const NODE_ENV = process.env.NODE_ENV || 'development'

if (NODE_ENV === 'development') {
  // set debug env, must be programmaticaly for windows
  debug.enable('dev:')
} else {
  debug.enable('dev:error')
}

logger.debug = debug('dev:debug')
logger.debug.log = console.log.bind(console)
logger.info = debug('dev:info')
logger.info.log = console.log.bind(console)
logger.error = debug('dev:error')
logger.error.log = console.error.bind(console)

module.exports = logger
