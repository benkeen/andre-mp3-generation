let tmpData = [];
let computedCombinations = [];


/**
 * Returns an array of the following form:
 *    { label: '1_2_5', files: [] }
 * The label is for convenience to clearly shows what's in the content. The files are the actual file names and will
 * correspond to the numbers in the label.
 */
const getCombinations = (files) => {
	const numberedArray = files.map((item, index) => (index+1));
	for (let sizeGroup=2; sizeGroup<=files.length-1; sizeGroup++) {
		computeCombinations(numberedArray, 0, files.length-1, 0, sizeGroup);
	}
	return computedCombinations.map((combination) => getFilesFromNumberedArray(numberedArray, combination, files));
};

const computeCombinations = (items, start, end, index, sizeGroup) => {
	if (index === sizeGroup) {
		let row = [];
		for (let j=0; j<sizeGroup; j++) {
			row.push(tmpData[j]);
		}
		computedCombinations.push(row);
		return;
	}

	for (let i=start; i<=end && (end-i+1) >= sizeGroup-index; i++) {
		tmpData[index] = items[i];
		computeCombinations(items, i+1, end, index+1, sizeGroup);
	}
};

const getFilesFromNumberedArray = (numberedArray, combination, files) => {
	const label = combination.join('_');
	return {
		label,
		files: combination.map((num) => files[num-1])
	};
};


module.exports = {
	getCombinations
};
