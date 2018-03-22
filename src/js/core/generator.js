const Toolkit = require("./toolkit.js");

class Generator{
	generator(){
		while(!this.internalGenerator()){
			console.log('error');
		}
	
	}

	internalGenerator(){
		//首先生成一个数组
		this.matrix = Toolkit.matrix.makeMatrix();
		//生成一个随机矩阵
		this.orders = Toolkit.matrix.makeMatrix()  //返回的一个二维数组
			.map(row => row.map((v,i) => i)) //生成有序数组  然后进行打乱
			.map(row => Toolkit.matrix.shuffle(row));

		for(let n =1; n<=9; n++){
			if(!this.fillNumber(n)){
				return false;
			};
		}
		return true;
	}

	fillNumber(n){
		return this.fillRow(n,0);
	}

	fillRow(n,rowIndex){
		if(rowIndex >8){
			return true;//成功结束
		}
		const row = this.matrix[rowIndex];
		const orders = this.orders[rowIndex];//得到当前行的位置信息
		for(let i=0;i<9;i++){
			const collIndex = orders[i];
			if(row[collIndex]){ //说明这个位置有数据 往下以个进行填写
				continue;
			}
			//检测这个位置是否能填
			if(!Toolkit.matrix.checkFillable(this.matrix,n,rowIndex,collIndex)){
				continue; //不能填写
			}

			row[collIndex] = n;//
			if(!this.fillRow(n,rowIndex+1)){
				row[collIndex] = 0;//失败 恢复n
				continue; //失败
			}
			//如果当前行填写n成功 进行递归在下一行进行填写
			// this.fillRow(n,rowIndex+1);
			return true;
		}

		return false;
		
	}
}
module.exports = Generator;
/*const gener =new Generator();
gener.generator();
console.log(gener.matrix);*/

 