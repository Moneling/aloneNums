const Toolkit = require("../core/toolkit.js");
const Generator = require("../core/generator.js");
const Suduku = require('../core/sudoku.js');
const Checker = require('../core/checker.js');
class Grid {
    constructor(container) {
        this._$container = container;
    }
    build() {
        const gener = new Generator();
        gener.generator();

        // const matrix = Toolkit.matrix.makeMatrix(); //生成数组  初次测试
        // const matrix =gener.matrix; //生成数组

        const suduku = new Suduku();
        suduku.make(); //生成数组
        const matrix = suduku.puzzleMatrix; //生成数组

        const $cells = matrix.map(rowVlaues => rowVlaues.map(cellValues => {
            return $("<span>")
                .addClass(cellValues ? 'fill' : 'empty')
                .text(cellValues)
        }));
        const $divArr = $cells.map($spanArr => {
            return $("<div>")
                .addClass("row")
                .append($spanArr)
        })

        this._$container.append($divArr);

    }
    layout() {
        const width = $("span:first", this._container).width();
        console.log(width);
        $("span", this._container)

        .css({
            "height": "30px",
            "width": "30px",
            "line-height": `${width}px`,
            "font-size": width < 32 ? `${width/2}px` : ""
        })
    }
    rebuild() {
            $("#container").empty();
            this.build();
            this.layout();
        }
        /*重置数独 回复为初始化状态*/
    reset() {
            this._$container.find("span:not(.fill)")
                .removeClass("error doubtErrorNum doubtEnsureNum")
                .addClass("empty")
                .text(0)

        }
        /*检测用户输入*/
    check() {
            /**
             * 1. 获取页面元素内的所有值
             * 2. 将其转化为一个二维数组
             * 3. 将得到的数组进行check，如果返回true则填写正确，如果返回false则对错误的数据进行标志
             */
            const data = this._$container.children()
                .map((rowIndex, div) => {
                    return $(div).children()
                        .map((colIndex, span) => parseInt($(span).text()) || 0)
                })
                .toArray()
                .map($span => $span.toArray());

            console.log(4444444444444444444);
            console.log(data);
            const checker = new Checker(data);
            if (checker.check()) {
                // return true;
                /**
                 * 3. 将得到的数组进行check，如果返回true则填写正确，如果返回false则对错误的数据进行标志
                 */
            }
            const marks = checker._MatrixMarks;
            console.log(marks)
            this._$container.children()
                .each((rowIndex, div) => {
                    $(div).children().each((colIndex, span) => {
                        if ($(span).is(".fill") || marks[rowIndex][colIndex]) {
                            $(span).removeClass("error");
                        } else {
                            $(span).addClass("error");

                        }
                    })
                })



        }
        /*清除错误*/
    clear() {
        this._$container.find("span.error")
            .removeClass("error")
            .addClass("empty")
            .text(0)
    }
    bindPopup(popupNumber) {
        this._$container.on("click", "span", (e) => {
            const $cell = $(e.target); //this 指代的是当前定义的环境的this grid	
            // console.log(e.target.textContent); //获取到点击的值
            const cellValue = e.target.textContent;
            // console.log(cellValue);
            popupNumber.popup($cell);
            // console.log($cell.position());
        })
    }

}


module.exports = Grid;