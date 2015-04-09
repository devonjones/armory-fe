/** @jsx React.DOM */
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;

var React = require('react/addons');
var User = require('./models/user');
var Campaigns = require('./collections/campaigns');
var AppHeader = require('./views/app_header');
var CampaignList = require('./views/campaign_list');
var CampaignShow = require('./views/campaign_show');

var Container = React.createClass({
  getInitialState: function() {
    return {
      user: new User(),
      campaigns: new Campaigns(),
      campaign: null
    };
  },

  componentWillMount: function() {
    var user = this.state.user,
        campaigns = this.state.campaigns,
        self = this;

    user.fetch({
      failure: function(model, response, options) {
        console.log('failed to get user', arguments)
      },
      success: function() {
        self.forceUpdate();
      }
    });

    campaigns.fetch({
      failure: function(collection, response, options) {
        console.log('failed to get campaigns', arguments)
      }
    });
  },

  setCampaign: function(campaign) {
    console.log('set campaign', campaign)
    this.setState({campaign: campaign});
  },

  unsetCampaign: function() {
    this.setState({campaign: null});
  },

  render: function() {
    return (
      <div>
        <AppHeader user={this.state.user} onUnsetCampaign={this.unsetCampaign} />
        <div className='app_container'>
          {this.state.campaign ?
            <CampaignShow user={this.state.user} campaign={this.state.campaign} /> :
            <CampaignList user={this.state.user} campaigns={this.state.campaigns} onCampaignClick={this.setCampaign} />}
        </div>
      </div>
    );
  }
});

React.render(<Container />, document.getElementById('main'));
