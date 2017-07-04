import React from 'react';
import DialogContainerGenerator from './DialogContainer';
import domHelper from './domHelper';

export default function(lore) {
  const DialogContainer = DialogContainerGenerator(lore);

  return {

    show: function(getDialog, cb) {
      const dialog = getDialog();

      if (!dialog) {
        throw new Error('getDialog() did not return a dialog');
      }

      // Figure out where we should be mounting the dialog on the DOM
      const domElementId = lore.config.dialog.domElementId;

      // Wrap the dialog with Provider, so it has access to history and store
      // if it needs it.  Store needs to be in context in order for 'connect'
      // to function.  History needs to be in context in case the dialog needs to
      // examine the url path of the application or cause redirects based on
      // user actions
      const dialogContainer = React.createElement(
        DialogContainer, {
          dialog: dialog
        }
      );

      // Find the proper DOM element and mount the dialog to it
      domHelper.renderComponentToDomElementWithId(domElementId, dialogContainer, cb);
    }

  };
}
