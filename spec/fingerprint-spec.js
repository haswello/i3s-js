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

		var distance = f1.distance(f2, 2);

		expect(distance).toEqual(0);
	});

	it('Creates and compares two fingerprints based on the two images from the original i3s test data', function () {
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

		var affine = common.calcAffine(
			baasie1.refs[0][0],
			baasie1.refs[0][1],
			baasie1.refs[1][0],
			baasie1.refs[1][1],
			baasie1.refs[2][0],
			baasie1.refs[2][1],
			baasie2.refs[0][0],
			baasie2.refs[0][1],
			baasie2.refs[1][0],
			baasie2.refs[1][1],
			baasie2.refs[2][0],
			baasie2.refs[2][1]
		);

		f1.doAffine(affine);

		var distance = f1.distance(f2, -3);

		expect(distance).toEqual(15.375698780053549);
	});

});