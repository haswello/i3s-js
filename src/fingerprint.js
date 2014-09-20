/**
 * @file Fingerprint class
 * @author Tom Jenkins tom@itsravenous.com
 */

var Base = require('basejs');

var FingerPrint = Base.extend({

	/**
	 * Element list
	 * {Array}
	 * @memberof FingerPrint.prototype
	 */
	elt: [],

	/**
	 * 1st reference point
	 * {Point2D}
	 * @memberof FingerPrint.prototype
	 * @private
	 */
	ref1: null,

	/**
	 * 2nd reference point
	 * {Point2D}
	 * @memberof FingerPrint.prototype
	 * @private
	 */
	ref2: null,

	/**
	 * 3rd reference point
	 * {Point2D}
	 * @memberof FingerPrint.prototype
	 * @private
	 */
	ref3: null,

	/**
	 * Element count
	 * {Number}
	 * @memberof FingerPrint.prototype
	 * @private
	 */
	cnt: 0,

	/**
	 * Score
	 * {Number}
	 * @memberof FingerPrint.prototype
	 * @private
	 */
	score: -1000000000,

	/**
	 * {Number}
	 * @memberof FingerPrint.prototype
	 * @private
	 */
	normfactor: -1,

	/**
	 * {Number}
	 * @memberof FingerPrint.prototype
	 * @private
	 */
	paircnt: -1,

	/**
	 * @constructor FingerPrint
	 * @param {Array} reference points
	 * @param {Array} elements
	 */
	constructor: function (ref, data) {

	},


	/**
	 * @memberof FingerPrint.prototype
	 * @return {Number}
	 */
	distance: function () {

	},

	/**
	 * @memberof FingerPrint.prototype
	 * @return {Number}
	 */
	determineMaxDist: function () {

	},

	/**
	 * @memberof FingerPrint.prototype
	 *
	 */
	resetScore: function () {

	},

	/**
	 * @memberof FingerPrint.prototype
	 * @param {Array} affine transformation matrix
	 */
	doAffine: function (matrix) {

	},

	/**
	 * @memberof FingerPrint.prototype
	 * @return {Array}
	 */
	toArray: function () {

	},

	/**
	 * @memberof FingerPrint.prototype
	 *
	 */
	calcNormFactor: function () {

	},

	/**
	 * @memberof FingerPrint.prototype
	 * @param {Number} index of element to get
	 * @return {Element}
	 */ 
	getElt: function (i) {
		if (i < 0 || i >= this.elt.length) {
			throw 'Invalid element index ' + i + 'passed to FingerPrint';
		} else {
			return this.elt[i];
		}
	},
	
	/**
	 * @memberof FingerPrint.prototype
	 * 
	 */
	getCnt: function () {
		return this.cnt;
	},

	/**
	 * @memberof FingerPrint.prototype
	 * @return {Number}
	 */
	getScore: function () {
		return this.score
	},

	/**
	 * @memberof FingerPrint.prototype
	 * @return {Number}
	 */
	getPairCnt: function () {
		return this.paircnt;
	},

	/**
	 * @memberof FingerPrint.prototype
	 * @param {Number}
	 */
	setScore: function (score) {
		this.score = score;
	},

	/**
	 * @memberof FingerPrint.prototype
	 * @param {Number}
	 */
	setPairCnt: function (paircnt) {
		this.paircnt = paircnt;
	},

	/**
	 * Adds the reference points to the array of elements
	 * @memberof FingerPrint.prototype
	 */
	addReference: function () {

	}
})