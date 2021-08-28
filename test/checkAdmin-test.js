var checkAdmin = require('../routes/appDatabase/checkAdmin.js');
var expect = require('chai').expect;



describe('#checkAdmin()', function() {

    context('without arguments', function() {
      it('should return false', async function() {
        expect(await checkAdmin()).to.be.false
      })
    })
  
    context('with non-number', function() {
        it('should return false', async function() {
            expect(await checkAdmin('1')).to.be.false
          })
    })
    
  
    context('with non-user number', function() {
      it('should return false', async function() {
          expect(await checkAdmin(12345)).to.be.false
      })
    })

    context('with user number', function() {
        it('should return true', async function() {
            expect(await checkAdmin(160)).to.be.true
        })
      })
    
  })