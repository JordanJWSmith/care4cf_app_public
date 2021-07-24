var login = require('../routes/appDatabase/userExists.js');
var expect = require('chai').expect;


describe('#userExistsPriv()', function() {
    var args = Array.prototype.slice.call(arguments);

    context('with non-number arguments', function() {
        it('should return error', async function() {
            expect(
                await login('test')
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
                await login(123).then(
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
                await login(999).then(
                    function(results) {
                        return results.logIn
                    }
                )
            ).to.be.true;
        })
    })
})