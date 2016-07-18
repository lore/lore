import React, { Component, PropTypes } from 'react';

class <%= componentName %> extends Component {

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

<%= componentName %>.propTypes = {
  //models: React.PropTypes.object.isRequired
};

export default lore.connect((getState, props) => {
  return {
    //models: getState('model.find')
  };
})(<%= componentName %>);
