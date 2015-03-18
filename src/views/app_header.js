/** @jsx React.DOM */
var React = require('react/addons');

var AppHeader = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Hello, {this.props.user.get('name')}</h3>
      </div>
    );
  }
});

module.exports = AppHeader;