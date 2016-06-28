var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var SvgIcons = require('material-ui/svg-icons');

module.exports = Router.withRouter(React.createClass({
  displayName: 'Header',

  _onLeftIconButtonTouchTap: function() {
    this.props.router.push('/');
  },

  render: function() {
    var title = "Lore Example: Dialogs & Querying";

    var logoIcon = (
      <mui.IconButton onTouchTap={this._onLeftIconButtonTouchTap}>
        <SvgIcons.ActionHome />
      </mui.IconButton>
    );

    return (
      <mui.AppBar
        title={title}
        iconElementLeft={logoIcon} />
    );
  }
}));
