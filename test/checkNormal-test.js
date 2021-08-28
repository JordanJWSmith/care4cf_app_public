var checkNormal = require('../routes/appDatabase/checkForNormal.js');
var expect = require('chai').expect;



describe('#checkNormal()', function() {

    context('without arguments', function() {
      it('should return false', async function() {
        expect(await checkNormal().then((results) => {
            return results.scheduleExists
        })).to.be.false
      })
    })
  
    context('with non-number', function() {
        it('should return false', async function() {
            expect(await checkNormal('1').then((results) => {
                return results.scheduleExists
            })).to.be.false
          })
    })
    
  
    context('with non-user number', function() {
      it('should return false', async function() {
          expect(await checkNormal(12345).then((results) => {
            return results.scheduleExists
        })).to.be.false
      })
    })

    context('with user number', function() {
        it('should return true', async function() {
            expect(await checkNormal(160).then((results) => {
                return results.scheduleExists
            })).to.be.true
        })
      })
    
  })