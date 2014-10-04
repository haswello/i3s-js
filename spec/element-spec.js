/**
 * @file Tests for the Point2D class
 * @author Tom Jenkins tom@itsravenous.com
 */

// Load the Point2D class
var Element = require('../src/element')

describe('A spec to test creating and manipulating elements', function () {
	
	it('Creates an element', function () {
		var e = new Element();
		expect(e).toEqual(jasmine.any(Element));
	});

	it('Creates an element and sets its coordinates as a point', function () {
		var e = new Element();
		e.set([[12, 16]]);
		expect([e.cx, e.cy]).toEqual([12, 16]);
	});

	it('Creates an element and sets its coordinates as an ellipse', function () {
		var e = new Element();
		e.set([
			[-4, 0],
			[4, 0],
			[0, -4],
			[0, 4]
		]);
		expect([e.cx, e.cy]).toEqual([0, 0]);
	});

});