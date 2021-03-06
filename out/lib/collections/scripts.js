// Generated by CoffeeScript 1.12.4
var ElementsCollection, ScriptsCollection, typeChecker,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

typeChecker = require('typechecker');

ElementsCollection = require('./elements');


/**
 * Scripts collection class. A DocPad
 * project's script file paths
 * @class ScriptCollection
 * @constructor
 * @extends ElementsCollection
 */

ScriptsCollection = (function(superClass) {
  extend(ScriptsCollection, superClass);

  function ScriptsCollection() {
    return ScriptsCollection.__super__.constructor.apply(this, arguments);
  }


  /**
  	 * Add an element to the collection
  	 * Right now we just support strings
  	 * @method add
  	 * @param {Array} values string array of file paths
  	 * @param {Object} opts
   */

  ScriptsCollection.prototype.add = function(values, opts) {
    var i, key, len, value;
    opts || (opts = {});
    if (opts.defer == null) {
      opts.defer = true;
    }
    if (opts.async == null) {
      opts.async = false;
    }
    opts.attrs || (opts.attrs = '');
    if (typeChecker.isArray(values)) {
      values = values.slice();
    } else if (values) {
      values = [values];
    } else {
      values = [];
    }
    if (opts.defer) {
      opts.attrs += "defer=\"defer\" ";
    }
    if (opts.async) {
      opts.attrs += "async=\"async\" ";
    }
    for (key = i = 0, len = values.length; i < len; key = ++i) {
      value = values[key];
      if (typeChecker.isString(value)) {
        if (value[0] === '<') {
          continue;
        } else if (value.indexOf(' ') === -1) {
          values[key] = "<script " + opts.attrs + " src=\"" + value + "\"></script>";
        } else {
          values[key] = "<script " + opts.attrs + ">" + value + "</script>";
        }
      }
    }
    return ScriptsCollection.__super__.add.call(this, values, opts);
  };

  return ScriptsCollection;

})(ElementsCollection);

module.exports = ScriptsCollection;
