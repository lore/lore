var React = require('react');
var DialogMixin = require('../mixins/DialogMixin');

module.exports = function(options) {
  options = options || {};

  var title = options.title;
  var cancelButtonText = options.cancelButtonText;
  var submitButtonText = options.submitButtonText;

  return React.createClass({
    displayName: 'Dialog',

    mixins: [DialogMixin],

    propTypes: {
      model: React.PropTypes.object.isRequired
    },

    getStyles: function() {
      return {
        form: {
          marginTop: '14px'
        }
      }
    },

    render: function () {
      var styles = this.getStyles();

      return (
        <div className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
                <h4 className="modal-title">
                  {title}
                </h4>
              </div>
              <div className="modal-body">
                <form style={styles.form}>
                  <p>Are you sure you want to delete this?</p>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  {cancelButtonText}
                </button>
                <button type="button" className="btn btn-primary" onClick={this.onSubmit}>
                  {submitButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
};
