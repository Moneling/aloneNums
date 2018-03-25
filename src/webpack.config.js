module.exports ={
	entry:{
		index:"./js/index.js"
	},
	output:{
		filename:"[name].js"
	},/*
	devtool:"source-map",*/
	resolve:{
		extensions:[".js"]
	},
	module:{
		/* rules: [
		    {
		      test: /\.js$/,
		      exclude: /(node_modules)/,
		      use: {
		        loader: 'babel-loader',
		        options: {
		          presets: ['es2015']
		        }
		      }
		    }
		  ]*/
		  loaders:[
			{
				loader:"babel-loader",
				test:/\.js$/,
				exclude: /(node_modules)/,
				query:{
					presets:["es2015"]
				}
			}
		]

	}
}



		/*loaders:[
			{
				loader:"babel-loader",
				test:/\.js$/,
				exclude: /(node_modules)/,
				query:{
					presets:["es2015"]
				}
			}
		]*/
