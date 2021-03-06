const path = require('path'); // 导入路径包
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ["./index.js","./second.js"], // 入口文件是数组

	// 输出文件 build下的bundle.js
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: "bundle.js"
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
		rules:[{
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
			exclude: /node_modules/
		},{
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
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
		  template: './index.html',
		  filename: 'index.html',
		  chunks: 'index.js',
		}),
		new HtmlWebpackPlugin({
			template: './second.html',
			filename: 'second.html',
			chunks: 'second.js',
		}),
  	],
};