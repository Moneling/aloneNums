const gulp = require("gulp");


//创建任务
//转义JavaScript
//获取文件 之后将文件进行转义
//使用webpage进行转义 调用webpack 内部的规则所以需要引入config

gulp.task("webpack",()=>{
	const webpack = require("webpack-stream");
	const config = require("./webpack.config.js");
	gulp.src("./js/**/*.js")	
		.pipe(webpack(config))	
		.pipe(gulp.dest("../www/js/"))
	})


gulp.task("less",()=>{
	const less = require("gulp-less");
	gulp.src("./less/**/*.less")
		.pipe(less())
		.pipe(gulp.dest("../www/css/"))
	})

gulp.task("default",["webpack","less"]);
gulp.task("watch",()=>{
	gulp.watch("./js/**/*.js",["webpack"]);
	gulp.watch("./less/**/*.less",["less"]);
	})