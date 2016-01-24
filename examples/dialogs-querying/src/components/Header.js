var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var SvgIcons = require('material-ui/lib/svg-icons');

module.exports = React.createClass({
  displayName: 'Header',

  mixins: [Router.History],

  propTypes: {
    children: React.PropTypes.any
  },

  getStyles: function() {
    return {
      appBar: {
        position: 'fixed'
      }
    }
  },

  _onLeftIconButtonTouchTap: function() {
    this.history.push('/');
  },

  render: function() {
    var styles = this.getStyles();
    var title = "Lore Example: Dialogs & Querying";

    var logoIcon = (
      <mui.IconButton onTouchTap={this._onLeftIconButtonTouchTap}>
        <SvgIcons.ActionHome />
      </mui.IconButton>
    );

    return (
      <div>
        <mui.AppBar
          style={styles.appBar}
          zDepth={1}
          title={title}
          iconElementLeft={logoIcon} />
      </div>
    );
  }
});
