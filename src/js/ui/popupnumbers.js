/*
	点击每一个区块传入一个对象
	并显示popup dui popop的每一个点击将值赋给传入的对象
 */



module.exports =class PopupNumbers{
	constructor($panel){	//获取到这个对象并保存
		this._panel = $panel.hide().removeClass("hidden");	// 首先隐藏并移除hidden 排除其样式干扰


		this._panel.on("click","span",(e) =>{
			const $cell = this._targetCell; //获取到点击的cell
			console.log($cell);
			const $span = $(e.target);
			//回填样式
			if($span.hasClass("doubtErrorNum")){
				if($cell.hasClass("doubtErrorNum")){
					$cell.removeClass("doubtErrorNum");
				}else {
					$cell.removeClass("doubtEnsureNum")
						.removeClass("empty")
						.addClass("doubtErrorNum");
				}
				return;
			}
			if($span.hasClass("doubtEnsureNum")){
				if($cell.hasClass("doubtEnsureNum")){
					$cell.removeClass("doubtEnsureNum");
				}else {
					$cell.removeClass("doubtErrorNum")
						.removeClass("empty")
						.addClass("doubtEnsureNum");
				}
				return;
			}

			//取消填写
			if($span.hasClass("empty")){
					console.log('nnn');
				$cell.addClass("empty")
					.text("0")
					.removeClass("doubtErrorNum")
					.removeClass("doubtEnsureNum")
				return;
			}
			//填写数字
			$cell.removeClass("empty")
				.text($span.text());
		})
	}

	popup($cell){
		this._targetCell = $cell;//
		const {left ,top} = $cell.position();
		if($cell.hasClass("fill")){
			this._panel.hide();
			return;
		}
		this._panel.css({
			"left":`${left + 20}px`,
			"top":`${top}px`
		})
		.show();
	}
}
