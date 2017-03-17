'use strict';
let moment = require('moment')
let _ = require('lodash')
let config = require('./config')

moment.loadConfig = function(configObj) {
  moment._config = configObj
  return moment._config
};

moment.fn.holiday = function() {
  return _.includes(moment._config.holidays[this.locale()][this.year().toString()][this.month().toString()], this.date())
};

moment.fn.businessDay = function(){
  return _.includes(moment._config.businessDays[this.locale()], this.day())
};

moment.fn.addBusinessDays = function(nDays) {
  let counter = Math.abs(nDays);
  while (counter) {
    nDays > 0 ? this.add(1, 'days') : this.subtract(1, 'days');
    if (!this.holiday() && this.businessDay()) {
      counter--
    }
  }
  return this
};

moment.fn.subtractBusinessDays = function(nDays) {
  return this.addBusinessDays(-nDays)
};

moment.loadConfig(config);

module.exports = moment;