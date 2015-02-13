var backbone = require("backbone");
var Loots = require("../collections/loots");

var Campaign = module.exports = backbone.Model.extend({
  __name__: 'Campaign',

  initialize: function(options) {
    this.items = new Loots();

    for(var i=0;i<10;i++) {
      var lootData = {
        'id': i+1,
        'name': 'Loot Item ' + (i+1),
        'type': 'Treasure',
        'price': Math.floor((Math.random() * 50) + 1),
        'quantity': Math.floor((Math.random() * 3) + 1),
        'sale_percent': 0.8,
        'weight': 1.0,
        'owner': (i%3 === 0) ? 'Bob' : null,
        'created': 1423754966940,
        'updated': 1423754966940
      };
      this.items.add(lootData);
    }
  },

  loot: function() {
    return this.items;
  }
});