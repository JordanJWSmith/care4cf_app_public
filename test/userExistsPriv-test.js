var login = require('../routes/privDatabase/userExistsPriv.js');
var expect = require('chai').expect;


describe('#userExistsPriv()', function() {
    var args = Array.prototype.slice.call(arguments);

    context('with non-string arguments', function() {
        it('should return error', async function() {
            expect(
                await login(1)
                .then(
                    function(results) {
                        return results.logIn
                    }
                )
            ).to.be.false;
        })
    })

    context('with non-existent email', function() {
        it('should return false', async function() {
            expect(
                await login('testemail12345').then(
                    function(results) {
                        return results.logIn
                    }
                )
            ).to.be.false;
        })
    })
 

    context('with no arguments', function() {
        it('should return false', async function() {
            expect(
                await login().then(
                    function(results) {
                        return results.logIn
                    }
                )
            ).to.be.false;
        })
    })

    context('with correct argument', function() {
        it('should return true', async function() {
            expect(
                await login('ucabjjw@ucl.ac.uk').then(
                    function(results) {
                        return results.logIn
                    }
                )
            ).to.be.true;
        })
    })
})