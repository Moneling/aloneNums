const matrixToolkit={
	makeRow(r = 0) {
 	const array = new Array(9);
		array.fill(r);
		return array;
	},

	makeMatrix(c = 0) {
		return Array.from({
			length: 9
		}, () => this.makeRow(c))
	},
	/**
	 * @brief [生成一个打乱数据的数组]
	 * @details [long description]
	 * 
	 * @param  [description]
	 */
	shuffle(array) {

		for (let i = 0; i < array.length - 2; i++) {
			const j = i + Math.floor(Math.random() * (array.length - i));
			[array[i], array[j]] = [array[j], array[i]]
		}
		return array;
	},
	/**
	 * @brief 检测指定位置填写数字n是否可行
	 * @details [long description]
	 */
	checkFillable(matrix,n,rowIndex,colIndex){
		const row = matrix[rowIndex];//首先获取行列 在进行数据比对
		// const coll = [matrix[0][colIndex],matrix[1][colIndex]...matrix[8][colIndex];
		const coll = this.makeRow().map((v,i) => matrix[i][colIndex]);  
		const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex,colIndex);
		const  box = boxToolkit.getBoxCells(matrix,boxIndex);//获取到宫的数据后进行数据判断
		for(let i=0; i<9; i++){
			if(row[i] === n || coll[i] ===n || box[i] === n){
				return false;
			}
		}
		return true;
	}
};

/**
 * 
 */

const boxToolkit = {
	
	getBoxCells(matrix,boxIndex){
		const startRowIndex = Math.floor(boxIndex / 3) * 3;	//获取到每一个宫的起始位置
		const startCollIndex = boxIndex % 3 * 3 ;
		const result = [];
		for(let cellIndex = 0; cellIndex < 9 ; cellIndex ++){
			const rowIndex = startRowIndex + Math.floor(cellIndex / 3 );
			const collIndex = startCollIndex + cellIndex % 3;
			result.push(matrix[rowIndex][collIndex]);
		}

		return result;
	},
	convertToBoxIndex(rowIndex,colIndex){
		return {
			boxIndex:Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
			collIndex: rowIndex % 3 * 3 + colIndex % 3
		}

	},

	convertFromBoxIndex(boxIndex,cellIndex){
		return {
			rowIndex:Math.floor(boxIndex/3) * 3 + Math.floor(cellIndex / 3),
			colIndex:boxIndex % 3 * 3 + cellIndex % 3
		}
	}


}
//工具集
module.exports = class Toolkit{
	//定义一个静态方法返回一个matrixToolKit； 矩阵和数组
	static get matrix(){
		return matrixToolkit;
	}
	//宫坐标系工具
	static get box(){
		return boxToolkit;
	}
};


