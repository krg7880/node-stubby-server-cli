var chai = require('chai');
var expect = chai.expect;
var Events = require(__dirname + '/../lib/events');
var StubbyCLI = require(__dirname + '/../index');
var http = require('http');
var cli = null;

describe('Stubby CLI', function() {
    it('should emit Events.LISTENING', function(done) {
        var cli = new StubbyCLI();
        cli.admin(8001)
            .stubs(8003)
            .tls(8002)
            .data(__dirname + '/fixtures/routes.json')
            .on(Events.LISTENING, function() {
                http.get('http://localhost:8003/my-api/', function(res) {})
                    .on('error', function() {});
            }).on(Events.REQUEST, function(payload) {
                expect(payload.path).to.equal('/my-api/');
                cli.kill();
            }).on(Events.DISCONNECTED, function() {
                done();
            }).start();
    });
})