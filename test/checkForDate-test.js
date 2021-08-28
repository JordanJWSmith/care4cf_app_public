var checkForDate = require('../routes/appDatabase/checkForDate.js');
var expect = require('chai').expect;




describe('#checkForDate()', function() {

    context('without arguments', function() {
      it('should return false', async function() {
        expect(await checkForDate().then((values) => {
            return values
          })).to.be.false
      })
    })
  
    context('with non-number', function() {
        it('should return false', async function() {
            expect(await checkForDate('1', '1994/06/20').then((values) => {
                return values
              })).to.be.false
          })
    })
    
  
    context('with non-user number', function() {
      it('should return false', async function() {
          expect(await checkForDate(12345, '1994/06/20').then((values) => {
            return values
          })).to.be.false
      })
    })

    context('with non-string date', function() {
        it('should return false', async function() {
            expect(await checkForDate(12345, new Date('1994-06-20')).then((values) => {
              return values
            })).to.be.false
        })
    })

    context('with non-date string', function() {
        it('should return false', async function() {
            expect(await checkForDate(12345, 'test').then((values) => {
                return values
            })).to.be.false
        })
    })

    context('with user number', function() {
        it('should return object', async function() {
            expect(await checkForDate(160, '2021/08/08').then((values) => {
              return values[0]
            })).to.be.an('object');
        })
      })
  })