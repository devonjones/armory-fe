/** @jsx React.DOM */
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;

var React = require('react/addons');
var User = require('./models/user');
var AppHeader = require('./views/app_header');
var Campaigns = require('./views/campaigns');

var Container = React.createClass({
  getInitialState: function() {
    return {
      user: new User()
    };
  },

  componentWillMount: function() {
    var user = new User()
        self = this;

    user.fetch({
      success: function(model, response, options) {
        self.setState({user: model});
      },
      failure: function(model, response, options) {
        console.log('failed to get user', arguments)
      }
    });
  },

  render: function() {
    return (
      <div>
        <AppHeader user={this.state.user}/>
        <div className='app_container'>
          <Campaigns user={this.state.user}/>
        </div>
      </div>
    );
  }
});

var OwnerSelector = React.createClass({
  getInitialState: function() {
    return {
      mode: 'viewing'
    };
  },

  handleClick: function(){
    var newMode = this.state.mode === 'viewing' ? 'selecting' : 'viewing';
    this.setState({mode: newMode});
  },

  render: function() {
    var renderData;

    if (this.state.mode === 'viewing') {
      if (this.props.item.get('owner')) {
        return (<span>{this.props.item.get('owner')}</span>);
      } else {
        return (
          <span>
            <a href='#' onClick={this.handleClick}>Claim</a>
          </span>
        );
      }
    } else if (this.state.mode === 'selecting') {
      return (
        <select onChange={this.handleClick}>
          <option value='1'>A</option>
          <option value='2'>B</option>
          <option value='3'>C</option>
        </select>
      );
    }

  }
});

var UberTable = React.createClass({
  getInitialState: function() {
    return {
      sortColumn: 'name',
      sortDirection: 'default'
    };
  },

  handleColumnClick: function(column, e) {
    e.preventDefault();

    var sortOptions = {};
    if (column === this.state.sortColumn) {
      sortOptions.sortDirection = this.state.sortDirection === 'default' ? 'reverse' : 'default';
    } else {
      sortOptions.sortColumn = column;
    }
    this.setState(sortOptions);
  },

  render: function() {
    var data = this.props.data,
        column = this.state.sortColumn,
        orderedData = data.sortBy(function(item){
          return item.get(column);
        });

    if (this.state.sortDirection === 'reverse') {
      orderedData.reverse();
    }

    return (
      <table className='armory_table'>
        <thead>
          <tr>
            <td onClick={this.handleColumnClick.bind(this, 'name')}>Name</td>
            <td onClick={this.handleColumnClick.bind(this, 'type')}>Type</td>
            <td onClick={this.handleColumnClick.bind(this, 'price')}>Price</td>
            <td onClick={this.handleColumnClick.bind(this, 'quantity')}>Quantity</td>
            <td onClick={this.handleColumnClick.bind(this, 'sale_percent')}>Sale Percent</td>
            <td onClick={this.handleColumnClick.bind(this, 'weight')}>Weight</td>
            <td onClick={this.handleColumnClick.bind(this, 'owner')}>Owner</td>
          </tr>
        </thead>
        <tbody>
        {_.map(orderedData, function(item) {
          return (
            <tr key={item.get('id')}>
              <td>{item.get('name')}</td>
              <td>{item.get('type')}</td>
              <td>{item.get('price')}</td>
              <td>{item.get('quantity')}</td>
              <td>{item.get('sale_percent')}</td>
              <td>{item.get('weight')}</td>
              <td>
                <OwnerSelector item={item} />
              </td>
            </tr>
          );
        })}
        </tbody>
        <tfoot></tfoot>
      </table>
    );
  }
});

React.render(<Container />, document.getElementById('main'));
