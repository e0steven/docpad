// Generated by CoffeeScript 1.12.4
var Collection, Events, Model, QueryCollection, emit, extendr, log, queryEngine,
  slice = [].slice,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

extendr = require('extendr');

queryEngine = require('query-engine');

log = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  args.unshift('log');
  this.emit.apply(this, args);
  return this;
};

emit = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return this.trigger.apply(this, args);
};


/**
 * Base class for the DocPad Events object
 * Extends the backbone.js events object
 * http://backbonejs.org/#Events
 * @class Events
 * @constructor
 * @extends queryEngine.Backbone.Events
 */

Events = (function() {
  function Events() {}

  Events.prototype.log = log;

  Events.prototype.emit = emit;

  return Events;

})();

extendr.extend(Events.prototype, queryEngine.Backbone.Events);


/**
 * Base class for the DocPad file and document model
 * Extends the backbone.js model
 * http://backbonejs.org/#Model
 * @class Model
 * @constructor
 * @extends queryEngine.Backbone.Model
 */

Model = (function(superClass) {
  extend(Model, superClass);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  Model.prototype.log = log;

  Model.prototype.emit = emit;

  Model.prototype.setDefaults = function(attrs, opts) {
    var key, ref, set, value;
    if (attrs == null) {
      attrs = {};
    }
    set = {};
    for (key in attrs) {
      if (!hasProp.call(attrs, key)) continue;
      value = attrs[key];
      if (this.get(key) === ((ref = this.defaults) != null ? ref[key] : void 0)) {
        set[key] = value;
      }
    }
    return this.set(set, opts);
  };

  return Model;

})(queryEngine.Backbone.Model);


/**
 * Base class for the DocPad collection object
 * Extends the backbone.js collection object
 * http://backbonejs.org/#Collection
 * @class Collection
 * @constructor
 * @extends queryEngine.Backbone.Collection
 */

Collection = (function(superClass) {
  extend(Collection, superClass);

  function Collection() {
    this.destroy = bind(this.destroy, this);
    return Collection.__super__.constructor.apply(this, arguments);
  }

  Collection.prototype.log = log;

  Collection.prototype.emit = emit;

  Collection.prototype.destroy = function() {
    this.emit('destroy');
    this.off().stopListening();
    return this;
  };

  return Collection;

})(queryEngine.Backbone.Collection);

Collection.prototype.model = Model;

Collection.prototype.collection = Collection;


/**
 * Base class for the DocPad query collection object
 * Extends the bevry QueryEngine object
 * http://github.com/bevry/query-engine
 * @class QueryCollection
 * @constructor
 * @extends queryEngine.QueryCollection
 */

QueryCollection = (function(superClass) {
  extend(QueryCollection, superClass);

  function QueryCollection() {
    this.destroy = bind(this.destroy, this);
    return QueryCollection.__super__.constructor.apply(this, arguments);
  }

  QueryCollection.prototype.log = log;

  QueryCollection.prototype.emit = emit;

  QueryCollection.prototype.setParentCollection = function() {
    var parentCollection;
    QueryCollection.__super__.setParentCollection.apply(this, arguments);
    parentCollection = this.getParentCollection();
    parentCollection.on('destroy', this.destroy);
    return this;
  };

  QueryCollection.prototype.destroy = function() {
    this.emit('destroy');
    this.off().stopListening();
    return this;
  };

  return QueryCollection;

})(queryEngine.QueryCollection);

QueryCollection.prototype.model = Model;

QueryCollection.prototype.collection = QueryCollection;

module.exports = {
  Events: Events,
  Model: Model,
  Collection: Collection,
  QueryCollection: QueryCollection
};