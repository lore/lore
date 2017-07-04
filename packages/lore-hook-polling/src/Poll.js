export default class Poll {

  constructor(action, options) {
    this.action = action;
    this.options = options;
    this.interval = this.options.interval || 5000;
    this.delayOnStart = this.options.delayOnStart || false;
    this.isPolling = false;

    // bind class methods
    this.poll = this.poll.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.resetInterval = this.resetInterval.bind(this);
  }

  poll() {
    const interval = this.interval;

    if (this.isPolling) {
      // invoke the action
      this.action();
      setTimeout(this.poll, interval);
    }
  }

  start() {
    if (this.isPolling) {
      return;
    }

    this.isPolling = true;

    // wait for the specified interval before triggering the first
    // request if we're delaying on start
    if (this.delayOnStart) {
      setTimeout(this.poll, this.interval);
    } else {
      this.poll();
    }
  }

  stop() {
    this.isPolling = false;
  }

  setInterval(interval) {
    this.interval = interval;
  }

  resetInterval() {
    this.interval = this.options.interval;
  }

}
