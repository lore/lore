var React = require('react');
var MarkdownElement = require('../_common/MarkdownElement').default;
import { parse } from 'react-docgen';

module.exports = React.createClass({
  displayName: 'CodeExample',

  propTypes: {
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    code: React.PropTypes.string.isRequired,
  },

  getDefaultProps: function() {
    return {
      description: ''
    }
  },

  getInitialState: function() {
    return {
      isExpanded: false
    }
  },

  onToggle: function() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  },

  render: function() {
    var { code } = this.props;

    var text = `\`\`\`js
${code}
    \`\`\``;

    var styles = {
      button: {
        position: 'absolute',
        top: '16px',
        right: '16px'
      }
    };

    const docs = parse(code) || {};

    return (
      <div className="card form-card">
        <div className="card-block">
          <h4 className="card-title">
            {this.props.title}
          </h4>
          <p className="card-text">
            {this.props.description || docs.description}
          </p>
          <button className="btn btn-primary" onClick={this.onToggle} style={styles.button}>
            {this.state.isExpanded ? "Close" : "Show Code"}
          </button>
          {this.state.isExpanded ? (
            <MarkdownElement text={text} />
          ) : null}
          {this.props.children}
        </div>
      </div>
    );
  }

});
