import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';

export default {

  propTypes: {
    onSubmit: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    this.show();
  },

  show: function() {
    var node = ReactDOM.findDOMNode(this);
    $(node).modal('show');
  },

  dismiss: function() {
    var node = ReactDOM.findDOMNode(this);
    $(node).modal('hide');
  },

  onSubmit: function() {
    this.dismiss();
    this.props.onSubmit(this.state || {});
  }

};
