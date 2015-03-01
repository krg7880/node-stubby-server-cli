System.registerModule("../../lib/cli.js", [], function() {
  "use strict";
  var __moduleName = "../../lib/cli.js";
  System.registerModule("../../lib/cli.js", [], function() {
    "use strict";
    var __moduleName = "../../lib/cli.js";
    System.registerModule("../../lib/cli.js", [], function() {
      "use strict";
      var __moduleName = "../../lib/cli.js";
      System.registerModule("../../lib/cli.js", [], function() {
        "use strict";
        var __moduleName = "../../lib/cli.js";
        System.registerModule("../../lib/cli.js", [], function() {
          "use strict";
          var __moduleName = "../../lib/cli.js";
          System.registerModule("../../lib/cli.js", [], function() {
            "use strict";
            var __moduleName = "../../lib/cli.js";
            System.registerModule("../../lib/cli.js", [], function() {
              "use strict";
              var __moduleName = "../../lib/cli.js";
              System.registerModule("../../lib/cli.js", [], function() {
                "use strict";
                var __moduleName = "../../lib/cli.js";
                System.registerModule("../../lib/cli.js", [], function() {
                  "use strict";
                  var __moduleName = "../../lib/cli.js";
                  System.registerModule("../../lib/cli.js", [], function() {
                    "use strict";
                    var __moduleName = "../../lib/cli.js";
                    System.registerModule("../../lib/cli.js", [], function() {
                      "use strict";
                      var __moduleName = "../../lib/cli.js";
                      System.registerModule("../../lib/cli.js", [], function() {
                        "use strict";
                        var __moduleName = "../../lib/cli.js";
                        System.registerModule("../../lib/cli.js", [], function() {
                          "use strict";
                          var __moduleName = "../../lib/cli.js";
                          System.registerModule("../../lib/cli.js", [], function() {
                            "use strict";
                            var __moduleName = "../../lib/cli.js";
                            System.registerModule("../../lib/cli.js", [], function() {
                              "use strict";
                              var __moduleName = "../../lib/cli.js";
                              System.registerModule("../../lib/cli.js", [], function() {
                                "use strict";
                                var __moduleName = "../../lib/cli.js";
                                System.registerModule("../../lib/cli.js", [], function() {
                                  "use strict";
                                  var __moduleName = "../../lib/cli.js";
                                  System.registerModule("../../lib/cli.js", [], function() {
                                    "use strict";
                                    var __moduleName = "../../lib/cli.js";
                                    System.registerModule("../../lib/cli.js", [], function() {
                                      "use strict";
                                      var __moduleName = "../../lib/cli.js";
                                      System.registerModule("../../lib/cli.js", [], function() {
                                        "use strict";
                                        var __moduleName = "../../lib/cli.js";
                                        System.registerModule("../../lib/cli.js", [], function() {
                                          "use strict";
                                          var __moduleName = "../../lib/cli.js";
                                          System.registerModule("../../lib/cli.js", [], function() {
                                            "use strict";
                                            var __moduleName = "../../lib/cli.js";
                                            System.registerModule("../../lib/cli.js", [], function() {
                                              "use strict";
                                              var __moduleName = "../../lib/cli.js";
                                              System.registerModule("../../lib/cli.js", [], function() {
                                                "use strict";
                                                var __moduleName = "../../lib/cli.js";
                                                System.registerModule("../../lib/cli.js", [], function() {
                                                  "use strict";
                                                  var __moduleName = "../../lib/cli.js";
                                                  System.registerModule("../../lib/cli.js", [], function() {
                                                    "use strict";
                                                    var __moduleName = "../../lib/cli.js";
                                                    System.registerModule("../../lib/cli.js", [], function() {
                                                      "use strict";
                                                      var __moduleName = "../../lib/cli.js";
                                                      System.registerModule("../../lib/cli.js", [], function() {
                                                        "use strict";
                                                        var __moduleName = "../../lib/cli.js";
                                                        var spawn = require('child_process').spawn;
                                                        var BufferStream = require('bufferstream');
                                                        var regexp = /(\d+:\d+:\d+)\s?([^\s]+)\s?([^\s]+)\s?\[([^\]]+)\]([^\s]+)\s?(.*)/;
                                                        var events = require('events');
                                                        var util = require('util');
                                                        var _private = new require(__dirname + '/private')();
                                                        var Events = require(__dirname + '/events');
                                                        var NEW_LINE_REGEXP = /\u001b\[.*?m/;
                                                        var CLI = function() {
                                                          if (!(this instanceof CLI)) {
                                                            return new CLI();
                                                          }
                                                          _private(this).__proc = null;
                                                          _private(this).__config = {};
                                                          _private(this).__spawn = _spawn.bind(this);
                                                          _private(this).__onRequest = _onRequest.bind(this);
                                                          _private(this).__onResponse = _onResponse.bind(this);
                                                          _private(this).__toArray = _objToArray.bind(this);
                                                        };
                                                        var _objToArray = function(obj) {
                                                          var args = [];
                                                          var config = _private(this).__config;
                                                          for (var i in config) {
                                                            var cur = config[i];
                                                            cur = cur.split(' ');
                                                            args = args.concat(cur);
                                                          }
                                                          return args;
                                                        };
                                                        var _onResponse = function(line) {
                                                          var res = regexp.exec(line);
                                                          if (res && res.length === 7) {
                                                            res.splice(0, 1);
                                                            res.splice(1, 1);
                                                            var obj = {
                                                              time: res[0],
                                                              statusCode: res[1],
                                                              location: res[2],
                                                              path: res[3],
                                                              message: res[4].replace(NEW_LINE_REGEXP, '')
                                                            };
                                                            this.emit(Events.REQUEST, obj);
                                                          }
                                                        };
                                                        var _onRequest = function(line) {
                                                          var res = regexp.exec(line);
                                                          if (res && res.length === 7) {
                                                            res.splice(0, 1);
                                                            res.splice(1, 1);
                                                            var obj = {
                                                              time: res[0],
                                                              method: res[1],
                                                              location: res[2],
                                                              path: res[3].replace(NEW_LINE_REGEXP, '')
                                                            };
                                                            this.emit(Events.REQUEST, obj);
                                                          }
                                                        };
                                                        var _spawn = function() {
                                                          var self = this;
                                                          var args = _private(this).__toArray();
                                                          var proc = _private(this).__proc = spawn('stubby', args);
                                                          var stream = _private(this).__stream = new BufferStream({
                                                            encoding: 'utf8',
                                                            size: 'flexible'
                                                          });
                                                          stream.split('\n');
                                                          stream.on('split', function(chunk, token) {
                                                            var line = chunk.toString();
                                                            console.log('line', line);
                                                            if (line.indexOf('<-') > -1) {
                                                              _private(self).__onResponse(line);
                                                            } else {
                                                              _private(self).__onRequest(line);
                                                            }
                                                          });
                                                          proc.stdout.pipe(stream);
                                                          proc.stderr.pipe(stream);
                                                          proc.on('close', function(code) {
                                                            console.log('child process exited with code ' + code);
                                                          });
                                                        };
                                                        CLI.prototype.admin = function(port) {
                                                          _private(this).__config.admin = '--admin ' + port;
                                                          return this;
                                                        };
                                                        CLI.prototype.stubs = function(port) {
                                                          _private(this).__config.stubs = '--stubs ' + port;
                                                          return this;
                                                        };
                                                        CLI.prototype.tls = function(port) {
                                                          _private(this).__config.tls = '--tls ' + port;
                                                          return this;
                                                        };
                                                        CLI.prototype.data = function(data) {
                                                          _private(this).__config.data = '--data ' + data;
                                                          return this;
                                                        };
                                                        CLI.prototype.cert = function(cert) {
                                                          var config = _private(this).__config;
                                                          config.cert = '--cert ' + cert;
                                                          if (!config.key) {
                                                            config.__validateSSL = true;
                                                          } else if (config.__validateSSL) {
                                                            delete config.__validateSSL;
                                                          }
                                                          return this;
                                                        };
                                                        CLI.prototype.key = function(key) {
                                                          var config = _private(this).__config;
                                                          config.key = '--key ' + key;
                                                          if (!config.cert) {
                                                            config.__validateSSL = true;
                                                          } else if (config.__validateSSL) {
                                                            delete config.__validateSSL;
                                                          }
                                                          return this;
                                                        };
                                                        CLI.prototype.location = function(location) {
                                                          _private(this).__config.location = '--location ' + location;
                                                          return this;
                                                        };
                                                        CLI.prototype.watch = function() {
                                                          _private(this).__config.watch = '--watch';
                                                          return this;
                                                        };
                                                        CLI.prototype.mute = function() {
                                                          _private(this).__config.mute = '--mute';
                                                          return this;
                                                        };
                                                        CLI.prototype.unmute = function() {
                                                          if (_private(this).__config.mute) {
                                                            delete _private(this).__config.mute;
                                                          }
                                                          return this;
                                                        };
                                                        CLI.prototype.help = function() {
                                                          var _tmp = _private(this).__config;
                                                          _private(this).__config = {help: '--help'};
                                                          _private(this).__spawn();
                                                          return new CLI(_tmp);
                                                        };
                                                        CLI.prototype.kill = function() {
                                                          _private(this).__proc.kill('SIGTERM');
                                                          _private.clear();
                                                        };
                                                        CLI.prototype.start = function() {
                                                          if (_private(this).__config.__validateSSL) {
                                                            if (!_private(this).__config.key) {
                                                              throw new Error('Missing key: --key <key>');
                                                            }
                                                            if (!_private(this).__config.cert) {
                                                              throw new Error('Missing certificate: --cert <cert>');
                                                            }
                                                            if (_private(this).__config.pfx) {
                                                              delete _private(this).__config.pfx;
                                                            }
                                                          }
                                                          _private(this).__spawn();
                                                          return this;
                                                        };
                                                        module.exports = CLI;
                                                        return {};
                                                      });
                                                      System.get("../../lib/cli.js" + '');
                                                      return {};
                                                    });
                                                    System.get("../../lib/cli.js" + '');
                                                    return {};
                                                  });
                                                  System.get("../../lib/cli.js" + '');
                                                  return {};
                                                });
                                                System.get("../../lib/cli.js" + '');
                                                return {};
                                              });
                                              System.get("../../lib/cli.js" + '');
                                              return {};
                                            });
                                            System.get("../../lib/cli.js" + '');
                                            return {};
                                          });
                                          System.get("../../lib/cli.js" + '');
                                          return {};
                                        });
                                        System.get("../../lib/cli.js" + '');
                                        return {};
                                      });
                                      System.get("../../lib/cli.js" + '');
                                      return {};
                                    });
                                    System.get("../../lib/cli.js" + '');
                                    return {};
                                  });
                                  System.get("../../lib/cli.js" + '');
                                  return {};
                                });
                                System.get("../../lib/cli.js" + '');
                                return {};
                              });
                              System.get("../../lib/cli.js" + '');
                              return {};
                            });
                            System.get("../../lib/cli.js" + '');
                            return {};
                          });
                          System.get("../../lib/cli.js" + '');
                          return {};
                        });
                        System.get("../../lib/cli.js" + '');
                        return {};
                      });
                      System.get("../../lib/cli.js" + '');
                      return {};
                    });
                    System.get("../../lib/cli.js" + '');
                    return {};
                  });
                  System.get("../../lib/cli.js" + '');
                  return {};
                });
                System.get("../../lib/cli.js" + '');
                return {};
              });
              System.get("../../lib/cli.js" + '');
              return {};
            });
            System.get("../../lib/cli.js" + '');
            return {};
          });
          System.get("../../lib/cli.js" + '');
          return {};
        });
        System.get("../../lib/cli.js" + '');
        return {};
      });
      System.get("../../lib/cli.js" + '');
      return {};
    });
    System.get("../../lib/cli.js" + '');
    return {};
  });
  System.get("../../lib/cli.js" + '');
  return {};
});
System.get("../../lib/cli.js" + '');
