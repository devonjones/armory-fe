/** @jsx React.DOM */
var React = require('react/addons');

var AppHeader = React.createClass({
  render: function() {
    return (
      <div className='header'>
        <h3>Hello, {this.props.user.get('name')}</h3>
        <a className='header_link' href='#' onClick={this.props.onUnsetCampaign}>Campaigns</a>
      </div>
    );
  }
});

module.exports = AppHeader;
