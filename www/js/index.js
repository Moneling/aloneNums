/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var matrixToolkit = {
	makeRow: function makeRow() {
		var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		var array = new Array(9);
		array.fill(r);
		return array;
	},
	makeMatrix: function makeMatrix() {
		var _this = this;

		var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		return Array.from({
			length: 9
		}, function () {
			return _this.makeRow(c);
		});
	},

	/**
  * @brief [生成一个打乱数据的数组]
  * @details [long description]
  * 
  * @param  [description]
  */
	shuffle: function shuffle(array) {

		for (var i = 0; i < array.length - 2; i++) {
			var j = i + Math.floor(Math.random() * (array.length - i));
			var _ref = [array[j], array[i]];
			array[i] = _ref[0];
			array[j] = _ref[1];
		}
		return array;
	},

	/**
  * @brief 检测指定位置填写数字n是否可行
  * @details [long description]
  */
	checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
		var row = matrix[rowIndex]; //首先获取行列 在进行数据比对
		// const coll = [matrix[0][colIndex],matrix[1][colIndex]...matrix[8][colIndex];
		var coll = this.makeRow().map(function (v, i) {
			return matrix[i][colIndex];
		});

		var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
		    boxIndex = _boxToolkit$convertTo.boxIndex;

		var box = boxToolkit.getBoxCells(matrix, boxIndex); //获取到宫的数据后进行数据判断
		for (var i = 0; i < 9; i++) {
			if (row[i] === n || coll[i] === n || box[i] === n) {
				return false;
			}
		}
		return true;
	}
};

/**
 * 
 */

var boxToolkit = {
	getBoxCells: function getBoxCells(matrix, boxIndex) {
		var startRowIndex = Math.floor(boxIndex / 3) * 3; //获取到每一个宫的起始位置
		var startCollIndex = boxIndex % 3 * 3;
		var result = [];
		for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
			var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
			var collIndex = startCollIndex + cellIndex % 3;
			result.push(matrix[rowIndex][collIndex]);
		}

		return result;
	},
	convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
		return {
			boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
			collIndex: rowIndex % 3 * 3 + colIndex % 3
		};
	},
	convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
		return {
			rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
			colIndex: boxIndex % 3 * 3 + cellIndex % 3
		};
	}
};
//工具集
module.exports = function () {
	function Toolkit() {
		_classCallCheck(this, Toolkit);
	}

	_createClass(Toolkit, null, [{
		key: "matrix",

		//定义一个静态方法返回一个matrixToolKit； 矩阵和数组
		get: function get() {
			return matrixToolkit;
		}
		//宫坐标系工具

	}, {
		key: "box",
		get: function get() {
			return boxToolkit;
		}
	}]);

	return Toolkit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toolkit = __webpack_require__(0);

var Generator = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: "generator",
        value: function generator() {
            while (!this.internalGenerator()) {
                console.log('error gener.generator');
            }
        }
    }, {
        key: "internalGenerator",
        value: function internalGenerator() {
            //首先生成一个数组
            this.matrix = Toolkit.matrix.makeMatrix();
            //生成一个随机矩阵
            this.orders = Toolkit.matrix.makeMatrix() //返回的一个二维数组
            .map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            }) //生成有序数组  然后进行打乱
            .map(function (row) {
                return Toolkit.matrix.shuffle(row);
            });

            for (var n = 1; n <= 9; n++) {
                if (!this.fillNumber(n)) {
                    return false;
                };
            }
            return true;
        }
    }, {
        key: "fillNumber",
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }
    }, {
        key: "fillRow",
        value: function fillRow(n, rowIndex) {
            if (rowIndex > 8) {
                return true; //成功结束
            }
            var row = this.matrix[rowIndex];
            var orders = this.orders[rowIndex]; //得到当前行的位置信息
            for (var i = 0; i < 9; i++) {
                var collIndex = orders[i];
                if (row[collIndex]) {
                    //说明这个位置有数据 往下以个进行填写
                    continue;
                }
                //检测这个位置是否能填
                if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, collIndex)) {
                    continue; //不能填写
                }

                row[collIndex] = n; //
                if (!this.fillRow(n, rowIndex + 1)) {
                    row[collIndex] = 0; //失败 恢复n
                    continue; //失败
                }
                //如果当前行填写n成功 进行递归在下一行进行填写
                // this.fillRow(n,rowIndex+1);
                return true;
            }

            return false;
        }
    }]);

    return Generator;
}();

module.exports = Generator;
/*const gener =new Generator();
gener.generator();
console.log(gener.matrix);*/

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(3);
var grid = new Grid($("#container"));
var popupNumber = __webpack_require__(6);
grid.build();
grid.layout();

