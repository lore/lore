import React from 'react';
import Header from './Header';

class Layout extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              {/* Color creator will go here */}
            </div>
            <div className="col-md-offset-1 col-md-7">
              {/* Guessatron's result will go here */}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Layout;
