var dateDifference = require('./publicFunctions/dateDifference.js');
var expect = require('chai').expect;

dateOne = new Date('20/06/1994');
dateTwo = new Date();

describe('#dateDifference()', function() {

  context('without arguments', function() {
    it('should return false', function() {
      expect(dateDifference()).to.be.false;
    })
  })

  context('with non-objects', function() {
      it('should return false', function() {
          expect(dateDifference('20/06/1994', '20/06/1994')).to.be.false
      })
  })

  context('with non-date object', function() {
      it('should return false', function() {
          expect(dateDifference({key: 'value'}, {anotherKey: 'anotherValue'})).to.be.false;
      })
  })
  
  context('with same date objects', function() {
    it('should return zero', function() {
      expect(dateDifference(dateTwo, dateTwo)).to.equal(0)
    })
  })

  context('with different date objects', function() {
    it('should return integer', function() {
      expect(dateDifference(dateOne, dateTwo)).to.be.a('number')
    })
  })
  
})