var popup = new popupNumber($("#popupNumbers"));
grid.bindPopup(popup);

$("#check").on("click", function (e) {
    grid.check();
});

$("#reset").on("click", function (e) {
    grid.reset();
});
$("#clear").on("click", function (e) {
    grid.clear();
});

$("#rebuild").on("click", function (e) {
    console.log('2222');
    grid.rebuild();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toolkit = __webpack_require__(0);
var Generator = __webpack_require__(1);
var Suduku = __webpack_require__(4);
var Checker = __webpack_require__(5);

var Grid = function () {
    function Grid(container) {
        _classCallCheck(this, Grid);

        this._$container = container;
    }

    _createClass(Grid, [{
        key: "build",
        value: function build() {
            var gener = new Generator();
            gener.generator();

            // const matrix = Toolkit.matrix.makeMatrix(); //生成数组  初次测试
            // const matrix =gener.matrix; //生成数组

            var suduku = new Suduku();
            suduku.make(); //生成数组
            var matrix = suduku.puzzleMatrix; //生成数组

            var $cells = matrix.map(function (rowVlaues) {
                return rowVlaues.map(function (cellValues) {
                    return $("<span>").addClass(cellValues ? 'fill' : 'empty').text(cellValues);
                });
            });
            var $divArr = $cells.map(function ($spanArr) {
                return $("<div>").addClass("row").append($spanArr);
            });

            this._$container.append($divArr);
        }
    }, {
        key: "layout",
        value: function layout() {
            var width = $("span:first", this._container).width();
            console.log(width);
            $("span", this._container).css({
                "height": "30px",
                "width": "30px",
                "line-height": width + "px",
                "font-size": width < 32 ? width / 2 + "px" : ""
            });
        }
    }, {
        key: "rebuild",
        value: function rebuild() {
            $("#container").empty();
            this.build();
            this.layout();
        }
        /*重置数独 回复为初始化状态*/

    }, {
        key: "reset",
        value: function reset() {
            this._$container.find("span:not(.fill)").removeClass("error doubtErrorNum doubtEnsureNum").addClass("empty").text(0);
        }
        /*检测用户输入*/

    }, {
        key: "check",
        value: function check() {
            /**
             * 1. 获取页面元素内的所有值
             * 2. 将其转化为一个二维数组
             * 3. 将得到的数组进行check，如果返回true则填写正确，如果返回false则对错误的数据进行标志
             */
            var data = this._$container.children().map(function (rowIndex, div) {
                return $(div).children().map(function (colIndex, span) {
                    return parseInt($(span).text()) || 0;
                });
            }).toArray().map(function ($span) {
                return $span.toArray();
            });

            console.log(4444444444444444444);
            console.log(data);
            var checker = new Checker(data);
            if (checker.check()) {
                // return true;
                /**
                 * 3. 将得到的数组进行check，如果返回true则填写正确，如果返回false则对错误的数据进行标志
                 */
            }
            var marks = checker._MatrixMarks;
            console.log(marks);
            this._$container.children().each(function (rowIndex, div) {
                $(div).children().each(function (colIndex, span) {
                    if ($(span).is(".fill") || marks[rowIndex][colIndex]) {
                        $(span).removeClass("error");
                    } else {
                        $(span).addClass("error");
                    }
                });
            });
        }
        /*清除错误*/

    }, {
        key: "clear",
        value: function clear() {
            this._$container.find("span.error").removeClass("error").addClass("empty").text(0);
        }
    }, {
        key: "bindPopup",
        value: function bindPopup(popupNumber) {
            this._$container.on("click", "span", function (e) {
                var $cell = $(e.target); //this 指代的是当前定义的环境的this grid	
                // console.log(e.target.textContent); //获取到点击的值
                var cellValue = e.target.textContent;
                // console.log(cellValue);
                popupNumber.popup($cell);
                // console.log($cell.position());
            });
        }
    }]);

    return Grid;
}();

module.exports = Grid;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独游戏
var Generator = __webpack_require__(1);

/**
 * 生成完整解决方案
 */

module.exports = function () {
    function Suduku() {
        _classCallCheck(this, Suduku);

        var generator = new Generator();
        generator.generator();
        this.solutionMatrix = generator.matrix; // 生成一个完整解决数组
    }

    _createClass(Suduku, [{
        key: 'make',
        value: function make() {
            var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            //去除部分数据
            // const shouldRid = Math.random() * 9 < level ;
            /*this.puzzleMatrix =this.solutionMatrix.map(row =>row.map(cell =>{
            	return Math.random() * 9 < level ? 0 : cell;   // is ok this method
            }))*/

            this.puzzleMatrix = this.solutionMatrix.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell;
                });
            });
        }
    }]);

    return Suduku;
}();

