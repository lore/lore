import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useActions } from '@lore/actions';

UpdateTweetDialog.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default function UpdateTweetDialog(props) {
  const { dismiss, tweet } = props;

  const [data, setData] = useState({
    text: tweet.data.text
  });

  const actions = useActions();

  function request(data) {
    actions.tweet.update(tweet, data);
  }

  function onSubmit() {
    request(data);
    dismiss();
  }

  function onChange(name, value) {
    const nextData = _.cloneDeep(data);
    nextData[name] = value;
    setData(nextData);
  }

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" onClick={dismiss}>
            <span>&times;</span>
          </button>
          <h4 className="modal-title">
            Update Tweet
          </h4>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={data.text}
                  placeholder="What's happening?"
                  onChange={(event) => {
                    onChange('text', event.target.value)
                  }}
                />
              </div>
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
                disabled={!data.text}
                onClick={onSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
