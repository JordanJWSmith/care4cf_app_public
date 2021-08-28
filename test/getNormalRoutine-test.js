var getNormalRoutine = require('../routes/appDatabase/getNormalRoutine.js');
var expect = require('chai').expect;




describe('#getNormalRoutine()', function() {

    context('without arguments', function() {
      it('should return false', async function() {
        expect(await getNormalRoutine().then((values) => {
            return values
          })).to.be.false
      })
    })
  
    context('with non-number', function() {
        it('should return false', async function() {
            expect(await getNormalRoutine('1').then((values) => {
                return values
              })).to.be.false
          })
    })
    
  
    context('with non-user number', function() {
      it('should return false', async function() {
          expect(await getNormalRoutine(12345).then((values) => {
            return values
          })).to.be.false
      })
    })

    context('with user number', function() {
        it('should return object', async function() {
            expect(await getNormalRoutine(160).then((values) => {
              return values
            })).to.be.an("object")
        })
      })
  })