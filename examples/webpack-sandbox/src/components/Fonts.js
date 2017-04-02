var React = require('react');

module.exports = React.createClass({
  displayName: 'Fonts',

  getStyles: function() {
    return {
      eot: {
        fontFamily: 'FontAwesome-eot'
      },
      woff2: {
        fontFamily: 'FontAwesome-woff2'
      },
      woff: {
        fontFamily: 'FontAwesome-woff'
      },
      ttf: {
        fontFamily: 'FontAwesome-ttf'
      },
      svg: {
        fontFamily: 'FontAwesome-svg'
      },
      otf: {
        fontFamily: 'FontAwesome-otf'
      },
      card: {
        boxShadow: '0px 2px 7px 0px rgba(0, 0, 0, 0.3)',
        padding: '8px 16px'
      },
      table: {
        marginBottom: '0px',
        fontSize: '14px'
      },
      title: {
        paddingTop: '8px',
        paddingBottom: '8px',
        color: '#777',
        textAlign: 'left',
        fontSize: '24px'
      },
      header: {
        paddingBottom: '16px'
      }
    }
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.title}>
            Fonts
          </div>
          <p>
            For a StackOverflow discussion on font types, <a href="http://stackoverflow.com/questions/11002820/why-should-we-include-ttf-eot-woff-svg-in-a-font-face">see this link</a>
          </p>
        </div>
        <table className="table" style={styles.table}>
          <thead>
            <tr>
              <th>Valid</th>
              <th>Type</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <i className="fa fa-check fa-fw" style={styles.eot}></i>
              </td>
              <td>eot</td>
              <td>
                Only works in IE, <a href="http://caniuse.com/#feat=eot">link</a>
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-check fa-fw" style={styles.woff2}></i>
              </td>
              <td>woff2</td>
              <td>
                Works in most browsers, <a href="http://caniuse.com/#feat=woff2">link</a>
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-check fa-fw" style={styles.woff}></i>
              </td>
              <td>woff</td>
              <td>
                Works in all browsers, <a href="http://caniuse.com/#feat=woff">link</a>
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-check fa-fw" style={styles.ttf}></i>
              </td>
              <td>ttf</td>
              <td>
                Works in all browsers, <a href="http://caniuse.com/#feat=ttf">link</a>
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-check fa-fw" style={styles.svg}></i>
              </td>
              <td>svg</td>
              <td>
                Deprecated with support being removed from browsers, <a href="http://caniuse.com/#feat=svg-fonts">link</a>
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-check fa-fw" style={styles.otf}></i>
              </td>
              <td>otf</td>
              <td>
                Works in all browsers, <a href="http://caniuse.com/#feat=ttf">link</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});
