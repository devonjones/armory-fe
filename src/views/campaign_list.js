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

    campaign = new Campaign();
    campaign.save({name: this.state.name}, {
      success: function(model, response, options) {
        self.props.onCreate(campaign);
      },
      failure: function(model, response, options) {
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

var CampaignSummary = React.createClass({

  // handleDelete_: function() {
  //   this.props.campaign.destroy();
  // },

  render: function() {
    var campaign = this.props.campaign;
    return (
      <div className='campaign' key={campaign.cid}>
        {campaign.get('name')}
      </div>
    );
  }
//<a href='#' onClick={this.handleDelete_}>Delete</a>
})

var CampaignList = React.createClass({
  getInitialState: function() {
    return {
      showNewCampaign: false
    }
  },

  showNewCampaign_: function() {
    this.setState({showNewCampaign: true});
  },

  handleCreate_: function(campaign) {
    console.log('handle create new campaign')
    var campaigns = this.props.campaigns;
    campaigns.push(campaign);

    this.setState({showNewCampaign: false});
  },

  render: function() {
    return (
      <div>
        {this.state.showNewCampaign ? <NewCampaign onCreate={this.handleCreate_} /> : null}
        {!this.state.showNewCampaign ? <NewCampaignLink handleOnClick={this.showNewCampaign_}/> : null}
        <div className='campaigns'>
          {_.map(this.props.campaigns, function(campaign) {
            return (
              <CampaignSummary campaign={campaign}/>
            );
          })}
        </div>
      </div>
    );
  }
});

module.exports = CampaignList;