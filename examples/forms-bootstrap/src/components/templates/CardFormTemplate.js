var React = require('react');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');

// Hook Dialogs
var Overlay = require('../common/Overlay');
var Template = require('./Template');

module.exports = React.createClass({
  displayName: 'CardFormTemplate',

  propTypes: {
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string.isRequired,
    model: React.PropTypes.object,
    config: React.PropTypes.object
  },

  getForm: function(config) {
    return React.createElement(Template, config);
  },

  render: function() {
    var title = this.props.title;
    var subtitle = this.props.subtitle;
    var model = this.props.model;
    var config = this.props.config || _.omit(this.props, ['title', 'subtitle', 'model']);

    return (
      <Overlay model={model}>
        <div className="card form-card">
          <div className="card-block">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{subtitle}</p>
            {this.getForm(config)}
          </div>
        </div>
      </Overlay>
    );
  }
});
