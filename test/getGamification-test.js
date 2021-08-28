var getGamifSettings = require('../routes/appDatabase/getGamifSettings.js');
var expect = require('chai').expect;




describe('#getGamifSettings()', function() {

    context('without arguments', function() {
      it('should return false', async function() {
        expect(await getGamifSettings().then((values) => {
            return values
          })).to.be.false
      })
    })
  
    context('with non-number', function() {
        it('should return false', async function() {
            expect(await getGamifSettings('1').then((values) => {
                return values
              })).to.be.false
          })
    })
    
  
    context('with non-user number', function() {
      it('should return false', async function() {
          expect(await getGamifSettings(12345).then((values) => {
            return values
          })).to.be.false
      })
    })

    context('with user number', function() {
        it('should return number', async function() {
            expect(await getGamifSettings(160).then((values) => {
              return parseInt(values)
            })).to.be.a("number")
        })
      })
  })