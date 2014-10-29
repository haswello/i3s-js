/**
 * @file Class to compare fingerprints
 * @author Tom Jenkins tom@itsravenous.com
 */

// Dependencies
var Base = require('basejs');
var common = require('./common');

var Compare = Base.extend({
	
	/**
	 * @constructor Compare
	 */
	constructor: function () {

	},

	/**
	 * Calculates how good a match two fingerprints are
	 *
	 * @memberof Compare
	 * @param {FingerPrint}
	 * @param {FingerPrint}
	 * @return {Number} score - lower numbers are better matches
	 */
	compareTwo: function (f1, f2) {
		// Calculate matrix to transform points in f1 to f2's space
		var affine = common.calcAffine(
			f1.ref1.getX(),
			f1.ref1.getY(),
			f1.ref2.getX(),
			f1.ref2.getY(),
			f1.ref3.getX(),
			f1.ref3.getY(),
			f2.ref1.getX(),
			f2.ref1.getY(),
			f2.ref2.getX(),
			f2.ref2.getY(),
			f2.ref3.getX(),
			f2.ref3.getY()
		);

		// Clone fingerprint and apply transformation
		f1c = f1.clone();
		f1c.doAffine(affine);

		// Calculate score
		var result = f1c.distance(f2, -3);
		var score = this.exhaustiveSearch(f1c, f2, result.pairs)

		return score;
	},

	/**
	 * Tries all possible triples of spot pairs between two fingerprints as basis for affine transformation
	 * and keeps the result with the best (lowest) score. The fingerprints must first have been run through
	 * Compare.compareTwo
	 *
	 * @memberof Compare
	 * @param {FingerPrint}
	 * @param {FingerPrint}
	 * @param {Array} array of spot pairs between f1 and f2
	 * @return {Number}
	 */
	exhaustiveSearch: function (f1, f2, pairs) {
		var matrix;

		var best = f1.clone();
		var bestPairs = [];
		var bestPairCnt;
		var paircnt = pairs.length;

		for(var j = 0; j < paircnt - 2; j ++) {
			for(var k = j + 1; k < paircnt-1; k ++) {
				for(var l = k + 1; l < paircnt; l ++) {
					var test = f1.clone();

					var from1 = test.getElt(pairs[j].getM1());
					var from2 = test.getElt(pairs[k].getM1());
					var from3 = test.getElt(pairs[l].getM1());
					var to1	= f2.getElt(pairs[j].getM2());
					var to2	= f2.getElt(pairs[k].getM2());
					var to3	= f2.getElt(pairs[l].getM2());

					var matrix = common.calcAffine(
						from1.getCx(), from1.getCy(),
						from2.getCx(), from2.getCy(),
						from3.getCx(), from3.getCy(),
						to1.getCx(), to1.getCy(),
						to2.getCx(), to2.getCy(),
						to3.getCx(), to3.getCy()
					);
					if(!matrix) continue;

					test.doAffine(matrix);

					test.distance(f2, -3);
					var tmppairs = test.pairs;

					if(test.getScore() < best.getScore())
					{
						bestPairs = tmppairs;
						bestPairCnt = tmppairs.length;
						best = test;
					}
				}
			}
		}

		f1 = best;
		
		if(bestPairCnt)
		{
			paircnt = bestPairCnt;
			pairs = bestPairs;
		}

		return f1.score;
	}

});

module.exports = Compare;
