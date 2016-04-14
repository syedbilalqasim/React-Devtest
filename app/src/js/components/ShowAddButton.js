/** @jsx React.DOM */

var React = require('react');

var ShowAddButton = React.createClass({

  render: function() {

    var classString, buttonText;

    if(this.props.displayed) {
      classString = 'btn btn-default btn-block';
      buttonText = 'Cancel';
    } else {
      classString = 'btn btn-success btn-block';
      buttonText = 'Add New Friend';
    }

    return (
      <button className={classString}
              onClick={this.props.onToggleForm}>
              {buttonText}
      </button>
    );
  }

});

module.exports = ShowAddButton;
