const Instant = require('./instant');

module.exports = class Interval {
  constructor () {
    this._interval = {};
    // CAN TAKE EITHER
    //  - A START AND AN END OBJECT, WITH AN OPTIONAL OPTIONS OBJECT
    //  - AN ARRAY OF TWO OBJECTS, WITH OPTIONAL OPTIONS
    if (arguments.length === 1 && arguments[0] instanceof Array) {
      this.interval = arguments[0];
    } else if (arguments.length === 1 && (arguments[0].hasOwnProperty('start') || arguments[0].hasOwnProperty('end'))) {
      this.interval = [ arguments[0].start, arguments[0].end ];
    } else if (arguments.length === 2 && arguments[0] instanceof Array) {
      this.options = arguments[1];
      this.interval = arguments[0];
    } else if (arguments.length === 2) {
      this.interval = [ arguments[0], arguments[1] ];
    } else {
      throw new Error('Unexpected arguments.');
    }
  }

  set interval (object) {
    let interval = {};
    for (let i = 0; i < object.length; i++) {
      interval[i === 0 ? 'start' : 'end'] = new Instant(object[i]);
    }
    this._interval = interval;
  }

  get interval () {
    return { start: this._interval.start.date, end: this._interval.end.date };
  }

  get difference () {
    let difference = this._interval.end.revert - this._interval.start.revert;
    return {
      milliseconds: difference,
      seconds: difference / 1000,
      minutes: difference / 1000 / 60,
      hours: difference / 1000 / 60 / 60,
      days: difference / 1000 / 60 / 60 / 24,
      weeks: difference / 1000 / 60 / 60 / 24 / 7,
      months: difference / 1000 / 60 / 60 / 24 / 365 * 12,
      years: difference / 1000 / 60 / 60 / 24 / 365
    };
    // TODO:
    // DELIVER MOST RELEVANT DIFFERENCE (2 years, 4 hours, 2 weeks, etc.)
  }
};
