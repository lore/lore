import React, { Component, PropTypes } from 'react';

/**
 * IMPORTANT!!
 *
 * The template for ES7 components does not currently support react-router integration.
 * This template will be updated as soon a solution is in place.
 */
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

<%= componentName %>.propTypes = {};

// NOTE: Please see https://github.com/lore/lore/issues/71 for a discussion
// about why this template is not yet using the ES6 'export' syntax.
module.exports = <%= componentName %>;
