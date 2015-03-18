/** @jsx React.DOM */
var $ = require('jquery');
var _ = require('underscore');
var React = require('react/addons');
var Campaign = require('../models/campaign');

var NewCampaignLink = React.createClass({
  render: function() {
    return (
      <a href='#' onClick={this.props.handleOnClick}>Create New Campaign</a>
    );
  }
});

var NewCampaign = React.createClass({
  getInitialState: function() {
    return {
      name: null
    };
  },

  handleSubmit_: function(e){
    e.preventDefault();

    var self = this;

    campaign = new Campaign({name: this.state.name});
    campaign.save({
      success: function() {
        this.props.onCreate(campaign);
      },
      failure: function() {
        console.log('failed to create campaign', arguments)
      }
    });
  },


  handleChange_: function(event){
    this.setState({name: event.target.value});
  },

  render: function() {
    return (
      <div className='new_campaign'>
        <form onSubmit={this.handleSubmit_}>
          <label htmlFor='campaign_name'>Name: </label>
          <input onChange={this.handleChange_} name='campaign_name' type='text' value={this.state.value} />
          <input type='submit' value='Create'/>
        </form>
      </div>
    );
  }
});

var Campaigns = React.createClass({
  getInitialState: function() {
    return {
      showNewCampaign: false,
      campaigns: []
    }
  },

  showNewCampaign_: function() {
    this.setState({showNewCampaign: true});
  },

  handleCreate_: function(campaign) {
    console.log('handle create new campaign')
    var newCampaigns = _.clone(this.state.campaigns);
    newCampaigns.push(campaign);
    this.setState({campaigns: newCampaigns, showNewCampaign: false});
  },

  render: function() {
    return (
      <div>
        {this.state.showNewCampaign ? <NewCampaign onCreate={this.handleCreate_} /> : null}
        {!this.state.showNewCampaign ? <NewCampaignLink handleOnClick={this.showNewCampaign_}/> : null}
        <div className='campaigns'>
          {_.map(this.state.campaigns, function(campaign) {
            return (
              <div key={campaign.cid}>
                {campaign.get('name')}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});

module.exports = Campaigns;