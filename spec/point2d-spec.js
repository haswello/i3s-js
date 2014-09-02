/**
 * @file Tests for the Point2D class
 * @author Tom Jenkins tom@itsravenous.com
 */

// Load the Point2D class
var Point2D = require('../src/point2d')

describe('A spec to test creating and manipulating points', function () {
	
	it('Creates a point with the default coordinates', function () {
		var blankPoint = new Point2D();
		expect(blankPoint.x).toEqual(blankPoint.defaults.x);
		expect(blankPoint.y).toEqual(blankPoint.defaults.y);
	});

});