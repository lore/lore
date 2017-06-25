var React = require('react');
import ReactSpinner from 'react-spinjs';

module.exports = React.createClass({
  displayName: 'Spinner',

  propTypes: {
    display: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
  },

  getDefaultProps: function() {
    return {
      display: function(props) {
        return true;
      }
    }
  },

  render: function () {
    // var styles = this.getStyles();
    var display = this.props.display(this.props);
    var other = _.omit(this.props, ['children', 'display']);

    var opts = {
      lines: 13, // The number of lines to draw
      length: 28, // The length of each line
      width: 14, // The line thickness
      radius: 42, // The radius of the inner circle
      scale: 1, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      color: '#555', // #rgb or #rrggbb or array of colors
      opacity: 0.25, // Opacity of the lines
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      className: 'spinner', // The CSS class to assign to the spinner
      top: '50%', // Top position relative to parent
      left: '50%', // Left position relative to parent
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      position: 'absolute' // Element positioning
    };

    var opts2 = _.extend({}, opts, {
      scale: 0.5,
      lines: 12, // The number of lines to draw,
      radius: 36, // The radius of the inner circle
    });

    // opts = {
    //   lines: 12, // The number of lines to draw
    //   length: 7, // The length of each line
    //   width: 5, // The line thickness
    //   radius: 10, // The radius of the inner circle
    //   color: '#000', // #rbg or #rrggbb
    //   speed: 1, // Rounds per second
    //   trail: 100, // Afterglow percentage
    //   shadow: true // Whether to render a shadow
    // };

    // return (
    //   <ReactSpinner config={opts} />
    // );

    // return (
    //   <ReactSpinner config={opts2} />
    // );

    if (display) {
      // return (
      //   <div style={styles.container}>
      //     <ReactSpinner config={opts} />
      //   </div>
      // );

      return (
        <ReactSpinner config={opts2} />
      );
    }

    return React.cloneElement(this.props.children, other);
  }

});
