/** @jsx React.DOM */
var $ = require('jquery');
var _ = require('underscore');
var React = require('react/addons');
var Invitation = require('../models/invitation')


var InvitationForm = React.createClass({
  getInitialState: function() {
    return {
      email: null
    };
  },

  handleSubmit_: function(e){
    e.preventDefault();

    console.log('inviting', this.state.email)

    // var self = this;
    // this.props.campaigns.create({email: this.state.email}, {
    //   success: function(model, response, options) {
    //     self.props.onCreate(model);
    //   },
    //   failure: function(model, response, options) {
    //     console.log('failed to create campaign', arguments)
    //   }
    // });
  },

  handleChange_: function(event){
    this.setState({email: event.target.value});
  },

  render: function() {
    return (
      <div className='new_invite'>
        <form onSubmit={this.handleSubmit_}>
          <label htmlFor='invite_email'>Email: </label>
          <input onChange={this.handleChange_} placeholder='E-mail' name='invite_email' type='text' value={this.state.value} />
          <input type='submit' value='Invite' />
        </form>
      </div>
    );
  }
});

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
          <InvitationForm />
        </div>
      </div>
    );
  }
});

module.exports = CampaignShow;
