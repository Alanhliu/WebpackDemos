const path = require('path'); // 导入路径包
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		"index" : "./src/js/index.js",
		"second":  "./src/js/second.js"
	}, // 入口文件是对象

	output: {
		path: path.resolve(__dirname, 'build'),
		//注意这里我们之前将.js文件都打包到了bundle.js中
		//显然我们并不希望把所有.js文件都打包到bundle.js中
		//[name]会匹配entry对象中的键值("index","second")
		//最终会打包成对应的.js文件(js目录下的,"index.bundle.js","second.bundle.js")
		filename: "js/[name].bundle.js",
	},

	// 使用loader模块
	module: {

		// rules就是配置规则，他是一个数组，每一项为一个对象，如果有多个loader,那就用多个对象，
		// test: /\.js$/ 就是以.js结尾的文件，
		// exclude:排除node_modules这个目录，意思就是不要去这个目录下处理.js的文件，有什么好处呢？大大提高打包的速度.
		// include里面的配置意思就是把src目录下面的js文件作为处理的目标，
		// use配置就是使用babel-loader
		// 需要注意的是，loader是有顺序的，webpack肯定是先将所有css模块依赖解析完得到计算结果再创建style标签。
		// 因此应该把style-loader放在css-loader的前面（webpack loader的执行顺序是从右到左）。
		rules:[
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"es2015", "es2017"
						]
					}
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader"]
				})
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/views/index.html',
			filename: 'views/index.html',
			//https://segmentfault.com/a/1190000007294861
			//chunks 选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。
			//chunks 选项就可以决定是否都使用这些生成的 js 文件。
			//chunks 默认会在生成的 html 文件中引用所有的 js 文件，当然你也可以指定引入哪些特定的文件。
			//这里填写的是entry对象的key
			chunks: ['index'],//只引用index.bundle.js
		}),
		new HtmlWebpackPlugin({
			template: './src/views/second.html',
			filename: 'views/second.html',
			chunks: ['second'],//只引用second.bundle.js
		}),
		//https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/
		new ExtractTextPlugin({
			//'css/js/a.css'
			//这里的name是entry对象的key
			//所以分离出来的css文件是css目录下index.min.css,second.min.css
			filename: (getPath) => {
				return getPath('css/[name].min.css');
			},
			allChunks: true
		}),
  	],
	devServer: {
		port:8083,
		contentBase: 'build/aa/'
	}
};