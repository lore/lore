import React from 'react';

class Color extends React.Component {

  static propTypes = {
    color: React.PropTypes.object.isRequired
  };

  render () {
    const color = this.props.color;

    return (
      <a className="list-group-item">
        {color.data.name}
      </a>
    );
  }

}

export default Color;
