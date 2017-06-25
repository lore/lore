var React = require('react');
var mui = require('material-ui');
var PayloadStates = require('../../constants/PayloadStates');

module.exports = React.createClass({
  displayName: 'Overlay',

  propTypes: {
    model: React.PropTypes.object
  },

  isSaving: function() {
    var model = this.props.model;
    return (
      model.state === PayloadStates.FETCHING ||
      model.state === PayloadStates.UPDATING ||
      model.state === PayloadStates.CREATING
    );
  },

  render: function() {
    var model = this.props.model;
    var isSaving = model ? this.isSaving() : null;
    // isSaving = true;

    return (
      <div className={"form-overlay" + (isSaving ? " saving" : "")}>
        <div className="overlay-label">
          <mui.CircularProgress />
        </div>
        <div className="form-overlay-content">
          {React.cloneElement(this.props.children)}
        </div>
      </div>
    );
  }

});
