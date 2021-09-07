var getEmailPriv = require('../routes/privDatabase/getEmailPriv.js');
var expect = require('chai').expect;




describe('#getEmailPriv()', function() {

    context('without arguments', function() {
      it('should return false', async function() {
        expect(await getEmailPriv()
        .then(function(results) {
            return results.logIn
        })).to.be.false
      })
    })
  
    context('with non-number', function() {
        it('should return false', async function() {
            expect(await getEmailPriv('1')
            .then(function(results) {
                return results.logIn
            })).to.be.false
          })
    })
    
  
    context('with non-user number', function() {
      it('should return false', async function() {
          expect(await getEmailPriv(12345)
          .then(function(results) {
            return results.logIn
        })).to.be.false
      })
    })

    context('with user number', function() {
        it('should return object', async function() {
            expect(await getEmailPriv(160)).to.be.an("object")
        })
      })
  })