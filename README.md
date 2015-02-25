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

## Sample Event Payload 
- Request
{ 
  "time": "10:27:25",
  "method": "GET",
  "location": "stubs",
  "path": "/hello"
}

- Response
```json
{
  "time": "09:26:47",
  "statusCode": "404",
  "location": "stubs",
  "path": "/your/awesome/endpoint",
  "message": "is not a registered endpoint"
}
```