/**
 * @file Tests for the FingerPrint class
 * @author Tom Jenkins tom@itsravenous.com
 */

// Dependencies
var common = require('../src/common');
var FingerPrint = require('../src/fingerprint');

describe('A spec to test creating and comparing fingerprints', function () {

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

	it('Creates two identical fingerprints and compares them', function () {
		var f1 = new FingerPrint([
			[0, 0],
			[100, 0],
			[100, 100]
		], [
			[10, 10],
			[20, 20],
			[30, 30],
			[40, 40],
			[50, 50]
		]);

		var f2 = new FingerPrint([
			[0, 0],
			[100, 0],
			[100, 100]
		], [
			[10, 10],
			[20, 20],
			[30, 30],
			[40, 40],
			[50, 50]
		]);

		var result = f1.distance(f2, 2);

		expect(result.score).toEqual(0);
	});

});