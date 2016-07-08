var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
  displayName: 'PaginationLink',

  propTypes: {
    page: React.PropTypes.number,
    text: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool
  },

  onClick: function(e) {
    e.preventDefault();
    this.props.onNavigate(this.props.page);
  },

  render: function() {
    var page = this.props.page;
    var text = this.props.text || page;
    var isDisabled = this.props.isDisabled;
    var isActive = this.props.isActive;

    if(isDisabled) {
      return (
        <li className="disabled">
          <a>
            <span dangerouslySetInnerHTML={{__html: text}} />
          </a>
        </li>
      );
    }

    if(isActive) {
      return(
        <li className="active">
          <a>
            <span dangerouslySetInnerHTML={{__html: text}} />
          </a>
        </li>
      );
    }

    return (
      <li>
        <Router.Link to={{ pathname: '/', query: { page: page } }} onClick={this.onClick}>
          <span dangerouslySetInnerHTML={{__html: text}} />
        </Router.Link>
      </li>
    );
  }

});
