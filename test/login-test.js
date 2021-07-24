var login = require('../routes/login.js');
// var requireLogin = login.requireLogin;
var expect = require('chai').expect;

describe('#login()', function() {
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

    context('with non-existent token', function() {
        it('should return false', async function() {
            expect(
                await login('testToken12345').then(
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
})

