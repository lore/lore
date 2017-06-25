var React = require('react');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');
var moment = require('moment');

// Hook Dialogs
var validators = require('../../utils/validators');
var Overlay = require('../common/Overlay');

var Form = require('lore-react-forms/Form');
var FormSection = require('lore-react-forms/FormSection');
var PropBarrier = require('lore-react-forms/PropBarrier');

var TextField = require('lore-react-forms-bootstrap/TextField');
var AutoCompleteField = require('lore-react-forms-bootstrap/AutoCompleteField');
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
    var data = this.state;
    var validators = this.getValidators(data);

    return (
      <Form
        data={data}
        validators={validators}
        onChange={this.onChange}>
        {(form) => (
          <FormSection>
            <FormSection>
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
            <FormSection className="actions-container">
              <PropBarrier>
                <button className="btn btn-primary" onClick={this.onSubmit}>
                  Save
                </button>
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
        <div className="card form-card">
          <div className="card-block">
            <h4 className="card-title">Component Form</h4>
            <p className="card-text">Created by manually building the form using React components</p>
            {this.getForm()}
          </div>
        </div>
      </Overlay>
    );
  }

});
