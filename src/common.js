/**
 * @module
 * @file Common helper functions
 * @author Tom Jenkins <tom@itsravenous.com>
 */

var gauss = require('./gauss');

module.exports = {

	/**
	 * 
	 */
	calcAffine: function (x1, y1, x2, y2, x3, y3, ux1, uy1, ux2, uy2, ux3, uy3) {
		mx = gauss([
				[x1, y1, 1],
				[x2, y2, 1],
				[x3, y3, 1],
			],
			[
				ux1,
				ux2,
				ux3,
			]
		);

		my = gauss([
				[x1, y1, 1],
				[x2, y2, 1],
				[x3, y3, 1],
			],
			[
				uy1,
				uy2,
				uy3
			]
		);

		var invalidX = mx.some(function (v) {
			return v == Infinity || v == -Infinity;
		});
		var invalidY = my.some(function (v) {
			return v == Infinity || v == -Infinity;
		});

		if (invalidX || invalidY) {
			console.warn('Unsolvable gauss')
			return false;
		} else {
			return mx.concat(my);
		}
	},

	/**
	 * @param {Number} x position
	 * @param {Number} y position
	 * @param {Array} affine transformation matrix
	 * @return {Object} transformed coordinate
	 */
	doAffine: function (x, y, matrix)
	{
		var _x = x;
		var _y = y;

		x = matrix[0]*_x + matrix[1]*_y + matrix[2];
		y = matrix[3]*_x + matrix[4]*_y + matrix[5];

		return {
			x: x,
			y: y
		}
	},

}