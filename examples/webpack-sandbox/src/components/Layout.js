/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 **/

import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Header from './Header';
import Fonts from './Fonts';
import Images from './Images';
import Styles from './Styles';

module.exports = createReactClass({
  displayName: 'Layout',

  getStyles: function() {
    return {
      container: {
        paddingBottom: '64px'
      }
    }
  },

  render: function() {
    const styles = this.getStyles();

    return (
      <div>
        <Header />
        <div className="container" style={styles.container}>
          <div className="row">
            <div className="col-md-offset-2 col-md-8">
              <Fonts />
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-offset-2 col-md-8">
              <Images />
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-offset-2 col-md-8">
              <Styles />
            </div>
          </div>
        </div>
      </div>
    );
  }

});
