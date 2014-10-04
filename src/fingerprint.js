/**
 * @file Fingerprint class
 * @author Tom Jenkins tom@itsravenous.com
 */

 var config = require('./config');

 var Base = require('basejs');

 var Pair = Base.extend({
	/**
	 * @constructor {Pair}
	 * @param {Element}
	 * @param {Element}
	 * @param {Number} distance between them
	 */
	 constructor: function (e1, e2, dist) {
	 	this.e1 = e1;
	 	this.e2 = e2;
	 	this.dist = dist;
	 },

	 getE1: function () {
	 	return this.e1;
	 },

	 getE2: function () {
	 	return this.e2;
	 },

	 getDist: function () {
	 	return this.dist;
	 }
	});

 var FingerPrint = Base.extend({

	/**
	 * Element list
	 *
	 * {Array}
	 * @memberof FingerPrint.prototype
	 */
	elt: [],

	/**
	 * 1st reference point
	 *
	 * {Point2D}
	 * @memberof FingerPrint.prototype
	 * @private
	 */
	ref1: null,

	/**
	 * 2nd reference point
	 *
	 * {Point2D}
	 * @memberof FingerPrint.prototype
	 * @private
	 */
	ref2: null,

	/**
	 * 3rd reference point
	 *
	 * {Point2D}
	 * @memberof FingerPrint.prototype
	 * @private
	 */
	ref3: null,

	/**
	 * Element count
	 * This should always be equal to this.elt.length; we're keeping it cached as
	 * this is what the original i3s source does, presumably for performance reasons.
	 * Will remove if deemed unecessary following tests)
	 *
	 * {Number}
	 * @memberof FingerPrint.prototype
	 * @private
	 */
	cnt: 0,

	/**
	 * Score
	 *
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
		this.ref1 = new Point2D(ref[0], ref[1]);
		this.ref2 = new Point2D(ref[2], ref[3]);
		this.ref3 = new Point2D(ref[4], ref[5]);

		this.cnt = data.length;

		for (var i = 0; i < this.cnt; i++) {
			this.elt.push(new Element(data[i]));
		}

		this.calcNormFactor();
	},

	/**
	 * From the i3s source: "from the three reference points the max distance (squared for efficiency) in the image is estimated.
	 * the absolute allowed squared distance is calculated by multiplying with maxAllowedDistance, a user
	 * defined parameter. This parameter is also squared. So 0.01 means you allow only spots to match with 
	 * each other if they are maximally 10% of the maximum distance apart."
	 *
	 * @memberof FingerPrint.prototype
	 * @return {Number}
	 */
	determineMaxDist: function () {
		// From the i3s source: "reference points have been added to list as the first three elements!"
		var maxDist = this.elt[0].sqrDist(this.elt[1]);
		var tmpDist = this.elt[0].sqrDist(this.elt[2]);

		if(tmpDist > maxDist)
			maxDist = tmpDist;

		tmpDist = this.elt[1].sqrDist(this.elt[2]);

		if(tmpDist > maxDist)
			maxDist = tmpDist;

		return maxDist * config.maxAllowedDistance;

	},

	/**
	 * Calculates the match score between this and the given fingerprint
	 * @memberof FingerPrint.prototype
	 * @param {FingerPrint}
	 * @param {Number} affine correction
	 * @return {Array}
	 */
	distance: function (f, affine_corr) {
		var maxSqrDist = this.determineMaxDist();
		var totaldist = 0;
		this.paircnt = 0;

		/***
		from i3s: process all possible point pairs. this is the most time consuming part of I3S. JdH May 13, 2007
		calculation is done as match as possible with squared distances to prevent unnecessary sqrt operations.
		***/
		for(int i=0; i<cnt; i++) 
		{
			var minSqrDst = 1000000000;
			var second  = 1000000000;
			var minj = -1;
			var pairs = [];

			for(int j=0; j<f.cnt; j++)		
			{
				// only compare similar elements
				if(this.elt[i].matches(f.elt[j]) == false)
					continue;

				var sqrDist = this.elt[i].sqrDist(f.elt[j]);

				if(sqrDist < minSqrDst)
				{
					second = minSqrDst;
					minSqrDst = sqrDist;
					minj = j;
				} else if(sqrDist < second) 
				second = sqrDist;
			}

			/***
			From i3s: "only accept a spot if the second best candidate is at a user defined relative distance and 
			the minimum distance is below a user defined relative maximum.
			minRelativeDistance is defined in xml file coming with the database"
			***/
			if(minSqrDst*minRelativeDistance <= second && minSqrDst < maxSqrDist)	
			{
				var sqrtd = sqrt(minSqrDst);
				var from = this.elt[i];
				var to = f.elt[minj];

				totaldist += sqrtd*from.calcSimilarityRate(to);
				this.paircnt++;

				pairs.push(new Pair(from, to, sqrtd));
			}
		}

		filterOutDuplicatePairs(pairs, totaldist);

		this.paircnt = pairs.length + affine_corr;

		if(this.paircnt <= 0)
			this.score = 1000000.0;
		else 
			this.score = (f.normfactor*totaldist) / sqr(this.paircnt);

		// from i3s: extra penalty for low number of pairs
		if(this.paircnt == 1)
			this.score = this.score * 4.0;
		else
			if(this.paircnt == 2)
				this.score = this.score * 3.0;
			else if(this.paircnt == 3)
				this.score = this.score * 2.0;

		this.paircnt -= affine_corr;

		// from i3s: specific penalty for unpaired spots, notPairedRatio will alwyas be < 1. So dividing by it makes score bigger
		var notPairedRatio = ((2.0*this.paircnt)) / (f.cnt + this.cnt);
		this.score = this.score / (notPairedRatio*notPairedRatio);

		return this.score;
	},

	/**
	 * @memberof FingerPrint.prototype
	 * @param {Array} affine transformation matrix
	 */
	doAffine: function (matrix) {
		if (this.elt.length == 0 || matrix.length == 0)
			return;

		for (var i = 0; i < this.cnt; i ++)
			this.elt[i].doAffine(matrix);
	},

	/**
	 * @memberof FingerPrint.prototype
	 * @return {Array}
	 */
	toArray: function () {
		var arr = [];
		var elt;
		for (var i = 0; i < this.cnt; i ++) {
			elt = this.elt[i];
			arr.push(
				elt.data[0].getX(), elt.data[0].getY(),
				elt.data[1].getX(), elt.data[1].getY(),
				elt.data[2].getX(), elt.data[2].getY(),
				elt.data[3].getX(), elt.data[3].getY()
				);
		}
		return arr;
	},

	/**
	 * @memberof FingerPrint.prototype
	 * From i3s source: "This function tries to normalize results between different searches. It does not have any effect on the final
	 * ordering of the database in a search. Normalization helps to make sure that a score of e.g. 4.5 means more or 
	 * less the same recognition quality between various searches in the database. Otherwise the calculated score
	 * depends largely on the"
	 */
	calcNormFactor: function () {
		var tot = this.ref1.getDist(this.ref2);
		tot += this.ref1.getDist(this.ref3);
		tot += this.ref2.getDist(this.ref3);

		this.normfactor = 10000.0 / tot; // From i3s source: "10000 is an arbitrary value, but gives results of good matches somewhere between 0 and 20"
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
	 * Creates {Element}s for the three reference points and prepends them to the element array
	 * @memberof FingerPrint.prototype
	 */
	addReference: function () {
		var ref1El = new Element(this.ref1.x, this.ref1.y);
		var ref2El = new Element(this.ref2.x, this.ref2.y);
		var ref3El = new Element(this.ref3.x, this.ref3.y);

	 	this.elt.unshift(ref1EL, ref2El, ref3El);
	}

	/**
	 * Resets the score
	 * @memberof FingerPrint.prototype
	 */
	resetScore: function () {
		this.score = 1000000;
	}
});