var getRoutine = require('../routes/appDatabase/getRoutine.js');
var expect = require('chai').expect;

describe('#getRoutine()', function() {
    var args = Array.prototype.slice.call(arguments);


    // context('with no arguments', function() {
    //     it('should return object', async function () {
    //         expect(
    //             await getRoutine().then(
    //                 function(results) {
    //                     return results
    //                 }
    //             )
    //         ).to.be.false;
    //     })
    // })

    context('with non-num userID ', function() {
        it('should return false', async function () {
            expect(
                await getRoutine('test', 1).then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.false;
        })
    })

    context('with non-string date ', function() {
        it('should return false', async function () {
            var newDate = new Date()
            expect(
                await getRoutine(160, newDate).then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.false;
        })
    })

    context('with date in far past', function() {
        it('should return false', async function () {
            var newDate = new Date()
            expect(
                await getRoutine(160, '2000-8-11').then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.false;
        })
    })
    

    context('with correct arguments', function() {
        it('should return object', async function () {
            var newDate = new Date()
            expect(
                await getRoutine(160, '2021-8-11').then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.an('object');
        })
    })
})
