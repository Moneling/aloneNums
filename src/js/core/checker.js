// 检查数独解决方案
function checkArray(arr){
	const arrLen = arr.length;
	const newArr = new Array(arrLen);
	newArr.fill(true);

	for(let i =0;i<arr.length -1;i++){


		if(!newArr[i]){
			continue;
		}
		if(!arr[i]){
			newArr[i] = false;
			continue;
		}

		for(let j =i+1;j<arr.length;j++){
			if(arr[i] == arr[j]){
				newArr[i] = newArr[j] = false;
				continue;
			}
		}

	}
		return newArr;
}



console.log(checkArray([1,2,3,4,5,6]));
console.log(checkArray([0,2,0,4,0,6]));
console.log(checkArray([1,1,3,5,5,6]));