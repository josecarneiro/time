'use strict';

const Instant = require('./instant');

module.exports = class Interval {
  constructor (...args) {
    this._interval = {};
    // CAN TAKE EITHER
    //  - A START AND AN END OBJECT, WITH AN OPTIONAL OPTIONS OBJECT
    //  - AN ARRAY OF TWO OBJECTS, WITH OPTIONAL OPTIONS
    if (args.length === 1 && args[0] instanceof Array) {
      this.interval = args[0];
    } else if (args.length === 1 && (args[0].hasOwnProperty('start') || args[0].hasOwnProperty('end'))) {
      this.interval = [ args[0].start, args[0].end ];
    } else if (args.length === 2 && args[0] instanceof Array) {
      this.options = args[1];
      this.interval = args[0];
    } else if (args.length === 2) {
      this.interval = [ args[0], args[1] ];
    } else {
      throw new Error('Unexpected args.');
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
