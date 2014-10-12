/**
 * @file Tests for the FingerPrint class
 * @author Tom Jenkins tom@itsravenous.com
 */

// Load the FingerPrint class
var FingerPrint = require('../src/fingerprint');

describe('A spec to test creating and comparing fingerprint', function () {

	it('Creates a fingerprint with some reference points and elements', function () {
		var f = new FingerPrint([
			[0, 0],
			[10, 0],
			[10, 10]
		], [
			[1, 1],
			[2, 2],
			[3, 3],
			[4, 4],
			[5, 5]
		]);

		var e1 = f.getElt(3); // First element added will actually be 4th, because ref points get prepended to element array

		expect([e1.cx, e1.cy]).toEqual([1, 1]);
	});

});