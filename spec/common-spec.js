/**
 * @file Tests various helper functions
 * @author Tom Jenkins tom@itsravenous.com
 */

// Load the helpers
var common = require('../src/common');

describe('A spec to test various helper functions', function () {

	it('Determines the affine transformation from two sets of three reference points', function () {

		var x1 = 100;
		var y1 = 90;
		var x2 = 140;
		var y2 = 70;
		var x3 = 120;
		var y3 = 60;

		var ux1 = 90;
		var uy1 = 80;
		var ux2 = 140;
		var uy2 = 90;
		var ux3 = 130;
		var uy3 = 50;

		var affine = common.calcAffine(
			// Ref1
			x1, y1,
			x2, y2,
			x3, y3,
			// Ref2
			ux1, uy1,
			ux2, uy2,
			ux3, uy3
		);

		console.log(affine);

		var testxy1 = common.doAffine(x1, y1, affine);
		var testxy2 = common.doAffine(x2, y2, affine);
		var testxy3 = common.doAffine(x3, y3, affine);

		console.log(testxy1);
		console.log(testxy2);
		console.log(testxy3);
	});

});
