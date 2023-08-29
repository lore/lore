import React from 'react';
import PropTypes from 'prop-types';
import { useDialog } from '@lore/dialogs';
import DeleteTweetDialog from '../dialogs/DeleteTweetDialog';

DeleteLink.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default function DeleteLink(props) {
  const { tweet } = props;

  const show = useDialog();

  function onClick() {
    show(
      <DeleteTweetDialog tweet={tweet} />
    );
  }

  return (
    <a className="link" onClick={onClick}>
      delete
    </a>
  );
}
