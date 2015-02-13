/** @jsx React.DOM */
var React = require('react/addons');
var Campaign = require('./models/campaign');
// var CampaignHeader = require('./views/campaign_header')

var fakeData = {
  "id": 1,
  "name": "Wow, such campaign",
  "gm": "Mommas Boy McBasement",
  "created": 1423604195790,
  "updated": 1423624195790,
};

var CampaignHeader = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Campaign: {this.props.campaign.get('name')}</h3>

        <ol>
          {this.props.campaign.loot().map(function(item) {
            console.log('item', item)
            return (<li key={item.get('id')}>{item.get('name')}</li>);
          })}
        </ol>

      </div>
    );
  }
});

React.render(<CampaignHeader campaign={new Campaign(fakeData)} />, document.getElementById('main'));

