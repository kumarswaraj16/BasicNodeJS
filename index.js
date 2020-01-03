const square = require('./square.js');

const calculateSquare = function(a){
	console.log(`value of side is:  ${a}  and area of square is:  `+ square.area(a));
	console.log(`value of side is:  ${a}  and perimeter of square is: ` + square.perimeter(a));
};

// calculateSquare(5);

console.log(__filename);
console.log(__dirname);