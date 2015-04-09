/** @jsx React.DOM */
var $ = require('jquery');
var _ = require('underscore');
var React = require('react/addons');

var CampaignShow = React.createClass({
  render: function() {
    var campaign = this.props.campaign;

    return (
      <div>
        <h3>Campaign: {campaign.get('name')} ({campaign.get('id')})</h3>
        <div>Created: {campaign.get('created_at')}, Updated: {campaign.get('updated_at')}</div>
        <div>GM: {campaign.get('gm')}</div>
        <div>Token: {campaign.get('token')}</div>
        <div>Players:
          <ul>
            {_.each(campaign.get('players'), function(player) {
              return (
                <li>{player}</li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = CampaignShow;
