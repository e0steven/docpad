// Generated by CoffeeScript 1.12.4
var checkDocPad, docpadUtil, startDocPad,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

if (process.versions.node.indexOf('0') === 0 && process.versions.node.split('.')[1] % 2 !== 0) {
  console.log(require('util').format("== WARNING ==\n   DocPad is running against an unstable version of Node.js (v%s to be precise).\n   Unstable versions of Node.js WILL break things! Do not use them with DocPad!\n   Run DocPad with a stable version of Node.js (e.g. v%s) for a stable experience.\n   For more information, visit: %s\n== WARNING ===", process.versions.node, "0." + (process.versions.node.split('.')[1] - 1), "http://docpad.org/unstable-node"));
}

docpadUtil = require('../lib/util');

checkDocPad = function() {
  if (indexOf.call(process.argv, '--global') >= 0 || indexOf.call(process.argv, '--g') >= 0) {
    return startDocPad();
  }
  if (docpadUtil.isLocalDocPadExecutable()) {
    return startDocPad();
  }
  if (docpadUtil.getLocalDocPadExecutableExistance() === false) {
    return startDocPad();
  }
  return docpadUtil.startLocalDocPadExecutable();
};

startDocPad = function() {
  var ConsoleInterface, DocPad, action;
  DocPad = require('../lib/docpad');
  ConsoleInterface = require('../lib/interfaces/console');
  action = process.argv.slice(1).join(' ').indexOf('deploy') !== -1 ? 'load' : false;
  return new DocPad({
    action: action
  }, function(err, docpad) {
    if (err) {
      return docpadUtil.writeError(err);
    }
    return new ConsoleInterface({
      docpad: docpad
    }, function(err, consoleInterface) {
      if (err) {
        return docpadUtil.writeError(err);
      }
      return consoleInterface.start();
    });
  });
};

checkDocPad();
