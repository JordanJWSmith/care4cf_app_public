var getTechniques = require('../routes/appDatabase/getTechniques.js');
var expect = require('chai').expect;

describe('#getTechniques()', function() {
    var args = Array.prototype.slice.call(arguments);


    context('with no arguments', function() {
        it('should return object', async function () {
            expect(
                await getTechniques().then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.an('object');
        })
    })
})
