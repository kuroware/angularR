(function() {
	'use strict'

	//angularR Models
	function MarkovChain(startingVector, transitionMatrix) {
		this.startingVector = startingVector;
		this.transitionMatrix = transitionMatrix;

		//Calcualte the h_step of the starting matrix using the transition matrix
		step.$inject = ['MatrixService']
		function step(h_steps, MatrixService) {
			var startingVector_h_steps = new Vector();
			MatrixService.multiply(this.transitionMatrix, this.transitionMatrix);
		}
	}

	function RandomVariable() {

	}

	function DiscreteRandomVariable() {

	}

	function ContinousRandomVariable() {

	}

	//Generic models here
	function Vector(vector) {
		this.vector = vector;
	}

	//Matrix model
	function Matrix(m, n) {
		this.matrix = [];
		this.m = m; //Number of rows
		this.n = n; //Number of columns

		this.setRow = function(rowIndex, row) {
			rowIndex += 1; //Offset
			this.matrix[rowIndex] = row;
			if (this.n != row.length) {
				throw new Error('Mismatch with rows and columns');
			}
			if(rowIndex > this.m) {
				throw new Error('Mismatch with rows and columns');
			}
		}

		this.getColumn = function(columnIndex) {
			var column = [];
			for (var i = 0; i < this.matrix.length; i ++) {
				column.push(this.matrix[i][columnIndex]);
			}
			return column;
		}

		this.getRow = function(rowIndex) {
			return this.matrix[rowIndex];
		}
	}

	function ZeroMatrix() {

	}

	function IdentityMatrix() {

	}

	ZeroMatrix.prototype = Matrix;
	IdentityMatrix.prototype = Matrix;


	var angularR = angular.module('angularR', []);

	//Factory declaration here
	angularR.factory('MarkovChain', MarkovChain);
	angularR.factory('MatrixFactory', MatrixFactory);

	//Service declaration here
	angularR.service('MatrixService', MatrixService);
	
	function MatrixService() {
		var closureToSelf = this;

		this.add = function() {

		}
		this.multiply = function(A, B) {
			if (A instanceof IdentityMatrix || B instanceof IdentityMatrix) {
				return (A instanceof IdentityMatrix) ? B : A;
			}
			//Enforce that A and B are multipliable
			if (A.n == B.m) {
				var AB = new Matrix(A.rows, B.columns);
				for (var i = 1; i <= A.m; i++) {
					irow = [];
					currentRow = A.getRow(i);
					for (var j = 1; j <= B.n j++) {
						currentColumn = B.getColumn(j);
						ABij = this.dotArrays(currentRow, currentColumn); //Represents the ij entry in Matrix AB
						irow.push(ABij);
					}
					//Set the row
					AB.setRow(i, irow);
				}
				return AB;
			}
			else {
				throw new Error('Not multipliable');
			}
		}

		//Exponents the matrix
		this.exponent = function(A, power) {
			var i = new IdentityMatrix();
			j = power;
			while (power > 0) {
				i = closureToSelf.multiply(i, A);
				power--;
			}
			return A;
		}

		//Takes a1b1 + a2b2 + a3b3 + .... anbn
		this.dotArrays = function(arrayA, arrayB) {
			if (arrayA.length == arrayB.length) {

			}
			else {
				throw new Error('Attempted to dot arrays of different length');
			}
		}	
	}
})