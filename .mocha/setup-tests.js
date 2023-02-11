const {log, LogNodeConsoleBinder, mock} = require('./lib.js');

log.setConsoleBinder(new LogNodeConsoleBinder());

mock.registerMock(/\.module\.scss$/, {}, {target: '*'});
