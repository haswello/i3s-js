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

});