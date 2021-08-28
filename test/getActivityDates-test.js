var getActivityDates = require('../routes/appDatabase/getActivityDates.js');
var expect = require('chai').expect;




describe('#getActivityDates()', function() {

    context('without arguments', function() {
      it('should return false', async function() {
        expect(await getActivityDates()).to.be.false
      })
    })
  
    context('with non-number', function() {
        it('should return false', async function() {
            expect(await getActivityDates('1')).to.be.false
          })
    })
    
  
    context('with non-user number', function() {
      it('should return object', async function() {
          expect(await getActivityDates(12345)).to.be.an("object")
      })
    })

    context('with user number', function() {
        it('should return object', async function() {
            expect(await getActivityDates(160)).to.be.an("object")
        })
      })
  })