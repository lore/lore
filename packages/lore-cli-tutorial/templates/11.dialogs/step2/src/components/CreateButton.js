import React from 'react';
import PropTypes from 'prop-types';
import { useDialog } from '@lore/dialogs';

export default function CreateButton(props) {
  const show = useDialog();

  function onClick() {
    show(
      <h1>Dialog Placeholder</h1>
    );
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
