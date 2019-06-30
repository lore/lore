import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import DialogContext from './DialogContext';

DialogProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function DialogProvider(props) {
  const {
    domElementId: _domElementId,
    templates,
    defaultTemplate,
    children
  } = props;

  const [dialog, setDialog] = useState(null);
  const dialogKey = useRef(0);
  const [domElementId, setDomElementId] = useState(_domElementId || 'dialog');
  const [template, setTemplate] = useState(defaultTemplate  || 'default');

  const Dialog = templates[template];

  function show(dialog, options = {}) {
    const { domElementId, template } = options;
    setDialog(dialog);
    dialogKey.current = dialogKey.current + 1;
    domElementId && setDomElementId(domElementId);
    setTemplate(template || defaultTemplate);
  }

  return (
    <DialogContext.Provider value={show}>
      {dialog ? (
        ReactDOM.createPortal((
          <Dialog key={dialogKey.current}>
            {dialog}
          </Dialog>
        ), document.getElementById(domElementId))
      ) : null}
      {children}
    </DialogContext.Provider>
  );
}

export default DialogProvider;
