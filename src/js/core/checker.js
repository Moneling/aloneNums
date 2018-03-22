// 检查数独解决方案
function checkArray(arr) {
    const arrLen = arr.length;
    const newArr = new Array(arrLen);
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
const Generator = require("./generator");

class checkMatrix {
    constructor() {
        const generator = new Generator()
        generator.generator();
        const genArr = generator.matrix;
        console.log(genArr)
            // this._Matrix = Toolkit.matrix.makeMatrix();

        this.checkRow(genArr);
        this.checkColl(genArr);
        this.checkBox(genArr);

    }
    checkRow(array) {
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const rowArr = array[rowIndex];
            array[rowIndex] = checkArray(rowArr);
        }
        console.log(array);
        return array;

    }
    checkColl(array) {

    }
    checkBox(array) {

    }
}

module.exports = checkMatrix;
const checkMatrix1 = new checkMatrix();
// console.log(checkMatrix1.checkRow());