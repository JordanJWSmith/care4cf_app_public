var getAllActivities = require('../routes/appDatabase/getAllActivities.js');
var expect = require('chai').expect;




describe('#getAllActivities()', function() {

    context('without arguments', function() {
      it('should return false', async function() {
        expect(await getAllActivities()).to.be.false
      })
    })
  
    context('with non-number', function() {
        it('should return false', async function() {
            expect(await getAllActivities('1')).to.be.false
          })
    })
    
  
    context('with non-user number', function() {
      it('should return object', async function() {
          expect(await getAllActivities(12345)).to.be.an("object")
      })
    })

    // context('with user number', function() {
    //     it('should return object', async function() {
    //         expect(await getAllActivities(160).then((values => {
    //           return values
    //         }))).to.be.an("object")
    //     })
    //   })
  })