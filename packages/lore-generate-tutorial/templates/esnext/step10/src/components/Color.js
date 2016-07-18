import React from 'react';
import { Link } from 'react-router';

class Color extends React.Component {

  static propTypes = {
    color: React.PropTypes.object.isRequired
  };

  render () {
    const color = this.props.color;

    return (
      <Link
        to={'/colors/' + color.id}
        className="list-group-item"
        activeClassName="active">
        {color.data.name}
      </Link>
    );
  }

}

export default Color;
