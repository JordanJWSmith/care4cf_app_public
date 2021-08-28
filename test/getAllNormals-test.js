var getAllNormals = require('../routes/appDatabase/getAllNormals.js');
var expect = require('chai').expect;




describe('#getAllNormals()', function() {

    context('without arguments', function() {
      it('should return false', async function() {
        expect(await getAllNormals()).to.be.false
      })
    })
  
    context('with non-number', function() {
        it('should return false', async function() {
            expect(await getAllNormals('1')).to.be.false
          })
    })
    
  
    context('with non-user number', function() {
      it('should return object', async function() {
          expect(await getAllNormals(12345)).to.be.an("object")
      })
    })

    context('with user number', function() {
        it('should return object', async function() {
            expect(await getAllNormals(160)).to.be.an("object")
        })
      })
  })