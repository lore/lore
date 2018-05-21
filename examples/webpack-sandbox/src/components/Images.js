import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import svg from '../../assets/images/react.svg';
import png from '../../assets/images/react.png';
import jpg from '../../assets/images/react.jpg';
import jpeg from '../../assets/images/react.jpeg';
import gif from '../../assets/images/check.gif';
import bmp from '../../assets/images/react.bmp';

export default createReactClass({
  displayName: 'Images',

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
      image: {
        width: '32px'
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
    const styles = this.getStyles();

    return (
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.title}>
            Images
          </div>
          <p>
            For a comparison of which browsers support which image formats,
            <a href="https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support">see this link</a>
          </p>
          <p>
            The image formats supported by all major browsers are PNG, JPG/JPEG, GIF, SVG and BMP.
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
                <img src={png} style={styles.image} />
              </td>
              <td>png</td>
              <td>
                <a href="https://worldvectorlogo.com/logo/react">image source</a>
              </td>
            </tr>
            <tr>
              <td>
                <img src={jpg} style={styles.image} />
              </td>
              <td>jpg/jpeg</td>
              <td>
                <a href="https://worldvectorlogo.com/logo/react">image source</a>
              </td>
            </tr>
            <tr>
              <td>
                <img src={gif} style={styles.image} />
              </td>
              <td>gif</td>
              <td>
                <a href="https://dribbble.com/shots/2182807-Checkbox">image source</a>
              </td>
            </tr>
            <tr>
              <td>
                <img src={svg} style={styles.image} />
              </td>
              <td>svg</td>
              <td>
                <a href="https://worldvectorlogo.com/logo/react">image source</a>
              </td>
            </tr>
            <tr>
              <td>
                <img src={bmp} style={styles.image} />
              </td>
              <td>bmp</td>
              <td>
                <a href="https://worldvectorlogo.com/logo/react">image source</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});
