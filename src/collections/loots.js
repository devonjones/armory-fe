var Backbone = require('backbone');
var Loot = require('../models/loot');

var Loots = module.exports = Backbone.Collection.extend({
  model: Loot
});