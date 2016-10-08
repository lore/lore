var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  displayName: 'CreateDialog',

  propTypes: {
    onSubmit: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      text: ''
    }
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
    this.props.onSubmit(this.state);
  },

  onTextChanged: function(event) {
    this.setState({
      text: event.target.value
    })
  },

  render: function () {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
              <h4 className="modal-title">
                Create Tweet
              </h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="control-label">
                    Message
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    rows="3"
                    value={this.state.text}
                    placeholder={"What's happening?"}
                    onChange={this.onTextChanged} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={this.onSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
