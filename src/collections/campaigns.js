var Backbone = require('backbone');
var Campaign = require('../models/campaign');

var Loots = module.exports = Backbone.Collection.extend({
  __name__: 'Campaigns',

  model: Campaign,

  url: '/campaigns'
});