const math = require('mathjs');

//returns row or column sum
const sum = array => {
    return array.reduce((total, val) => {
        return total + val
    }, 0);
}

//check range
const checkRange = array => {
    array.forEach(element => {
        if(element <= 0 || element > 9){
            throw err;
        }
    });
    return true;
}

//check duplicates
const checkDuplicates = sudoku => {
    sudoku._data.some(subarray => {
        if (new Set(subarray).size != 9 || !checkRange(subarray)) {
            throw err;
        }
    });
    return true;
}

/*
Since sudoku solution is unique,
we can perform operations on it
to check validity such as
eachSubArraySum(matrix ^ 2) == eachSubArraySum(matrix * matrix ^ T) 
*/
const validSudoku = array => {
    //assuming array is passed
    try {
        const sudoku = math.matrix(array);
        const transposeSudoku = math.transpose(sudoku);
        if (sudoku._size.toString() !== '9,9') {
            return false;
        } else if (!(checkDuplicates(sudoku) && checkDuplicates(transposeSudoku))) {
            return false;
        }
        const res1 = math.multiply(sudoku, transposeSudoku);
        const res2 = math.multiply(sudoku, sudoku);
        sum1 = res1['_data'].map(arr => sum(arr));
        sum2 = res2['_data'].map(arr => sum(arr));
        return sum1.toString() == sum2.toString();
    } catch (err) {
        return false;
    }
}

module.exports = validSudoku;
