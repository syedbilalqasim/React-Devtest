/** @jsx React.DOM */

var React         = require('react');
var ShowAddButton = require('./ShowAddButton');
var FeedForm      = require('./FeedForm');
var FeedList      = require('./FeedList');
var _             = require('lodash');
var Firebase      = require('firebase');

var Feed = React.createClass({

  loadData: function() {
    var ref = new Firebase('https://react-task.firebaseio.com/');
    ref.on('value', function(snap) {
      var items = [];
      var sorted = [];

      snap.forEach(function(itemSnap) {
        var item = itemSnap.val();
        item.key = itemSnap.name();
        items.push(item);
      });

      sorted = _.sortBy(items, function(item) {
        return -item.havepay;
      });

      this.setState({
        items: sorted
      });

    }.bind(this));
  },

  componentDidMount: function() {
    this.loadData();
  },

  getInitialState: function() {
    return {
      items: [],
      formDisplayed: false
    }
  },

  onToggleForm: function() {
    this.setState({
      formDisplayed: !this.state.formDisplayed
    });
  },

  onNewItem: function(newItem) {
    var ref = new Firebase('https://react-task.firebaseio.com/');
    ref.push(newItem);
  },

  onPay: function(item) {
    var ref = new Firebase('https://react-task.firebaseio.com/').child(item.key);
    ref.update(item);
  },

  render: function() {
    return (
      <div>

        <div className="container">
          <ShowAddButton displayed={this.state.formDisplayed} onToggleForm={this.onToggleForm} />
        </div>

        <FeedForm displayed={this.state.formDisplayed} onNewItem={this.onNewItem} />

        <br />
        <br />

        <div className="jumbotron text-center" className="container">
        <div className="panel panel-success">
          <div className="panel-heading">
          <h2 className="panel-title">
            About Payment Hisab!
          </h2>
          </div>
          <div className="panel-body">
          <blockquote>

              <h4>
                <em>This App is super easy to use. The person paying the bill
                will click the up button equal to the people present at the
                meal excluding him and the down button once for all the other guys.
                Now the person will have balance added to his account so next
                time the other people will pay for his meal and utilize the positive
                amount. Other people who didn't pay for the meal will have negative
                balance in their accounts so next time they will pay to finish the owes.
                <br></br>
                For Example: If Bilal Pay the bill he will positive add Rs. 20 to his
                account and add negative Rs. 10 to pay the balance of his friends.
                Now the balance is Bilal: 20, Abid: -10, Abrar: -10.
                <br></br>
                Next time if Abrar pay the bill he will add positive Rs. 20 and negative
                10 to the others account. Now the balance is Bilal: 10, Abid: -20, Abrar:10.
                <br></br>
                Next time if Abid pay the bill he will repeat the procedure. The balance will
                be Bilal: 0, Abid: 0, Abrar: 0.
                <br></br>
                The goal is to clear your negative balance and utilizing the positive balance.
                You are good to go now. Have fun! 
                </em>
              </h4>
              <footer>I hope you won't have issues using <cite title="Source Title">Payment Hisab</cite></footer>
            </blockquote>
          </div>
        </div>
        </div>

        <FeedList items={this.state.items} onPay={this.onPay} />

      </div>
    );
  }

});

module.exports = Feed;
