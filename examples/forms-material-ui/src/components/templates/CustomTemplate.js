var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
var logo = require('../../../assets/images/logo.png');

// react-form
var Form = require('lore-react-forms/Form');
var FormSection = require('lore-react-forms/FormSection');
var PropBarrier = require('lore-react-forms/PropBarrier');

var Template = require('./Template');
var Overlay = require('../common/Overlay');

var Header = React.createClass({
  displayName: 'Header',

  propTypes: {
    label: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <div className="header">
        <img src={logo} />
        <h3>
          {this.props.label}
        </h3>
      </div>
    );
  }
});

var Footer = React.createClass({
  displayName: 'Footer',

  propTypes: {
    children: React.PropTypes.node.isRequired
  },

  render: function () {
    return (
      <div className="footer">
        {this.props.children}
      </div>
    );
  }
});

module.exports = React.createClass({
  displayName: 'CustomTemplate',

  propTypes: {
    title: React.PropTypes.string.isRequired,
    footer: React.PropTypes.node.isRequired,
    model: React.PropTypes.object,
    config: React.PropTypes.object
  },

  getForm: function(config) {
    return React.createElement(Template, config);
  },

  render: function() {
    var title = this.props.title;
    var footer = this.props.footer;
    var model = this.props.model;
    var config = this.props.config || _.omit(this.props, ['title', 'subtitle', 'model']);

    return (
      <Overlay model={model}>
        <mui.Card className="form-card custom-form-card">
          <Header label={title} />
          {this.getForm(config)}
          <Footer>
            {footer}
          </Footer>
        </mui.Card>
      </Overlay>
    );
  }
});
