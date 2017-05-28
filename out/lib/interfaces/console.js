// Generated by CoffeeScript 1.12.4
var ConsoleInterface, TaskGroup, docpadUtil, extendr, pathUtil, promptly, safefs, safeps,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  slice = [].slice,
  hasProp = {}.hasOwnProperty;

pathUtil = require('path');

safefs = require('safefs');

safeps = require('safeps');

TaskGroup = require('taskgroup').TaskGroup;

extendr = require('extendr');

promptly = require('promptly');

docpadUtil = require('../util');


/**
 * Console Interface
 * @constructor
 */

ConsoleInterface = (function() {

  /**
  	 * Constructor method. Setup the CLI
  	 * @private
  	 * @method constructor
  	 * @param {Object} opts
  	 * @param {Function} next
   */
  function ConsoleInterface(opts, next) {
    this.watch = bind(this.watch, this);
    this.clean = bind(this.clean, this);
    this.server = bind(this.server, this);
    this.run = bind(this.run, this);
    this.render = bind(this.render, this);
    this.uninstall = bind(this.uninstall, this);
    this.install = bind(this.install, this);
    this.upgrade = bind(this.upgrade, this);
    this.update = bind(this.update, this);
    this.info = bind(this.info, this);
    this.help = bind(this.help, this);
    this.generate = bind(this.generate, this);
    this.init = bind(this.init, this);
    this.action = bind(this.action, this);
    this.welcomeCallback = bind(this.welcomeCallback, this);
    this.selectSkeletonCallback = bind(this.selectSkeletonCallback, this);
    this.extractConfig = bind(this.extractConfig, this);
    this.performAction = bind(this.performAction, this);
    this.wrapAction = bind(this.wrapAction, this);
    this.destroy = bind(this.destroy, this);
    this.getCommander = bind(this.getCommander, this);
    this.start = bind(this.start, this);
    var commander, consoleInterface, docpad, locale;
    consoleInterface = this;
    this.docpad = docpad = opts.docpad;
    this.commander = commander = require('commander');
    locale = docpad.getLocale();
    commander.version(docpad.getVersionString()).option('-o, --out <outPath>', locale.consoleOptionOut).option('-c, --config <configPath>', locale.consoleOptionConfig).option('-e, --env <environment>', locale.consoleOptionEnv).option('-d, --debug [logLevel]', locale.consoleOptionDebug, parseInt).option('-g, --global', locale.consoleOptionGlobal).option('-f, --force', locale.consoleOptionForce).option('--no-color', locale.consoleOptionNoColor).option('-p, --port <port>', locale.consoleOptionPort, parseInt).option('--cache', locale.consoleOptionCache).option('--silent', locale.consoleOptionSilent).option('--skeleton <skeleton>', locale.consoleOptionSkeleton).option('--profile', locale.consoleOptionProfile).option('--offline', locale.consoleOptionOffline);
    commander.command('action <actions>').description(locale.consoleDescriptionRun).action(consoleInterface.wrapAction(consoleInterface.action));
    commander.command('init').description(locale.consoleDescriptionInit).action(consoleInterface.wrapAction(consoleInterface.init));
    commander.command('run').description(locale.consoleDescriptionRun).action(consoleInterface.wrapAction(consoleInterface.run, {
      _stayAlive: true
    }));
    commander.command('server').description(locale.consoleDescriptionServer).action(consoleInterface.wrapAction(consoleInterface.server, {
      _stayAlive: true
    }));
    commander.command('render [path]').description(locale.consoleDescriptionRender).action(consoleInterface.wrapAction(consoleInterface.render, {
      logLevel: 3,
      checkVersion: false,
      welcome: false,
      prompts: false
    }));
    commander.command('generate').description(locale.consoleDescriptionGenerate).action(consoleInterface.wrapAction(consoleInterface.generate));
    commander.command('watch').description(locale.consoleDescriptionWatch).action(consoleInterface.wrapAction(consoleInterface.watch, {
      _stayAlive: true
    }));
    commander.command('update').description(locale.consoleDescriptionUpdate).action(consoleInterface.wrapAction(consoleInterface.update));
    commander.command('upgrade').description(locale.consoleDescriptionUpgrade).action(consoleInterface.wrapAction(consoleInterface.upgrade));
    commander.command('install [pluginName]').description(locale.consoleDescriptionInstall).action(consoleInterface.wrapAction(consoleInterface.install));
    commander.command('uninstall <pluginName>').description(locale.consoleDescriptionUninstall).action(consoleInterface.wrapAction(consoleInterface.uninstall));
    commander.command('clean').description(locale.consoleDescriptionClean).action(consoleInterface.wrapAction(consoleInterface.clean));
    commander.command('info').description(locale.consoleDescriptionInfo).action(consoleInterface.wrapAction(consoleInterface.info));
    commander.command('help').description(locale.consoleDescriptionHelp).action(consoleInterface.wrapAction(consoleInterface.help));
    commander.command('*').description(locale.consoleDescriptionUnknown).action(consoleInterface.wrapAction(consoleInterface.help));
    docpad.on('welcome', function(data, next) {
      return consoleInterface.welcomeCallback(data, next);
    });
    docpad.emitSerial('consoleSetup', {
      consoleInterface: consoleInterface,
      commander: commander
    }, function(err) {
      if (err) {
        return consoleInterface.destroyWithError(err);
      }
      return next(null, consoleInterface);
    });
    this;
  }


  /**
  	 * Start the CLI
  	 * @method start
  	 * @param {Array} argv
   */

  ConsoleInterface.prototype.start = function(argv) {
    this.commander.parse(argv || process.argv);
    return this;
  };


  /**
  	 * Get the commander
  	 * @method getCommander
  	 * @return the commander instance
   */

  ConsoleInterface.prototype.getCommander = function() {
    return this.commander;
  };


  /**
  	 * Destructor.
  	 * @method destroy
  	 * @param {Object} err
   */

  ConsoleInterface.prototype.destroy = function(err) {
    var docpad, locale, logLevel;
    docpad = this.docpad;
    locale = docpad.getLocale();
    logLevel = docpad.getLogLevel();
    if (err) {
      docpadUtil.writeError(err);
    }
    docpad.log('info', locale.consoleShutdown);
    process.stdin.on('error', function(err) {
      if (6 < logLevel) {
        return console.error(err);
      }
    });
    process.stdin.end();
    docpad.destroy(function(err) {
      var activeHandles, activeRequests;
      if (err) {
        docpadUtil.writeError(err);
      }
      if (6 <= logLevel) {
        activeRequests = process._getActiveRequests();
        if (activeRequests != null ? activeRequests.length : void 0) {
          console.log("Waiting on the requests1:\n" + (docpadUtil.inspect(activeRequests)));
        }
        activeHandles = process._getActiveHandles();
        if (activeHandles != null ? activeHandles.length : void 0) {
          process.exit(0);
        }
      }
    });
    return this;
  };


  /**
  	 * Wrap Action
  	 * @method wrapAction
  	 * @param {Object} action
  	 * @param {Object} config
   */

  ConsoleInterface.prototype.wrapAction = function(action, config) {
    var consoleInterface;
    consoleInterface = this;
    return function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return consoleInterface.performAction(action, args, config);
    };
  };


  /**
  	 * Perform Action
  	 * @method performAction
  	 * @param {Object} action
  	 * @param {Object} args
  	 * @param {Object} [config={}]
   */

  ConsoleInterface.prototype.performAction = function(action, args, config) {
    var completeAction, consoleInterface, docpad, opts, stayAlive;
    if (config == null) {
      config = {};
    }
    consoleInterface = this;
    docpad = this.docpad;
    stayAlive = false;
    if (config._stayAlive) {
      stayAlive = config._stayAlive;
      delete config._stayAlive;
    }
    opts = {};
    opts.commander = args.slice(-1)[0];
    opts.args = args.slice(0, -1);
    opts.instanceConfig = extendr.safeDeepExtendPlainObjects({}, this.extractConfig(opts.commander), config);
    completeAction = function(err) {
      var locale;
      locale = docpad.getLocale();
      if (err) {
        docpad.log('error', locale.consoleSuccess);
        return docpad.fatal(err);
      }
      docpad.log('info', locale.consoleSuccess);
      if (stayAlive === false) {
        return consoleInterface.destroy();
      }
    };
    docpad.action('load ready', opts.instanceConfig, function(err) {
      if (err) {
        return completeAction(err);
      }
      return action(completeAction, opts);
    });
    return this;
  };


  /**
  	 * Extract Configuration
  	 * @method extractConfig
  	 * @param {Object} [customConfig={}]
  	 * @return {Object} the DocPad config
   */

  ConsoleInterface.prototype.extractConfig = function(customConfig) {
    var commanderConfig, config, configPath, key, outPath, sourceConfig, value;
    if (customConfig == null) {
      customConfig = {};
    }
    config = {};
    commanderConfig = this.commander;
    sourceConfig = this.docpad.initialConfig;
    if (commanderConfig.debug) {
      if (commanderConfig.debug === true) {
        commanderConfig.debug = 7;
      }
      commanderConfig.logLevel = commanderConfig.debug;
    }
    if (commanderConfig.silent != null) {
      commanderConfig.prompts = !commanderConfig.silent;
    }
    if (commanderConfig.silent != null) {
      commanderConfig.databaseCache = commanderConfig.cache;
    }
    if (commanderConfig.config) {
      configPath = pathUtil.resolve(process.cwd(), commanderConfig.config);
      commanderConfig.configPaths = [configPath];
    }
    if (commanderConfig.out) {
      outPath = pathUtil.resolve(process.cwd(), commanderConfig.out);
      commanderConfig.outPath = outPath;
    }
    for (key in commanderConfig) {
      if (!hasProp.call(commanderConfig, key)) continue;
      value = commanderConfig[key];
      if (typeof sourceConfig[key] !== 'undefined') {
        config[key] = value;
      }
    }
    for (key in customConfig) {
      if (!hasProp.call(customConfig, key)) continue;
      value = customConfig[key];
      if (typeof sourceConfig[key] !== 'undefined') {
        config[key] = value;
      }
    }
    return config;
  };


  /**
  	 * Select a skeleton
  	 * @method selectSkeletonCallback
  	 * @param {Object} skeletonsCollection
  	 * @param {Function} next
   */

  ConsoleInterface.prototype.selectSkeletonCallback = function(skeletonsCollection, next) {
    var commander, consoleInterface, docpad, err, locale, skeletonModel, skeletonNames;
    consoleInterface = this;
    commander = this.commander;
    docpad = this.docpad;
    locale = docpad.getLocale();
    skeletonNames = [];
    if (this.commander.skeleton) {
      skeletonModel = skeletonsCollection.get(this.commander.skeleton);
      if (skeletonModel) {
        next(null, skeletonModel);
      } else {
        err = new Error("Couldn't fetch the skeleton with id " + this.commander.skeleton);
        next(err);
      }
      return this;
    }
    docpad.log('info', locale.skeletonSelectionIntroduction + '\n');
    skeletonsCollection.forEach(function(skeletonModel) {
      var skeletonDescription, skeletonName;
      skeletonName = skeletonModel.get('name');
      skeletonDescription = skeletonModel.get('description').replace(/\n/g, '\n\t');
      skeletonNames.push(skeletonName);
      return console.log("  " + (skeletonModel.get('position') + 1) + ".\t" + skeletonName + "\n  \t" + skeletonDescription + "\n");
    });
    consoleInterface.choose(locale.skeletonSelectionPrompt, skeletonNames, null, function(err, choice) {
      var index;
      if (err) {
        return next(err);
      }
      index = skeletonNames.indexOf(choice);
      return next(null, skeletonsCollection.at(index));
    });
    return this;
  };


  /**
  	 * Welcome Callback
  	 * @method welcomeCallback
  	 * @param {Object} opts
  	 * @param {Function} next
   */

  ConsoleInterface.prototype.welcomeCallback = function(opts, next) {
    var commander, consoleInterface, docpad, locale, userConfig, welcomeTasks;
    consoleInterface = this;
    commander = this.commander;
    docpad = this.docpad;
    locale = docpad.getLocale();
    userConfig = docpad.userConfig;
    welcomeTasks = new TaskGroup('welcome tasks').done(next);
    welcomeTasks.addTask('tos', function(complete) {
      if (docpad.config.prompts === false || userConfig.tos === true) {
        return complete();
      }
      return consoleInterface.confirm(locale.tosPrompt, {
        "default": true
      }, function(err, ok) {
        if (err) {
          return complete(err);
        }
        return docpad.track('tos', {
          ok: ok
        }, function(err) {
          if (ok) {
            userConfig.tos = true;
            console.log(locale.tosAgree);
            docpad.updateUserConfig(complete);
          } else {
            console.log(locale.tosDisagree);
            process.exit();
          }
        });
      });
    });
    welcomeTasks.addTask(function(complete) {
      if (docpad.config.prompts === false || (userConfig.subscribed != null) || ((userConfig.subscribeTryAgain != null) && (new Date()) > (new Date(userConfig.subscribeTryAgain)))) {
        return complete();
      }
      return consoleInterface.confirm(locale.subscribePrompt, {
        "default": true
      }, function(err, ok) {
        if (err) {
          return complete(err);
        }
        return docpad.track('subscribe', {
          ok: ok
        }, function(err) {
          var commands;
          if (!ok) {
            console.log(locale.subscribeIgnore);
            userConfig.subscribed = false;
            docpad.updateUserConfig(function(err) {
              if (err) {
                return complete(err);
              }
              return setTimeout(complete, 2000);
            });
            return;
          }
          commands = [['config', '--get', 'user.name'], ['config', '--get', 'user.email'], ['config', '--get', 'github.user']];
          return safeps.spawnCommands('git', commands, function(err, results) {
            var ref, ref1, ref2, subscribeTasks;
            userConfig.name = String((results != null ? (ref = results[0]) != null ? ref[1] : void 0 : void 0) || '').toString().trim() || null;
            userConfig.email = String((results != null ? (ref1 = results[1]) != null ? ref1[1] : void 0 : void 0) || '').toString().trim() || null;
            userConfig.username = String((results != null ? (ref2 = results[2]) != null ? ref2[1] : void 0 : void 0) || '').toString().trim() || null;
            if (userConfig.name || userConfig.email || userConfig.username) {
              console.log(locale.subscribeConfigNotify);
            }
            subscribeTasks = new TaskGroup('subscribe tasks').done(function(err) {
              if (err) {
                console.log(locale.subscribeError);
                userConfig.subscribeTryAgain = new Date().getTime() + 1000 * 60 * 60 * 24;
              } else {
                console.log(locale.subscribeSuccess);
                userConfig.subscribed = true;
                userConfig.subscribeTryAgain = null;
              }
              return docpad.updateUserConfig(userConfig, complete);
            });
            subscribeTasks.addTask('name fallback', function(complete) {
              return consoleInterface.prompt(locale.subscribeNamePrompt, {
                "default": userConfig.name
              }, function(err, result) {
                if (err) {
                  return complete(err);
                }
                userConfig.name = result;
                return complete();
              });
            });
            subscribeTasks.addTask('email fallback', function(complete) {
              return consoleInterface.prompt(locale.subscribeEmailPrompt, {
                "default": userConfig.email
              }, function(err, result) {
                if (err) {
                  return complete(err);
                }
                userConfig.email = result;
                return complete();
              });
            });
            subscribeTasks.addTask('username fallback', function(complete) {
              return consoleInterface.prompt(locale.subscribeUsernamePrompt, {
                "default": userConfig.username
              }, function(err, result) {
                if (err) {
                  return complete(err);
                }
                userConfig.username = result;
                return complete();
              });
            });
            subscribeTasks.addTask('save defaults', function(complete) {
              return docpad.updateUserConfig(complete);
            });
            subscribeTasks.addTask('subscribe', function(complete) {
              console.log(locale.subscribeProgress);
              return docpad.subscribe(function(err, res) {
                if (err) {
                  docpad.log('debug', locale.subscribeRequestError, err.message);
                  return complete(err);
                }
                docpad.log('debug', locale.subscribeRequestData, res.text);
                return complete();
              });
            });
            return subscribeTasks.run();
          });
        });
      });
    });
    welcomeTasks.run();
    return this;
  };


  /**
  	 * Prompt for input
  	 * @method prompt
  	 * @param {String} message
  	 * @param {Object} [opts={}]
  	 * @param {Function} next
   */

  ConsoleInterface.prototype.prompt = function(message, opts, next) {
    if (opts == null) {
      opts = {};
    }
    if (opts["default"]) {
      message += " [" + opts["default"] + "]";
    }
    opts = extendr.extend({
      trim: true,
      retry: true,
      silent: false
    }, opts);
    promptly.prompt(message, opts, next);
    return this;
  };


  /**
  	 * Confirm an option
  	 * @method confirm
  	 * @param {String} message
  	 * @param {Object} [opts={}]
  	 * @param {Function} next
   */

  ConsoleInterface.prototype.confirm = function(message, opts, next) {
    if (opts == null) {
      opts = {};
    }
    if (opts["default"] === true) {
      message += " [Y/n]";
    } else if (opts["default"] === false) {
      message += " [y/N]";
    }
    opts = extendr.extend({
      trim: true,
      retry: true,
      silent: false
    }, opts);
    promptly.confirm(message, opts, next);
    return this;
  };


  /**
  	 * Choose something
  	 * @method choose
  	 * @param {String} message
  	 * @param {Object} choices
  	 * @param {Object} [opts={}]
  	 * @param {Function} next
   */

  ConsoleInterface.prototype.choose = function(message, choices, opts, next) {
    var choice, i, index, indexes, j, len, prompt;
    if (opts == null) {
      opts = {};
    }
    message += " [1-" + choices.length + "]";
    indexes = [];
    for (i = j = 0, len = choices.length; j < len; i = ++j) {
      choice = choices[i];
      index = i + 1;
      indexes.push(index);
      message += "\n  " + index + ".\t" + choice;
    }
    opts = extendr.extend({
      trim: true,
      retry: true,
      silent: false
    }, opts);
    prompt = '> ';
    if (opts["default"]) {
      prompt += " [" + opts["default"] + "]";
    }
    console.log(message);
    promptly.choose(prompt, indexes, opts, function(err, index) {
      if (err) {
        return next(err);
      }
      choice = choices[index - 1];
      return next(null, choice);
    });
    return this;
  };


  /**
  	 * Do action
  	 * @method action
  	 * @param {Function} next
  	 * @param {Object} opts
   */

  ConsoleInterface.prototype.action = function(next, opts) {
    var actions;
    actions = opts.args[0];
    this.docpad.log('info', 'Performing the actions:', actions);
    this.docpad.action(actions, next);
    return this;
  };


  /**
  	 * Action initialise
  	 * @method init
  	 * @param {Function} next
   */

  ConsoleInterface.prototype.init = function(next) {
    this.docpad.action('init', next);
    return this;
  };


  /**
  	 * Generate action
  	 * @method generate
  	 * @param {Function} next
   */

  ConsoleInterface.prototype.generate = function(next) {
    this.docpad.action('generate', next);
    return this;
  };


  /**
  	 * Help method
  	 * @method help
  	 * @param {Function} next
   */

  ConsoleInterface.prototype.help = function(next) {
    var help;
    help = this.commander.helpInformation();
    console.log(help);
    next();
    return this;
  };


  /**
  	 * Info method
  	 * @method info
  	 * @param {Function} next
   */

  ConsoleInterface.prototype.info = function(next) {
    var docpad, info;
    docpad = this.docpad;
    info = docpad.inspector(docpad.config);
    console.log(info);
    next();
    return this;
  };


  /**
  	 * Update method
  	 * @method update
  	 * @param {Function} next
  	 * @param {Object} opts
   */

  ConsoleInterface.prototype.update = function(next, opts) {
    this.docpad.action('clean update', next);
    return this;
  };


  /**
  	 * Upgrade method
  	 * @method upgrade
  	 * @param {Function} next
  	 * @param {Object} opts
   */

  ConsoleInterface.prototype.upgrade = function(next, opts) {
    this.docpad.action('upgrade', next);
    return this;
  };


  /**
  	 * Install method
  	 * @method install
  	 * @param {Function} next
  	 * @param {Object} opts
   */

  ConsoleInterface.prototype.install = function(next, opts) {
    var plugin;
    plugin = opts.args[0] || null;
    this.docpad.action('install', {
      plugin: plugin
    }, next);
    return this;
  };


  /**
  	 * Uninstall method
  	 * @method uninstall
  	 * @param {Function} next
  	 * @param {Object} opts
   */

  ConsoleInterface.prototype.uninstall = function(next, opts) {
    var plugin;
    plugin = opts.args[0] || null;
    this.docpad.action('uninstall', {
      plugin: plugin
    }, next);
    return this;
  };


  /**
  	 * Render method
  	 * @method render
  	 * @param {Function} next
  	 * @param {Object} opts
   */

  ConsoleInterface.prototype.render = function(next, opts) {
    var basename, commander, data, docpad, filename, renderDocument, renderOpts, stdin, timeout, useStdin;
    docpad = this.docpad;
    commander = this.commander;
    renderOpts = {};
    filename = opts.args[0] || null;
    basename = pathUtil.basename(filename);
    renderOpts.filename = filename;
    renderOpts.renderSingleExtensions = 'auto';
    data = '';
    useStdin = true;
    renderDocument = function(complete) {
      return docpad.action('render', renderOpts, function(err, result) {
        if (err) {
          return complete(err);
        }
        if (commander.out != null) {
          return safefs.writeFile(commander.out, result, complete);
        } else {
          process.stdout.write(result);
          return complete();
        }
      });
    };
    timeout = docpadUtil.wait(1000, function() {
      timeout = null;
      if (data.replace(/\s+/, '')) {
        return next();
      }
      useStdin = false;
      stdin.pause();
      return renderDocument(next);
    });
    stdin = process.stdin;
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', function(_data) {
      return data += _data.toString();
    });
    process.stdin.on('end', function() {
      if (!useStdin) {
        return;
      }
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      renderOpts.data = data;
      return renderDocument(next);
    });
    return this;
  };


  /**
  	 * Run method
  	 * @method run
  	 * @param {Function} next
   */

  ConsoleInterface.prototype.run = function(next) {
    this.docpad.action('run', {
      selectSkeletonCallback: this.selectSkeletonCallback,
      next: next
    });
    return this;
  };


  /**
  	 * Server method
  	 * @method server
  	 * @param {Function} next
   */

  ConsoleInterface.prototype.server = function(next) {
    this.docpad.action('server generate', next);
    return this;
  };


  /**
  	 * Clean method
  	 * @method clean
  	 * @param {Function} next
   */

  ConsoleInterface.prototype.clean = function(next) {
    this.docpad.action('clean', next);
    return this;
  };


  /**
  	 * Watch method
  	 * @method watch
  	 * @param {Function} next
   */

  ConsoleInterface.prototype.watch = function(next) {
    this.docpad.action('generate watch', next);
    return this;
  };

  return ConsoleInterface;

})();

module.exports = ConsoleInterface;