/** 
 * 去除本分元素
 */

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 检查数独解决方案
function checkArray(arr) {
    var arrLen = arr.length; //9
    var newArr = new Array(arrLen); //[true]
    newArr.fill(true);

    for (var i = 0; i < arr.length - 1; i++) {

        if (!newArr[i]) {
            continue;
        }
        if (!arr[i]) {
            newArr[i] = false;
            continue;
        }

        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                newArr[i] = newArr[j] = false;
                continue;
            }
        }
    }
    return newArr;
}
var Toolkit = __webpack_require__(0);
module.exports = function () {
    function Checker(matrix) {
        _classCallCheck(this, Checker);

        this._matrix = matrix;
        this._MatrixMarks = Toolkit.matrix.makeMatrix(true); //标记检查变量
    }

    _createClass(Checker, [{
        key: "check",
        value: function check() {
            this.checkRows();
            this.checkCols();
            this.checkBoxes();

            this._success = this._MatrixMarks.every(function (row) {
                return row.every(function (cell) {
                    return cell;
                });
            }); //对整个数据进行检查  全部返回true =》 true or false
            return this._success; //全部返回成功则输出
        }
    }, {
        key: "checkRows",
        value: function checkRows() {
            for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                var rowArr = this._matrix[rowIndex]; //得到一行数组 来源于 this._matrix
                var marks = checkArray(rowArr); //得到一个检测后的标记数组  将这个数组进行检测如果是false 进行this._matrix 更新

                for (var colIndex = 0; colIndex < marks.length; colIndex++) {
                    if (!marks[colIndex]) {
                        this._MatrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkCols",
        value: function checkCols() {
            for (var colIndex = 0; colIndex < 9; colIndex++) {
                var cols = [];

                for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                    cols[rowIndex] = this._matrix[rowIndex][colIndex];
                }

                var marks = checkArray(cols);

                for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
                    if (!marks[_rowIndex]) {
                        this._MatrixMarks[_rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkBoxes",
        value: function checkBoxes() {
            // console.log("进入checkBoxes arrayis");
            // console.log(this._matrix)
            for (var boxIndex = 0; boxIndex < 9; boxIndex++) {

                var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
                var marks = checkArray(boxes);

                for (var celIndex = 0; celIndex < 9; celIndex++) {
                    if (!marks[boxIndex]) {
                        var _Toolkit$box$convertF = Toolkit.box.convertFromBoxIndex(boxIndex, celIndex),
                            rowIndex = _Toolkit$box$convertF.rowIndex,
                            colIndex = _Toolkit$box$convertF.colIndex;

                        this._MatrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "matrixMarks",
        get: function get() {
            //如果有错误则输出其坐标
            return this._MatrixMarks;
        }
    }, {
        key: "isSuccess",
        get: function get() {
            return this._success; //再次检查
        }
    }]);

    return Checker;
}();

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
	点击每一个区块传入一个对象
	并显示popup dui popop的每一个点击将值赋给传入的对象
 */

module.exports = function () {
    function PopupNumbers($panel) {
        var _this = this;

        _classCallCheck(this, PopupNumbers);

        //获取到这个对象并保存
        this._panel = $panel.hide().removeClass("hidden"); // 首先隐藏并移除hidden 排除其样式干扰


        this._panel.on("click", "span", function (e) {
            var $cell = _this._targetCell; //获取到点击的cell
            console.log($cell);
            var $span = $(e.target);
            //回填样式
            if ($span.hasClass("doubtErrorNum")) {
                if ($cell.hasClass("doubtErrorNum")) {
                    $cell.removeClass("doubtErrorNum");
                } else {
                    $cell.removeClass("doubtEnsureNum").removeClass("empty").addClass("doubtErrorNum");
                }
            } else if ($span.hasClass("doubtEnsureNum")) {
                if ($cell.hasClass("doubtEnsureNum")) {
                    $cell.removeClass("doubtEnsureNum");
                } else {
                    $cell.removeClass("doubtErrorNum").removeClass("empty").addClass("doubtEnsureNum");
                }
            } else if ($span.hasClass("empty")) {
                console.log('nnn');
                $cell.addClass("empty").text("0").removeClass("doubtErrorNum").removeClass("doubtEnsureNum");
            } else {
                //填写数字
                $cell.removeClass("empty").text($span.text());
            }
            $panel.hide();
        });
    }

    _createClass(PopupNumbers, [{
        key: "popup",
        value: function popup($cell) {
            this._targetCell = $cell; //

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;

            if ($cell.hasClass("fill")) {
                this._panel.hide();
                return;
            }
            this._panel.css({
                "left": left + 20 + "px",
                "top": top + "px"
            }).show();
        }
    }]);

    return PopupNumbers;
}();

/***/ })
/******/ ]);