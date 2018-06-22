let debug = require('debug');
let logger = {};
const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development'){
  debug.enable('dev,deve: ')
}  else {
  debug.enable('dev: error')
}


logger.debug = debug('dev:debug')
logger.debug.log = console.log.bind(console)
logger.info = debug('dev:info')
logger.info.log = console.log.bind(console)
logger.error = debug('dev:error')
logger.error.log = console.error.bind(console)


module.exports = logger;
