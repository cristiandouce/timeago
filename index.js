/**
 * Module dependencies.
 */

var moment = require('moment')
  , half = 1000 * 30
  , o = document.querySelectorAll.bind(document);

module.exports = Timeago;

/**
 * Returns a timea
 */

function Timeago (selector, options) {
  if (!(this instanceof Timeago)) {
    return new Timeago(selector, options);
  }

  if (0 === arguments.length) {
    throw new Error("Timeago requires at least a query selector string as parameter.");
  };

  this.selector = selector;

  options = options || {};
  this.interval = options.interval || half; // a minute
  this.lang = options.lang || 'en';
  this.attr = options.attr || 'data-time';
  this.timer = null;

  // setup language
  moment.lang(this.lang);

  // init auto-render
  this.update()
}

/**
 * Updates all matching elements
 * with selector provided
 *
 * @return {Timeago} `Timeago` instance.
 * @api public
 */

Timeago.prototype.update = function() {
  // if timer, delete it!
  if(this.timer) {
    clearTimeout(this.timer);
  }

  // Update all matching elements with `Timeago` string.
  toArray(o(this.selector)).forEach(updateElement.bind(this));

  // Save timer's id for next update.
  this.timer = setTimeout(this.update.bind(this), this.interval);
}

/**
 * Takes a NodeList Object and
 * returns an array
 *
 * @param {NodeList} list `NodeList` to convert
 * @return {Arrat} `Array` of `ElementNodes`
 * @api private
 */

function toArray (list) {
  return Array.prototype.concat.apply([], list);
}

/**
 * Takes the dirt in hands to update
 * every single element matched.
 * Requires `momentJS` and to be
 * binded to another object with
 * `attr` property.
 *
 * @param {NodeElement} el DOM's `NodeElement` to update
 * @api private
 */

function updateElement (el) {
  el.innerHTML = moment(el.getAttribute(this.attr)).fromNow();
}