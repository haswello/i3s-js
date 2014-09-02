/**
 * @module
 * @file Common helper functions
 * @author Tom Jenkins <tom@itsravenous.com>
 */

module.exports = {

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
	}
}