var login = require('../routes/appDatabase/login.js');
// var requireLogin = login.requireLogin;
var expect = require('chai').expect;

var loginToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IjR5bjgyXzNzRHVCdlZ5UzYzNERBOG9FdVRrOTREZUJSTldOWHhiOE5wY28iLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xZmFmODhmZS1hOTk4LTRjNWItOTNjOS0yMTBhMTFkOWE1YzIvIiwiaWF0IjoxNjMwMDY4NjQwLCJuYmYiOjE2MzAwNjg2NDAsImV4cCI6MTYzMDA3MjU0MCwiYWNjdCI6MCwiYWNyIjoiMSIsImFjcnMiOlsidXJuOnVzZXI6cmVnaXN0ZXJzZWN1cml0eWluZm8iXSwiYWlvIjoiQVNRQTIvOFRBQUFBWjE2ZVVxNUJzYncyd3JhcVUvNG44cEgybEhURGpZMkZycmtXQ1MvbDNiQT0iLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkNBUkU0Q0YgUmVnaXN0cmF0aW9uIiwiYXBwaWQiOiI5YjEyYTdmMy0yZjkxLTRlMDUtOGJjMi0yYTFiYzNjNWE3MTAiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IlNtaXRoIiwiZ2l2ZW5fbmFtZSI6IkpvcmRhbiIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjkwLjIyMC4yMDYuOTAiLCJuYW1lIjoiU21pdGgsIEpvcmRhbiIsIm9pZCI6ImI3MDQzZGNmLTIyNjItNDM3Ny1iN2RlLWRkNjdhZGViOTM2YSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yOTAyMjY1NjIxLTEwNjMwMjg2MjEtMjM4MTU2MTQ4MC04MDAzNDQiLCJwbGF0ZiI6IjIiLCJwdWlkIjoiMTAwMzIwMDBEQ0Y5MEU2QiIsInJoIjoiMC5BUVVBX29pdkg1aXBXMHlUeVNFS0VkbWx3dk9uRXB1Ukx3Vk9pOElxRzhQRnB4QUZBR1EuIiwic2NwIjoib3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoicWpaRGpnOENuSEJWSFdKaFlqWnh6OER2aEtTQklVNmxfcVQ2VDJiVG5qQSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJFVSIsInRpZCI6IjFmYWY4OGZlLWE5OTgtNGM1Yi05M2M5LTIxMGExMWQ5YTVjMiIsInVuaXF1ZV9uYW1lIjoidWNhYmpqd0B1Y2wuYWMudWsiLCJ1cG4iOiJ1Y2Fiamp3QHVjbC5hYy51ayIsInV0aSI6ImRpazlIakpLdDBXSlliWkFRU3dMQVEiLCJ2ZXIiOiIxLjAiLCJ4bXNfc3QiOnsic3ViIjoiUXpGZnNIREt5ZW14Z2Z3UGItU1A2M1lWVnloeFpNdi10V29ZdEIyMjhWbyJ9LCJ4bXNfdGNkdCI6MTM2MDg3MTM0NX0.UAtwpj40oS21ZuxnmffsVBW58gAplT8bKp-ZLjzz8IURw9uVRLxQ1XqCyN86RuQY39_Z_ASHGvSXK0RSUJE5DjbwviO7GjWt3yCZxQdoNclJS6syvm4HvQxslD0oN-8yDfxHcjI-rYnN5sv9ArPpV09-Md3XtJqxAAD6Z3zewVCCfwiVryjjhLRtnKVswxxxb6WuYwS-_y3yXF6tbBDd2oI5kGPDGT_dDcq1d_OVvdwzFGqRfGqMKsQNEhTUJbxeuDyBozhi0O-l8f_TBNwcC6XBOlVmkQpsgGG1wMr2QdJ4pfuNIey6d0wt8QaUmEn4hCrx0zQvbygw1K5yjBPB1Q";

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

    context('with correct token', function() {
        it('should return object', async function() {
            expect(
                await login(loginToken).then(
                    function(results) {
                        return results.logIn
                    }
                )
            ).to.be.true;
        })
    })
})

