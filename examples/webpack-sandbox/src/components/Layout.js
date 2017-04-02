/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 **/

var React = require('react');
var Header = require('./Header');
var Fonts = require('./Fonts');
var Images = require('./Images');
var Styles = require('./Styles');

module.exports = React.createClass({
  displayName: 'Layout',

  getStyles: function() {
    return {
      container: {
        paddingBottom: '64px'
      }
    }
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div>
        <Header />
        <div className="container" style={styles.container}>
          <div className="row">
            <div className="col-md-offset-2 col-md-8">
              <Fonts />
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-offset-2 col-md-8">
              <Images />
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-offset-2 col-md-8">
              <Styles />
            </div>
          </div>
        </div>
      </div>
    );
  }

});
