/*
 * This is a utility file to help detect whether the browser the application is running in
 * provides access to localStorage. This file is necessary because while all modern browsers
 * support it, there are edge cases where they chose not to (such as "Private Browsing Mode"
 * in Safari) and attempting to access localStorage in those situations will cause the application
 * to crash.
 *
 * This file attempts to run that detection in a safe way, and returns true or false based
 * on whether the application has permission to access localStorage.
 *
 * The code is copied directly from here, see link for discussion:
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 */

export default function storageAvailable(type) {
  try {
    let storage = window[type];
    let x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return e instanceof DOMException && (
        // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
}
