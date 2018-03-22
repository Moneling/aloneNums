//生成数独游戏
const Generator = require('./generator.js');

/**
 * 生成完整解决方案
 */

module.exports =  class Suduku{

	constructor(){
		const generator = new Generator();
		generator.generator();
		this.solutionMatrix = generator.matrix;  // 生成一个完整解决数组
	}

	make(level = 3 ){
		//去除部分数据
		// const shouldRid = Math.random() * 9 < level ;
		/*this.puzzleMatrix =this.solutionMatrix.map(row =>row.map(cell =>{
			return Math.random() * 9 < level ? 0 : cell;   // is ok this method
		}))*/

		this.puzzleMatrix = this.solutionMatrix.map(row => {
				return row.map(cell => Math.random() * 9 < level ? 0 : cell);
			})
	}

} 



 /** 
  * 去除本分元素
  */