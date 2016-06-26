import React from 'react';

class Color extends React.Component {

  render () {
    const color = this.props.color;

    return (
      <a className="list-group-item">
        {color.data.name}
      </a>
    );
  }

}

Color.propTypes = {
  color: React.PropTypes.object.isRequired
};

export default Color;
