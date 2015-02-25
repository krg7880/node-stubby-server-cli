var spawn = require('child_process').spawn;
var BufferStream = require('bufferstream')
var regexp = /(\d+:\d+:\d+)\s?([^\s]+)\s?([^\s]+)\s?\[([^\]]+)\]([^\s]+)\s?(.*)/;
var events = require('events');
var util = require('util');

var objToArray = function(obj) {
  var args = [];
  for (var i in this.config) {
    var cur = this.config[i];
    cur = cur.split(' ');
    args = args.concat(cur);
  }

  return args;
};

var _onResponse = function(line) {
  var res = regexp.exec(line);
  if (res && res.length === 7) {
    "06:33:09", "404", "admin", "/your/awesome/endpoint", "Not Found"
    res.splice(0, 1);
    res.splice(1, 1);
    var obj = {
      time: res[0]
      ,statusCode: res[1]
      ,location: res[2]
      ,path: res[3]
      ,message: res[4].replace(/\u001b\[.*?m/, '')
    };

    this.emit(this.events.REQUEST, obj);
  }
};

var _onRequest = function(line) {
  var res = regexp.exec(line);
  if (res && res.length === 7) {
    "06:33:09", "404", "admin", "/your/awesome/endpoint", "Not Found"
    res.splice(0, 1);
    res.splice(1, 1);
    var obj = {
      time: res[0]
      ,statusCode: res[1]
      ,location: res[2]
      ,path: res[3]
      ,message: res[4].replace(/\u001b\[.*?m/, '')
    };

    this.emit(this.events.REQUEST, obj);
  }
};

var _spawn = function() {
  var self = this;

  var args = objToArray.call(self);

  var stubby = spawn('stubby', args);

  stream = new BufferStream({encoding:'utf8', size:'flexible'});
  stream.split('\n');

  stream.on('split', function (chunk, token) {
    var line = chunk.toString();
    console.log(line);
    if (line.indexOf('<-') > -1) {
      console.log('Got response');
      _onResponse.call(self, line);
    } else {
      _onRequest.call(self, line);
    }
  });

  stubby.stdout.pipe(stream);
  stubby.stderr.pipe(stream);

  stubby.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
};

var CLI = function(config) {
  if (!(this instanceof CLI)) {
    return new CLI(config);
  }

  this.config = config || {};
  this.events = {
    REQUEST: 'REQUEST',
    RESPONSE: 'RESPONSE'
  };
};

util.inherits(CLI, events.EventEmitter);

CLI.prototype.admin = function(port) {
  this.config.admin = '--admin ' + port;
  return this;
};

CLI.prototype.stubs = function(port) {
  this.config.stubs = '--stubs ' + port;
  return this;
};

CLI.prototype.tls = function(port) {
  this.config.tls = '--tls ' + port;
  return this;
};

CLI.prototype.data = function(data) {
  this.config.data = '--data ' + data;
  return this;
};

CLI.prototype.cert = function(cert) {
  this.config.cert = '--cert ' + cert;
  if (!this.config.key) {
    this.config.__validateSSL = true; // used to ensure both key and cert is set
  } else if (this.config.__validateSSL) {
    delete this.config.__validateSSL;
  }
  
  return this;
};

CLI.prototype.key = function(key) {
  this.config.key = '--key ' + key;
  if (!this.config.cert) {
    this.config.__validateSSL = true;
  } else if (this.config.__validateSSL) {
    delete this.config.__validateSSL;
  }

  return this;
};

CLI.prototype.location = function(location) {
  this.config.location = '--location ' + location;
  return this;
};

CLI.prototype.watch = function() {
  this.config.watch = '--watch';
  return this;
};

CLI.prototype.mute = function() {
  this.config.mute = '--mute';
  return this;
};

CLI.prototype.unmute = function() {
  if (this.config.mute) {
    delete this.config.mute;
  }

  return this;
};

CLI.prototype.help = function() {
  var _tmp = this.config;
  this.config = {help: '--help'};
  _spawn.apply(this);
  return new CLI(_tmp);
};

CLI.prototype.start = function() {
  if (this.config.__validateSSL) {
    if (!this.config.key) {
      throw new Error('Missing key: --key <key>');
    }

    if (!this.config.cert) {
      throw new Error('Missing certificate: --cert <cert>')
    }

    if (this.config.pfx) {
      delete this.config.pfx;
    }
  }

  _spawn.apply(this);

  return this;
};

var cli = new CLI();
cli.admin(8001)
  .stubs(8000)
  .tls(8002)
  .help()
  .mute()
  .data(__dirname + '/data.yml')
  .unmute()
  .start()
  .on(cli.events.REQUEST, function(data) {
    console.log(data);
  }).on(cli.events.RESPONSE, function(data) {
    console.log(data);
  });