var React = require('react');

module.exports = React.createClass({
  displayName: 'Styles',

  getStyles: function() {
    return {
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
            Styles
          </div>
          <p>
            CSS preprocessors supported by default.
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
                <i className="fa fa-check-css fa-fw"></i>
              </td>
              <td>CSS</td>
              <td>
                n/a
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-check-less fa-fw"></i>
              </td>
              <td>LESS</td>
              <td>
                n/a
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-check-sass fa-fw"></i>
              </td>
              <td>SASS/SCSS</td>
              <td>
                n/a
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});
