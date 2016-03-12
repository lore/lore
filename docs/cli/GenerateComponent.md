## Component Generator

Documentation for the `lore generate:component` command.

```sh
lore generate:component Header
```

{% tabs tab1="ES5", tab2="ES6" %}
{% tab1 %}
```js
var React = require('react');

module.exports = React.createClass({
  displayName: 'Header',

  propTypes: {},

  render: function () {
    return (
      <div></div>
    );
  }
});
```
{% tab2 %}
```js
import React, { Component, PropTypes } from 'react';

class Header extends Component {

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

Header.propTypes = {};

// NOTE: Please see https://github.com/lore/lore/issues/71 for a discussion
// about why this template is not yet using the ES6 'export' syntax.
module.exports = Header;
```
{% endtabs %}

```sh
lore generate:component Header --connect
```

**TODO: Add connect template**

```sh
lore generate:component Header --router
```

**TODO: Add router template**
