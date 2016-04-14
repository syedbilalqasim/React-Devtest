/** @jsx React.DOM */

var React = require('react');

var FeedItem = React.createClass({
  pay: function(newCount){
    this.props.onPay({
      key: this.props.key,
      title: this.props.title,
      description: this.props.desc,
      havepay: newCount
    });
  },

  Up: function() {
    var count = parseInt(this.props.havepay, 10);
    var newCount = count + 10;
    this.pay(newCount);
  },

  Down: function() {
    var count = parseInt(this.props.havepay, 10);
    var newCount = count - 10;
    this.pay(newCount);
  },

  render: function() {

    var positiveNegativeClassName = this.props.havepay >= 0 ?
                                    'badge badge-success' :
                                    'badge badge-danger';

    return (
      <li key={this.props.key} className="list-group-item">
        <span className={positiveNegativeClassName}>{this.props.havepay}</span>
        <h4>{this.props.title}</h4>
        <span>{this.props.desc}</span>
        <span className="pull-right">
          <button id="up" className="btn btn-sm btn-primary" onClick={this.Up}>&uarr;</button>
          <button id="down" className="btn btn-sm btn-primary" onClick={this.Down}>&darr;</button>
        </span>
      </li>
    );
  }

});

module.exports = FeedItem;
