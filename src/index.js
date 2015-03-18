/** @jsx React.DOM */
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;

var React = require('react/addons');
// var Campaign = require('./models/campaign');
var User = require('./models/user');
// var CampaignHeader = require('./views/campaign_header');
var AppHeader = require('./views/app_header');


var fakeData = {
  "id": 1,
  "name": "Wow, such campaign",
  "gm": "Mommas Boy McBasement",
  "created": 1423604195790,
  "updated": 1423624195790,
};

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
        console.log('success')
        self.setState({user: model});
      },
      failure: function(model, response, options) {
        console.log('failure')
      }
    });
  },

  render: function() {
    return (
      <div>
        <AppHeader user={this.state.user}/>
      </div>
    );
    // <CampaignHeader campaign={campaign} />
    // <UberTable data={campaign.loot()} />
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

// var campaign = new Campaign(fakeData);
// React.render(<Container campaign={campaign} />, document.getElementById('main'));
React.render(<Container />, document.getElementById('main'));
