import React from 'react';
import PropTypes from 'prop-types';

export default function CreateButton(props) {
  function onClick() {
    console.log('Create tweet!');
  }

  return (
    <button
      type="button"
      className="btn btn-primary btn-lg create-button"
      onClick={onClick}>
      +
    </button>
  );
}
