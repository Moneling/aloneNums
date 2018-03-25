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
	rebuild(){
		$("#container").empty();
		this.build();
		this.layout();
	}
	/*重置数独*/
	rest(){

	}
	/*检测用户输入*/
	check(){

	}
	/*清除错误*/
	clear(){

	}
	bindPopup(popupNumber){
		this._$container.on("click","span",(e)=>{
			const $cell = $(e.target);	//this 指代的是当前定义的环境的this grid	
			// console.log(e.target.textContent); //获取到点击的值
			const cellValue = e.target.textContent;
			// console.log(cellValue);
				popupNumber.popup($cell);
			// console.log($cell.position());
		})
	}

}


module.exports = Grid;
