/**
 * @module Point2D
 * @file Point2D Class
 * @author Tom Jenkins <tom@itsravenous.com>
 */

/**
 * BaseJS class
 * @type Object
 */
var Base = require('basejs');

var Point2D = Base.extend({

	/**
	 * Default property values
	 * @type {Object}
	 * @memberof Point2D.prototype
	 * @property {Number} x default value for x
	 * @property {Number} y default value for y
	 */
	defaults: {
		x: -1000000000,
		y: -1000000000
	},

	/**
	 * @constructor Point2D
	 * @classdesc Represents a 2D Point
	 * @param {Number} [x=this.defaults.x] x position
	 * @param {Number} [y=this.defaults.y] y position
	 */
	constructor: function (x, y) {
		if (typeof x == 'undefined') x = this.defaults.x;
		if (typeof y == 'undefined') y = this.defaults.y;

		this.x = x;
		this.y = y;
	},

	/**
	 * Determines whether the given point is identical to this one
	 *
	 * @memberof Point2D.prototype
	 * @param {Point2D}
	 * @return {Boolean}
	 */
	equals: function(p) {
		return p.x == this.x && p.y == this.y;
	},

	/**
	 * Sets the x position of the point
	 *
	 * @memberof Point2D.prototype
	 * @param {Number}
	 */
	setX: function (x) {
		this.x = x;
	},

	/**
	 * Sets the y position of the point
	 *
	 * @memberof Point2D.prototype
	 * @param {Number}
	 */
	setY: function (y) {
		this.y = y;
	},

	/**
	 * Sets the x and y positions of the point
	 *
	 * @memberof Point2D.prototype
	 * @param {Number} x
	 * @param {Number} y
	 */
	set: function (x, y) {
		this.x = x;
		this.y = y;
	},

	/**
	 * Determines the distance from this point to the given point
	 *
	 * @memberof Point2D.prototype
	 * @param {Point2D | Number} x position or entire comparison point instance 
	 * @param {Number=} y position of comparison point
	 * @return {Number}
	 */
	getDist: function () {
		return Math.sqrt(this.getSqrDist.apply(this, arguments));
	},

	/**
	 * Determines the square distance from this point to the given point
	 *
	 * @memberof Point2D.prototype
	 * @param {Point2D | Number} x position or entire comparison point instance
	 * @param {Number=} y position of comparison point
	 * @return {Number}
	 */
	getSqrDist: function () {
		/**
		 * {Number}
		 * Distance to comparison point
		 */
		var dist;
		/**
		 * {Number}
		 * Comparison point x
		 */
		var x = p.x;
		/**
		 * {Number}
		 * Comparison point y
		 */
		var y = p.y;

		if (typeof arguments[0] == Point2D) {
			/**
			 * {Point2D}
			 * Comparison point
			 */
			var p = arguments[0];
			x = p.x;
			y = p.y
		} else {
			x = arguments[0];
			y = arguments[1];
		}

		/**
		 * {Number}
		 * Difference between x positions
		 */
		var dx = this.x - x;
		/**
		 * {Number}
		 * Difference between y positions
		 */
		var dy = this.y - y;

		return (dx*dx) + (dy*dy);
	}
});

module.exports = Point2D;