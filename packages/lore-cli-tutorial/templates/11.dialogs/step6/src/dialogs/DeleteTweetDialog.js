import React from 'react';
import PropTypes from 'prop-types';
import { useActions } from '@lore/actions';

DeleteTweetDialog.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default function DeleteTweetDialog(props) {
  const { dismiss, tweet } = props;

  const actions = useActions();

  function request() {
    actions.tweet.destroy(tweet);
  }

  function onSubmit() {
    request();
    dismiss();
  }

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" onClick={dismiss}>
            <span>&times;</span>
          </button>
          <h4 className="modal-title">
            Delete Tweet
          </h4>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-12">
              <p>
                Are you sure you want to delete this?
              </p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="row">
            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-default"
                onClick={dismiss}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
