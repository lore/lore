var React = require('react');

module.exports = {

  propTypes: {
    onSubmit: React.PropTypes.func
  },

  getDefaultProps: function(){
    return {
      onSubmit: function(){}
    }
  },

  getInitialState: function(){
    return {
      isOpen: false
    }
  },

  /**
   * Have the dialog open after we mount the component to make sure
   * we see the opening transition - if we don't do this, it will
   * immediately snap into view on the screen (without a gentle transition)
   */
  componentDidMount: function() {
    this.setState({
      isOpen: true
    });
    if (this.focus) {
      this.focus();
    }
  },

  dismiss: function() {
    this.setState({
      isOpen: false
    });
  }

  /**
   * Define a focus function if something should come into focus
   * after the dialog mounts
   */
  // focus: function() {}

};
