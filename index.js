'use strict';
import moment from 'moment'
import { config } from './config'

moment.loadConfig = (configObj) => {
  moment._config = configObj
  return moment._config
};

moment.fn.holiday = function() {
  return moment._config.holidays[this.locale()][this.year().toString()][this.month().toString()].includes(this.date())
};

moment.fn.businessDay = function(){
  return moment._config.businessDays[this.locale()].includes(this.day())
}

moment.fn.addBusinessDays = function(nDays) {
  const incr = nDays > 0 ? 1 : -1
  let counter = Math.abs(nDays)
  while (counter) {
    this.add(incr, 'd');
    if (this.holiday() || !this.businessDay()) {
      counter--
    }
  }
  return this
}

moment.fn.subtractBusinessDays = function(nDays) {
  return this.addBusinessDays(-nDays)
}

moment.loadConfig(config)

export default moment