import React from 'react';
import PropTypes from 'prop-types';
import { useDialog } from '@lore/dialogs';
import CreateTweetDialog from '../dialogs/CreateTweetDialog';

export default function CreateButton(props) {
  const show = useDialog();

  function onClick() {
    show(
      <CreateTweetDialog />
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
