/**
 * @file Tests for the Compare class
 * @author Tom Jenkins tom@itsravenous.com
 */

// Dependencies
var Compare = require('../src/compare');
var FingerPrint = require('../src/fingerprint');

describe('A spec for the Compare class', function () {

	it('Compares two fingerprints based on two images from the original I3S test data, using the "exhaustive search" method', function () {
		var baasie1 = {
			refs: [
				[419, 275],
				[670, 325],
				[515, 483]
			],
			features: [
				[320, 449],
				[333, 386],
				[340, 397],
				[350, 373],
				[371, 378],
				[372, 403],
				[370, 449],
				[415, 428],
				[415, 352],
				[432, 418],
				[464, 387],
				[469, 404],
				[492, 410],
				[501, 372],
				[519, 417],
				[564, 412],
				[633, 364],
				[668, 366],
				[727, 399]
			]
		};

		var baasie2 = {
			refs: [
				[453, 273],
				[868, 373],
				[617, 620]
			],
			features: [
				[210, 517],
				[228, 509],
				[282, 585],
				[291, 563],
				[315, 460],
				[329, 480],
				[343, 438],
				[375, 565],
				[378, 451],
				[382, 490],
				[390, 576],
				[457, 530],
				[488, 519],
				[545, 464],
				[551, 493],
				[594, 500],
				[608, 442],
				[637, 512],
				[694, 412],
				[712, 473],
				[713, 513],
				[787, 451],
				[829, 434],
				[889, 446],
				[949, 500],
				[982, 441],
				[996, 498],
				[1043, 388],
				[1067, 487],
				[1075, 449]
			]
		};

		var baasie3 = {
			refs: [
				[294, 186],
				[703, 224],
				[460, 489]
			],
			features: [
				[170, 487],
				[167, 464],
				[166, 376],
				[181, 385],
				[189, 367],
				[189, 350],
				[227, 393],
				[287, 308],
				[303, 422],
				[381, 375],
				[421, 381],
				[464, 387],
				[509, 283],
				[539, 379],
				[601, 311],
				[601, 342],
				[646, 289],
				[705, 297],
				[769, 355],
				[817, 346],
				[888, 330],
				[900, 288]
			]
		};

		var f1 = new FingerPrint(baasie1.refs, baasie1.features);
		var f2 = new FingerPrint(baasie2.refs, baasie2.features);
		var f3 = new FingerPrint(baasie3.refs, baasie3.features);

		var comp = new Compare();
		var score = comp.compareTwo(f1, f2);

		expect(score).toEqual(15.375698780053549);
	});
});