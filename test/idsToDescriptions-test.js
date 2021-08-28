var idsToDescriptions = require('../routes/appDatabase/idsToDescriptions.js');
var expect = require('chai').expect;

var testRoutine = [
    [ { scheduleID: 92, techniqueID: 18 } ],
    [ { scheduleID: 92, duration: '5', frequencyID: 3 } ],
    [
       { scheduleID: 92, adjunctID: 4, adjunctTimeID: 1 },
       { scheduleID: 92, adjunctID: 2, adjunctTimeID: 3 }
    ]
]

describe('#idsToDescriptions()', function() {

    context('without arguments', function() {
      it('should return false', async function() {
        expect(await idsToDescriptions().then((results) => {
            return results
        })).to.be.false
      })
    })
  
    context('with non-object', function() {
        it('should return false', async function() {
            expect(await idsToDescriptions('1').then((results) => {
                return results
            })).to.be.false
          })
    })
    
  
    context('with empty object', function() {
      it('should return false', async function() {
          expect(await idsToDescriptions({}).then((results) => {
            return results
        })).to.be.false
      })
    })

    context('with valid object', function() {
        it('should return object', async function() {
            expect(await idsToDescriptions(testRoutine).then((results) => {
                return results
            })).to.be.an("array");
        })
      })
    
  })