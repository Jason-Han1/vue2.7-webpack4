function MySetInterval() {
  this.timerId;
}

MySetInterval.prototype.setInterval = function (callback, interval) {
  this.timerId = setTimeout(() => {
    if (typeof callback != 'function') return;
    callback();
    this.setInterval(callback, interval);
  }, interval);
};

MySetInterval.prototype.clearInterval = function (callback, interval) {
  clearTimeout(this.timerId);
};

export default MySetInterval;
