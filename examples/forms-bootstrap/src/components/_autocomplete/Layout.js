var React = require('react');
var CodeExample = require('../_common/CodeExample');
var ExampleSimple = require('./ExampleSimple');
var ExampleSimpleCode = require('!raw-loader!./ExampleSimple');
var ExampleSimpleTweet = require('./ExampleSimpleTweet');
var ExampleSimpleTweetCode = require('!raw-loader!./ExampleSimpleTweet');
var ExampleFilter = require('./ExampleFilter');
var ExampleFilterCode = require('!raw-loader!./ExampleFilter');
var ExampleFilterTweet = require('./ExampleFilterTweet');
var ExampleFilterTweetCode = require('!raw-loader!./ExampleFilterTweet');
var ExampleAjax = require('./ExampleAjax');
var ExampleAjaxCode = require('!raw-loader!./ExampleAjax');
var ExampleAjaxTweet = require('./ExampleAjaxTweet');
var ExampleAjaxTweetCode = require('!raw-loader!./ExampleAjaxTweet');
var ExampleInitialValue = require('./ExampleInitialValue');
var ExampleInitialValueCode = require('!raw-loader!./ExampleInitialValue');
var ExampleAjaxInitialValue = require('./ExampleAjaxInitialValue');
var ExampleAjaxInitialValueCode = require('!raw-loader!./ExampleAjaxInitialValue');
var ExampleValidation = require('./ExampleValidation');
var ExampleValidationCode = require('!raw-loader!./ExampleValidation');

module.exports = React.createClass({
  displayName: 'Layout',

  render: function() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="text-center">
            AutoComplete Field
          </h2>
          <br/>
          <CodeExample
            title="Simple (User)"
            code={ExampleSimpleCode}
          >
            <ExampleSimple />
          </CodeExample>
          <br/>
          <CodeExample
            title="Simple (Tweet)"
            code={ExampleSimpleTweetCode}
          >
            <ExampleSimpleTweet />
          </CodeExample>
          <br/>
          <CodeExample
            title="Filter (User)"
            code={ExampleFilterCode}
          >
            <ExampleFilter />
          </CodeExample>
          <br/>
          <CodeExample
            title="Filter (Tweet)"
            code={ExampleFilterTweetCode}
          >
            <ExampleFilterTweet />
          </CodeExample>
          <br/>
          <CodeExample
            title="Ajax (User)"
            code={ExampleAjaxCode}
          >
            <ExampleAjax />
          </CodeExample>
          <br/>
          <CodeExample
            title="Ajax (Tweet)"
            code={ExampleAjaxTweetCode}
          >
            <ExampleAjaxTweet />
          </CodeExample>
          <br/>
          <CodeExample
            title="Initial Value (User)"
            code={ExampleInitialValueCode}
          >
            <ExampleInitialValue />
          </CodeExample>
          <br/>
          <CodeExample
            title="Ajax Initial Value (User)"
            code={ExampleAjaxInitialValueCode}
          >
            <ExampleAjaxInitialValue />
          </CodeExample>
          <br/>
          <CodeExample
            title="Validation (User)"
            code={ExampleValidationCode}
          >
            <ExampleValidation />
          </CodeExample>
        </div>
      </div>
    );
  }

});
