const Toolkit = require("../core/toolkit.js");
const Generator = require("../core/generator.js");
const Suduku = require('../core/sudoku.js');
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
		const matrix =suduku.puzzleMatrix; //生成数组

		const $cells = matrix.map(rowVlaues => rowVlaues.map(cellValues => {
			return $("<span>")
			.addClass(cellValues ?'fill' : 'empty' )
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
				"height":"30px",
				"width":"30px",
				"line-height": `${width}px`,
				"font-size": width < 32 ? `${width/2}px` : ""
			})
	}

}


module.exports = Grid;
