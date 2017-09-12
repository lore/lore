var React = require('react');
var mui = require('material-ui');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');
var moment = require('moment');

// Hook Dialogs
// var withMuiTheme = require('../../decorators/withMuiTheme').default;
var validators = require('../../utils/validators');
// var Template = require('../../../hooks/lore-hook-forms-material-ui/Template');
var Overlay = require('../common/Overlay');

var Form = require('lore-react-forms').Form;
var FormSection = require('lore-react-forms').FormSection;
var PropBarrier = require('lore-react-forms').PropBarrier;

var TextField = require('lore-react-forms-material-ui').TextField;
var AutoCompleteField = require('lore-react-forms-material-ui').AutoCompleteField;
var Connect = require('../Connect');

module.exports = React.createClass({
  displayName: 'CreateCard.form',

  getInitialState: function() {
    return {
      tweet: null,
      userId: null,
      text: ''
    }
  },

  componentWillReceiveProps: function (nextProps) {
    var tweet = this.state.tweet;

    if (!tweet) {
      return;
    }

    var nextTweet = lore.store.getState().tweet.byCid[tweet.cid];

    if (nextTweet.state === PayloadStates.RESOLVED) {
      this.setState({
        tweet: null
      })
    } else {
      this.setState({
        tweet: nextTweet
      })
    }
  },

  onSubmit: function() {
    var params = _.omit(this.state, ['tweet']);
    var action = lore.actions.tweet.create(_.extend({
      createdAt: moment().unix()
    }, params));
    this.setState({
      tweet: action.payload
    });
  },

  getOptions: function(getState, props) {
    return {
      options: getState('user.find')
    }
  },

  onChange: function(name, value) {
    var state = {};
    state[name] = value;
    this.setState(state);
  },

  getValidators: function(data) {
    return {
      text: [validators.isRequired],
      userId: [validators.number.isRequired]
    }
  },

  getForm: function() {
    var data = _.omit(this.state, ['tweet']);
    var validators = this.getValidators(data);

    return (
      <Form
        data={data}
        validators={validators}
        onChange={this.onChange}>
        {(form) => (
          <FormSection>
            <FormSection className="mui-card-text">
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <TextField
                    label="Text"
                    name="text"
                    multiLine={true}
                  />
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <Connect callback={this.getOptions}>
                    <AutoCompleteField
                      label="User"
                      name="userId"
                      field="username"
                    />
                  </Connect>
                </FormSection>
              </FormSection>
            </FormSection>
            <FormSection className="mui-card-actions">
              <PropBarrier>
                <mui.FlatButton
                  label="Save"
                  primary={true}
                  onTouchTap={this.onSubmit}
                />
              </PropBarrier>
            </FormSection>
          </FormSection>
        )}
      </Form>
    );
  },

  render: function() {
    var tweet = this.state.tweet;

    return (
      <Overlay model={tweet}>
        <mui.Card className="form-card">
          <mui.CardTitle
            title="Component Form"
            subtitle="Created by manually building the form using React components" />
          {this.getForm()}
        </mui.Card>
      </Overlay>
    );
  }

});
