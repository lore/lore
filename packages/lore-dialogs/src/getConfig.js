/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import Dialog from './Dialog';

export function getConfig(configOverride) {
  return _.merge({

    /**
     * DOM Element ID that the dialogs should be mounted to. Should be located
     * outside the DOM element the application is mounted to.
     */

    domElementId: 'dialog',

    /**
     * The different types of dialogs that can be shown, each containing the logic
     * to show and hide a dialog. You can extend this set to includes alerts, full-screen
     * dialogs, scrollable dialogs, modal dialogs, etc.
     */

    templates: {
      default: Dialog
    },

    /**
     * The default template that should be used
     */

    defaultTemplate: 'default'

  }, configOverride);
}
