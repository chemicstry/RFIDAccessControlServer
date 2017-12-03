const winston = require('winston');

const Log = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'verbose'
    }),
    /*new winston.transports.File({
      filename: Meteor.settings.log.file.filename,
      level: Meteor.settings.log.file.level
    })*/
  ]
});

module.exports = Log;
