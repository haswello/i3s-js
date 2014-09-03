/**
 * @file Element (distinguishing mark) class
 * @author Tom Jenkins tom@itsravenous.com
 */

var common = require('./common');
var Point2D = require('./point2d');

/**
 * @constructor
 */
var Element = function () {
	/**
	 * @type {Point2D}
	 */
	this.data = new Point2D();
	/**
	 * x position of centre of element
	 * @type {Number}
	 */
	this.cx = 0;
	/**
	 * y position of centre of element
	 * @type {Number}
	 */
	this.cy = 0;
	/**
	 * area element (only applicable to ellipse elements)
	 * @type {Number}
	 */
	this.area = 0;
	/**
	 * angle of element (only applicable to ellipse elements)
	 * @type {Number}
	 */
	this.angle = 0;
}

Element.prototype = {
	
	/**
	 * From i3s: Determines similarity (in shape) between two elements (1.0 is perfect). Each difference 
	 * in the various ratios introduces a penalty.
	 *
	 * As we are currently only comparing spots, this will always return 1 (i.e. identical)
	 *
	 * @param {Element}
	 * @return {Number} 0 - 1
	 */
	calcSimilarityRate: function (el) {
		return 1.0;
	},

	/**
	 * As we are currently only comparing spots, this will always return true
	 * 
	 * @param {Element}
	 * @return {Boolean}
	 */
	matches: function (el) {
		return true;
	},

	/**
	 * Apply an affine transformation matrix to the element
	 * 
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
			tmpx = this.data[i].getX();
			tmpy = this.data[i].getY();
			tmpxy = common._doAffine(tmpx, tmpy, matrix);
			tmpx = tmpxy.x;
			tmpy = tmpxy.y;
			this.data[i].set(tmpx, tmpy);
		}
		cx = (this.data[0].getX() + this.data[1].getX())/ 2.0;
		cy = (this.data[0].getY() + this.data[1].getY())/ 2.0;

		this.calcShapeAndArea();
	},

	/**
	 * Calculates and stores the area, aspect ratio and angle of the shape.
	 * As we're only supporting spots at the moment, this will always result in:
	 * area=0, ratio=-1, angle=-1
	 */
	calcShapeAndArea: function () {
		this.area = 0;
		this.ratio = -1;
		this.angle = -1;
	},

	/**
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
	}

}

module.exports = Element;

