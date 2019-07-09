/**
 * Configuration file for dialog
 *
 * This file is where you define overrides for the default dialog behaviors.
 */

import { getConfig } from '@lore/dialogs';
import Dialog from '../src/dialogs/Dialog';

export default getConfig({

  /**
   * DOM Element ID that the dialogs should be mounted to. Should be located
   * outside the DOM element the application is mounted to.
   */

  // domElementId: 'dialog',

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

  // defaultTemplate: 'default'

})
