import React from 'react';
import PropTypes from 'prop-types';
import { useDialog } from '@lore/dialogs';
import UpdateTweetDialog from '../dialogs/UpdateTweetDialog';

EditLink.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default function EditLink(props) {
  const { tweet } = props;

  const show = useDialog();

  function onClick() {
    show(
      <UpdateTweetDialog tweet={tweet} />
    );
  }

  return (
    <a className="link" onClick={onClick}>
      edit
    </a>
  );
}
