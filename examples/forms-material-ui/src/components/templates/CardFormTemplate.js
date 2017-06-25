var React = require('react');
var mui = require('material-ui');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');

// Hook Dialogs
var Overlay = require('../common/Overlay');
// var Template = require('../../../hooks/lore-hook-forms-material-ui/Template');
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
        <mui.Card className="form-card">
          <mui.CardTitle
            title="Hook Form"
            subtitle="Created by providing a config to the forms hook" />
          <div>
            {this.getForm(config)}
          </div>
        </mui.Card>
      </Overlay>
    );
  }
});
