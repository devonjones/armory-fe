/** @jsx React.DOM */
var React = require('react/addons');

var CampaignHeader = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Campaign: {this.props.campaign.get('name')}</h3>
      </div>
    );
  }
});