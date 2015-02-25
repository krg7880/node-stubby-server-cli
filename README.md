# node-stubby-server-cli
Module which exposes the Stubby Server API interface from node.

## Example usage
```javascript
var cli = new CLI();

cli.admin(8001)
  .stubs(8000)
  .tls(8002)
  .help() // prints the help... note you still chain
  .mute() // supress output
  .data(__dirname + '/data.yml')
  .unmute() // enable output
  .start()
  .on(cli.events.REQUEST, function(data) {
    console.log(data);
  }).on(cli.events.RESPONSE, function(data) {
    console.log(data);
  });

  // note events won't be dispatch if muted
```