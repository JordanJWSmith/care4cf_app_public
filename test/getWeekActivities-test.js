var getWeekActivities = require('../routes/appDatabase/getWeekActivities.js');
var expect = require('chai').expect;

describe('#getWeekActivities()', function() {
    var args = Array.prototype.slice.call(arguments);

    context('with non-num userID', function() {
        it('should return false', async function() {
            expect(
                await getWeekActivities('test', 1)
                .then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.false;
        })
    })

    context('with non-num offset', function() {
        it('should return false', async function() {
            expect(
                await getWeekActivities(160, 'test').then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.false;
        })
    })
 

    context('with no arguments', function() {
        it('should return false', async function() {
            expect(
                await getWeekActivities().then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.false;
        })
    })

    context('with correct arguments', function() {
        it('should return object', async function () {
            expect(
                await getWeekActivities(160, 0).then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.an('object');
        })
    })
})

