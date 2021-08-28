var buildQuery = require('../routes/appDatabase/buildQuery.js');
var expect = require('chai').expect;

var techDescriptions = "SELECT title, subtitle FROM techdescriptions WHERE ";
var testObject = [
    [ { scheduleID: 104, techniqueID: 4 } ],
    [ { scheduleID: 104, duration: '6', frequencyID: 1 } ]
]


describe('#buildQuery()', function() {

    context('without arguments', function() {
      it('should return false', function() {
        expect(buildQuery()).to.be.false
      })
    })

    context('with non-string sql', function() {
        it('should return false', function() {
            expect(buildQuery(1, 0, 'techniqueID', testObject)).to.be.false
          })
    })
  
    context('with non-number index', function() {
        it('should return false', function() {
            expect(buildQuery(techDescriptions, '0', 'techniqueID', testObject)).to.be.false
          })
    })

    context('with non-string colName', function() {
        it('should return false', function() {
            expect(buildQuery(techDescriptions, 0, ['techniqueID'], testObject)).to.be.false
          })
    })
    
  
    context('with non-valid number', function() {
      it('should return false', function() {
          expect(buildQuery(techDescriptions, 12345, 'techniqueID', testObject)).to.be.false
      })
    })

    context('with user number', function() {
        it('should return string', function() {
            expect(buildQuery(techDescriptions, 0, 'techniqueID', testObject)).to.be.a("string")
        })
      })
    
  })