// Generated by CoffeeScript 1.12.6
var Collection, ElementsCollection, Model, ref, typeChecker,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

typeChecker = require('typechecker');

ref = require('../base'), Collection = ref.Collection, Model = ref.Model;


/**
 * Base class for the DocPad Elements Collection object
 * Extends the DocPad collection class
 * https://github.com/docpad/docpad/blob/master/src/lib/base.coffee#L72
 * Used as the base collection class for specific collection of file types.
 * In particular metadata, scripts and styles.
 * @class ElementsCollection
 * @constructor
 * @extends Collection
 */

ElementsCollection = (function(superClass) {
  extend(ElementsCollection, superClass);

  function ElementsCollection() {
    return ElementsCollection.__super__.constructor.apply(this, arguments);
  }


  /**
  	 * Base Model for all items in this collection
  	 * @property {Object} model
   */

  ElementsCollection.prototype.model = Model;


  /**
  	 * Add an element to the collection.
  	 * Right now we just support strings.
  	 * @method add
  	 * @param {Array} values string array of values
  	 * @param {Object} opts
   */

  ElementsCollection.prototype.add = function(values, opts) {
    var i, key, len, value;
    if (typeChecker.isArray(values)) {
      values = values.slice();
    } else if (values) {
      values = [values];
    } else {
      values = [];
    }
    for (key = i = 0, len = values.length; i < len; key = ++i) {
      value = values[key];
      if (typeChecker.isString(value)) {
        values[key] = new Model({
          html: value
        });
      }
    }
    ElementsCollection.__super__.add.call(this, values, opts);
    return this;
  };

  ElementsCollection.prototype.set = function() {
    ElementsCollection.__super__.set.apply(this, arguments);
    return this;
  };

  ElementsCollection.prototype.remove = function() {
    ElementsCollection.__super__.remove.apply(this, arguments);
    return this;
  };

  ElementsCollection.prototype.reset = function() {
    ElementsCollection.__super__.reset.apply(this, arguments);
    return this;
  };


  /**
  	 * Create a way to output our elements to HTML
  	 * @method toHTML
  	 * @return {String}
   */

  ElementsCollection.prototype.toHTML = function() {
    var html;
    html = '';
    this.forEach(function(item) {
      return html += item.get('html') || '';
    });
    return html;
  };

  ElementsCollection.prototype.join = function() {
    return this.toHTML();
  };

  return ElementsCollection;

})(Collection);

module.exports = ElementsCollection;
