// Generated by CoffeeScript 1.12.4
var BasePlugin, ambi, eachr, extendr, typeChecker,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

extendr = require('extendr');

typeChecker = require('typechecker');

ambi = require('ambi');

eachr = require('eachr');


/**
 * The base class for all DocPad plugins
 * @class BasePlugin
 * @constructor
 */

BasePlugin = (function() {

  /**
  	 * Add support for BasePlugin.extend(proto)
  	 * @private
  	 * @property {Object} @extend
   */
  BasePlugin.extend = require('csextends');


  /**
  	 * The DocPad Instance
  	 * @private
  	 * @property {Object} docpad
   */

  BasePlugin.prototype.docpad = null;


  /**
  	 * The plugin name
  	 * @property {String}
   */

  BasePlugin.prototype.name = null;


  /**
  	 * The plugin config
  	 * @property {Object}
   */

  BasePlugin.prototype.config = {};


  /**
  	 * The instance config.
  	 * @property {Object}
   */

  BasePlugin.prototype.instanceConfig = {};


  /**
  	 * Plugin priority
  	 * @private
  	 * @property {Number}
   */

  BasePlugin.prototype.priority = 500;


  /**
  	 * Constructor method for the plugin
  	 * @method constructor
  	 * @param {Object} opts
   */

  function BasePlugin(opts) {
    this.getConfig = bind(this.getConfig, this);
    this.setConfig = bind(this.setConfig, this);
    var config, docpad, me;
    me = this;
    docpad = opts.docpad, config = opts.config;
    this.docpad = docpad;
    this.bindListeners();
    this.config = extendr.deepClone(this.config);
    this.instanceConfig = extendr.deepClone(this.instanceConfig);
    this.initialConfig = this.config;
    this.setConfig(config);
    if (this.isEnabled() === false) {
      return this;
    }
    this.addListeners();
    this;
  }


  /**
  	 * Set Instance Configuration
  	 * @private
  	 * @method setInstanceConfig
  	 * @param {Object} instanceConfig
   */

  BasePlugin.prototype.setInstanceConfig = function(instanceConfig) {
    if (instanceConfig) {
      extendr.safeDeepExtendPlainObjects(this.instanceConfig, instanceConfig);
      if (this.config) {
        extendr.safeDeepExtendPlainObjects(this.config, instanceConfig);
      }
    }
    return this;
  };


  /**
  	 * Set Configuration
  	 * @private
  	 * @method {Object} setConfig
  	 * @param {Object} [instanceConfig=null]
   */

  BasePlugin.prototype.setConfig = function(instanceConfig) {
    var configPackages, configsToMerge, docpad, userConfig;
    if (instanceConfig == null) {
      instanceConfig = null;
    }
    docpad = this.docpad;
    userConfig = this.docpad.config.plugins[this.name];
    this.config = this.docpad.config.plugins[this.name] = {};
    if (instanceConfig) {
      this.setInstanceConfig(instanceConfig);
    }
    configPackages = [this.initialConfig, userConfig, this.instanceConfig];
    configsToMerge = [this.config];
    docpad.mergeConfigurations(configPackages, configsToMerge);
    if (!this.isEnabled()) {
      this.removeListeners();
    }
    return this;
  };


  /**
  	 * Get the Configuration
  	 * @private
  	 * @method {Object}
   */

  BasePlugin.prototype.getConfig = function() {
    return this.config;
  };


  /**
  	 * Alias for b/c
  	 * @private
  	 * @method bindEvents
   */

  BasePlugin.prototype.bindEvents = function() {
    return this.addListeners();
  };


  /**
  	 * Bind Listeners
  	 * @private
  	 * @method bindListeners
   */

  BasePlugin.prototype.bindListeners = function() {
    var docpad, events, pluginInstance;
    pluginInstance = this;
    docpad = this.docpad;
    events = docpad.getEvents();
    eachr(events, function(eventName) {
      var eventHandler;
      eventHandler = pluginInstance[eventName];
      if (typeChecker.isFunction(eventHandler)) {
        return pluginInstance[eventName] = eventHandler.bind(pluginInstance);
      }
    });
    return this;
  };


  /**
  	 * Add Listeners
  	 * @private
  	 * @method addListeners
   */

  BasePlugin.prototype.addListeners = function() {
    var docpad, events, pluginInstance;
    pluginInstance = this;
    docpad = this.docpad;
    events = docpad.getEvents();
    eachr(events, function(eventName) {
      var eventHandler, eventHandlerPriority;
      eventHandler = pluginInstance[eventName];
      if (typeChecker.isFunction(eventHandler)) {
        eventHandlerPriority = pluginInstance[eventName + 'Priority'] || pluginInstance.priority || null;
        if (eventHandler.priority == null) {
          eventHandler.priority = eventHandlerPriority;
        }
        eventHandler.name = pluginInstance.name + ": {eventName}";
        if (eventHandler.priority != null) {
          eventHandler.name += "(priority eventHandler.priority})";
        }
        return docpad.off(eventName, eventHandler).on(eventName, eventHandler);
      }
    });
    return this;
  };


  /**
  	 * Remove Listeners
  	 * @private
  	 * @method removeListeners
   */

  BasePlugin.prototype.removeListeners = function() {
    var docpad, events, pluginInstance;
    pluginInstance = this;
    docpad = this.docpad;
    events = docpad.getEvents();
    eachr(events, function(eventName) {
      var eventHandler;
      eventHandler = pluginInstance[eventName];
      if (typeChecker.isFunction(eventHandler)) {
        return docpad.off(eventName, eventHandler);
      }
    });
    return this;
  };


  /**
  	 * Destructor. Calls removeListeners
  	 * @private
  	 * @method destroy
   */

  BasePlugin.prototype.destroy = function() {
    this.removeListeners();
    return this;
  };


  /**
  	 * Is Enabled?
  	 * @method isEnabled
  	 * @return {Boolean}
   */

  BasePlugin.prototype.isEnabled = function() {
    return this.config.enabled !== false;
  };

  return BasePlugin;

})();

module.exports = BasePlugin;
