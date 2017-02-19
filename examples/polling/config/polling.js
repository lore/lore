 /**
  * Configuration file for polling
  *
  * This file is where you define overrides for the default polling behavior.
  */

module.exports = {

   /**
    * The frequency at which the action should be invoked (in milliseconds)
    */

   // interval: 5000,

   /**
    * Determines whether the first request should be delayed when polling starts.
    * If 'true', poll.start() will wait for the specified interval before invoking
    * the action. It 'false', the action will be invoked immediately.
    */

   // delayOnStart: true

};
