import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function Dialog(props) {
  const modalRef = useRef(null);

  useEffect(() => {
    show();
  }, []);

  function show() {
    $(modalRef.current).modal('show');
  }

  function dismiss() {
    $(modalRef.current).modal('hide');
  }

  return (
    <div ref={modalRef} className="modal fade">
      {React.cloneElement(props.children, {
        dismiss: dismiss
      })}
    </div>
  );
}
