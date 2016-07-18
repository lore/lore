import React, { Component, PropTypes } from 'react';

@lore.connect((getState, props) => {
  return {
    //models: getState('model.find')
  };
})
class <%= componentName %> extends Component {

  static propTypes = {
    //models: React.PropTypes.object.isRequired
  };
  
  constructor(props) {
    super(props);

    // Set your initial state here
    // this.setState = {};

    // Bind your custom methods so you can access the expected 'this'
    // this.myCustomMethod = this.myCustomMethod.bind(this);
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default <%= componentName %>;
