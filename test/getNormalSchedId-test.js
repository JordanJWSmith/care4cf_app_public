var getNormalSchedID = require('../routes/appDatabase/getNormalSchedID.js');
var expect = require('chai').expect;




describe('#getNormalSchedID()', function() {

    context('without arguments', function() {
      it('should return false', async function() {
        expect(await getNormalSchedID().then((values) => {
            return values
          })).to.be.false
      })
    })
  
    context('with non-number', function() {
        it('should return false', async function() {
            expect(await getNormalSchedID('1').then((values) => {
                return values
              })).to.be.false
          })
    })
    
  
    context('with non-user number', function() {
      it('should return false', async function() {
          expect(await getNormalSchedID(12345).then((values) => {
            return values
          })).to.be.false
      })
    })

    context('with user number', function() {
        it('should return object', async function() {
            expect(await getNormalSchedID(160).then((values) => {
              return values
            })).to.be.an("object")
        })
      })
  })