var abbreviate = require('./publicFunctions/abbreviate.js');
var expect = require('chai').expect;

describe('#abbreviate()', function() {

  context('without arguments', function() {
    it('should return empty string', function() {
      expect(abbreviate()).to.equal("")
    })
  })

  context('with non-list', function() {
      it('should return empty string', function() {
          expect(abbreviate('test')).to.equal("")
      })
  })

  context('with empty list', function() {
      it('should return an empty string', function() {
          expect(abbreviate()).to.equal("")
      })
  })
  
  context('with single word single list string argument', function() {
    it('should return single word', function() {
      expect(abbreviate(['Hello'])).to.equal('Hello')
    })
  })

  context('with multiple word single list string argument', function() {
    it('should return abbreviation', function() {
      expect(abbreviate(['Hello World'])).to.equal('HW')
    })
  })

  context('with list of various strings', function() {
    it('should return a mixture of words and abbreviations', function() {
        expect(abbreviate(['Hello', 'hello world', 'THIS IS A TEST', 'test'])).to.equal('Hello/HW/TIAT/test')
    })
  })
  
//   context('with non-number arguments', function() {
//     it('should throw error', function() {
//       expect(function() {
//         sum(1, 2, '3', [4], 5)
//       }).to.throw(TypeError, 'sum() expects only numbers.')
//     })
//   })
  
})