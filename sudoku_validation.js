const math = require('mathjs');

//returns row or column sum
const sum = array => {
    return array.reduce((total, val) => {
        return total + val
    }, 0);
}

//check duplicates
const checkDuplicates = sudoku => {
    sudoku._data.some(subarray => {
        if (new Set(subarray).size != 9 || subarray.includes(0)) {
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


console.log(validSudoku([
    [4,5,9,7,2,6,3,1,8],
    [1,3,8,4,5,9,2,6,7],
    [7,6,2,3,1,8,4,9,5],
    [2,8,4,9,7,3,6,5,1],
    [6,1,3,8,4,5,9,7,2],
    [9,7,5,2,6,1,8,4,3],
    [3,2,6,1,9,7,5,8,4],
    [5,4,1,6,8,2,7,3,9],
    [8,9,7,5,3,4,1,2,6]
]));