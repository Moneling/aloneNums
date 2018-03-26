// 检查数独解决方案
function checkArray(arr) {
    const arrLen = arr.length; //9
    const newArr = new Array(arrLen); //[true]
    newArr.fill(true);

    for (let i = 0; i < arr.length - 1; i++) {


        if (!newArr[i]) {
            continue;
        }
        if (!arr[i]) {
            newArr[i] = false;
            continue;
        }

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                newArr[i] = newArr[j] = false;
                continue;
            }
        }

    }
    return newArr;
}
const Toolkit = require("./toolkit");
module.exports = class Checker {
    constructor(matrix) {
        this._matrix = matrix;
        this._MatrixMarks = Toolkit.matrix.makeMatrix(true); //标记检查变量

    }
    get matrixMarks() { //如果有错误则输出其坐标
        return this._MatrixMarks;
    }

    get isSuccess() {
        return this._success; //再次检查
    }
    check() {
        this.checkRows();
        this.checkCols();
        this.checkBoxes();

        this._success = this._MatrixMarks.every(row => row.every(cell => cell)); //对整个数据进行检查  全部返回true =》 true or false
        return this._success; //全部返回成功则输出
    }

    checkRows() {
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const rowArr = this._matrix[rowIndex]; //得到一行数组 来源于 this._matrix
            const marks = checkArray(rowArr); //得到一个检测后的标记数组  将这个数组进行检测如果是false 进行this._matrix 更新

            for (let colIndex = 0; colIndex < marks.length; colIndex++) {
                if (!marks[colIndex]) {
                    this._MatrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
    checkCols() {
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            const cols = [];

            for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }

            const marks = checkArray(cols);

            for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
                if (!marks[rowIndex]) {
                    this._MatrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
    checkBoxes() {
        // console.log("进入checkBoxes arrayis");
        // console.log(this._matrix)
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {

            const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
            const marks = checkArray(boxes);

            for (let celIndex = 0; celIndex < 9; celIndex++) {
                if (!marks[boxIndex]) {
                    const { rowIndex, colIndex } = Toolkit.box.convertFromBoxIndex(boxIndex, celIndex);
                    this._MatrixMarks[rowIndex][colIndex] = false;
                }

            }


        }
    }
}


/**
 * 进行单元测试
 */

/*const Generator = require("./generator.js");
const gen = new Generator();
gen.generator();

const matrix = gen.matrix;
const checker =new Checker(matrix);
checker.check();
console.log(checker.matrixMarks);


matrix[1][1] =matrix[2][2]=matrix[3][3] =matrix[4][4] = false;
const checker2 =new Checker(matrix);
checker2.check();
console.log(checker2.matrixMarks);
*/