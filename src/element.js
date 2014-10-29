/**
 * @module Element
 * @file Element (distinguishing mark) class
 * @author Tom Jenkins <tom@itsravenous.com>
 */

var Base = require('basejs');
var common = require('./common');
var Point2D = require('./point2d');

// Debug
var id = 1;


var Element = Base.extend({

	/**
	 * List of element's points
	 * @memberof Element.prototype
	 * @type {Array}
	 */
	data: [],

	/**
	 * x position of centre of element
	 * @memberof Element.prototype
	 * @type {Number}
	 */
	cx: 0,

	/**
	 * y position of centre of element
	 * @memberof Element.prototype
	 * @type {Number}
	 */
	cy: 0,

	/**
	 * Area of element (only applicable to ellipse elements)
	 * @memberof Element.prototype
	 * @type {Number}
	 */
	area: 0,

	/**
	 * Angle of element (only applicable to ellipse elements)
	 * @memberof Element.prototype
	 * @type {Number}
	 */
	angle: 0,

	/**
	 * @constructor Element
	 * @param {Array} points
	 */
	constructor: function (points) {
		this.id = id ++;
		if (typeof points != 'undefined') {
			this.set(points);
		}
	},

	/**
	 * Sets the point(s) and center for the element
	 *
	 * @memberof Element.prototype
	 * @param {Array} points list of one or four points (one for a point element (i3s classic), four for an ellipse (i3s spot))
	 * @param {Array} points.0 If element is to be a point, this is the point. If an ellipse, this is the 1st east/west pole
	 * @param {Array} points.1 2nd East/west pole of the ellipse
	 * @param {Array} points.2 1st north/south pole of the ellipse
	 * @param {Array} points.3 2nd north/south pole of the ellipse
	 */
	set: function (points) {
		// If passing a single point as an array, the length will be 2, so wrap in another array
		if (points.length == 2) {
			points = [points];
		}

		var pointCount = points.length;
		if (pointCount == 1) {
			// Simple point
			this.data = points;
			this.data[0] = new Point2D(points[0][0], points[0][1]);
			this.cx = this.data[0].x;
			this.cy = this.data[0].y;
		} else if (pointCount == 4)  {
			// Ellipse
			this.data = [];
			for (i = 0; i < pointCount; i ++) {
				this.data[i] = new Point2D(points[i][0], points[i][1]);
			}
			this.cx = (points[0][0] + points[1][0]) / 2;
			this.cy = (points[2][1] + points[3][1]) / 2;
		} else {
			// Um, guys, no triangles
			throw 'Invalid number of points passed to element. Pass one for a point element, or four for an ellipse. Triangles and other occult markings not supported.';
		}

	},

	/**
	 * Clones the element
	 * @memberof Element.prototype
	 * @return {Element}
	 */
	clone: function () {
		var e = new Element();
		e.data = [];
		this.data.forEach(function (point) {
			e.data.push(new Point2D(point.x, point.y));
		});
		return e;
	},

	/**
	 * @memberof Element.prototype
	 * @return {Number}
	 */
	getCx: function () {
		return this.cx;
	},

	/**
	 * @memberof Element.prototype
	 * @return {Number}
	 */
	getCy: function () {
		return this.cy;
	},
	
	/**
	 * From i3s: Determines similarity (in shape) between two elements (1.0 is perfect). Each difference 
	 * in the various ratios introduces a penalty.
	 *
	 * As we are currently only comparing spots, this will always return 1 (i.e. identical)
	 *
	 * @memberof Element.prototype
	 * @param {Element}
	 * @return {Number} 0 - 1
	 */
	calcSimilarityRate: function (el) {
		return 1.0;
	},

	/**
	 * As we are currently only comparing spots, this will always return true
	 * 
	 * @memberof Element.prototype
	 * @param {Element}
	 * @return {Boolean}
	 */
	matches: function (el) {
		return true;
	},

	/**
	 * Apply an affine transformation matrix to the element
	 * 
	 * @memberof Element.prototype
	 * @param {Array}
	 */
	doAffine: function (matrix) {
		if(matrix == 0)
			return;

		/**
		 * @type {Number}
		 */
		var tmpx;
		/**
		 * @type {Number}
		 */
		var tmpy;
		/**
		 * @type {Object}
		 */
		var tmpxy;

		// Loop over coordinates and apply transformation to each
		for(var i = 0; i < 4; i++) {
			if (!this.data[i]) break;

			tmpx = this.data[i].getX();
			tmpy = this.data[i].getY();
			tmpxy = common.doAffine(tmpx, tmpy, matrix);
			tmpx = tmpxy.x;
			tmpy = tmpxy.y;
			this.data[i].set(tmpx, tmpy);
		}
		if (this.data.length > 1) {
			this.cx = (this.data[0].getX() + this.data[1].getX())/ 2.0;
			this.cy = (this.data[0].getY() + this.data[1].getY())/ 2.0;
		} else {
			this.cx = this.data[0].getX();
			this.cy = this.data[0].getY();
		}

		this.calcShapeAndArea();
	},

	/**
	 * Calculates and stores the area, aspect ratio and angle of the shape.
	 * As we're only supporting spots at the moment, this will always result in:
	 * area=0, ratio=-1, angle=-1
	 * 
	 * @memberof Element.prototype
	 */
	calcShapeAndArea: function () {
		this.area = 0;
		this.ratio = -1;
		this.angle = -1;
	},

	/**
	 * @memberof Element.prototype
	 * @param {Number}
	 * @param {Number}
	 * @param {Number}
	 * @return {Boolean}
	 */
	withinRatio: function(x1, x2, ratio)
	{
	   if(x1 < x2) 
	   {
	      if(x1 / x2 >= ratio)
	         return true;
	   }
	   else
	   {
	      if(x2 / x1 >= ratio)
	         return true;
	   }
	   return false;
	},

	/**
	 * Determines the square distance from another element
	 * @memberof Element.prototype
	 * @param {Element}
	 * @return {Number}
	 */
	sqrDist: function (el) {
		return (el.cx - this.cx)*(el.cx - this.cx) + (el.cy - this.cy)*(el.cy - this.cy);
	},

	/**
	 * Determines the distance from another element
	 * @memberof Element.prototype
	 * @param {Element}
	 * @return {Number}
	 */
	getDist: function (el) {
		return Math.sqrt(this.sqrDist(el));
	},

	/**
	 * Determines whether the element is a point
	 * @memberof Element.prototype
	 * @return {Boolean}
	 */
	isSingular: function () {
		return this.data.length = 1;
	}

});

module.exports = Element;
