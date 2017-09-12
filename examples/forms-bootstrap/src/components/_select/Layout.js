var React = require('react');
var CodeExample = require('../_common/CodeExample');
var ExampleSimple = require('./ExampleSimple');
var ExampleSimpleCode = require('!raw-loader!./ExampleSimple');

module.exports = React.createClass({
  displayName: 'Layout',

  render: function() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="text-center">
            Select Field
          </h2>
          <br/>
          <CodeExample
            title="Simple (User)"
            code={ExampleSimpleCode}
          >
            <ExampleSimple />
          </CodeExample>
          {/*<br/>*/}
          {/*<CodeExample*/}
            {/*title="Validation (User)"*/}
            {/*code={ExampleValidationCode}*/}
          {/*>*/}
            {/*<ExampleValidation />*/}
          {/*</CodeExample>*/}
        </div>
      </div>
    );
  }

});
