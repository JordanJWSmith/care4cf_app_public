var getRoutineTypes = require('../routes/appDatabase/getRoutineTypes.js');
var expect = require('chai').expect;

describe('#getRoutineTypes()', function() {
    // var args = Array.prototype.slice.call(arguments);


    context('with no arguments', function() {
        it('should return object', async function () {
            expect(
                await getRoutineTypes().then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.an('object');
        })
    })
})
