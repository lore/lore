/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 **/

var React = require('react');
var Header = require('./Header');

module.exports = React.createClass({
  displayName: 'Layout',

  render: function() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              {React.cloneElement(this.props.children)}
            </div>
          </div>
        </div>
      </div>
    );
  }

});
