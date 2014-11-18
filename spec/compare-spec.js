/**
 * @file Tests for the Compare class
 * @author Tom Jenkins tom@itsravenous.com
 */

// Dependencies
var fgpReader = require('i3s-fgp-reader');
var Compare = require('../src/compare');
var FingerPrint = require('../src/fingerprint');

describe('A spec for the Compare class', function () {

	it('Compares two fingerprints based on two images from the original I3S test data, using the "exhaustive search" method', function () {

		var removeSize = function (kp) {
			return [kp[0], kp[1]];
		};

		var baasie1 = fgpReader('./spec/data/Baasie1-11Aug03.fgp');
		var baasie2 = fgpReader('./spec/data/Baasie1-2Nov03.fgp');
		var baasie3 = fgpReader('./spec/data/Baasie2-2nov03.fgp');
		var tom1 = fgpReader('./spec/data/Tom1-12Dec03.fgp');

		var f1 = new FingerPrint(baasie1.refs, baasie1.keypoints.map(removeSize));
		var f2 = new FingerPrint(baasie2.refs, baasie2.keypoints.map(removeSize));
		var f3 = new FingerPrint(baasie3.refs, baasie3.keypoints.map(removeSize));
		var f4 = new FingerPrint(tom1.refs, tom1.features);

		var comp = new Compare();
		var score = comp.compareTwo(f1, f2);
		var scoreRounded = Math.round(score * 100) / 100;

		expect(scoreRounded).toEqual(9.23);
	});
});