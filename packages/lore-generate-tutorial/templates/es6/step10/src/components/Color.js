import React from 'react';
import { Link } from 'react-router';

class Color extends React.Component {

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

Color.propTypes = {
  color: React.PropTypes.object.isRequired
};

export default Color;
