var React = require('react');
var Header = require('./Header');
var ColorCreator = require('./ColorCreator');

module.exports = React.createClass({
  displayName: 'Layout',

  render: function() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <ColorCreator/>
            </div>
            <div className="col-md-offset-1 col-md-7">
              {/* Guessatron's result will go here */}
            </div>
          </div>
        </div>
      </div>
    );
  }

});
