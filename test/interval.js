/* DEPENDENCIES */
const expect = require('chai').expect;
const Instant = require('./../instant');
const Interval = require('./../interval');

/* EASY ID TESTS */
describe('Interval', () => {
  it('should generate simple interval.', () => {
    let interval = new Interval({ year: 2015 }, { year: 2016 });
    expect(interval).to.be.an.instanceof(Interval);
    expect(interval._interval.start).to.be.an.instanceof(Instant);
    expect(interval._interval.end).to.be.an.instanceof(Instant);
    expect(interval.difference.years).to.equal(1);
  });

  it('should generate interval from date objects.', () => {
    let interval = new Interval(new Date(2017, 0, 1), new Date(Date.now()));
    expect(interval).to.be.an.instanceof(Interval);
    expect(interval._interval.start).to.be.an.instanceof(Instant);
    expect(interval._interval.end).to.be.an.instanceof(Instant);
    // console.log(interval.difference);
    // expect(interval.difference.years).to.equal(1);
  });

});
