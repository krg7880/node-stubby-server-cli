var StubbyCLI = require(__dirname + '/lib/cli');
var Events = require(__dirname + '/lib/events');

var cli = new StubbyCLI();

cli.admin(8001)
  .stubs(8003)
  .tls(8002)
  .help() // prints the help... note you still chain
  //.mute() // supress output
  .data(__dirname + '/data.json')
  .unmute() // enable output
  .start()
  .on(Events.REQUEST, function(data) {
    console.log(data);
  })
  .on(Events.RESPONSE, function(data) {
    console.log(data);
  })
  .on(Events.LOADED_ROUTE, function(route) {
    console.log('loaded route', route);
  })