var dateToDisplay = require('./publicFunctions/dateToDisplay.js');
var expect = require('chai').expect;

describe('#dateToDisplay()', function() {

    context('without arguments', function() {
        it('should return false', function() {
            expect(dateToDisplay()).to.be.false
        })
    })

    context('with non-string', function() {
        it('should return false', function() {
            expect(dateToDisplay(1)).to.be.false
        })
    })

    context('with non-date string', function() {
        it('should return formatted date', function() {
            expect(dateToDisplay('test')).to.be.false
        })
    })

    context('with date string', function() {
        it('should return formatted date', function() {
            expect(dateToDisplay('1994/06/20')).to.equal('Mon<br>20th Jun 1994')
        })
    })

//   context('without arguments', function() {
//     it('should return empty string', function() {
//       expect(abbreviate()).to.equal("")
//     })
//   })

//   context('with non-list', function() {
//       it('should return empty string', function() {
//           expect(abbreviate('test')).to.equal("")
//       })
//   })

//   context('with empty list', function() {
//       it('should return an empty string', function() {
//           expect(abbreviate()).to.equal("")
//       })
//   })
  
//   context('with single word single list string argument', function() {
//     it('should return single word', function() {
//       expect(abbreviate(['Hello'])).to.equal('Hello')
//     })
//   })

//   context('with multiple word single list string argument', function() {
//     it('should return abbreviation', function() {
//       expect(abbreviate(['Hello World'])).to.equal('HW')
//     })
//   })

//   context('with list of various strings', function() {
//     it('should return a mixture of words and abbreviations', function() {
//         expect(abbreviate(['Hello', 'hello world', 'THIS IS A TEST', 'test'])).to.equal('Hello/HW/TIAT/test')
//     })
//   })

  
})